---
title: WeChat
description: Add WeChat OAuth provider to your application
keywords: [WeChat, OAuth]
authors: [Marvelousp4]
---

## WeChat ✔️

## Add WeChat OAuth Provider

To add WeChat OAuth provider to your application, follow these steps:

1. Visit the [WeChat developer platform](https://open.weixin.qq.com/) and register as a developer.
2. After your web application or mobile application is approved, you will receive your App ID and App Secret.

![wechat](/img/providers/OAuth/wechat.png)

### Choosing the Right SubType

When configuring your WeChat provider, select the appropriate SubType based on your login scenario:

- **Web** (default): For PC browser login where users scan a QR code with their WeChat mobile app. Uses the WeChat Open Platform QR code authorization endpoint.
- **Mobile**: For login when users access your application directly within the WeChat mobile app's built-in browser. Uses the WeChat Open Platform mobile OAuth authorization endpoint.

The SubType selector appears in the provider configuration page. If you need to support both PC and mobile scenarios, create two separate WeChat providers with different SubTypes.

### Credentials Configuration

The WeChat provider supports different credential sets depending on your login scenario. Both Web and Mobile SubTypes use the same WeChat Open Platform credentials but connect to different OAuth endpoints.

**For Web SubType:**

- Use the first keypair (`Client ID`, `Client Secret`) from `WeChat Open Platform (微信开放平台)`. This enables QR code scanning for PC browser login.

**For Mobile SubType:**

- Use the first keypair (`Client ID`, `Client Secret`) from `WeChat Open Platform (微信开放平台)`. This enables OAuth authentication within the WeChat mobile app's built-in browser using the mobile authorization endpoint.

**For WeChat Official Account integration:**

- The second keypair (`Client ID 2`, `Client Secret 2`) and `Access Token` field is for `WeChat Media Platform (微信公众平台)`. The `Access Token` field corresponds to the `Token` in your server configuration. This allows users to log in through your `WeChat Official Account (微信公众号)` when accessing from the WeChat built-in browser.

:::note

WeChat OAuth only works within the WeChat app for mobile scenarios. Third-party mobile browsers and apps cannot authenticate users through WeChat OAuth due to platform restrictions.

:::

### Advanced Configuration

If you configure both the WeChat Open Platform credentials (first keypair) and WeChat Media Platform credentials (second keypair with Access Token), and enable the `Enable QR code` switch, Casdoor provides flexible login options:

- On PC browsers, users can choose between scanning the QR code to login via WeChat Open Platform or WeChat Official Account
- After following the WeChat Official Account (微信公众号), users will be prompted to scan the WeChat Open Platform QR code for login
- On mobile devices within the WeChat app, this step is automatically skipped

:::tip

Link your `WeChat Open Platform (微信开放平台)` and `WeChat Media Platform (微信公众平台)` accounts together inside the WeChat Open Platform settings. This allows Casdoor to recognize users who log in through either PC or mobile as the same account.

:::

For more information, visit the [WeChat Open Platform documentation](https://developers.weixin.qq.com/doc/oplatform/en/Website_App/WeChat_Login/Wechat_Login.html).

## Enable WeChat Login

Add the WeChat provider to your application configuration and include WeChat in your signin methods. The login page will then display a "WeChat" option.

**For Web SubType (QR code login):**

1. A QR code appears automatically on the login page
2. Users scan it with their WeChat app and authorize
3. If the QR code expires, click "Refresh" to generate a new one

![set-wechat](/img/providers/OAuth/set-wechat.png)

![wechat-login](/img/providers/OAuth/wechat-login.png)

**For Mobile SubType:**

When users access your application from within WeChat's built-in browser, the login flow works as follows:

1. Users tap the WeChat login button on your application
2. They are redirected to WeChat's OAuth authorization page
3. After authorizing, they are redirected back to your application
4. The user is automatically logged in without needing to scan any QR code
