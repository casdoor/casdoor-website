---
sidebar_position: 3
title: How to Connect to Casdoor
---

## Overview

In this section, we will show how to connect your application to Casdoor. 

As Service Provider (SP), Casdoor supports two authentication protocols:

- `OAuth 2.0 (OIDC)`
- `SAML`

As Identity Provider (IdP), Casdoor supports one authentication protocol:

- `OAuth 2.0 (OIDC)`

Therefore, your application will talk to Casdoor via OAuth 2.0 (OIDC). Specifically, there are two ways for connecting to Casdoor:

1. **Use a standard OIDC client library**: an OIDC client implementation is widely provided in any programming language or framework.
2. **Use Casdoor SDK**: Casdoor will provide easy-to-use SDK library on top of OIDC, with supporting extended functionality which are only available in Casdoor.
3. **Use Casdoor plugin**: if your application is built on a platform and Casdoor (or a third-party) has already provided a plugin or middleware for it, then use it. It will be much easier to use than directly using Casdoor SDK because it's specially made for the platform.

## Standard OIDC client library

Casdoor has fulfilled the OIDC protocol completely. If your application is already running against another OAuth 2.0 (OIDC) identity provider via a standard OIDC client library and you want to migrate to Casdoor, using OIDC discovery will be very easy for you to switch to Casdoor. Casdoor's OIDC discovery URL is:

```
<your-casdoor-backend-host>/.well-known/openid-configuration
```

E.g., the OIDC discovery URL for the demo site is: https://door.casbin.com/.well-known/openid-configuration , with the following content:

```json
{
  "issuer": "https://door.casbin.com",
  "authorization_endpoint": "https://door.casbin.com/login/oauth/authorize",
  "token_endpoint": "https://door.casbin.com/api/login/oauth/access_token",
  "userinfo_endpoint": "https://door.casbin.com/api/get-account",
  "jwks_uri": "https://door.casbin.com/api/certs",
  "response_types_supported": [
    "id_token"
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

Here we list a few OIDC client libraries for some languages like Go and Java:

| OIDC client library | Language | Link                                                   |
|---------------------|----------|--------------------------------------------------------|
| go-oidc             | Go       | https://github.com/coreos/go-oidc                      |
| pac4j-oidc          | Java     | https://www.pac4j.org/docs/clients/openid-connect.html |

The above table is far from being complete. For a full list of OIDC client libraries, please see more details at:

1. https://oauth.net/code/
2. https://openid.net/
    1. [Certified OpenID Connect Implementations](https://openid.net/developers/certified/)
    1. [Uncertified OpenID Connect Implementations](https://openid.net/developers/uncertified/)

## Casdoor SDK

Compared to the standard OIDC protocol, Casdoor provides more functionalities in its SDK, like user management, resource uploading, etc. Connecting to Casdoor via Casdoor SDK costs more time than using a standard OIDC client library but will provide the best flexibility and the most powerful API.

Casdoor SDKs can be divided into two categories:

1. **Frontend SDKs**: Javascript SDK for websites, Android or iOS SDKs for Apps. Casdoor supports providing authentication for both websites and mobile Apps.
2. **Backend SDK**: SDKs for backend languages like Go, Java, Node.js, Python, PHP, etc.

:::tip
If your website is developed in a frontend and backend separated manner, then you can use the Javascript SDK: `casdoor-js-sdk` to integrate Casdoor in frontend. If your web application is a traditional website developed by JSP or PHP, you can just use the backend SDKs only.
:::

| Casdoor Frontend SDK | Description      | Source code                                    |
|----------------------|------------------|------------------------------------------------|
| Javascript SDK       | For websites     | https://github.com/casdoor/casdoor-js-sdk      |
| Android SDK          | For Android apps | https://github.com/casdoor/casdoor-android-sdk |
| iOS SDK              | For iOS apps     | https://github.com/casdoor/casdoor-ios-sdk     |

Next, use one of the following backend SDKs based on the language of your backend:

| Casdoor Backend SDK | Source code                                   |
|---------------------|-----------------------------------------------|
| Go SDK              | https://github.com/casdoor/casdoor-go-sdk     |
| Java SDK            | https://github.com/casdoor/casdoor-java-sdk   |
| Node.js SDK         | https://github.com/casdoor/casdoor-nodejs-sdk |
| Python SDK          | https://github.com/casdoor/casdoor-python-sdk |
| PHP SDK             | https://github.com/casdoor/casdoor-php-sdk    |
| .NET SDK            | https://github.com/casdoor/casdoor-dotnet-sdk |

For a full list of the official Casdoor SDKs, please see: https://github.com/casdoor?q=sdk&type=all&language=&sort=

## Casdoor plugin

Casdoor also provides plugins or middlewares for some very popular platforms, like Java's SpringBoot, PHP's WordPress, Python's Odoo etc.

| Casdoor plugin      | Language | Source code                                            |
|---------------------|----------|--------------------------------------------------------|
| Spring Boot plugin  | Java     | https://github.com/casdoor/casdoor-spring-boot-starter |
| Spring Boot example | Java     | https://github.com/casdoor/casdoor-spring-boot-example |
| WordPress plugin    | PHP      | https://github.com/casdoor/wordpress-casdoor-plugin    |
| Odoo plugin         | Python   | https://github.com/casdoor/odoo-casdoor-oauth          |

For a full list of the official Casdoor plugins, please see: https://github.com/casdoor?q=plugin&type=all&language=&sort=

## How to use Casdoor SDK?

### 1. Initialization

The first step is to get in touch with the casdoor server. You need to provide the address of the casdoor server, the
credential ClientId and ClientSecret of the application, the jwt secret, and the name of the organization where the
application is located, which are all string type.

Roughly like this:

| Parameter        | Must | Description                                         |
|------------------|------|-----------------------------------------------------|
| endpoint         | Yes  | Casdoor Server Url, such as `http://localhost:8000` |
| clientId         | Yes  | Application.client_id                               |
| clientSecret     | Yes  | Application.client_secret                           |
| jwtSecret        | Yes  | Read from token_jwt_key.pem file                    |
| organizationName | Yes  | Application.organization                            |

