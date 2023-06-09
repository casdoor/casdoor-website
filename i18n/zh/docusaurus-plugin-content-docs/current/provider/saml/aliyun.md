---
title: Aliyun IDaaS
description: 使用 Aliyun IDaS 验证用户
keywords:
  - Aliyun IDaaS
authors:
  - seriouszyx
---

## 在 Aliyun IDaaS 中创建 SAML 应用程序

登录到 [Aliyun 管理控制台](https://account.aliyun.com/), 搜索并前往应用程序标识服务 (IDaaS)。

![Aliyun IDaaS](/img/providers/SAML/aliyun.png)

点击 **EIAM 实例列表** 并打开免费版本。

![Aliyun EIAM](/img/providers/SAML/aliyun_eiam.png)

打开后将自动创建并运行一个实例。 点击实例名称或 **管理** 按钮来输入 IDaaS 管理控制台。

![Aliyun EIAM List](/img/providers/SAML/aliyun_eiam_list.png)

输入了 IDaS 管理控制台后，点击 **添加应用程序**, 搜索 **SAML**, 然后点击 **添加应用程序**

![Add Aliyun SAML](/img/providers/SAML/aliyun_saml_add.png)

点击 **添加签名密钥**。

![添加签名密钥](/img/providers/SAML/aliyun_saml_signingkey.png)

填写所有必需的信息并提交。

![填写签名密钥](/img/providers/SAML/aliyun_saml_signingkey_input.png)

选择添加的签名密钥。

![选择添加的签名密钥](/img/providers/SAML/aliyun_saml_signingkey_select.png)

填写下面所需的所有信息并保存。

- IDP 身份ID：保持与签发者地址在 Cassdoor 中相同。
- SP 实体 ID & SP ACS URL (SSO 定位)：现在填写您想要的任何东西。 完成 Casdoor 配置后，您需要修改。
- 描述属性：直接填充为用户名。
- 账户关联模式：账户协会

![更新签名密钥信息](/img/providers/SAML/aliyun_saml_signingkey_update.png)

## 帐户授权 & 关联

在SAML应用成功添加后，授权提示会高亮。 现在不要授权它，添加一个帐户，然后授权它。

转到**组织和组**，然后点击**新帐户**。

![添加帐户](/img/providers/SAML/aliyun_account.png)

填写所有必需的信息并提交。

![填写帐户信息](/img/providers/SAML/aliyun_account_add.png)

转到 **应用程序授权**, 选择您想要授权的帐户, 然后点击 **保存**。

![帐户授权](/img/providers/SAML/aliyun_account_authorization.png)

前往 **应用程序列表**, 点击 **查看应用子账户**, 然后点击 **添加帐户关联**。

![查看子账户](/img/providers/SAML/aliyun_subaccount_view.png) ![添加子账户](/img/providers/SAML/aliyun_subaccount_add.png)

填写需要关联的主账户和子账户，然后点击 **保存**。

主账户存在于IDaS中，子账户是Cassdoor用户的ID。

![关联](/img/providers/SAML/aliyun_subaccount_input.png)

## 导出 IDaaS 元数据

转到 **应用程序列表**, 点击 **查看应用程序详细信息** 然后点击 **导出 IDaS SAML Metadadta**

![导出](/img/providers/SAML/aliyun_saml_metadata.png)

## 在 Casdoor 配置

在 Casdoor 中创建一个新的提供商。

选择分类为 **SAML**, 输入 **Aliyun IdaaS**. 复制元数据内容并粘贴到 **元数据** 输入。 **端点**, 的值, **IdP** 和 **发行商URL** 将在点击 **分析** 按钮后自动生成。

![室内提供商](/img/providers/SAML/aliyun_casdoor.png)

复制 **SP ACS URL** 和 **SP 实体 ID** 并点击 **保存** 按钮

编辑您想要在 Cassdoor 中配置的应用程序。 选择刚刚添加的提供者，然后点击按钮 **保存**。

![为应用程序添加提供商](/img/providers/SAML/aliyun_casdoor_provider.png)

## 修改 Aliyun IDaS 的 SAML 应用程序

禁用应用程序，然后点击 **修改应用程序**。

![修改 SAML 应用](/img/providers/SAML/aliyun_saml_modify.png)

填写 **SP 实体 ID** and **SP ACS URL (SSO location)** 将内容复制到Casdoor。 提交并启用应用程序。

![修改 SAML 应用](/img/providers/SAML/aliyun_saml_modify_input.png)

## 验证效果

转到您刚刚配置的应用程序，您可以在登录页面找到一个图标。

点击图标并跳转到 Aliyun IDaS 登录页面，然后在验证后成功登录到Casdoor。

![Casdoor 登录](/img/providers/SAML/aliyun_casdoor_login.gif)