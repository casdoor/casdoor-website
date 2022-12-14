---
title: Appgate
description: How to use Casdoor as SAML IdP for Appgate
keywords: [SAML, IdP, Appgate]
authors: [leo220yuyaodog]
---

## Casdoor as a SAML IdP in Appgate

### Casdoor configuration

Go to your Casdoor and add a new application.

**Enter basic SAML configuration in the application**:

- Redirect URLs – Type in a unique name, see the table below
- Reply URL – type in the URL of the ACS verifying the SAML response, refer to the table below

| Administrator Authentication                                   | User Authentication                                        |
|:-------------------------------------------------------------- | ---------------------------------------------------------- |
| Redirect URL = “AppGate”                                       | Redirect URL = “AppGate Client”                            |
| SAML Reply URL = https://mycontroller.mycompany.com/admin/saml | SAML Reply URL = https://redirectserver.mycompany.com/saml |

**Download the XML metadata file**

You can copy the URl of metadata and download the file from your browser.

![metadata](/img/how-to-connect/saml/saml_matedata_url.png)

### Add SAML IdP in Appgate

**In your AppGate SDP console**:

- Select System > Identity Providers

- Create a new Identity Provider

- Choose the type SAML

- Start configuring your identity provider following the details in the tables below

|                    | Administrator Authentication                              |
|:------------------:| --------------------------------------------------------- |
| Name               | Enter a unique name eg: "Casdoor SAML Admin"              |
| Single Sign-on URL | See below                                                 |
| Issuer             | See below                                                 |
| Audience           | Type in the **Redirect URL** from the Casdoor application |
| Public Certificate | See below                                                 |

- Upload the XML Metadata file to autocomplete **Single Sign-On**, **Issuer** and **Public Certificate fields**

- Click **Choose a file** and select the metadata file that you created previously - this will autocomplete the relevant fields

### Map Attributes

Mapping the **Name** to **username**, your completed form should look something like this:
![map_attribute](/img/how-to-connect/saml/saml_map_attribute.png)

### Test Integration

On your AppGate SDP Controller console:

- Log out of the admin UI

- Log in using the following information:

- Identity Provider – choose your Azure IdP from the drop down list

- Click **Sign in with browser** to connect to your authenticator

- You may see the following message:
  “You don’t have any administration rights” – this confirms that the test user credentials have been
  successfully authenticated by your Identity Provider.

### Access Policy

Your need to modify the access policy that the administrator can log in the Appgate by the SAML idp. Enter Builtin Administrator Policy:

Your completed form should look something like this:
![appgate_policy.png](/img/how-to-connect/saml/saml_appgate_policy.png)
