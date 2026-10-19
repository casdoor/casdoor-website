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
- `new-user-ldap` - Custom event fired when a new user is created through an LDAP sync
- `new-user-syncer` - Custom event fired when a new user is created through a database syncer

`logout` and `sso-logout` fire for `GET` requests too, for example when an OpenID Connect (OIDC) relying party sends the browser to `GET /api/logout` for RP-initiated logout. Casdoor records these two actions even when `logPostOnly` in [the configuration file](/docs/basic/configuration) is `true`, which otherwise skips every `GET` request. Without a session cookie, the record takes its user and organization from the subject of `id_token_hint`.

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

**System Operations:** `health`, `metrics`, `callback`, `device-auth`, `faceid-signin-begin`, `user`, `userinfo`

Each event includes contextual information in the webhook payload, allowing you to implement custom logic based on the specific action that triggered the webhook.

## Setting up a webhook

1. In the Casdoor admin console, go to **Admin** > **Webhooks**.
1. Click **Add**.
1. Select the **Organization** that owns the webhook.
1. In **URL**, enter the address that receives the events.
1. In **Events**, select one or more events.
1. Optional: in **Headers**, add custom headers, for example for authentication.
1. Set **Single org only**, see [Events of other organizations](#events-of-other-organizations).
1. Turn on **Is enabled** and save. Casdoor sends the events to the URL from then on.

An administrator of an organization can add webhooks only to their own organization. For any other organization, `POST /api/add-webhook` returns "Unauthorized operation".

### Events of other organizations

**Single org only** (`singleOrgOnly`) decides which records trigger the webhook:

- **On**: Only the records of the organization that owns the webhook trigger it.
- **Off**: The records of all organizations trigger it.

Only a global administrator, that is, a user of the `built-in` organization, can turn **Single org only** off. When anyone else adds or updates a webhook, Casdoor saves it with **Single org only** on.

### Addresses that a webhook can reach

The webhooks of every organization other than `built-in` may only send requests to Internet addresses. Casdoor refuses to connect to private, loopback, link-local, and unspecified addresses, and to the shared address space `100.64.0.0/10`. The link-local range includes the cloud metadata address `169.254.169.254`. Casdoor checks the resolved IP address of every connection, so a host name that resolves to an intranet address, DNS rebinding, and redirects to an intranet address are refused too. These webhooks don't use the proxy that Casdoor is configured with.

The error of a refused delivery contains `the address: <address> is not allowed, only Internet addresses can be requested`.

Only the webhooks of the `built-in` organization, which only global administrators manage, can reach hosts on the intranet. To send the events of another organization to a service on your own network, a global administrator creates the webhook in the `built-in` organization and turns off **Single org only**.

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

### Sign-in failure classification

Every sign-in attempt is stored as a record (visible under **Records** in the admin console and delivered with the webhook payload). When a sign-in **fails**, Casdoor fills the record's `detail` field with a stable, machine-readable reason so you can classify failures without parsing localized error messages.

Possible reasons are:

| `detail` | Meaning |
|---|---|
| `user-not-found` | No matching user for the supplied identifier. |
| `account-disabled` | The user account is disabled (forbidden). |
| `account-frozen` | The user account is frozen/locked. |
| `wrong-password` | The password did not match. |
| `password-expired` | The password has expired and must be reset. |
| `mfa-failed` | Multi-factor authentication verification failed. |

Successful sign-ins leave `detail` empty. Use these values to build audit dashboards, alerting (for example, spikes in `wrong-password`), or lockout logic keyed on a specific failure reason.

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

## Delivery tracking and retry

Casdoor persists every webhook delivery attempt as a **Webhook Event** record. Navigate to **Webhook Events** in the sidebar to see the delivery history for all webhooks in your organization.

Each event record includes:

| Field | Description |
|-------|-------------|
| **Status** | `pending`, `success`, `failed`, or `retrying` |
| **Attempt count** | How many delivery attempts have been made |
| **Last status code** | HTTP response code from the most recent attempt |
| **Last response / error** | Response body or error message from the most recent attempt |
| **Next retry time** | When the next automatic retry will occur (if applicable) |

### Automatic retry

Failed deliveries are retried automatically by a background worker that runs every 30 seconds. The default maximum retries per event is 3. After all retries are exhausted the event status is set to `failed` and no further attempts are made automatically.

### Manual replay

To re-deliver an event, open it in the **Webhook Events** list and click **Replay**. This creates a new delivery attempt regardless of the current retry count or status. Use this to recover from temporary endpoint outages or to re-process an event after fixing a bug in your handler.
