---
title: Telegram
description: Using Telegram as a notification provider for Casdoor
keywords: [telegram, notification, provider]
authors: [UsherFall]
---

## Step 1: Get API Token

First, you need to create an account on [Telegram](https://web.telegram.org/). After creating an account, you should contact the [BotFather](https://telegram.me/BotFather), which is a bot used to create other bots.

To create your bot, use the command `/newbot`:

![telegram_bot](/img/providers/notification/telegram_bot.png)

Your bot should have two attributes: a `name` and a `username`. After creating the bot, you will receive an `API Token`.

## Step 2: Get Chat ID

To find your chat ID, use [RawDataBot](https://t.me/raw_info_bot).

![telegram_chat_id](/img/providers/notification/telegram_chat_id.png)

## Step 3: Configure Casdoor Telegram Provider

There are three required fields: `App Key`, `Content`, and `Chat ID`. The relationship between the fields and Telegram is as follows:

| Name    | Name in Telegram |
|---------|------------------|
| App Key | API Token        |
| Chat ID | Chat ID          |
| Content |                  |

![telegram_provider](/img/providers/notification/telegram_provider.png)

<video src="/video/provider/notification/use_telegram_as_notification_provider.mp4" controls="controls" width="100%"></video>
