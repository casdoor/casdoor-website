---
title: Overview
description: Use Casbin to manage fine-grained access control for users and resources in your organization.
keywords: [permissions, Casbin, RBAC, access control]
authors: [seriouszyx, MagicalSheep]
---

## Introduction

Users in a [Casdoor organization](/docs/organization/overview) can access that organization’s applications by default. When you need to restrict access to specific applications or resources, use the **Permission** feature powered by [Casbin](https://casbin.org/).

## Casbin concepts

To use permissions effectively, it helps to understand how [Casbin](https://casbin.org/) works:

- **Model**: Defines the structure of your permission policies and how requests are matched and evaluated. Configure models on the **Models** page in Casdoor.
- **Policy**: Defines concrete permission rules (who can do what on which resources). Configure policies on the **Permissions** page in Casdoor.
- **Adapter**: Abstracts where policies are stored (e.g. files or a database). See [Adapters](/docs/permission/adapter) for details.

:::tip

For more on Casbin’s access control models and patterns, see the [Casbin documentation](https://casbin.org/docs/overview). Use the [Casbin Online Editor](https://casbin.org/editor) to create and test Model and Policy files.

:::

## Configuring permissions in Casdoor

### Where to configure

In the Casdoor web UI, use these two areas:

1. **Models**: Open **Models** in the sidebar to add or edit models for your organization.

   ![Model Edit Page](/img/permission/overview/model_edit.png)

2. **Permissions**: Open **Permissions** in the sidebar to configure permission policies.

   ![Permission Edit Page](/img/permission/permission_edit.png)

### How permissions work

1. **Add a model**: Create a model for your [organization](/docs/organization/overview) on the **Models** page.
2. **Configure a policy**: Add a policy (permission rules) for that organization on the **Permissions** page.

Generate Model and Policy files in the [Casbin Online Editor](https://casbin.org/editor), then import the model into Casdoor via the web UI. For step-by-step policy configuration, see [Permission configuration](/docs/permission/permission-configuration).

## Using permissions from your application

Casdoor uses its own Casbin model and policy to control access to its APIs. External applications cannot call Casbin directly; they must use the APIs that Casdoor exposes for the built-in Casbin engine.

See [Exposed Casbin APIs](/docs/permission/exposed-casbin-apis) for API definitions and usage.

## Related features

### Account item permissions

On the **Edit Organization** page, control access to individual user account fields:

- **View rule**: Who can view each field
- **Modify rule**: Who can modify each field

Options: **Public** (everyone), **Self** (only the user), or **Admin** (administrators only). See [Account customization](/docs/organization/accountCustomization) for details.

### Role-based access control

Casdoor supports [roles](/docs/user/roles): assign roles to users and attach permission policies to roles so access is managed at the role level instead of per user.

## Next steps

- [Permission configuration](/docs/permission/permission-configuration) — Configure each field on the Permissions page
- [Exposed Casbin APIs](/docs/permission/exposed-casbin-apis) — Call Casbin from your application
- [Adapters](/docs/permission/adapter) — Configure where policies are stored
- [Account customization](/docs/organization/accountCustomization) — Field-level permissions for user accounts