The function signature in Go is as follows, similar to other languages:

```go
func InitConfig(endpoint string, clientId string, clientSecret string, jwtSecret string, organizationName string)
```

You can refer to the [usage in Casnode](https://github.com/casbin/casnode/blob/master/controllers/account.go#L32),

```go
var CasdoorEndpoint = "http://localhost:8000"
var ClientId = "541738959670d221d59d"
var ClientSecret = "66863369a64a5863827cf949bab70ed560ba24bf"
var JwtSecret = "CasdoorSecret"
var CasdoorOrganization = "casbin-forum"

func init() {
	auth.InitConfig(CasdoorEndpoint, ClientId, ClientSecret, JwtSecret, CasdoorOrganization)
}
```

More specific behavior can refer to [the source codes of casdoor-go-sdk](https://github.com/casdoor/casdoor-go-sdk).

### 2. SDK access Casdoor

With previous configured ```authConfig```, Casdoor SDK now can turn to casdoor server to verify users, note that SDK
uses ```SetBasicAuth``` method in net/http library to get ```ClientId``` and ```ClientSecret``` from Casdoor server and
verify users in your application.

More details please refer to https://github.com/casdoor/casdoor-go-sdk/blob/master/auth/base.go#L42

### 3. Get token and parse

After casdoor verification passed, it will be redirected to your application with code and state,
like `http://forum.casbin.org?code=xxx&state=yyyy`.

Your web application can get the `code`, `state` and call `GetOAuthToken(code, state)`, then parse out jwt token.

See [Usage in Casnode](https://github.com/casbin/casnode/blob/master/controllers/auth.go#L36) as a reference:

```go
code := c.Input().Get("code")
state := c.Input().Get("state")

token, err := auth.GetOAuthToken(code, state)
if err != nil {
	panic(err)
}

claims, err := auth.ParseJwtToken(token.AccessToken)
if err != nil {
	panic(err)
}
```

### 4. Set Session in your app

You need to verify the information parsed from the third step. After it is correct (it may be modified), it proves that
the user verification has passed, and you can set up the session in your own application.

**At this point, the user login is actually completed**.

The Method to set session varies greatly depending on the languages and frameworks, casnode uses
the [beego framework](https://github.com/beego/beego/) and set session by encapsulation method `c.SetSessionUser()`
, [source code](https://github.com/casbin/casnode/blob/master/controllers/base.go#L44).

[Usage in Casnode](https://github.com/casbin/casnode/blob/master/controllers/auth.go#L47),

```go
token, err := auth.GetOAuthToken(code, state)
if err != nil {
	panic(err)
}

claims, err := auth.ParseJwtToken(token.AccessToken)
if err != nil {
	panic(err)
}

claims.AccessToken = token.AccessToken
c.SetSessionUser(claims)				// see here
```

That's it!

### 5. Interact with the users table

You may not only need to log in, but you will also get user details, or update users information, etc.

The SDK provides several key functions, and you need to customize them in more detail, or report an issue!

- `GetUser(name string)`, get one user by user name.
- `GetUsers()`, get all users.
- `UpdateUser(auth.User)/AddUser(auth.User)/DeleteUser(auth.User)`, write user to database.
- `CheckUserPassword(auth.User)`, check user's password.
