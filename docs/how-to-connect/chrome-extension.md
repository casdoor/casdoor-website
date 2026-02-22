---
title: Chrome extension
description: Integrate Casdoor OAuth in a Chrome extension.
keywords: [chrome extension, browser extension, oauth]
authors: [hsluoyz]
---

The [casdoor-chrome-extension](https://github.com/casdoor/casdoor-chrome-extension) repo shows how to integrate Casdoor in a Chrome extension. Summary of steps:

## Step 1: Deploy Casdoor

Deploy Casdoor in [production mode](/docs/basic/server-installation). Confirm the login page at `http://localhost:8000` works (e.g. sign in with `admin` / `123` in dev).

## Step 2: Configure the application

1. In Casdoor, go to **Applications** and create or edit an application.
2. Add **Redirect URLs** for the extension (e.g. `https://<extension-id>.chromiumapp.org/` or `http://localhost:3000/callback` for dev).
3. Note the **Client ID** and **Client Secret** and enable the OAuth options you need.

## Step 3: Set Up Chrome Extension

### 1. Create Manifest File

Create a `manifest.json` file in your Chrome extension project with the necessary permissions:

```json
{
  "manifest_version": 3,
  "name": "Casdoor Chrome Extension",
  "version": "1.0.0",
  "description": "Chrome extension integrated with Casdoor",
  "permissions": [
    "identity",
    "storage"
  ],
  "host_permissions": [
    "http://localhost:8000/*",
    "https://door.casdoor.com/*"
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "background": {
    "service_worker": "background.js"
  }
}
```

### 2. Configure Extension Identity

In the `manifest.json`, you may need to add OAuth2 configuration if using Chrome's identity API:

```json
{
  "oauth2": {
    "client_id": "your-client-id.apps.googleusercontent.com",
    "scopes": ["openid", "profile", "email"]
  }
}
```

:::caution

Replace the configuration values with your own Casdoor instance, especially the `client_id` and the host permissions URLs.

:::

## Step 4: Implement Authentication Flow

### 1. Create Background Script

Create a `background.js` file to handle the authentication:

```javascript
const CASDOOR_ENDPOINT = "http://localhost:8000";
const CLIENT_ID = "your-client-id";
const CLIENT_SECRET = "your-client-secret";
const ORGANIZATION_NAME = "built-in";
const APPLICATION_NAME = "app-built-in";
const REDIRECT_URI = chrome.identity.getRedirectURL();

// Generate the authorization URL
function getAuthUrl() {
  const state = Math.random().toString(36).substring(7);
  const authUrl = `${CASDOOR_ENDPOINT}/login/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=openid%20profile%20email&state=${state}`;
  
  chrome.storage.local.set({ oauthState: state });
  
  return authUrl;
}

// Handle OAuth callback
async function handleOAuthCallback(redirectUrl) {
  const url = new URL(redirectUrl);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  
  // Verify state
  const { oauthState } = await chrome.storage.local.get('oauthState');
  if (state !== oauthState) {
    throw new Error('Invalid state parameter');
  }
  
  // Exchange code for token
  const tokenResponse = await fetch(`${CASDOOR_ENDPOINT}/api/login/oauth/access_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      redirect_uri: REDIRECT_URI,
    }),
  });
  
  const tokenData = await tokenResponse.json();
  return tokenData;
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'login') {
    chrome.identity.launchWebAuthFlow(
      {
        url: getAuthUrl(),
        interactive: true,
      },
      async (redirectUrl) => {
        if (chrome.runtime.lastError || !redirectUrl) {
          sendResponse({ error: chrome.runtime.lastError?.message });
          return;
        }
        
        try {
          const tokenData = await handleOAuthCallback(redirectUrl);
          await chrome.storage.local.set({ user: tokenData });
          sendResponse({ success: true, data: tokenData });
        } catch (error) {
          sendResponse({ error: error.message });
        }
      }
    );
    return true; // Keep the message channel open for async response
  }
  
  if (request.action === 'logout') {
    chrome.storage.local.remove(['user', 'oauthState'], () => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.action === 'getUser') {
    chrome.storage.local.get('user', (result) => {
      sendResponse({ user: result.user });
    });
    return true;
  }
});
```

### 2. Create Popup HTML

Create a `popup.html` file for the extension popup:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Casdoor Login</title>
  <style>
    body {
      width: 300px;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    button {
      width: 100%;
      padding: 10px;
      margin: 5px 0;
      cursor: pointer;
      background-color: #4285f4;
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:hover {
      background-color: #357ae8;
    }
    #user-info {
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div id="login-section">
    <h2>Casdoor Login</h2>
    <button id="login-btn">Login with Casdoor</button>
  </div>
  
  <div id="user-section" style="display: none;">
    <h2>Welcome!</h2>
    <div id="user-info"></div>
    <button id="logout-btn">Logout</button>
  </div>
  
  <script src="popup.js"></script>
</body>
</html>
```

