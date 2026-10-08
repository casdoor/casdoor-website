---
title: Send notifications to Discord
sidebar_label: Discord
description: Send the notifications of Casdoor to a Discord channel through a bot.
keywords: [Discord, notification, provider]
authors: [UsherFall]
---

This guide explains how to send the notifications of Casdoor to a Discord channel through a bot.

---

#### Learning outcomes

- Get a bot token and a channel ID from Discord.
- Add Discord as a notification provider in Casdoor.

#### What you need

- A Discord server on which you may add a bot
- Administrator access to the Casdoor admin console

---

## Prepare Discord

1. In the [Discord Developer Portal](https://discord.com/developers/applications), create an application, open the **Bot** tab, and copy the token of the bot.

   ![Bot token in the Discord Developer Portal](/img/providers/notification/discord_token.png)

1. Invite the bot to your server.
1. In Discord, right-click the channel for the messages and select **Copy Channel ID**.

   ![Copy Channel ID in Discord](/img/providers/notification/discord_channel.png)

## Add the provider in Casdoor {#3-configure-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Notification` and **Type** to `Discord`.
1. Fill in the fields:

   | Casdoor    | Discord     |
   |------------|-------------|
   | Secret key | Bot token   |
   | Chat ID    | Channel ID  |
   | Content    | (optional)  |

   ![Discord notification provider in Casdoor](/img/providers/notification/discord_provider.png)

1. Click **Send Testing Notification**, and save the provider.

## See also

- [Notification providers](/docs/provider/notification/overview)
