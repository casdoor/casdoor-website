---
title: Organization tree
description: User groups and group hierarchy within an organization.
keywords: [user, group, organization, tree]
authors: [leo220yuyaodog]
---

**Groups** are collections of users in an organization. A user can be in multiple groups.

## Group properties

- **Owner** — Owning organization
- **Name** — Unique group name
- **DisplayName**, **CreatedTime**, **UpdatedTime**
- **Type** — `Physical` or `Virtual`. A user can be in only one Physical group but multiple Virtual groups.
- **ParentGroup** — Parent group (top-level groups use the organization as parent)

## Managing groups

Groups can be managed in two places:

1. **Groups list page** — View all groups in the organization.

   ![groups list](/img/organization/organization_tree/groups_list.png)

2. **Organization list** — Click **Groups** on an organization to open the group tree.

   ![organization list](/img/organization/organization_tree/organization_tree_entry.png)

   ![groups tree](/img/organization/organization_tree/groups_tree.png)

   ![groups tree page](/img/organization/organization_tree/groups_tree.gif)

You can also assign and edit groups from a user’s profile.

![groups user](/img/organization/organization_tree/groups_user.png)
