---
title: Sign users in as guests
sidebar_label: Guest authentication
description: Create temporary users without a username or password, and turn them into regular users later.
keywords: [guest, authentication, temporary users, passwordless]
authors: [nomeguy]
---

This guide explains how to let people use your application before they register. Casdoor creates a temporary guest user without a username or password, and you turn the guest into a regular user later.

---

#### Learning outcomes

- Allow guest sign-in for an application.
- Create a guest user through the token endpoint.
- Upgrade a guest to a regular user.

#### What you need

- An [application](/docs/application/overview) in an organization other than `built-in`. Guest authentication isn't available in the `built-in` organization.
- The client ID and client secret of the application

---

## Allow guest sign-in

1. In the Casdoor admin console, open the edit page of the application and go to the **Authentication** tab.
1. Turn on **Enable signup**. Casdoor creates a user for each guest, so sign-up must be allowed.
1. Turn on **Enable guest signin**. Without it, the token endpoint answers guest requests with `invalid_grant`.
1. Save the application.

## Create a guest user {#creating-a-guest-user}

Send a `POST` request to the token endpoint with the code `guest-user`:

```bash
POST https://<CASDOOR_HOST>/api/login/oauth/access_token
```

With the body:

```json
{
    "grant_type": "authorization_code",
    "client_id": "your_client_id",
    "client_secret": "your_client_secret",
    "code": "guest-user"
}
```

The code `guest-user` is an extension of Casdoor. Casdoor creates a guest user instead of completing an authorization code flow, and returns tokens for that user:

```json
{
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 10080,
    "scope": "openid"
}
```

The new user has the following properties:

| Property | Value |
|---|---|
| Username | `guest_<uuid>` |
| Password | Random |
| Tag | `guest-user` |

A guest can't sign in on the sign-in page until the guest is upgraded.

## Upgrade a guest to a regular user {#upgrading-to-a-normal-user}

Update the user through the user update API in one of two ways:

- Set a username that doesn't start with `guest_`.
- Set a password.

Casdoor then changes the tag of the user to `normal-user`, and the user can sign in on the sign-in page.

## Example

The following JavaScript creates a guest user and later upgrades it:

```javascript
// Create a guest user
async function createGuestUser() {
  const response = await fetch('https://your-casdoor-host/api/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: 'your_client_id',
      client_secret: 'your_client_secret',
      code: 'guest-user'
    })
  });
  
  const data = await response.json();
  return data.access_token;
}

// Later, upgrade the guest user
async function upgradeGuestUser(accessToken, newUsername, newPassword) {
  const response = await fetch('https://your-casdoor-host/api/update-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      name: newUsername,
      password: newPassword
    })
  });
  
  return response.json();
}
```

## See also

- [OAuth 2.0](/docs/how-to-connect/oauth)
- [User tags](/docs/user/overview#user-tags)
- [Application tags](/docs/application/tags)
