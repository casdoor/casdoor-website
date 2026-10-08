---
title: Add Azure AD as an OAuth provider
sidebar_label: Azure AD
description: Let users sign in to Casdoor with their Microsoft account in Azure Active Directory (Microsoft Entra ID).
keywords: [Azure AD, Azure, OAuth]
authors: [leo220yuyaodog]
---

This guide explains how to let users sign in to Casdoor with their Microsoft account in Azure Active Directory (Azure AD).

---

#### Learning outcomes

- Register an application in Azure AD.
- Add Azure AD as an OAuth provider in Casdoor.

#### What you need

- An Azure AD tenant with the rights to register applications
- Administrator access to the Casdoor admin console

---

## Register an application in Azure AD

1. [Register an application](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps) and choose the supported account types, for example single tenant.

   ![Application registration in Azure AD](/img/providers/OAuth/azuread_register.png)

1. Create a client secret and copy its value. Azure shows the value only once.

   ![Client secret of the application](/img/providers/OAuth/azuread_secret.png)

1. Under **Authentication**, add the callback URL of Casdoor, for example `https://your-casdoor.com/callback`, to **Redirect URIs**.

   ![Redirect URIs of the application](/img/providers/OAuth/azuread_uri.png)

1. Under **API permissions**, add the permissions that you need, for example `User.Read`, and click **Grant admin consent**.

   ![API permissions of the application](/img/providers/OAuth/azuread_permission.png)

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `Azure AD`.
1. Enter the application (client) ID as the **Client ID** and the secret value as the **Client secret**.

   ![Azure AD provider in Casdoor](/img/providers/OAuth/azuread_casdoor.png)

1. Save the provider.

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
- [Azure AD syncer](/docs/syncer/AzureAD)
- [Azure AD as a SAML provider](/docs/provider/saml/azure-ad)
