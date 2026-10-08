---
title: Add WeChat as an OAuth provider
sidebar_label: WeChat
description: Let users sign in to Casdoor with WeChat, by scanning a QR code on a PC or inside the WeChat browser on a phone.
keywords: [WeChat, OAuth]
authors: [Marvelousp4]
---

This guide explains how to let users sign in to Casdoor with WeChat: on a PC by scanning a QR code with the WeChat app, and on a phone inside the WeChat built-in browser.

---

#### Learning outcomes

- Get the credentials from the WeChat Open Platform and the WeChat Media Platform.
- Add WeChat providers for PC and for mobile.
- Show the WeChat tab on the sign-in page.

#### What you need

- An approved application on the [WeChat Open Platform](https://open.weixin.qq.com/), for sign-in on a PC
- For sign-in inside WeChat: an official account on the WeChat Media Platform
- Administrator access to the Casdoor admin console

---

## About sign-in with WeChat

| Sub type | Where users sign in | Credentials |
|---|---|---|
| `Web` (default) | In a PC browser, by scanning a QR code with the WeChat app | **Client ID** and **Client secret** from the WeChat Open Platform |
| `Mobile` | In the built-in browser of the WeChat app | **Client ID 2** and **Client secret 2** from the WeChat Media Platform, and the **Access token** that you set in the server configuration of the official account |

WeChat doesn't allow sign-in from other apps or from mobile browsers outside WeChat. To support both PC and WeChat, create two WeChat providers, one with each sub type.

:::tip
Link your WeChat Open Platform account and your WeChat Media Platform account in the Open Platform. WeChat then gives the same user the same identity on PC and inside WeChat.
:::

## Add the provider in Casdoor

1. On the WeChat Open Platform, get the App ID and App Secret of your approved application.

   ![WeChat Open Platform application](/img/providers/OAuth/wechat.png)

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth`, **Type** to `WeChat`, and **Sub type** to `Web` or `Mobile`.
1. Enter the credentials of the sub type, as in the table above.
1. If you set both credential pairs and the access token, you can turn on **Use WeChat Media Platform in PC**. Users on a PC can then also be prompted to follow the official account before they scan the QR code. This works on a PC only, because a phone can't scan its own QR code.
1. Save the provider.

## Show WeChat on the sign-in page {#enable-wechat-on-the-login-page}

1. Open the edit page of the application.
1. Add the WeChat provider on the **Providers** tab.
1. Add **WeChat** to the **Signin methods**.
1. Save the application.

   ![WeChat in the Signin methods](/img/providers/OAuth/set-wechat.png)

The sign-in page now has a WeChat tab:

1. The user selects the WeChat tab. The page shows a QR code.
1. The user scans the QR code with the WeChat app and authorizes the sign-in.
1. If the QR code expires, the user clicks the refresh button below it.

![WeChat tab on the sign-in page](/img/providers/OAuth/wechat-login.png)

## See also

- [OAuth providers](/docs/provider/oauth/overview)
- [WeChat Login](https://developers.weixin.qq.com/doc/oplatform/en/Website_App/WeChat_Login/Wechat_Login.html) in the WeChat documentation
