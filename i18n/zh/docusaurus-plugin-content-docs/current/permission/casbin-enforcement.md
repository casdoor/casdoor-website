---
title: Casbin运行
description: 使用开放的Casbin API管理用户在组织中的访问权限
keywords:
  - 权限
  - Casbin
author: seriouszyx
---

## 开放的Casbin API

在casdoor的底层，每个许可对应一个casbin运行器。 我们提供了一些API来直接调用这些执行器。 您可以使用它们来获得更灵活的权限管理功能。

我们将展示一些这些API的使用示例，权限如下。

![编辑权限](/img/permission/permission_edit.png)

:::tip

您应该登录到 Casdoor 并从 cookie 中获取 `casdoor_session_id`。

:::

### 运行

请求：

```shell
curl --location --request POST 'http://localhost:8000/api/enforce' \
--header 'Content-Type: text/plain' \
--header 'Cookie: casdoor_session_id=b1888c74a7903f1813bf8c34269b0118' \
--data-raw '{"id":"built-in/permission-built-in", "v1":"app-built-in", "v2":"write"}'
```

响应:

```
true
```

### 批量运行

请求 ︰

```shell
curl --location --request POST 'http://localhost:8000/api/batch-enforce' \
--header 'Content-Type: text/plain' \
--header 'Cookie: casdoor_session_id=b1888c74a7903f1813bf8c34269b0118' \
--data-raw '[{"id":"built-in/permission-built-in", "v1":"app-built-in", "v2":"write"}, {"id":"built-in/permission-built-in", "v1":"app-built-in", "v2":"read"}, {"id":"built-in/permission-built-in", "v1":"app-casnode", "v2":"write"}]'
```

响应:

```
[
    true,
    true,
    false
]
```

### GetAllObjects

请求︰

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-objects' \
--header 'Cookie: casdoor_session_id=b1888c74a7903f1813bf8c34269b0118'
```

响应:

```
[
    "app-built-in"
]
```

### GetAllActions

请求：

```shell
curl --location --request GET 'http://localhost:8000/api/get-all-actions' \
--header 'Cookie: casdoor_session_id=b1888c74a7903f1813bf8c34269b0118'
```

响应:

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
--header 'Cookie: casdoor_session_id=b1888c74a7903f1813bf8c34269b0118'
```

响应:

```
[
    "role_kcx66l"
]
```
