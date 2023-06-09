---
title: Keycloak
description: 使用 Keycloak Syncer 同步 Keycloak
keywords:
  - Keycloak
  - 同步器
authors:
  - Marvelousp4
---

## Keycloak 同步器

Keycloak除了能自动配置`Table` 和 `Table columns`外，其他与 [数据库同步器](/docs/syncer/Database) 基本相同。

此外，Keycloak 同步器将会查询 `credential` 表, `keycloak_group` 表 和 `user_group_membership` 表，因为Keycloak 中的用户信息储存在多个表中。

![编辑](/img/syncer/Keycloak/syncer_keycloak_edit.png)
