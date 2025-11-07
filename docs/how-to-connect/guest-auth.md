---
title: Guest Authentication
description: Create temporary users without credentials
keywords: [guest, authentication, temporary users, passwordless]
authors: [Copilot]
---

Guest authentication enables applications to create temporary users without requiring credentials upfront. This is useful for allowing users to access your application immediately while deferring registration until later.

## Creating a Guest User

To create a guest user and obtain an access token, send a POST request to the token endpoint:

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

The special code value `"guest-user"` is a Casdoor-specific extension that triggers guest user creation instead of the standard OAuth authorization code flow.

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

The system automatically creates a guest user with:

- A randomly generated username in the format `guest_<uuid>`
- A random password
- The tag `guest-user` for identification

## Upgrading Guest Users

Guest users are automatically upgraded to normal users when they update their credentials through the user update API.

**Upgrade triggers:**

- Changing the username to a non-guest format (not starting with `guest_`)
- Setting or changing the password

After upgrade, the user's tag changes from `guest-user` to `normal-user`, enabling standard authentication.

## Restrictions

Guest users cannot sign in through the standard login flow. They must first upgrade their account by setting proper credentials. This ensures that guest users transition to permanent accounts before using password-based authentication.

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
