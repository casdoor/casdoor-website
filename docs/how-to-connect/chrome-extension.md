---
title: Sign users in to a Chrome extension
sidebar_label: Chrome extension
description: Add Casdoor sign-in to a Chrome extension with the Chrome identity API and the OAuth 2.0 authorization code flow.
keywords: [chrome extension, browser extension, oauth]
authors: [hsluoyz]
---

This guide explains how to add Casdoor sign-in to a Chrome extension. The extension opens the Casdoor sign-in page through the Chrome identity API and exchanges the authorization code for tokens in its background script.

---

#### Learning outcomes

- Configure a Casdoor application for an extension.
- Declare the permissions of the extension in its manifest.
- Implement sign-in in the background script and the popup.
- Refresh the access token.

#### What you need

- A running Casdoor instance. See [Install the Casdoor server](/docs/basic/server-installation).
- Google Chrome

#### Sample code

- [casdoor-chrome-extension](https://github.com/casdoor/casdoor-chrome-extension)

---

## Configure the Casdoor application

1. In the Casdoor admin console, go to **Applications** and add or open an application.
1. Add the redirect URL of the extension to **Redirect URLs**: `https://<extension-id>.chromiumapp.org/`. For development, you can also add `http://localhost:3000/callback`.
1. Copy the **Client ID** and the **Client secret**.

## Create the manifest

1. Create `manifest.json` in the project of your extension, with the permissions that the sign-in flow needs:

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

1. If you use the `oauth2` section of the Chrome identity API, add it to `manifest.json`:

   ```json
   {
     "oauth2": {
       "client_id": "your-client-id.apps.googleusercontent.com",
       "scopes": ["openid", "profile", "email"]
     }
   }
   ```

:::caution
Replace the example values with the values of your Casdoor instance, in particular `client_id` and the URLs under the host permissions.
:::

## Implement the sign-in flow

1. Create `background.js`. It builds the authorization URL, starts the flow, and exchanges the code for tokens:

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

1. Create `popup.html`, the popup of the extension:

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

1. Create `popup.js`, which reacts to the buttons of the popup:

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

## Load and test the extension

1. In Chrome, open `chrome://extensions/`.
1. Turn on **Developer mode** in the upper-right corner.
1. Click **Load unpacked** and select the directory of your extension.
1. Click the icon of the extension in the Chrome toolbar.
1. Click **Login with Casdoor**. The Casdoor sign-in page opens. After you sign in, the popup shows your user.

## Refresh the access token

To keep users signed in after the access token expires, exchange the refresh token for a new access token:

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

- [OAuth 2.0](/docs/how-to-connect/oauth)
- [Casdoor SDKs](/docs/how-to-connect/sdk)
- [Chrome identity API](https://developer.chrome.com/docs/extensions/reference/identity/)
