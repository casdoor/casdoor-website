---
title: Application configuration
description: Configure authentication and callback URLs for your Casdoor applications.
keywords: [config, application, redirect URL, callback]
authors: [ErikQQY]
---

```mdx-code-block
import styles from '../styles.module.css';
import CasdoorCard from "@site/src/components/CasdoorCard"
```

After deploying Casdoor and creating an organization, configure applications and their authentication settings.

This page explains how to configure application authentication using Casdoor.

:::note

**Example:** Configuring a forum application using [Casnode](https://casnode.org).

:::

Create an application and fill in the required configuration.

Select the organization you created so that users in that organization can access this application.

![Organization](/img/application/config/organization.png)

If your organization is named `my_organization`, select it from the drop-down menu.

![Select Organization](/img/application/config/selectorganization.png)

To allow users to authenticate via Casdoor when they sign up, set the **Redirect URL** to your application’s callback URL (e.g. **`https://your-site-url.com/callback`**).

:::caution

**Callback URL vs Redirect URL**

- The **callback URL** configured in the provider (e.g. GitHub, Google) must be Casdoor’s callback URL: **`http://your-casdoor-url.com/callback`**.
- The **Redirect URL** configured in Casdoor must be your application’s callback URL: **`http://your-site-url.com/callback`**.

:::

#### How the flow works

1. The user initiates sign-in and is sent to Casdoor.
2. Casdoor uses the application’s **Client ID** and **Client Secret** to authenticate with the provider (e.g. GitHub, Google).
3. After successful authentication, the provider redirects back to Casdoor. The provider’s **callback URL** must be Casdoor’s callback: **`http://your-casdoor-url.com/callback`**.
4. Casdoor then redirects to your application with the auth result. Casdoor’s **Redirect URL** must be your app’s callback: **`http://your-site-url.com/callback`**.

```mdx-code-block
<div className={styles.signingradientborder}>
  <CasdoorCard src="https://door.casdoor.com/login/oauth/authorize?client_id=014ae4bd048734ca2dea&response_type=code&redirect_uri=https://forum.casbin.com/callback&scope=read&state=app-casbin-forum" height= "680" />
</div>
```

## Verification Code Settings

Use **Code resend timeout** to control how long users must wait before requesting another verification code (email or SMS). The value is in seconds (default: 60) and sets the countdown shown on the login page. Set to `0` to use the global default.

:::tip

For finer control over sign-in methods (e.g. disabling or enabling specific methods), see **[Sign-in methods](./signin-methods.md)**.

:::
