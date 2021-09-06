---
sidebar_position: 2
title: Application Config
---

```mdx-code-block
import styles from '../styles.module.css';
```

After you deploy your casdoor on your server, and setup your organization, you can deploy your applications now!

Let's see how to config your applications authentication using Casdoor!

:::note

Here, for example, I want to setup my Forum using [Casnode](https://casnode.org)

:::

I create my application and fill some necessary configures.

Select organization I created to make users in this organization can use this application.

![Organization](/img/organization.png)

While this organization is named ```my_organization```, so I choose it in drop-down menu.

![Select Organization](/img/selectorganization.png)

Then I want my users can use Casdoor to complete authentication when they are signing up, so I fill the redirect url here as **https://my-site-url.com/callback**

:::caution

So here, we need to remember the `callback URL` in provider application is **Casdoor's callback url**, and the `Redirect URL` in Casdoor is **your website callback url**

#### Further understanding

If I want the authentication progress working, the detailed progress should be like this:

Users send request to Casdoor, Casdoor use the `Client ID` and `Client Secret` to get authentication from GitHub, Google or other providers.

If the authentication success, GitHub callback to Casdoor to tell Casdoor authentication success, so the GitHub authorization callback URL should be my Casdoor callback URL which is **http://your-casdoor-url.com/callback**, then Casdoor tell the application authentication success which means the Casdoor callback URL should be my application callback URL, that is **http://your-site-url.com/callback**.

:::

Then you can add which third party app can sign up by adding providers and set its properties.

![Select providers](/img/selectproviders.png)

```mdx-code-block
<div className={styles.signingradientborder}>
<iframe src="https://door.casbin.com/login/oauth/authorize?client_id=014ae4bd048734ca2dea&response_type=code&redirect_uri=https://forum.casbin.com/callback&scope=read&state=app-casbin-forum" width="600" height= "680" frameborder="0" scrolling="no"></iframe>
</div>
```