---
title: Single sign-out (SSO logout)
description: Log users out from all applications in the organization at once.
keywords: [SSO, single sign-out, logout, session]
authors: [leo220yuyaodog]
---

## Overview

**Single sign-out (SSO logout)** logs a user out from every application in the organization in one go. When they sign out from one app, all other apps in the same SSO setup are signed out as well.

Use it for:

- **Security incidents**: Immediately terminate all active sessions when a security breach is detected
- **Organization-wide logout policies**: Enforce logout across all services when users leave the organization or change roles
- **Compliance requirements**: Ensure users are completely logged out from all systems when required by regulations
- **User-initiated logout**: Allow users to log out from all applications with a single action

## How it works

The `logoutAll` parameter chooses the mode:

**Full SSO logout** (default, `logoutAll=true` or omitted):

1. **Delete all active sessions**: All active sessions for the user across all applications in the organization are terminated
2. **Expire all access tokens**: All access tokens that were issued to the user are immediately invalidated
3. **Clear the current session**: The user's current session and authentication state are cleared
4. **Send logout notifications**: Notification providers receive the logout event with all session IDs and token hashes

This ensures that the user is completely logged out from all integrated applications and cannot access any resources without re-authenticating.

**Session-only logout** (`logoutAll=false`):

1. **Delete current session**: Only the current session is terminated
2. **Clear current authentication state**: The user's current session and token are cleared
3. **Send targeted notification**: Notification providers receive the logout event with the current session ID and associated access token hashes

This allows users to logout from a specific device or browser while remaining logged in on other sessions. This is useful when users share accounts across multiple devices or have concurrent sessions they want to manage individually.

The access token hashes included in session-level logout notifications enable your subsystems to identify exactly which tokens need to be invalidated. When a user logs out from a specific browser or device, match the token hashes against active sessions and perform targeted invalidation without affecting other devices where the user remains logged in.

### Logout notifications

On SSO logout, Casdoor sends a request to each notification provider configured for the application the user signed up with. The notifications include session IDs, access token hashes, and cryptographic signatures for secure, synchronized logout across all integrated systems.

Each notification provider receives a POST request with the following payload:

```json
{
  "owner": "org-name",
  "name": "username",
  "displayName": "John Doe",
  "email": "user@example.com",
  "phone": "+1234567890",
  "id": "user-id",
  "event": "sso-logout",
  "sessionIds": ["session-123", "session-456"],
  "accessTokenHashes": ["hash-abc", "hash-def"],
  "nonce": "random-nonce-xyz",
  "timestamp": 1699900000,
  "signature": "hmac-sha256-signature"
}
```

**Notification fields:**

- `sessionIds`: List of session IDs being logged out (enables targeted session invalidation)
- `accessTokenHashes`: SHA-256 hashes of access tokens being invalidated. Both full SSO logout and session-level logout now include these hashes, allowing your subsystems to match them against active tokens and perform synchronized logout
- `nonce`: Random value for replay attack protection
- `timestamp`: Unix timestamp when the notification was generated
- `signature`: HMAC-SHA256 signature computed using the application's client secret

#### Verifying Logout Notifications

To prevent malicious logout requests, you should verify the signature of incoming logout notifications:

```go
// Example verification in Go
func verifyLogoutNotification(notification *SsoLogoutNotification, clientSecret string) bool {
    data := fmt.Sprintf("%s|%s|%s|%d|%s|%s",
        notification.Owner,
        notification.Name,
        notification.Nonce,
        notification.Timestamp,
        strings.Join(notification.SessionIds, ","),
        strings.Join(notification.AccessTokenHashes, ","))
    
    expectedSignature := hmacSHA256(clientSecret, data)
    return notification.Signature == expectedSignature
}
```

```javascript
// Example verification in JavaScript
const crypto = require('crypto');

function verifyLogoutNotification(notification, clientSecret) {
  const data = `${notification.owner}|${notification.name}|${notification.nonce}|${notification.timestamp}|${notification.sessionIds.join(',')}|${notification.accessTokenHashes.join(',')}`;
  
  const expectedSignature = crypto
    .createHmac('sha256', clientSecret)
    .update(data)
    .digest('hex');
  
  return notification.signature === expectedSignature;
}
```

