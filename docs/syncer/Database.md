---
title: Database
description: Using Databse Syncer to synchronize database
keywords: [syncer, database]
---

## Database Syncer

The users table we created as a demo are imported from the [template XLSX file](https://github.com/casdoor/casdoor/blob/master/xlsx/user_test.xlsx).

![Table](/img/syncer/Database/syncer_database_table.png)

Click the **Syncers** tab and create a new syncer. Fill in all the required information as below and save.

![edit](/img/syncer/Database/syncer_database_edit.png)

:::tip

In general, you need to fill in at least the `ID` and `Name` in Casdoor Columns. And others important fields like `createdTime`, `Password`, `DisplayName`.

:::

The following are the required information.

- `Organization`: the organization that the user will import
- `Name`: the syncer name
- `Type`: select database
- `Host`: the original database host
- `Port`: the original database port
- `User`: the original database username
- `Password`: the original database password
- `Database type`: all Xorm supported databases, like: MySQL, PostgreSQL, SQL Server, Oracle, Sqlite
- `Database`: the original database name
- `Table`: the original user table name
- `Table columns`
- `Column name`: the original user column name
- `Column type`: the original user column type
- `Casdoor` column: the casdoor user column name
- `Is hashed`: whether to calculate hash value

Then you can turn on the **Is enable** button and save, the syncer will start to work.

![users](/img/syncer/Database/syncer_database_users.png)
