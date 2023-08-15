---
title: Database
description: Using Databse Syncer to synchronize database
keywords: [syncer, database]
authors: [Marvelousp4]
---

## Database Syncer

The users table we created as a demo are imported from the [template XLSX file](https://github.com/casdoor/casdoor/blob/master/xlsx/user_test.xlsx).

![Table](/img/syncer/Database/syncer_database_table.png)

Click the **Syncers** tab and create a new syncer. Fill in all the required information as below and save.

![edit](/img/syncer/Database/syncer_database_edit.png)

:::tip

In general, you need to fill in at least the `ID` and `Name` in Casdoor Columns. And others important fields like `createdTime`, `Password`, `DisplayName`.

:::

The following are the required fields.

- `Organization`: The organization that the user will import
- `Name`: The syncer name
- `Type`: Select database
- `Host`: The original database host
- `Port`: The original database port
- `User`: The original database username
- `Password`: The original database password
- `Database type`: All Xorm supported databases, like: MySQL, PostgreSQL, SQL Server, Oracle, Sqlite
- `Database`: The original database name
- `Table`: The original user table name
- `Table columns`
- `Column name`: The original user column name
- `Column type`: The original user column type
- `Casdoor Column`: The casdoor user column name

Optional fields

- `Is hashed`: Whether to calculate hash value. When enable "**Is hashed**", if the field of user in origin table updated, the syncer will sync this user. Disable "Is hashed", meaning if only the field update, the syncer need not sync the user. In short, the user does not synchronize until the fields involved in the hash calculation(enable "Is hashed") are updated.
- `Is key`: Whether it is the **primary key** of the user in origin table and the user in casdoor table. When synchronizing the database, it is judged based on the field whose "Is key" is selected, so at least one of  "Is key" button of field is selected. If not selected, the first "Is key" is selected by default.
- `Avatar base URL`: When sync users, if **Avatar base URL** is not empty and origin **user.avatar** not hasPrefix "http", new **user.avatar** will be replaced by **Avatar base URL + user.avatar**.
- `Affiliation table`: It is used to sync the affiliation of user from this table in database. Because the affiliation may be code of int type in "Affiliation table", so we need to map the int to a string. See [getAffiliationMap()](https://github.com/casdoor/casdoor/blob/9f3ee275a8b747f914f0e74e897a79abeff96ccb/object/syncer_affiliation.go#L32) . Because Casdoor has some redundant fields to borrow, [here](https://github.com/casdoor/casdoor/blob/9f3ee275a8b747f914f0e74e897a79abeff96ccb/object/syncer_util.go#L65) we use `score` to map the int code to a string name.

Then you can turn on the **Is enable** button and save, the syncer will start to work.

![users](/img/syncer/Database/syncer_database_users.png)

You can also select the "Sync" button for database synchronization.

**Update**

When the `Table columns` is set to the following figure, the update operation is performed.

![table_columns](/img/syncer/Database/syner_database_table_columns.png)

When the data of the two table to the key is different, we can synchronize the data between the two table by the primary key.

- update user in origin table

<video src="/video/syncer/update_user.mp4" controls="controls" width="100%"></video>

- update user in casdoor table

<video src="/video/syncer/update_casdoor.mp4" controls="controls" width="100%"></video>

**Add**

When the `Table columns` is set to the following figure, the add operation is performed.

![table_columns](/img/syncer/Database/syner_database_table_columns.png)

If the number of data between the two table is different, add the data to the table with the lower number of data by the primary key.

- add user in origin table

<video src="/video/syncer/add_user.mp4" controls="controls" width="100%"></video>

- add user in casdoor table

<video src="/video/syncer/add_casdoor.mp4" controls="controls" width="100%"></video>
