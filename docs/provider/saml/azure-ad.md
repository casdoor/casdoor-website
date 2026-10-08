---
title: Add Azure AD as a SAML provider
sidebar_label: Azure AD
description: Let users sign in to Casdoor with their Azure AD (Microsoft Entra ID) account through SAML.
keywords: [Azure AD, SAML, Microsoft Entra]
authors: [nomeguy]
---

This guide explains how to let users sign in to Casdoor with their Azure AD (Microsoft Entra ID) account through SAML.

---

#### Learning outcomes

- Create an enterprise application for Casdoor in Azure AD.
- Add Azure AD as a SAML provider in Casdoor.
- Assign users and test the sign-in.

#### What you need

- An Azure AD tenant with the rights to create enterprise applications
- Administrator access to the Casdoor admin console

---

## Create an enterprise application {#create-enterprise-application-in-azure-ad}

1. In the [Azure portal](https://portal.azure.com/), go to **Azure Active Directory** > **Enterprise applications**.
1. Click **New application** > **Create your own application**.
1. Enter a name, for example `Casdoor`, select **Integrate any other application you don't find in the gallery (Non-gallery)**, and click **Create**.

## Configure single sign-on {#configure-single-sign-on}

1. In the enterprise application, go to **Single sign-on** and select **SAML**.
1. In **Basic SAML Configuration**, click **Edit** and enter:

   | Field | Value |
   |---|---|
   | **Identifier (Entity ID)** | `https://<your-casdoor-domain>/api/acs`, for example `https://door.example.com/api/acs` |
   | **Reply URL (Assertion Consumer Service URL)** | The same URL |

   Azure AD sends the response with HTTP POST, which the `/api/acs` endpoint requires.

1. Click **Save**.
1. Keep the default **Attributes & Claims**, or change them:

   | Claim | Default source |
   |---|---|
   | Unique User Identifier | `user.userprincipalname` |
   | emailaddress | `user.mail` |
   | name | `user.userprincipalname` |

   If no username attribute is mapped, Casdoor uses the email address or the NameID of the assertion as the username.

1. Download the **Federation Metadata XML** from the **SAML Certificates** section. Alternatively, note the **Certificate (Base64)** and, in the **Set up Casdoor** section, the **Login URL**, the **Azure AD Identifier**, and the **Logout URL**.

## Add the provider in Casdoor {#configure-saml-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `SAML` and **Type** to `Custom`.
1. Paste the federation metadata into **Metadata** and click **Parse**.
1. Save the provider.
1. Open the edit page of your application, add the provider on the **Providers** tab, and save.

## Assign users {#assign-users}

In the enterprise application in Azure AD, go to **Users and groups** and assign the users or groups that may sign in to Casdoor.

## Verify the result {#test-the-integration}

Open the sign-in page of the application and click the Azure AD button. You can also test from Azure AD with the **Test** button of the SAML configuration.

## See also

- [SAML providers](/docs/provider/saml/overview)
- [Add Azure AD as an OAuth provider](/docs/provider/oauth/azureAD)
