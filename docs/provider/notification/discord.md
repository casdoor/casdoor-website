---
title: Discord notification
description: Use Discord as a notification provider (webhook-style).
keywords: [Discord, notification, provider]
authors: [UsherFall]
---

## 1. Get bot token

In the [Discord Developer Portal](https://discord.com/developers/applications), create an application and open the **Bot** tab. Create or copy the bot **token**.

![discord_token](/img/providers/notification/discord_token.png)

## 2. Get channel ID

In Discord, right-click the channel where messages should be sent and choose **Copy Channel ID**.

![discord_channel](/img/providers/notification/discord_channel.png)

## 3. Configure the provider in Casdoor

**Providers** → **Add**. Set **Category** to **Notification**, **Type** to **Discord**. Map:

| Casdoor    | Discord     |
|------------|-------------|
| Secret key | Bot token   |
| Chat ID    | Channel ID  |
| Content    | (optional)  |

![discord_provider](/img/providers/notification/discord_provider.png)
