---
title: Keycloak
description: Using Casdoor as SAML IdP
keywords:
  - SAML
  - IdP
authors:
  - seriouszyx
---



## Casdoor as a SAML IdP in keycloak

This guide will show you how to configure Casdoor and Keycloak to add Casdoor as a SAML IdP in Keycloak.

### Add SAML IdP in Keycloak

Open Keycloak admin page, click **Identity Providers** and select **SAML v2.0** from the list of providers.

![saml_keycloak_idp_create](/img/how-to-connect/saml/saml_keycloak_idp_create.png)

:::info

You can visit Keycloak SAML Identity Providers [documentation](https://www.keycloak.org/docs/latest/server_admin/#saml-v2-0-identity-providers) to get more detailed information.

:::

Enter the **Alias** and the **Import from URL** in Keycloak IdP edit page. The content of **Import from URL** can be found in the Casdoor application edit page. Click **Import** and the SAML config will be filled automatically.

![saml_keycloak_idp_edit](/img/how-to-connect/saml/saml_keycloak_idp_edit.png)

You should remember the **Service Provider Entity ID** and then save the configuration.

#### Configure SAML application in Casdoor

In the application edit page, add a redirect URL which the content of it is **Service Provider Entity ID** in Keycloak. And you should enable SAML compress for Keycloak.

![saml_keycloak_compress](/img/how-to-connect/saml/saml_keycloak_compress.png)

### Login using Casdoor SAML

Open the Keycloak login page and you can find the additional button that allows you to login to Keycloak using the Casdoor SAML provider.

![saml_keycloak_login](/img/how-to-connect/saml/saml_keycloak_login.png)

Click on the button and you will be redirected to the Casdoor SAML provider for the authentication. After the successful authentication, you will be redirected back to Keycloak. Then you need to assign users to the application.

![saml_keycloak_success](/img/how-to-connect/saml/saml_keycloak_success.png)

We also provide a demo video to demonstrate the entire process, which we hope will be helpful to you.

<video src="/video/saml_keycloak.mp4" controls="controls" width="100%"></video>
