---
title: User permissions
description: Assign permissions to users and roles; use the Permissions API.
keywords: [user, permissions, Casbin, API]
authors: [Resulte]
---

Users can have multiple **permissions**. You see them on the user’s profile.

![permissions](/img/user/users_permissions.png)

## Permission properties

Each permission has: **Owner**, **Name**, **CreatedTime**, **DisplayName**, **IsEnabled**, **Model**, **Users**, **Groups**, **Roles**, **ResourceType**, **Resources**, **Actions**, **Effect**, **ExpireTime**. **Users**, **Groups**, and **Roles** list who gets this permission. See [Configure a permission](/docs/permission/permission-configuration) for the fields.

## Managing permissions

Permissions are separate resources. The user’s `Permissions` field is filled when you load the user. To assign or change permissions, use the **Permissions** API, not the User API.

- **Web UI:** **Permissions** page (e.g. `https://door.casdoor.com/permissions`).
- **API:** [Casdoor API reference](https://door.casdoor.com/swagger) — permission endpoints.

### Update some fields of a permission

`POST /api/update-permission?id=<owner>/<name>` replaces the whole permission with the request body. Add the optional `columns` parameter, a comma-separated list of field names, to write only those fields from the body. The other fields keep their stored values. Field names can be camelCase or snake_case, for example `columns=users,roles`.

```shell
curl -X POST 'http://localhost:8000/api/update-permission?id=built-in/permission-read&columns=users' \
  --user '<client-id>:<client-secret>' \
  -H 'Content-Type: application/json' \
  -d '{"users": ["built-in/alice", "built-in/bob"]}'
```

If the permission doesn't exist, the response is `"data": "Unaffected"`.

### Update many permissions at once

`POST /api/update-permissions` takes a JSON array of complete permission objects. Casdoor identifies each permission by its `owner` and `name`, and checks each one in the same way as `POST /api/update-permission`, including the check against its model. Permissions that don't exist are skipped.

Casdoor rebuilds the Casbin policies of all changed permissions in one pass, instead of once per permission, so use this endpoint for bulk edits. The response is `"data": "Affected"` when at least one permission changed.

```shell
curl -X POST 'http://localhost:8000/api/update-permissions' \
  --user '<client-id>:<client-secret>' \
  -H 'Content-Type: application/json' \
  -d @permissions.json
```

Here, `permissions.json` contains the array of permissions, for example as returned by `GET /api/get-permissions?owner=built-in` and then edited.

## Where the permissions of a user come from

A user has a permission in any of these cases:

- The user is in the permission's **Sub users**. This is a direct assignment.
- The user is a member of a group in the permission's **Sub groups**. If the user is in at least one group, a permission whose **Sub groups** contains `*` or `<organization>/*` applies too.
- The user has a role in the permission's **Sub roles**, including roles that the user has through groups or role hierarchy. See [User roles](/docs/user/roles#where-the-roles-of-a-user-come-from).

When you fetch a user, each entry of `permissions` can carry `sourceGroups` and `sourceRoles`, the groups and roles through which the user has the permission. Empty or missing values mean a direct assignment. If the user also has the permission directly, both are empty. Casdoor computes them when the user is fetched and doesn't store them.

In the **Permissions** field of the user edit page, a directly assigned permission is a plain badge. An inherited permission is an outlined badge with an icon: a shield when a role grants it, otherwise a group icon. Hold the pointer over it to see the sources, for example `Roles: built-in/role_admin`.

## See also

- [User roles](/docs/user/roles)
- [Configure a permission](/docs/permission/permission-configuration)
