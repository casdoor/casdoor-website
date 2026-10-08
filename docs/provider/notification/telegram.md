---
title: Send notifications to Telegram
sidebar_label: Telegram
description: Send the notifications of Casdoor to a Telegram chat through a bot.
keywords: [telegram, notification, provider]
authors: [UsherFall]
---

This guide explains how to send the notifications of Casdoor to a Telegram chat through a bot.

---

#### Learning outcomes

- Create a Telegram bot and find the chat ID.
- Add Telegram as a notification provider in Casdoor.

#### What you need

- A [Telegram](https://web.telegram.org/) account
- Administrator access to the Casdoor admin console

---

## Create a bot {#1-get-bot-api-token}

1. Open [@BotFather](https://telegram.me/BotFather) and send `/newbot`.
1. Enter the name and the username of the bot. BotFather replies with the API token.

   ![API token from BotFather](/img/providers/notification/telegram_bot.png)

## Find the chat ID {#2-get-chat-id}

Start a chat with [@RawDataBot](https://t.me/raw_info_bot). It shows your chat ID.

![Chat ID from RawDataBot](/img/providers/notification/telegram_chat_id.png)

## Add the provider in Casdoor {#3-configure-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Notification` and **Type** to `Telegram`.
1. Fill in the fields:

   | Casdoor field | Value     |
   |---------------|-----------|
   | Secret key    | API Token |
   | Chat ID       | Chat ID   |
   | Content       | Message template (optional) |

   ![Telegram notification provider in Casdoor](/img/providers/notification/telegram_provider.png)

1. Click **Send Testing Notification**, and save the provider.

<video src="/video/provider/notification/use_telegram_as_notification_provider.mp4" controls="controls" width="100%"></video>

## See also

- [Notification providers](/docs/provider/notification/overview)
