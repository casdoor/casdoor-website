---
title: DingTalk OAuth
description: Add DingTalk as an OAuth provider.
keywords: [DingTalk, OAuth]
authors: [Marvelousp4]
---

Configure DingTalk at the [DingTalk Open Platform](https://open-dev.dingtalk.com/). Create or open an app and note **AppKey** and **AppSecret** (these map to **Client ID** and **Client secret** in Casdoor).

| Casdoor       | DingTalk  |
|---------------|-----------|
| Client ID     | AppKey    |
| Client secret | AppSecret |

![DingTalk](/img/providers/OAuth/dingtalkapp.png)

Add the **Redirect Domain**: your Casdoor domain (e.g. `https://your-casdoor.com`).

![DingTalk](/img/providers/OAuth/dingtalkredirect.png)

## Required permission

Enable **Contact.User.Read** in your DingTalk app (used for `/v1.0/contact/users/me`). Without it, Casdoor cannot fetch user info and sign-in will fail. Enable it under **Permissions Management**.

![DingTalk](/img/providers/OAuth/dingtalkpermission.png)

:::caution
**Contact.User.Read** must be enabled in the DingTalk application.
:::

## Username mapping

Casdoor uses DingTalk’s **unionid** as the username. This keeps the same user mapped across your DingTalk org even when other details change.

## Add the provider in Casdoor

Create an **OAuth** provider, set **Type** to **DingTalk**, and enter **AppKey** as **Client ID** and **AppSecret** as **Client secret**.

![DingTalk](/img/providers/OAuth/dingtalkprovider.png)

See [DingTalk developer docs](https://open.dingtalk.com/document/orgapp-server/tutorial-obtaining-user-personal-information).
