---
title: AD FS
description: 添加AD FS 作为第三方服务来完成身份验证
keywords:
  - AD FS
  - ADFS
  - Active Directory Federation 服务
authors:
  - ComradeProgrammer
---

设置 Active Directory Federation Service， 请阅读 [ADFS](https://docs.microsoft.com/en-us/windows-server/identity/active-directory-federation-services) 获取关于 ADFS 的基本知识 [ADFS 部署指南](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/deployment/ad-fs-deployment-guide) 以了解如何设置ADFS 服务器。 确保您有一个完全正常运行的 ADFS 服务器，然后继续下一步。

### 步骤1 通过 ADFS 启用 OAuth

这一步骤详情请参阅 [如何通过 ADFS 启用 OAuth ](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/development/enabling-oauth-confidential-clients-with-ad-fs)。

当您完成此步骤时，您应该已经获得了clientId 和clientSecret ![创建百度 APP](/img/providers/OAuth/adfsconfidential1.png) ![创建百度 APP](/img/providers/OAuth/adfsconfidential2.png)

其中，在Oauth中，第一张图片中的 Client Identifier 和第二张图片中的 Secret 应该是 clientId 和 clientSecret 。

## 激活 Casdoor ADFS Provider

添加一个 Gitee OAuth 提供商并在您的 Casdoor 中填写 `Client ID` 和 `Client Secrets`。

![创建百度 APP](/img/providers/OAuth/adfscasdoor.png)
