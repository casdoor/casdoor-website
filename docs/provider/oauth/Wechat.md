---
title: Wechat
description: Add Wechat OAuth provider to your application
keywords: [Wechat, OAuth]
authors: [Marvelousp4]
---

## WeChat ✔️

Visit [WeChat developer platform](https://open.weixin.qq.com/), and register as a developer. After your web application or your mobile application is approved, then you get your App Id and App Secret.

![wechat](/img/providers/OAuth/wechat.png)

The WeChat provider offers two different sets of keypairs:

- The first keypair (`Client ID`, `Client Secret`) is for `WeChat Open Platform (微信开放平台)`, it's only for the PC login scenario. It can show QR code in PC browser and the user can use the WeChat APP in mobile phone to scan the code, so the PC browser will allow to sign in with WeChat.

- The second keypair (`Client ID 2`, `Client Secret 2`) is for `WeChat Media Platform (微信公众平台)`, it's only for the inside-WeChat-app login scenario. It allows the user to log in with WeChat built-in browser inside WeChat mobile APP, it will jump to your `WeChat Official Account (微信公众号)` to log in. It's notable that in the mobile scenario, WeChat itself doesn't support logging in outside of WeChat APP, like in other mobile browsers (H5) or APPs. This is a limitation of WeChat instead of Casdoor.

If you fill in the second keypair (`Client ID 2`, `Client Secret 2`) and enable the `Enable QR code` switch, when the user clicks on the WeChat button to log in, **Casdoor will first ask the user to follow the WeChat official account (微信公众号)**, then continue the login process. It's notable that this is only available in PC login scenario because a mobile phone cannot scan the QR code by itself. Casdoor will automatically skip this step when used in mobile scenario (aka the WeChat built-in browser inside WeChat mobile APP).

:::tip

We recommend setting the two key sets at the same time, and linking your `WeChat Open Platform (微信开放平台)` account and `WeChat Media Platform (微信公众平台)` account together inside `WeChat Open Platform (微信开放平台)`. So a WeChat user logged-in through PC and mobile can be recognized as the same user in Casdoor.

:::

:::note

Due to the limitations of WeChat OAuth, there is currently no way to log in via WeChat in a 3rd-party mobile APP or in a mobile browser other than WeChat APP. The mobile login must happen inside WeChat APP for now.

:::

For more detailed information, please visit [WeChat Open Platform](https://developers.weixin.qq.com/doc/oplatform/en/Website_App/WeChat_Login/Wechat_Login.html).
