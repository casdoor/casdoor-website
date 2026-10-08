---
title: Connect Google Workspace with SAML
sidebar_label: Google Workspace (SAML)
description: Use Casdoor as the SAML identity provider of Google Workspace, so that users sign in to Google with their Casdoor account.
keywords: [SAML, IdP, Google Workspace]
authors: [UsherFall]
---

This guide explains how to use Casdoor as the SAML identity provider (IdP) for single sign-on (SSO) to Google Workspace.

---

#### Learning outcomes

- Create a certificate for the SAML responses.
- Configure a Casdoor application for Google Workspace.
- Add Casdoor as a third-party IdP in Google Workspace.
- Sign in to Google through Casdoor.

#### What you need

- A Google Workspace domain with administrator access
- An [application](/docs/application/overview) in Casdoor

---

## Create a certificate in Casdoor {#add-a-certificate-in-casdoor}

1. In the Casdoor admin console, add an X.509 certificate with the RSA algorithm. See [Certificates](/docs/cert/overview).
1. Download the certificate.

   ![Certificate edit page in Casdoor](/img/how-to-connect/saml/saml_google-workspace_cert.png)

## Configure the Casdoor application {#configure-the-saml-application-in-casdoor}

1. Open the edit page of the application.
1. In **Cert**, select the certificate, and add your Google domain, for example `google.com`, to **Redirect URLs**.

   ![Certificate and Redirect URLs of the application](/img/how-to-connect/saml/saml_google-workspace_app.png)

1. Set **SAML reply URL** to `https://www.google.com/a/<your-domain>/acs`. For the ACS URL, see [SSO assertion requirements](https://support.google.com/a/answer/6330801) in the Google Workspace help.

   ![SAML reply URL for Google Workspace](/img/how-to-connect/saml/saml_google-workspace_acs.png)

1. Copy the URL of the sign-in page of the application.

   ![Sign-in page URL of the application](/img/how-to-connect/saml/saml_google-workspace_login.png)

1. Save the application.

## Add Casdoor as an IdP in Google Workspace {#add-third-party-saml-idp-in-google-workspace}

1. In the Google Workspace Admin console, go to **Security** > **Overview** and find **SSO with third-party IdP**.
1. Click **Add SSO profile** and turn on **Set up SSO with third-party identity provider**.
1. Paste the URL of the Casdoor sign-in page into **Sign-in page URL** and into **Sign-out page URL**.
1. Upload the certificate that you downloaded from Casdoor, and save.

   ![SSO profile in the Google Workspace Admin console](/img/how-to-connect/saml/saml_google-workspace_conf.png)

## Verify the result {#test-with-a-user}

1. In Google Workspace, create a user, for example with the username `test`.

   ![New user in Google Workspace](/img/how-to-connect/saml/saml_google-workspace_user.png)

1. In Casdoor, create a user with the same username in the organization of the application, and set the email address of the user.

   ![New user in Casdoor](/img/how-to-connect/saml/saml_google-workspace_test.png)

1. Open a Google application, such as google.com, and sign in with the email address of the user. Google redirects you to Casdoor.
1. Sign in to Casdoor. Casdoor sends you back to Google, signed in.

   ![Recording of the sign-in to Google through Casdoor](/img/how-to-connect/saml/saml_google-workspace_test_gif.gif)

## See also

- [Use Casdoor as a SAML identity provider](/docs/how-to-connect/saml/overview)
- [Google Workspace syncer](/docs/syncer/GoogleWorkspace)
