---
title: Google Workspace (SAML)
description: Use Casdoor as SAML IdP for Google Workspace SSO.
keywords: [SAML, IdP, Google Workspace]
authors: [UsherFall]
---

This guide configures Casdoor as a SAML identity provider for **Google Workspace** single sign-on.

## Add a certificate in Casdoor

Create an X.509 certificate with RSA in Casdoor and download it.

![Add cert](/img/how-to-connect/saml/saml_google-workspace_cert.png)

## Configure the SAML application in Casdoor

1. On the application edit page, select the certificate and add your Google domain (e.g. `google.com`) to **Redirect URLs**.
2. Set **SAML reply URL** to `https://www.google.com/a/<your-domain>/acs`. See [SSO assertion requirements](https://support.google.com/a/answer/6330801) for the ACS URL.
3. Copy the **Sign-in page URL** for the next step.

![Select cert and add redirect URLs](/img/how-to-connect/saml/saml_google-workspace_app.png)
![Enter the SAML reply URL field](/img/how-to-connect/saml/saml_google-workspace_acs.png)
![Copy the sign-in page URL](/img/how-to-connect/saml/saml_google-workspace_login.png)

## Add third-party SAML IdP in Google Workspace

1. In **Google Workspace Admin** → **Security** → **Overview**, find **SSO with third-party IdP**.
2. Click **Add SSO profile** and enable **Set up SSO with third-party identity provider**.
3. Paste the Casdoor sign-in page URL into **Sign-in page URL** and **Sign-out page URL**.
4. Upload the certificate you downloaded from Casdoor and save.

![Configure Google Workspace](/img/how-to-connect/saml/saml_google-workspace_conf.png)

## Test with a user

1. In Google Workspace, create a user (e.g. username `test`).
2. In Casdoor, create a user with the same username in the correct organization and set their email.

![Add a user in Google Workspace](/img/how-to-connect/saml/saml_google-workspace_user.png)
![Add a user in Casdoor](/img/how-to-connect/saml/saml_google-workspace_test.png)

Sign-in flow: open the Google app (e.g. google.com) → sign in with the user’s email → redirect to Casdoor → enter Casdoor credentials → redirect back to Google when successful.

![Final result](/img/how-to-connect/saml/saml_google-workspace_test_gif.gif)
