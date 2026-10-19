---
title: Adapters
sidebar_label: Adapter
description: Connect Casdoor to a database table that holds Casbin policies, and view and edit the policies in the admin console.
keywords: [permission, Casbin, adapter, policy]
authors: [leo220yuyaodog]
---

This guide explains adapters. In Casbin, an adapter loads and saves policy rules, for example from a database table. In Casdoor, you configure an adapter in the admin console and then view and edit its policies there.

---

#### Learning outcomes

- Connect an adapter to a database table.
- Load the policies and add, edit, and delete them.

#### What you need

- A database that Casdoor can reach

---

## Configure the adapter {#adapter-configuration}

1. In the Casdoor admin console, open the **Adapters** page and add an adapter.
1. Fill in the fields:

   | Field | Description |
   |---|---|
   | **Use same DB** | Store the policies in the database of Casdoor itself. The connection fields below are then hidden |
   | **Type** | Kind of adapter. Only `Database` is available |
   | **Host**, **Port**, **User**, **Password** | Connection to the database |
   | **Database type** | MySQL, PostgreSQL, SQL Server, Oracle, or SQLite 3 |
   | **Database** | Name of the database |
   | **Table** | Name of the table. Casdoor creates it if it doesn't exist |

   ![Adapter edit page](/img/permission/adapter/adapter_config.png)

1. Save the adapter.
1. Click **Sync** to load the policies into the table on the page.

   ![Policies of the adapter](/img/permission/adapter/adapter_policy.png)

## Databases that an adapter can reach

Global administrators, that is, users of the `built-in` organization, can connect an adapter of the `built-in` organization to any database. For the adapters of every other organization, Casdoor applies these rules when it connects to the database, and also when an organization administrator saves the adapter:

- **Host** must resolve to an Internet address. Private, loopback, link-local, and unspecified addresses, and the shared address space `100.64.0.0/10`, are refused with `the host: <host> is not allowed, only Internet addresses can be requested`. The check is skipped when **Use same DB** is on or the database type is SQLite.
- To connect to a database on the intranet, a global administrator adds the host to **Trusted database hosts** of the organization. See [Trusted database hosts](/docs/organization/overview#trusted-database-hosts).
- Only global administrators can save an SQLite adapter that doesn't use **Use same DB**. Anyone else gets `Unauthorized operation`.

For every adapter that doesn't use **Use same DB** and isn't SQLite, **Host**, **User**, and **Database** can't contain whitespace or any of the characters `?#/()'"\=;&`.

When an organization administrator saves an adapter with **Use same DB** on, the **Table** must be a valid table name: a letter followed by letters, digits, or underscores. An empty **Table** means `casbin_rule`. The table can't be an existing table, such as a table of Casdoor or of another organization, unless an adapter of the same organization with **Use same DB** on already uses it. Otherwise, saving fails with `the table: <table> is already used by Casdoor or another organization`.

A permission whose adapter sets a **Table** must use an adapter with **Use same DB** on, unless the adapter belongs to the `built-in` organization. Otherwise, the permission fails with `the adapter: <adapter-id> of permission: <permission-id> must use the same DB as Casdoor`.

An enforcer that an organization administrator saves must refer to a model and an adapter of the enforcer's own organization.

## Edit the policies {#crud-on-policies}

Add a policy, one at a time:

![Recording of adding a policy](/img/permission/adapter/add.gif)

A new policy appears at the top of the table but is stored at the end. After the next sync, it appears in the stored order.

Edit a policy:

![Recording of editing a policy](/img/permission/adapter/edit.gif)

Delete a policy:

![Recording of deleting a policy](/img/permission/adapter/delete.gif)

## See also

- [Permissions](/docs/permission/overview)
- [Configure a permission](/docs/permission/permission-configuration)
