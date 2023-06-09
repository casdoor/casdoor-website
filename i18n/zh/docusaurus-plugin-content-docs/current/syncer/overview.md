---
title: 概述
description: Casdoor同步用户
keywords:
  - 用户
  - 同步
  - 同步器
authors:
  - leo220yuyaodog
---

作为一个认证平台，Casdoor 可以轻松地操纵存储在数据库中的用户。

## 同步器

Casdoor 在 **user** 表中存储用户。 当您计划使用 Casdoor作为认证平台时，请不要担心您的应用程序 **用户** 数据迁移到Casdoor。 Casdoor提供 **同步器** 来帮助您快速同步用户数据到 Casdoor。

指定您想要同步到Casdoor的数据库和用户表。 同步器将在指定的间隔后同步数据。 欲了解详情，请参阅 [数据库同步器](/docs/syncer/Database)。

## 同步哈希值

Casdoor使用哈希来确定如何更新用户。 Casdoor 将计算表中每个用户的散列值。 它是通过用户信息比如用户的密码或手机号码来生成的。

如果特定 `Id` 的用户计算的散列值与原始值相比有所改变，Casdoor会确认哪个用户表已更新。 然后，数据库将更新旧信息，实现Casdoor用户表和原始 用户表之间的 **双向同步**。
