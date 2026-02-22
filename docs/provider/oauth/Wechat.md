---
title: WeChat OAuth
description: Add WeChat as an OAuth provider (PC QR code or in-app browser).
keywords: [WeChat, OAuth]
authors: [Marvelousp4]
---

Add **WeChat** as an OAuth provider for PC (QR code) or mobile (WeChat in-app browser) sign-in.

## Get credentials

1. Register at the [WeChat Open Platform](https://open.weixin.qq.com/).
2. After your app is approved, you receive **App ID** and **App Secret**.

![wechat](/img/providers/OAuth/wechat.png)

## SubTypes

When configuring the WeChat provider, choose a **SubType**:

| SubType | Use case |
|--------|----------|
| **Web** (default) | PC browser: user scans QR code with WeChat app to sign in. |
| **Mobile** | WeChat built-in browser: OAuth inside the WeChat app. |

Use the same credentials; endpoints differ. For both PC and mobile, create two WeChat providers (one Web, one Mobile).

## Two keypairs (optional)

- **Client ID / Client Secret** — From **WeChat Open Platform (微信开放平台)** for PC QR-code login.
- **Client ID 2 / Client Secret 2** + **Access Token** — From **WeChat Media Platform (微信公众平台)** for in-WeChat-app login. **Access Token** is the value you set in the WeChat public account’s server configuration. WeChat only allows in-app login from the WeChat browser, not from other mobile browsers or apps.

If you set both keypairs and **Access Token**, enable **Enable QR code**: on PC, users can sign in with the Open Platform QR code or be prompted to follow the official account and then scan the Open Platform QR code. This flow is for PC only (mobile cannot scan its own QR code).

## Enable WeChat on the login page

Add the WeChat provider to your application and add WeChat to **Signin methods**. The login page will show a **WeChat** tab. QR code flow:

1. User selects the WeChat tab; a QR code is shown.
2. User scans with the WeChat app and authorizes.
3. Use **Refresh** below the QR code if it expires.

![set-wechat](/img/providers/OAuth/set-wechat.png)
![wechat-login](/img/providers/OAuth/wechat-login.png)

:::tip
Link your WeChat Open Platform and WeChat Media Platform accounts in the Open Platform so the same user is recognized when signing in from PC and from the WeChat app.
:::

:::note
WeChat does not support sign-in from third-party mobile apps or from mobile browsers outside the WeChat app. In-app login must happen inside WeChat.
:::

See [WeChat Open Platform – WeChat Login](https://developers.weixin.qq.com/doc/oplatform/en/Website_App/WeChat_Login/Wechat_Login.html).
