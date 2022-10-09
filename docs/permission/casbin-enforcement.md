---
title: Casbin Enforcement
description: Using exposed Casbin APIs to manage users' access rights in organization
keywords: [permission, Casbin]
---

## Exposed Casbin APIs

At the underlying of casdoor, each permission corresponds to a casbin enforcer. We provide some APIs to call these enforcers directly. You can use them to achieve more flexible permission management functions.

We will show some examples of using these APIs, the permission is shown below.

![permission_edit](/img/permission/permission_edit.png)

:::tip

You should log in to the Casdoor and get `casdoor_session_id` from cookies.

:::

### Enforce

Request:

```shell
curl --location --request POST 'http://localhost:8000/api/enforce' \
--header 'Content-Type: text/plain' \
--header 'Cookie: casdoor_session_id=b1888c74a7903f1813bf8c34269b0118' \
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
--header 'Cookie: casdoor_session_id=b1888c74a7903f1813bf8c34269b0118' \
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
--header 'Cookie: casdoor_session_id=b1888c74a7903f1813bf8c34269b0118'
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
--header 'Cookie: casdoor_session_id=b1888c74a7903f1813bf8c34269b0118'
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
--header 'Cookie: casdoor_session_id=b1888c74a7903f1813bf8c34269b0118'
```

Response:

```
[
    "role_kcx66l"
]
```
