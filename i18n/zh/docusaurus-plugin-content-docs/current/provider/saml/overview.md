---
title: 概述
description: 使用来自支持SAML 2.0 的外部身份提供商的身份
keywords:
  - SAML
  - Keycloak
  - Aliyun IDaas
authors:
  - seriouszyx
---

可以配置Casdoor来支持用户使用外部身份提供者的身份登录到界面，这些身份提供者支持 SAML 2.0。 在这种配置中，Casdoor 不能为用户存储任何登录凭证。

现在，Casdoor支持许多SAML应用程序提供者。 供应商的图标将在添加到Casdoor后显示在登录页面中。 以下是 Casdoor 支持的提供商：

|         阿里云 IDaaS         |         Keycloak          |
|:-------------------------:|:-------------------------:|
| <img src="https://cdn.casbin.org/img/social_aliyun.png" width="40"></img> | <img src="https://cdn.casbin.org/img/social_keycloak.png" width="40"></img> |
|             ✅             |             ✅             |

## 条款

- 身份提供商（IDP）——储存身份数据库并向Cassdoor提供身份和认证服务的服务。
- 服务提供商(SP) - 为终端用户提供资源的服务，在这种情况下，就是Cassdoor 部署。
- 申述消费者服务——身份提供者提出的SAML断言的消费者。

## SAML 集成工作方式

当使用SAML SSO时，用户通过身份提供者登录到Casdoor，而没有向Casdoor传递凭证。 进展情况见下图表。

![SAML](/img/providers/SAML/SAML.png)