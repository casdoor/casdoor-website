---
title: Notification providers
sidebar_label: Overview
description: Send messages from Casdoor to chat services and HTTP endpoints, such as Slack, Telegram, and your own webhook.
keywords: [Notification, Telegram, Slack, Discord]
authors: [UsherFall]
---

A notification provider sends messages from Casdoor to a chat service or an HTTP endpoint. Casdoor uses notification providers, for example, to tell your applications that a user has signed out. See [Receive sign-out notifications](/docs/session/single-sign-out#logout-notifications).

## Supported services

| Provider | |
|----------|---|
| Telegram | <img src="https://cdn.casbin.org/img/social_telegram.png" width="40" /> |
| Custom HTTP | <img src="https://cdn.casbin.org/img/email_default.png" width="40" /> |
| Slack | <img src="https://cdn.casbin.org/img/social_slack.png" width="40" /> |
| Google Chat | <img src="https://cdn.casbin.org/img/social_google_chat.png" width="40" /> |
| Twitter | <img src="https://cdn.casbin.org/img/social_twitter.png" width="40" /> |
| Discord | <img src="https://cdn.casbin.org/img/social_discord.png" width="40" /> |
| Bark | <img src="https://cdn.casbin.org/img/social_bark.png" width="40" /> |
| DingTalk | <img src="https://cdn.casbin.org/img/social_dingtalk.png" width="40" /> |
| Lark | <img src="https://cdn.casbin.org/img/social_lark.png" width="40" /> |
| Line | <img src="https://cdn.casbin.org/img/social_line.png" width="40" /> |
| Matrix | <img src="https://cdn.casbin.org/img/social_matrix.png" width="40" /> |
| Microsoft Teams | <img src="https://cdn.casbin.org/img/social_teams.png" width="40" /> |
| WeCom | <img src="https://cdn.casbin.org/img/social_wecom.png" width="40" /> |
| Pushbullet | <img src="https://cdn.casbin.org/img/social_pushbullet.png" width="40" /> |
| Pushover | <img src="https://cdn.casbin.org/img/social_pushover.png" width="40" /> |
| Reddit | <img src="https://cdn.casbin.org/img/social_reddit.png" width="40" /> |
| Rocket Chat | <img src="https://cdn.casbin.org/img/social_rocket_chat.png" width="40" /> |
| Viber | <img src="https://cdn.casbin.org/img/social_viber.png" width="40" /> |
| Webpush | <img src="https://cdn.casbin.org/img/email_default.png" width="40" /> |

Casdoor also supports `CUCloud`. The pages of this section describe the configuration of the most common services.

## Add a notification provider

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Notification` and select the **Type**.
1. Fill in the credentials of the service and, optionally, a message template in **Content**.
1. Click **Send Testing Notification** to send a test message.
1. Save the provider and add it to your application.

## See also

- [Custom HTTP](/docs/provider/notification/customHttp)
- [Sign users out of all applications](/docs/session/single-sign-out)
