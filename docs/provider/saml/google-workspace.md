---
title: Google Workspace
description: Using Google Workspace as SAML IdP
keywords: [Google Workspace, SAML]
authors: [nomeguy]
---

Configure Google Workspace as a SAML IdP so users can sign in with their Google Workspace accounts.

## Configure SAML App in Google Workspace

Access the Google Admin Console (admin.google.com) and navigate to **Apps** > **Web and mobile apps**.

Click **Add App** > **Add custom SAML app**.

### Basic Information

Enter an **App name** (e.g., "Casdoor") and optionally upload an app icon. Click **Continue**.

### Google Identity Provider Details

Download the metadata or note the following values provided by Google:

- **SSO URL**
- **Entity ID**
- **Certificate**

Click **Continue**.

### Service Provider Details

Configure Casdoor as the Service Provider with the following values:

- **ACS URL**: `https://<your-casdoor-domain>/api/acs`
  - Example: `https://door.example.com/api/acs`
- **Entity ID**: `https://<your-casdoor-domain>/api/acs`
  - Use the same URL as ACS URL
- **Name ID format**: `EMAIL`
- **Name ID**: `Basic Information > Primary email`

:::note

The `/api/acs` endpoint only accepts POST requests. Google Workspace uses POST binding by default.

:::

Click **Continue**.

### Attribute Mapping

Configure attribute mapping (optional):

- **email** → **Primary email**
- **displayName** → **First name** and **Last name**

Click **Finish**.

### Enable the App

After creating the app, make sure to turn it **ON** for your organization or specific organizational units.

## Configure SAML Provider in Casdoor

In the Casdoor admin console, navigate to **Providers** and click **Add**.

Select the following:

- **Category**: `SAML`
- **Type**: `Custom`
- **Metadata**: Paste the metadata downloaded from Google Workspace, or manually enter the SSO URL, Entity ID, and certificate.

Click **Parse** to automatically fill in the fields, then click **Save**.

Copy the generated **SP ACS URL** and **SP Entity ID** values (they should match `https://<your-casdoor-domain>/api/acs`).

## Add Provider to Application

Edit your Casdoor application and add the Google Workspace SAML provider to the **Providers** list. Click **Save**.

## Test the Integration

Navigate to your Casdoor application's login page. You should see a Google Workspace login option. Click it to test the SAML authentication flow.
