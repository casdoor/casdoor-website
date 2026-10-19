---
title: RADIUS MFA
description: Use an external RADIUS server as an MFA provider.
keywords: [RADIUS, MFA, provider, authentication, Message-Authenticator, Blast-RADIUS]
authors: []
---

A RADIUS (Remote Authentication Dial-In User Service) provider lets Casdoor check the second factor of multi-factor authentication (MFA) against your RADIUS server.

## Configure the provider

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `MFA` and **Type** to `RADIUS`.
1. Fill in the fields:

   | Field | Description |
   |---|---|
   | **Host** | IP address or host name of the RADIUS server, for example `10.10.10.10` |
   | **Port** | Port of the RADIUS server. The default is `1812` |
   | **Client secret** | Shared secret that the RADIUS server has for Casdoor |
   | **Require Message-Authenticator** | Rejects RADIUS responses that don't carry a valid `Message-Authenticator` attribute. On by default for new providers |

1. Save the provider.

## Message-Authenticator

Casdoor signs every Access-Request that it sends with a `Message-Authenticator` attribute (RFC 2869). With **Require Message-Authenticator** on, Casdoor also rejects every response that has no valid `Message-Authenticator`. This protects against the Blast-RADIUS attack, in which an attacker on the network forges an Access-Accept response.

Turn the switch off only for an old RADIUS server that doesn't send the attribute. Providers created before this option existed have it turned off: turn it on after you check that your server sends the attribute.

## Use in an application

Add the RADIUS provider to the providers of your application. Users can then choose RADIUS as their MFA method. During setup and sign-in, they enter their RADIUS username and password, and Casdoor forwards the check to your RADIUS server.

## See also

- [Providers](/docs/provider/overview)
- [RADIUS server](/docs/radius/overview)
