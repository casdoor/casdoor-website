---
title: Gitee OAuth
description: Add Gitee as an OAuth provider.
keywords: [Gitee, OAuth]
authors: [ErikQQY]
---

1. Go to [Gitee OAuth applications](https://gitee.com/oauth/applications) and create an application (or open an existing one).

![Gitee Workbench](/img/providers/OAuth/giteebench.png)
![Gitee](/img/providers/OAuth/gitee.png)

Set **name**, **description**, **homepage**, and **authorization callback URL**. The callback URL must be **Casdoor’s callback URL**. In Casdoor, the application **Redirect URL** is your application’s callback URL. See [Application config](/docs/application/config#how-the-flow-works). Grant the permissions you need; enable **email** so Casdoor can read the user’s email.

:::info
**Callback URL:** In Gitee use Casdoor’s callback URL; in Casdoor use your application’s redirect URL.
:::

2. After creating the app, copy **Client ID** and **Client Secret**.

![Gitee Client](/img/providers/OAuth/giteeclient.png)

3. In Casdoor add an **OAuth** provider, set **Type** to **Gitee**, and enter **Client ID** and **Client secret**.

![Gitee Provider](/img/providers/OAuth/giteeprovider.png)

:::caution
Enable the **email** scope in the Gitee app; otherwise scope authorization may fail.
:::

![Gitee scope](/img/giteescope.jpg)
