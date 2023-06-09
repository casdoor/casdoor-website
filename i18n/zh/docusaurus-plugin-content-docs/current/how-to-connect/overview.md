---
title: 概览
description: 将您的应用连接到Casdoor
keywords:
  - OAuth
  - OAuth2.0
  - OIDC
  - SAML
  - CAS
authors:
  - nomeguy
---

在本节中，我们将显示如何将您的应用程序连接到Casdoor。

作为服务提供商(SP)，Casdoor 支持两项认证协议：

- `OAuth 2.0 (OIDC)`
- `SAML`

作为身份提供商 (Idp)，Casdoor 支持四项认证协议：

- `OAuth 2.0`
- `OIDC`
- `SAML`
- `CAS 1.0, 2.0, 3.0`

## OAuth 2.0 (OIDC)

<details>

<summary>什么是 OAuth 2.0？</summary>

[OAuth 2](https://oauth.net/2/) 是一个授权框架，允许应用程序例如Facebook，GitHub, 和Casdoor 访问HTTP服务上的用户帐户。 它的工作原理是将用户身份验证委托给主机服务，并授权第三方应用程序访问该用户帐户。 OAuth 2 为网页和桌面应用程序以及移动设备提供了 授权流程。

</details>

Casdoor的授权程序基于OAuth 2.0协议 。 我们建议使用 OAuth 2.0 协议的原因在于：

1. 该协议简单易行，能解决多种问题。
2. 成熟度高且社区支持广泛

因此，您的应用程序将通过 OAuth 2.0 (OIDC) 与 Casdoor 连接。 具体而言，有三种方式连接Casdoor：

### 标准 OIDC 客户端

**[标准OIDC 客户端](/docs/how-to-connect/oidc-client)**: 标准OIDC 客户端在各类编程语言或框架都广泛应用。

<details>

<summary>什么是OIDC？</summary>

[OpenID Connect (OIDC)](https://openid.net/connect/) 是一个在OAuth 2.0 框架顶端运行的开放身份验证协议。 针对消费者，OIDC允许个人通过单点登录(SSO)访问使用OpenID提供商(OPs)的依赖方站点，如电子邮件提供商或社交网络平台，以验证其身份。 它向应用程序或服务提供用户信息、认证背景，并允许访问用户个人资料。

</details>

Casdoor 完全执行了OIDC协议。 如果您的应用程序已经运行了另一个 OAuth 2，那么 (OIDC) 身份提供商一般会通过标准的 OIDC 客户端库提供服务，如果您想迁移到Casdoor，可使用OIDC discovery帮您轻松切换到Casdoor。

### Casdoor SDKs

**[Casdoor SDKs](/docs/how-to-connect/sdk)**: For most programming languages, Casdoor will provide easy-to-use SDK library on top of OIDC, with supporting extended functionality which are only available in Casdoor.

与标准的 OIDC 协议相比，Casdoor 在 SDK 中提供了更多的功能，如用户管理、资源 上传等。 通过 Casdoor SDK 连接到Casdoor 的成本比使用 OIDC 标准客户端库要高，但前者能提供最佳灵活性和最强API。

### Casdoor插件

**[Casdoor 插件](/docs/how-to-connect/plugin)**: 如果您的应用建立在一个流行的平台上(如Spring Boot, WordPress等)，并且Casdoor(或第三方) 已经为它提供了一个插件或中间件，那么就可以直接使用。 使用插件比手动使用 Casdoor SDK 更容易，因为前者是专门为平台制作的。

**插件:**
- [Jenkins 插件](/docs/integration/java/jenkins%20plugin)
- [APISIX 插件](/docs/integration/lua/apisix#connect-casdoor-via-apisixs-casdoor-plugin)

**中间件:**
- [Spring Boot插件](https://github.com/casdoor/casdoor-spring-boot-starter)
- [Django 插件](https://github.com/casdoor/django-casdoor-auth)
## SAML

<details>

<summary>什么是SAML？</summary>

安全鉴别标记语言(SAML)是一种开放标准，允许身份提供者(IDP)将授权证书传给服务提供者。 该术语意味着您可以使用一组凭据登录多个不同的网站。 管理一个用户的单次登录要比管理分别登录到电子邮件、客户关系管理(CRM) 软件、Active Directory等简单得多。

SAML交易使用可扩展标记语言(XML) 在标识提供者和服务提供者之间进行标准化通信。 SAML 是用户身份验证和使用服务授权之间的链接。

</details>

Casdoor可以使用 **SAML IdP**。 目前Casdoor支持SAML2.0 的主要功能。 More details see **[SAML](/docs/how-to-connect/saml/overview)**.

**示例:**

[Casdoor 作为一个 SAML IdP in Keycloak](/docs/how-to-connect/saml/keycloak#casdoor-as-a-saml-idp-in-keycloak)

**建议:**

1. 该协议十分 **强大** 且适用于多种情景，可以说它是最全面的 SSO 协议之一。
2. 该协议 **涵盖范围过大**, 有很多可选参数, 因此，在实操中很难100%涵盖所有应用场景。
3. 如果应用程序是 **新开发的**，那么**不是很推荐** SAML，因为其技术过于复杂。

## CAS

<details>

<summary>什么是CAS？</summary>

The Central Authentication Service (CAS) is a single sign-on protocol for the web. Its purpose is to permit a user to access multiple applications while providing their credentials (such as user ID and password) only once. It also allows web applications to authenticate users without gaining access to a user's security credentials, such as a password.

</details>

Casdoor已实现 CAS 1.0, 2.0, 3.0 功能。 详情见 **[CAS](/docs/how-to-connect/cas)**

**建议:**

1. 该协议本身较为轻量，易于执行，但它适用的场景较为单一。
2. CAS 客户端和CAS服务器之间的相互信任是通过在没有任何加密或签名机制的情况下使用接口建立的，目的是确保进一步的安全。
3. CAS协议与其他协议相比没有优势。

## 集成表

一些应用程序已有连接到Casdoor的示例。 您可以按照文档指示操作，快速连接到Casdoor。 您可以在 [集成表](/docs/category/integrations) 中看到所有应用程序。
