---
title: Initialize and manage data with a file
sidebar_label: Data initialization
description: Load organizations, applications, users, and other objects into Casdoor from a JSON or YAML file, keep them in sync with the file, and export them.
keywords: [data initialization, deployment, import, export, declarative configuration, configuration as code, GitOps]
authors: [leo220yuyaodog]
---

This guide explains how to load data into Casdoor from a JSON or YAML file, how to let Casdoor keep its objects in sync with that file, and how to export the data of a running instance.

---

#### Learning outcomes

- Load organizations, applications, users, and other objects when Casdoor starts.
- Keep Casdoor objects in a file in Git and apply changes without a restart.
- Export the data of an instance and load it into another instance.

#### What you need

- A Casdoor instance and access to its `conf/app.conf` or its environment variables
- For the Kubernetes sections: `kubectl` access to the cluster, or the [Helm chart](/docs/basic/try-with-helm)

---

## About the init data file

When you ship Casdoor as part of a larger product, you can preload organizations, applications, users, and other objects, so that the product works without manual setup. Casdoor reads these objects from one file, the init data file.

The file serves two purposes:

- **Initialization**: Casdoor loads the file once, when it starts.
- **Configuration as code**: Casdoor watches the file and applies every change while it runs. See [Manage configuration as code](/docs/deployment/data-initialization#configuration-as-code).

A template is available at [`init_data.json.template`](https://github.com/casdoor/casdoor/blob/master/init_data.json.template). A file that ends in `.yaml` or `.yml` is read as YAML with the same structure.

## Load data at startup {#import}

1. Copy [`init_data.json.template`](https://github.com/casdoor/casdoor/blob/master/init_data.json.template) to `init_data.json` in the directory that Casdoor runs in, and edit it.

   To keep the file somewhere else, set `initDataFile` in `conf/app.conf`:

   ```ini
   initDataFile = /path/to/your/init_data.json
   ```

1. Choose what happens to objects that already exist. Set at most one of the following options in `conf/app.conf`:

   | Option | Objects that already exist |
   |---|---|
   | Neither option (default) | Deleted and created again from the file at every start. Changes made in the admin console are lost on restart |
   | `initDataNewOnly = true` | Left as they are. Casdoor only adds objects that don't exist yet |
   | `initDataMerge = true` | Updated with only the fields that the file contains. See [Manage configuration as code](/docs/deployment/data-initialization#configuration-as-code) |

1. Start Casdoor.

### Load the file in Docker

Mount the file into the container:

```bash
docker run ... -v /path/to/init_data.json:/init_data.json
```

### Load the file in Kubernetes

With the [Helm chart](/docs/basic/try-with-helm), put the objects under `initData.data` in your values file and set `initData.enabled: true`. See [Manage configuration as code](/docs/deployment/data-initialization#configuration-as-code).

Without the chart:

1. Store the file in a Secret, because it usually holds passwords and client secrets. A ConfigMap also works.

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

1. Mount the Secret as a directory and point `initDataFile` to the file in it:

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

:::caution
Don't mount the file with `subPath`. Kubernetes doesn't update a `subPath` mount when the Secret or ConfigMap changes, so Casdoor never sees the new content.
:::

## Manage configuration as code {#configuration-as-code}

To keep organizations, applications, users, providers, roles, and permissions in Git and roll out changes like any other configuration, let Casdoor apply the file continuously.

1. Set the following options in `conf/app.conf`, or pass them as environment variables with the same names:

   ```ini
   initDataFile = ./init_data.yaml
   initDataMerge = true
   initDataWatchInterval = 30
   ```

1. Write the objects in the file. For example, `init_data.yaml`:

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

1. Start Casdoor. From now on, Casdoor applies the file again whenever its content changes.

With the Helm chart, put the same objects under `initData.data`. The chart stores them in a Secret and turns on merge and watch by default:

```yaml
initData:
  enabled: true
  data:
    organizations:
      - owner: admin
        name: acme
        displayName: Acme
```

The running pods apply a `helm upgrade` that changes `initData.data` within `initData.watchInterval` seconds, plus the time that the kubelet needs to update the mounted Secret, which is about a minute.

### How Casdoor applies the file

| Behavior | Description |
|---|---|
| Merge | Casdoor updates an existing object with only the fields that the file contains. The other fields keep their values. The file can therefore manage a few settings of an object, such as the redirect URLs of an application, while you edit the rest in the admin console |
| Watch | Casdoor checks the file every `initDataWatchInterval` seconds and applies it again when the content has changed, without a restart |
| Passwords | Casdoor uses the `password` of a user only when it creates the user, so users can change their passwords afterward. Casdoor writes organization secrets, such as `masterPassword`, on every apply when the file contains them |
| Removed objects | Casdoor doesn't delete objects that you remove from the file |
| Runtime data | Casdoor skips `records` and `sessions` in merge mode |
| Errors | If an object fails to apply, Casdoor logs the error once and keeps running with the objects that it applied up to that point. It retries the file on every check until the file applies |

:::tip
If you prefer `terraform plan`, import of existing objects, and drift detection, use the [Terraform provider](/docs/deployment/terraform). It manages the same objects through the API.
:::

## Export data {#export}

Export all data of a Casdoor instance to a JSON file for a backup or a migration.

### Export with the binary

Run Casdoor with the `-export` flag. This is the recommended way. It works with the binary, in Docker, and in Kubernetes, and it doesn't need the Go toolchain.

```bash
# Export to default location (init_data_dump.json)
./casdoor -export

# Export to a custom path
./casdoor -export -exportPath /path/to/backup.json
```

Casdoor initializes the database connection, writes the file, and exits.

### Export from source

In the Casdoor source tree, run:

```bash
go test ./object -v -run TestDumpToFile
```

The command creates `init_data_dump.json` in the `object` directory.

### Load the export into another instance

1. Rename `init_data_dump.json` to `init_data.json`.
1. Put the file in the directory that the target Casdoor instance runs in.
1. Start the target instance. It loads the data at startup.

## Supported objects

The init data file can contain the following objects:

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

The JSON shape of each object is the shape that the REST API returns. To see an example, call the corresponding `get-` endpoint or inspect the responses in the browser while you use the admin console.

## See also

- [Configuration reference](/docs/basic/configuration)
- [Terraform provider](/docs/deployment/terraform)
- [Run Casdoor on Kubernetes with Helm](/docs/basic/try-with-helm)
