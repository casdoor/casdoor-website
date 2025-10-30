---
title: Permissions
description: User Permissions
keywords: [user, permissions, API]
authors: [Resulte]
---

Each user may have multiple permissions. You can view the user's permissions on their profile.

![permissions](/img/user/users_permissions.png)

## Permission Properties

Permissions have the following properties:

* `Owner`
* `Name`
* `CreatedTime`
* `DisplayName`
* `IsEnabled`
* `Model`
* `Users`: An array of users belonging to this permission
* `Roles`: An array of roles belonging to this permission
* `ResourceType`
* `Resources`: An array of the resources
* `Actions`: An array of actions
* `Effect`

## Managing Permissions via API

Permissions are managed as separate resources in Casdoor. When you retrieve a user object, the `Permissions` field is populated dynamically by extending the user data with information from the Permissions resource.

To assign or update permissions for users, use the Permissions API endpoints rather than the User API. You can manage permissions through:

1. **Web UI**: Navigate to the Permissions management page (e.g., `https://door.casdoor.com/permissions`)
2. **API**: Use the permission-specific endpoints documented in the [Casdoor API reference](https://door.casdoor.com/swagger)

The Permission resource allows you to define permissions with specific users and roles assigned to them. When a user is added to a permission's `Users` array or belongs to a role in the permission's `Roles` array, that permission will automatically appear in the user's `Permissions` field when retrieving user data.
