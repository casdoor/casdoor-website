---
title: Immich
description: Sign in to Immich, in the browser and in the mobile apps, with Casdoor over OAuth and OpenID Connect.
keywords: [Immich, OAuth, OpenID Connect, OIDC, photos]
authors: [casdoor]
---

[Immich](https://immich.app/) is a self-hosted photo and video library. It supports OAuth sign-in with any OpenID Connect (OIDC) provider, in the web app and in its iOS and Android apps. With Casdoor as the provider, users sign in to Immich with their Casdoor account.

## Create the application in Casdoor

1. In the Casdoor admin console, open the organization of your users and add an application, or open an existing one.
1. Add the Immich callbacks to **Redirect URLs**:

   ```text
   https://photos.example.com/auth/login
   https://photos.example.com/user-settings
   app.immich:///oauth-callback
   ```

   Add the first two for every address you open Immich at. The last one is for the mobile apps.

1. Save, and note the **Client ID** and **Client secret**.

## Configure OAuth in Immich

1. In Immich, go to **Administration** > **Settings** > **OAuth** and enable OAuth.
1. Fill in the settings:

   | Setting | Value |
   |---|---|
   | **Issuer URL** | `https://door.example.com` |
   | **Client ID** | `<your-client-id>` |
   | **Client Secret** | `<your-client-secret>` |
   | **Scope** | `openid email profile` |
   | **Storage Label Claim** | `preferred_username` |
   | **Button Text** | `Login with Casdoor` |
   | **Auto Register** | On |

   - **Issuer URL**: The URL of Casdoor. Immich finds the rest through Casdoor's discovery document.
   - **Storage Label Claim**: Names each user's upload folder after their Casdoor username.

1. Click **Save**.

## Verify the result

1. Open Immich in a private browser window. The sign-in page shows **Login with Casdoor**.
1. Click it and sign in to Casdoor. Immich opens with the Casdoor user signed in.
1. In the Immich mobile app, enter the server URL. The app shows the same button.

Users who already have an Immich account can link it to Casdoor under **Account Settings** > **OAuth**.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Casdoor shows `Redirect URI: ... doesn't exist in the allowed Redirect URI list` | Add the URL from the error to **Redirect URLs**. Immich needs one for every address it is opened at. |
| Sign-in works in the browser but not in the mobile app | Add `app.immich:///oauth-callback` to **Redirect URLs**. |
| A new user is not created | Check that **Auto Register** is on and that the Casdoor user has an email address. |

## See also

- [OAuth authentication](https://docs.immich.app/administration/oauth) in the Immich documentation
