---
title: Custom HTTP
description: Using Custom HTTP as a Notification provider for Casdoor
keywords: [custom, notification, provider]
authors: [UsherFall]
---

:::note

Casdoor supports Custom HTTP Notification Provider。 You can use it to send messages to specific http addresses.

:::

## Configure Casdoor Custom HTTP Provider

There are three required fields. `Method`, `Parameter name`, `Content`, `Chat ID`.

| Name           | Description                                                         | 
|----------------|---------------------------------------------------------------------|
| Method         | Select `GET` or `POST` method                                       |
| Parameter name | URL query parameter name or body parameter, depends on the `method` |
| Content        | The message you want to send                                        |
| Chat ID | Your HTTP address                                                   |

![custom_http_provider](/img/providers/notification/custom_http_provider.png)

In my example, when I click `Send Notification Message`, I get this request

![custom_http_request](/img/providers/notification/custom_http_request.png)

<video src="/video/provider/notification/use_custom_http_as_notification_provider.mp4" controls="controls" width="100%"></video>
