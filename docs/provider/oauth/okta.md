---
title: Add Okta as an OAuth provider
sidebar_label: Okta
description: Let users sign in to Casdoor with their Okta account through OpenID Connect.
keywords: [Okta, OAuth, OIDC]
authors: [greenhandatsjtu]
---

This guide explains how to let users sign in to Casdoor with their Okta account.

---

#### Learning outcomes

- Create an OpenID Connect (OIDC) app integration in Okta.
- Add Okta as an OAuth provider in Casdoor.

#### What you need

- An Okta organization. To try it, sign up at [Okta Developer](https://developer.okta.com/signup/).
- Administrator access to the Casdoor admin console

---

## Create an app integration in Okta

1. In the Okta admin console, go to **Applications** > **Applications** and click **Create App Integration**.
1. Select **OIDC - OpenID Connect** and **Web Application**, and click **Next**.

   ![Create a new app integration in Okta](/img/providers/OAuth/oktacreateapp.png)

1. Set **Sign-in redirect URIs** to the callback URL of Casdoor, for example `https://door.casdoor.com/callback`.

   ![Sign-in redirect URIs of the app](/img/providers/OAuth/oktasetredirecturl.png)

1. Under **Assignments**, select **Controlled access**, and click **Save**.
1. Copy the **Client ID**, the **Client secret**, and the **Okta domain**.

   ![Client credentials and Okta domain](/img/providers/OAuth/oktasettings.png)

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `Okta`.
1. Enter the **Client ID** and the **Client secret**.
1. Set **Domain** to the URL of the authorization server, `https://<okta-domain>/oauth2/default`, not the Okta domain alone. See [Authorization servers](https://developer.okta.com/docs/concepts/auth-servers/) in the Okta documentation.

   ![Okta provider in Casdoor](/img/providers/OAuth/oktacasdoor.png)

1. Save the provider.

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
- [Map OAuth claims to user fields](/docs/provider/oauth/user-mapping)
- [Okta syncer](/docs/syncer/Okta)
