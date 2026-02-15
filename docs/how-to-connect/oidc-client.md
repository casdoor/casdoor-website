---
title: Standard OIDC Client
description: Using OIDC discovery to migrate to Casdoor
keywords: [OIDC, discovery, client]
authors: [nomeguy]
---

## Discovery Endpoints

Casdoor supports both OpenID Connect and OAuth 2.0 server metadata discovery, making it easy to integrate with any standard OIDC or OAuth 2.0 client library. The server advertises its capabilities and endpoints through well-known URLs that clients can query during initialization.

### OAuth 2.0 Authorization Server Metadata

Casdoor implements [RFC 8414](https://datatracker.ietf.org/doc/html/rfc8414) for OAuth 2.0 Authorization Server Metadata discovery. This standard is particularly useful for clients that need OAuth 2.0 functionality without the full OpenID Connect layer, such as MCP (Model Context Protocol) clients and other OAuth-focused tools.

The OAuth metadata endpoint is:

```url
<your-casdoor-backend-host>/.well-known/oauth-authorization-server
```

For application-specific configurations:

```url
<your-casdoor-backend-host>/.well-known/<application-name>/oauth-authorization-server
```

These endpoints return the same metadata structure as the OIDC discovery endpoints, ensuring complete compatibility. This allows clients to discover server capabilities like supported grant types, token endpoints, and security features (including PKCE with S256 method) in a single request.

### Global OIDC Endpoint

Casdoor's global OIDC discovery URL is:

```url
<your-casdoor-backend-host>/.well-known/openid-configuration
```

For example, the OIDC discovery URL for the demo site is: <https://door.casdoor.com/.well-known/openid-configuration>, and it contains the following information:

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

Casdoor supports all standard OAuth 2.0 grant types, including authorization code, implicit, password credentials, client credentials, and refresh token flows. The device code grant (`urn:ietf:params:oauth:grant-type:device_code`) is also available for scenarios like smart TVs or CLI tools that have limited input capabilities. For detailed information on how to use each grant type, see the [OAuth 2.0 documentation](/docs/how-to-connect/oauth).

### Application-Specific OIDC Endpoints

Besides the global discovery endpoint, you can use application-specific OIDC discovery endpoints. Each application gets its own isolated OIDC configuration with a unique issuer. This comes in handy when running multi-tenant deployments where applications need their own certificates or when you want to gradually migrate applications without affecting others.

The application-specific discovery URL follows this pattern:

```url
<your-casdoor-backend-host>/.well-known/<application-name>/openid-configuration
```

For example, if you have an application named `app-example`:

```url
https://door.casdoor.com/.well-known/app-example/openid-configuration
```

The main difference is that the `issuer` and `jwks_uri` fields in the discovery response contain the application path. The `issuer` becomes `https://door.casdoor.com/.well-known/app-example` instead of just `https://door.casdoor.com`, and the `jwks_uri` points to `/.well-known/app-example/jwks`. Everything else, including the authorization and token endpoints, stays the same.

You can also access the JWKS and WebFinger endpoints for each application:

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
| go-oidc             | Go       | <https://github.com/coreos/go-oidc>                      |
| pac4j-oidc          | Java     | <https://www.pac4j.org/docs/clients/openid-connect.html> |

Please note that the above table is not exhaustive. For a full list of OIDC client libraries, you can find more details at:

1. <https://oauth.net/code/>
2. <https://openid.net/certified-open-id-developer-tools/>

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

You can see the definition of UserInfo [here](https://github.com/casdoor/casdoor/blob/95ab2472ce84c479be43d6fc4db6533fc738b259/object/user.go#L175-L185).
