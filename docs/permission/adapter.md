---
title: Adapter
description: Connect Casbin policy storage (database) and manage policies in the UI.
keywords: [permission, Casbin, adapter, policy]
authors: [leo220yuyaodog]
---

In Casbin, an **adapter** is the layer that loads and saves policy rules (e.g. to a database). Casdoor lets you configure an adapter in the UI and run basic CRUD on policies.

## Adapter configuration

- **Type** — Adapter type (currently database only).
- **Host**, **Port**, **User**, **Password** — Database connection.
- **Database type** — MySQL, PostgreSQL, SQL Server, Oracle, or SQLite 3.
- **Database** — Database name.
- **Table** — Table name (created if it does not exist).

![adapter_config](/img/permission/adapter/adapter_config.png)

:::info
After saving the adapter config, click **Sync** to load policies into the table below.
:::

![adapter_policy](/img/permission/adapter/adapter_policy.png)

## CRUD on policies

Once the adapter is connected, you can add, edit, and delete policy rows in the UI.

**Add** — One policy at a time. New rows appear at the top in the UI but are stored at the end; after the next sync they show in the correct order.

![adapter_add](/img/permission/adapter/add.gif)

**Edit** — ![adapter_edit](/img/permission/adapter/edit.gif)

**Delete** — ![adapter_delete](/img/permission/adapter/delete.gif)
