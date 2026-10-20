---
title: Joplin Server
description: Sign in to Joplin Server, in the browser and in the Joplin apps, with Casdoor as the SAML 2.0 identity provider.
keywords: [Joplin, Joplin Server, SAML, SSO, notes]
authors: [casdoor]
---

[Joplin](https://joplinapp.org/) is an open source note-taking app, and Joplin Server is its self-hosted sync server. Since version 3.4.1, Joplin Server can sign users in through a SAML 2.0 identity provider (IdP). With Casdoor as the IdP, users sign in to Joplin Server, and to the Joplin apps that sync with it, with their Casdoor account.

Joplin Server checks the SAML response with [samlify](https://github.com/tngan/samlify) and [xml-crypto](https://github.com/node-saml/xml-crypto). xml-crypto doesn't support XML canonicalization 1.1, which Casdoor signs with by default, so the application in Casdoor must have **Enable SAML C14N10** on. Use the latest Casdoor version: older versions sign such responses in a way that Joplin Server rejects, with `FAILED_TO_VERIFY_SIGNATURE` or with an XML schema error.

The examples use `https://joplin.example.com` for Joplin Server and `https://door.example.com` for Casdoor.

## Create the application in Casdoor

1. In the Casdoor admin console, open the organization of your users and add an application, or open an existing one.
1. Add the entity ID of Joplin Server and its Assertion Consumer Service (ACS) URL to **Redirect URLs**. The entity ID is the `entityID` in the service provider (SP) file that you write [below](#prepare-joplin-server), `Joplin` in the example. The ACS URL is `<APP_BASE_URL>/api/saml`:

   ```text
   Joplin
   https://joplin.example.com/api/saml
   ```

1. On the **SAML** tab:
   - Turn on **Enable SAML C14N10**, and leave **SAML C14N10 prefix** empty.
   - Turn on **Enable SAML POST binding**. Joplin Server sends its request to Casdoor with the HTTP-POST binding, so the metadata must list the HTTP-POST endpoint of Casdoor.
   - Add two rows to **SAML attributes**. Joplin Server reads only these two attributes, and the names are case-sensitive: the `Email` and `DisplayName` attributes that Casdoor sends by default don't count.

     | Name | Name format | Value |
     |---|---|---|
     | `email` | Basic | `$user.email` |
     | `displayName` | Basic | `$user.displayName` |

     Every user needs an email address in Casdoor. Joplin Server identifies the user by it.

1. Save, and click **Copy SAML metadata URL**. With **Enable SAML POST binding** on, the URL ends with `enablePostBinding=true`:

   ```text
   https://door.example.com/api/saml/metadata?application=admin/<application-name>&enablePostBinding=true
   ```

1. Open the URL and save the XML as `idp.xml`. Joplin Server reads the IdP metadata from a file, not from a URL.

## Prepare Joplin Server

1. Write the SP file `sp.xml`. Set `entityID` to the entity ID that you added to **Redirect URLs**, and `Location` to the ACS URL:

   ```xml
   <?xml version="1.0"?>
   <md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" entityID="Joplin">
     <md:SPSSODescriptor AuthnRequestsSigned="false" WantAssertionsSigned="false" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
       <md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</md:NameIDFormat>
       <md:AssertionConsumerService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://joplin.example.com/api/saml" index="1" />
     </md:SPSSODescriptor>
   </md:EntityDescriptor>
   ```

1. Put `idp.xml` and `sp.xml` where Joplin Server can read them. With Docker, mount a directory, for example `./saml:/saml:ro` in `docker-compose.yml`.
1. Set the environment variables of Joplin Server, for example in its `.env` file:

   ```ini
   APP_BASE_URL=https://joplin.example.com
   API_BASE_URL=https://joplin.example.com
   SAML_ENABLED=true
   SAML_IDP_CONFIG_FILE=/saml/idp.xml
   SAML_SP_CONFIG_FILE=/saml/sp.xml
   SAML_ORGANIZATION_DISPLAY_NAME=Casdoor
   DELETE_EXPIRED_SESSIONS_SCHEDULE=
   ```

   | Variable | Description |
   |---|---|
   | `APP_BASE_URL`, `API_BASE_URL` | SAML needs both set to the same URL. |
   | `SAML_ENABLED` | Turns on SAML sign-in. |
   | `SAML_IDP_CONFIG_FILE` | The path of the IdP metadata from Casdoor. |
   | `SAML_SP_CONFIG_FILE` | The path of the SP file. |
   | `SAML_ORGANIZATION_DISPLAY_NAME` | Optional. The name that the sign-in page shows above the SAML button. |
   | `DELETE_EXPIRED_SESSIONS_SCHEDULE` | Joplin Server clears sessions every 6 hours by default, and SAML users then have to sign in again by hand. An empty value turns this off. |

   To allow only SAML sign-in, also set `LOCAL_AUTH_ENABLED=false`.

1. Restart Joplin Server.

## Verify the result

1. Open `https://joplin.example.com/login` in a private browser window and click **Login using your organisation account**.
1. Sign in to Casdoor. Joplin Server opens its home page with the Casdoor user signed in. A user who doesn't exist yet in Joplin Server is created at this first sign-in, with the email and display name from Casdoor.
1. In a Joplin app, choose **Joplin Server (SAML)** as the synchronization target and enter `https://joplin.example.com`. The app opens the sign-in in the browser. After you sign in to Casdoor, Joplin Server shows a code, which you enter in the app to start syncing.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Joplin Server logs `FAILED_TO_VERIFY_SIGNATURE: POST /api/saml` | Update Casdoor to the latest version. If it persists, download the metadata again: Joplin Server must have the certificate of the application's current **Cert**. |
| Joplin Server logs `canonicalization algorithm 'http://www.w3.org/2006/12/xml-c14n11' is not supported` | Turn on **Enable SAML C14N10** on the application. |
| Joplin Server logs `ERR_EXCEPTION_VALIDATE_XML`, about `xs:string` without a namespace declaration | Update Casdoor to the latest version. Older versions drop the `xs` namespace from the response when they sign it. |
| `email must be a string` or `displayName must be a string` | Add the `email` and `displayName` rows to **SAML attributes**, with these exact names, and check that **Disable SAML attributes** is off. |
| `Could not login using email "..."` | Joplin Server already has a local account with a password for this email, and doesn't let SAML sign in to it. Delete or rename the local account in Joplin Server. |
| The browser opens a Joplin Server URL that ends with `[object Object]` | The IdP metadata has no HTTP-POST endpoint. Turn on **Enable SAML POST binding**, and download the metadata again with `enablePostBinding=true`. |
| Casdoor shows `Issuer URI: Joplin doesn't exist in the allowed Redirect URI list` | Add the `entityID` of `sp.xml` to **Redirect URLs**. |
| Casdoor shows `AssertionConsumerServiceURL: ... doesn't match the SAML reply URL or the allowed Redirect URI list` | Add `<APP_BASE_URL>/api/saml` to **Redirect URLs**. |

## See also

- [Joplin Server SAML support](https://joplinapp.org/help/apps/server/saml/) in the Joplin documentation
- [Use Casdoor as a SAML identity provider](/docs/how-to-connect/saml/overview)
