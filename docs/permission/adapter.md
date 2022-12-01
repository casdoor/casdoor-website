---
title: Adapter
description: Config adapter and basic CRUD to policy
keywords: [permission, Casbin, adapter, policy]
authors: [leo220yuyaodog]
---

Casdoor supports using the UI to connect the adapter and manage the policy rules. In Casbin, the policy storage is implemented
as an adapter (aka middleware for Casbin). A Casbin user can use an adapter to load policy rules from a storage, or save
policy rules to it.

## Adapter

- `type` : Adapter type. Now support database adapter.
- `Host`
- `Port`
- `User`
- `Password`
- `Database type` : Now support MySQL, PostgreSQL, SQL server, Oracle, SQLite 3.
- `Database` : The database name.
- `Table` : The table name. If the table does not exist, it will be created.
- `model` : You can select one model belonging to the organization of the adapter.

![adapter_config](/img/permission/adapter/adapter_config.png)

:::info

After fill all the fields, please don't forget to **save** the config. Then click the **sync** button to load the policy rules.
The policy rules will be shown in the below table.

:::

![adapter_policy](/img/permission/adapter/adapter_policy.png)

## Basic CURD

If you connect the adapter successfully, you can make basic CURD to the policy rules.

- Add

  ![adapter_add](/img/permission/adapter/add.gif)

:::tip

You can only add one policy at one time. The newly added policy is in the first row in the table, but actually, it will
be saved in the last row. So next time you sync the policies, they will appear in the last row of the table.

:::

- Edit
  
  ![adapter_edit](/img/permission/adapter/edit.gif)

- Delete

  ![adapter_delete](/img/permission/adapter/delete.gif)
