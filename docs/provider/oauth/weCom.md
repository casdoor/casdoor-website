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
   | Client ID       | Enterprise **CorpID** |
   | Client secret   | Enterprise **CorpSecret** |
   | Agent ID        | Application **AgentId** |
   | Scope           | `snsapi_userinfo` (default) or `snsapi_privateinfo` |

1. Save the provider.

## Methods

| Method | Behavior |
|---|---|
| `Silent` | WeCom redirects the user to `redirect_uri?code=CODE&state=STATE` without asking |
| `Normal` | WeCom shows a consent page and redirects after the user agrees |

See [WeCom OAuth](https://developer.work.weixin.qq.com/document/path/91119).

## Scopes {#scope}

| Scope | Data |
|---|---|
| `snsapi_userinfo` | The basic profile, without the email address |
| `snsapi_privateinfo` | Also the email address and other sensitive data. The administrator of the enterprise must grant the application the permission for sensitive member information |

Use `snsapi_privateinfo` if Casdoor should fill in the email address of users from WeCom.

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
- [WeCom syncer](/docs/syncer/WeCom)
