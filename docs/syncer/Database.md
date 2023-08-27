---
title: Database
description: Using Database Syncer to synchronize databases
keywords: [syncer, database]
authors: [Marvelousp4]
---

## Database Syncer

The users table we created as a demo is imported from the [template XLSX file](https://github.com/casdoor/casdoor/blob/master/xlsx/user_test.xlsx).

![Table](/img/syncer/Database/syncer_database_table.png)

To create a new syncer, go to the **Syncers** tab and fill in all the required information as shown below. Then, save the changes.

![edit](/img/syncer/Database/syncer_database_edit.png)

:::tip

In general, you need to fill in at least the `ID` and `Name` in the Casdoor columns. Other important fields include `createdTime`, `Password`, and `DisplayName`.

:::

The following fields are required:

- `Organization`: The organization that the user will be imported to
- `Name`: The syncer name
- `Type`: Select "database"
- `Host`: The original database host
- `Port`: The original database port
- `User`: The original database username
- `Password`: The original database password
- `Database type`: All Xorm-supported databases such as MySQL, PostgreSQL, SQL Server, Oracle, and SQLite
- `Database`: The original database name
- `Table`: The original user table name
- `Table columns`
- `Column name`: The original user column name
- `Column type`: The original user column type
- `Casdoor Column`: The Casdoor user column name

Optional fields:

- `Is hashed`: Whether to calculate hash value. When this option is enabled, the syncer will only synchronize the user if the field of the user in the origin table is updated. If this option is disabled, the syncer will still synchronize the user even if only the field is updated. In short, the user will not be synchronized until the fields involved in the hash calculation (enabled "Is hashed") are updated.
- `Is key`: Whether it is the primary key of the user in the origin table and the user in the Casdoor table. When synchronizing the database, it is determined based on the field whose "Is key" option is selected. At least one of the "Is key" buttons for fields should be selected. If none are selected, the first "Is key" option is selected by default.
- `Avatar base URL`: When syncing users, if the **Avatar base URL** is not empty and the origin **user.avatar** does not have the prefix "http", the new **user.avatar** will be replaced by **Avatar base URL + user.avatar**.
- `Affiliation table`: It is used to sync the affiliation of the user from this table in the database. Since the affiliation may be a code of type int in the "Affiliation table", it needs to be mapped to a string. Refer to [getAffiliationMap()](https://github.com/casdoor/casdoor/blob/9f3ee275a8b747f914f0e74e897a79abeff96ccb/object/syncer_affiliation.go#L32). Casdoor has some redundant fields to borrow, so [here](https://github.com/casdoor/casdoor/blob/9f3ee275a8b747f914f0e74e897a79abeff96ccb/object/syncer_util.go#L65) we use `score` to map the int code to a string name.

Once you have configured the syncer, enable the **Is enable** option and save. The syncer will start working.

![users](/img/syncer/Database/syncer_database_users.png)

You can also use the "Sync" button for database synchronization.

**Update**

When the `Table columns` are set as shown in the following figure, the update operation is performed.

![table_columns](/img/syncer/Database/syncer_database_table_columns.png)

If the data in the two tables is different for the key, you can synchronize the data between the two tables based on the primary key.

- Update user in the original table

<video src="/video/syncer/update_user.mp4" controls="controls" width="100%"></video>

- Update user in the Casdoor table

<video src="/video/syncer/update_casdoor.mp4" controls="controls" width="100%"></video>

**Add**

When the `Table columns` are set as shown in the following figure, the add operation is performed.

![table_columns](/img/syncer/Database/syncer_database_table_columns.png)

If the number of data between the two tables is different, add the data to the table with the lower number of data based on the primary key.

- Add user in the original table

<video src="/video/syncer/add_user.mp4" controls="controls" width="100%"></video>

- Add user in the Casdoor table

<video src="/video/syncer/add_casdoor.mp4" controls="controls" width="100%"></video>
