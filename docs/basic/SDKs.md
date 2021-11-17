---
sidebar_position: 3
title: SDKs Usage
---

Once casdoor is started, you can access user information on casdoor in your application.

In order to facilitate users to quickly access the data on the casdoor server, we provide [SDKs](https://github.com/casdoor?q=sdk&type=&language=&sort=)([what is the SDK?](https://en.wikipedia.org/wiki/Software_development_kit)) for many languages, such as [Golang](https://github.com/casdoor/casdoor-go-sdk), [JavaScript](https://github.com/casdoor/casdoor-js-sdk), [PHP](https://github.com/casdoor/casdoor-php-sdk), [Java](https://github.com/casdoor/casdoor-java-sdk), etc.

 In this chapter we will show you how to use these SDKs, that is, the basic/general steps for using them.

## Step1. Init

The first step is to get in touch with the casdoor server. You need to provide the address of the casdoor server, the credential ClientId and ClientSecret of the application, the jwt secret, and the name of the organization where the application is located, which are all string type.

Roughly like this:

| Name (in order)  | Must | Description                                         |
| ---------------- | ---- | --------------------------------------------------- |
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

## Step2. SDK access Casdoor

With previous configured ```authConfig```, Casdoor SDK now can turn to casdoor server to verify users, note that SDK uses ```SetBasicAuth``` method in net/http library to get ```ClientId``` and ```ClientSecret``` from Casdoor server and verify users in your application.

More details please refer to https://github.com/casdoor/casdoor-go-sdk/blob/master/auth/base.go#L42

## Step3. Get token and parse

After casdoor verification passed, it will be redirected to your application with code and state, like `http://forum.casbin.org?code=xxx&state=yyyy`.

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

## Step4. Set Session in your app

You need to verify the information parsed from the third step. After it is correct (it may be modified), it proves that the user verification has passed, and you can set up the session in your own application.

**At this point, the user login is actually completed**.

The Method to set session varies greatly depending on the languages and frameworks, casnode uses the [beego framework](https://github.com/beego/beego/) and set session by encapsulation method `c.SetSessionUser()`, [source code](https://github.com/casbin/casnode/blob/master/controllers/base.go#L44). 

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

## Step5. Interact with the users table

You may not only need to log in, but you will also get user details, or update users information, etc.

The SDK provides several key functions, and you need to customize them in more detail, or report an issue!

- `GetUser(name string)`, get one user by user name.
- `GetUsers()`, get all users.
- `UpdateUser(auth.User)/AddUser(auth.User)/DeleteUser(auth.User)`, write user to database.
- `CheckUserPassword(auth.User)`, check user's password.

## Summary

casdoor SDKs are very convenient for casdoor application development. It does not require us to learn how to interact with the casdoor server from 0, which reduces our burden.

Of course, these SDKs are still in the development stage (you can see that most of the versions are still in 0.1:smile:), if you have any suggestions, welcome to communicate with us in the community!

