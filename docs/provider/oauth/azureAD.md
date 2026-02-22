---
title: Azure AD OAuth
description: Add Microsoft Azure Active Directory as an OAuth provider.
keywords: [Azure AD, Azure, OAuth]
authors: [leo220yuyaodog]
---

**Azure Active Directory (Azure AD)** provides a single identity for cloud and on-premises apps. Use it as an OAuth provider in Casdoor so users can sign in with their Microsoft accounts.

## Register an application

1. [Register an application](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps) in Azure AD and choose the account type (e.g. single tenant).

![azuread_register.png](/img/providers/OAuth/azuread_register.png)

2. Create a **client secret** and save the value (it is shown only once).

![azuread_secret.png](/img/providers/OAuth/azuread_secret.png)

3. Under **Authentication**, add **Redirect URIs** for Casdoor (e.g. `https://your-casdoor.com/callback`).

![azuread_uri.png](/img/providers/OAuth/azuread_uri.png)

4. Under **API permissions**, add the scopes you need (e.g. `User.Read`). Click **Grant admin consent**.

![azuread_permission.png](/img/providers/OAuth/azuread_permission.png)

5. In Casdoor, create an **OAuth** provider, set **Type** to **Azure AD**, and enter the **Client ID** and **Client Secret** from the Azure app.

![azuread_casdoor.png](/img/providers/OAuth/azuread_casdoor.png)
