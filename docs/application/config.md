---
title: Application Config
description: Configure your applications authentication
keywords: [config, application]
---

```mdx-code-block
import styles from '../styles.module.css';
import CasdoorCard from "@site/src/components/CasdoorCard"
```

After you deploy your casdoor on your server, and setup your organization, you can deploy your applications now!

Let's see how to config your applications authentication using Casdoor!

:::note

Here, for example, I want to setup my Forum using [Casnode](https://casnode.org)

:::

I create my application and fill some necessary configures.

Select organization I created to make users in this organization can use this application.

![Organization](/img/application/config/organization.png)

While this organization is named ```my_organization```, so I choose it in drop-down menu.

![Select Organization](/img/application/config/selectorganization.png)

Then I want my users can use Casdoor to complete authentication when they are signing up, so I fill the redirect url here as **https://my-site-url.com/callback**

:::caution

So here, we need to remember the `callback URL` in provider application is **Casdoor's callback url**, and the `Redirect URL` in Casdoor is **your website callback url**

#### Further understanding

If I want the authentication progress to work, the detailed progress should be like this:

Users send a request to Casdoor, Casdoor use the `Client ID` and `Client Secret` to get authentication from GitHub, Google or other providers.

If the authentication success, GitHub callback to Casdoor to tell Casdoor authentication success, so the GitHub authorization callback URL should be my Casdoor callback URL which is **http://your-casdoor-url.com/callback**, then Casdoor tells the application authentication success which means the Casdoor callback URL should be my application callback URL, that is **http://your-site-url.com/callback**.

:::

Then you can add which third party apps can sign up by adding providers and setting its properties.

![Select providers](/img/application/config/selectproviders.png)

```mdx-code-block
<div className={styles.signingradientborder}>
  <CasdoorCard src="login/oauth/authorize?client_id=014ae4bd048734ca2dea&response_type=code&redirect_uri=https://forum.casbin.com/callback&scope=read&state=app-casbin-forum" height= "680" />
</div>
```

:::tip

Note that if you don't want users to access your app using a **username/password**, you can switch off the ```Password On``` button, so users can only access app using third party services:

![Password On](/img/application/config/PasswordOn.png)

:::
