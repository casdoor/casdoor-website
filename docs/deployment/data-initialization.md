---
title: Data initialization
description: Initialize or migrate Casdoor data using JSON config files.
keywords: [data initialization, deployment, import, export]
authors: [leo220yuyaodog]
---

When shipping Casdoor as part of a larger product, preload organizations, applications, users, and other data so users get a working setup without manual configuration. Data initialization uses a JSON file that you provide or generate.

This page describes how to **import** and **export** configuration data.

## Import

By default, Casdoor looks for `init_data.json` in the project root at startup and loads it if present. To use a different path, set `initDataFile` in `conf/app.conf`:

```ini
initDataFile = /path/to/your/init_data.json
```

A template is available at [init_data.json.template](https://github.com/casdoor/casdoor/blob/master/init_data.json.template). Copy and rename it to `init_data.json` and customize as needed.

### Docker

Mount the file into the container with a volume:

```bash
docker run ... -v /path/to/init_data.json:/init_data.json
```

### Kubernetes

Store the file in a ConfigMap and mount it into the Casdoor pod:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: casdoor-init-data
data:
  init_data.json:
```

Mount the ConfigMap in your Deployment, for example:

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
        volumeMounts:
        - mountPath: /init_data.json
          name: casdoor-init-data-volume
          subPath: init_data.json
      volumes:
      - configMap:
          name: casdoor-init-data
        name: casdoor-init-data-volume
```

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
