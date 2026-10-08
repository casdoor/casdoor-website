---
title: Add Tencent QQ as an OAuth provider
sidebar_label: Tencent QQ
description: Let users sign in to Casdoor with their QQ account through QQ Connect.
keywords: [Tencent QQ, OAuth]
authors: [Marvelousp4]
---

This guide explains how to let users sign in to Casdoor with their QQ account.

---

#### Learning outcomes

- Create an application in QQ Connect.
- Add Tencent QQ as an OAuth provider in Casdoor.

#### What you need

- A QQ Connect developer account. See [Become a developer](https://wiki.connect.qq.com/%E6%88%90%E4%B8%BA%E5%BC%80%E5%8F%91%E8%80%85).
- Administrator access to the Casdoor admin console

---

## Create an application in QQ Connect

1. After your developer account is approved, open [QQ Connect](https://connect.qq.com/manage.html#/) and create an application.
1. Set the authorization callback URL to the callback URL of Casdoor, `https://<your-casdoor-host>/callback`. See [Redirect URL and callback URL](/docs/application/config#how-the-flow-works).
1. Copy the client ID and the client secret of the application.

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `Tencent QQ`.
1. Enter the **Client ID** and the **Client secret**.
1. Save the provider.

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
