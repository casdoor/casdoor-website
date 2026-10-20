---
title: Halo
description: Sign in to the Halo blogging platform with Casdoor over OpenID Connect, using the custom SSO provider of the OAuth2 plugin.
keywords: [Halo, OAuth2 plugin, plugin-oauth2, SSO, OpenID Connect, OIDC]
authors: [casdoor]
---

[Halo](https://www.halo.run/) is a self-hosted website and blogging platform. Its [OAuth2 plugin](https://github.com/halo-sigs/plugin-oauth2) adds sign-in with GitHub, GitLab, Gitee, and one custom provider called **SSO**. With Casdoor as the SSO provider, users sign in to Halo with their Casdoor account.

## Create the application in Casdoor

1. In the Casdoor admin console, open the organization of your users and add an application, or open an existing one.
1. Add the callback of the SSO provider to **Redirect URLs**:

   ```text
   https://halo.example.com/login/oauth2/code/sso
   ```

   Use the public URL of Halo, without `/console`. The last part, `sso`, is the fixed ID of the custom provider.

1. On the **OIDC/OAuth** tab, set **Token format** to `JWT-Standard`. Halo then takes the username from `preferred_username` and the display name from `name`. With the default `JWT` format, the ID token's `name` is the username, so it also becomes the display name.
1. Save, and note the **Client ID** and **Client secret**.

## Install the OAuth2 plugin

1. In the Halo console, install **OAuth2 认证** from the app store, or download the JAR from the [releases of plugin-oauth2](https://github.com/halo-sigs/plugin-oauth2/releases) and upload it in plugin management. Use version 1.7.1 or later of the plugin, which needs Halo 2.20.0 or later.
1. Enable the plugin.

## Configure the SSO provider

1. In the Halo console, go to **用户** (Users) and click **身份认证** (Authentication) at the top right. Older versions call the button **认证方式**.
1. Open **SSO** and fill in **自定义单点登录 OAuth 配置**:

   | Field | Value |
   |---|---|
   | **Client ID** | `<your-client-id>` |
   | **Client Secret** | `<your-client-secret>` |
   | **Authorization Url** | `https://door.example.com/login/oauth/authorize` |
   | **Token Url** | `https://door.example.com/api/login/oauth/access_token` |
   | **UserInfo Url** | `https://door.example.com/api/userinfo` |
   | **Scopes** | `openid profile email` |
   | **UserName Attribute** | `sub` |
   | **Issuer URI** | `https://door.example.com` |
   | **JWK Set URI** | `https://door.example.com/.well-known/jwks` |

   - `<your-client-id>`, `<your-client-secret>`: The values from the Casdoor application.
   - **Scopes**: With `openid`, the plugin signs users in with OpenID Connect and verifies the ID token. It then needs **Issuer URI** and **JWK Set URI**.
   - **UserName Attribute**: The claim that links the Halo account to the Casdoor user. `sub` is the Casdoor user ID, which doesn't change when the user is renamed.
   - **Issuer URI**: Must be exactly the `issuer` shown at `https://door.example.com/.well-known/openid-configuration`.

1. Save, and enable the **SSO** provider.

The plugin sends the client secret with HTTP Basic authentication, which Casdoor accepts.

## Let new users sign up

What happens at the first sign-in depends on the Halo version:

- Halo 2.26.0 and later ask the user to bind an existing Halo account or to register a new one. Registering needs **开放注册** (open registration) on and a **默认角色** (default role) set in the user settings of Halo. Halo takes the username from `preferred_username`, in lowercase. If it is shorter than 4 characters or otherwise not a valid Halo username, Halo uses a random `user-` name instead.
- Earlier versions only sign in users who have bound Casdoor to their Halo account. A user signs in to Halo with a password and binds **SSO** in the authentication settings of their profile.

## Verify the result

1. Open `https://halo.example.com/login` in a private browser window. The sign-in page shows a button for the SSO provider.
1. Click it and sign in to Casdoor. Halo signs the user in, or on Halo 2.26.0 and later, asks a new user to bind or register an account.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Halo returns to `/login?oauth2_error` | Halo shows no reason on the page. Look for `Failed to authentication with OAuth2` in the Halo log, which names the cause. |
| The log shows `missing_signature_verifier` | **Scopes** contains `openid`, but **JWK Set URI** is empty. Fill it in. |
| Saving fails with `scope contains invalid characters` | Plugin versions before 1.7.1 accept only one scope. Upgrade the plugin. |
| Casdoor shows `Redirect URI: ... doesn't exist in the allowed Redirect URI list` | Halo builds the callback from `halo.external-url`. Set it to the public URL of Halo, and add the URL from the error to **Redirect URLs**. |
| Sign-in fails with an issuer error | **Issuer URI** differs from the `issuer` in Casdoor's discovery document. Set `origin` in Casdoor's `conf/app.conf` to its public URL and use the same value. |
| A new user sees that registration is closed | Turn on **开放注册** and set **默认角色** in Halo, or have the user bind an existing account. |

## See also

- [plugin-oauth2](https://github.com/halo-sigs/plugin-oauth2) on GitHub
- [Users](https://docs.halo.run/guide/use/users) in the Halo documentation
- [Token overview](/docs/token/overview)
