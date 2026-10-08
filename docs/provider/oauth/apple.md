---
title: Add Sign in with Apple
sidebar_label: Apple
description: Let users sign in to Casdoor with their Apple ID through Sign in with Apple.
keywords: [Apple, OAuth, Sign in with Apple]
authors: [People257]
---

This guide explains how to let users sign in to Casdoor with their Apple ID.

---

#### Learning outcomes

- Configure an App ID, a Services ID, and a key at Apple.
- Add Apple as an OAuth provider in Casdoor.

#### What you need

- An [Apple Developer](https://developer.apple.com/account) account with a membership of the Apple Developer Program
- Administrator access to the Casdoor admin console

---

## Configure Apple

1. Create an App ID, or open an existing one, and turn on **Sign in with Apple** for it.

   ![Sign in with Apple capability of the App ID](/img/providers/OAuth/appledashboard.png)

1. Create an identifier of the type **Services IDs**. Its identifier becomes the **Client ID** in Casdoor.

   ![Services ID registration](/img/providers/OAuth/appleregisterserviceid.png)

1. Open the Services ID, turn on **Sign in with Apple**, and click **Configure**.

   ![Services ID configuration](/img/providers/OAuth/appleeditserviceconfig.png)

1. In **Return URLs**, enter the redirect URL that the Apple provider page in Casdoor shows, for example `https://your-casdoor-domain.com/callback`. The two values must match exactly.

   ![Return URLs of the Services ID](/img/providers/OAuth/applecallbackconfig.png)

1. Create a key, turn on **Sign in with Apple** for it, and associate it with your App ID.

   ![Key configuration](/img/providers/OAuth/applekeyconfig.png)

1. Register the key. Note the **Key ID** and download the `.p8` file at once. Apple lets you download the file only once, so store it securely.

   ![Key ID and download of the key file](/img/providers/OAuth/applegetkeyid.png)

1. On the **Membership** page of the Apple Developer portal, note your **Team ID**.

## Add the provider in Casdoor {#step-5-add-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `Apple`.
1. Fill in the fields:

   | Field | Value |
   |---|---|
   | **Client ID** | The identifier of the Services ID |
   | Team ID | Your Apple Team ID |
   | Key ID | The ID of the key |
   | Key text | The complete content of the `.p8` file, including the `-----BEGIN` and `-----END` lines |

1. Check that the redirect URL that Casdoor shows is in the **Return URLs** of the Services ID.

   ![Apple provider in Casdoor](/img/providers/OAuth/appleconfigcasdoor.png)

1. Save the provider.

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
