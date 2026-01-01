---
title: Azure AD
description: Using Azure AD as SAML IdP
keywords: [Azure AD, SAML, Microsoft Entra]
authors: [nomeguy]
---

This guide shows you how to configure Azure AD (Microsoft Entra ID) as a SAML Identity Provider for Casdoor, allowing users to authenticate with their Azure AD accounts.

## Create Enterprise Application in Azure AD

Sign in to the [Azure Portal](https://portal.azure.com/) and navigate to **Azure Active Directory** > **Enterprise applications**.

Click **New application** > **Create your own application**.

Enter a name (e.g., "Casdoor") and select **Integrate any other application you don't find in the gallery (Non-gallery)**. Click **Create**.

## Configure Single Sign-On

In your new enterprise application, navigate to **Single sign-on** and select **SAML**.

### Basic SAML Configuration

Click **Edit** on the Basic SAML Configuration section and enter:

- **Identifier (Entity ID)**: `https://<your-casdoor-domain>/api/acs`
  - Example: `https://door.example.com/api/acs`
- **Reply URL (Assertion Consumer Service URL)**: `https://<your-casdoor-domain>/api/acs`
  - Use the same URL as Entity ID

:::note

The `/api/acs` endpoint only accepts POST requests. Azure AD uses POST binding by default for SAML responses.

:::

Click **Save**.

### Attributes & Claims

The default attributes configuration is typically sufficient:

- **Unique User Identifier**: `user.userprincipalname`
- **emailaddress**: `user.mail`
- **name**: `user.userprincipalname`

You can customize these mappings if needed. When the username attribute is not explicitly mapped, Casdoor will automatically fall back to using the email address or NameID from the SAML assertion to populate the username field.

### SAML Certificates

Download the **Certificate (Base64)** from the SAML Certificates section.

### Set up Casdoor

Note the following URLs from the **Set up Casdoor** section:

- **Login URL**
- **Azure AD Identifier**
- **Logout URL**

## Configure SAML Provider in Casdoor

In the Casdoor admin console, navigate to **Providers** and click **Add**.

Select the following:

- **Category**: `SAML`
- **Type**: `Custom`
- **Metadata**: You can either:
  - Download the **Federation Metadata XML** from Azure AD and paste it here, or
  - Manually configure using the Login URL, Azure AD Identifier, and Certificate

Click **Parse** to automatically fill in the fields, then click **Save**.

## Assign Users

Back in Azure AD, navigate to **Users and groups** in your enterprise application and assign users or groups who should have access to Casdoor.

## Add Provider to Application

Edit your Casdoor application and add the Azure AD SAML provider to the **Providers** list. Click **Save**.

## Test the Integration

Navigate to your Casdoor application's login page. You should see an Azure AD login option. Click it to test the SAML authentication flow.

You can also use the **Test** button in Azure AD's SAML configuration to verify the setup.
