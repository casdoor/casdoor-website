---
title: Envoy
description: Using Casdoor in Envoy
keywords: [envoy]
authors: [SkipperQ]
---

## Prerequisites

A running Casdoor server. See [Server installation](/docs/basic/server-installation) and [Try with Docker](/docs/basic/try-with-docker).

## Configuring Casdoor

1. Add the **Envoy** application. In the **Redirect URLs** field, enter the URL of the Envoy instance including the port number, and ending with **/oauth2/callback** (e.g., http://%REQ(:authority)%/oauth2/callback). Make a note of the values in the Client ID and Client Secret.
2. Add the **envoy-casdoor-role** role.
3. Add the **user1** user. Select **Envoy** in the Signup application. In the **Managed accounts** field, select **Envoy** in the Application dropdown and fill in the username and password. Go back to the **Roles** page and click "Edit" on the envoy-casdoor-role row. In the opened page, in the **Sub users** field, select the username you just created (in this case, it is built-in/user1).

## Configure Envoy

1. Modify the `token_endpoint`, `authorization_endpoint`, and `client_id` in the **envoy.yaml** file.
2. Modify the `inline_string` in the **token-secret.yaml** file to the Client Secret of Envoy from Casdoor.
3. Modify the `inline_bytes` in the **hmac-secret.yaml** file with a unique, long, and secure phrase.
4. Add the **envoy.yaml**, **token-secret.yaml**, and **hmac-secret.yaml** files to your Envoy path.

## How to Run

1. Start Envoy using the **envoy.yaml** file.
2. Go to the website where Envoy is listening. You should immediately be redirected to Casdoor for user authentication.
