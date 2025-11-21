---
title: Custom
description: Configure your SAML Custom Provider
keywords: [SAML, Custom]
authors: [Chinoholo0807]
---

Casdoor supports configuring SAML Custom Provider, and you can use Casdoor as a Service Provider (SP) to connect any Identity Provider (IDP) that support SAML 2.0 protocol.

## Step1. Configure your Identity Provider

When setting up your Identity Provider (such as Google Workspace, Azure AD, Okta, or any other SAML 2.0 compatible IdP), you'll need to provide the following Casdoor SP information:

- **ACS URL (Assertion Consumer Service URL)**: `https://<your-casdoor-domain>/api/acs`
  - Example: `https://door.example.com/api/acs`
  - This endpoint only accepts POST requests

- **Entity ID (SP Entity ID)**: `https://<your-casdoor-domain>/api/acs`
  - Use the same URL as your ACS URL

Replace `<your-casdoor-domain>` with your actual Casdoor domain. For example, if your Casdoor instance is running at `http://localhost:8000`, use `http://localhost:8000/api/acs` for both values.

## Step2. Get the metadata of IDP

After configuring your IdP, obtain the metadata, which is an XML document that describes the configuration information of the services provided by the IdP. It needs to include information such as `EntityID`, `SSO Endpoint`, etc.

Some IDPs, such as Keycloak, require SP information to provide metadata. You can refer to the document [Keycloak](/docs/provider/saml/keycloak).

You can use oktadev to test the SAML Custom Provider, here is the [metadata](https://idp.oktadev.com/metadata).

## Step3. Configure SAML Custom Provider

After obtaining the metadata from your IdP, create a SAML Custom Provider in Casdoor and fill in the necessary information.

| Field | Description |
| ---- | ---- |
| Category | Choose `SAML` |
| Type | Choose `Custom` |
| Favicon.URL | The URL of the IDP logo |
| Metadata | The metadata of IDP |

Then click `Parse` button, and fields `Endpoint`, `IdP`, `Issuer URL`, `SP ACS URL` and `SP Entity ID` will be automatically parsed.

![configure saml custom provider](/img/providers/SAML/custom_provider.png)

Finally, add the SAML Custom Provider to `Providers` of the application.
![add saml custom provider to application](/img/providers/SAML/custom_provider_add.png)

<video src="/video/provider/saml/custom_provider.mp4" controls="controls" width="100%"></video>
