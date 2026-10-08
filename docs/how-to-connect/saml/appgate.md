---
title: Connect Appgate SDP with SAML
sidebar_label: Appgate (SAML POST)
description: Use Casdoor as the SAML identity provider of Appgate SDP, which receives the SAML response by POST.
keywords: [SAML, IdP, Appgate]
authors: [leo220yuyaodog]
---

This guide explains how to use Casdoor as the SAML identity provider (IdP) of Appgate SDP. Appgate receives the `SAMLResponse` in an HTTP `POST` request. The same steps apply to other service providers that use the POST binding.

---

#### Learning outcomes

- Configure a Casdoor application for the POST binding.
- Add Casdoor as a SAML identity provider in Appgate.
- Map the username attribute and allow administrators to sign in.

#### What you need

- An Appgate SDP deployment with administrator access
- An [application](/docs/application/overview) in Casdoor

---

## Configure the Casdoor application {#casdoor-configuration}

1. In the Casdoor admin console, open the edit page of the application.
1. Set the following fields:

   | Field | Value |
   |---|---|
   | **Redirect URLs** | The identifier of the service provider, which Appgate calls the audience |
   | **SAML reply URL** | The ACS URL, which receives and verifies the SAML response |

   Use the values for your use case:

   | Use case | Redirect URL | SAML Reply URL |
   |----------|--------------|----------------|
   | Administrator auth | `AppGate` | `https://mycontroller.your-site-url.com/admin/saml` |
   | User auth | `AppGate Client` | `https://redirectserver.your-site-url.com/saml` |

   ![Redirect URLs field with the entity ID](/img/how-to-connect/saml/saml_entityId.png)

   ![SAML reply URL field](/img/how-to-connect/saml/saml_replyURL.png)

1. Download the SAML metadata: copy the metadata URL, open it in a browser, and save the XML file.

   ![SAML metadata URL of the application](/img/how-to-connect/saml/saml_metadata_url.png)

## Add the SAML IdP in Appgate

1. In the Appgate SDP console, go to **System** > **Identity Providers** and create a provider of type **SAML**.
1. Enter a **Name**, for example `Casdoor SAML Admin`.
1. Click **Choose a file** and upload the metadata file. Appgate fills in **Single Sign-on URL**, **Issuer**, and **Public Certificate**.
1. Set **Audience** to the value that you entered in **Redirect URLs** in Casdoor.

## Map attributes

Map the `Name` attribute to `username`.

![Attribute mapping in Appgate](/img/how-to-connect/saml/saml_map_attribute.png)

## Allow administrators to sign in {#access-policy}

Update the **Builtin Administrator Policy**, or your own equivalent policy, so that administrators who sign in through the SAML IdP receive administration rights.

![Builtin Administrator Policy in Appgate](/img/how-to-connect/saml/saml_appgate_policy.png)

## Verify the result {#test}

1. Sign out of the Appgate admin UI.
1. On the sign-in page, select your Casdoor IdP as the **Identity Provider** and click **Sign in with browser**.
1. Sign in to Casdoor.

If Appgate shows a message such as "You don't have any administration rights", the IdP authenticated you, but the policy doesn't grant you rights yet. Adjust the roles and policies in Appgate.

## See also

- [Use Casdoor as a SAML identity provider](/docs/how-to-connect/saml/overview)
