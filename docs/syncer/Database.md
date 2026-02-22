---
title: Database syncer
description: Sync user data from an external database into Casdoor.
keywords: [syncer, database]
authors: [Marvelousp4]
---

The **database syncer** connects to an external database and syncs user data into Casdoor. A demo users table can be imported from the [template XLSX](https://github.com/casdoor/casdoor/blob/master/xlsx/user_test.xlsx).

![Table](/img/syncer/Database/syncer_database_table.png)

## Create a syncer

Go to **Syncers** and create a new syncer with the following. Save when done.

![edit](/img/syncer/Database/syncer_database_edit.png)

:::tip
Fill at least **ID** and **Name** in the Casdoor column mapping. Other useful fields include `createdTime`, `Password`, and `DisplayName`.
:::

### Required fields

| Field | Description |
|-------|-------------|
| **Organization** | Organization to import users into. |
| **Name** | Syncer name. |
| **Type** | `database`. |
| **Host**, **Port**, **User**, **Password** | Source database connection. |
| **Database type** | MySQL, PostgreSQL, SQL Server, Oracle, or SQLite (Xorm-supported). |
| **Database** | Source database name. |
| **Table** | Source user table name. |
| **Table columns** | **Column name** (source), **Column type** (source), **Casdoor Column** (Casdoor user field). |

### Optional fields

| Field | Description |
|-------|-------------|
| **Is hashed** | If enabled, sync runs only when fields included in the hash change; other field-only changes do not trigger sync. |
| **Is key** | Marks the primary key used to match source and Casdoor users. At least one column must be key; if none is set, the first is used. |
| **Avatar base URL** | If set and source `user.avatar` does not start with `http`, Casdoor stores `Avatar base URL + user.avatar`. |
| **Affiliation table** | Table used to sync user affiliation. Int codes can be mapped to names; see [getAffiliationMap()](https://github.com/casdoor/casdoor/blob/9f3ee275a8b747f914f0e74e897a79abeff96ccb/object/syncer_affiliation.go#L32) and [syncer_util](https://github.com/casdoor/casdoor/blob/9f3ee275a8b747f914f0e74e897a79abeff96ccb/object/syncer_util.go#L65) (e.g. `score` for int→string mapping). |

Enable **Is enable** and save; the syncer will run. You can also trigger a sync with the **Sync** button.

![users](/img/syncer/Database/syncer_database_users.png)

## Update

With **Table columns** configured for key mapping, differences on the key between source and Casdoor trigger updates:

- **Update in source table** — changes sync to Casdoor.

<video src="/video/syncer/update_user.mp4" controls="controls" width="100%"></video>

- **Update in Casdoor** — changes sync back to source.

<video src="/video/syncer/update_casdoor.mp4" controls="controls" width="100%"></video>

## Add

When row counts differ, the syncer adds rows to the table with fewer rows, using the key to match:

- **Add user in source table**:

<video src="/video/syncer/add_user.mp4" controls="controls" width="100%"></video>

- **Add user in Casdoor table**:

<video src="/video/syncer/add_casdoor.mp4" controls="controls" width="100%"></video>
