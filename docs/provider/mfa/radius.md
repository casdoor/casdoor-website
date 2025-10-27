---
title: RADIUS
description: Configure RADIUS provider for MFA
keywords: [RADIUS, MFA, provider, authentication]
authors: []
---

RADIUS (Remote Authentication Dial-In User Service) providers allow Casdoor to authenticate users against external RADIUS servers during multi-factor authentication.

## Configure RADIUS Provider

To add a RADIUS provider for MFA:

1. Navigate to the **Providers** page and click **Add**.

2. Set the **Category** to **MFA** and **Type** to **RADIUS**.

3. Configure the following fields:

   - **Host**: The IP address or hostname of your RADIUS server (e.g., `10.10.10.10`)
   - **Port**: The RADIUS server port (default is `1812`)
   - **Client Secret**: The shared secret configured on your RADIUS server for authenticating requests

4. Click **Save** to create the provider.

## Use in Application

After creating the RADIUS provider, add it to your application:

1. Go to your application's edit page.

2. Add the RADIUS provider to the **Providers** list.

3. Users can now select RADIUS as their MFA method when configuring multi-factor authentication.

During MFA setup and authentication, users will be prompted to enter their RADIUS username and password, which will be verified against the configured RADIUS server.
