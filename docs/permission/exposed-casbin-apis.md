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

As a note in advance, these interfaces are also designed (for now) for the `(sub, obj, act)` model. The `permissionId` in the URL parameters is the identity of the applied permission policy, which consists of the organization name and the permission policy name (i.e., `organization name/permission name`). The body is the request format defined by the Casbin model of the permission, usually representing `sub`, `obj` and `act` respectively.

In addition to the API interface for requesting enforcement of permission control, Casdoor also provides other interfaces that help external applications obtain permission policy information, which is also listed here.

### Enforce

Request:

```shell
curl --location --request POST 'http://localhost:8000/api/enforce?permissionId=example-org/example-permission' \
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
    "data2": null
}
```

### BatchEnforce

Request:

```shell
curl --location --request POST 'http://localhost:8000/api/batch-enforce?permissionId=example-org/example-permission' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>' \
--data-raw '[["example-org/example-user", "example-resource", "example-action"], ["example-org/example-user2", "example-resource", "example-action"], ["example-org/example-user3", "example-resource", "example-action"]]'
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
    "data2": null
}
```

### GetAllObjects

Request:

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-objects' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>'
```

Response:

```json
[
    "app-built-in"
]
```

### GetAllActions

Request:

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-actions' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>'
```

Response:

```json
[
    "read",
    "write",
    "admin"
]
```

### GetAllRoles

Request:

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-roles' \
--header 'Authorization: Basic <Your_Application_ClientId> <Your_Application_ClientSecret>'
```

Response:

```json
[
    "role_kcx66l"
]
```
