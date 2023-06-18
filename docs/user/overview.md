---
title: Overview
description: Manage users in Casdoor
keywords: [user, properties, import]
authors: [sh1luo]
---

## User properties

As an authentication platform, Casdoor is able to manage users. Every user has these properties:

- `Owner` Owner organization of the user
- `Name` User name, unique
- `CreatedTime`
- `UpdatedTime`
- `Id` Unique for every user
- `Type`
- `Password`
- `PasswordSalt`
- `PasswordOptions` Password complexitity options
- `DisplayName` Shown in UI
- `FirstName`
- `LastName`
- `Avatar` A link to user's avatar
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
- `IsAdmin` Is the user the admin of his organization
- `IsGlobalAdmin` Does the user have the permission to manage the Casdoor
- `IsForbidden`
- `IsDeleted`
- `SignupApplication`
- `Hash`
- `PreHash`
- `CreatedIp`
- `LastSigninTime`
- `LastSigninIp`
- `Roles` Array of the user's roles
- `Permissions` Array of the user's permissions

unique Id of the platform:

- `Github`
- `Google`
- `QQ`
- `WeChat`
- `Facebook`
- `DingTalk`
- `Weibo`
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
- `Properties` This is a string -> string map, stored all other properties may need.

## Import users from XLSX file

You can add new users or update existing Casdoor users by uploading a XLSX file of user information.

In the Admin Console, go to Users and click **Upload(.xlsx)** button.

![import users](/img/user/import_users.png)

Select your XLSX file and click Open, the users will be imported.

We provide a [template XLSX file](https://github.com/casdoor/casdoor/blob/master/xlsx/user_test.xlsx) named `user_test.xlsx` in the `xlsx` folder. The template includes 5 users for test and headers for some required user properties.

![import successfully](/img/user/import_success.png)
