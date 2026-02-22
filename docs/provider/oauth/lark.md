---
title: Lark OAuth
description: Add Lark (Feishu) as an OAuth provider.
keywords: [Lark, OAuth, Feishu]
authors: [Chinoholo0807]
---

## 1. Create a Lark application

On the [Lark Open Platform](https://open.feishu.cn/), create an application and enable it. In the app’s basic information, note **App ID** and **App Secret**. In security settings, add the redirect URL: `<your-casdoor-domain>/callback` (e.g. `https://door.example.com/callback`).

![create a new app](/img/providers/OAuth/lark_create_app.png)
![add redirect URL](/img/providers/OAuth/lark_redirect_url.png)

## 2. Create the provider in Casdoor

**Providers** → **Add**. Set **Category** to **OAuth**, **Type** to **Lark**. Map:

| Casdoor       | Lark        |
|---------------|-------------|
| Client ID     | App ID      |
| Client secret | App Secret  |

![create a Lark OAuth provider](/img/providers/OAuth/lark_provider_conf_detail.png)

## Username handling

Casdoor chooses the username from Lark’s response in this order: **UserId** (preferred), **UnionId** (links users across Lark orgs), **OpenId** (fallback, always present). This keeps sign-in working even when some fields are missing.
