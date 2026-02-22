---
title: WeCom notification
description: Use WeCom (WeChat Work) group bot webhooks for notifications.
keywords: [WeCom, WeChat Work, notification, provider]
authors: [hsluoyz]
---

WeCom can send notifications to a group via a bot webhook.

## 1. Create a group bot

In WeCom, create a group chat and add a bot in the group settings. Copy the **webhook URL** (format: `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=YOUR_KEY`). See [WeCom webhook docs](https://developer.work.weixin.qq.com/document/path/90236).

## 2. Configure the provider in Casdoor

**Providers** → **Add**. Set **Category** to **Notification**, **Type** to **WeCom**. Paste the webhook URL into **Endpoint**. Optionally set **Content** as a message template for notifications.

| Casdoor | WeCom      |
|---------|------------|
| Endpoint| Webhook URL|
