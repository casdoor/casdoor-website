---
title: Permission Configuration
description: Using exposed Casbin APIs to manage users' access rights in an organization
keywords: [permissions, Casbin]
authors: [MagicalSheep]
---

This page explains each field in the **Edit Permission** page where you configure permission policies for your [organization](/docs/organization/overview).

## Accessing the Permission Configuration

To access the permission configuration page:

1. Log in to your Casdoor instance
2. Navigate to **Permissions** in the sidebar
3. Click **Add** to create a new permission or click on an existing permission to edit it

![Permission Edit Page](/img/permission/permission_edit.png)

## Configuration Fields

### Basic Information

#### Organization

The name of the [organization](/docs/organization/overview) to which the policy belongs. An organization can have multiple permission policy files. You can select the organization from the dropdown menu in the **Edit Permission** page.

#### Name

The globally unique name of the permission policy in the organization. It is used to identify the policy file.

- Must be unique within the organization
- Used as the identifier when calling [Casbin APIs](/docs/permission/exposed-casbin-apis)

#### Display name

A user-friendly name for the permission policy. This is shown in the Casdoor Web UI for better readability.

### Model and Storage Configuration

#### Model

The name of the model file that describes the structure and matching patterns of the permission policy. You can configure models in the **Edit Model** page.

Models define how permission checks are performed. For example:

- Simple ACL (Access Control List)
- RBAC (Role-Based Access Control)
- ABAC (Attribute-Based Access Control)

Learn more about models in the [Casbin documentation](https://casbin.org/docs/supported-models).

:::tip

Use the [Casbin Online Editor](https://casbin.org/editor) to create and test your model before adding it to Casdoor.

:::

#### Adapter

**Attention!** In the current version, this field describes the name of the database table that stores the permission policy, rather than the name of the adapter configured in the **Adapters** page in the Casdoor Web UI.

Casdoor uses its own database to store configured permission policies:

- If this field is **empty**, the permission policy will be stored in the `permission_rule` table
- If **specified**, it will be stored in the specified database table
- If the specified table name does not exist in the database used by Casdoor, it will be created automatically

:::caution Important

We strongly recommend **specifying different adapters (table names) for different models**, as keeping all policies in the same table may cause conflicts.

:::

Learn more about adapters in the [Adapter documentation](/docs/permission/adapter).

### Subject Configuration

These fields define **who** the permission policy applies to.

#### Sub users

Which [users](/docs/user/overview) will the permission policy be applied to. You can select specific users from the **Edit Permission** page.

Examples:

- Select specific users like `alice`, `bob`
- Leave empty to not restrict by user

#### Sub roles

If the RBAC (Role-Based Access Control) model is used, you can select which [roles](/docs/user/roles) will be applied to the permission policy. You configure roles in the **Edit Role** page.

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

In the current version, Casdoor does not use this field for external applications that want to authenticate. You can ignore it for now or use it for your own categorization purposes.

#### Resources

This field describes the resources for which you wish to enforce permission control.

:::note

Note that the resources here are **not** those configured in the **Resources** page of the Casdoor Web UI. You can add any string you want here, such as:

- A URL: `/api/users`, `/admin/dashboard`
- A file name: `document.pdf`, `config.yaml`
- A resource identifier: `project:123`, `database:users`

:::

You can add multiple resources, and Casdoor will create permission rules for each combination of resource and action.

#### Actions

This field describes the actions to operate on resources. Similar to resources, it can be any string you want, such as:

- HTTP methods: `GET`, `POST`, `PUT`, `DELETE`
- CRUD operations: `read`, `write`, `update`, `delete`
- Custom actions: `view`, `edit`, `approve`, `publish`

:::caution

Please note that Casdoor will **convert all these strings to lowercase** before storing them. Additionally, Casdoor will **apply all actions to each resource**. You cannot specify that an action only takes effect on certain resources in this configuration page.

:::

If you need fine-grained control over action-resource combinations, you should define this in your Model file.

### Effect Configuration

#### Effect

This option takes effect for Casdoor itself to control application access.

:::info

If you want an external application to enforce permission controls using the interface Casdoor exposes, this field won't do anything. You should describe the effect of pattern matching in the Model file using `allow` or `deny` rules.

:::

## Example Configuration

As you can see, this configuration page is almost tailor-made for the `(sub, obj, act)` model, which is one of the most common permission models.

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
