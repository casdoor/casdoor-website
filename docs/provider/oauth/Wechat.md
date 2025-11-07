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

### Login Types

When configuring your WeChat provider, you can select a **SubType** to determine the login method:

- **Web** (default): Designed for PC browser login where users scan a QR code with their WeChat mobile app to authenticate.
- **Mobile**: Designed for mobile in-app browser login where users authenticate directly within the WeChat app using OAuth flow.

### Credential Configuration

The WeChat provider supports two different sets of credentials:

- **Client ID & Client Secret**: Required for `WeChat Open Platform (微信开放平台)`. Used for both Web (QR code) and Mobile (in-app browser) login types.

- **Client ID 2, Client Secret 2 & Access Token** (optional): For `WeChat Media Platform (微信公众平台)`. The `Access Token` field corresponds to the `Token` in the server configuration of WeChat Media Platform. This enables login through your `WeChat Official Account (微信公众号)` within the WeChat built-in browser.

### QR Code Login (Web SubType)

When using the Web SubType, if you configure the optional second credential set and enable the `Enable QR code` switch, users have two login options after scanning the QR code:

- Log in directly using information from `WeChat Media Platform (微信公众平台)`
- Log in using information from `WeChat Open Platform (微信开放平台)` after following your WeChat official account

Casdoor will prompt users to follow the WeChat official account before proceeding with login. Note that this feature only works in PC scenarios since mobile phones cannot scan QR codes displayed on themselves.

### Configuration Steps

To enable WeChat login in your application:

1. Add the WeChat provider in your application configuration
2. Select the appropriate SubType (Web or Mobile) based on your use case
3. Add the WeChat option in your signin methods

For Web SubType, the login page will display a "WeChat" tab where users can scan a QR code to authenticate.

:::tip

Link your `WeChat Open Platform (微信开放平台)` and `WeChat Media Platform (微信公众平台)` accounts together within the WeChat Open Platform. This allows Casdoor to recognize users logging in from both PC and mobile as the same user.

:::

:::note

WeChat OAuth has platform-specific limitations:

- **Mobile SubType**: Only works within the WeChat in-app browser
- **Web SubType**: Works in any web browser with QR code scanning
- Third-party mobile apps and non-WeChat mobile browsers are not supported for mobile login

:::

For more information, visit the [WeChat Open Platform documentation](https://developers.weixin.qq.com/doc/oplatform/en/Website_App/WeChat_Login/Wechat_Login.html).

## Screenshots

![set-wechat](/img/providers/OAuth/set-wechat.png)

![wechat-login](/img/providers/OAuth/wechat-login.png)
