---
title: Send notifications to WeCom
sidebar_label: WeCom
description: Send the notifications of Casdoor to a WeCom (WeChat Work) group through a group bot.
keywords: [WeCom, WeChat Work, notification, provider]
authors: [hsluoyz]
---

This guide explains how to send the notifications of Casdoor to a WeCom (WeChat Work) group through a group bot.

---

#### Learning outcomes

- Create a WeCom group bot.
- Add WeCom as a notification provider in Casdoor.

#### What you need

- A WeCom group chat
- Administrator access to the Casdoor admin console

---

## Create a group bot {#1-create-a-group-bot}

In the settings of a WeCom group chat, add a bot and copy its webhook URL, in the form `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=YOUR_KEY`. See the [WeCom webhook documentation](https://developer.work.weixin.qq.com/document/path/90236).

## Add the provider in Casdoor {#2-configure-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Notification` and **Type** to `WeCom`.
1. Paste the webhook URL into **Endpoint**:

   | Casdoor | WeCom      |
   |---------|------------|
   | Endpoint| Webhook URL|

1. Optionally, set a message template in **Content**.
1. Click **Send Testing Notification**, and save the provider.

## See also

- [Notification providers](/docs/provider/notification/overview)
- [Add WeCom as an OAuth provider](/docs/provider/oauth/weCom)
