---
title: Envoy
description:  Using Casdoor in Envoy
keywords: [envoy]
authors: [SkipperQ]
---

## Prerequisites

A running Casdoor server. See the Casdoor documentation for [Server Installation](https://casdoor.org/docs/basic/server-installation) and [Try with Docker](https://casdoor.org/docs/basic/try-with-docker).

## Configuring Casdoor

1. Add **Application** "Envoy". In the **Redirect URLs** field, type the URL of the Envoy instance including the port number, and ending in **/oauth2/callback** (in this sample, http://%REQ(:authority)%/oauth2/callback ), record the values in the Client ID and Client Secret.
2. Add **Roles** "envoy-casdoor-role". 
3. Add **Users** "user1". Select **Envoy** in Signup application. In the **Managed accounts** field, select **Envoy** in Application and fill in the username and password. Go back to the **Roles** page and click Edit on the envoy-casdoor-role row. In the opened page, in the **Sub users** field, select the username you just created(here it is built-in/user1)

## Configure Envoy

1. Modify token_endpoint, authorization_endpoint and client_id in **envoy.yaml**.
2. Modify inline_string in **token-secret.yaml** to the Client Secret of Envoy from casdoor.
3. Modify inline_bytes in **hmac-secret.yaml** with a unique, long, and secure phrase.
4. Add **envoy.yaml**, **token-secret.yaml**, **hmac-secret.yaml** to your Envoy path.

## How to Run

1. Start Envoy via **envoy.yaml**.
2. Go to the website where Envoy listens. You should see immediate redirect to casdoor for user auth.
