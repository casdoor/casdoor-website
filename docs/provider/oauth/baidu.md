---
title: Baidu OAuth
description: Add Baidu as an OAuth provider.
keywords: [Baidu, Baidu OAuth]
authors: [Steve0x2a]
---

1. Read [Baidu Open Auth](https://openauth.baidu.com/doc/regdevelopers.html?qq-pf-to=pcqq.c2c) and [create an application](http://developer.baidu.com/console#app/create).

![Create Baidu APP](/img/providers/OAuth/baiduapp.png)

2. Set the redirect URL in the app settings. **Add your Casdoor domain in the domain setting**, not in the callback URL field — Baidu’s callback URL validation often fails if you put the full URL there, and only one domain or URL is allowed (unlike the docs).

![Baidu URL Setting](/img/providers/OAuth/baidusetting.png)
![Redirect URL Setting](/img/providers/OAuth/baidudomain.png)

:::caution
- Use the **domain** setting for your Casdoor domain; adding the full callback URL in the callback URL field often fails validation and breaks login.
- Only one URL or domain can be added.
:::

3. Copy **Client ID** and **Client Secret** from the app.

![Baidu Client](/img/providers/OAuth/baiduclient.png)

4. In Casdoor add an **OAuth** provider, set **Type** to **Baidu**, and enter **Client ID** and **Client secret**.

![Baidu Provider](/img/providers/OAuth/baiduprovider.png)

:::info Troubleshooting
- If Baidu reports an incorrect redirect URL: add your domain in the correct place, then reset the Secret (Baidu may show an error but the secret updates after refresh). If it still fails, delete the app and create a new one, and set the domain first.
- Baidu returns a masked username; Casdoor uses that masked value as the username.
:::
