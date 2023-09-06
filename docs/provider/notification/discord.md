---
title: Discord
description: Using Discord as a notification provider for Casdoor
keywords: [Discord, notification, provider]
authors: [UsherFall]
---

## Step 1: Get Token from Discord

First, sign up for the Discord Developer portal, create a new application, navigate to the “Bot” tab to configure it.

Copy your Bot `token`

![discord_token](/img/providers/notification/discord_token.png)

## Step 2: Get Channel ID

Copy the Channel ID of the channel you want to post a message to. You can grab the Channel ID by right clicking a channel and selecting `Copy Channel ID`

![discord_channel](/img/providers/notification/discord_channel.png)

## Step 3: Configure Casdoor Discord Provider

There are three required fields: `App Key`, `Content`, and `Chat ID`. The relationship between the fields and Discord is as follows:

| Name    | Name in Slack |
|---------|---------------|
| App Key | Token         |
| Chat ID | Channel ID    |
| Content |               |

![discord_provider](/img/providers/notification/discord_provider.png)
