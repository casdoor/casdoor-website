---
title: Add Weibo as an OAuth provider
sidebar_label: Weibo
description: Let users sign in to Casdoor with their Weibo account.
keywords: [Weibo, OAuth]
authors: [Marvelousp4]
---

This guide explains how to let users sign in to Casdoor with their Weibo account.

---

#### Learning outcomes

- Get a client ID and client secret from the Weibo Open Platform.
- Add Weibo as an OAuth provider in Casdoor.

#### What you need

- A developer account on the [Weibo Open Platform](https://open.weibo.com/developers/basicinfo)
- Administrator access to the Casdoor admin console

---

## Register on the Weibo Open Platform

1. On the [Weibo Open Platform](https://open.weibo.com/developers/basicinfo), complete the basic information and submit it for review. The review often takes two to three days.
1. After approval, create an application and set its authorization callback URL to the callback URL of Casdoor, `https://<your-casdoor-host>/callback`. See [Redirect URL and callback URL](/docs/application/config#how-the-flow-works).
1. Copy the client ID and the client secret.

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `Weibo`.
1. Enter the **Client ID** and the **Client secret**.
1. Save the provider.

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
