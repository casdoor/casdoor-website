---
title: Permissions
sidebar_label: Overview
description: Casdoor permissions are built on Casbin. This page explains models, policies, and adapters, and how your application checks permissions through the Casdoor API.
keywords: [permissions, Casbin, RBAC, access control]
authors: [seriouszyx, MagicalSheep]
---

By default, the users of an [organization](/docs/organization/overview) can open all of its applications. To restrict access to applications, or to resources inside your own application, use permissions. Casdoor permissions are built on [Casbin](https://casbin.apache.org/), an authorization library that supports access control lists (ACL), role-based access control (RBAC), attribute-based access control (ABAC), and other models.

## Casbin concepts

| Concept | Description | Where you configure it |
|---|---|---|
| Model | The structure of the policies and how Casdoor matches a request against them | **Models** page |
| Policy | Concrete rules: who may do what on which resource. In Casdoor, a policy is a permission | **Permissions** page |
| Adapter | Where the policies are stored, such as a database table | [Adapters](/docs/permission/adapter) |

For the access control models of Casbin, see the [Casbin documentation](https://casbin.apache.org/docs/overview). To write and test models and policies, use the [Casbin online editor](https://casbin.apache.org/editor).

## Set up permissions {#configuring-permissions-in-casdoor}

1. Write the model in the [Casbin online editor](https://casbin.apache.org/editor) and test it with example policies.
1. In the Casdoor admin console, open the **Models** page and add the model to your organization.

   ![Model edit page](/img/permission/overview/model_edit.png)

1. Open the **Permissions** page and add a permission that uses the model. See [Configure a permission](/docs/permission/permission-configuration).

   ![Permission edit page](/img/permission/permission_edit.png)

## Check permissions from your application {#using-permissions-from-your-application}

Your application doesn't run Casbin itself. It calls the Casbin APIs that Casdoor exposes, such as `/api/enforce`. See [Casbin APIs](/docs/permission/exposed-casbin-apis).

Casdoor uses its own Casbin model and policies to protect its API. Those are separate from the permissions that you define.

## Related features

- **Roles**: Assign [roles](/docs/user/roles) to users and grant permissions to roles, so that you manage access per role instead of per user.
- **Account fields**: View rules and modify rules control who can see and change each field of a user profile. They are separate from permissions. See [Customize the account page](/docs/organization/accountCustomization).

## See also

- [Configure a permission](/docs/permission/permission-configuration)
- [Casbin APIs](/docs/permission/exposed-casbin-apis)
- [Adapters](/docs/permission/adapter)
