---
title: Add WeCom as an OAuth provider
sidebar_label: WeCom
description: Let users sign in to Casdoor from the WeCom client, with an internal or a third-party WeCom application.
keywords: [WeCom, OAuth, WeChat Work]
authors: [leo220yuyaodog]
---

This guide explains how to let users sign in to Casdoor from the WeCom (WeChat Work) client. You can connect an internal application or a third-party application of WeCom.

---

#### Learning outcomes

- Choose the sub type, the method, and the scope.
- Add WeCom as an OAuth provider in Casdoor.

#### What you need

- A WeCom enterprise and an application in it. See [Internal applications](https://developer.work.weixin.qq.com/document/path/91022) or [Third-party applications](https://developer.work.weixin.qq.com/document/path/91120).
- Administrator access to the Casdoor admin console

---

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `WeCom`.
1. Fill in the fields:

   | Casdoor field   | Description |
   |-----------------|-------------|
   | Sub type        | Internal or Third-party |
   | Method          | Silent or Normal |
   | Client ID       | Internal: enterprise **CorpID**. Third-party: **CorpID** of the service provider |
   | Client secret   | Internal: **Secret** of the application (CorpSecret). Third-party: **ProviderSecret** of the service provider |
   | Agent ID        | Internal only: application **AgentId** |
   | Scope           | `snsapi_userinfo` (default) or `snsapi_privateinfo`, used only by the Silent method |

1. Save the provider.

## Methods

| Method | Behavior |
|---|---|
| `Silent` | Web authorization (`open.weixin.qq.com/connect/oauth2/authorize`) for pages opened in the WeCom client. WeCom redirects the user to `redirect_uri?code=CODE&state=STATE` without asking |
| `Normal` | WeCom web login (`login.work.weixin.qq.com/wwlogin/sso/login`). The user scans a QR code with the WeCom mobile app, or signs in quickly from the WeCom desktop client |

See [WeCom OAuth](https://developer.work.weixin.qq.com/document/path/91119) and [WeCom web login](https://developer.work.weixin.qq.com/document/path/98151).

## Scopes {#scope}

Casdoor sends the scope only with the `Silent` method.

| Scope | Data |
|---|---|
| `snsapi_userinfo` | The basic profile, without the email address. The current WeCom documentation no longer lists this value and names the silent scope `snsapi_base` instead |
| `snsapi_privateinfo` | Also the email address and other sensitive data. WeCom asks the user to authorize, and the user must be in the visible range of the application. The administrator of the enterprise must grant the application the permission for sensitive member information |

Use an internal application with the `Silent` method and `snsapi_privateinfo` if Casdoor should fill in the email address of users from WeCom.

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
- [WeCom syncer](/docs/syncer/WeCom)
