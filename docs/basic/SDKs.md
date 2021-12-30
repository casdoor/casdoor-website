---
sidebar_position: 3
title: Frontend & Backend SDK Setup
---

## Introduction

As Service Provider (SP), Casdoor supports two authentication protocols:

- `OAuth 2.0 (OIDC)`
- `SAML`

As Identity Provider (IdP), Casdoor supports one authentication protocol:

- `OAuth 2.0 (OIDC)`

When your application uses Casdoor as Identity Provider, they are connected via OIDC. Casdoor fulfills the OIDC standard
completely. As an application developer, you can always use a standard OIDC client library for your language to connect
to Casdoor. However, we also provide a series of Casdoor SDKs for popular languages to simplify the OIDC interaction and
provide easy-to-use wrappers for `Casdoor Public API`.

To use Casdoor, you need to integrate both the frontend SDK and the backend SDK. Casdoor supports providing authentication for both web and mobile applications. 

:::tip
If your web application is developed in a frontend and backend separated manner, then you can use the Javascript SDK: `casdoor-js-sdk` to integrate Casdoor in frontend. If your web application is a traditional website developed by JSP or PHP, you can just use the backend SDKs only.
:::

| Frontend SDK   | Description             | Source code                                    |
|----------------|-------------------------|------------------------------------------------|
| Javascript SDK | For web apps (websites) | https://github.com/casdoor/casdoor-js-sdk      |
| Android SDK    | For Android apps        | https://github.com/casdoor/casdoor-android-sdk |
| iOS SDK        | For iOS apps            | https://github.com/casdoor/casdoor-ios-sdk     |

Next, use one of the following backend SDKs based on the language of your backend code:

| Backend SDK | Source code                                   |
|-------------|-----------------------------------------------|
| Go SDK      | https://github.com/casdoor/casdoor-go-sdk     |
| Java SDK    | https://github.com/casdoor/casdoor-java-sdk   |
| Node.js SDK | https://github.com/casdoor/casdoor-nodejs-sdk |
| Python SDK  | https://github.com/casdoor/casdoor-python-sdk |
| PHP SDK     | https://github.com/casdoor/casdoor-php-sdk    |

In this chapter we will show you how to use these SDKs, that is, the basic/general steps for using them.

## How to setup

### 1. Initialization

The first step is to get in touch with the casdoor server. You need to provide the address of the casdoor server, the
credential ClientId and ClientSecret of the application, the jwt secret, and the name of the organization where the
application is located, which are all string type.

Roughly like this:

| Name (in order)  | Must | Description                                         |
| ---------------- |------| --------------------------------------------------- |
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
