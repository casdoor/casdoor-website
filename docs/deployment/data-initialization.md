---
title: Data initialization
description: Initialize, migrate or declaratively manage Casdoor data with a JSON or YAML file.
keywords: [data initialization, deployment, import, export, declarative configuration, configuration as code, GitOps]
authors: [leo220yuyaodog]
---

When shipping Casdoor as part of a larger product, preload organizations, applications, users, and other data so users get a working setup without manual configuration. Data initialization uses a JSON or YAML file that you provide or generate.

The same file can also be the source of truth for the configuration: Casdoor can watch it and apply every change without a restart, see [Configuration as code](#configuration-as-code).

This page describes how to **import** and **export** configuration data.

## Import

By default, Casdoor looks for `init_data.json` in the project root at startup and loads it if present. To use a different path, set `initDataFile` in `conf/app.conf`:

```ini
initDataFile = /path/to/your/init_data.json
```

A template is available at [init_data.json.template](https://github.com/casdoor/casdoor/blob/master/init_data.json.template). Copy and rename it to `init_data.json` and customize as needed. A file ending in `.yaml` or `.yml` is read as YAML, with the same structure.

By default, every object of the file that already exists is deleted and re-created from the file at each startup, so changes made in the web UI to those objects are lost on restart. Two settings change that:

- `initDataNewOnly = true`: only objects that don't exist yet are added, existing ones are left untouched.
- `initDataMerge = true`: existing objects are updated with only the fields written in the file, see [Configuration as code](#configuration-as-code).

### Docker

Mount the file into the container with a volume:

```bash
docker run ... -v /path/to/init_data.json:/init_data.json
```

### Kubernetes

With the [Helm chart](/docs/basic/try-with-helm), put the objects under `initData.data` in your values file and set `initData.enabled: true`, see [Configuration as code](#configuration-as-code).

Without the chart, store the file in a Secret (it usually holds passwords and client secrets) or a ConfigMap and mount it into the Casdoor pod:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: casdoor-init-data
stringData:
  init_data.yaml: |
    organizations:
      - owner: admin
        name: acme
        displayName: Acme
```

Mount it as a directory and point `initDataFile` to the file in it:

```yaml
apiVersion: apps/v1
kind: Deployment
...
spec:
  template:
    ...
    spec:
      containers:
      ...
        env:
        - name: initDataFile
          value: /init-data/init_data.yaml
        - name: initDataMerge
          value: "true"
        - name: initDataWatchInterval
          value: "30"
        volumeMounts:
        - mountPath: /init-data
          name: casdoor-init-data-volume
          readOnly: true
      volumes:
      - secret:
          secretName: casdoor-init-data
        name: casdoor-init-data-volume
```

Don't mount the file with `subPath`: Kubernetes doesn't update a `subPath` mount when the Secret or ConfigMap changes, so Casdoor would never see the new content.

## Configuration as code

To keep organizations, applications, users, providers, roles and permissions in Git and roll changes out like any other configuration, similar to authentik blueprints, let Casdoor apply the file continuously:

```ini
initDataFile = ./init_data.yaml
initDataMerge = true
initDataWatchInterval = 30
```

The settings can also be passed as environment variables of the same names.

- **Merge**: an object that already exists is updated with only the fields written in the file. Its other fields keep their current values, so the file can manage a few settings of an object (e.g. the redirect URIs of an application) while the rest is edited in the web UI.
- **Watch**: Casdoor checks the file every `initDataWatchInterval` seconds and applies it again when its content changed, without a restart.
- A user's `password` is only used when the user is created, so users can change their own passwords afterwards. Organization secrets such as `masterPassword` are written on every apply when they are in the file.
- Objects removed from the file are not deleted from Casdoor.
- `records` and `sessions` are skipped in merge mode, they are runtime data.
- If an object fails to apply, the error is logged once and Casdoor keeps running with the objects applied up to that point; the file is retried on every check until it applies.

Example `init_data.yaml`:

```yaml
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
users:
  - owner: acme
    name: alice
    displayName: Alice
    password: change-me
    signupApplication: app-acme
roles:
  - owner: acme
    name: admins
    displayName: Admins
    users: [acme/alice]
    isEnabled: true
```

With the Helm chart, the same objects go under `initData.data`; the chart stores them in a Secret and enables merge and watch by default:

```yaml
initData:
  enabled: true
  data:
    organizations:
      - owner: admin
        name: acme
        displayName: Acme
```

A `helm upgrade` that changes `initData.data` is applied by the running pods within `initData.watchInterval` seconds plus the time kubelet takes to update the mounted Secret (about a minute).

If you prefer `terraform plan`, import of existing objects and drift detection, the [Terraform provider](/docs/deployment/terraform) manages the same objects through the API.

## Export

Export all Casdoor config data to a JSON file for backup or migration.

### Using the binary (recommended)

Run Casdoor with the `-export` flag to dump the database to JSON:

```bash
# Export to default location (init_data_dump.json)
./casdoor -export

# Export to a custom path
./casdoor -export -exportPath /path/to/backup.json
```

Export runs after DB init and then the process exits. It works with binary, Docker, or Kubernetes and does not require the Go toolchain.

### Using Go test (from source)

From the Casdoor source tree:

```bash
go test ./object -v -run TestDumpToFile
```

This creates `init_data_dump.json` in that directory.

### Migrating to another instance

Rename `init_data_dump.json` to `init_data.json`, put it in the root of the target Casdoor instance, and start Casdoor; the data will be loaded automatically.

## Supported objects

The following object types can be included in the init file:

| Object        | Go Struct                                                                                                                     | Documentation                                                     |
|---------------|-------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| organizations | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/organization.go#L50)         | [doc](https://casdoor.org/docs/organization/overview)             |
| applications  | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/application.go#L59)          | [doc](https://casdoor.org/docs/application/overview)              |
| users         | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/user.go#L49)                 | [doc](https://casdoor.org/docs/user/overview)                     |
| certs         | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/cert.go#L24)                 | [doc](/docs/cert/overview)                                         |
| providers     | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/provider.go#L29)             | [doc](https://casdoor.org/docs/provider/overview)                 |
| ldaps         | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/ldap.go#L21)                 | [doc](https://casdoor.org/docs/ldap/overview)                     |
| models        | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/model.go#L26)                |                                                                   |
| permissions   | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/permission.go#L26)           | [doc](https://casdoor.org/docs/permission/overview)               |
| payments      | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/payment.go#L26)              | [doc](https://casdoor.org/zh/docs/products/payment)               |
| products      | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/product.go#L28)              | [doc](https://casdoor.org/zh/docs/products/product)               |
| resources     | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/resource.go#L25)             | [doc](https://casdoor.org/docs/resources/overview)                |
| roles         | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/role.go#L27)                 | [doc](https://casdoor.org/zh/docs/user/roles)                     |
| syncers       | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/syncer.go#L33)               | [doc](https://casdoor.org/docs/syncer/overview)                   |
| tokens        | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/token.go#L46)                | [doc](https://casdoor.org/docs/token/overview)                    |
| webhooks      | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/webhook.go#L29)              | [doc](https://casdoor.org/docs/webhooks/overview)                 |
| groups        | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/group.go#L27)                | [doc](https://casdoor.org/zh/docs/organization/organization-tree) |
| adapters      | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/adapter.go#L28)              | [doc](https://casdoor.org/zh/docs/permission/adapter)             |
| enforcers     | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/enforcer.go#L26)             |                                                                   |
| plans         | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/plan.go#L25)                 | [doc](https://casdoor.org/zh/docs/pricing/plan)                   |
| pricings      | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/pricing.go#L24)              | [doc](https://casdoor.org/docs/pricing/overview)                  |
| invitations   | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/invitation.go#L25)           | [doc](https://casdoor.org/zh/docs/application/invitation-code)    |
| records       | [struct](https://github.com/casvisor/casvisor-go-sdk/blob/afd3c328ccf117cde693bf6f850d467933ceb1f7/casvisorsdk/record.go#L24) |                                                                   |
| sessions      | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/session.go#L30)              |                                                                   |
| subscriptions | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/subscription.go#L39)         | [doc](https://casdoor.org/zh/docs/pricing/subscription)           |
| transactions  | [struct](https://github.com/casdoor/casdoor/blob/f9ee8a68cb36ef39a551ee49907c239b9d71840c/object/transaction.go#L24)          |                                                                   |

For the exact JSON shape, call the REST API or inspect `GetXXX` responses in the browser; they match the structure expected in `init_data.json`.
