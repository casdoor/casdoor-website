---
title: Keycloak SAML
description: Use Keycloak as a SAML IdP for Casdoor sign-in.
keywords: [Keycloak, SAML]
authors: [seriouszyx]
---

[Keycloak](https://www.keycloak.org/) is an open-source IdP that supports SAML and OpenID Connect and can broker LDAP or other SAML IdPs. This guide configures a Keycloak SAML client and Casdoor so Keycloak users can sign in to Casdoor.

## Configure Keycloak

Example assumptions:

- Casdoor: UI at `http://localhost:7001`, API at `http://localhost:8000`. Adjust for your deployment.
- Keycloak: UI at `http://localhost:8080/auth`.
- SP ACS URL and Entity ID: `http://localhost:8000/api/acs`.

:::note

The `/api/acs` endpoint only accepts POST requests. Ensure Keycloak is configured to use HTTP POST binding for SAML responses.

:::

Use the default realm or create a new one.

![Add Keycloak realm](/img/providers/SAML/keycloak_realm_add.png)

![Keycloak realm](/img/providers/SAML/keycloak_realm.png)

## Add a client entry in Keycloak

:::info
See [Keycloak client SAML configuration](https://www.keycloak.org/docs/latest/server_admin/index.html#_client-saml-configuration).
:::

Click **Clients** in the menu and then click **Create** to go to the **Add Client** page. Fill in the fields as follows:

- **Client ID**: `http://localhost:8000/api/acs` - This will be the SP Entity ID used in the Casdoor configuration later.
- **Client Protocol**: `saml`.
- **Client SAML Endpoint**: `http://localhost:8000/api/acs` - This URL is where you want the Keycloak server to send SAML requests and responses. Generally, applications have one URL for processing SAML requests. Multiple URLs can be set in the Settings tab of the client.

![Add Keycloak client](/img/providers/SAML/keycloak_client_add.png)

Click **Save**. This action creates the client and brings you to the **Settings** tab.

The following are part of the settings:

1. **Name** — e.g. `Casdoor`; any friendly name for the Keycloak UI.
2. **Enabled** - Select `on`.
3. **Include Authn Statement** - Select `on`.
4. **Sign Documents** - Select `on`.
5. **Sign Assertions** - Select `off`.
6. **Encrypt Assertions** - Select `off`.
7. **Client Signature Required** - Select `off`.
8. **Force Name ID Format** - Select `on`.
9. **Name ID Format** - Select `username`.
10. **Valid Redirect URIs** - Add `http://localhost:8000/api/acs`.
11. **Master SAML Processing URL** - `http://localhost:8000/api/acs`.
12. Fine Grain SAML Endpoint Configuration
    1. **Assertion Consumer Service POST Binding URL** - `http://localhost:8000/api/acs`.
    2. **Assertion Consumer Service Redirect Binding URL** - `http://localhost:8000/api/acs`.

Save the configuration.

![Configure Keycloak client](/img/providers/SAML/keycloak_client_configure.png)

:::tip

To sign the authn request: enable **Client Signature Required** and upload your certificate. Casdoor’s private key and certificate (`token_jwt_key.key`, `token_jwt_key.pem`) are in the **object** directory. In Keycloak open **Keys** → **Import** → **Archive Format** → **Certificate PEM** and upload the certificate.

:::

Click **Installation** tab.

For Keycloak `<=` 5.0.0, select Format Option - **SAML Metadata IDPSSODescriptor** and copy the metadata.

For Keycloak 6.0.0+, select Format Option - **Mod Auth Mellon files** and click **Download**. Unzip the downloaded.zip, locate `idp-metadata.xml`, and copy the metadata.

![Download metadata](/img/providers/SAML/keycloak_client_install.png)

![Copy metadata](/img/providers/SAML/keycloak_client_copy.png)

## Configure in Casdoor

Create a new provider in Casdoor.

Select category as **SAML**, type as **Keycloak**. Copy the content of metadata and paste it into the **Metadata** field. The values of **Endpoint**, **IdP**, and **Issuer URL** will be generated automatically after clicking the **Parse** button. Finally, click the **Save** button.

:::tip

If **Client Signature Required** is enabled in Keycloak and you uploaded a certificate, enable **Sign request** in Casdoor.

:::

![Casdoor provider](/img/providers/SAML/keycloak_casdoor_provider.png)

Edit the application you want to configure in Casdoor. Select the provider you just added and click the **Save** button.

![Add provider for app](/img/providers/SAML/keycloak_casdoor_app.png)

## Test

Open the application’s login page; a Keycloak option appears. Click it to sign in via Keycloak; after success you are logged into Casdoor.

![Casdoor login](/img/providers/SAML/keycloak_casdoor_login.gif)
