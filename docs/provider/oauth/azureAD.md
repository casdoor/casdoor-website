---
title: AzureAD
description: Add AzureAD as a third party service to complete authentication
keywords: [AzureAD]
authors: [leo220yuyaodog]
---

## Introduction

Azure Active Directory (Azure AD) simplifies application management by providing a single identity system for cloud and on-premise applications. Software as a Service (SaaS) applications, on-premise applications, and Line of Business (LOB) applications can be added to Azure AD. Users can then log in once for secure and seamless access to these applications, as well as Office 365 and other business applications provided by Microsoft.

## How to use?

The steps to register an app are shown below.

### step1. Register an application

First, [Register](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps) an application.
And choose an account type as needed.  The demo station uses the type shown below.

![azuread_register.png](/img/providers/OAuth/azuread_register.png)

### step2. Create a client secret

Create a `client secret` and save the value, it will be used later.
![azuread_secret.png](/img/providers/OAuth/azuread_secret.png)

### step3. Add redirect URIs

Follow the example in the picture to add the redirect URIs for Casdoor.
![azuread_uri.png](/img/providers/OAuth/azuread_uri.png)

### step4. Grant admin consent

The `user.read` API is open by default. You can add more scope according to your needs. Finally, remember to **grant admin consent**.
![azuread_permission.png](/img/providers/OAuth/azuread_permission.png)

### step5. Create AzureAD provider in casdoor

The last step, add an AzureAD OAuth provider and fill the `Client ID` and `Client Secret` in your Casdoor.
![azuread_casdoor.png](/img/providers/OAuth/azuread_casdoor.png)
