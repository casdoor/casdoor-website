---
title: Run Casdoor on Kubernetes with Helm
sidebar_label: Try with Helm
description: Install the Casdoor Helm chart on a Kubernetes cluster, expose it with Ingress or the Gateway API, and manage the release.
keywords: [Casdoor, Helm, Kubernetes, K8s, Gateway API, Ingress, Istio]
authors: [nomeguy]
---

This guide explains how to install Casdoor on a Kubernetes cluster with the official Helm chart, expose it outside the cluster, and upgrade or remove the release.

---

#### Learning outcomes

- Install the Casdoor Helm chart.
- Override chart values, including the database connection.
- Expose Casdoor with Ingress or the Gateway API.
- Keep organizations, applications, and users in the values file.
- Upgrade and uninstall the release.

#### What you need

- A Kubernetes cluster, version 1.19 or later
- Helm 3.8 or later
- For the Gateway API option: the Gateway API CRDs and a Gateway controller in the cluster

---

:::tip Don't want to run it yourself?
[Casdoor Cloud](https://www.casdoor.com/pricing?utm_source=casdoor.ai&utm_medium=docs&utm_content=try-with-helm) gives you a dedicated Casdoor instance that we host and keep upgraded for you, from $25/month with no per-user fees.
:::

## Install the chart

The chart is published as an OCI artifact on GitHub Container Registry. It is listed on [Artifact Hub](https://artifacthub.io/packages/helm/casdoor/casdoor), and its [source](https://github.com/casdoor/casdoor/tree/master/manifests/casdoor) is in the Casdoor repository.

1. Install the chart. Replace `<version>` with a chart version from Artifact Hub.

   ```bash
   helm install casdoor oci://ghcr.io/casdoor/helm-charts/casdoor --version <version>
   ```

   To override values, pass your own values file:

   ```bash
   helm install casdoor oci://ghcr.io/casdoor/helm-charts/casdoor      --version <version>      -f my-values.yaml
   ```

1. Open Casdoor at the URL of the `casdoor` service in your cluster. With the default values, the service is of type `ClusterIP` on port 8000, so it is reachable only inside the cluster until you [expose it](/docs/basic/try-with-helm#exposing-casdoor).

## Customize the deployment

Override the values of [`values.yaml`](https://github.com/casdoor/casdoor/blob/master/manifests/casdoor/values.yaml) in your own values file. The main values are:

| Parameter | Description | Default |
|---|---|---|
| `replicaCount` | Number of replicas of the Casdoor application to run. | `1` |
| `image.repository` | Repository for the Casdoor Docker image. | `casbin` |
| `image.name` | Name of the Casdoor Docker image. | `casdoor` |
| `image.pullPolicy` | Pull policy for the Casdoor Docker image. | `IfNotPresent` |
| `image.tag` | Tag for the Casdoor Docker image. | `""` |
| `config` | Configuration settings for the Casdoor application. | See [values.yaml](https://github.com/casdoor/casdoor/blob/master/manifests/casdoor/values.yaml) |
| `database.driver` | Database driver to use (`mysql`, `postgres`, `cockroachdb`, `sqlite`). | `sqlite` |
| `database.user` | Database username. | `""` |
| `database.password` | Database password. | `""` |
| `database.host` | Database host. | `""` |
| `database.port` | Database port. | `""` |
| `database.databaseName` | Name of the database used by Casdoor. | `casdoor` |
| `database.sslMode` | SSL mode for the database connection. | `disable` |
| `service.type` | Type of Kubernetes service (`ClusterIP`, `NodePort`, `LoadBalancer`). | `ClusterIP` |
| `service.port` | Port number for the Casdoor service. | `8000` |
| `ingress.enabled` | Whether to enable Ingress for Casdoor. | `false` |
| `ingress.annotations` | Annotations for the Ingress resource. | `{}` |
| `ingress.hosts` | Hostnames for the Ingress resource. | `[]` |
| `resources` | Resource requests and limits for the Casdoor container. | `{}` |
| `autoscaling.enabled` | Whether to enable Horizontal Pod Autoscaler for Casdoor. | `false` |
| `autoscaling.minReplicas` | Minimum number of replicas for HPA. | `1` |
| `autoscaling.maxReplicas` | Maximum number of replicas for HPA. | `100` |
| `autoscaling.targetCPUUtilizationPercentage` | Target CPU utilization percentage for HPA. | `80` |
| `nodeSelector` | Node labels for pod assignment. | `{}` |
| `tolerations` | Toleration labels for pod assignment. | `[]` |
| `affinity` | Affinity settings for pod assignment. | `{}` |
| `extraContainersEnabled` | Whether to enable additional sidecar containers. | `false` |
| `extraContainers` | Additional sidecar containers. | `""` |
| `extraVolumeMounts` | Additional volume mounts for the Casdoor container. | `[]` |
| `extraVolumes` | Additional volumes for the Casdoor container. | `[]` |
| `envFromSecret` | Environment variables from individual Secret keys. | `[]` |
| `envFromConfigmap` | Environment variables from individual ConfigMap keys. | `[]` |
| `envFrom` | Environment variables from entire Secrets or ConfigMaps. | `[]` |

## Expose Casdoor {#exposing-casdoor}

Choose Ingress or the Gateway API.

### Expose Casdoor with Ingress

Enable Ingress in your values file:

```yaml
ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: casdoor.example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: casdoor-tls
      hosts:
        - casdoor.example.com
```

### Expose Casdoor with the Gateway API

The Kubernetes [Gateway API](https://gateway-api.sigs.k8s.io/) is the successor to Ingress. Istio, Envoy Gateway, Cilium, Kong, NGINX Gateway Fabric, and other controllers support it.

Before you enable this option, install the Gateway API CRDs and make sure that a compatible Gateway controller runs in the cluster:

```bash
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.0/standard-install.yaml
```

Then use one of the following configurations.

#### Attach to an existing Gateway

If the cluster already has a Gateway, point the HTTPRoute at it:

```yaml
gatewayApi:
  enabled: true
  parentRefs:
    - name: my-gateway
      namespace: gateway-system
      sectionName: https
  hostnames:
    - casdoor.example.com
```

#### Create a Gateway

Let the chart create a Gateway together with the HTTPRoute. This example uses Istio:

```yaml
gatewayApi:
  enabled: true
  createGateway: true
  hostnames:
    - casdoor.example.com
  gateway:
    gatewayClassName: istio
    listeners:
      - name: http
        protocol: HTTP
        port: 80
        allowedRoutes:
          namespaces:
            from: Same
```

#### Create a Gateway that redirects HTTP to HTTPS

Terminate TLS at the Gateway and redirect HTTP requests to HTTPS:

```yaml
gatewayApi:
  enabled: true
  createGateway: true
  hostnames:
    - casdoor.example.com
  gateway:
    gatewayClassName: istio
    listeners:
      - name: http
        protocol: HTTP
        port: 80
        allowedRoutes:
          namespaces:
            from: Same
      - name: https
        protocol: HTTPS
        port: 443
        tls:
          certificateRefs:
            - name: casdoor-tls
              kind: Secret
        allowedRoutes:
          namespaces:
            from: Same
  httpsRedirect:
    enabled: true
```

#### Gateway API values

| Parameter | Description | Default |
|---|---|---|
| `gatewayApi.enabled` | Enable HTTPRoute creation | `false` |
| `gatewayApi.createGateway` | Also create a `Gateway` resource | `false` |
| `gatewayApi.annotations` | Annotations for the HTTPRoute | `{}` |
| `gatewayApi.labels` | Extra labels for the HTTPRoute | `{}` |
| `gatewayApi.parentRefs` | Parent Gateway references | `[]` |
| `gatewayApi.hostnames` | Hostnames to match (Host header) | `[]` |
| `gatewayApi.rules` | Routing rules (matches, filters, backendRefs) | PathPrefix `/` |
| `gatewayApi.gateway.name` | Gateway name (defaults to chart fullname) | `""` |
| `gatewayApi.gateway.gatewayClassName` | GatewayClass name (required when `createGateway=true`) | `""` |
| `gatewayApi.gateway.listeners` | Gateway listeners | HTTP:80 |
| `gatewayApi.httpsRedirect.enabled` | Enable HTTP→HTTPS redirect HTTPRoute | `false` |
| `gatewayApi.httpsRedirect.statusCode` | Redirect response code | `301` |
| `gatewayApi.httpsRedirect.hostnames` | Hostnames for redirect route | `[]` |
| `gatewayApi.httpsRedirect.parentRefs` | Override parentRefs for redirect route | `[]` |

## Manage Casdoor objects in the values file

You can keep organizations, applications, users, providers, roles, and permissions in the values file, next to the rest of the deployment. Casdoor applies them at startup and checks them for changes every 30 seconds. A `helm upgrade` that changes them takes effect without restarting the pods.

```yaml
initData:
  enabled: true
  data:
    organizations:
      - owner: admin
        name: acme
        displayName: Acme
        passwordType: bcrypt
    applications:
      - owner: admin
        name: app-acme
        organization: acme
        displayName: Acme Portal
        redirectUris:
          - https://portal.acme.example.com/callback
```

An existing object receives only the fields that you write here. Its other fields keep the values that were set in the admin console.

The chart stores the data in a Secret. To keep the data out of the values file, create the Secret yourself and set `initData.existingSecret`.

| Parameter | Description | Default |
|---|---|---|
| `initData.enabled` | Apply `initData.data` (or `initData.existingSecret`) | `false` |
| `initData.merge` | Update existing objects with the given fields only; when `false`, they are deleted and re-created on every apply | `true` |
| `initData.watchInterval` | Seconds between the checks for changes, `0` applies the data only at startup | `30` |
| `initData.existingSecret` | Existing Secret holding the data, instead of `initData.data` | `""` |
| `initData.existingSecretKey` | Key of the file in `existingSecret`, `.yaml`/`.yml` keys are read as YAML | `init_data.yaml` |
| `initData.data` | The objects to apply, in the [init data](/docs/deployment/data-initialization#configuration-as-code) format | `{}` |

## Upgrade the release

```bash
helm upgrade casdoor oci://ghcr.io/casdoor/helm-charts/casdoor --version <version>
```

:::note
Charts up to version 4.15.0 were published as `oci://registry-1.docker.io/casbin/casdoor-helm-charts`. That location still receives every release. To move an existing release to the new location, run the `helm upgrade` command above. Resource names stay the same.
:::

## Uninstall the release

```bash
helm uninstall casdoor
```

## See also

- [Data initialization](/docs/deployment/data-initialization)
- [Deploy on Kubernetes](/docs/deployment/k8s)
- [Configuration reference](/docs/basic/configuration)
- [Helm documentation](https://helm.sh/docs/)
