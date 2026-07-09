---
title: Kerberos/SPNEGO authentication
description: Configure Kerberos/SPNEGO (Integrated Windows Authentication) for single sign-on.
keywords: [Kerberos, SPNEGO, IWA, Integrated Windows Authentication, SSO]
authors: [hsluoyz]
---

Casdoor supports **Kerberos/SPNEGO** (Integrated Windows Authentication) for seamless SSO in enterprise environments where users are already authenticated against a Kerberos Key Distribution Center (KDC), typically Active Directory. The browser presents a SPNEGO token transparently — users sign in without entering credentials.

## How it works

1. The browser requests the Casdoor endpoint `/api/kerberos-login?application=<app-name>`.
2. If no `Authorization: Negotiate` header is present, Casdoor responds with `401 WWW-Authenticate: Negotiate`.
3. The browser obtains a Kerberos service ticket and sends it as a SPNEGO token in `Authorization: Negotiate <base64-token>`.
4. Casdoor validates the token using the organization's keytab and maps the Kerberos principal name to a Casdoor user.
5. On success, Casdoor signs the user in and issues an authorization code or session as usual.

## Configuration

Kerberos settings are per organization. Open the organization edit page and fill in the following fields:

| Field | Description |
|-------|-------------|
| **Kerberos realm** | The Kerberos realm name, typically the uppercase domain (e.g. `CORP.EXAMPLE.COM`). |
| **Kerberos KDC host** | Hostname or IP of the Key Distribution Center (e.g. `dc.corp.example.com`). |
| **Kerberos keytab** | Base64-encoded keytab file for the service principal. |
| **Kerberos service name** | Service principal prefix (default: `HTTP`). The full SPN is `<service-name>/<hostname>@<realm>`. |

## Generating the keytab

On a Windows domain controller, run:

```powershell
ktpass -princ HTTP/casdoor.corp.example.com@CORP.EXAMPLE.COM ^
       -mapuser casdoor-svc@corp.example.com ^
       -crypto AES256-SHA1 ^
       -ptype KRB5_NT_PRINCIPAL ^
       -pass * ^
       -out casdoor.keytab
```

Then base64-encode the file and paste the result into **Kerberos keytab**:

```bash
# Linux/macOS
base64 casdoor.keytab
```

## User matching

After the SPNEGO token is validated, Casdoor looks up a user in the organization whose `kerberosName` attribute matches the Kerberos principal (e.g. `alice@CORP.EXAMPLE.COM`). If no user is found, the login fails. Pre-create Casdoor users and set their Kerberos principal name to enable the mapping.

## Endpoint

```http
GET /api/kerberos-login?application=<application-name>
```

Point the browser or your reverse proxy to this URL to initiate Kerberos authentication for the specified application.

:::caution

Kerberos authentication requires the browser and Casdoor server to be in the same Kerberos realm, and the client machine must be domain-joined. Cross-realm authentication requires additional KDC-level trust configuration outside of Casdoor.

:::
