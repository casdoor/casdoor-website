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

### SubType Selection

When configuring your WeChat provider, you can select a **SubType** to determine which OAuth flow endpoint to use:

- **Web** (default): Uses the QR code scanning OAuth flow for PC/web browsers.
- **Mobile**: Uses the mobile OAuth flow for WeChat in-app browser authentication.

Both SubTypes support the same credential sets (Client ID and Client ID 2) and work together. Casdoor automatically detects the user's browser (User Agent) to provide the appropriate login experience regardless of the SubType selected.

### Credential Configuration

The WeChat provider supports two sets of credentials that work with both Web and Mobile SubTypes:

- **Client ID & Client Secret**: For `WeChat Open Platform (微信开放平台)`. This provides QR code login for PC browsers and can also work with mobile browsers through automatic detection.

- **Client ID 2, Client Secret 2 & Access Token** (optional): For `WeChat Media Platform (微信公众平台)`. The `Access Token` field should contain the `Token` value from the server configuration section of your WeChat Media Platform account. This enables login through your `WeChat Official Account (微信公众号)` within the WeChat built-in browser.

Both credential sets can be configured simultaneously and work together across different platforms and browsers.

### QR Code Login

When you configure the optional second credential set (Client ID 2, Client Secret 2, Access Token) and enable the `Enable QR code` switch, users scanning the QR code have two login options:

- Log in directly using information from `WeChat Media Platform (微信公众平台)`
- Log in using information from `WeChat Open Platform (微信开放平台)` after following your WeChat official account

Casdoor will prompt users to follow the WeChat official account before proceeding with login. Note that this QR code feature works in PC scenarios where users can scan codes with their mobile devices.

### Configuration Steps

To enable WeChat login in your application:

1. Add the WeChat provider in your application configuration
2. Select the SubType (Web or Mobile) based on your primary use case
3. Configure the appropriate credential sets
4. Add the WeChat option in your signin methods

Casdoor will automatically adapt the login experience based on the user's browser and the credentials you've configured.

:::tip

Link your `WeChat Open Platform (微信开放平台)` and `WeChat Media Platform (微信公众平台)` accounts together within the WeChat Open Platform. This allows Casdoor to recognize users logging in from both PC and mobile as the same user.

:::

:::note

WeChat OAuth platform limitations:

- WeChat in-app browser login only works within the WeChat app itself
- Third-party mobile apps and non-WeChat mobile browsers are not supported by WeChat's OAuth system
- Both credential sets work across web and mobile platforms through automatic browser detection

:::

For more information, visit the [WeChat Open Platform documentation](https://developers.weixin.qq.com/doc/oplatform/en/Website_App/WeChat_Login/Wechat_Login.html).

## Screenshots

![set-wechat](/img/providers/OAuth/set-wechat.png)

![wechat-login](/img/providers/OAuth/wechat-login.png)
