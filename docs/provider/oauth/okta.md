---
title: Okta
description: Add Okta OAuth provider to your application
keywords: [Okta, OAuth]
authors: [greenhandatsjtu]
---

To set up the Okta OIDC provider, first visit [Okta Developer](https://developer.okta.com/signup/) and sign up to get a developer account.

Navigate to the **Applications > Applications** tab, click **Create App Integration**, select a **Sign-in method** of **OIDC - OpenID Connect**, and choose an **Application type** of **Web Application**, then click **Next**.

![Create an app integration](/img/providers/OAuth/oktacreateapp.png)

Enter the **Sign-in redirect URIs**, such as `https://door.casdoor.com/callback`.

![Enter redirect URL](/img/providers/OAuth/oktasetredirecturl.png)

In the **Assignments** section, define the type of **Controlled access** for your app and then click **Save** to create the app integration.

Now you will have the `Client ID`, `Client secret`, and `Okta domain`.

![Okta OIDC settings](/img/providers/OAuth/oktasettings.png)

Add an Okta OAuth provider in the Casdoor dashboard by entering your `Client ID`, `Client secret`, and `Domain`.

![Add Okta in Casdoor](/img/providers/OAuth/oktacasdoor.png)

:::info Set domain correctly

Note that the `Domain` is not just the `Okta domain`; `/oauth2/default` should be appended to it.

Visit [Okta docs on authorization servers](https://developer.okta.com/docs/concepts/auth-servers/) to get more details.

:::

Now you can use Okta as a third-party service to complete authentication.
