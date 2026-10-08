---
title: Send notifications to Slack
sidebar_label: Slack
description: Send the notifications of Casdoor to a Slack channel through a Slack app.
keywords: [Slack, notification, provider]
authors: [UsherFall]
---

This guide explains how to send the notifications of Casdoor to a Slack channel.

---

#### Learning outcomes

- Create a Slack app with a bot token.
- Add Slack as a notification provider in Casdoor.

#### What you need

- A Slack workspace in which you may create apps
- Administrator access to the Casdoor admin console

---

## Create a Slack app {#1-create-a-slack-app}

1. On [Slack API](https://api.slack.com/apps), create an app and add the bot scopes `chat:write` and `chat:write.public`.

   ![Scopes of the Slack app](/img/providers/notification/slack_app.png)

1. Install the app to the workspace, and copy the **Bot User OAuth Token** from **OAuth & Permissions**.

   ![Bot token of the Slack app](/img/providers/notification/slack_token.png)

1. Find the ID of the channel: in the details of the channel, or at the end of the link that **Copy link** gives.

   ![Channel ID in Slack](/img/providers/notification/slack_channel.png)

## Add the provider in Casdoor {#3-configure-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Notification` and **Type** to `Slack`.
1. Fill in the fields:

   | Casdoor field | Value        |
   |---------------|--------------|
   | Secret key    | Access Token |
   | Chat ID       | Channel ID   |
   | Content       | Message template (optional) |

   ![Slack notification provider in Casdoor](/img/providers/notification/slack_provider.png)

1. Click **Send Testing Notification**, and save the provider.

## See also

- [Notification providers](/docs/provider/notification/overview)
