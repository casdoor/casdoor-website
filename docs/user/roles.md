---
title: User Roles
description: Roles assigned to users
keywords: [user, roles, API]
authors: [Resulte]
---

Each user can have multiple roles.
You can view the roles assigned to a user on their profile.

![user roles](/img/user/users_roles.png)

## Role Properties

Every role has the following properties:

* `Owner`
* `Name`
* `CreatedTime`
* `DisplayName`
* `IsEnabled`
* `Users`: An array of sub users belonging to this role
* `Roles`: An array of sub roles belonging to this role

## Managing Roles via API

Roles are managed as separate resources in Casdoor. When you retrieve a user object, the `Roles` field is populated dynamically by extending the user data with information from the Roles resource.

To assign or update roles for users, use the Roles API endpoints rather than the User API. You can manage roles through:

1. **Web UI**: Navigate to the Roles management page (e.g., `https://door.casdoor.com/roles`)
2. **API**: Use the role-specific endpoints documented in the [Casdoor API reference](https://door.casdoor.com/swagger)

The Role resource allows you to define roles with specific users assigned to them. When a user is added to a role's `Users` array, that role will automatically appear in the user's `Roles` field when retrieving user data.
