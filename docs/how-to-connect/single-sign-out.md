---
title: Single Sign-Out (SSO Logout)
description: Implement Single Sign-Out to log users out from all applications simultaneously
keywords: [SSO, Single Sign-Out, Logout, Session Management]
authors: [leo220yuyaodog]
---

## Introduction

Single Sign-Out (SSO Logout) is a feature that allows you to log a user out from all applications in an organization simultaneously. When a user logs out from one application, they are automatically logged out from all other applications that are part of the same SSO ecosystem.

This is particularly useful in scenarios such as:

- **Security incidents**: Immediately terminate all active sessions when a security breach is detected
- **Organization-wide logout policies**: Enforce logout across all services when users leave the organization or change roles
- **Compliance requirements**: Ensure users are completely logged out from all systems when required by regulations
- **User-initiated logout**: Allow users to log out from all applications with a single action

## How SSO Logout Works

Casdoor now supports two logout modes: logging out from all sessions or just the current session. The behavior depends on the `logoutAll` parameter.

### Full Logout (logoutAll=true, default)

When you call the logout endpoint without parameters or with `logoutAll=true`:

1. **Delete current session**: Terminate the session that initiated the logout
2. **Expire all access tokens**: All tokens issued to the user are invalidated
3. **Delete all other sessions**: All active sessions across all applications are terminated
4. **Send logout notifications**: Notification providers receive the logout event with all session IDs and token hashes

This ensures complete logout across all integrated applications.

### Session-Level Logout (logoutAll=false)

When you call the logout endpoint with `logoutAll=false`:

1. **Delete current session only**: Only the session that initiated the logout is terminated
2. **Preserve other sessions**: Other active sessions remain valid
3. **Keep tokens active**: Access tokens continue to work for other sessions
4. **Send targeted notification**: Notification providers receive the specific session ID being logged out

This is useful when a user wants to log out from one device while staying logged in on others (e.g., logging out from a library computer while keeping their phone session active).

### Logout Notifications

When SSO logout occurs, Casdoor automatically notifies all notification providers configured in the application where the user registered. This allows your application to respond immediately by invalidating sessions and clearing cached data.

#### Notification Payload

The notification now includes session-level information and cryptographic authentication to prevent malicious logout requests. Here's the complete payload structure:

```json
{
  "owner": "org-name",
  "name": "username",
  "displayName": "John Doe",
  "email": "user@example.com",
  "phone": "+1234567890",
  "id": "user-id",
  "event": "sso-logout",
  "sessionIds": ["session-abc123", "session-def456"],
  "accessTokenHashes": ["hash1", "hash2"],
  "nonce": "random-nonce-123",
  "timestamp": 1699900000,
  "signature": "hmac-sha256-signature"
}
```

**Fields:**

