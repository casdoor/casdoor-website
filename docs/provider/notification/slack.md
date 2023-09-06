---
title: Slack
description: Using Slack as a notification provider for Casdoor
keywords: [Slack, notification, provider]
authors: [UsherFall]
---

## Step 1: Config Slack App

First, you need to create an app on [Slack API](https://api.slack.com/apps). Give your bot/app the following OAuth permission scopes: `chat:write`, `chat:write.public`

![slack_app](/img/providers/notification/slack_app.png)

## Step 2: Get Bot User OAuth Access Token and Channel ID

Copy your `Bot User OAuth Access Token` for usage below.

![slack_token](/img/providers/notification/slack_token.png)

Copy the Channel ID of the channel you want to post a message to. You can grab the Channel ID by right clicking a channel and selecting `copy name`

![slack_channel](/img/providers/notification/slack_channel.png)


## Step 3: Configure Casdoor Slack Provider

There are three required fields: `App Key`, `Content`, and `Chat ID`. The relationship between the fields and Slack is as follows:

| Name    | Name in Slack |
|---------|---------------|
| App Key | Access Token  |
| Chat ID | Channel ID    |
| Content |               |

![slack_provider](/img/providers/notification/slack_provider.png)
