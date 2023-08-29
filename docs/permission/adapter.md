---
title: Adapter
description: Configure adapter and perform basic CRUD operations on policy
keywords: [permission, Casbin, adapter, policy]
authors: [leo220yuyaodog]
---

Casdoor supports using the UI to connect the adapter and manage policy rules. In Casbin, the storage of policy rules is implemented as an adapter, which acts as middleware for Casbin. A Casbin user can use an adapter to load policy rules from a storage or save policy rules to it.

## Adapter

- `type`: Adapter type. Currently supports database adapter.
- `Host`
- `Port`
- `User`
- `Password`
- `Database type`: Currently supports MySQL, PostgreSQL, SQL Server, Oracle, SQLite 3.
- `Database`: The name of the database.
- `Table`: The name of the table. If the table does not exist, it will be created.

![adapter_config](/img/permission/adapter/adapter_config.png)

:::info

After filling in all the fields, please remember to **save** the configuration. Then click the **sync** button to load the policy rules. The policy rules will be displayed in the table below.

:::

![adapter_policy](/img/permission/adapter/adapter_policy.png)

## Basic CRUD Operations

If you have successfully connected the adapter, you can perform basic CRUD operations on the policy rules.

- Add

  ![adapter_add](/img/permission/adapter/add.gif)

:::tip

You can only add one policy at a time. The newly added policy will appear as the first row in the table, but it will actually be saved in the last row. So, when you sync the policies next time, they will appear in the last row of the table.

:::

- Edit

  ![adapter_edit](/img/permission/adapter/edit.gif)

- Delete

  ![adapter_delete](/img/permission/adapter/delete.gif)
