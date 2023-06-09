---
title: 概述
description: 管理Casdoor的用户
keywords:
  - 用户
  - 属性
  - 导入
authors:
  - sh1luo
---

## User properties

作为一个认证平台，Casdoor 能够管理用户。 每个用户都有这些属性：

- `Owner` 用户的所有者组织
- `Name` 用户名，唯一的
- `CreatedTime 创建时间`
- `UpdatedTime`
- `Id` 每个用户的 Id 都是唯一的。
- `Type`
- `Password`
- `PasswordSalt`
- `DisplayName` 显示在界面中的名称
- `FirstName`
- `LastName`
- `Avatar` 用户头像的链接
- `PermanentAvatar`
- `Email`
- `Phone`
- `Location`
- `Address`
- `Affiliation`
- `Title`
- `IdCardType`
- `IdCard`
- `Homepage`
- `Bio`
- `Tag`
- `Region`
- `Language`
- `Gender`
- `Birthday`
- `Education`
- `Score`
- `Karma`
- `Ranking`
- `IsDefaultAvatar`
- `IsOnline`
- `IsAdmin` 用户是否是他的组织的管理员
- `IsGlobalAdmin` 用户是否有权管理 Casdoor
- `IsForbidden`
- `IsDeleted`
- `SignupApplication`
- `Hash`
- `PreHash`
- `CreatedIp`
- `LastSigninTime`
- `LastSigninIp`
- `Roles` 用户角色数组
- `Permissions` 用户权限数组

平台唯一ID：

- `Github`
- `Google`
- `QQ`
- `微信`
- `Facebook`
- `钉钉`
- `微博`
- `Gitee`
- `LinkedIn`
- `Wecom`
- `Lark`
- `Gitlab`
- `Adfs`
- `Baidu`
- `Casdoor`
- `Infoflow`
- `Apple`
- `AzureAD`
- `Slack`
- `Steam`
- `Ldap`
- `Properties` 这是一个字符串 -> 字符串地图，存储所有其他属性。

## 从CSV文件导入用户

您可以通过上传用户信息的 XLSX 文件来添加新用户或更新现有的 Casdoor 用户。

在管理控制台中，转到用户并点击 **上传(.xlsx)** 按钮。

![导入用户](/img/user/import_users.png)

选择您的 XLSX 文件并点击 Open，用户将被导入。

我们提供了 [模板XLSX 文件](https://github.com/casdoor/casdoor/blob/master/xlsx/user_test.xlsx) `user_test.xlsx` 在 `xlsx` 文件夹中。 该模板包括5个用户测试和某些必需的用户属性的信头。

![成功导入](/img/user/import_success.png)
