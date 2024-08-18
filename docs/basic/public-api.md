---
title: Casdoor Public API
description: Casdoor Public API
keywords: [Casdoor Public API]
authors: [hsluoyz]
---

Casdoor frontend web UI is a [SPA (Single-Page Application)](https://developer.mozilla.org/en-US/docs/Glossary/SPA) developed in React. The React frontend consumes the Casdoor RESTful API exposed by the Go backend code. This RESTful API is referred to as the `Casdoor Public API`. In Another word, with HTTP calls, you can do everything just like how Casdoor web UI itself does. There's no other limitations. The API can be utilized by the following:

- Casdoor's frontend
- Casdoor client SDKs (e.g., casdoor-go-sdk)
- Any other customized code from the application side

The full reference for the `Casdoor Public API` can be found on Swagger: [**https://door.casdoor.com/swagger**](https://door.casdoor.com/swagger). These Swagger docs are automatically generated using Beego's Bee tool. If you want to generate the Swagger docs by yourself, see: [How to generate the swagger file](/docs/developer-guide/swagger/#how-to-generate-the-swagger-file)

## How to authenticate with `Casdoor Public API`

### 1. By `Access token`

We can use the access token granted for an authenticated user to call `Casdoor Public API` as the user itself.

#### How to get the access token?

The application can get the access token for the Casdoor user at the end of OAuth login process (aka get the token by code and state). The permissions for the API calls will be the same as the user.

The below examples shows how to call `GetOAuthToken()` function in Go via casdoor-go-sdk.

```go
func (c *ApiController) Signin() {
    code := c.Input().Get("code")
    state := c.Input().Get("state")

    token, err := casdoorsdk.GetOAuthToken(code, state)
    if err != nil {
        c.ResponseError(err.Error())
        return
    }

    claims, err := casdoorsdk.ParseJwtToken(token.AccessToken)
    if err != nil {
        c.ResponseError(err.Error())
        return
    }

    if !claims.IsAdmin {
        claims.Type = "chat-user"
    }

    err = c.addInitialChat(&claims.User)
    if err != nil {
        c.ResponseError(err.Error())
        return
    }

    claims.AccessToken = token.AccessToken
    c.SetSessionClaims(claims)

    c.ResponseOk(claims)
}
```

All granted access tokens can also be accessed via the web UI by an admin user in the Tokens page. For example, visit: <https://door.casdoor.com/tokens> for the demo site.

#### How to authenticate?

1. HTTP `GET` parameter, the URL format is:

    ```shell
    /page?access_token=<The access token>
    ```

    Demo site example: `https://door.casdoor.com/api/get-global-providers?access_token=eyJhbGciOiJSUzI1NiIs`

2. HTTP Bearer token, the HTTP header format is:

    ```shell
    Authorization: Bearer <The access token>
    ```

### 2. By `Client ID` and `Client secret`

#### How to get the client ID and secret?

The application edit page (e.g., <https://door.casdoor.com/applications/casbin/app-vue-python-example>) will show the client ID and secret for an application. This authentication is useful when you want to call the API as a "machine", "application" or a "service" instead of a user. The permissions for the API calls will be the same as the application (aka the admin of the organization).

The below examples shows how to call `GetOAuthToken()` function in Go via casdoor-go-sdk.

#### How to authenticate?

1. Create a pair of accessKey and accessSecret in account setting page.
2. HTTP `GET` parameter, the URL format is:

    ```shell
    /page?clientId=<The client ID>&clientSecret=<the client secret>
    ```

    Demo site example: `https://door.casdoor.com/api/get-global-providers?clientId=294b09fbc17f95daf2fe&clientSecret=dd8982f7046ccba1bbd7851d5c1ece4e52bf039d`

![User Api Key](/img/basic/user_api_key.png)

```bash
curl --location 'http://door.casdoor.com/api/user?accessKey=b86db9dc-6bd7-4997-935c-af480dd2c796&accessSecret=79911517-fc36-4093-b115-65a9741f6b14'
```

2. [HTTP Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication), the HTTP header format is:

    ```shell
    Authorization: Basic <The Base64 encoding of client ID and client secret joined by a single colon ":">
    ```

If you are not familiar with the Base64 encoding, you can use a library to do that because `HTTP Basic Authentication` is a popular standard supported by many places.

### 3. By `Access key` and `Access secret`

We can use the access key and access secret for a Casdoor user to call `Casdoor Public API` as the user itself. The access key and access secret can be configured in the user setting page by an admin or the user himself. the `update-user` API can also be called to update these fields. The permissions for the API calls will be the same as the user.

#### How to authenticate?

1. HTTP `GET` parameter, the URL format is:

    ```shell
    /page?accessKey=<The user's access key>&accessSecret=<the user's access secret>"
    ```

Demo site example: `https://door.casdoor.com/api/get-global-providers?accessKey=b86db9dc-6bd7-4997-935c-af480dd2c796/admin&accessSecret=79911517-fc36-4093-b115-65a9741f6b14`

### 4. By `username` and `password`

:::caution

This authentication method is not safe and kept here only for compatibility or demo purposes. We recommend using the previous three authentication methods instead.

#### What will happen?

The user credential will be exposed as `GET` parameters the in the request URL. Moreover, the user credential will be sniffed in plain text by the network if you are using HTTP instead of HTTPS.

:::

We can use the username and password for a Casdoor user to call `Casdoor Public API` as the user itself. The username takes the format of `<The user's organization name>/<The user name>`. The permissions for the API calls will be the same as the user.

#### How to authenticate?

1. HTTP `GET` parameter, the URL format is:

    ```shell
    /page?username=<The user's organization name>/<The user name>&password=<the user's password>"
    ```

Demo site example: `https://door.casdoor.com/api/get-global-providers?username=built-in/admin&password=123`
