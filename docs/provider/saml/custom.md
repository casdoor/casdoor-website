---
title: Custom
description: Configure your SAML Custom Provider
keywords: [SAML, Custom]
authors: [Chinoholo0807]
---

Casdoor supports configuring SAML Custom Provider, and you can use Casdoor as a Service Provider (SP) to connect any Identity Provider (IDP) that support SAML 2.0 protocol.

## Step1. Get the metadata of IDP

First, you need to obtain the metadata of IDP, which is a XML document used to describe the configuration information of the services provided by IDP.
It needs to include information such as `EntityID`, `SSO Endpoint`, etc.

Some IDPs, such as Keycloak, require SP information to provide metadata.
You can refer to the document  [Keycloak](/docs/provider/saml/keycloak).

You can use oktadev to test the SAML Custom Provider, here is the [metadata](https://idp.oktadev.com/metadata).

## Step2. Configure SAML Custom Provider

After obtain the metadata of IDP, create a SAML Custom Provider and fill the neccessary information.

| Field | Description |
| ---- | ---- |
| Category | Choose `SAML` |
| Type | Choose `Custom` |
| Favicon.URL | The URL of the IDP logo |
| Metadata | The metadata of IDP |

Then click `Parse` buttom, and fileds `Endpoint`, `IdP`, `Issuer URL`, `SP ACS URL` and `SP Entity ID` will be automatically parsed.

![configure saml custom provider](/img/providers/SAML/custom_provider.png)

Finally, add the SAML Custom Provider to `Providers` of the appliciton.
![add saml custom provider to application](/img/providers/SAML/custom_provider_add.png)

<video src="/video/provider/saml/custom_provider.mp4" controls="controls" width="100%"></video>