### 3. Create Popup Script

Create a `popup.js` file to handle user interactions:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const loginSection = document.getElementById('login-section');
  const userSection = document.getElementById('user-section');
  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const userInfo = document.getElementById('user-info');
  
  // Check if user is already logged in
  chrome.runtime.sendMessage({ action: 'getUser' }, (response) => {
    if (response.user) {
      showUserSection(response.user);
    } else {
      showLoginSection();
    }
  });
  
  loginBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'login' }, (response) => {
      if (response.error) {
        alert('Login failed: ' + response.error);
      } else if (response.success) {
        showUserSection(response.data);
      }
    });
  });
  
  logoutBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'logout' }, (response) => {
      if (response.success) {
        showLoginSection();
      }
    });
  });
  
  function showLoginSection() {
    loginSection.style.display = 'block';
    userSection.style.display = 'none';
  }
  
  function showUserSection(user) {
    loginSection.style.display = 'none';
    userSection.style.display = 'block';
    
    // Parse JWT token to get user info
    if (user.access_token) {
      try {
        const payload = JSON.parse(atob(user.access_token.split('.')[1]));
        userInfo.innerHTML = `
          <p><strong>Name:</strong> ${payload.name || 'N/A'}</p>
          <p><strong>Email:</strong> ${payload.email || 'N/A'}</p>
        `;
      } catch (error) {
        userInfo.innerHTML = '<p>Logged in successfully</p>';
      }
    }
  }
});
```

## Step 5: Load and Test the Extension

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** in the top right corner.
3. Click **Load unpacked** and select your extension directory.
4. Click on the extension icon in the Chrome toolbar.
5. Click the **Login with Casdoor** button to test the authentication flow.

## Step 6: Handle Token Storage and Refresh

To maintain user sessions, you should implement token refresh logic:

```javascript
async function refreshAccessToken(refreshToken) {
  const response = await fetch(`${CASDOOR_ENDPOINT}/api/login/oauth/refresh_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });
  
  return await response.json();
}

// Check token validity and refresh if needed
async function getValidAccessToken() {
  const { user } = await chrome.storage.local.get('user');
  
  if (!user || !user.access_token) {
    return null;
  }
  
  // Check if token is expired (decode JWT)
  try {
    const payload = JSON.parse(atob(user.access_token.split('.')[1]));
    const expiry = payload.exp * 1000; // Convert to milliseconds
    
    if (Date.now() >= expiry) {
      // Token expired, refresh it
      if (user.refresh_token) {
        const newTokens = await refreshAccessToken(user.refresh_token);
        await chrome.storage.local.set({ user: newTokens });
        return newTokens.access_token;
      }
      return null;
    }
    
    return user.access_token;
  } catch (error) {
    console.error('Error checking token validity:', error);
    return null;
  }
}
```

## See also

- [casdoor-chrome-extension](https://github.com/casdoor/casdoor-chrome-extension) - Official example repository
- [Casdoor OAuth Documentation](/docs/how-to-connect/oauth)
- [Chrome Extension Identity API](https://developer.chrome.com/docs/extensions/reference/identity/)
- [Casdoor JavaScript SDK](/docs/how-to-connect/sdk)