#### Configuration

To receive logout notifications, configure a notification provider (such as Custom HTTP, Telegram, or Slack) in your Casdoor application's notification provider settings. For Custom HTTP providers:

- Set **Receiver** to your application's webhook endpoint (e.g., `https://app.example.com/api/logout-webhook`)
- Set **Method** to POST
- Set **Title** to `content` (the parameter name for the JSON payload)

Your application can then verify the signature, check the timestamp to prevent replay attacks, and use the session IDs and token hashes to perform targeted logout operations. For more details on configuring notification providers, see the [Notification Providers](/docs/provider/notification/overview) documentation.

## SSO Logout API

### Endpoint

```http
GET or POST /api/sso-logout?logoutAll=<true|false>
```

The SSO logout endpoint accepts both `GET` and `POST` requests, making it flexible for different integration scenarios.

### Parameters

- `logoutAll` (optional): Controls logout scope. Accepts `true`, `1`, or empty string (default: `true` for backward compatibility)
  - `true` or `1` or empty: Logout from all sessions across all applications
  - Any other value (e.g., `false`, `0`): Logout from current session only

### Authentication

This endpoint requires the user to be authenticated. Use any authentication method supported by Casdoor:

- **Access token**: Include the access token in the `Authorization` header
- **Session cookie**: Use the session cookie that was set during login
- **Client credentials**: Use the application's client ID and secret for machine-to-machine scenarios

For more details on authentication methods, see the [Casdoor Public API](/docs/basic/public-api#how-to-authenticate) documentation.

### Request Examples

#### Logout from All Sessions (Default)

```bash
curl -X POST https://door.casdoor.com/api/sso-logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Or explicitly specify logoutAll=true
curl -X POST "https://door.casdoor.com/api/sso-logout?logoutAll=true" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

#### Logout from Current Session Only

```bash
curl -X POST "https://door.casdoor.com/api/sso-logout?logoutAll=false" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

#### Using Session Cookie

```bash
curl -X POST https://door.casdoor.com/api/sso-logout \
  --cookie "casdoor_session_id=abc123def456"
```

#### Using JavaScript Fetch API

```javascript
// Logout from all sessions
fetch('https://door.casdoor.com/api/sso-logout', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  },
  credentials: 'include'
})
  .then(response => response.json())
  .then(data => {
    console.log('Logout successful:', data);
    window.location.href = '/login';
  })
  .catch(error => {
    console.error('Logout failed:', error);
  });

// Logout from current session only
fetch('https://door.casdoor.com/api/sso-logout?logoutAll=false', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`
  },
  credentials: 'include'
})
  .then(response => response.json())
  .then(data => {
    console.log('Logged out from current session:', data);
    window.location.href = '/login';
  });
```

### Response

The API returns a standard Casdoor response:

```json
{
  "status": "ok",
  "msg": "",
  "data": ""
}
```

**Response Fields:**

- `status`: Indicates whether the operation was successful (`"ok"`) or failed (`"error"`)
- `msg`: Contains an error message if the operation failed, otherwise empty
- `data`: Additional data returned by the API, typically empty for logout operations

## Implementing SSO Logout in Your Application

### Using Casdoor SDKs

Most Casdoor SDKs provide built-in support for SSO logout. Here are examples for different platforms:

#### Go SDK

```go
import "github.com/casdoor/casdoor-go-sdk/casdoorsdk"

func logout(w http.ResponseWriter, r *http.Request) {
    // Get the access token from the session or request
    token := getAccessTokenFromSession(r)
    
    // Call the SSO logout endpoint
    err := casdoorsdk.Logout(token)
    if err != nil {
        http.Error(w, "Logout failed", http.StatusInternalServerError)
        return
    }
    
    // Clear local session
    clearSession(w, r)
    
    // Redirect to login page
    http.Redirect(w, r, "/login", http.StatusFound)
}
```

#### JavaScript SDK

```javascript
import Sdk from "casdoor-js-sdk";

