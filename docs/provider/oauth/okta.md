---
title: Okta OAuth
description: Add Okta as an OIDC/OAuth provider.
keywords: [Okta, OAuth, OIDC]
authors: [greenhandatsjtu]
---

1. Sign up at [Okta Developer](https://developer.okta.com/signup/).
2. **Applications** → **Applications** → **Create App Integration**. Choose **OIDC - OpenID Connect**, **Web Application**, then **Next**.
3. Set **Sign-in redirect URIs** to your Casdoor callback URL (e.g. `https://door.casdoor.com/callback`). In **Assignments** set **Controlled access**, then **Save**.
4. Copy **Client ID**, **Client secret**, and **Okta domain** from the app.

![Create an app integration](/img/providers/OAuth/oktacreateapp.png)
![Enter redirect URL](/img/providers/OAuth/oktasetredirecturl.png)
![Okta OIDC settings](/img/providers/OAuth/oktasettings.png)

In Casdoor add an **OAuth** provider, set **Type** to **Okta**, and enter **Client ID**, **Client secret**, and **Domain**. **Domain** must include the auth server path: use `https://<okta-domain>/oauth2/default` (not just the Okta domain). See [Okta authorization servers](https://developer.okta.com/docs/concepts/auth-servers/).

![Add Okta in Casdoor](/img/providers/OAuth/oktacasdoor.png)
