---
title: Vaultwarden
description: Sign in to Vaultwarden with Casdoor over OpenID Connect, using the SSO support built into Vaultwarden 1.35.0 and later.
keywords: [Vaultwarden, Bitwarden, SSO, OpenID Connect, OIDC]
authors: [casdoor]
---

[Vaultwarden](https://github.com/dani-garcia/vaultwarden) is a self-hosted server compatible with the Bitwarden clients. Since version 1.35.0 it can sign users in through an OpenID Connect (OIDC) provider. With Casdoor as the provider, users sign in to the password manager with their Casdoor account, then unlock their vault with their master password.

## Create the application in Casdoor

1. In the Casdoor admin console, open the organization of your users and add an application, or open an existing one.
1. Add the callback of Vaultwarden to **Redirect URLs**:

   ```text
   https://vault.example.com/identity/connect/oidc-signin
   ```

1. Save, and note the **Client ID** and **Client secret**.

## Configure Vaultwarden

1. Set these environment variables on Vaultwarden 1.35.0 or later, for example in Docker Compose:

   ```yaml
   services:
     vaultwarden:
       image: vaultwarden/server:latest
       environment:
         DOMAIN: "https://vault.example.com"
         SSO_ENABLED: "true"
         SSO_AUTHORITY: "https://door.example.com"
         SSO_CLIENT_ID: "<your-client-id>"
         SSO_CLIENT_SECRET: "<your-client-secret>"
         SSO_SCOPES: "email profile"
         SSO_PKCE: "true"
   ```

   - `DOMAIN`: The public URL of Vaultwarden. Vaultwarden builds the redirect URI from it.
   - `SSO_AUTHORITY`: The URL of Casdoor, without a trailing slash. It must be exactly the `issuer` shown at `https://door.example.com/.well-known/openid-configuration`.
   - `<your-client-id>`, `<your-client-secret>`: The values from the Casdoor application.

1. Restart Vaultwarden.

## Verify the result

1. Open Vaultwarden and choose single sign-on on the sign-in page.
1. Sign in to Casdoor. Vaultwarden returns and asks for the master password, or asks a new user to create one.

When everyone has switched, set `SSO_ONLY: "true"` to turn off sign-in with email and master password.

## Email verification

Vaultwarden refuses to create an account when the ID token says the email is not verified. With the default `JWT` token format, Casdoor sends `email_verified: false` for users who never confirmed their email with a code or a magic link, which is common for users that an administrator created.

To let those users in, do one of these:

- Have the users verify their email in Casdoor.
- Set the application's **Token format** to `JWT-Standard`, which leaves `email_verified` out when it is false, and set `SSO_ALLOW_UNKNOWN_EMAIL_VERIFICATION: "true"` in Vaultwarden. The Vaultwarden documentation recommends `SSO_SIGNUPS_MATCH_EMAIL: "false"` together with it, so that an unverified email can't take over an existing account.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| The sign-in page has no single sign-on option | The server runs a version older than 1.35.0, or `SSO_ENABLED` is not `true`. Upgrade or fix the variable, then restart. |
| Sign-in fails with an issuer or discovery error | `SSO_AUTHORITY` differs from the `issuer` in Casdoor's discovery document. Set `origin` in Casdoor's `conf/app.conf` to its public URL and use the same value. |
| Casdoor shows `Redirect URI: ... doesn't exist in the allowed Redirect URI list` | `DOMAIN` differs from the address in **Redirect URLs**. Make them match, including the scheme. |
| A new user can't sign up after signing in to Casdoor | The user's email is not verified. See [Email verification](#email-verification). |

## See also

- [Enabling SSO support using OpenId Connect](https://github.com/dani-garcia/vaultwarden/wiki/Enabling-SSO-support-using-OpenId-Connect) in the Vaultwarden wiki
- [Token overview](/docs/token/overview)
