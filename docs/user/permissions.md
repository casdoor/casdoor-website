---
title: User permissions
description: Assign permissions to users and roles; use the Permissions API.
keywords: [user, permissions, Casbin, API]
authors: [Resulte]
---

Users can have multiple **permissions**. You see them on the user’s profile.

![permissions](/img/user/users_permissions.png)

## Permission properties

Each permission has: **Owner**, **Name**, **CreatedTime**, **DisplayName**, **IsEnabled**, **Model**, **Users**, **Roles**, **ResourceType**, **Resources**, **Actions**, **Effect**. **Users** and **Roles** list who gets this permission.

## Managing permissions

Permissions are separate resources. The user’s `Permissions` field is filled when you load the user. To assign or change permissions, use the **Permissions** API, not the User API.

- **Web UI:** **Permissions** page (e.g. `https://door.casdoor.com/permissions`).
- **API:** [Casdoor API reference](https://door.casdoor.com/swagger) — permission endpoints.

If a user is in a permission’s **Users** list or in a role that is in **Roles**, that permission appears in the user’s `Permissions` when you fetch the user.
