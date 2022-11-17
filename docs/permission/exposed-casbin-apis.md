---
title: Exposed Casbin APIs
description: Using exposed Casbin APIs to manage users' access rights in organization
keywords: [permission, Casbin]
author: MagicalSheep
---

## Introduction

Let's assume that your application front-end has obtained the `access_token` of the logged-in user, and now wants to authenticate the user for some access. All you need to do is pass the `access_token` into the `Authorization` field of the Http request header, such as `Authorization: Bearer XXX`, and then call the interface described below. 

As a note in advance, these interfaces are also pretty much designed (for now) for the `(sub, obj, act)` model. The `id` in the interface is the identity of the applied permission policy, which consists of the organization name and the permission policy name (ie `organization name/permission name`). `v1` and `v2` in turn correspond to the policy structure described by the permission model, usually representing `obj` and `act` respectively. 

In addition to the API interface for requesting enforcement of permission control, Casdoor also provides other interfaces that help external applications obtain permission policy information, which are also listed here. 

### Enforce

Request: 

```shell
curl --location --request POST 'http://localhost:8000/api/enforce' \
--header 'Content-Type: text/plain' \
--header 'Authorization: Bearer example_access_token' \
--data-raw '{"id":"built-in/permission-built-in", "v1":"app-built-in", "v2":"write"}'
```

Response:

```
true
```

### BatchEnforce

Request:

```shell
curl --location --request POST 'http://localhost:8000/api/batch-enforce' \
--header 'Content-Type: text/plain' \
--header 'Authorization: Bearer example_access_token' \
--data-raw '[{"id":"built-in/permission-built-in", "v1":"app-built-in", "v2":"write"}, {"id":"built-in/permission-built-in", "v1":"app-built-in", "v2":"read"}, {"id":"built-in/permission-built-in", "v1":"app-casnode", "v2":"write"}]'
```

Response:

```
[
    true,
    true,
    false
]
```

### GetAllObjects

Request:

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-objects' \
--header 'Authorization: Bearer example_access_token'
```

Response:

```
[
    "app-built-in"
]
```

### GetAllActions

Request:

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-actions' \
--header 'Authorization: Bearer example_access_token'
```

Response:

```
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
--header 'Authorization: Bearer example_access_token'
```

Response:

```
[
    "role_kcx66l"
]
```