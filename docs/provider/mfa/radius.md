---
title: RADIUS MFA
description: Use an external RADIUS server as an MFA provider.
keywords: [RADIUS, MFA, provider, authentication]
authors: []
---

**RADIUS** (Remote Authentication Dial-In User Service) providers let Casdoor verify a second factor against your RADIUS server during MFA.

## Configure the provider

1. **Providers** → **Add**.
2. Set **Category** to **MFA**, **Type** to **RADIUS**.
3. Fill in:
   - **Host** — RADIUS server IP or hostname (e.g. `10.10.10.10`)
   - **Port** — RADIUS port (default `1812`)
   - **Client Secret** — Shared secret configured on the RADIUS server
4. Save.

## Use in an application

Add the RADIUS provider to your application’s provider list. Users can then choose RADIUS as their MFA method. During setup and sign-in, they enter their RADIUS username and password; Casdoor forwards the check to your RADIUS server.
