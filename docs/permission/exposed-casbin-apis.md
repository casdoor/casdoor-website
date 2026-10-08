---
title: Casbin APIs
sidebar_label: Exposed Casbin APIs
description: Reference for the Casbin APIs of Casdoor - enforce, batch enforce, and the lists of objects, actions, and roles of a user - which your backend calls to check permissions.
keywords: [permissions, Casbin, enforce, API]
authors: [MagicalSheep]
---

Casdoor exposes its Casbin engine through an API, so that your backend can check the [permissions](/docs/permission/overview) that you define in Casdoor.

## Authentication

Call the Casbin APIs from your backend, never from the browser. Authenticate with HTTP Basic authentication ([RFC 7617](https://datatracker.ietf.org/doc/html/rfc7617)), with the client ID of your application as the username and its client secret as the password. With curl, pass `--user '<client-id>:<client-secret>'`.

A typical flow:

1. Your frontend sends the access token of the user to your backend.
1. Your backend reads the user ID from the token.
1. Your backend calls the Casbin API with the credentials of the application, and with a request body in the format of the model of the permission, typically `[sub, obj, act]`.

## Enforce

`POST /api/enforce` checks one request. Send exactly one of the following query parameters:

| Parameter | Checks the request against |
|---|---|
| `permissionId` | One permission: `<organization>/<permission-name>` |
| `modelId` | All permissions that use the model: `<organization>/<model-name>` |
| `resourceId` | All permissions for the resource |
| `enforcerId` | One enforcer |
| `owner` | All permissions of the organization |

With `permissionId`:

```shell
curl --location --request POST 'http://localhost:8000/api/enforce?permissionId=example-org/example-permission' \
--header 'Content-Type: application/json' \
--user '<client-id>:<client-secret>' \
--data-raw '["example-org/example-user", "example-resource", "example-action"]'
```

With `modelId`:

```shell
curl --location --request POST 'http://localhost:8000/api/enforce?modelId=example-org/example-model' \
--header 'Content-Type: application/json' \
--user '<client-id>:<client-secret>' \
--data-raw '["example-org/example-user", "example-resource", "example-action"]'
```

With `resourceId`:

```shell
curl --location --request POST 'http://localhost:8000/api/enforce?resourceId=example-org/example-resource' \
--header 'Content-Type: application/json' \
--user '<client-id>:<client-secret>' \
--data-raw '["example-org/example-user", "example-resource", "example-action"]'
```

Response:

```json
{
    "status": "ok",
    "msg": "",
    "sub": "",
    "name": "",
    "data": [
        true
    ],
    "data2": [
        "example-org/example-model/example-adapter"
    ]
}
```

With `modelId`, `resourceId`, `enforcerId`, or `owner`, `data` can contain several booleans, one per permission, and `data2` lists the corresponding models and adapters.

## Batch enforce {#batchenforce}

`POST /api/batch-enforce` checks several requests at once. It takes the same query parameters as enforce, one at a time. The body is an array of requests, each in the form `[sub, obj, act]`.

With `permissionId`:

```shell
curl --location --request POST 'http://localhost:8000/api/batch-enforce?permissionId=example-org/example-permission' \
--header 'Content-Type: application/json' \
--user '<client-id>:<client-secret>' \
--data-raw '[["example-org/example-user", "example-resource", "example-action"], ["example-org/example-user2", "example-resource", "example-action"], ["example-org/example-user3", "example-resource", "example-action"]]'
```

With `modelId`:

```shell
curl --location --request POST 'http://localhost:8000/api/batch-enforce?modelId=example-org/example-model' \
--header 'Content-Type: application/json' \
--user '<client-id>:<client-secret>' \
--data-raw '[["example-org/example-user", "example-resource", "example-action"], ["example-org/example-user2", "example-resource", "example-action"]]'
```

Response:

```json
{
    "status": "ok",
    "msg": "",
    "sub": "",
    "name": "",
    "data": [
        [
            true,
            true,
            false
        ]
    ],
    "data2": [
        "example-org/example-model/example-adapter"
    ]
}
```

With `modelId`, `enforcerId`, or `owner`, `data` contains one array of booleans per permission, and `data2` lists the corresponding models and adapters.

## Get all objects {#getallobjects}

`GET /api/get-all-objects` returns the objects that a user can access. The optional `userId` parameter names the user. Without it, Casdoor uses the user of the session.

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-objects?userId=example-org/example-user' \
--user '<client-id>:<client-secret>'
```

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-objects' \
--user '<client-id>:<client-secret>'
```

Response:

```json
{
    "status": "ok",
    "msg": "",
    "data": [
        "app-built-in",
        "example-resource"
    ]
}
```

## Get all actions {#getallactions}

`GET /api/get-all-actions` returns the actions that a user can perform. `userId` works as for objects.

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-actions?userId=example-org/example-user' \
--user '<client-id>:<client-secret>'
```

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-actions' \
--user '<client-id>:<client-secret>'
```

Response:

```json
{
    "status": "ok",
    "msg": "",
    "data": [
        "read",
        "write",
        "admin"
    ]
}
```

## Get all roles {#getallroles}

`GET /api/get-all-roles` returns the roles of a user. `userId` works as for objects.

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-roles?userId=example-org/example-user' \
--user '<client-id>:<client-secret>'
```

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-roles' \
--user '<client-id>:<client-secret>'
```

Response:

```json
{
    "status": "ok",
    "msg": "",
    "data": [
        "role_kcx66l"
    ]
}
```

## Run a Casbin command {#runcasbincommand}

`GET /api/run-casbin-command` runs the Casbin command-line tool of a language and returns its output. It requires administrator rights, except in demo mode, where it is public.

| Parameter | Description |
|---|---|
| `language` | Language of the Casbin CLI, such as `go`, `java`, `node`, or `python` |
| `args` | JSON array of arguments, such as `["-v"]` or `["new"]`. URL-encode it |

```shell
curl --location --request GET 'http://localhost:8000/api/run-casbin-command?language=go&args=["-v"]' \
--user '<client-id>:<client-secret>'
```

Response:

```json
{
    "status": "ok",
    "msg": "",
    "data": "casbin version 2.x.x"
}
```

Casdoor caches the result for five minutes per combination of language and arguments, and returns the cached result for identical requests.

## See also

- [Permissions](/docs/permission/overview)
- [Configure a permission](/docs/permission/permission-configuration)
- [Call the Casdoor API](/docs/basic/public-api)
