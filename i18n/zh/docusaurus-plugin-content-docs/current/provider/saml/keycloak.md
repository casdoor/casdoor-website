---
title: Keycloak
description: 使用 Keycloak 验证用户
keywords:
  - Keycloak
authors:
  - seriouszyx
---

JBoss [KeyCloak](https://www.keycloak.org/) 系统是一个广泛使用的开源身份管理系统，它支持通过 SAML 和 OpenID 连接与应用程序集成。 它还可以作为其他提供商，例如LDAP或其他SAML提供商和支持SAML或OpenID连接的应用程序之间的身份经纪人运行。

下面是如何在 KeyCloak 中配置新客户端条目，并配置Castoor 来允许KeyCloak 用户登录UI ，这些用户通过KeyCloak 配置被授予访问权限。

## Configure Keycloak

一些配置选项和假设，特别是这个示例：

- 我们假设您正在以本地开发模式运行 Casdoor。 Casdoor UI is available at: `http://localhost:7001` and server is available at `http://localhost:8000`. 必要时用适当的URL替换。
- 让我们假设你正在本地运行Keycloak。 Keycloak UI 可在以下网址查阅： `http://localhost:8080/auth`。
- 在此基础上，用于此部署的SPACS URL将是： `http://localhost:8000/api/acs`。
- 我们的 SP 实体 ID 将使用相同的URL： `http://localhost:8000/api/acs`。

使用默认领域或创建一个新领域。

![添加键盘领域](/img/providers/SAML/keycloak_realm_add.png)

![Keycloak realm](/img/providers/SAML/keycloak_realm.png)

## 在 Keycloak 中添加客户端条目

:::info

在 [Keycloak 文档](https://www.keycloak.org/docs/latest/server_admin/index.html#_client-saml-configuration) 中查看更多关于Keycloak 客户端的详细信息。

:::

在菜单中点击 **客户端** 然后点击 **创建** 去到 **添加客户端** 页面。 填写如下。

- **客户端 ID**: `http://localhost:8000/api/acs` - 这将是以后在 Casdoor 配置中使用的 SP 实体ID。
- **Client Protocol**: `saml`.
- **Client SAML Endpoint**: `http://localhost:8000/api/acs`. - 此 URL 是您想要Keycloak 服务器发送SAML 请求和响应的地方。 一般情况下，应用程序有一个用于处理 SAML 请求的URL。 可以在客户端的设置选项卡中设置多个URL。

![添加密钥客户端。](/img/providers/SAML/keycloak_client_add.png)

单击 **Save（保存）**。 此动作创建客户端并将您带到 **设置** 选项卡。

以下设置列表部分：

1. **名称** - `Casdoor`. 这只用于在KeyCloak UI中向Keycloak 用户显示友好的名称。 它可以供你使用。
2. **启用** - 开启选择。
3. **包括作者声明** - 选择开启
4. **签名文档** - 选择
5. **签名声明** - 关闭。
6. **加密说明** - 关闭
7. **需要客户端签名** - 请关闭
8. **强制命名格式** - 选择开启
9. **名称 ID 格式** - 选择用户名。
10. **有效重定向 URI** - 添加 `http://localhost:8000/api/acs`.
11. **Master SAML 处理 URL** - `http://localhost:8000/api/acs`.
12. 精良的谷物SAML端点配置
    1. **声明消费者服务公开绑定URL** - `http://localhost:8000/api/acs`。
    2. **声明消费者服务重定向绑定URL** - `http://localhost:8000/api/acs`。

保存该配置。

![配置 keycloak 客户端](/img/providers/SAML/keycloak_client_configure.png)

:::tip

如果您想要签名authn请求，您需要启用 **客户端签名需要** 选项并上传您自己生成的证书。 在Cassdoor, `token_jwt_key.key` 和 `token_jwt_key.pem` 中使用的私钥和证书位于 **对象** 目录。 在Keycloak下，需要点击** Keys **页签，点击** Import ** 按钮，选择 **Archive Format**为** Certificate PEM **并上传证书。

:::

点击 **安装** 标签页。

对于Keycloak <= 5.0.0.0，选择格式选项 - **SAML 元数据 IDPSODescriptor** 并复制元数据。

对于Keycloak 6.0.0+，选择格式选项 - **Mod Mellon 文件** 并点击 **下载**。 解压缩下载的 .zip，定位 `idp-metadata.xml` 并复制元数据。

![元数据下载](/img/providers/SAML/keycloak_client_install.png)

![复制元数据](/img/providers/SAML/keycloak_client_copy.png)

## 在Casdoor配置

在 Casdoor 中创建一个新的提供商。

选择分类为 **SAML**, 输入 **Keycloak**. 复制元数据内容并粘贴到 **元数据** 输入。 **端点（Endpoint）**的值，**IdP** 和 **Issuer URL** 将在点击 **分析** 按钮后自动生成。 最后点击按钮 **保存**。

:::tip

如果您在 Keycloak 中启用 **客户端签名需要** 选项并上传证书， 请在 Casdoor 中启用 **签名请求** 选项。

:::

![Casdoor 提供商](/img/providers/SAML/keycloak_casdoor_provider.png)

编辑您想要在 Cassdoor 中配置的应用程序。 选择刚刚添加的身份提供商，然后点击按钮 **保存**。

![为应用程序添加提供商](/img/providers/SAML/keycloak_casdoor_app.png)

## 验证效果

转到您刚刚配置的应用程序，您可以在登录页面找到Keycloak图标。

点击图标跳转到Keycloak登录页面，验证后成功登录到Casdoor。

![Casdoor 登录](/img/providers/SAML/keycloak_casdoor_login.gif)
