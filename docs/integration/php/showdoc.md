---
title: Using Casdoor as an OAuth2 Server in ShowDoc
description: Using Casdoor as an OAuth2 server in ShowDoc
keywords: [ShowDoc, Casdoor, OAuth2, authentication]
authors: [leo220yuyaodog]
---

## Using Casdoor for Authentication in ShowDoc

[ShowDoc](https://www.showdoc.com.cn/) is an online API documentation and technical documentation tool that is perfect for IT teams. ShowDoc makes it easy to use Markdown syntax to write beautiful API documents, data dictionary documents, technical documents, online Excel documents, and more.

ShowDoc supports 3rd-party authentication, including OAuth2. Here is a tutorial for achieving this.

### Step 1: Create a Casdoor Application

Go to your Casdoor and add a new application called **ShowDoc**. Here is an example of creating the ShowDoc application in Casdoor.

![create_application.png](/img/integration/php/showdoc/create_application.png)

Please remember the `client ID` and `client Secret` for the next step.

:::info

Please don't fill in the **callback URL** in this step. The URL depends on the configurations on ShowDoc in the next step. We will come back to set a correct callback URL later.

:::

### Step 2: Configure ShowDoc

First, enable the OAuth2 login button. Then, fill in the `callback URL` as shown in the example. Fill in the `client ID` and `client secret` that were remembered in the previous step.

![showdoc_oauth2.png](/img/integration/php/showdoc/showdoc_oauth2.png)

`Authorize path`, `AccessToken path`, and `User info path` are required. You can fill them in as shown below.

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

Congratulations! You have completed all the steps. Press the **'Casdoor SSO'** button, and you will be redirected to the Casdoor login page.
