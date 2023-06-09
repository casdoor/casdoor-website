---
title: 开放的 Casbin API
description: 使用 Casbin 管理用户在组织中的访问权限
keywords:
  - 权限
  - Casbin
authors:
  - MagicalSheep
---

## 介绍

Let's assume that your application front-end has obtained the `access_token` of the logged-in user, and now wants to authenticate the user for some access. You cannot simply place the `access_token` to the HTTP request header to use these APIs, because Casdoor uses the `Authorization` field to check the access permission. Like any other APIs provided by Casdoor, the `Authorization` field consists of the application client id and secret, using the [Basic HTTP Authentication Scheme](https://datatracker.ietf.org/doc/html/rfc7617). 它看起来像 `Basic XXX`。 因此，Casbin API 应当被应用的后端服务器调用。 Here are steps about how to do it.

1. 前端通过 HTTP 请求头将 `access_token` 传递到后端服务器。
2. The backend server gets the user id from the `access_token`.

提前说明，这些接口也几乎是为 `(sub, obj, act)` 模型所设计的（就现阶段而言）。 The `permissionId` in the url parameters is the identity of the applied permission policy, which consists of the organization name and the permission policy name (ie `organization name/permission name`). The body is the request format defined by the Casbin model of the permission, usually representing `sub`, `obj` and `act` respectively.

除了请求强制执行权限控制的 API 接口以外，Casdoor 也提供了其它一些有助于外部应用获取权限策略信息的接口，也一并列在此处。

### Enforce

请求：

```shell
curl --location --request POST 'http://localhost:8000/api/enforce?permissionId=example-org/example-permission' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic client_id_and_secret' \
--data-raw '["example-org/example-user", "example-resource", "example-action"]'
```

响应：

```
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

请求：

```shell
curl --location --request POST 'http://localhost:8000/api/batch-enforce?permissionId=example-org/example-permission' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic client_id_and_secret' \
--data-raw '[["example-org/example-user", "example-resource", "example-action"], {"example-org/example-user2", "example-resource", "example-action"}, {"example-org/example-user3", "example-resource", "example-action"}]'
```

响应：

```
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

请求：

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-objects' \
--header 'Authorization: Basic client_id_and_secret'
```

响应：

```
[
    "app-built-in"
]
```

### GetAllActions

请求：

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-actions' \
--header 'Authorization: Basic client_id_and_secret'
```

响应：

```
[
    "read",
    "write",
    "admin"
]
```

### GetAllRoles

请求：

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-roles' \
--header 'Authorization: Basic client_id_and_secret'
```

响应：

```
[
    "role_kcx66l"
]
```