---
title: Standard OIDC Client
description: Using OIDC discovery to migrate to Casdoor
keywords: [OIDC, discovery, client]
authors: [nomeguy]
---

## OIDC Discovery

Casdoor has fully implemented the OIDC protocol. If your application is already using a standard OIDC client library to connect to another OAuth 2.0 identity provider, and you want to migrate to Casdoor, using OIDC discovery will make it very easy for you to switch.

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
    "password",
    "authorization_code"
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

### Application-Specific OIDC Endpoints

Casdoor also supports application-specific OIDC discovery endpoints. This feature enables each application to have its own isolated OIDC configuration, which is particularly useful for multi-tenant deployments where different applications need distinct issuers and certificates.

The application-specific OIDC discovery URL pattern is:

```url
<your-casdoor-backend-host>/.well-known/<application-name>/openid-configuration
```

For example, if you have an application named `app-example`, the discovery URL would be:

```url
https://door.casdoor.com/.well-known/app-example/openid-configuration
```

#### Key Differences from Global Endpoints

When using application-specific endpoints, the following fields in the OIDC discovery response will be scoped to that application:

- **issuer**: Contains the application-specific path (e.g., `https://door.casdoor.com/.well-known/app-example`)
- **jwks_uri**: Points to the application-specific JWKS endpoint (e.g., `https://door.casdoor.com/.well-known/app-example/jwks`)

#### Additional Application-Specific Endpoints

Along with the discovery endpoint, two more application-specific endpoints are available:

**JSON Web Key Set (JWKS)**:

```url
<your-casdoor-backend-host>/.well-known/<application-name>/jwks
```

This endpoint returns the public keys used to verify tokens issued for this specific application. If the application has a custom certificate configured, it will be used; otherwise, it falls back to the global certificates.

**WebFinger**:

```url
<your-casdoor-backend-host>/.well-known/<application-name>/webfinger
```

This endpoint provides resource discovery for the specific application.

#### Use Cases

Application-specific OIDC endpoints are beneficial when you need:

- **Multi-tenant deployments**: Different applications with isolated OIDC configurations
- **Application-specific certificates**: Each app using its own signing certificate for enhanced security
- **Flexible integrations**: Third-party applications integrating using app-specific endpoints without affecting other applications
- **Gradual migration**: Existing applications can continue using global endpoints while new applications adopt specific endpoints

#### Example Comparison

**Global Endpoint Response**:

```json
{
  "issuer": "https://door.casdoor.com",
  "jwks_uri": "https://door.casdoor.com/.well-known/jwks",
  "authorization_endpoint": "https://door.casdoor.com/login/oauth/authorize",
  ...
}
```

**Application-Specific Endpoint Response** (for application `app-example`):

```json
{
  "issuer": "https://door.casdoor.com/.well-known/app-example",
  "jwks_uri": "https://door.casdoor.com/.well-known/app-example/jwks",
  "authorization_endpoint": "https://door.casdoor.com/login/oauth/authorize",
  ...
}
```

The authorization and token endpoints remain the same, but the issuer and JWKS URIs are application-specific, allowing for proper token validation and certificate management per application.

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
