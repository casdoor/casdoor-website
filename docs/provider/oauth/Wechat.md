---
title: Wechat
description: Add Wechat OAuth provider to your application
keywords: [Wechat, OAuth]
---

## WeChat:heavy_check_mark:

Visit [WeChat developer platform](https://open.weixin.qq.com/), register as a developer, after your web application or your mobile application is approved, then you get you App Id and App Secret.

![wechat](/img/providers/OAuth/wechat.png)

The WeChat provider offers two different sets of keys:

- The first key set is for `WeChat Open Platform (微信开放平台)`, it's only for the PC scenario. It can show QR-code in PC and the user can use the mobile phone to scan the code, so the PC browser will allow to sign in with WeChat.

- The second key set is for `WeChat Media Platform (微信公众平台)`, it's only for the mobile scenario. It allows the user to log in with WeChat inside WeChat mobile APP, it will jump to your `WeChat Official Account (微信公众号)` to log in.

:::tip

We recommend setting the two key sets at the same time, and link your `WeChat Open Platform (微信开放平台)` account and `WeChat Media Platform (微信公众平台)` account together inside `WeChat Open Platform (微信开放平台)`. So a WeChat user logged-in through PC and mobile can be recognized as the same user in Casdoor.

:::

:::note

Due to the limitation of WeChat OAuth, there is currently no way to log in via WeChat in a 3rd-party mobile APP or in a mobile browser other than WeChat APP. The mobile login must happen inside WeChat APP for now.

:::

For more detailed information, please visit [WeChat Open Platform](https://developers.weixin.qq.com/doc/oplatform/en/Website_App/WeChat_Login/Wechat_Login.html).
