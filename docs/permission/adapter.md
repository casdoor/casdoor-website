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
   | **Type** | Kind of adapter. Only `Database` is available |
   | **Host**, **Port**, **User**, **Password** | Connection to the database |
   | **Database type** | MySQL, PostgreSQL, SQL Server, Oracle, or SQLite 3 |
   | **Database** | Name of the database |
   | **Table** | Name of the table. Casdoor creates it if it doesn't exist |

   ![Adapter edit page](/img/permission/adapter/adapter_config.png)

1. Save the adapter.
1. Click **Sync** to load the policies into the table on the page.

   ![Policies of the adapter](/img/permission/adapter/adapter_policy.png)

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
