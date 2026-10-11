---
title: Run Casdoor with the Kubernetes Operator
sidebar_label: Kubernetes Operator
description: Install the Casdoor Kubernetes operator, run Casdoor instances from a Casdoor resource, and declare organizations and applications as Kubernetes resources whose client credentials land in Secrets.
keywords: [Casdoor, Kubernetes, K8s, operator, CRD, GitOps, organization, application]
authors: [hsluoyz]
---

This guide explains how to run Casdoor on Kubernetes with the [Casdoor operator](https://github.com/casdoor/casdoor-operator), and how to declare organizations and applications as Kubernetes resources.

---

#### Learning outcomes

- Install the operator.
- Run a Casdoor instance from a `Casdoor` resource, with SQLite for a trial and with PostgreSQL, Redis and an Ingress for production.
- Create organizations and applications with `CasdoorOrganization` and `CasdoorApplication`, and mount the client credentials of an application from a Secret.
- Upgrade and remove instances.

#### What you need

- A Kubernetes cluster, version 1.29 or later
- `kubectl`
- For production: a MySQL or PostgreSQL database and a Redis server that the cluster can reach

---

:::tip Don't want to run it yourself?
[Casdoor Cloud](https://www.casdoor.com/pricing?utm_source=casdoor.ai&utm_medium=docs&utm_content=kubernetes-operator) gives you a dedicated Casdoor instance that we host and keep upgraded for you, from $29/month with no per-user fees. New accounts get $20 in free credit to try it.
:::

## Operator or Helm chart?

Both run the same Casdoor image.

- The [Helm chart](/docs/basic/try-with-helm) installs one Casdoor release configured by a values file. Choose it when you run one instance and manage it with Helm.
- The operator adds three resource types to the cluster. `Casdoor` runs an instance; `CasdoorOrganization` and `CasdoorApplication` manage what is inside an instance, and each application gets a Secret with its client ID, client secret and certificate. Choose it when you run several instances, when the applications that sign in with Casdoor are deployed to the same cluster, or when you manage the cluster with GitOps tools such as Argo CD or Flux.

## Install the operator

```bash
kubectl apply --server-side -k https://github.com/casdoor/casdoor-operator/config/default
```

The command installs the three custom resource definitions and a cluster role, and runs the operator in the `casdoor-operator-system` namespace:

```bash
kubectl -n casdoor-operator-system get pods
```

The operator watches every namespace. To limit it to one namespace, add `--watch-namespace=<namespace>` to the arguments of the `casdoor-operator-controller-manager` deployment.

To pin a release, add `?ref=<tag>` to the URL and set the image tag in your own kustomization:

```yaml title="kustomization.yaml"
resources:
- https://github.com/casdoor/casdoor-operator/config/default?ref=v2.2.0
images:
- name: casbin/casdoor-operator
  newTag: "2.2.0"
```

The releases are listed on [GitHub](https://github.com/casdoor/casdoor-operator/releases), and the images are on [Docker Hub](https://hub.docker.com/r/casbin/casdoor-operator).

## Create a Casdoor instance

1. Create a Secret with the password of the `built-in/admin` account:

   ```bash
   kubectl create secret generic casdoor-admin --from-literal=password='<password>'
   ```

1. Create a `Casdoor` resource. This one runs a single replica that keeps its data in a SQLite file on a 1Gi volume:

   ```yaml title="casdoor.yaml"
   apiVersion: operator.casdoor.org/v1alpha1
   kind: Casdoor
   metadata:
     name: casdoor
   spec:
     database:
       driver: sqlite
       storage:
         size: 1Gi
     initAdminPasswordSecretRef:
       name: casdoor-admin
       key: password
   ```

   ```bash
   kubectl apply -f casdoor.yaml
   kubectl get casdoor
   ```

   ```text
   NAME      READY   REPLICAS   IMAGE                   URL                               AGE
   casdoor   True    1          casbin/casdoor:4.19.0   http://casdoor.default.svc:8000   2m
   ```

1. Open Casdoor:

   ```bash
   kubectl port-forward svc/casdoor 8000:8000
   ```

   Go to `http://localhost:8000` and sign in as `admin` with the password from the Secret.

The operator creates a Deployment, a Service and the volume. The password applies when Casdoor initializes an empty database, and requires Casdoor 4.19.0 or later. Without `initAdminPasswordSecretRef`, Casdoor asks for the password of `built-in/admin` on the first visit.

## Run Casdoor in production

The following instance runs three replicas with PostgreSQL for data, Redis for sessions and an Ingress with TLS:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: casdoor-credentials
stringData:
  db-password: <database password>
  admin-password: <admin password>
---
apiVersion: operator.casdoor.org/v1alpha1
kind: Casdoor
metadata:
  name: casdoor
spec:
  replicas: 3
  database:
    driver: postgres
    host: postgres.default.svc
    user: casdoor
    name: casdoor
    passwordSecretRef:
      name: casdoor-credentials
      key: db-password
  redis:
    endpoint: redis.default.svc:6379
  initAdminPasswordSecretRef:
    name: casdoor-credentials
    key: admin-password
  ingress:
    className: nginx
    host: door.example.com
    tlsSecretName: door-example-com-tls
  resources:
    requests:
      cpu: 100m
      memory: 256Mi
```

What the operator does with it:

- **Origin**: `origin` defaults to the Ingress host, so the OIDC issuer is `https://door.example.com`. Set `spec.origin` when Casdoor is exposed another way.
- **Replicas**: More than one replica requires `redis`, because Casdoor keeps sessions there; without it a user is signed out whenever a request reaches another pod. SQLite supports one replica only. The API server rejects a `Casdoor` resource that breaks either rule.
- **Database**: Casdoor creates the MySQL or PostgreSQL database if it doesn't exist. Set `database.create: false` when the database user can't create databases.
- **Secrets**: Passwords are read from Secrets and never written to a ConfigMap. Changing the database or Redis password in its Secret restarts the pods with the new value.
- **Availability**: With two or more replicas, the operator adds a PodDisruptionBudget. The `Casdoor` resource has a `scale` subresource, so `kubectl scale casdoor casdoor --replicas=5` and a HorizontalPodAutoscaler work on it.
- **Health**: The probes use `/api/health`. The `Ready` condition turns `True` when every replica of the current version is available.

## Configure the instance

| Field | Description |
| --- | --- |
| `image` | Casdoor image. Defaults to the version the operator was released with. |
| `replicas` | Number of pods, 1 by default. |
| `origin` | Public URL, used as the OIDC issuer. |
| `database.driver` | `mysql`, `postgres` or `sqlite`. |
| `database.host`, `port`, `name`, `user`, `sslMode` | Connection settings. `name` defaults to `casdoor`. |
| `database.passwordSecretRef` | Secret key holding the database password. |
| `database.dataSourceNameSecretRef` | Secret key holding a complete `dataSourceName`, which replaces the fields above. |
| `database.create` | Create the MySQL or PostgreSQL database if it is missing. `true` by default. |
| `database.storage` | Volume for the SQLite file. Without it, the file lives in an `emptyDir` and is lost with the pod. The volume is kept when the `Casdoor` resource is deleted. |
| `redis.endpoint`, `passwordSecretRef`, `db` | Session store. Several addresses separated by `;` use Redis Cluster. |
| `initAdminPasswordSecretRef` | Password of `built-in/admin` for a new database. |
| `apiCredentialsSecretRef` | Credentials the operator uses to call the Casdoor API. See [API credentials](#api-credentials). |
| `initData.secretRef`, `newOnly` | Secret key holding an [init data](/docs/deployment/data-initialization) file. With `newOnly`, the default, objects that already exist are left alone. |
| `config` | Other [configuration](/docs/basic/configuration) items, such as `defaultLanguage: zh`. Items covered by the fields above are ignored. |
| `env` | Extra environment variables for the Casdoor container, applied last. |
| `service.type`, `port`, `annotations` | Service settings. Port 8000 by default. |
| `ingress.host`, `className`, `tlsSecretName`, `annotations` | Creates an Ingress when set. |
| `resources`, `nodeSelector`, `tolerations`, `affinity`, `topologySpreadConstraints`, `priorityClassName`, `serviceAccountName`, `imagePullSecrets`, `podLabels`, `podAnnotations` | Passed to the pod. |

Run `kubectl explain casdoor.spec` for the full schema.

## Manage organizations and applications

### API credentials

To create objects in an instance, the operator calls the [Casdoor API](/docs/basic/public-api) with the client ID and client secret of `app-built-in`, the application of the `built-in` organization, which can manage every organization.

- With `initAdminPasswordSecretRef`, the operator signs in as `built-in/admin` once after the first start, reads the credentials of `app-built-in` and keeps them in the Secret `<name>-api-credentials`. It doesn't use the password after that.
- If the password was changed before the operator signed in, or you don't want to give it to the operator, copy the client ID and client secret of `app-built-in` from the admin console into a Secret with the keys `clientId` and `clientSecret`, and point `spec.apiCredentialsSecretRef` to it.

The `APIReady` condition of the `Casdoor` resource shows whether the credentials are available:

```bash
kubectl get casdoor casdoor -o jsonpath='{.status.conditions[?(@.type=="APIReady")].message}'
```

If the password is wrong, the operator tries again every 5 minutes, which stays below the number of failed sign-ins that locks the account.

### Create an organization and an application

```yaml
apiVersion: operator.casdoor.org/v1alpha1
kind: CasdoorOrganization
metadata:
  name: acme
spec:
  casdoorRef:
    name: casdoor
  displayName: ACME Corp
  websiteUrl: https://acme.example.com
  passwordType: bcrypt
  languages: [en, zh]
---
apiVersion: operator.casdoor.org/v1alpha1
kind: CasdoorApplication
metadata:
  name: acme-portal
spec:
  casdoorRef:
    name: casdoor
  organization: acme
  displayName: ACME Portal
  redirectUris:
  - https://portal.acme.example.com/callback
  grantTypes: [authorization_code, refresh_token]
  tokenFormat: JWT-Standard
  expireInHours: 24
  cert: cert-built-in
```

```bash
kubectl get casdoororg,casdoorapp
```

```text
NAME                                            CASDOOR   READY   AGE
casdoororganization.operator.casdoor.org/acme   casdoor   True    10s

NAME                                                  CASDOOR   ORGANIZATION   CLIENT ID              READY   AGE
casdoorapplication.operator.casdoor.org/acme-portal   casdoor   acme           44f1aa1fbe1afc436140   True    10s
```

`casdoorRef.name` is the name of a `Casdoor` resource in the same namespace. `name` sets the name of the object in Casdoor when it differs from the name of the Kubernetes resource.

### Use the credentials of an application

For each application, the operator writes a Secret named `<name>-casdoor`, or the name in `credentialsSecretName`, with the keys `endpoint`, `clientId`, `clientSecret`, `organizationName`, `applicationName` and `certificate`. The keys match the settings of the [Casdoor SDKs](/docs/how-to-connect/sdk), so an application in the cluster can read them from environment variables:

```yaml
containers:
- name: portal
  image: example/portal
  envFrom:
  - secretRef:
      name: acme-portal-casdoor
    prefix: CASDOOR_
```

Casdoor generates the client ID and client secret unless you set `clientId` or `clientSecretSecretRef`. The `endpoint` is the origin of the instance, or its Service address when it has no origin.

### Understand which fields the operator writes

- **Fields in the spec**: They keep the names of the Casdoor API. The operator writes them to Casdoor and changes them back within 10 minutes if they are edited in the admin console.
- **Fields that the spec doesn't set**: They keep the values that they have in Casdoor, so you can edit them in the admin console. Set any field that has no dedicated spec field, such as `signinMethods`, `providers` or `mfaItems`, in `extraFields`:

  ```yaml
  spec:
    extraFields:
      enableSigninSession: true
      signinMethods:
      - name: Password
        displayName: Password
        rule: All
  ```

- **Objects that already exist**: A resource with the name of an existing object takes it over and writes only the fields in its spec.
- **Deletion**: Deleting a `CasdoorApplication` deletes the application in Casdoor. Deleting a `CasdoorOrganization` keeps the organization and its users in Casdoor unless the resource has `deletionPolicy: Delete`.

### Use a Casdoor server that the operator doesn't run

`CasdoorOrganization` and `CasdoorApplication` also work with a Casdoor server outside the cluster, such as a Casdoor Cloud instance. Put the client ID and client secret of an application of its `built-in` organization in a Secret and use `casdoorRef.external`:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: door-api
stringData:
  clientId: <client ID of app-built-in>
  clientSecret: <client secret of app-built-in>
---
apiVersion: operator.casdoor.org/v1alpha1
kind: CasdoorApplication
metadata:
  name: grafana
spec:
  casdoorRef:
    external:
      endpoint: https://door.example.com
      credentialsSecretRef:
        name: door-api
  organization: acme
  redirectUris:
  - https://grafana.example.com/login/generic_oauth
```

## LDAP

The Service exposes the [LDAP server](/docs/ldap/ldapserver) of Casdoor on port 389. Inside the pod, Casdoor listens on port 10389, because the pod runs as user 1000 and some container runtimes don't let it bind ports below 1024. To use another port inside the pod, set `ldapServerPort` in `config`.

## Upgrade Casdoor

Change `spec.image`, or upgrade the operator to get a newer default image. The operator rolls the pods one by one; with SQLite it stops the old pod before it starts the new one, because two processes can't open the same database file. Casdoor updates the database schema when it starts. Before you move from version 3 to version 4, read [Upgrade from v3 to v4](/docs/deployment/upgrade-v3-to-v4).

## Uninstall

1. Delete the `CasdoorApplication` and `CasdoorOrganization` resources while the operator is still running, so that it can remove their finalizers:

   ```bash
   kubectl delete casdoorapplications,casdoororganizations --all -A
   ```

1. Delete the instances, and the SQLite volume if you don't need the data:

   ```bash
   kubectl delete casdoor casdoor
   kubectl delete pvc casdoor-data
   ```

1. Remove the operator:

   ```bash
   kubectl delete -k https://github.com/casdoor/casdoor-operator/config/default
   ```

## See also

- [Run Casdoor on Kubernetes with Helm](/docs/basic/try-with-helm)
- [Deploy on Kubernetes](/docs/deployment/k8s)
- [Manage Casdoor with Terraform](/docs/deployment/terraform)
- [Initialize and manage data with a file](/docs/deployment/data-initialization)
- [casdoor-operator on GitHub](https://github.com/casdoor/casdoor-operator)