const CasdoorSDK = new Sdk({
  serverUrl: "https://door.casdoor.com",
  clientId: "YOUR_CLIENT_ID",
  appName: "YOUR_APP_NAME",
  organizationName: "YOUR_ORG_NAME",
});

async function handleLogout() {
  try {
    // Call the SSO logout endpoint
    await CasdoorSDK.logout();
    
    // Clear local state
    localStorage.removeItem('casdoor_token');
    sessionStorage.clear();
    
    // Redirect to login page
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout failed:', error);
  }
}
```

#### Python SDK

```python
from casdoor import CasdoorSDK

sdk = CasdoorSDK(
    endpoint="https://door.casdoor.com",
    client_id="YOUR_CLIENT_ID",
    client_secret="YOUR_CLIENT_SECRET",
    certificate="YOUR_CERT",
    org_name="YOUR_ORG_NAME",
    app_name="YOUR_APP_NAME",
)

def logout(access_token):
    try:
        # Call the SSO logout endpoint
        result = sdk.logout(access_token)
        
        if result['status'] == 'ok':
            # Clear local session
            clear_session()
            return True
        else:
            print(f"Logout failed: {result['msg']}")
            return False
    except Exception as e:
        print(f"Logout error: {e}")
        return False
```

### Manual Implementation

Without a Casdoor SDK, implement SSO logout by calling the logout endpoint:

```javascript
async function logout() {
  const accessToken = localStorage.getItem('access_token');
  
  try {
    // Use the full Casdoor server URL in your application
    const response = await fetch('https://door.casdoor.com/api/sso-logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    
    const result = await response.json();
    
    if (result.status === 'ok') {
      // Clear local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_info');
      sessionStorage.clear();
      
      // Redirect to login page
      window.location.href = '/login';
    } else {
      console.error('Logout failed:', result.msg);
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
}
```

## Best Practices

### 1. Clear Local State

After calling the SSO logout endpoint, make sure to clear all local authentication state:

- Remove access tokens from local storage or session storage
- Clear any cached user information
- Invalidate any local session cookies
- Reset application state to the logged-out state

### 2. Handle Logout Errors Gracefully

Even if the SSO logout endpoint fails, you should still clear local authentication state to ensure the user appears logged out from your application:

```javascript
async function logout() {
  try {
    await callSSOLogout();
  } catch (error) {
    console.error('SSO logout failed, clearing local state anyway:', error);
  } finally {
    // Always clear local state
    clearLocalAuthenticationState();
    redirectToLogin();
  }
}
```

### 3. Provide User Feedback

Give users clear feedback about the logout process:

```javascript
async function logout() {
  // Show loading indicator
  showLoadingIndicator('Logging out...');
  
  try {
    await callSSOLogout();
    showSuccessMessage('Logged out successfully');
  } catch (error) {
    showErrorMessage('Logout failed, but you have been logged out locally');
  } finally {
    clearLocalAuthenticationState();
    // Redirect after a short delay to allow users to see the message
    setTimeout(() => redirectToLogin(), 1000);
  }
}
```

### 4. Implement Logout Timeout

Set a reasonable timeout for the logout request to prevent users from waiting indefinitely:

```javascript
async function logout() {
  const timeout = 5000; // 5 seconds
  
  try {
    await Promise.race([
      callSSOLogout(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Logout timeout')), timeout)
      )
    ]);
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    clearLocalAuthenticationState();
    redirectToLogin();
  }
}
```

## Security Considerations

### 1. Verify Logout Notification Signatures

Always verify the HMAC-SHA256 signature of logout notifications to prevent malicious logout requests. The signature is computed using your application's client secret and includes all critical fields (owner, name, nonce, timestamp, sessionIds, accessTokenHashes). Reject any notification with an invalid signature.

### 2. Check Notification Timestamp

Implement timestamp validation to prevent replay attacks. Reject notifications that are too old (e.g., more than 5 minutes old):

```javascript
function isNotificationValid(notification) {
  const maxAge = 5 * 60 * 1000; // 5 minutes in milliseconds
  const now = Date.now();
  const notificationTime = notification.timestamp * 1000; // Convert to milliseconds
  
  if (now - notificationTime > maxAge) {
    console.error('Notification is too old, possible replay attack');
    return false;
  }
  
  return verifyLogoutNotification(notification, clientSecret);
}
```

### 3. Secure Communication

Always use HTTPS when calling the SSO logout endpoint to prevent token interception:

```javascript
// ✅ Good: Uses HTTPS
const logoutUrl = 'https://door.casdoor.com/api/sso-logout';

// ❌ Bad: Uses HTTP (insecure)
const logoutUrl = 'http://door.casdoor.com/api/sso-logout';
```

### 4. Token Validation

Casdoor validates the access token before processing the logout request. Ensure your token is valid and has not expired before making the logout call.

### 5. CSRF Protection

When using session cookies for authentication, ensure CSRF protection is enabled to prevent unauthorized logout requests:

```javascript
// Include CSRF token in the request headers
// Replace with your actual Casdoor server URL
fetch('https://door.casdoor.com/api/sso-logout', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': getCsrfToken()
  },
  credentials: 'include'
});
```

### 6. Protect Client Secrets

Keep your application's client secret secure. It's used to sign logout notifications, so if compromised, attackers could forge valid logout requests. Store it securely (e.g., in environment variables or secret management systems) and never expose it in client-side code.

### 7. Audit Logging

Consider logging logout events for security auditing and compliance:

```go
func logout(userID string, token string) error {
    // Call SSO logout
    err := casdoorsdk.Logout(token)
    
    // Log the logout event
    auditLog.Info(map[string]interface{}{
        "event": "sso_logout",
        "user_id": userID,
        "timestamp": time.Now(),
        "success": err == nil,
    })
    
    return err
}
```

## Troubleshooting

### Logout Not Working Across All Applications

If users remain logged in to some applications after SSO logout:

1. **Verify application integration**: Ensure all applications are properly integrated with Casdoor and use the same organization
2. **Check token validation**: Make sure all applications validate tokens on each request
3. **Review session management**: Applications should not rely solely on local sessions; they must validate tokens with Casdoor

### Token Still Valid After Logout

If access tokens or refresh tokens remain valid after logout:

1. **Verify the logout endpoint**: Ensure you're calling the correct endpoint (`/api/sso-logout`)
2. **Check authentication**: Make sure you're sending valid authentication credentials with the logout request
3. **Review token caching**: Ensure applications don't cache token validation results

After SSO logout, both access tokens and refresh tokens are invalidated. The token records remain in the database with `ExpiresIn` set to 0, but Casdoor's token introspection and refresh token endpoints will reject them. When a client attempts to use a refresh token after logout, they'll receive an `invalid_grant` error with the message "refresh token is invalid, expired or revoked". This ensures complete session termination and prevents token reuse even if the token hasn't reached its original expiration time.

### Logout Endpoint Returns Error

Common error scenarios:

- **401 Unauthorized**: The access token is invalid or expired. Clear local state and redirect to login.
- **403 Forbidden**: The user doesn't have permission to logout. This is rare and may indicate a configuration issue.
- **500 Internal Server Error**: Server-side error. Log the error and clear local state anyway.

```javascript
async function logout() {
  try {
    // Replace with your actual Casdoor server URL
    const response = await fetch('https://door.casdoor.com/api/sso-logout', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) {
      console.error(`Logout failed with status: ${response.status}`);
      // Clear local state anyway
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    clearLocalAuthenticationState();
    redirectToLogin();
  }
}
```

## Related Documentation

- [Single Sign-On (SSO)](/docs/session/single-sign-on): Learn how to enable SSO for your applications
- [Casdoor Public API](/docs/basic/public-api): Complete API reference including authentication methods
- [Tokens](/docs/token/overview): Understand how Casdoor manages access tokens and sessions
- [OAuth 2.0](/docs/how-to-connect/oauth): Learn about OAuth 2.0 flows supported by Casdoor
