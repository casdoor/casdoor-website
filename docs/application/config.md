---
title: Application Config
description: Configure your application's authentication
keywords: [config, application]
authors: [ErikQQY]
---

```mdx-code-block
import styles from '../styles.module.css';
import CasdoorCard from "@site/src/components/CasdoorCard"
```

After you deploy Casdoor on your server and set up your organization, you can now deploy your applications!

Let's see how to configure your application's authentication using Casdoor!

:::note

For example, I want to set up my Forum using [Casnode](https://casnode.org).

:::

I create my application and fill in some necessary configurations.

Select the organization I created so that users in this organization can use this application.

![Organization](/img/application/config/organization.png)

Since this organization is named `my_organization`, I choose it from the drop-down menu.

![Select Organization](/img/application/config/selectorganization.png)

Next, I want my users to be able to use Casdoor for authentication when they sign up. So, I fill in the redirect URL here as **<https://your-site-url.com/callback>**.

:::caution

Please note that the `callback URL` in the provider application should be Casdoor's callback URL, and the `Redirect URL` in Casdoor should be your website's callback URL.

#### Further Understanding

To make the authentication process work, the detailed steps are as follows:

1. Users send a request to Casdoor.
2. Casdoor uses the `Client ID` and `Client Secret` to authenticate with GitHub, Google, or other providers.
3. If the authentication is successful, GitHub calls back to Casdoor to notify Casdoor about the successful authentication. Therefore, the GitHub authorization callback URL should be your Casdoor's callback URL, which is **<http://your-casdoor-url.com/callback>**.
4. Casdoor then informs the application about the authentication success. This means that the Casdoor callback URL should be your application's callback URL, which is **<http://your-site-url.com/callback>**.

:::

You can also add third-party apps for sign up by adding providers and setting their properties.

![Select providers](/img/application/config/selectproviders.png)

```mdx-code-block
<div className={styles.signingradientborder}>
  <CasdoorCard src="https://door.casdoor.com/login/oauth/authorize?client_id=014ae4bd048734ca2dea&response_type=code&redirect_uri=https://forum.casbin.com/callback&scope=read&state=app-casbin-forum" height= "680" />
</div>
```

:::tip

Note that if you don't want users to access your app using a **username/password**, you can switch off the `Password On` button. This way, users can only access the app using third-party services.

![Password On](/img/application/config/PasswordOn.png)

:::
