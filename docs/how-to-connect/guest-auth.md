---
title: Guest authentication
description: Create temporary users without credentials and upgrade them later.
keywords: [guest, authentication, temporary users, passwordless]
authors: [nomeguy]
---

**Guest authentication** creates temporary users with no username or password. Users can use the app immediately; require full registration later if needed.

## Creating a guest user

POST to the token endpoint with the special code `guest-user`:

```bash
POST https://<CASDOOR_HOST>/api/login/oauth/access_token
```

**Request Body:**

```json
{
    "grant_type": "authorization_code",
    "client_id": "your_client_id",
    "client_secret": "your_client_secret",
    "code": "guest-user"
}
```

:::note
The code `"guest-user"` is a Casdoor extension that creates a guest user instead of completing the normal OAuth code flow.
:::

**Response:**

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

Casdoor creates a user with: username `guest_<uuid>`, a random password, and tag `guest-user`.

## Upgrading to a normal user

When the user sets or changes their username (to something not starting with `guest_`) or sets a password via the user update API, they are upgraded: the tag becomes `normal-user` and they can use normal sign-in.

## Restrictions

Guest users cannot sign in via the normal login page until they upgrade (set a real username or password).

## Example Integration

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

## Related Documentation

- [OAuth 2.0](/docs/how-to-connect/oauth) - Standard OAuth flows
- [User Tags](/docs/user/overview#user-tags) - Understanding user tags
- [Application Tags](/docs/application/tags) - Restricting access by tags
