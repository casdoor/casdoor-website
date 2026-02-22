---
title: Permission configuration
description: Configure Casbin permission policies and each field on the Edit Permission page.
keywords: [permissions, Casbin, policy, model]
authors: [MagicalSheep]
---

This page describes the fields on the **Edit Permission** form, where you define permission policies for an [organization](/docs/organization/overview).

## Opening the form

1. Sign in to Casdoor.
2. Go to **Permissions** in the sidebar.
3. Click **Add** for a new policy or open an existing one to edit.

![Permission Edit Page](/img/permission/permission_edit.png)

## Fields

### Basic information

**Organization** — The [organization](/docs/organization/overview) that owns this policy. One org can have multiple permission policies. Choose from the dropdown.

**Name** — Unique identifier for the policy inside the organization. Must be unique; it is used when calling [Casbin APIs](/docs/permission/exposed-casbin-apis).

**Display name** — Label shown in the UI.

### Model and storage

**Model** — The model that defines how this policy is evaluated (ACL, RBAC, ABAC, etc.). Create and edit models on the **Models** page. Examples:

- ACL, RBAC, ABAC — see [Casbin supported models](https://casbin.org/docs/supported-models).

:::tip
Design and test models in the [Casbin Online Editor](https://casbin.org/editor), then add them in Casdoor.
:::

**Adapter**

This field specifies the database table name where the permission policy rules are stored.

Casdoor uses its own database to store permission policies:

- If this field is **empty**, the permission policy will be stored in the `permission_rule` table
- If **specified**, it will be stored in the specified database table
- If the specified table name does not exist in the database, it will be created automatically

:::caution Important

Each Model should use a separate Adapter (table name). Different models with different structures should not share the same table, as this may cause conflicts when loading policies.

:::

Learn more about adapters in the [Adapter documentation](/docs/permission/adapter).

### Adapter and Model relationship

In Casdoor, adapters are **not configured per Permission**.

The adapter and authorization behavior (such as RBAC or ABAC support) are defined at the **Model** level.
A Permission only references a selected Model and provides policy data (subjects, resources, actions, effects).

If RBAC-related fields (for example, *Sub-users* or *Sub-roles*) are disabled on the Permission page,
it means the selected Model does not define a `role_definition` or does not support RBAC.

To use an adapter with a Permission:

1. Create or edit a Model and configure it with the appropriate Casbin definition and adapter.
2. Save the Model.
3. Select this Model when creating or editing a Permission.

This behavior is expected and by design.

### Subject Configuration

These fields define **who** the permission policy applies to.

#### Sub users

Which [users](/docs/user/overview) the permission applies to; select them on the **Edit Permission** page.

Examples:

- Select specific users like `alice`, `bob`
- Leave empty to not restrict by user

#### Sub roles

For RBAC, select which [roles](/docs/user/roles) apply to this permission on the **Edit Role** page.

This will add permission policies such as `g, user, role` for every user in this role.

Examples:

- Select roles like `admin`, `editor`, `viewer`
- All users with these roles will inherit the permissions

:::tip Role-Based Permissions

Using roles is a powerful way to manage permissions at scale. Instead of assigning permissions to individual users, you assign them to roles, and then assign roles to users.

:::

#### Sub domains

Which domains will the permission policy be applied to. This is useful for multi-tenant scenarios.

Examples:

- `domain1`, `domain2`
- Leave empty if not using domain-based access control

### Object and Action Configuration

These fields define **what** resources and **what actions** are controlled by the policy.

#### Resource type

Casdoor does not use this field for external app authentication; you can ignore it or use it for your own categorization.

#### Resources

This field describes the resources for which you wish to enforce permission control.

:::note

These resources are **not** the ones on the **Resources** page in the Casdoor UI. Use any string here, e.g.:

- A URL: `/api/users`, `/admin/dashboard`
- A file name: `document.pdf`, `config.yaml`
- A resource identifier: `project:123`, `database:users`

:::

Add multiple resources; Casdoor creates permission rules for each resource–action combination.

#### Actions

This field describes the actions to operate on resources. Similar to resources, it can be any string you want, such as:

- HTTP methods: `GET`, `POST`, `PUT`, `DELETE`
- CRUD operations: `read`, `write`, `update`, `delete`
- Custom actions: `view`, `edit`, `approve`, `publish`

:::caution

Casdoor **converts all these strings to lowercase** before storing them. Additionally, Casdoor will **apply all actions to each resource**. You cannot specify that an action only takes effect on certain resources in this configuration page.

:::

If you need fine-grained control over action-resource combinations, you should define this in your Model file.

### Effect Configuration

#### Effect

This option takes effect for Casdoor itself to control application access.

:::info

If you want an external application to enforce permission controls using the interface Casdoor exposes, this field won't do anything. You should describe the effect of pattern matching in the Model file using `allow` or `deny` rules.

:::

## Example Configuration

This page is tailored to the `(sub, obj, act)` model, one of the most common permission models.

Here's an example configuration:

- **Model**: `rbac_model` (Role-Based Access Control)
- **Sub roles**: `admin`, `editor`
- **Resources**: `/api/users`, `/api/posts`
- **Actions**: `read`, `write`

This would allow users with the `admin` or `editor` role to perform `read` and `write` actions on the `/api/users` and `/api/posts` resources.

## Related Topics

- [Permission Overview](/docs/permission/overview): Understand the basics of permissions in Casdoor
- [Exposed Casbin APIs](/docs/permission/exposed-casbin-apis): Use permissions in your external applications
- [Adapters](/docs/permission/adapter): Configure policy storage adapters
- [Account Customization](/docs/organization/accountCustomization): Configure View rule and Modify rule for user account fields
- [User Roles](/docs/user/roles): Manage user roles in the **Edit Role** page
