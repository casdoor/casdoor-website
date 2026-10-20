---
title: Kanboard
description: Sign in to Kanboard with Casdoor over OAuth 2.0, using the OAuth2 plugin of Kanboard.
keywords: [Kanboard, OAuth2 plugin, plugin-oauth2, OAuth 2.0]
authors: [casdoor]
---

[Kanboard](https://kanboard.org/) is a self-hosted project management tool that uses Kanban boards. Its [OAuth2 plugin](https://github.com/kanboard/plugin-oauth2) signs users in through a generic OAuth 2.0 provider. With Casdoor as the provider, users sign in to Kanboard with their Casdoor account.

## Install the OAuth2 plugin

1. Install the plugin in one of these ways:
   - In Kanboard, open **Settings** > **Plugins** > **Plugin Directory** and install **OAuth2**. The web installer needs `PLUGIN_INSTALLER` set to `true` in `config.php`, a `plugins` directory that the web server can write to, and the PHP Zip extension.
   - Download the plugin and extract it to `plugins/OAuth2` in the Kanboard directory. The directory name is case-sensitive.
1. Make sure that **Settings** > **Application settings** > **Application URL** is the public URL of Kanboard, for example `https://kanboard.example.com/`. The plugin builds its callback URL from it.

## Create the application in Casdoor

1. In Kanboard, go to **Settings** > **Integrations** > **OAuth2 Authentication**, and copy the **Callback URL**. With URL rewriting, it is:

   ```text
   https://kanboard.example.com/oauth/callback
   ```

   Without URL rewriting, it is `https://kanboard.example.com/?controller=OAuthController&action=handler&plugin=OAuth2`.

1. In the Casdoor admin console, open the organization of your users and add an application, or open an existing one.
1. Add the callback URL to **Redirect URLs**.
1. Save, and note the **Client ID** and **Client secret**.

## Configure the OAuth2 plugin

1. In Kanboard, go to **Settings** > **Integrations** > **OAuth2 Authentication**, and fill in the fields:

   | Field | Value |
   |---|---|
   | **Client ID** | `<your-client-id>` |
   | **Client Secret** | `<your-client-secret>` |
   | **Authorize URL** | `https://door.example.com/login/oauth/authorize` |
   | **Token URL** | `https://door.example.com/api/login/oauth/access_token` |
   | **User API URL** | `https://door.example.com/api/userinfo` |
   | **Scopes** | `openid profile email` |
   | **Username Key** | `preferred_username` |
   | **Name Key** | `name` |
   | **Email Key** | `email` |
   | **User ID Key** | `sub` |
   | **Allow Account Creation** | On |

   - `<your-client-id>`, `<your-client-secret>`: The values from the Casdoor application.
   - **User API URL**: The UserInfo endpoint of Casdoor. It returns `sub` (the Casdoor user ID), `preferred_username` (the username), and `name` (the display name) for the `profile` scope, and `email` for the `email` scope.
   - **User ID Key**: Kanboard links the Kanboard user to this value. `sub` doesn't change when the user is renamed in Casdoor.
   - **Allow Account Creation**: Creates a Kanboard user at the first sign-in. Without it, only users who have linked their account can sign in.

1. Click **Save**.

## Sync Casdoor groups

The UserInfo endpoint also returns the user's groups in `groups`. To create Kanboard groups from them:

1. In the Casdoor application, on the **OIDC/OAuth** tab, set **Token group format** to `Name (group)`, so groups arrive as `developers` instead of `my-org/developers`.
1. In the plugin settings, set **Groups Key** to `groups`. To use only some groups, list them in **Group Filter**, separated by commas.

## Link existing Kanboard users

Kanboard finds a returning user by the stored **User ID Key** value, not by username or email. An existing Kanboard user with the same username as the Casdoor user can't sign in with Casdoor until the accounts are linked:

- The user signs in to Kanboard with their password, opens the external accounts of their profile, and clicks **Link OAuth2 account**.
- Or an administrator enters the Casdoor user ID, the `sub` value, in the **OAuth2 ID** field of the user's authentication settings.

## Verify the result

1. Open Kanboard in a private browser window. The sign-in page shows **OAuth2 login**.
1. Click it and sign in to Casdoor. Kanboard opens with the Casdoor user signed in.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Kanboard shows `External authentication failed` | The user isn't linked yet and **Allow Account Creation** is off, or a Kanboard user with the same username exists. Turn on account creation, or [link the user](#link-existing-kanboard-users). |
| Casdoor shows `Redirect URI: ... doesn't exist in the allowed Redirect URI list` | **Application URL** in Kanboard is wrong, often still `http://localhost/`. Fix it, and add the **Callback URL** of the plugin to **Redirect URLs**. |
| The username, name, or email of new users is empty | **Scopes** lacks `profile` or `email`, or the application's **Token fields** list leaves the fields out. Casdoor returns only the fields in that list from the UserInfo endpoint. |
| You use `https://door.example.com/api/get-account` as **User API URL** | That endpoint returns the user inside `data`. Use the UserInfo endpoint instead, as shown above. |

## See also

- [plugin-oauth2](https://github.com/kanboard/plugin-oauth2) on GitHub
- [OAuth 2.0](/docs/how-to-connect/oauth)
