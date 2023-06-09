---
title: 微信
description: 将Wechat  OAuth 提供商添加到您的应用程序
keywords:
  - 微信
  - OAuth
authors:
  - Marvelousp4
---

## 微信:注意事项:

访问 [微信开放平台](https://open.weixin.qq.com/) 并注册成为开发者。 在你的网站应用或移动应用获得批准后，您将得到您的 App ID 和 App Secret。

![微信](/img/providers/OAuth/wechat.png)

WeChat 提供商提供两套不同的密钥：

- 第一个密钥对 (`客户端 ID`, , `客户端密钥`) 是 `WeChat 打开平台(从二维码到二维码)`, 它仅适用于PC登录场景。 它可以在 PC 中显示二维码，用户可以使用手机扫描代码。 PC 浏览器允许使用 WeChat 登录。

- 第二个密钥对 (`客户端 ID 2`, , `客户端 secretreet 2`是 `WeChat 媒体平台 (conctionscreen condition)`, 仅适用于WeChat-app 登录场景。 它允许用户使用 WeChat 在 WeChat 移动APP 内登录 它会跳转到您的 `WeChat 官方帐户 (微信公众号)` 以登录。 值得注意的是，在移动场景中，WeChat 本身不支持在 WeChat APP 以外的登录，比如在其他移动浏览器 (H5) 或 APP 中。 这是对WeChat而不是Casdoor的限制。

如果您填写了第二个密钥对(`客户端 ID 2`, `客户端密钥 2`并启用 `启用 QR 码` 开关， 当用户点击WeChat 按钮登录时， **casdoor将首先要求用户关注WeChat官方帐户 (从二维码中提取)**, 然后继续登录。 值得注意的是，这只能在PC登录场景中使用，因为手机无法自行扫描二维码。 在移动场景中使用castor 将自动跳过此步(在WeChat mobile APP中使用WeChat 内置浏览器)。

::::tip

我们建议同时设置两套钥匙。 并链接您的 `WeChat 开放平台(即时扫描)` 账户和 `WeChat 媒体平台(即时连接)` 账户一起在 `WeChat 开放平台(即时连接)` 中 所以通过 PC 登录的 WeChat 用户和手机可以被识别为 Cassdoor 中的同一用户。

:::

:::note

由于 WeChat OAuth 的限制，目前没有方法通过 WeChat 登录到第三方移动APP 或 WeChat APP以外的移动浏览器。 必须在 WeChat 中移动登录。

:::

欲了解更多详情，请访问 [微信开放平台](https://developers.weixin.qq.com/doc/oplatform/en/Website_App/WeChat_Login/Wechat_Login.html)。
