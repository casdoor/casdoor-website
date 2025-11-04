---
title: Single Sign-Out (SSO Logout)
description: Implement Single Sign-Out to log users out from all applications simultaneously
keywords: [SSO, Single Sign-Out, Logout, Session Management]
authors: [Copilot]
---

## Introduction

Single Sign-Out (SSO Logout) is a feature that allows you to log a user out from all applications in an organization simultaneously. When a user logs out from one application, they are automatically logged out from all other applications that are part of the same SSO ecosystem.

This is particularly useful in scenarios such as:

- **Security incidents**: Immediately terminate all active sessions when a security breach is detected
- **Organization-wide logout policies**: Enforce logout across all services when users leave the organization or change roles
- **Compliance requirements**: Ensure users are completely logged out from all systems when required by regulations
- **User-initiated logout**: Allow users to log out from all applications with a single action

## How SSO Logout Works

When the SSO logout endpoint is called, Casdoor performs the following actions:

1. **Delete all active sessions**: All active sessions for the user across all applications in the organization are terminated
2. **Expire all access tokens**: All access tokens that were issued to the user are immediately invalidated
3. **Clear the current session**: The user's current session and authentication state are cleared

This ensures that the user is completely logged out from all integrated applications and cannot access any resources without re-authenticating.

## SSO Logout API

### Endpoint

```http
GET or POST /api/sso-logout
```

The SSO logout endpoint accepts both `GET` and `POST` requests, making it flexible for different integration scenarios.

### Authentication

This endpoint requires the user to be authenticated. You can use any of the authentication methods supported by Casdoor:

- **Access token**: Include the access token in the `Authorization` header
- **Session cookie**: Use the session cookie that was set during login
- **Client credentials**: Use the application's client ID and secret for machine-to-machine scenarios

For more details on authentication methods, see the [Casdoor Public API](/docs/basic/public-api#how-to-authenticate-with-casdoor-public-api) documentation.

### Request Examples

#### Using Access Token

```bash
curl -X POST https://door.casdoor.com/api/sso-logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

#### Using Session Cookie

```bash
curl -X POST https://door.casdoor.com/api/sso-logout \
  --cookie "casdoor_session_id=abc123def456"
```

#### Using JavaScript Fetch API

```javascript
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
    // Redirect to login page or home page
    window.location.href = '/login';
  })
  .catch(error => {
    console.error('Logout failed:', error);
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

### 1. Secure Communication

Always use HTTPS when calling the SSO logout endpoint to prevent token interception:

```javascript
// ✅ Good: Uses HTTPS
const logoutUrl = 'https://door.casdoor.com/api/sso-logout';

// ❌ Bad: Uses HTTP (insecure)
const logoutUrl = 'http://door.casdoor.com/api/sso-logout';
```

### 2. Token Validation

Casdoor validates the access token before processing the logout request. Ensure your token is valid and has not expired before making the logout call.

### 3. CSRF Protection

When using session cookies for authentication, ensure CSRF protection is enabled to prevent unauthorized logout requests:

```javascript
// Include CSRF token in the request headers
fetch('/api/sso-logout', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': getCsrfToken()
  },
  credentials: 'include'
});
```

### 4. Audit Logging

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
    const response = await fetch('/api/sso-logout', {
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
