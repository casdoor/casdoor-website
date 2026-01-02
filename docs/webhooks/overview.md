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

Casdoor webhooks support a comprehensive range of events across authentication, resource management, and system operations. Events are categorized by their functional area:

#### Authentication & Session Events

- `signup`, `login`, `logout` - User authentication flows
- `sso-logout`, `unlink` - Single sign-on and account unlinking
- `new-user` - Custom event for new user creation

#### Resource Management Events

Standard CRUD operations (`add-*`, `update-*`, `delete-*`) are available for all core resources including organizations, groups, users, applications, providers, and certificates. Additional resources like roles, permissions, models, adapters, enforcers, sessions, tokens, products, payments, and pricing also support these operations. Webhooks can track changes to syncers, forms, invitations, LDAP configurations, orders, tickets, and transactions as well.

#### Specialized Operations

**User Management:** `add-user-keys`, `remove-user-from-group`, `upload-users`, `check-user-password`, `set-password`, `reset-email-or-phone`, `verify-identification`

**Bulk Operations:** `upload-groups`, `upload-roles`, `upload-permissions`, `upload-resource`

**Order Processing:** `place-order`, `cancel-order`, `pay-order`

**Payment Handling:** `invoice-payment`, `notify-payment`

**Invitations:** `send-invitation`, `verify-invitation`

**Support Systems:** `add-ticket-message`

**Synchronization:** `run-syncer`, `test-syncer-db`, `sync-ldap-users`

**Access Control:** `enforce`, `batch-enforce`, `add-policy`, `update-policy`, `remove-policy`, `add-record`

**Multi-Factor Authentication:** `delete-mfa`, `set-preferred-mfa`, `mfa/setup/initiate`, `mfa/setup/verify`, `mfa/setup/enable`

**WebAuthn:** `webauthn/signup/begin`, `webauthn/signup/finish`, `webauthn/signin/begin`, `webauthn/signin/finish`

**OAuth & Token Management:** `login/oauth/access_token`, `login/oauth/refresh_token`, `login/oauth/introspect`

**Verification & Communication:** `send-verification-code`, `verify-code`, `verify-captcha`, `send-email`, `send-sms`, `send-notification`

**SAML:** `acs`, `saml/metadata`

**System Operations:** `run-casbin-command`, `refresh-engines`, `health`, `metrics`, `callback`, `device-auth`, `faceid-signin-begin`, `user`, `userinfo`

Each event includes contextual information in the webhook payload, allowing you to implement custom logic based on the specific action that triggered the webhook.

## Setting Up a Webhook

To configure a webhook in Casdoor:

1. **Navigate to the Casdoor Webhooks Section:**
   - Open your Casdoor instance.
   - Go to **Settings** > **Webhooks**.

2. **Create a New Webhook:**
   - Click on **Add Webhook**.
   - Enter the **Webhook URL** where Casdoor should send event data.
   - Select one or more events from the comprehensive list of available triggers.
   - (Optional) Add custom headers for authentication or additional context.

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
