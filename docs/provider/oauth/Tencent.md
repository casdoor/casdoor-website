---
title: Tencent QQ OAuth
description: Add Tencent QQ as an OAuth provider.
keywords: [Tencent QQ, OAuth]
authors: [Marvelousp4]
---

1. Apply to [become a QQ Connect developer](https://wiki.connect.qq.com/%E6%88%90%E4%B8%BA%E5%BC%80%E5%8F%91%E8%80%85). After approval, open [Connect QQ](https://connect.qq.com/manage.html#/) and create an application.
2. Note the **Client ID** and **Client Secret** from the application.
3. In Casdoor add an **OAuth** provider, set **Type** to **Tencent QQ**, and enter **Client ID** and **Client secret**. Set the application **Redirect URL** in Casdoor to your app’s callback URL; in QQ Connect, the authorization callback URL must be Casdoor’s callback URL. See [Application config](/docs/application/config#further-understanding).
