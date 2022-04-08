---
sidebar_position: 2
title: Users Manipulation
---

As an authentication platform, Casdoor can easily manipulate users stored in databases.

We can think Casdoor stores users as a user table. And there is also a user table in external database. Every 60 seconds, Casdoor would calculate the hash value of each user in the table, which is generated using users' information, such as password or mobile phone number. If the calculated hash value of a user with a specific `Id` changed compared with the original value, Casdoor would affirm which user table has been updated. Then the database stores old information would update, realize the **bilateral synchronization** between Casdoor user table and external user table.

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

## Keycloak Syncer

The Keycloak syncer is basically the same as the [database syncer](#database-syncer), except that the `Table` and `Table columns` can be configured automatically for Keycloak. 

In addition, the Keycloak syncer will query `credential` table, `keycloak_group` table and `user_group_membership` table because the user information in Keycloak are stored in multiple tables. 

![](/img/syncer_keycloak_edit.png)