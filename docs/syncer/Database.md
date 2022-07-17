---
title: Database
description: Using Databse Syncer to synchronize database
keywords: [syncer, database]
---

## Database Syncer

The users table we created as a demo are imported from the [template XLSX file](https://github.com/casdoor/casdoor/blob/master/xlsx/user_test.xlsx). 

![](/img/syncer_database_table.png)

Click the **Syncers** tab and create a new syncer. Fill in all the required information as below and save.

![](/img/syncer_database_edit.png)

The following are the required information.

- `Organization`: the organization that the user will import
- `Name`: the syncer name
- `Type`: select database 
- `Host`: the original database host
- `Port`: the original database port
- `User`: the original database username
- `Password`: the original database password
- `Database type`: MySQL, PostgreSQL, SQL Server, Oracle, Sqlite 3 available
- `Database`: the original database name 
- `Table`: the original user table name
- `Table columns`
	- `Column name`: the original user column name
	- `Column type`: the original user column type
	- `Casdoor` column: the casdoor user column name
	- `Is hashed`: whether to calculate hash value

Then you can turn on the **Is enable** button and save, the syncer will start to work.

![](/img/syncer_database_users.png)