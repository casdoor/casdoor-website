---
title: Exposed Casbin APIs
description: Using exposed Casbin APIs to manage user access rights in organizations
keywords: [permissions, Casbin]
authors: [MagicalSheep]
---

## Introduction

Let's assume that your application's front-end has obtained the `access_token` of the logged-in user and now wants to authenticate the user for some access. You cannot simply place the `access_token` into the HTTP request header to use these APIs because Casdoor uses the `Authorization` field to check the access permission. Like any other APIs provided by Casdoor, the `Authorization` field consists of the application client id and secret, using the [Basic HTTP Authentication Scheme](https://datatracker.ietf.org/doc/html/rfc7617).
It looks like `Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>`. For this reason, Casbin APIs should be called by the application backend server. Here are the steps on how to do it.

Take the [app-vue-python-example](https://door.casdoor.com/applications/casbin/app-vue-python-example) application in the demo site for example, the authorization header should be: `Authorization: Basic 294b09fbc17f95daf2fe dd8982f7046ccba1bbd7851d5c1ece4e52bf039d`.

1. The front-end passes the `access_token` to the backend server through the HTTP request header.
2. The backend server retrieves the user id from the `access_token`.

As a note in advance, these interfaces are also designed (for now) for the `(sub, obj, act)` model. The body is the request format defined by the Casbin model of the permission, usually representing `sub`, `obj` and `act` respectively.

In addition to the API interface for requesting enforcement of permission control, Casdoor also provides other interfaces that help external applications obtain permission policy information, which is also listed here.

### Enforce

The Enforce API supports multiple query parameters to specify which permission(s) to enforce against. **Only one parameter should be provided at a time**:

- `permissionId`: The identity of a specific permission policy (format: `organization name/permission name`)
- `modelId`: The identity of a permission model (format: `organization name/model name`) - enforces against all permissions using this model
- `resourceId`: The identity of a resource - enforces against all permissions for this resource
- `enforcerId`: The identity of a specific enforcer
- `owner`: The organization name - enforces against all permissions in this organization

Request using `permissionId`:

```shell
curl --location --request POST 'http://localhost:8000/api/enforce?permissionId=example-org/example-permission' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>' \
--data-raw '["example-org/example-user", "example-resource", "example-action"]'
```

Request using `modelId`:

```shell
curl --location --request POST 'http://localhost:8000/api/enforce?modelId=example-org/example-model' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>' \
--data-raw '["example-org/example-user", "example-resource", "example-action"]'
```

Request using `resourceId`:

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

Note: When using `modelId`, `resourceId`, `enforcerId`, or `owner` parameters, the response `data` array may contain multiple boolean values (one for each permission that was checked), and `data2` contains the corresponding model and adapter identifiers.

### BatchEnforce

The BatchEnforce API supports multiple query parameters to specify which permission(s) to enforce against. **Only one parameter should be provided at a time**:

- `permissionId`: The identity of a specific permission policy (format: `organization name/permission name`)
- `modelId`: The identity of a permission model (format: `organization name/model name`) - enforces against all permissions using this model
- `enforcerId`: The identity of a specific enforcer
- `owner`: The organization name - enforces against all permissions in this organization

Request using `permissionId`:

```shell
curl --location --request POST 'http://localhost:8000/api/batch-enforce?permissionId=example-org/example-permission' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>' \
--data-raw '[["example-org/example-user", "example-resource", "example-action"], ["example-org/example-user2", "example-resource", "example-action"], ["example-org/example-user3", "example-resource", "example-action"]]'
```

Request using `modelId`:

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

Note: When using `modelId`, `enforcerId`, or `owner` parameters, the response `data` array may contain multiple arrays of boolean values (one array for each permission that was checked), and `data2` contains the corresponding model and adapter identifiers.

### GetAllObjects

This API retrieves all objects (resources) that a user has access to. It accepts an optional `userId` parameter. If not provided, it uses the logged-in user's session.

Request with `userId` parameter:

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-objects?userId=example-org/example-user' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>'
```

Request using session (userId determined from session):

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

This API retrieves all actions that a user can perform. It accepts an optional `userId` parameter. If not provided, it uses the logged-in user's session.

Request with `userId` parameter:

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-actions?userId=example-org/example-user' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>'
```

Request using session (userId determined from session):

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

This API retrieves all roles assigned to a user. It accepts an optional `userId` parameter. If not provided, it uses the logged-in user's session.

Request with `userId` parameter:

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-roles?userId=example-org/example-user' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>'
```

Request using session (userId determined from session):

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

This API executes Casbin CLI commands and returns their output. It's designed for running language-specific Casbin command-line tools through Casdoor's backend, supporting languages like Java, Go, Node.js, Python, and others.

The API includes an in-memory cache that stores command results for 5 minutes. When the same command is executed with identical parameters, the cached result is returned immediately without re-executing the command, improving response times and reducing server load.

Request:

```shell
curl --location --request GET 'http://localhost:8000/api/run-casbin-command?language=go&args=["-v"]' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>'
```

Parameters:

- `language`: The programming language for the Casbin CLI (e.g., `go`, `java`, `node`, `python`)
- `args`: A JSON-encoded array of command-line arguments (e.g., `["-v"]` for version, `["new"]` for creating new files). Note: URL-encode the JSON array when using it as a query parameter

Response:

```json
{
    "status": "ok",
    "msg": "",
    "data": "casbin version 2.x.x"
}
```

The cache key is generated from the language and arguments, so different commands are cached independently. Expired entries are automatically cleaned up to prevent memory growth.
