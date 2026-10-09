---
title: Open WebUI
description: Sign in to Open WebUI with Casdoor over OpenID Connect, and sync Open WebUI groups from Casdoor groups.
keywords: [Open WebUI, OpenWebUI, Ollama, OpenID Connect, OIDC, groups]
authors: [casdoor]
---

[Open WebUI](https://openwebui.com/) is a self-hosted chat interface for local and hosted large language models. It can sign users in through any OpenID Connect (OIDC) provider. With Casdoor as the provider, users sign in with their Casdoor account, and Casdoor groups decide which models, knowledge bases, and tools they see.

## Create the application in Casdoor

1. In the Casdoor admin console, open the organization of your users and add an application, or open an existing one.
1. Add the callback of Open WebUI to **Redirect URLs**:

   ```text
   https://chat.example.com/oauth/oidc/callback
   ```

1. On the **OIDC/OAuth** tab, set **Token group format** to `Name (group)`, so groups arrive as `engineering` instead of `my-org/engineering`.
1. Save, and note the **Client ID** and **Client secret**.

## Configure Open WebUI

1. Set these environment variables on the Open WebUI container:

   ```bash
   WEBUI_URL=https://chat.example.com
   ENABLE_OAUTH_SIGNUP=true
   DEFAULT_USER_ROLE=user
   OAUTH_PROVIDER_NAME=Casdoor
   OAUTH_CLIENT_ID=<your-client-id>
   OAUTH_CLIENT_SECRET=<your-client-secret>
   OPENID_PROVIDER_URL=https://door.example.com/.well-known/openid-configuration
   OAUTH_SCOPES=openid email profile
   ENABLE_OAUTH_GROUP_MANAGEMENT=true
   OAUTH_GROUP_CLAIM=groups
   ```

   - `WEBUI_URL`: The public URL of Open WebUI. The callback is built from it.
   - `DEFAULT_USER_ROLE`: The role of new users. The default, `pending`, makes an administrator approve each one.
   - `OPENID_PROVIDER_URL`: Casdoor's discovery document.
   - `ENABLE_OAUTH_GROUP_MANAGEMENT`: Syncs the user's Open WebUI groups with the `groups` claim at each sign-in.

1. Restart Open WebUI.

## Verify the result

1. Open Open WebUI in a private browser window. The sign-in page shows **Continue with Casdoor**.
1. Click it and sign in to Casdoor. Open WebUI opens with the Casdoor user signed in.
1. As an Open WebUI administrator, open the user list. The new user is in the groups that match their Casdoor groups.

Open WebUI only adds users to groups that already exist in Open WebUI. Create the groups first, or set `ENABLE_OAUTH_GROUP_CREATION=true` to create them at sign-in.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| New users wait for approval | `DEFAULT_USER_ROLE` is `pending`. Set it to `user`, or approve the users in the admin panel. |
| Casdoor shows `Redirect URI: ... doesn't exist in the allowed Redirect URI list` | `WEBUI_URL` differs from the address in **Redirect URLs**. Make them match. |
| The OAuth settings in the admin panel can't be changed | By default, the environment variables are the source of truth for OAuth. Change the variables and restart. |
| An existing local user gets a second account | Set `OAUTH_MERGE_ACCOUNTS_BY_EMAIL=true` to sign them in to the account with the same email. |

## See also

- [SSO](https://docs.openwebui.com/features/authentication-access/auth/sso/) in the Open WebUI documentation
- [SSO troubleshooting](https://docs.openwebui.com/troubleshooting/sso/) in the Open WebUI documentation
