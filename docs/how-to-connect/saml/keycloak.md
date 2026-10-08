---
title: Connect Keycloak with SAML
sidebar_label: Keycloak (SAML)
description: Add Casdoor to Keycloak as a SAML 2.0 identity provider, so that users sign in to Keycloak with their Casdoor account.
keywords: [SAML, IdP, Keycloak]
authors: [seriouszyx]
---

This guide explains how to add Casdoor to Keycloak as a SAML 2.0 identity provider (IdP).

---

#### Learning outcomes

- Import the Casdoor SAML metadata into Keycloak.
- Configure the Casdoor application for Keycloak.
- Sign in to Keycloak through Casdoor.

#### What you need

- A Keycloak server with administrator access
- An [application](/docs/application/overview) in Casdoor and its [SAML metadata URL](/docs/how-to-connect/saml/overview#configuration-in-the-sp-service-provider)

---

## Add the SAML IdP in Keycloak

1. In the Keycloak admin console, go to **Identity providers** and add a provider of type **SAML v2.0**.

   ![Identity providers in the Keycloak admin console](/img/how-to-connect/saml/saml_keycloak_idp_create.png)

1. Set **Alias**.
1. Paste the SAML metadata URL of the Casdoor application into **Import from URL** and click **Import**. Keycloak fills in the SAML settings.
1. Note the value of **Service Provider Entity ID**, and save the provider.

   ![SAML settings of the identity provider in Keycloak](/img/how-to-connect/saml/saml_keycloak_idp_edit.png)

For all options, see [SAML v2.0 identity providers](https://www.keycloak.org/docs/latest/server_admin/#saml-v2-0-identity-providers) in the Keycloak documentation.

## Configure the Casdoor application {#configure-the-application-in-casdoor}

1. In the Casdoor admin console, open the edit page of the application.
1. Add the **Service Provider Entity ID** from Keycloak to **Redirect URLs**.
1. Turn on **Enable SAML compression**. Keycloak requires compressed responses.

   ![Enable SAML compression switch](/img/how-to-connect/saml/saml_keycloak_compress.png)

1. Save the application.

## Verify the result {#sign-in-with-casdoor-saml}

1. Open the Keycloak sign-in page and click the button of the Casdoor provider.

   ![Keycloak sign-in page with the Casdoor provider](/img/how-to-connect/saml/saml_keycloak_login.png)

1. Sign in on the Casdoor sign-in page. Casdoor sends you back to Keycloak, signed in.

   ![Keycloak after a successful sign-in](/img/how-to-connect/saml/saml_keycloak_success.png)

<video src="/video/saml_keycloak.mp4" controls="controls" width="100%"></video>

## See also

- [Use Casdoor as a SAML identity provider](/docs/how-to-connect/saml/overview)
- [Keycloak as a SAML provider of Casdoor](/docs/provider/saml/keycloak)
- [Keycloak syncer](/docs/syncer/Keycloak)
