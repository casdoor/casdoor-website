---
title: Weibo OAuth
description: Add Weibo as an OAuth provider.
keywords: [Weibo, OAuth]
authors: [Marvelousp4]
---

Apply at the [Weibo Open Platform](https://open.weibo.com/developers/basicinfo): complete basic info and submit for review. Approval often takes about 2–3 days. After approval you receive **Client ID** and **Client Secret**. Create an **OAuth** provider in Casdoor, set **Type** to **Weibo**, and enter these values. Set the application’s **Redirect URL** in Casdoor to your app’s callback URL; in Weibo, the authorization callback URL must be Casdoor’s callback URL (see [Application config](/docs/application/config#further-understanding)).
