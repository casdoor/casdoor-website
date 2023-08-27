---
title: Organization Tree
description: User groups within an organization
keywords: [user, group, organization, tree]
authors: [leo220yuyaodog]
---

Groups are a collection of users within an organization. A user can belong to multiple groups.

## Group properties

- `Owner`: The organization that owns the group
- `Name`: Unique group name
- `displayName`
- `CreatedTime`
- `UpdatedTime`
- `Type`: Groups can be classified as either `Physical` or `Virtual`. A user can only belong to one `Physical` group but can be in multiple `Virtual` groups.
- `ParentGroup`: The parent group of a group (The parent group of the top-level groups in the organization is the organization itself)

## Managing groups

There are two ways to manage groups:

1. On the groups list page, you can view all the groups within the organization.

    ![groups list](/img/organization/organization_tree/groups_list.png)

2. Click the **Groups** button on the organization list page.

    ![organization list](/img/organization/organization_tree/organization_tree_entry.png)

    This will display the tree structure of the groups within the organization.

    ![groups tree](/img/organization/organization_tree/groups_tree.png)

    Here is a video that shows how to manage groups:

    ![groups tree page](/img/organization/organization_tree/groups_tree.gif)

    Groups can also be edited in a user's profile.

    ![groups user](/img/organization/organization_tree/groups_user.png)
