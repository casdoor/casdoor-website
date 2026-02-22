---
title: Exposed Casbin APIs
description: Call Casbin from your backend to enforce and manage permissions.
keywords: [permissions, Casbin, enforce, API]
authors: [MagicalSheep]
---

## Overview

Your frontend has the user’s `access_token` and your backend needs to check permissions. **Casbin APIs must be called from the backend** with [HTTP Basic Auth](https://datatracker.ietf.org/doc/html/rfc7617) using the **application** client ID and secret: `Authorization: Basic <clientId> <clientSecret>`. Example (demo app): `Authorization: Basic 294b09fbc17f95daf2fe dd8982f7046ccba1bbd7851d5c1ece4e52bf039d`.

Flow: frontend sends the user’s `access_token` to your backend; backend gets the user id from the token and calls the Casbin APIs with the app’s client credentials. The request body follows the permission’s Casbin model (typically `[sub, obj, act]`).

Besides the enforce API, Casdoor exposes APIs to read policy data; they are listed below.

### Enforce

POST to `/api/enforce` with **exactly one** of these query parameters:

- **permissionId** — `org/permission-name`
- **modelId** — `org/model-name` (all permissions using that model)
- **resourceId** — resource id (all permissions for that resource)
- **enforcerId** — enforcer id
- **owner** — organization name (all permissions in that org)

Example with `permissionId`:

```shell
curl --location --request POST 'http://localhost:8000/api/enforce?permissionId=example-org/example-permission' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>' \
--data-raw '["example-org/example-user", "example-resource", "example-action"]'
```

Example with `modelId`:

```shell
curl --location --request POST 'http://localhost:8000/api/enforce?modelId=example-org/example-model' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>' \
--data-raw '["example-org/example-user", "example-resource", "example-action"]'
```

Example with `resourceId`:

```shell
curl --location --request POST 'http://localhost:8000/api/enforce?resourceId=example-org/example-resource' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>' \
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

When using `modelId`, `resourceId`, `enforcerId`, or `owner`, the response `data` may have multiple booleans (one per permission) and `data2` lists the corresponding model/adapter ids.

### BatchEnforce

Same query parameters as Enforce (only one at a time). Request body is an array of `[sub, obj, act]` arrays:

- **permissionId**, **modelId**, **enforcerId**, **owner** — same as Enforce (only one at a time).

Example with `permissionId`:

```shell
curl --location --request POST 'http://localhost:8000/api/batch-enforce?permissionId=example-org/example-permission' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>' \
--data-raw '[["example-org/example-user", "example-resource", "example-action"], ["example-org/example-user2", "example-resource", "example-action"], ["example-org/example-user3", "example-resource", "example-action"]]'
```

Example with `modelId`:

```shell
curl --location --request POST 'http://localhost:8000/api/batch-enforce?modelId=example-org/example-model' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>' \
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

With `modelId`, `enforcerId`, or `owner`, `data` contains multiple boolean arrays (one per permission) and `data2` lists the model/adapter ids.

### GetAllObjects

Returns all objects (resources) the user can access. Optional query: `userId` (defaults to the session user).

With `userId`:

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-objects?userId=example-org/example-user' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>'
```

Without `userId` (uses session):

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-objects' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>'
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

### GetAllActions

Returns all actions the user can perform. Optional `userId` (defaults to session).

With `userId`:

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-actions?userId=example-org/example-user' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>'
```

Without `userId` (uses session):

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-actions' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>'
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

### GetAllRoles

Returns all roles assigned to the user. Optional `userId` (defaults to session).

With `userId`:

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-roles?userId=example-org/example-user' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>'
```

Without `userId` (uses session):

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-roles' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>'
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

### RunCasbinCommand

Runs Casbin CLI commands (Java, Go, Node.js, Python, etc.) via Casdoor and returns the output. Results are cached in memory for 5 minutes; identical requests return the cached result.

**Query parameters:**

- **language** — Casbin CLI language (`go`, `java`, `node`, `python`, etc.)
- **args** — JSON array of CLI arguments (e.g. `["-v"]`, `["new"]`). URL-encode when used in the query.

Example:

```shell
curl --location --request GET 'http://localhost:8000/api/run-casbin-command?language=go&args=["-v"]' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>'
```

Response:

```json
{
    "status": "ok",
    "msg": "",
    "data": "casbin version 2.x.x"
}
```

Cache keys are based on language and args; expired entries are removed automatically.
