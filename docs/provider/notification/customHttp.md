---
title: Send notifications to an HTTP endpoint
sidebar_label: Custom HTTP
description: Send the notifications of Casdoor to an HTTP endpoint of your own with a GET or POST request.
keywords: [custom, notification, provider, HTTP]
authors: [UsherFall]
---

This guide explains how to send the notifications of Casdoor to an HTTP endpoint of your own, for example a webhook of your application.

---

#### Learning outcomes

- Configure a Custom HTTP notification provider.
- Understand the request that Casdoor sends, including the recipient.

#### What you need

- An HTTP endpoint that accepts `GET` or `POST` requests
- Administrator access to the Casdoor admin console

---

## Add the provider {#configure-the-provider}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Notification` and **Type** to `Custom HTTP`.
1. Fill in the fields:

   | Field | Description |
   |---|---|
   | **Method** | `GET` or `POST` |
   | **Parameter** | Name of the query parameter (`GET`) or form field (`POST`) that carries the message |
   | **Content** | The message or a template for it |
   | **Endpoint** | Complete HTTP or HTTPS URL that Casdoor calls |

   ![Custom HTTP provider in Casdoor](/img/providers/notification/custom_http_provider.png)

1. Save the provider.

## Verify the result

Click **Send Testing Notification**. Casdoor sends a request to the **Endpoint**, with the message in the parameter that **Parameter** names:

![Request received by the endpoint](/img/providers/notification/custom_http_request.png)

<video src="/video/provider/notification/use_custom_http_as_notification_provider.mp4" controls="controls" width="100%"></video>

## Forward the recipient {#recipient-forwarding}

The `send-notification` API accepts an optional `recipient` field in its body:

```json
{
  "content": "Your message",
  "recipient": "user@example.com"
}
```

When the request contains a `recipient`, the Custom HTTP provider sends it to the **Endpoint** as an additional `recipient` parameter, a query parameter for `GET` or a form field for `POST`, next to the message. Casdoor sends the parameter only when it isn't empty.

Notification providers that can't address a recipient ignore the field.

## See also

- [Notification providers](/docs/provider/notification/overview)
- [Receive sign-out notifications](/docs/session/single-sign-out#logout-notifications)
