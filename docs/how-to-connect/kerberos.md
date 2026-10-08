---
title: Set up Kerberos sign-in
sidebar_label: Kerberos/SPNEGO
description: Configure Kerberos/SPNEGO (Integrated Windows Authentication), so that users on domain-joined machines sign in to Casdoor without entering credentials.
keywords: [Kerberos, SPNEGO, IWA, Integrated Windows Authentication, SSO]
authors: [hsluoyz]
---

This guide explains how to set up Kerberos/SPNEGO sign-in, also known as Integrated Windows Authentication. Users who are already authenticated against a Kerberos Key Distribution Center (KDC), typically Active Directory, then sign in to Casdoor without entering credentials.

---

#### Learning outcomes

- Generate a keytab for the Casdoor service principal.
- Configure Kerberos for an organization.
- Map Kerberos principals to Casdoor users.
- Start a Kerberos sign-in for an application.

#### What you need

- An Active Directory domain, or another Kerberos realm, and the rights to create a service principal in it
- Client machines that are joined to the domain, in the same Kerberos realm as the Casdoor server
- A Casdoor [organization](/docs/organization/overview) whose users correspond to the domain users

---

## About Kerberos sign-in

1. The browser requests the Casdoor endpoint `/api/kerberos-login?application=<application-name>`.
1. If the request has no `Authorization: Negotiate` header, Casdoor answers with HTTP 401 and the header `WWW-Authenticate: Negotiate`.
1. The browser gets a Kerberos service ticket and sends it as a SPNEGO token in the header `Authorization: Negotiate <base64-token>`.
1. Casdoor validates the token with the keytab of the organization and maps the Kerberos principal to a Casdoor user.
1. Casdoor signs the user in and issues an authorization code or a session, as with any other sign-in method.

:::caution
The browser and the Casdoor server must be in the same Kerberos realm, and the client machine must be joined to the domain. Authentication across realms needs trust between the KDCs, which you configure outside Casdoor.
:::

## Generate the keytab {#generating-the-keytab}

1. On a Windows domain controller, create the keytab for the service principal of Casdoor:

   ```powershell
   ktpass -princ HTTP/casdoor.corp.example.com@CORP.EXAMPLE.COM ^
          -mapuser casdoor-svc@corp.example.com ^
          -crypto AES256-SHA1 ^
          -ptype KRB5_NT_PRINCIPAL ^
          -pass * ^
          -out casdoor.keytab
   ```

1. Encode the file with Base64:

   ```bash
   # Linux/macOS
   base64 casdoor.keytab
   ```

## Configure the organization {#configuration}

Kerberos is configured per organization.

1. In the Casdoor admin console, open the edit page of the organization.
1. Fill in the following fields:

   | Field | Description |
   |-------|-------------|
   | **Kerberos realm** | The Kerberos realm name, typically the uppercase domain (e.g. `CORP.EXAMPLE.COM`). |
   | **Kerberos KDC host** | Hostname or IP of the Key Distribution Center (e.g. `dc.corp.example.com`). |
   | **Kerberos keytab** | Base64-encoded keytab file for the service principal. |
   | **Kerberos service name** | Service principal prefix (default: `HTTP`). The full SPN is `<service-name>/<hostname>@<realm>`. |

1. Save the organization.

## Map principals to users {#user-matching}

After Casdoor has validated the SPNEGO token, it looks for a user of the organization whose `kerberosName` matches the Kerberos principal, for example `alice@CORP.EXAMPLE.COM`. If no user matches, the sign-in fails.

Create the Casdoor users in advance and set the Kerberos principal name of each one.

## Start a Kerberos sign-in {#endpoint}

Send the browser to the following endpoint, directly or through your reverse proxy:

```http
GET /api/kerberos-login?application=<application-name>
```

Casdoor signs the user in to the application that the `application` parameter names.

## See also

- [LDAP](/docs/ldap/overview)
- [Active Directory syncer](/docs/syncer/ActiveDirectory)
- [Set up single sign-on](/docs/session/single-sign-on)
