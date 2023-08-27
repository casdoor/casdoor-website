---
title: Google Workspace
description: Using Casdoor as a SAML IdP
keywords: [SAML, IdP]
authors: [UsherFall]
---

## Casdoor as a SAML IdP in Google Workspace

This guide will show you how to configure Casdoor and Google Workspace to add Casdoor as a SAML IdP in Google Workspace.

### Add Certificate

In Casdoor, add a certificate of type X.509 with RSA crypto algorithm and download it.

![Add cert](/img/how-to-connect/saml/saml_google-workspace_cert.png)

### Configure SAML Application

On the application edit page, select the certificate you just created. Add the domain name of the Google application you will use in the **Redirect URLs**, such as google.com.

![Select cert and add redirect URLs](/img/how-to-connect/saml/saml_google-workspace_app.png)

In the **SAML reply URL** field, enter `https://www.google.com/a/<your domain>/acs`, which is the ACS URL. You can find relevant information about ACS URL here: [SSO assertion requirements](https://support.google.com/a/answer/6330801).

![Enter the SAML reply URL field](/img/how-to-connect/saml/saml_google-workspace_acs.png)

Copy the **sign-in page URL**. This will be used in the next step.

![Copy the sign-in page URL](/img/how-to-connect/saml/saml_google-workspace_login.png)

### Add Third-Party SAML IdP for Google Workspace

In the Google Workspace Admin console, navigate to **Security** and then **Overview**. Look for the **SSO with third-party IdP** section.
Click on "Add SSO profile" to access the editing page. Check the "Set up SSO with third-party identity provider" checkbox. Paste the copied sign-in page URL into the **Sign-in page URL** and **Sign-out page URL** fields. Upload the certificate downloaded in the previous step. Click "Save" to save the changes.

![Configure Google Workspace](/img/how-to-connect/saml/saml_google-workspace_conf.png)

### Add Users for Testing

In Google Workspace, create a user with the username "test" (you can customize the username, this is just an example).

![Add a user in Google Workspace](/img/how-to-connect/saml/saml_google-workspace_user.png)

In Casdoor, add a user with the same username as set in Google Workspace. Make sure to select the appropriate organization and enter the user's email address.

![Add a user in Casdoor](/img/how-to-connect/saml/saml_google-workspace_test.png)

As an example using "google.com," follow these steps:

1. Click on the login button on the Google.com page.
   Enter the user's email address to initiate the login process.
2. You will be redirected to the Casdoor page.
   On the Casdoor page, enter the corresponding email address and password.
3. If the login is successful, you will be redirected back to google.com.

![Final result](/img/how-to-connect/saml/saml_google-workspace_test_gif.gif)
