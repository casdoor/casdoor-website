---
title: WeCom
description: Using WeCom as a notification provider for Casdoor
keywords: [WeCom, WeChat Work, notification, provider]
authors: [hsluoyz]
---

## Step 1: Create a WeCom Group Chat Bot

WeCom (WeChat Work) supports sending notifications through group chat bots. First, create a group chat in WeCom and add a bot to it.

In your WeCom group chat, go to group settings and add a bot. After adding the bot, you will receive a webhook URL.

## Step 2: Get the Webhook URL

Copy the webhook URL provided by WeCom. This URL is used to send messages to your group chat.

The webhook URL format is: `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=YOUR_KEY`

For more information, refer to the [WeCom Webhook Documentation](https://developer.work.weixin.qq.com/document/path/90236).

## Step 3: Configure Casdoor WeCom Provider

In Casdoor, create a new notification provider and select "WeCom" as the type.

Configure the following field:

| Name     | Name in WeCom |
|----------|---------------|
| Endpoint | Webhook URL   |

Paste your webhook URL into the `Endpoint` field. The `Content` field can be used to define a message template for notifications sent to your WeCom group.
