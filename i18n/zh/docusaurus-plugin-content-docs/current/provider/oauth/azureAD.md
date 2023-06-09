---
title: AzureAD
description: 添加 AzureAD 作为第三方服务来完成身份验证
keywords:
  - AzureAD
authors:
  - leo220yuyaodog
---

## 介绍

Azure Active Directory (Azure AD) 通过为云端和前提条件下的应用提供单一的身份系统，简化了申请管理。 可将软件作为服务(Saas) 应用软件、在前提下的应用软件和业务线路应用程序添加到Azure AD。 然后用户可以一次登录来安全和无缝地访问这些应用程序。 以及微软公司提供的办公室365项和其他商业应用程序。

## 如何使用?

注册应用程序的步骤如下所示。

### 步骤1. 注册一个应用程序

首先， [注册一个应用程序](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps)。 然后根据需要选择一个帐户类型。  演示站使用下面显示的类型。

![azuread_register.png](/img/providers/OAuth/azuread_register.png)

### 步骤2. 创建客户端密钥

创建一个 `客户端密钥` 并保存值，这将稍后使用。 ![azuread_secret.png](/img/providers/OAuth/azuread_secret.png)

### 步骤3. 添加重定向 URI

按照图片中的示例添加casdoor的重定向uri。 ![azuread_uri.png](/img/providers/OAuth/azuread_uri.png)

### 步骤4. 授予管理员权限

`user.read` API 默认是打开的。 您可以根据您的需要添加更多的范围。 最后，记得 **给予管理员权限**。 ![azuread_permission.png](/img/providers/OAuth/azuread_permission.png)

### 步骤5. 在casdoor中创建 AzureAD 提供商

最后一步，添加一个AzureAD OAuth提供程序，并在您的Casdoor中填写`客户端ID`和`客户端秘钥`。 ![zuread_casdoor.png](/img/providers/OAuth/azuread_casdoor.png)
