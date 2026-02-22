---
title: Standard OIDC client
description: Connect to Casdoor with any OIDC client using discovery endpoints.
keywords: [OIDC, discovery, client, migration]
authors: [nomeguy]
---

## OIDC discovery

Casdoor is a full OIDC implementation. If your app already uses a standard OIDC client against another IdP, you can switch to Casdoor by pointing the client at Casdoor’s discovery URL.

### Discovery endpoints

Casdoor exposes metadata at both OpenID Connect and OAuth 2.0 discovery URLs. Most clients use these to auto-configure endpoints and capabilities.

#### OpenID Connect discovery

```url
<your-casdoor-backend-host>/.well-known/openid-configuration
```

#### OAuth 2.0 authorization server metadata (RFC 8414)

```url
<your-casdoor-backend-host>/.well-known/oauth-authorization-server
```

Use this if your client only needs OAuth 2.0. Both discovery URLs return the same metadata.

### Example response

Both `https://door.casdoor.com/.well-known/openid-configuration` and `https://door.casdoor.com/.well-known/oauth-authorization-server` return metadata like:

```json
{
  "issuer": "https://door.casdoor.com",
  "authorization_endpoint": "https://door.casdoor.com/login/oauth/authorize",
  "token_endpoint": "https://door.casdoor.com/api/login/oauth/access_token",
  "userinfo_endpoint": "https://door.casdoor.com/api/userinfo",
  "jwks_uri": "https://door.casdoor.com/.well-known/jwks",
  "introspection_endpoint": "https://door.casdoor.com/api/login/oauth/introspect",
  "response_types_supported": [
    "code",
    "token",
    "id_token",
    "code token",
    "code id_token",
    "token id_token",
    "code token id_token",
    "none"
  ],
  "response_modes_supported": [
    "login",
    "code",
    "link"
  ],
  "grant_types_supported": [
    "authorization_code",
    "implicit",
    "password",
    "client_credentials",
    "refresh_token",
    "urn:ietf:params:oauth:grant-type:device_code"
  ],
  "code_challenge_methods_supported": [
    "S256"
  ],
  "subject_types_supported": [
    "public"
  ],
  "id_token_signing_alg_values_supported": [
    "RS256"
  ],
  "scopes_supported": [
    "openid",
    "email",
    "profile",
    "address",
    "phone",
    "offline_access"
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
    "isGlobalAdmin",
    "isForbidden",
    "signupApplication",
    "ldap"
  ],
  "request_parameter_supported": true,
  "request_object_signing_alg_values_supported": [
    "HS256",
    "HS384",
    "HS512"
  ]
}
```

Casdoor supports all standard OAuth 2.0 grant types, including authorization code, implicit, password credentials, client credentials, and refresh token flows. The device code grant (`urn:ietf:params:oauth:grant-type:device_code`) is also available for scenarios like smart TVs or CLI tools that have limited input capabilities.

The `code_challenge_methods_supported` field indicates that Casdoor supports PKCE (Proof Key for Code Exchange) with the S256 challenge method. PKCE enhances security for public clients like mobile apps and single-page applications by preventing authorization code interception attacks. When your client library supports automatic PKCE, it will use the S256 method based on this discovery metadata. For manual implementation details, see the [OAuth 2.0 documentation](/docs/how-to-connect/oauth).

### Application-Specific OIDC Endpoints

Besides the global discovery endpoint, application-specific OIDC discovery endpoints are available. Each application gets its own isolated OIDC configuration with a unique issuer. This comes in handy when running multi-tenant deployments where applications need their own certificates or when you want to gradually migrate applications without affecting others.

The application-specific discovery URLs follow these patterns:

```url
<your-casdoor-backend-host>/.well-known/<application-name>/openid-configuration
<your-casdoor-backend-host>/.well-known/<application-name>/oauth-authorization-server
```

For example, if you have an application named `app-example`:

```url
https://door.casdoor.com/.well-known/app-example/openid-configuration
https://door.casdoor.com/.well-known/app-example/oauth-authorization-server
```

The main difference is that the `issuer` and `jwks_uri` fields in the discovery response contain the application path. The `issuer` becomes `https://door.casdoor.com/.well-known/app-example` instead of just `https://door.casdoor.com`, and the `jwks_uri` points to `/.well-known/app-example/jwks`. Everything else, including the authorization and token endpoints, stays the same.

JWKS and WebFinger are also available per application:

```url
<your-casdoor-backend-host>/.well-known/<application-name>/jwks
<your-casdoor-backend-host>/.well-known/<application-name>/webfinger
```

The JWKS endpoint returns the public keys for verifying tokens. When an application has its own certificate configured, that certificate is used. Otherwise, it falls back to the global certificates.

Here's what the responses look like. The global endpoint returns:

```json
{
  "issuer": "https://door.casdoor.com",
  "jwks_uri": "https://door.casdoor.com/.well-known/jwks",
  "authorization_endpoint": "https://door.casdoor.com/login/oauth/authorize",
  ...
}
```

While the application-specific endpoint for `app-example` returns:

```json
{
  "issuer": "https://door.casdoor.com/.well-known/app-example",
  "jwks_uri": "https://door.casdoor.com/.well-known/app-example/jwks",
  "authorization_endpoint": "https://door.casdoor.com/login/oauth/authorize",
  ...
}
```

## List of OIDC Client Libraries

Here is a list of some OIDC client libraries for languages like Go and Java:

| OIDC client library | Language | Link                                                   |
|---------------------|----------|--------------------------------------------------------|
| go-oidc             | Go       | `https://github.com/coreos/go-oidc`                      |
| pac4j-oidc          | Java     | `https://www.pac4j.org/docs/clients/openid-connect.html` |

The table above is not exhaustive. For more OIDC client libraries, see:

1. `https://oauth.net/code/`
2. `https://openid.net/certified-open-id-developer-tools/`

## OIDC UserInfo Fields

The following table illustrates how OIDC UserInfo fields (via the `/api/userinfo` API) are mapped from properties of Casdoor's User table:

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

:::note

The `/api/userinfo` endpoint returns the `address` claim as a **plain string** taken from the user's `Location` field (e.g., `"New York"`), not as a structured OIDC address object. This is different from the behavior of **JWT-Standard** tokens, where `address` is returned as a proper OIDC address object built from the user's `Address` array. See [OIDC Address Claim](/docs/token/overview#oidc-address-claim) for the full explanation.

:::

UserInfo is defined [here](https://github.com/casdoor/casdoor/blob/95ab2472ce84c479be43d6fc4db6533fc738b259/object/user.go#L175-L185).
