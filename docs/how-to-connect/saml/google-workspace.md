---
title: Google Workspcae
description: Using Casdoor as SAML IdP
keywords: [SAML, IdP]
authors: [UsherFall]
---



## Casdoor as a SAML IdP in Google Workspace

This guide will show you how to configure Casdoor and Google Workspace to add Casdoor as a SAML IdP in Google Workspace

### Add Certificate 

In Casdoor, add a certificate of type X.509 with RSA crypto algorithm and download it.

![](/img/how-to-connect/saml/saml_google-workspace_cert.png)

### Configure SAML Application

In the application edit page, select the certificate you just created. Add the domain name of the Google application you will use in the **Redirect URLs**, such as google.com.

![](/img/how-to-connect/saml/saml_google-workspace_app.png)

In the **SAML reply URL** field, enter`https://www.google.com/a/<your domain>/acs`, which is the ACS URL. You can find relevant information about ACS URL here: [SSO assertion requirements](https://support.google.com/a/answer/6330801)

![](/img/how-to-connect/saml/saml_google-workspace_acs.png)

Copy the **sigin page URL**. This will be used in the next step.

![](/img/how-to-connect/saml/saml_google-workspace_login.png)

### Add Third-Party SAML IdP for Google Workspace

In the Google Workspace Admin console, navigate to **Security** and then **Overview**. Look for the **SSO with third-party Idp** section. 
Click on Add SSO profile to access the editing page. Check the Set up SSO with third-party identity provider checkbox. Paste the copied sigin page URL into the **Sign-in page URL** and **Sign-out page URL** fields. Upload the certificate downloaded in the previous step. Click Save to save the changes.

![](/img/how-to-connect/saml/saml_google-workspace_conf.png)

### Add Users for Testing

In Google Workspace, create a user with the username "test" (you can customize the username, this is just an example).

![](/img/how-to-connect/saml/saml_google-workspace_user.png)

In Casdoor, add a user with the same username as set in Google Workspace. Make sure to select the appropriate organization and enter the user's email address.

![](/img/how-to-connect/saml/saml_google-workspace_test.png)

As an example using "google.com," follow these steps:
1. Click on the login button on the Google.com page.
Enter the user's email address to initiate the login process.
2. You will be redirected to the Casdoor page.
On the Casdoor page, enter the corresponding email address and password.
3. If the login is successful, you will be redirected back to google.com

![](/img/how-to-connect/saml/saml_google-workspace_test_gif.gif)