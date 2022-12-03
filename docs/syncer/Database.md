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
- `Avatar base URL`: When sync users, if **Avatar base URL** is not empty and origin **user.avatar** not hasPrefix "http", new **user.avatar** will be replaced by **Avatar base URL + user.avatar**.
- `Affiliation table`: It is used to sync the affiliation of user from this table in database. Because the affiliation may be code of int type in "Affiliation table", so we need to map the int to a string. See [getAffiliationMap()](https://github.com/casdoor/casdoor/blob/9f3ee275a8b747f914f0e74e897a79abeff96ccb/object/syncer_affiliation.go#L32) . Because Casdoor has some redundant fields to borrow, [here](https://github.com/casdoor/casdoor/blob/9f3ee275a8b747f914f0e74e897a79abeff96ccb/object/syncer_util.go#L65) we use `score` to map the int code to a string name.

Then you can turn on the **Is enable** button and save, the syncer will start to work.

![users](/img/syncer/Database/syncer_database_users.png)
