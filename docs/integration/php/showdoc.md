---
title: Using Casdoor as an OAuth2 Server in ShowDoc
description: Using Casdoor as an OAuth2 server in ShowDoc
keywords: [ShowDoc, Casdoor, OAuth2, authentication]
authors: [leo220yuyaodog]
---

[ShowDoc](https://www.showdoc.com.cn/) is an API and technical documentation platform with Markdown support. It supports OAuth2 for sign-in. This guide configures Casdoor as the OAuth2 server.

### Step 1: Create a Casdoor application

In Casdoor, add an application (e.g. **ShowDoc**). Note **Client ID** and **Client secret**. Leave the callback URL empty for now; set it after configuring ShowDoc (step 3).

![create_application.png](/img/integration/php/showdoc/create_application.png)

### Step 2: Configure ShowDoc

Enable OAuth2 login in ShowDoc. Set the **callback URL** (as shown in the example), **client ID**, and **client secret** from step 1.

![showdoc_oauth2.png](/img/integration/php/showdoc/showdoc_oauth2.png)

**Authorize path**, **AccessToken path**, and **User info path** are required. Use:

```ini
Authorize path:   /login/oauth/authorize
AccessToken path:   /api/login/oauth/access_token
User info path:   /api/get-account
```

### Step 3: Configure the Callback URL in Casdoor

Go back to the application edit page in step 1 and add the `callback URL` that you filled in ShowDoc.

![showdoc_callbackurl.png](/img/integration/php/showdoc/showdoc_callbackurl.png)

### Step 4: Have a Try on ShowDoc

You should see the following on the login page:

![showdoc_login.png](/img/integration/php/showdoc/showdoc_login.png)

When setup is complete, click **Casdoor SSO** to sign in via Casdoor.
