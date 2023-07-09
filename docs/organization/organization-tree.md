---
title: Organization Tree
description: the user's groups
keywords: [user, group, organization, tree]
authors: [leo220yuyaodog]
---

Groups is a collection of users under an organization. A user can be in multiple groups.

## Group properties

- `Owner` Owner organization of the group
- `Name` Group name (unique)
- `displayName`
- `CreatedTime`
- `UpdatedTime`
- `Type` Groups have two types: `Phsical` and `Vertual`, a use can only be in one `Phsical` group, but can be in multiple `Vertual` groups.
- `ParentGroup` Parent group of the group (The parent group of top groups in the organization is the organization itself)

## Manage groups

There are two ways to manage groups:

1. In the groups list pages, you can see all the groups in organizations.

    ![groups list](/img/organization/oganization_tree/groups_list.png)

2. Click the **Groups** button in organization list page

    ![organization list](/img/organization/oganization_tree/organization_tree_entry.png)

    Then you can see the tree structure of the groups in the organization.

    ![groups tree](/img/organization/oganization_tree/groups_tree.png)

    Here is a video show you how to manage groups:

    ![groups tree page](/img/organization/oganization_tree/groups_tree.gif)

    Groups can be also edit in user profile.

    ![groups user](/img/organization/oganization_tree/groups_user.png)
