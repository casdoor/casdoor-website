---
title: 企业微信
description: 将 WeCom OAuth 提供商添加到您的应用程序
keywords:
  - 企业微信
  - OAuth
authors:
  - leo220yuyaodog
---

## 介绍

企业微信 提供 OAuth 授权的登录方法。 它可以从 企业微信 终端打开的网页获取会员身份信息，从而消除登录需求。

有两种不同的应用程序类型： **内部** 应用程序和 **第三方** 应用程序

## 基本设置

要配置 企业微信 提供商，下面的表格描述了所需参数。

**参数描述**:

|      参数       |     描述      |
|:-------------:|:-----------:|
|   Sub type    |   内部或第三方    |
|    Method     |   静默或正常模式   |
|   Client ID   |  企业CorpID   |
| Client secret |    企业密钥     |
|   Agent ID    | 应用程序Agentid |

:::info

企业微信有两种授权方法。 **静默** 授权和 **正常** 授权。

**静默授权**: 在用户点击链接后，页面是 `重定向_URI？ code=CODE&state=STATE`

**正常授权**: 在用户点击链接之后, 一个中间页面将显示给用户以选择是否为 授权。 用户确认授权后，转到 `重定向uri?code=CODE&state=STATE`

欲了解更多详情，请参阅 [文档](https://developer.work.weixin.qq.com/document/path/91119)。

:::

## 更多

欲了解更多关于内部应用程序的信息，请参阅 [内部应用程序](https://developer.work.weixin.qq.com/document/path/91022)。

关于第三方应用程序，请参阅 [第三方应用](https://developer.work.weixin.qq.com/document/path/91120)。