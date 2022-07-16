---
sidebar_position: 1
title: Overview
description: Using Casbin to manage users' access rights in organization
keywords: [permission, Casbin]
---

## Introduction

All users associated with a single Casdoor organization are shared between the organization's applications and therefore have access to the applications. To restrict users' access to certain applications, you can use `Permission` implemented by [Casbin](https://casbin.io/). 

Inside a permission, the `Sub users` and `Resources` attributes are availabel to check which application the user is using for login. Also, it supports to config custom model to meet the diverse needs of users. 

See the following example to get a clearer picture of Casdoor's permission control for application. 

## Permission for applications

Before using `Permission`, you need to create a `Model` which is abstracted into a CONF file based on the PERM metamodel. You can visit the [Casbin documentation](https://casbin.io/docs/syntax-for-models) for more information. 

Click the `Models` tab and add a new model. In the edit page, you can config custom model such as ACL model in the `Model text`.

```ini
[request_definition]
r = sub, obj, act

[policy_definition]
p = permission, sub, obj, act

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = r.sub == p.sub && r.obj == p.obj && r.act == p.act
```

![](/img/model_edit.png)

:::info
You need to pay special attention to the fact that the first parameter of the policy definition needs to be **permission** in order to distinguish the policies with different permissions in the `permission_rule` table.
:::

Click the `Permissions` tab and add a new permission. In the edit page, you need to select the model, sub users, resources and actions as below.  

![](/img/permission_edit.png)

After saving, the user `test`, `seriouszyx` and `admin` can login to the application `app-built-in`. The other users such as `casdoortest` cannot. 

![](/img/permission_fail_to_login.png)