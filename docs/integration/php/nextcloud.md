---
title: Nextcloud
description: Sign in to Nextcloud with Casdoor through the OpenID Connect user backend app, with Casdoor usernames as Nextcloud user IDs and Casdoor groups as Nextcloud groups.
keywords: [Nextcloud, user_oidc, OpenID Connect, OIDC, groups]
authors: [casdoor]
---

[Nextcloud](https://nextcloud.com/) signs users in through an OpenID Connect (OIDC) provider with its [OpenID Connect user backend](https://github.com/nextcloud/user_oidc) app (`user_oidc`). With Casdoor as the provider, users sign in to Nextcloud with their Casdoor account, and their Casdoor groups become Nextcloud groups.

## Create the application in Casdoor

1. In the Casdoor admin console, open the organization of your users and add an application, or open an existing one.
1. Add the callback of `user_oidc` to **Redirect URLs**:

   ```text
   https://cloud.example.com/apps/user_oidc/code
   ```

   If your Nextcloud URLs contain `/index.php`, use `https://cloud.example.com/index.php/apps/user_oidc/code` instead.

1. On the **OIDC/OAuth** tab, set **Token group format** to `Name (group)`, so groups arrive as `finance` instead of `my-org/finance`. Keep **Token format** at the default `JWT`: `user_oidc` reads the user's attributes from the ID token, and the default format carries the groups there.
1. Save, and note the **Client ID** and **Client secret**.

## Install the OpenID Connect app

1. Install **OpenID Connect user backend** from the Nextcloud app store, or run this in the Nextcloud directory:

   ```bash
   sudo -u www-data php occ app:install user_oidc
   ```

## Add Casdoor as a provider

1. In the Nextcloud directory, run:

   ```bash
   sudo -u www-data php occ user_oidc:provider Casdoor \
     --clientid="<your-client-id>" \
     --clientsecret="<your-client-secret>" \
     --discoveryuri="https://door.example.com/.well-known/openid-configuration" \
     --scope="openid email profile" \
     --unique-uid=0 \
     --mapping-uid=name \
     --mapping-display-name=displayName \
     --mapping-email=email \
     --mapping-groups=groups \
     --group-provisioning=1
   ```

   - `<your-client-id>`, `<your-client-secret>`: The values from the Casdoor application.
   - `--unique-uid=0`: Uses the mapped user ID as the Nextcloud user ID. Without it, Nextcloud stores a hash of the provider and user ID.
   - `--mapping-uid=name`: In Casdoor's default ID token, `name` is the username and `displayName` is the display name. See [What Casdoor sends](#what-casdoor-sends).
   - `--group-provisioning=1`: Creates Nextcloud groups from the `groups` claim and keeps the user's memberships in sync at each sign-in.

## Verify the result

1. Open Nextcloud in a private browser window. The sign-in page shows **Log in with Casdoor**.
1. Click it and sign in to Casdoor. Nextcloud opens with the Casdoor user signed in.
1. As a Nextcloud administrator, open **Users**. The new user's account name is the Casdoor username, and its groups are the Casdoor groups.

## Make Casdoor the only way to sign in

With one provider configured, you can send everyone straight to Casdoor:

```bash
sudo -u www-data php occ config:app:set --type=string --value=0 user_oidc allow_multiple_user_backends
```

Administrators can still reach the Nextcloud sign-in form by adding `?direct=1` to the sign-in URL.

## What Casdoor sends

`user_oidc` reads these claims from the ID token. With the default `JWT` token format, Casdoor's ID token contains:

| Claim | Value |
|---|---|
| `sub` | Casdoor user ID |
| `name` | Username, for example `alice` |
| `displayName` | Display name, for example `Alice Liu` |
| `email` | Email address |
| `groups` | Groups, formatted by **Token group format** |

If you switch the application to `JWT-Standard`, the ID token uses the standard names instead (`preferred_username` for the username and `name` for the display name) and leaves out `groups`; change the mappings accordingly and turn off group provisioning.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Casdoor shows `Redirect URI: ... doesn't exist in the allowed Redirect URI list` | Add the URL from the error, with or without `/index.php`, to the application's **Redirect URLs**. |
| Nextcloud user IDs are long hashes | The provider was created without `--unique-uid=0`. Run the `user_oidc:provider Casdoor` command again with it. |
| The user's groups don't appear | Check that the user is in a group in Casdoor, that `--group-provisioning=1` is set, and that **Token group format** is what you expect. |
| Sign-in fails with an issuer error | The discovery document's `issuer` differs from the URL Nextcloud reached. Set `origin` in Casdoor's `conf/app.conf` to its public URL. |

## See also

- [OpenID Connect user backend](https://github.com/nextcloud/user_oidc) on GitHub
- [Token overview](/docs/token/overview)
