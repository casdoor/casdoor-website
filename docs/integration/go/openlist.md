---
title: OpenList
description: Sign in to OpenList, the file list program forked from AList, with Casdoor through its single sign-on settings, with Casdoor usernames as OpenList usernames.
keywords: [OpenList, AList, SSO, single sign-on, OpenID Connect, OIDC]
authors: [casdoor]
---

[OpenList](https://github.com/OpenListTeam/OpenList) is a file list and WebDAV program that serves many storage services, forked from AList. Its single sign-on (SSO) settings support Casdoor directly. With Casdoor as the SSO platform, users sign in to OpenList with their Casdoor account, and OpenList can create their OpenList user at the first sign-in.

## Create the application in Casdoor

1. In the Casdoor admin console, open the organization of your users and add an application, or open an existing one.

   Don't use the `built-in` organization: all its users are global administrators of Casdoor.

1. Add the callback of OpenList to **Redirect URLs**:

   ```text
   https://openlist.example.com/api/auth/sso_callback
   ```

   OpenList adds `?method=sso_get_token` or `?method=get_sso_id` to it. Casdoor ignores the query when it matches the URL, so one entry covers both.

1. Save, and note the **Client ID** and **Client secret**.

OpenList builds the callback from `site_url` in its `config.json`. Behind a reverse proxy, set `site_url` to the public URL of OpenList, or forward the `X-Forwarded-Proto` and `X-Forwarded-Host` headers. Otherwise the callback URL doesn't match.

## Configure single sign-on in OpenList

1. In OpenList, go to **Settings** > **Single Sign-On**, and fill in the settings:

   | Setting | Value |
   |---|---|
   | **SSO login enabled** | On |
   | **SSO login platform** | `Casdoor` |
   | **SSO client id** | `<your-client-id>` |
   | **SSO client secret** | `<your-client-secret>` |
   | **SSO endpoint name** | `https://door.example.com` |
   | **SSO auto register** | On |
   | **SSO default dir** | `/` |
   | **SSO default permission** | `0` |

   - `<your-client-id>`, `<your-client-secret>`: The values from the Casdoor application.
   - **SSO endpoint name**: The URL of Casdoor.
   - **SSO auto register**: Creates an OpenList user at the first sign-in, with **SSO default dir** as the base path and **SSO default permission** as the permissions. Without it, only users who have connected their account can sign in.

   **SSO organization name**, **SSO application name**, and **SSO jwt public key** have no effect. Leave them empty.

1. Click **Save**.

## How OpenList names the users

With the platform `Casdoor`, OpenList asks Casdoor's UserInfo endpoint for the scope `profile`, links the OpenList user to `sub`, the Casdoor user ID, and names the user after `preferred_username`, the Casdoor username. If an OpenList user with that name already exists, [connect it](#connect-existing-openlist-users) to Casdoor before its first sign-in with Casdoor.

With the platform `OIDC`, OpenList uses the single claim of **SSO oidc username key** from the ID token both as the username and as the link to the Casdoor user:

| Casdoor **Token format** | **SSO oidc username key** |
|---|---|
| `JWT` (default) | `name`, which holds the username in this format |
| `JWT-Standard` | `preferred_username` |

Don't use `sub`: it is the Casdoor user ID, a long random string, which then becomes the OpenList username. Don't use a display name claim either: display names aren't unique, so two Casdoor users could end up as one OpenList user. Because the username is also the link, renaming a user in Casdoor gives them a new OpenList user on this platform; the platform `Casdoor` doesn't have this problem.

## Connect existing OpenList users

An existing OpenList user can connect their account to Casdoor instead of getting a new user:

1. Sign in to OpenList with the password, and open the profile.
1. Click **Connect to Single Sign-On Platform**, and sign in to Casdoor.

OpenList refuses a Casdoor account that is already connected to another OpenList user.

## Verify the result

1. Open the OpenList sign-in page in a private browser window, and click the single sign-on button.
1. Sign in to Casdoor. OpenList signs in the user whose name is the Casdoor username.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| New users get a long random string as their username | The platform is `OIDC` with **SSO oidc username key** set to `sub`. Set the key as described in [How OpenList names the users](#how-openlist-names-the-users), or use the platform `Casdoor`. Rename existing users in OpenList. |
| `cannot get username from SSO provider` | Casdoor returned no `preferred_username`. If the application has a **Token fields** list, add `Name` to it: Casdoor returns only the fields in that list from the UserInfo endpoint. |
| `The single sign on platform is not bound to any users` | **SSO auto register** is off and the user hasn't connected their account. Turn it on, or [connect the user](#connect-existing-openlist-users). |
| Casdoor shows `Redirect URI: ... doesn't exist in the allowed Redirect URI list` | The callback that OpenList built differs from **Redirect URLs**. Set `site_url`, or add the URL from the error. With **SSO compatibility mode** on, OpenList uses `https://openlist.example.com/api/auth/sso_get_token` and `https://openlist.example.com/api/auth/get_sso_id` instead; add both. |
| Sign-in fails with a TLS error | OpenList can't skip TLS verification. Serve Casdoor with a valid certificate. |

## See also

- [Single sign-on](https://doc.oplist.org/guide/advanced/sso) in the OpenList documentation
- [Token overview](/docs/token/overview)
