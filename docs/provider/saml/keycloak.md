---
title: Add Keycloak as a SAML provider
sidebar_label: Keycloak
description: Let users of a Keycloak realm sign in to Casdoor through SAML.
keywords: [Keycloak, SAML]
authors: [seriouszyx]
---

This guide explains how to let the users of a [Keycloak](https://www.keycloak.org/) realm sign in to Casdoor through SAML. Keycloak is an open-source IdP that supports SAML and OpenID Connect and can broker LDAP and other identity providers.

---

#### Learning outcomes

- Create a SAML client for Casdoor in Keycloak.
- Add Keycloak as a SAML provider in Casdoor.
- Sign the authentication request, if Keycloak requires it.

#### What you need

- Administrator access to a Keycloak server
- Administrator access to the Casdoor admin console

---

The examples assume the following addresses. Adjust them for your deployment.

| Component | Address |
|---|---|
| Casdoor UI | `http://localhost:7001` |
| Casdoor API | `http://localhost:8000` |
| Keycloak | `http://localhost:8080/auth` |
| SP ACS URL and entity ID | `http://localhost:8000/api/acs` |

## Prepare a realm {#configure-keycloak}

Use the default realm or create one.

![Add realm in Keycloak](/img/providers/SAML/keycloak_realm_add.png)

![Realm settings in Keycloak](/img/providers/SAML/keycloak_realm.png)

## Create a SAML client in Keycloak {#add-a-client-entry-in-keycloak}

For all client settings, see [SAML clients](https://www.keycloak.org/docs/latest/server_admin/index.html#_client-saml-configuration) in the Keycloak documentation.

1. Go to **Clients** and click **Create**. Fill in the **Add Client** page:

   | Field | Value |
   |---|---|
   | **Client ID** | `http://localhost:8000/api/acs`. This is the SP entity ID of Casdoor |
   | **Client Protocol** | `saml` |
   | **Client SAML Endpoint** | `http://localhost:8000/api/acs`, where Keycloak sends SAML requests and responses |

   ![Add Client page](/img/providers/SAML/keycloak_client_add.png)

1. Click **Save**. The **Settings** tab opens.
1. Set the following values and save:

   | Setting | Value |
   |---|---|
   | **Name** | A friendly name, such as `Casdoor` |
   | **Enabled** | On |
   | **Include Authn Statement** | On |
   | **Sign Documents** | On |
   | **Sign Assertions** | Off |
   | **Encrypt Assertions** | Off |
   | **Client Signature Required** | Off. See [Sign the authentication request](#sign-the-authentication-request) |
   | **Force Name ID Format** | On |
   | **Name ID Format** | `username` |
   | **Valid Redirect URIs** | `http://localhost:8000/api/acs` |
   | **Master SAML Processing URL** | `http://localhost:8000/api/acs` |
   | **Assertion Consumer Service POST Binding URL** | `http://localhost:8000/api/acs`, under **Fine Grain SAML Endpoint Configuration** |
   | **Assertion Consumer Service Redirect Binding URL** | `http://localhost:8000/api/acs` |

   ![Settings of the client](/img/providers/SAML/keycloak_client_configure.png)

   The `/api/acs` endpoint accepts only `POST` requests, so Keycloak must send the response with the POST binding.

1. Go to the **Installation** tab and get the metadata:

   - In Keycloak 5.0.0 and earlier, select the format **SAML Metadata IDPSSODescriptor** and copy the metadata.
   - In Keycloak 6.0.0 and later, select **Mod Auth Mellon files**, click **Download**, unzip the file, and copy the content of `idp-metadata.xml`.

   ![Installation tab](/img/providers/SAML/keycloak_client_install.png)

   ![Metadata of the client](/img/providers/SAML/keycloak_client_copy.png)

## Add the provider in Casdoor {#configure-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `SAML` and **Type** to `Keycloak`.
1. Paste the metadata into **Metadata** and click **Parse**. Casdoor fills in **Endpoint**, **IdP**, and **Issuer URL**.

   ![Keycloak provider in Casdoor](/img/providers/SAML/keycloak_casdoor_provider.png)

1. Save the provider.
1. Open the edit page of your application, add the provider on the **Providers** tab, and save.

   ![Keycloak provider in the application](/img/providers/SAML/keycloak_casdoor_app.png)

## Sign the authentication request

To make Keycloak verify the requests of Casdoor:

1. In Keycloak, turn on **Client Signature Required** for the client.
1. Go to **Keys** > **Import**, select the archive format **Certificate PEM**, and upload the certificate of Casdoor. The private key and the certificate of Casdoor are `token_jwt_key.key` and `token_jwt_key.pem` in the `object` directory of the Casdoor source.
1. In Casdoor, turn on **Sign request** on the provider.

## Verify the result {#test}

Open the sign-in page of the application and click the Keycloak button. After you sign in at Keycloak, you are signed in to Casdoor.

![Recording of the sign-in through Keycloak](/img/providers/SAML/keycloak_casdoor_login.gif)

## See also

- [SAML providers](/docs/provider/saml/overview)
- [Keycloak syncer](/docs/syncer/Keycloak)
