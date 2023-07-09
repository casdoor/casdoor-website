---
title: Standard OIDC Client
description: Using OIDC discovery to migrate to Casdoor
keywords: [OIDC, discovery, client]
authors: [nomeguy]
---

## OIDC discovery

Casdoor has fulfilled the OIDC protocol completely. If your application is already running against another OAuth 2.0 (OIDC) identity provider via a standard OIDC client library and you want to migrate to Casdoor, using OIDC discovery will be very easy for you to switch to Casdoor. Casdoor's OIDC discovery URL is:

```url
<your-casdoor-backend-host>/.well-known/openid-configuration
```

E.g., the OIDC discovery URL for the demo site is: <https://door.casdoor.com/.well-known/openid-configuration> , with the following content:

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

## List of OIDC client libraries

Here we list a few OIDC client libraries for some languages like Go and Java:

| OIDC client library | Language | Link                                                   |
|---------------------|----------|--------------------------------------------------------|
| go-oidc             | Go       | <https://github.com/coreos/go-oidc>                      |
| pac4j-oidc          | Java     | <https://www.pac4j.org/docs/clients/openid-connect.html> |

The above table is far from being complete. For a full list of OIDC client libraries, please see more details at:

1. <https://oauth.net/code/>
2. <https://openid.net/certified-open-id-developer-tools/>

## OIDC UserInfo fields

The following table shows how OIDC UserInfo fields (via `/api/userinfo` API) are mapped from properties of Casdoor's User table:

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

See UserInfo's definition here: <https://github.com/casdoor/casdoor/blob/95ab2472ce84c479be43d6fc4db6533fc738b259/object/user.go#L175-L185>
