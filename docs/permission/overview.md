---
title: Overview
description: Using Casbin to manage users' access rights in organization
keywords: [permission, Casbin]
---

## Introduction

All users associated with a single Casdoor organization are shared between the organization's applications and therefore have access to the applications. To restrict users' access to certain applications, you can use `Permission` implemented by [Casbin](https://casbin.io/). 

Inside a permission, the `Sub users` and `Resources` attributes are available to check which application the user is using for login. Also, it supports to config customized models to meet the diverse needs of users. 

See the following example to get a clearer picture of Casdoor's permission control for application. 

## Permission for applications

Before using `Permission`, you need to create a `Model` which is abstracted into a CONF file based on the PERM metamodel. You can visit the [Casbin documentation](https://casbin.io/docs/syntax-for-models) for more information. We recommend using the [Casbin Online Editor](https://casbin.org/casbin-editor/) to design the model and check the grammar. 

Click the `Models` tab and add a new model. In the edit page, you can config customized models such as ACL model in the `Model text`.

```ini
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = r.sub == p.sub && r.obj == p.obj && r.act == p.act
```

![](/img/model_edit.png)

Click the `Permissions` tab and add a new permission. In the edit page, you need to select the model, adapter, sub users, resources and actions as below.  

![](/img/permission_edit.png)

:::info

The `Adapter` field supports specifying the table name where the policies are stored. If this field is empty, the policies are stored in the `permission_rule` table. We strongly recommend **specifying different Adapter for different models**, because it's likely to cause conflicts for storing all policies in the same table. 
:::


After saving, the user `test`, `seriouszyx` and `admin` can login to the application `app-built-in`. The other users such as `casdoortest` cannot. 

![](/img/permission_fail_to_login.png)
