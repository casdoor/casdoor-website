---
title: Twitter (X) notification
description: Use Twitter (X) as a notification provider.
keywords: [Twitter, notification, provider, X]
authors: [UsherFall]
---

## 1. Get Twitter app credentials

Sign up for a [Twitter developer account](https://developer.twitter.com/) and create an app. See [API Key and Secret](https://developer.twitter.com/en/docs/authentication/oauth-1-0a/api-key-and-secret). Copy **API Key**, **API Secret**, **Access Token**, and **Access Token Secret**.

![twitter_items](/img/providers/notification/twitter_items.png)

## 2. Get Twitter ID

The **Twitter ID** (numeric user ID) is not shown in the app UI; use [TweeterID](https://tweeterid.com/) or [Twiteridfinder](https://twiteridfinder.com/) to get it.

## 3. Configure the provider in Casdoor

**Providers** → **Add**. Set **Category** to **Notification**, **Type** to **Twitter**. Map:

| Casdoor       | Twitter           |
|---------------|-------------------|
| Client ID     | API Key           |
| Client secret | API Secret        |
| Client ID 2   | Access Token      |
| Client secret 2 | Access Token Secret |
| Chat ID       | Twitter ID        |

![twitter_provider](/img/providers/notification/twitter_provider.png)
