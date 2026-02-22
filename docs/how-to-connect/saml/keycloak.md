---
title: Keycloak (SAML)
description: Use Casdoor as SAML IdP in Keycloak.
keywords: [SAML, IdP, Keycloak]
authors: [seriouszyx]
---

This guide configures Casdoor as a SAML v2.0 identity provider in **Keycloak**.

## Add the SAML IdP in Keycloak

1. In the Keycloak admin console, go to **Identity providers** and add **SAML v2.0**.
2. On the IdP configuration page, set **Alias** and paste the Casdoor metadata URL into **Import from URL** (you can copy this from the Casdoor application edit page).
3. Click **Import** so Keycloak fills the SAML settings.
4. Note the **Service Provider Entity ID** and save.

![saml_keycloak_idp_create](/img/how-to-connect/saml/saml_keycloak_idp_create.png)
![saml_keycloak_idp_edit](/img/how-to-connect/saml/saml_keycloak_idp_edit.png)

:::info
See [Keycloak SAML Identity Providers](https://www.keycloak.org/docs/latest/server_admin/#saml-v2-0-identity-providers) for full options.
:::

## Configure the application in Casdoor

In the Casdoor application edit page:

- Add a **Redirect URL** that matches the **Service Provider Entity ID** from Keycloak.
- Enable **SAML compress** for Keycloak.

![saml_keycloak_compress](/img/how-to-connect/saml/saml_keycloak_compress.png)

## Sign in with Casdoor SAML

On the Keycloak login page, use the button for the Casdoor SAML provider. You will be redirected to Casdoor to sign in, then back to Keycloak. Assign users to the application as needed.

![saml_keycloak_login](/img/how-to-connect/saml/saml_keycloak_login.png)
![saml_keycloak_success](/img/how-to-connect/saml/saml_keycloak_success.png)

<video src="/video/saml_keycloak.mp4" controls="controls" width="100%"></video>
