---
title: NetBird
description: Sign in to a self-hosted NetBird server, in the dashboard and in the NetBird client, with Casdoor over OpenID Connect.
keywords: [NetBird, VPN, WireGuard, OpenID Connect, OIDC, device authorization, PKCE]
authors: [casdoor]
---

[NetBird](https://netbird.io/) is a WireGuard-based overlay network. A self-hosted NetBird server signs users in to its dashboard and to its client apps through OpenID Connect (OIDC). With Casdoor as the identity provider, users sign in to NetBird with their Casdoor account.

## How NetBird uses Casdoor

Since version 0.62, the NetBird server has a built-in login service, and you add Casdoor to it as a **Generic OIDC** identity provider. The dashboard and the NetBird client sign in at this built-in service, which sends the user on to Casdoor:

- The client on a computer with a browser uses the authorization code flow with PKCE. The client on a Linux server without a desktop uses the device authorization flow and shows a URL and a code.
- Both flows run between the client and the NetBird server. Casdoor sees only the sign-in of the NetBird server, so the Casdoor application needs one redirect URL, a client secret, and no device grant.

If your NetBird server was set up with `setup.env` and uses Casdoor in place of the built-in login, see [Use Casdoor without the built-in login](#use-casdoor-without-the-built-in-login).

## Create the application in Casdoor

1. In the Casdoor admin console, open the organization of your users and add an application, or open an existing one.
1. Add the callback of NetBird to **Redirect URLs**:

   ```text
   https://netbird.example.com/oauth2/callback
   ```

1. Keep **Token format** at the default `JWT`. NetBird reads the user from the ID token, without asking the UserInfo endpoint, and the default format carries `email`, `name` (the username), and `groups` there.
1. Save, and note the **Client ID** and **Client secret**.

## Add Casdoor to NetBird

1. In the NetBird dashboard, go to **Settings** > **Identity Providers** and click **Add Identity Provider**.
1. Fill in the provider:

   | Field | Value |
   |---|---|
   | **Provider Type** | `Generic OIDC` |
   | **Name** | `Casdoor` |
   | **Issuer URL** | `https://door.example.com` |
   | **Client ID** | `<your-client-id>` |
   | **Client Secret** | `<your-client-secret>` |

   - **Issuer URL**: The URL of Casdoor. It must be exactly the `issuer` shown at `https://door.example.com/.well-known/openid-configuration`.
   - `<your-client-id>`, `<your-client-secret>`: The values from the Casdoor application.

1. Check that the **Redirect / Callback** URL in the dialog is the one you added to **Redirect URLs** in Casdoor, and click **Add Provider**.

## Sync Casdoor groups

1. In the Casdoor application, on the **OIDC/OAuth** tab, set **Token group format** to `Name (group)`, so groups arrive as `developers` instead of `my-org/developers`.
1. In the NetBird dashboard, go to **Settings** > **Groups**, turn on **JWT group sync**, and set **JWT claim** to `groups`.

NetBird adds and removes the user's group memberships at each sign-in.

## Verify the result

1. Open the NetBird dashboard in a private browser window. The sign-in page shows a button for Casdoor.
1. Click it and sign in to Casdoor. The dashboard opens with the Casdoor user signed in.
1. Connect a device with the NetBird client. The client opens the same sign-in in a browser, or on a server without a desktop, prints a URL and a code to open on another device.

## Use Casdoor without the built-in login

In the older setup, `configure.sh` reads `setup.env` and configures the dashboard and the client to talk to Casdoor directly. Casdoor then serves the PKCE flow and the device authorization flow of the client itself.

1. In the Casdoor application, add these URLs to **Redirect URLs**:

   ```text
   https://netbird.example.com/nb-auth
   https://netbird.example.com/nb-silent-auth
   http://localhost:53000
   ```

   The last one is the PKCE callback of the NetBird client. A `localhost` entry in Casdoor matches the same URL on any port.

1. On the **OIDC/OAuth** tab, turn on **Authorization Code**, **Refresh Token**, and **Device Code** in **Grant types**.
1. In **Signin methods**, add **Device login**. Casdoor refuses device authorization requests for applications without it.
1. In `setup.env`, set:

   ```bash
   NETBIRD_AUTH_OIDC_CONFIGURATION_ENDPOINT="https://door.example.com/.well-known/openid-configuration"
   NETBIRD_AUTH_CLIENT_ID="<your-client-id>"
   NETBIRD_AUTH_AUDIENCE="<your-client-id>"
   NETBIRD_AUTH_SUPPORTED_SCOPES="openid profile email offline_access"
   NETBIRD_AUTH_REDIRECT_URI="/nb-auth"
   NETBIRD_AUTH_SILENT_REDIRECT_URI="/nb-silent-auth"
   NETBIRD_AUTH_DEVICE_AUTH_CLIENT_ID="<your-client-id>"
   NETBIRD_USE_AUTH0="false"
   NETBIRD_MGMT_IDP="none"
   ```

   - `NETBIRD_AUTH_AUDIENCE`: Casdoor puts the client ID in the `aud` claim of its tokens, and both the NetBird server and the client reject tokens for another audience.
   - `NETBIRD_AUTH_DEVICE_AUTH_CLIENT_ID`: Turns on the device authorization flow, which the client on a Linux server without a desktop uses exclusively.
   - `NETBIRD_MGMT_IDP`: NetBird has no user management integration for Casdoor.

   The dashboard and the client are public clients here: they use PKCE and send no client secret, which Casdoor accepts.

1. Run `./configure.sh` and restart the NetBird containers.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Casdoor shows `Redirect URI: ... doesn't exist in the allowed Redirect URI list` | Add the URL from the error to **Redirect URLs**. With the built-in login, it is the **Redirect / Callback** URL from the NetBird dialog. |
| Sign-in fails with an issuer or discovery error | **Issuer URL** differs from the `issuer` in Casdoor's discovery document. Set `origin` in Casdoor's `conf/app.conf` to its public URL and use the same value. |
| The dashboard works, but the client never connects and shows no error | In the setup without the built-in login: on a Linux server without a desktop, the client uses only the device authorization flow. Turn on **Device Code** and add **Device login** to **Signin methods** in Casdoor, and set `NETBIRD_AUTH_DEVICE_AUTH_CLIENT_ID`. Also check that `NETBIRD_AUTH_AUDIENCE` is the client ID. |
| The device authorization request fails with `device login is not enabled for this application` | Add **Device login** to the **Signin methods** of the application. |
| Groups don't appear in NetBird | Check that **JWT group sync** is on with the claim `groups`, that the user is in a group in Casdoor, and that **Token format** is `JWT`. |

## See also

- [Identity providers](https://docs.netbird.io/selfhosted/identity-providers) in the NetBird documentation
- [Device grant](/docs/how-to-connect/oauth#device-grant)
- [Token overview](/docs/token/overview)
