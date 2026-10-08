---
title: Add Azure AD B2C as an OAuth provider
sidebar_label: Azure AD B2C
description: Let customers sign in to Casdoor with their account in Azure AD B2C.
keywords: [Azure AD B2C, OAuth]
authors: [nomeguy]
---

This guide explains how to let users sign in to Casdoor with their account in Azure AD B2C, the customer identity platform of Microsoft.

---

#### Learning outcomes

- Register an application in an Azure AD B2C tenant.
- Add Azure AD B2C as an OAuth provider in Casdoor.

#### What you need

- An Azure subscription
- Administrator access to the Casdoor admin console

---

## Configure Azure AD B2C

1. Create a B2C tenant in the [Azure portal](https://portal.azure.com/).
1. Register an application in the B2C tenant and note the **Application (client) ID**.

   ![Application registration](/img/providers/OAuth/azuread_register.png)

1. Create a client secret and copy its value. Azure shows the value only once.

   ![Client secret of the application](/img/providers/OAuth/azuread_secret.png)

1. Add the callback URL of Casdoor, `https://<your-casdoor-host>/callback`, to the **Redirect URIs** of the application.

   ![Redirect URIs of the application](/img/providers/OAuth/azuread_uri.png)

1. Define the user flows that you need, for sign-up, sign-in, and profile editing.

## Add the provider in Casdoor {#6-add-the-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `Azure AD B2C`.
1. Enter the **Client ID** and the **Client secret** of the B2C application.

   ![Azure AD B2C provider in Casdoor](/img/providers/OAuth/azuread_casdoor.png)

1. Save the provider.

To fill in more user fields from the claims of your user flows, see [Map OAuth claims to user fields](/docs/provider/oauth/user-mapping).

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
