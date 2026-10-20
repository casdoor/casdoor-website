---
title: Connect a standard OIDC client
sidebar_label: Standard OIDC client
description: Point any OpenID Connect client library at the Casdoor discovery endpoint, and learn what the discovery document and the UserInfo endpoint return.
keywords: [OIDC, discovery, client, migration]
authors: [nomeguy]
---

This guide explains how to connect an application to Casdoor with a standard OpenID Connect (OIDC) client library, and it describes the discovery endpoints and the UserInfo fields that the library relies on.

---

#### Learning outcomes

- Find the discovery URL of your Casdoor instance.
- Configure an OIDC client library with the discovery URL and the application credentials.
- Use the discovery endpoints of a single application.
- Map the UserInfo fields to the fields of a Casdoor user.

#### What you need

- A running Casdoor instance. The examples use the demo site `https://door.casdoor.com`.
- An [application](/docs/application/overview) in Casdoor, with its client ID, its client secret, and the callback URL of your application in **Redirect URLs**
- An OIDC client library for your language

---

## Configure the client

Casdoor is a complete OIDC provider. If your application already uses an OIDC library with another identity provider, you switch to Casdoor by changing the configuration.

1. Choose a library. For example:

   | OIDC client library | Language | Link                                                   |
   |---------------------|----------|--------------------------------------------------------|
   | go-oidc             | Go       | `https://github.com/coreos/go-oidc`                      |
   | pac4j-oidc          | Java     | `https://www.pac4j.org/docs/clients/openid-connect.html` |

   For more libraries, see [oauth.net/code](https://oauth.net/code/) and the [certified OpenID developer tools](https://openid.net/certified-open-id-developer-tools/).

1. Give the library the following values:

   | Setting | Value |
   |---|---|
   | Issuer or discovery URL | `https://<your-casdoor-host>`. The library appends `/.well-known/openid-configuration` |
   | Client ID | **Client ID** of the Casdoor application |
   | Client secret | **Client secret** of the Casdoor application |
   | Redirect URL | Callback URL of your application. It must be listed in **Redirect URLs** of the Casdoor application |
   | Scopes | `openid`, plus `profile` and `email` as needed |

The library reads the endpoints and the capabilities of Casdoor from the discovery document, so you don't configure them by hand.

## Discovery endpoints

Casdoor publishes its metadata at two URLs. Both return the same document.

| Standard | URL |
|---|---|
| OpenID Connect Discovery | `https://<your-casdoor-host>/.well-known/openid-configuration` |
| OAuth 2.0 Authorization Server Metadata (RFC 8414) | `https://<your-casdoor-host>/.well-known/oauth-authorization-server` |

Use the second URL if your client supports only OAuth 2.0.

For example, `https://door.casdoor.com/.well-known/openid-configuration` returns:

```json
{
  "issuer": "https://door.casdoor.com",
  "authorization_endpoint": "https://door.casdoor.com/login/oauth/authorize",
  "token_endpoint": "https://door.casdoor.com/api/login/oauth/access_token",
  "token_endpoint_auth_methods_supported": [
    "client_secret_basic",
    "client_secret_post",
    "private_key_jwt",
    "none"
  ],
  "userinfo_endpoint": "https://door.casdoor.com/api/userinfo",
  "device_authorization_endpoint": "https://door.casdoor.com/api/device-auth",
  "registration_endpoint": "https://door.casdoor.com/api/oauth/register",
  "jwks_uri": "https://door.casdoor.com/.well-known/jwks",
  "introspection_endpoint": "https://door.casdoor.com/api/login/oauth/introspect",
  "response_types_supported": [
    "code",
    "token",
    "id_token",
    "code token",
    "code id_token",
    "token id_token",
    "code token id_token"
  ],
  "response_modes_supported": [
    "query",
    "fragment",
    "form_post"
  ],
  "grant_types_supported": [
    "authorization_code",
    "implicit",
    "password",
    "client_credentials",
    "refresh_token",
    "urn:ietf:params:oauth:grant-type:device_code",
    "urn:ietf:params:oauth:grant-type:token-exchange",
    "urn:casdoor:params:oauth:grant-type:verification-code",
    "urn:casdoor:params:oauth:grant-type:mobile-one-click"
  ],
  "subject_types_supported": [
    "public"
  ],
  "id_token_signing_alg_values_supported": [
    "RS256",
    "RS512",
    "ES256",
    "ES384",
    "ES512"
  ],
  "scopes_supported": [
    "openid",
    "email",
    "profile",
    "address",
    "phone",
    "offline_access"
  ],
  "code_challenge_methods_supported": [
    "S256"
  ],
  "claims_supported": [
    "iss",
    "ver",
    "sub",
    "aud",
    "iat",
    "exp",
    "id",
    "type",
    "displayName",
    "avatar",
    "permanentAvatar",
    "email",
    "phone",
    "location",
    "affiliation",
    "title",
    "homepage",
    "bio",
    "tag",
    "region",
    "language",
    "score",
    "ranking",
    "isOnline",
    "isAdmin",
    "isForbidden",
    "signupApplication",
    "ldap"
  ],
  "request_parameter_supported": true,
  "request_object_signing_alg_values_supported": [
    "HS256",
    "HS384",
    "HS512"
  ],
  "end_session_endpoint": "https://door.casdoor.com/api/logout",
  "backchannel_logout_supported": true,
  "backchannel_logout_session_supported": true,
  "dpop_signing_alg_values_supported": [
    "RS256",
    "RS512",
    "ES256",
    "ES384",
    "ES512",
    "PS256",
    "PS384",
    "PS512"
  ],
  "authorization_response_iss_parameter_supported": true,
  "client_id_metadata_document_supported": false
}
```

The document tells clients the following:

- **Grant types**: Casdoor supports the authorization code, implicit, password, client credentials, and refresh token grants. It also supports the device code grant (`urn:ietf:params:oauth:grant-type:device_code`) for devices with limited input, such as smart TVs and CLI tools, [token exchange](/docs/how-to-connect/oauth#token-exchange-grant), and its own [verification code grant](/docs/how-to-connect/oauth#verification-code-grant) and [mobile one-click grant](/docs/how-to-connect/mobile-one-click).
- **Response types and modes**: `response_types_supported` lists the authorization code, implicit, and [hybrid](/docs/how-to-connect/oauth#hybrid-flow) combinations. `response_modes_supported` lists the three [response modes](/docs/how-to-connect/oauth#response-modes).
- **Client authentication**: `token_endpoint_auth_methods_supported` shows that a client authenticates with its secret in the `Authorization` header or in the body, with a signed JWT (`private_key_jwt`, see [Federated credentials](/docs/how-to-connect/oauth#federated-credentials)), or not at all as a public client with PKCE (`none`).
- **PKCE**: `code_challenge_methods_supported` shows that Casdoor supports Proof Key for Code Exchange (PKCE) with the `S256` method. PKCE protects public clients, such as mobile and single-page applications, against interception of the authorization code. A library that supports PKCE turns it on from this metadata. To implement PKCE yourself, see [OAuth 2.0](/docs/how-to-connect/oauth).
- **Issuer in the authorization response**: `authorization_response_iss_parameter_supported` is `true`, because Casdoor adds `iss` to every authorization response ([RFC 9207](https://datatracker.ietf.org/doc/html/rfc9207)).
- **Client ID metadata documents**: `client_id_metadata_document_supported` is `true` when the `built-in` organization accepts client IDs that are URLs of a metadata document. See [Dynamic client registration](/docs/application/dynamic-client-registration).

## Discovery endpoints of a single application {#application-specific-oidc-endpoints}

Each application also has its own discovery endpoints. Use them when an application signs its tokens with its own certificate, for example in a multi-tenant deployment, or when you move applications to new certificates one at a time.

| Endpoint | URL |
|---|---|
| OpenID Connect Discovery | `https://<your-casdoor-host>/.well-known/<application-name>/openid-configuration` |
| OAuth 2.0 Authorization Server Metadata | `https://<your-casdoor-host>/.well-known/<application-name>/oauth-authorization-server` |
| JSON Web Key Set (JWKS) | `https://<your-casdoor-host>/.well-known/<application-name>/jwks` |
| WebFinger | `https://<your-casdoor-host>/.well-known/<application-name>/webfinger` |

For example, for the application `app-example` on the demo site:

```url
https://door.casdoor.com/.well-known/app-example/openid-configuration
https://door.casdoor.com/.well-known/app-example/oauth-authorization-server
```

The document of an application differs from the global document in these fields:

- `jwks_uri` points to the JWKS of the application.
- `registration_endpoint` carries the organization of the application, as in `https://door.casdoor.com/api/oauth/register?organization=<organization-name>`, so that clients that register through [dynamic client registration](/docs/application/dynamic-client-registration) land in that organization. The global document has no `organization` parameter, and registers clients in `built-in`.
- `scopes_supported` adds the custom **Scopes** of the application.

The global endpoint returns:

```json
{
  "issuer": "https://door.casdoor.com",
  "jwks_uri": "https://door.casdoor.com/.well-known/jwks",
  "registration_endpoint": "https://door.casdoor.com/api/oauth/register",
  ...
}
```

The endpoint of `app-example`, an application of the organization `casbin`, returns:

```json
{
  "issuer": "https://door.casdoor.com",
  "jwks_uri": "https://door.casdoor.com/.well-known/app-example/jwks",
  "registration_endpoint": "https://door.casdoor.com/api/oauth/register?organization=casbin",
  ...
}
```

The JWKS of an application contains the public key of the application's own certificate. If the application has no certificate of its own, the JWKS contains the global certificates.

:::note
The `issuer` is the same in both documents. Casdoor always sets the `iss` claim of a token to the host of the Casdoor backend, and OIDC clients require the `issuer` of the discovery document to match it. Earlier versions returned an issuer that included the application name, such as `https://door.casdoor.com/.well-known/app-example`, which made strict clients reject the tokens.
:::

## UserInfo fields {#oidc-userinfo-fields}

The `/api/userinfo` endpoint returns the following fields. The table shows which field of the Casdoor user each one comes from.

| Casdoor User Field | OIDC UserInfo Field |
|--------------------|---------------------|
| Id                 | sub                 |
| originBackend      | iss                 |
| Aud                | aud                 |
| Name               | preferred_username  |
| DisplayName        | name                |
| Email              | email               |
| Avatar             | picture             |
| Location           | address             |
| Phone              | phone               |

The mapping is defined in [`object/user.go`](https://github.com/casdoor/casdoor/blob/95ab2472ce84c479be43d6fc4db6533fc738b259/object/user.go#L175-L185).

:::note
`/api/userinfo` returns the `address` claim as a plain string from the `Location` field of the user, for example `"New York"`. Tokens in the `JWT-Standard` format return `address` as a structured OIDC address object that is built from the `Address` array of the user. See [OIDC address claim](/docs/token/overview#oidc-address-claim).
:::

## See also

- [OAuth 2.0](/docs/how-to-connect/oauth)
- [Casdoor SDKs](/docs/how-to-connect/sdk)
- [Tokens](/docs/token/overview)
- [Certificates](/docs/cert/overview)
