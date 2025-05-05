---
title: Apple
description: Add the Apple Sign in OAuth provider to your application.
keywords: [Apple, OAuth, Sign in with Apple]
authors: [People257]
---

To set up the Apple Sign in provider, please go to the [Apple Developer](https://developer.apple.com/account) website. An active **Apple Developer Program membership** is required.

### Step 1: Configure App ID

Create a new App ID or configure an existing one, and ensure **Sign in with Apple** is enabled for it.

![Enable Sign in with Apple for App ID](/img/providers/OAuth/appledashboard.png)

### Step 2: Create a Services ID

Next, create a new identifier, making sure to select the **Services IDs** type. (The `Identifier` you set here will be your **Client ID** in Casdoor).

![Register Services ID](/img/providers/OAuth/appleregisterserviceid.png)

Then, configure this Services ID. Enable **Sign in with Apple** and click **Configure**.

![Edit Services ID Configuration](/img/providers/OAuth/appleeditserviceconfig.png)

### Step 3: Configure Redirect URLs

In the configuration screen, set up the **Return URLs** (callback URLs). You need to enter the **Redirect URL shown on the Casdoor provider page** here.

![Configure Callback URLs](/img/providers/OAuth/applecallbackconfig.png)

:::info Set Return URLs Correctly
The `Return URLs` on Apple **must** exactly match the `Redirect URL` shown on your Casdoor Apple provider configuration page (e.g., `https://your-casdoor-domain.com/callback`).
:::

### Step 4: Create a Key

After configuring the Services ID, create a **Key**.
When creating the Key, enable **Sign in with Apple** and associate it with your App ID.

![Configure Key Association](/img/providers/OAuth/applekeyconfig.png)

After registering the Key, note down the **Key ID** and **download the `.p8` file immediately**. (This file can only be downloaded once, save it securely!)

![Get Key ID and Download .p8 File](/img/providers/OAuth/applegetkeyid.png)

**Important:** Find and note down your **Team ID** from the **Membership** page on the Apple Developer Portal.

### Step 5: Configure Casdoor Provider

1. **Client ID**: Enter the Apple **Services ID `Identifier`** you created earlier.
2. **Team ID**: Enter your Apple **Team ID** (found on the Membership page).
3. **Key ID**: Enter the Apple **Key ID** you noted down.
4. **Key Text**: Open the downloaded `.p8` file with a text editor. Copy its **entire content** (including the `-----BEGIN...` and `-----END...` lines) and paste it here.
5. **Check Redirect URL**: Verify that the `Redirect URL` shown here in Casdoor has been correctly added to the **Return URLs** in your Apple Services ID configuration.

![Configure Casdoor Provider](/img/providers/OAuth/appleconfigcasdoor.png)
