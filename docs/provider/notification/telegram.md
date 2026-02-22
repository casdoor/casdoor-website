---
title: Telegram notification
description: Send Casdoor notifications to Telegram.
keywords: [telegram, notification, provider]
authors: [UsherFall]
---

## 1. Get bot API token

Create a [Telegram](https://web.telegram.org/) account, then open [@BotFather](https://telegram.me/BotFather) and send `/newbot`. Set the bot name and username; BotFather returns an **API Token**.

![telegram_bot](/img/providers/notification/telegram_bot.png)

## 2. Get chat ID

Use [@RawDataBot](https://t.me/raw_info_bot) in Telegram: start a chat and it will show your **Chat ID**.

![telegram_chat_id](/img/providers/notification/telegram_chat_id.png)

## 3. Configure the provider in Casdoor

Create a **Notification** provider, set **Type** to **Telegram**, and fill in:

| Casdoor field | Value     |
|---------------|-----------|
| Secret key    | API Token |
| Chat ID       | Chat ID   |
| Content       | Message template (optional) |

![telegram_provider](/img/providers/notification/telegram_provider.png)

<video src="/video/provider/notification/use_telegram_as_notification_provider.mp4" controls="controls" width="100%"></video>
