---
title: 数据库
description: 使用 Databse 同步器同步数据库
keywords:
  - 同步器
  - 数据库
authors:
  - Marvelousp4
---

## 数据库同步器

我们作为演示创建的用户表从 [模板 XLSX 文件](https://github.com/casdoor/casdoor/blob/master/xlsx/user_test.xlsx) 导入。

![表格](/img/syncer/Database/syncer_database_table.png)

点击 **Syncers** 标签页并创建一个新的同步器。 填写下面所需的所有信息并保存。

![编辑](/img/syncer/Database/syncer_database_edit.png)

:::tip

一般而言，您至少需要填写Casdoor列中的 `ID` 和 `Name` 以及其他重要信息，如 `createdTime`, `Password`, `DisplayName`.

:::

以下是必填字段。

- `Organization`: The organization that the user will import
- `Name`: 同步器名称
- `Type`: 选择数据库
- `Host`: 原始数据库主机地址
- `Port`: 原始数据库端口
- `User`: 原始数据库用户名
- `Password`: 原始数据库密码
- `Database type`: 所有 Xorm 支持的数据库，例如: MySQL, PostgreSQL, SQL Server, Oracle, Sqlite
- `Database`: 原始数据库名称
- `Table`: The original user table name
- `表格列`
- `Column name`: The original user column name
- `Column type`: The original user column type
- `Casdoor Column`: The casdoor user column name

可选项

- `Is hashed`: 是否计算哈希值. When enable "**Is hashed**", if the field of user in origin table updated, the syncer will sync this user. Disable "Is hashed", meaning if only the field update, the syncer need not sync the user. In short, the user does not synchronize until the fields involved in the hash calculation(enable "Is hashed") are updated.
- `Avatar base URL`: When sync users, if **Avatar base URL** is not empty and origin **user.avatar** not hasPrefix "http", new **user.avatar** will be replaced by **Avatar base URL + user.avatar**.
- `Affiliation table`: It is used to sync the affiliation of user from this table in database. Because the affiliation may be code of int type in "Affiliation table", so we need to map the int to a string. See [getAffiliationMap()](https://github.com/casdoor/casdoor/blob/9f3ee275a8b747f914f0e74e897a79abeff96ccb/object/syncer_affiliation.go#L32) . Because Casdoor has some redundant fields to borrow, [here](https://github.com/casdoor/casdoor/blob/9f3ee275a8b747f914f0e74e897a79abeff96ccb/object/syncer_util.go#L65) we use `score` to map the int code to a string name.

然后您可以打开 **启用** 按钮并保存，同步器将开始工作。

![用户](/img/syncer/Database/syncer_database_users.png)
