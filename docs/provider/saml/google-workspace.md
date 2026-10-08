---
title: Add Google Workspace as a SAML provider
sidebar_label: Google Workspace
description: Let users sign in to Casdoor with their Google Workspace account through SAML.
keywords: [Google Workspace, SAML]
authors: [nomeguy]
---

This guide explains how to let users sign in to Casdoor with their Google Workspace account through SAML.

---

#### Learning outcomes

- Create a custom SAML app for Casdoor in Google Workspace.
- Add Google Workspace as a SAML provider in Casdoor.

#### What you need

- Administrator access to the Google Admin console
- Administrator access to the Casdoor admin console

---

## Create a SAML app in Google Workspace {#configure-saml-app-in-google-workspace}

1. In the Google Admin console (admin.google.com), go to **Apps** > **Web and mobile apps**.
1. Click **Add App** > **Add custom SAML app**.
1. Enter an **App name**, for example `Casdoor`, and optionally an icon. Click **Continue**.
1. Download the metadata, or note the **SSO URL**, the **Entity ID**, and the **Certificate**. Click **Continue**.
1. Enter the service provider details:

   | Field | Value |
   |---|---|
   | **ACS URL** | `https://<your-casdoor-domain>/api/acs`, for example `https://door.example.com/api/acs` |
   | **Entity ID** | The same URL |
   | **Name ID format** | `EMAIL` |
   | **Name ID** | **Basic Information** > **Primary email** |

   Google Workspace sends the response with HTTP POST, which the `/api/acs` endpoint requires. Click **Continue**.

1. Optionally, map attributes, for example `email` to **Primary email**, and `displayName` to **First name** and **Last name**. Click **Finish**.
1. Turn the app **ON** for your organization or for the organizational units that may sign in.

## Add the provider in Casdoor {#configure-saml-provider-in-casdoor}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `SAML` and **Type** to `Custom`.
1. Paste the metadata from Google Workspace into **Metadata** and click **Parse**.
1. Check that **SP ACS URL** and **SP Entity ID** are `https://<your-casdoor-domain>/api/acs`, and save the provider.
1. Open the edit page of your application, add the provider on the **Providers** tab, and save.

## Verify the result {#test-the-integration}

Open the sign-in page of the application and click the Google Workspace button.

## See also

- [SAML providers](/docs/provider/saml/overview)
- [Connect Google Workspace with SAML](/docs/how-to-connect/saml/google-workspace): Casdoor as the IdP of Google Workspace.
