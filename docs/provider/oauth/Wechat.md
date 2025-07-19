---
title: WeChat
description: Add WeChat OAuth provider to your application
keywords: [WeChat, OAuth]
authors: [Marvelousp4]
---

## WeChat ✔️

To add WeChat OAuth provider to your application, follow these steps:

1. Visit the [WeChat developer platform](https://open.weixin.qq.com/) and register as a developer.
2. After your web application or mobile application is approved, you will receive your App ID and App Secret.

![wechat](/img/providers/OAuth/wechat.png)

The WeChat provider offers two different sets of keypairs:

- The first keypair (`Client ID`, `Client Secret`) is for the `WeChat Open Platform (微信开放平台)` and is designed for the PC login scenario. It allows you to display a QR code in the PC browser, which users can scan using the WeChat app on their mobile phone to sign in.

- The second keypair (`Client ID 2`, `Client Secret 2`) and `Access Token` field is for the `WeChat Media Platform (微信公众平台)` and is intended for the inside-WeChat-app login scenario.`Access Token` field is the `Token` you fill in the `server configuration` of the `WeChat Media Platform (微信公众平台)`. It enables users to log in with the WeChat built-in browser inside the WeChat mobile app, which will redirect them to your `WeChat Official Account (微信公众号)` to log in. Please note that WeChat does not support logging in outside of the WeChat app in other mobile browsers or apps. This limitation is imposed by WeChat and not by Casdoor.

If you fill in the second keypair (`Client ID 2`, `Client Secret 2`), fill the `Access Token` field and enable the `Enable QR code` switch, then you can choose to login directly using the information from the  `WeChat Media Platform (微信公众平台)` after scanning the QR code, or use the information from the `WeChat Open Platform (微信开放平台)` to login, if you choose `use Wechat Open Platform to login`,after user follow the the WeChat official account (微信公众号), users will be required to scan the QR code of `WeChat Open Platform (微信开放平台)`to login. Casdoor will ask the user to follow the WeChat official account (微信公众号) before proceeding with the login process when the user clicks on the WeChat button to login. It's important to note that this functionality is only available in the PC login scenario because a mobile phone cannot scan the QR code by itself. When used in the mobile scenario (i.e., the WeChat built-in browser inside the WeChat mobile app), Casdoor will automatically skip this step.

You can choose whether to enable the WeChat QR code login option on the setting page. To do so, add the WeChat provider in your application configuration and add the WeChat option in your signin methods. Once added, the login page will display a "WeChat" tab as a login option, allowing users to log in by scanning the QR code.

The QR code login process is as follows:

1. On the login page, after selecting the "WeChat" tab, a WeChat QR code will be automatically loaded and displayed.
2. The user scans the QR code using the WeChat app and completes the authorization to log in.
3. If the QR code expires or needs to be refreshed, the user can click the "Refresh" link below the QR code to obtain a new one.

![set-wechat](/img/providers/OAuth/set-wechat.png)

:::tip

We recommend setting both key sets at the same time and linking your `WeChat Open Platform (微信开放平台)` account and `WeChat Media Platform (微信公众平台)` account together inside the `WeChat Open Platform (微信开放平台)`. This will allow Casdoor to recognize a WeChat user logged in through both PC and mobile as the same user.

:::

:::note

Due to the limitations of WeChat OAuth, there is currently no way to log in via WeChat in a third-party mobile app or in a mobile browser other than the WeChat app. The mobile login must happen inside the WeChat app for now.

:::

For more detailed information, please visit the [WeChat Open Platform](https://developers.weixin.qq.com/doc/oplatform/en/Website_App/WeChat_Login/Wechat_Login.html).
