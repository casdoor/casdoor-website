---
sidebar_position: 1
title: Overview
---

As an authentication platform, Casdoor is able to manage users. Every user has these properties:

- `Owner` Owner organization of the user
- `Name` User name, unique
- `CreatedTime`
- `Id` Unique for every user
- `Type`
- `Password`
- `DisplayName` Shown in UI
- `Avatar` A link to user's avatar
- `Email`
- `Phone`
- `Affiliation`
- `Tag`
- `IsAdmin` Is the user the admin of his organization
- `IsGlobalAdmin` Does the user have the permission to manage the Casdoor
- `Hash`
- `PreHash`

unique Id of the platform:
- `Github`
- `Google`   
- `QQ`       
- `WeChat`   
- `Facebook` 
- `DingTalk` 
- `Weibo`    
- `Gitee`

- `Properties` This is a string -> string map, stored all other properties may need.

We support adding users individually, and also support batch importing users through files in xlsx format. You can download the [demo xlsx](https://github.com/casdoor/casdoor/blob/master/xlsx/user_test.xlsx) file we provide, fill it out and upload it

![image](https://user-images.githubusercontent.com/51309938/159216761-64c8e9ad-f8e7-494a-b72d-3e7e42bf5cc3.png)

![image](https://user-images.githubusercontent.com/51309938/159217004-d0d4ae76-00ec-4b45-9cd9-df5fcb071934.png)
