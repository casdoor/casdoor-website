---
title: Keycloak
description: Using Casdoor as a SAML IdP
keywords: [SAML, IdP]
authors: [seriouszyx]
---

## Casdoor as a SAML IdP in Keycloak

This guide will show you how to configure Casdoor and Keycloak to add Casdoor as a SAML IdP in Keycloak.

### Adding SAML IdP in Keycloak

Open the Keycloak admin page, click on **Identity Providers**, and select **SAML v2.0** from the list of providers.

![saml_keycloak_idp_create](/img/how-to-connect/saml/saml_keycloak_idp_create.png)

:::info

You can visit the Keycloak SAML Identity Providers [documentation](https://www.keycloak.org/docs/latest/server_admin/#saml-v2-0-identity-providers) to get more detailed information.

:::

Enter the **Alias** and the **Import from URL** in the Keycloak IdP edit page. The content of the **Import from URL** can be found on the Casdoor application edit page. Click **Import** and the SAML config will be filled automatically.

![saml_keycloak_idp_edit](/img/how-to-connect/saml/saml_keycloak_idp_edit.png)

Remember the **Service Provider Entity ID** and save the configuration.

### Configuring the SAML application in Casdoor

In the application edit page, add a redirect URL which contains the **Service Provider Entity ID** from Keycloak. Also, make sure to enable SAML compress for Keycloak.

![saml_keycloak_compress](/img/how-to-connect/saml/saml_keycloak_compress.png)

### Logging in using Casdoor SAML

Open the Keycloak login page and you will find an additional button that allows you to log in to Keycloak using the Casdoor SAML provider.

![saml_keycloak_login](/img/how-to-connect/saml/saml_keycloak_login.png)

Click on the button and you will be redirected to the Casdoor SAML provider for authentication. After successful authentication, you will be redirected back to Keycloak. Then you need to assign users to the application.

![saml_keycloak_success](/img/how-to-connect/saml/saml_keycloak_success.png)

We also provide a demo video that demonstrates the entire process, which we hope will be helpful to you.

<video src="/video/saml_keycloak.mp4" controls="controls" width="100%"></video>
