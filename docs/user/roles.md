---
title: User roles
description: Assign and manage roles for users; use roles with permission policies.
keywords: [user, roles, RBAC, API]
authors: [Resulte]
---

Users can have multiple **roles**. You see a user’s roles on their profile page.

![user roles](/img/user/users_roles.png)

## Role properties

Each role has:

- **Owner**, **Name**, **CreatedTime**, **DisplayName**, **IsEnabled**
- **Users** — list of users in this role
- **Roles** — list of child roles (for role hierarchy)

## Managing roles

Roles are separate resources. The user’s `Roles` field is filled when you load the user (it is not stored on the user record). To assign or change roles, use the **Roles** API, not the User API.

- **Web UI:** Open the **Roles** page (e.g. `https://door.casdoor.com/roles`).
- **API:** Use the role endpoints in the [Casdoor API reference](https://door.casdoor.com/swagger).

When you add a user to a role’s **Users** array, that role shows up in the user’s `Roles` when you fetch the user.
