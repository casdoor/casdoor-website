---
title: Webhooks
description: Send Casdoor events to your application via HTTP webhooks for real-time integration.
authors: [huang-yilong]
keywords: [webhook, event-driven, API, integration]
---

Casdoor can notify your application when events occur by sending HTTP `POST` requests with a JSON payload to a URL you configure. Use webhooks to react to sign-ups, logins, logouts, profile updates, and many other events.

## How webhooks work

When an event occurs in Casdoor:

1. Casdoor sends a `POST` request to the specified webhook URL.
2. The request contains a JSON payload with event details.
3. Your application processes the payload and executes relevant actions based on the event type.

### Supported events

Webhooks can be subscribed to a wide set of events, grouped by area:

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

## Setting up a webhook

1. In your Casdoor instance, go to **Settings** → **Webhooks**.
2. Click **Add Webhook**.
3. Enter the **Webhook URL** that will receive events.
4. Select one or more events to subscribe to.
5. (Optional) Add custom headers (e.g. for authentication).
6. Save. Casdoor will send events to the URL from then on.

## Filtering webhook payloads

When working with webhooks, you might not always need the complete record data. Casdoor allows you to filter the payload by configuring **ObjectFields** for each webhook. This feature is particularly valuable when you have privacy concerns, bandwidth constraints, or when your endpoint only processes specific fields.

The ObjectFields configuration accepts either "All" to receive the complete record, or a list of specific field names you want to include. When you specify field names, Casdoor will send only those fields in the webhook payload, reducing payload size and exposing only the data your application needs.

If you configure multiple webhooks with different ObjectFields settings, each webhook operates independently. For example, one webhook might receive only user IDs and timestamps, while another receives full user profiles. Casdoor ensures that the filtering applied to one webhook doesn't affect the data sent to others, even when they're triggered by the same event.

## Example payload

Example JSON sent to your webhook on login:

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

## Testing webhooks

Before production, test with:

- **[Beeceptor](https://beeceptor.com/)** – Allows you to create a custom webhook URL and inspect incoming requests.
- **[Webhook.site](https://webhook.site/)** – Provides an instant webhook endpoint for testing.

### Example with Beeceptor

1. Create an endpoint at [Beeceptor](https://beeceptor.com/).
2. Copy the URL and set it as the webhook URL in Casdoor.
3. Trigger an event (e.g. sign in to Casdoor).
4. Inspect the request in Beeceptor’s dashboard.

## Handling webhooks in your application

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

Validate incoming webhook requests (e.g. signatures or shared secrets) and test with Beeceptor or Webhook.site before using webhooks in production.
