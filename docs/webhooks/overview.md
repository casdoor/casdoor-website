---
title: Webhooks Overview
description: Configuring Webhooks in Casdoor
authors: [huang-yilong]
keywords: [webhook, event-driven, API, integration]
---

## Overview

Casdoor provides an event-driven system that allows you to integrate with external applications using webhooks. Webhooks enable real-time communication by sending HTTP `POST` requests with a JSON payload to a configured endpoint whenever a specified event occurs. This allows your application to react to Casdoor events such as user sign-ups, logins, logouts, and profile updates.

## How Webhooks Work

When an event is triggered in Casdoor:

1. Casdoor sends a `POST` request to the specified webhook URL.
2. The request contains a JSON payload with event details.
3. Your application processes the payload and executes relevant actions based on the event type.

### Supported Events

Casdoor webhooks support various user-related events, which are stored in the `action` field of the request payload.

| Event      | Description                                     |
|------------|-------------------------------------------------|
| `signup`   | Triggered when a user signs up                |
| `login`    | Triggered when a user logs in                 |
| `logout`   | Triggered when a user logs out                |
| `update`   | Triggered when user details are updated       |

## Setting Up a Webhook

To configure a webhook in Casdoor:

1. **Navigate to the Casdoor Webhooks Section:**
   - Open your Casdoor instance.
   - Go to **Settings** > **Webhooks**.

2. **Create a New Webhook:**
   - Click on **Add Webhook**.
   - Enter the **Webhook URL** where Casdoor should send event data.
   - Select the events you want to listen to (e.g., `signup`, `login`).
   - (Optional) Add custom headers for authentication.

3. **Save the Webhook Configuration:**
   - Once saved, Casdoor will start sending event notifications to the specified endpoint.

## Example Webhook Payload

Here’s an example of a JSON payload sent to your webhook when a user logs in:

```json
{
  "event": "login",
  "timestamp": 1709452800,
  "user": {
    "id": "12345",
    "username": "johndoe",
    "email": "johndoe@example.com"
  }
}
```

Your application should parse this payload and perform necessary actions, such as logging the event or notifying another service.

## Testing Your Webhook

Before deploying your webhook integration, you can test it using tools like:

- **[Beeceptor](https://beeceptor.com/)** – Allows you to create a custom webhook URL and inspect incoming requests.
- **[Webhook.site](https://webhook.site/)** – Provides an instant webhook endpoint for testing.

### Example Test with Beeceptor

1. Visit [Beeceptor](https://beeceptor.com/) and create a new endpoint.
2. Copy the generated webhook URL and configure it in Casdoor.
3. Trigger a test event (e.g., log in to Casdoor).
4. Check Beeceptor’s dashboard to inspect the received request.

## Handling Webhooks in Your Application

Your server should be able to process incoming webhook requests. Below is a simple example in Node.js:

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('Received webhook:', req.body);
  res.status(200).send('Webhook received');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

## Conclusion

Casdoor webhooks provide a powerful way to integrate with external applications by enabling event-driven interactions. Whether you need to sync user data, trigger notifications, or update external systems, webhooks allow seamless automation.

To ensure a smooth integration, always validate incoming requests and test your webhooks with tools like Beeceptor or Webhook.site before deploying them in production.