- `owner`, `name`, `displayName`, `email`, `phone`, `id`: User information
- `event`: Always `"sso-logout"` for logout notifications
- `sessionIds`: Array of session IDs being terminated (allows targeted session invalidation)
- `accessTokenHashes`: Array of access token hashes being expired
- `nonce`: Random string for replay attack protection
- `timestamp`: Unix timestamp when the notification was generated
- `signature`: HMAC-SHA256 signature for verification (computed using application's client secret)

#### Configuring Notification Providers

To receive logout notifications, configure a notification provider (such as Custom HTTP, Telegram, or Slack) in your Casdoor application's notification provider settings. For Custom HTTP providers:

- Set **Receiver** to your application's webhook endpoint (e.g., `https://app.example.com/api/logout-webhook`)
- Set **Method** to POST
- Set **Title** to `content` (the parameter name for the JSON payload)

Your application can then use the received information to invalidate specific sessions or all user sessions. For more details on configuring notification providers, see the [Notification Providers](/docs/provider/notification/overview) documentation.

#### Verifying Notification Signatures

To prevent malicious logout requests, you must verify the signature included in the notification. Here's how to verify the signature in different languages:

**JavaScript Example:**

```javascript
const crypto = require('crypto');

function verifyLogoutSignature(notification, clientSecret) {
  const { owner, name, nonce, timestamp, sessionIds, accessTokenHashes, signature } = notification;
  
  // Reconstruct the data string used for signature
  const sessionIdsStr = sessionIds.join(',');
  const tokenHashesStr = accessTokenHashes.join(',');
  const data = `${owner}|${name}|${nonce}|${timestamp}|${sessionIdsStr}|${tokenHashesStr}`;
  
  // Compute HMAC-SHA256
  const expectedSignature = crypto
    .createHmac('sha256', clientSecret)
    .update(data)
    .digest('hex');
  
  return signature === expectedSignature;
}

// In your webhook handler
app.post('/api/logout-webhook', (req, res) => {
  try {
    const notification = JSON.parse(req.body.content);
    
    if (!verifyLogoutSignature(notification, YOUR_CLIENT_SECRET)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    // Invalidate sessions based on sessionIds
    notification.sessionIds.forEach(sessionId => {
      invalidateSession(sessionId);
    });
    
    res.json({ status: 'ok' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
});
```

**Python Example:**

```python
import hmac
import hashlib
import json

def verify_logout_signature(notification, client_secret):
    # Validate required fields
    required_fields = ['owner', 'name', 'nonce', 'timestamp', 'sessionIds', 'accessTokenHashes', 'signature']
    if not all(field in notification for field in required_fields):
        return False
    
    # Extract fields
    owner = notification['owner']
    name = notification['name']
    nonce = notification['nonce']
    timestamp = notification['timestamp']
    session_ids = notification['sessionIds']
    token_hashes = notification['accessTokenHashes']
    signature = notification['signature']
    
    # Reconstruct the data string
    session_ids_str = ','.join(session_ids)
    token_hashes_str = ','.join(token_hashes)
    data = f"{owner}|{name}|{nonce}|{timestamp}|{session_ids_str}|{token_hashes_str}"
    
    # Compute HMAC-SHA256
    expected_signature = hmac.new(
        client_secret.encode('utf-8'),
        data.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    return signature == expected_signature

# In your webhook handler
@app.route('/api/logout-webhook', methods=['POST'])
def logout_webhook():
    try:
        notification = json.loads(request.form.get('content'))
        
        if not verify_logout_signature(notification, YOUR_CLIENT_SECRET):
            return jsonify({'error': 'Invalid signature'}), 401
        
        # Invalidate sessions
        for session_id in notification['sessionIds']:
            invalidate_session(session_id)
        
        return jsonify({'status': 'ok'})
    except (json.JSONDecodeError, KeyError):
        return jsonify({'error': 'Invalid request'}), 400
```

**Go Example:**

```go
import (
    "crypto/hmac"
    "crypto/sha256"
    "encoding/hex"
    "encoding/json"
    "fmt"
    "net/http"
    "strings"
)

type LogoutNotification struct {
    Owner             string   `json:"owner"`
    Name              string   `json:"name"`
    Nonce             string   `json:"nonce"`
    Timestamp         int64    `json:"timestamp"`
    SessionIds        []string `json:"sessionIds"`
    AccessTokenHashes []string `json:"accessTokenHashes"`
    Signature         string   `json:"signature"`
}

func verifyLogoutSignature(notification LogoutNotification, clientSecret string) bool {
    sessionIdsStr := strings.Join(notification.SessionIds, ",")
    tokenHashesStr := strings.Join(notification.AccessTokenHashes, ",")
    data := fmt.Sprintf("%s|%s|%s|%d|%s|%s",
        notification.Owner,
        notification.Name,
        notification.Nonce,
        notification.Timestamp,
        sessionIdsStr,
        tokenHashesStr,
    )
    
    h := hmac.New(sha256.New, []byte(clientSecret))
    h.Write([]byte(data))
    expectedSignature := hex.EncodeToString(h.Sum(nil))
    
    return notification.Signature == expectedSignature
}

// In your webhook handler
func logoutWebhook(w http.ResponseWriter, r *http.Request) {
    content := r.FormValue("content")
    
    var notification LogoutNotification
    if err := json.Unmarshal([]byte(content), &notification); err != nil {
        http.Error(w, "Invalid request", http.StatusBadRequest)
        return
    }
    
    if !verifyLogoutSignature(notification, YOUR_CLIENT_SECRET) {
        http.Error(w, "Invalid signature", http.StatusUnauthorized)
        return
    }
    
    // Invalidate sessions
    for _, sessionId := range notification.SessionIds {
        invalidateSession(sessionId)
    }
    
    w.Write([]byte(`{"status":"ok"}`))
}
```

## SSO Logout API

### Endpoint

```http
GET or POST /api/sso-logout?logoutAll={true|false}
```

The SSO logout endpoint accepts both `GET` and `POST` requests, making it flexible for different integration scenarios.

### Parameters

- **logoutAll** (optional): Controls the logout scope
  - `true` or `1` or empty (default): Logs out from all sessions and expires all tokens
  - Any other value: Logs out only the current session, leaving other sessions active

### Authentication

This endpoint requires the user to be authenticated. You can use any of the authentication methods supported by Casdoor:

- **Access token**: Include the access token in the `Authorization` header
- **Session cookie**: Use the session cookie that was set during login
- **Client credentials**: Use the application's client ID and secret for machine-to-machine scenarios

For more details on authentication methods, see the [Casdoor Public API](/docs/basic/public-api#how-to-authenticate-with-casdoor-public-api) documentation.

### Request Examples

#### Logout from All Sessions (Default)

```bash
curl -X POST https://door.casdoor.com/api/sso-logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

#### Logout from Current Session Only

```bash
curl -X POST https://door.casdoor.com/api/sso-logout?logoutAll=false \
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
    console.log('Current session logout successful:', data);
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

If you're not using a Casdoor SDK, you can implement SSO logout manually by making an HTTP request to the logout endpoint:

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

Always verify the HMAC-SHA256 signature in logout notifications to prevent malicious logout requests. The signature is computed using your application's client secret and includes the nonce, timestamp, session IDs, and token hashes. Never process unsigned or incorrectly signed logout notifications.

### 2. Check Notification Timestamps

Verify that the `timestamp` field in logout notifications is recent (e.g., within the last 5 minutes) to prevent replay attacks. Combined with the `nonce` field, this provides strong protection against unauthorized logout attempts.

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

### 6. Audit Logging

Consider logging logout events for security auditing and compliance:

```go
func logout(userID string, token string, logoutAll bool) error {
    // Call SSO logout
    err := casdoorsdk.Logout(token, logoutAll)
    
    // Log the logout event
    auditLog.Info(map[string]interface{}{
        "event": "sso_logout",
        "user_id": userID,
        "logout_all": logoutAll,
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

If access tokens remain valid after logout:

1. **Verify the logout endpoint**: Ensure you're calling the correct endpoint (`/api/sso-logout`)
2. **Check authentication**: Make sure you're sending valid authentication credentials with the logout request
3. **Review token caching**: Ensure applications don't cache token validation results

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

- [Single Sign-On (SSO)](/docs/how-to-connect/single-sign-on): Learn how to enable SSO for your applications
- [Casdoor Public API](/docs/basic/public-api): Complete API reference including authentication methods
- [Tokens](/docs/token/overview): Understand how Casdoor manages access tokens and sessions
- [OAuth 2.0](/docs/how-to-connect/oauth): Learn about OAuth 2.0 flows supported by Casdoor
