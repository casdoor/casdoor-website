---
title: Slack notification
description: Send Casdoor notifications to a Slack channel.
keywords: [Slack, notification, provider]
authors: [UsherFall]
---

## 1. Create a Slack app

At [Slack API](https://api.slack.com/apps), create an app and add the OAuth scopes **chat:write** and **chat:write.public** for the bot.

![slack_app](/img/providers/notification/slack_app.png)

## 2. Get token and channel ID

- Copy the **Bot User OAuth Access Token** from **OAuth & Permissions**.
- Get the **Channel ID**: right-click the channel in Slack and choose **Copy link** (or “copy name”); the ID is in the URL or you can use Slack’s channel details.

![slack_token](/img/providers/notification/slack_token.png)
![slack_channel](/img/providers/notification/slack_channel.png)

## 3. Configure the provider in Casdoor

Create a **Notification** provider, set **Type** to **Slack**, and fill in:

| Casdoor field | Value        |
|---------------|--------------|
| Secret key    | Access Token |
| Chat ID       | Channel ID   |
| Content       | Message template (optional) |

![slack_provider](/img/providers/notification/slack_provider.png)
