---
title: Azure AD B2C
description: Add Azure AD B2C as a third-party service to complete authentication
keywords: [AzureAD]
authors: [nomeguy]
---

## Introduction

Azure AD B2C is a customer identity access management solution, supporting standards like OpenID Connect, OAuth 2.0, and SAML. It allows the integration of consumer-facing applications with a scalable and customizable identity management solution.

## How to use?

The steps to set up Azure AD B2C for authentication are shown below.

### Step 1: Create a B2C Tenant

First, create a B2C Tenant in your Azure portal.

### Step 2: Register an application

Register an application within your B2C tenant.

![azuread_register.png](/img/providers/OAuth/azuread_register.png)

### Step 3: Create a client secret

Create a `client secret` for your application and save the value as it will be used later.

![azuread_secret.png](/img/providers/OAuth/azuread_secret.png)

### Step 4: Add redirect URIs

Add the redirect URIs for your application in the Azure AD B2C settings.

![azuread_uri.png](/img/providers/OAuth/azuread_uri.png)

### Step 5: Define User Flows

Define user flows in Azure AD B2C to manage how users sign up, sign in, and manage their profiles.

### Step 6: Create Azure AD B2C provider in Casdoor

Finally, add an Azure AD B2C OAuth provider in Casdoor, using the `Client ID` and `Client Secret` from your B2C tenant.

![azuread_casdoor.png](/img/providers/OAuth/azuread_casdoor.png)
