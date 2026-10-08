---
title: Add a SAML identity provider
sidebar_label: Custom SAML
description: Connect any SAML 2.0 identity provider to Casdoor with a Custom SAML provider, by registering Casdoor at the IdP and importing the metadata of the IdP.
keywords: [SAML, Custom]
authors: [Chinoholo0807]
---

This guide explains how to let users sign in to Casdoor with any SAML 2.0 identity provider (IdP), such as Google Workspace, Azure AD, or Okta.

---

#### Learning outcomes

- Register Casdoor as a service provider at the IdP.
- Import the metadata of the IdP into a Custom SAML provider.
- Add the provider to an application.

#### What you need

- Administrator access to the IdP
- Administrator access to the Casdoor admin console

---

## Register Casdoor at the IdP {#1-configure-your-idp}

At the IdP, register Casdoor as a service provider with the following values:

| Setting | Value |
|---|---|
| ACS URL | `https://<your-casdoor-domain>/api/acs`, for example `https://door.example.com/api/acs`. For a local instance at `http://localhost:8000`, the URL is `http://localhost:8000/api/acs` |
| SP entity ID | The same URL as the ACS URL |
| Binding | HTTP POST. The endpoint accepts only `POST` |

## Get the metadata of the IdP {#2-get-idp-metadata}

Export the SAML metadata of the IdP as XML. It contains the entity ID, the single sign-on endpoint, and the certificate. Some IdPs, such as [Keycloak](/docs/provider/saml/keycloak), provide the metadata only after you have entered the service provider details.

## Add the provider in Casdoor {#3-configure-the-saml-custom-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `SAML` and **Type** to `Custom`.
1. Set **Favicon** to the URL of the logo of the IdP.
1. Paste the metadata of the IdP into **Metadata** and click **Parse**. Casdoor fills in **Endpoint**, **IdP**, **Issuer URL**, **SP ACS URL**, and **SP Entity ID**.

   ![Custom SAML provider in Casdoor](/img/providers/SAML/custom_provider.png)

1. Save the provider.

## Add the provider to an application

Open the edit page of the application, add the provider on the **Providers** tab, and save.

![SAML provider in the Providers table](/img/providers/SAML/custom_provider_add.png)

<video src="/video/provider/saml/custom_provider.mp4" controls="controls" width="100%"></video>

## See also

- [SAML providers](/docs/provider/saml/overview)
- [Azure AD](/docs/provider/saml/azure-ad)
- [Google Workspace](/docs/provider/saml/google-workspace)
