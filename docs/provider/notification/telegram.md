---
title: Telegram
description: Using Telegram as a Notification provider for Casdoor
keywords: [telegram, notification, provider]
authors: [UsherFall]
---

## Step1. Get API Token

First you need to have an account at [Telegram](https://web.telegram.org/). After you create a Telegram account, you need to contact the [BotFather](https://telegram.me/BotFather), which is essentially a bot used to create other bots.

To create your bot, the command you need is `/newbot`:

![telegram_bot](/img/providers/notification/telegram_bot.png)

Your bot should have two attributes: a `name` and a `username`. Then you get the `API Token`

## Step2. Get Chat ID

To find your chat ID using [RawDataBot](https://t.me/raw_info_bot). 

![telegram_chat_id](/img/providers/notification/telegram_chat_id.png)

## Step3. Configure Casdoor Telegram Provider

There are three required fields. `App Key`, `Content`, `Chat ID`. `Content` is the message you want to send，the relationship corresponding to the Telegram is as follows:

| Name    | Name in Telegram | 
|---------|------------------|
| App Key | API Token        |
| Chat ID | ChatID           |
| Content |                  |

![telegram_provider](/img/providers/notification/telegram_provider.png)

<video src="/video/provider/notification/use_telegram_as_notification_provider.mp4" controls="controls" width="100%"></video>
