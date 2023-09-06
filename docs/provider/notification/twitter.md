---
title: Twitter
description: Using Twitter as a notification provider for Casdoor
keywords: [Twitter, notification, provider]
authors: [UsherFall]
---

## Step 1: Get the configuration items from twitter

First, sign up for a Twitter developer account, create a Twitter App within the developer portal refer to the documentation: [Authentication](https://developer.twitter.com/en/docs/authentication/oauth-1-0a/api-key-and-secret#:~:text=The%20API%20Key%20and%20Secret,App%20requests%20are%20coming%20from.)

Copy your `API Key` and `API Secret`, `Access Token` and `Access Token Secret`

![twitter_items](/img/providers/notification/twitter_items.png)

## Step 2: Get Twitter ID

`Twitter ID` can't be obtained directly, you can get it from some third-party tools.

- [TweeterID](https://tweeterid.com/)
- [Find Twitter ID](https://codeofaninja.com/tools/find-twitter-id/)
- [Twiteridfinder](https://twiteridfinder.com/)

## Step 3: Configure Casdoor Twitter Provider

There are five required fields: `Client ID`, `Client secret`, `Client ID 2`, `Client secret 2` and `Chat ID`. The relationship between the fields and Twitter is as follows:

| Name            | Name in Twitter     |
|-----------------|---------------------|
| Client ID       | API Key             |
| Client secret   | API Secret          |
| Client ID 2     | Access Token        |
| Client secret 2 | Access Token Secret |
| Chat ID         | Twitter ID          |

![twitter_provider](/img/providers/notification/twitter_provider.png)
