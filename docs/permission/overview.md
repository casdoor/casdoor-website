---
title: Overview
description: Using Casbin to manage user access rights in organizations
keywords: [permissions, Casbin]
authors: [seriouszyx, MagicalSheep]
---

## Introduction

All users associated with a single [Casdoor organization](/docs/organization/overview) share access to the organization's applications. However, there may be instances where you want to restrict user access to certain applications or specific resources within an application. In such cases, you can utilize the `Permission` feature provided by [Casbin](https://casbin.org/).

## Understanding Casbin Concepts

Before delving deeper into the topic, it is important to have a basic understanding of how [Casbin](https://casbin.org/) works and its related concepts:

- **Model**: Defines the structure of your permission policies and the criteria for matching requests against these policies and their outcomes. You can configure models in the **Models** page in Casdoor.
- **Policy**: Describes the specific permission rules (who can access what resources with what actions). You configure policies in the **Permissions** page in Casdoor.
- **Adapter**: An abstraction layer that shields Casbin's executor from the source of the Policy, allowing the storage of Policies in various locations like files or databases. Learn more about [Adapters](/docs/permission/adapter).

:::tip Learn More About Casbin

Visit the [Casbin documentation](https://casbin.org/docs/overview) to learn more about access control models and patterns. You can also use the [Casbin Online Editor](https://casbin.org/editor) to create and test Model and Policy files for your specific scenarios.

:::

## Configuring Permissions in Casdoor

### Where to Configure

In the Casdoor Web UI, you'll work with two main pages:

1. **Models Page**: Navigate to **Models** in the sidebar to add or edit Models for your organization.

   ![Model Edit Page](/img/permission/overview/model_edit.png)

2. **Permissions Page**: Navigate to **Permissions** in the sidebar to configure permission policies.

   ![Permission Edit Page](/img/permission/permission_edit.png)

### How Permissions Work

Returning to the subject of permission configuration in Casdoor:

1. **Add a Model**: First, create a Model for your [organization](/docs/organization/overview) in the **Models** page within the Casdoor Web UI.
2. **Configure a Policy**: Then, add a Policy (permission rules) for your organization in the **Permissions** page.

The [Casbin Online Editor](https://casbin.org/editor) can provide you with Model and Policy files tailored to your specific usage scenarios. You can effortlessly import the Model file into Casdoor through its Web UI for use by the built-in Casbin. For the Policy configuration (i.e., the **Permissions** page in the Casdoor Web UI), refer to the [Permission Configuration](/docs/permission/permission-configuration) guide for detailed instructions.

## Using Permissions with Your Application

Just as your application needs to enforce permission control through Casdoor's built-in Casbin, Casdoor itself utilizes its own Model and Policy to regulate access permissions for the API interfaces through Casbin. Though Casdoor can call Casbin from internal code, external applications cannot.

Casdoor's default permissions allow all users to access product and order information through APIs like `get-product`, `get-order`, `get-orders`, and `get-user-orders`. This means users can retrieve details about products they're interested in and track their own purchase history without requiring special privileges. If you need stricter control over these endpoints, you can customize the permission policies through Casbin.

As a solution, Casdoor exposes an API for external applications to call the built-in Casbin. See the [Exposed Casbin APIs](/docs/permission/exposed-casbin-apis) documentation for definitions of these API interfaces and instructions on how to use them.

## Related Features

### Account Item Permissions

Casdoor also provides fine-grained permission control at the user account field level through the **Edit Organization** page:

- **View rule**: Control who can view specific user account fields
- **Modify rule**: Control who can modify specific user account fields

These rules can be set to:

- **Public**: Everyone has permission
- **Self**: Each user has their own permission
- **Admin**: Only administrators have permission

Learn more in the [Account Customization](/docs/organization/accountCustomization) documentation.

### Role-Based Access Control

Casdoor supports role-based permissions where you can assign [roles](/docs/user/roles) to users and configure permission policies for these roles. This allows you to manage permissions at the role level rather than individual user level.

## Next Steps

- [Permission Configuration](/docs/permission/permission-configuration): Learn how to configure each field in the Permission page
- [Exposed Casbin APIs](/docs/permission/exposed-casbin-apis): Use Casbin APIs in your external applications
- [Adapters](/docs/permission/adapter): Configure adapters for policy storage
- [Account Customization](/docs/organization/accountCustomization): Configure field-level permissions for user accounts

Let's get started!
