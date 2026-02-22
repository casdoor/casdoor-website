---
title: Appgate (SAML POST)
description: Use Casdoor as SAML IdP for Appgate SDP (POST SAMLResponse).
keywords: [SAML, IdP, Appgate]
authors: [leo220yuyaodog]
---

**Appgate** accepts `SAMLResponse` via POST. This guide applies when using Casdoor as the SAML IdP for Appgate (and for other SPs that support POST).

## Casdoor configuration

Create or edit the application in Casdoor and set:

| Setting | Value |
|--------|--------|
| **Redirect URL** | Unique identifier (Audience/Entity ID in the SP). Use the value from the table below. |
| **Reply URL** | ACS URL that receives and verifies the SAML response. |

| Use case | Redirect URL | SAML Reply URL |
|----------|--------------|----------------|
| Administrator auth | `AppGate` | `https://mycontroller.your-site-url.com/admin/saml` |
| User auth | `AppGate Client` | `https://redirectserver.your-site-url.com/saml` |

![Entity ID](/img/how-to-connect/saml/saml_entityId.png)
![Reply URL](/img/how-to-connect/saml/saml_replyURL.png)

Download the **SAML metadata** (copy the metadata URL and open it in a browser to save the XML).

![metadata](/img/how-to-connect/saml/saml_metadata_url.png)

## Add SAML IdP in Appgate

1. In **AppGate SDP Console** → **System** → **Identity Providers**, create a new provider and choose **SAML**.
2. Set **Name** (e.g. "Casdoor SAML Admin"). For **Single Sign-on URL**, **Issuer**, and **Public Certificate**, upload the metadata file so they are filled automatically.
3. Set **Audience** to the **Redirect URL** you configured in Casdoor.

Upload the metadata via **Choose a file** to autocomplete Single Sign-On URL, Issuer, and Public Certificate.

## Map attributes

Map the **Name** attribute to **username**.

![map_attribute](/img/how-to-connect/saml/saml_map_attribute.png)

## Test

1. Log out of the AppGate admin UI.
2. Sign in with **Identity Provider** set to your Casdoor IdP and **Sign in with browser**.
3. A message like "You don't have any administration rights" indicates the IdP authenticated the user; adjust Appgate roles/policies as needed.

## Access policy

Update the **Builtin Administrator Policy** (or equivalent) so administrators can sign in via the SAML IdP.

![appgate_policy.png](/img/how-to-connect/saml/saml_appgate_policy.png)
