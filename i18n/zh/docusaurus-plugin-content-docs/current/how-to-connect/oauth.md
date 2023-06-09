---
title: OAuth 2.0
description: 使用AccessToken验证客户端
keywords:
  - OAuth2.0
  - accessToken
  - 更新访问令牌
authors:
  - nomeguy
---

## 介绍

Casdoor 支持AccessToken验证客户端。 在本节中，我们将向您展示如何获取AccessToken，如何验证AccessToken，以及如何使用AccessToken。

## 如何获取AcessToken

You have two ways to get the AccessToken: you can use the [Casdoor SDKs](/docs/how-to-connect/sdk), for details please refer to the SDK documentation, here we will mainly show you how to use the API to get the AccessToken.

Casdoor支持四种OAuth 授予类型: [Authorization Code Grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1), [Implicit Grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.2), [Resource Owner Password Credentials Grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.3), 和 [Client Credentials Grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4).

出于安全考虑，Casto应用默认已开启授权码模式。 如果您需要使用其他模式，请前往相应的应用程序来设置它。

![OAuth授权类型](/img/how-to-connect/oauth/accesstoken_grant_types.png)

### 获取授权码 <span id="1"></span>

首先重定向您的用户请求到：

```
https://<CASDOOR_HOST>/login/oauth/authorize?
client_id=CLIENT_ID&
redirect_uri=REDIRECT_URI&
response_type=code&
scope=openid&
state=STATE
```
#### 可用的作用域（scope）
| 名称                | 描述                               |
| ----------------- | -------------------------------- |
| openid (no scope) | sub (用户ID), iss (发行人) 和 aud (受众) |
| profile           | 用户资料信息，包括名称、显示名称、头像              |
| email             | 用户的电子邮件地址                        |
| address           | 用户地址                             |
| phone             | 用户的电话号码                          |

:::info

您的 OAuth 应用程序可以在首次重定向时带上请求的作用域。 您可以指定多个作用域并使用空格（转义后为%20）分隔：
```text
https://<CASDOOR_HOST>/login/oauth/authorize?
client_id=...&
scope=openid%20email
```

更多详情，请参阅 [OIDC 标准](https://openid.net/specs/openid-connect-core-1_0.html#UserInfoResponse)

:::

当您的用户通过casdoor身份验证后，他的请求会被casdoor重定到：

```
https://REDIRECT_URI?code=CODE&state=STATE
```

现在您已经获得授权码，在你的后端应用发送 POST 请求：

```
https://<CASDOOR_HOST>/api/login/oauth/access_token
```

在你的后端应用

```json
{
    "grant_type": "authorization_code",
    "client_id": ClientId,
    "client_secret": ClientSecret,
    "code": Code,
}
```

您将得到以下响应：

```json
{
    "access_token": "eyJhb...",
    "id_token": "eyJhb...",
    "refresh_token": "eyJhb...",
    "token_type": "Bearer",
    "expires_in": 10080,
    "scope": "openid"
}
```

:::note

Casdoor也支持 [PKCE](https://datatracker.ietf.org/doc/html/rfc7636) 功能。 当发送获取授权码请求时，您可以通过添加两个参数来启用 PKCE。

```
&code_challenge_method=S256&code_challenge=YOUR_CHANLLENGE
```

获取令牌时，您需要通过 `code_verifier` 参数来验证 PKCE 。 值得一提的是，启用PKCE 后，Client_secret并不是必需的，但如果您要发送这个参数，它的值就必须是正确的。

:::


### 隐式授权

如果您的应用程序没有后端，您需要使用隐式授权。 首先，您需要确保您启用了隐式授权，然后将您的用户请求重定向到：

```
https://<CASDOOR_HOST>/login/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&response_type=token&scope=openid&state=STATE
```

当您的用户通过casdoor身份验证后，他的请求会被casdoor重定到：

```
https://REDIRECT_URI/#access_token=ACCESS_TOKEN
```

Casdoor还支持 [id_token](https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#id_token) 作为参数`response_type`的值, 这是OpenID的一个功能。

### 使用资源拥有者的密码凭据授权
如果您的应用程序没有前端来重定向用户到Casdoor，那么您可能需要这个功能。

首先，您需要确保您已启用密码凭证授权，并发送一个 POST 请求：

```
https://<CASDOOR_HOST>/api/login/oauth/access_token
```

```json
{
    "grant_type": "password",
    "client_id": ClientId,
    "client_secret": ClientSecret,
    "username": Username,
    "password": Password,
}
```

您将得到以下响应：

```json
{
    "access_token": "eyJhb...",
    "id_token": "eyJhb...",
    "refresh_token": "eyJhb...",
    "token_type": "Bearer",
    "expires_in": 10080,
    "scope": "openid"
}
```

### 使用客户端凭据授权

当应用程序没有前端时，您也可以使用客户端凭据授权。

首先，您需要确保您已启用客户端凭据授权，并发送一个 POST 请求到 `https://<CASDOOR_HOST>/api/login/oauth/access_token`：

```json
{
    "grant_type": "client_credentials",
    "client_id": ClientId,
    "client_secret": ClientSecret,
}
```

您将得到以下响应：

```json
{
    "access_token": "eyJhb...",
    "id_token": "eyJhb...",
    "refresh_token": "eyJhb...",
    "token_type": "Bearer",
    "expires_in": 10080,
    "scope": "openid"
}
```

必须指出，以这种方式获得的AccessToken 不同于前三个，因为它与应用程序相对应，而不是与用户相对应。

### 更新访问令牌

如果您想要更新访问令牌，您可以使用上面的 `refreshToken`。

首先您需要在应用程序中设置refreshToken的到期时间(默认为0小时)， 发送一个 POST 请求到 `https://<CASDOOR_HOST>/api/login/oauth/refresh_token`

```json
{
    "grant_type": "refresh_token",
    "refresh_token": REFRESH_TOKEN,
    "scope": SCOPE,
    "client_id": ClientId,
    "client_secret": ClientSecret,
}
```

您将得到响应：
```json
{
    "access_token": "eyJhb...",
    "id_token": "eyJhb...",
    "refresh_token": "eyJhb...",
    "token_type": "Bearer",
    "expires_in": 10080,
    "scope": "openid"
}
```

## 如何验证访问令牌

目前Casdoor有支持 [token 校验](https://datatracker.ietf.org/doc/html/rfc7662) 的API。 Currently the endpoint is protected by Basic Authoritarian(ClientId:ClientSecret):

```
POST /api/login/oauth/introspect HTTP/1.1
Host: CASDOOR_HOST
Accept: application/json
Content-Type: application/x-www-form-urlencoded
Authorization: Basic Y2xpZW50X2lkOmNsaWVudF9zZWNyZXQ=

token=ACCESS_TOKEN&token_type_hint=access_token
```

您将得到以下响应：

```json
{
    "active": true,
    "client_id": "c58c...",
    "username": "admin",
    "token_type": "Bearer",
    "exp": 1647138242,
    "iat": 1646533442,
    "nbf": 1646533442,
    "sub": "7a6b4a8a-b731-48da-bc44-36ae27338817",
    "aud": [
        "c58c..."
    ],
    "iss": "http://localhost:8000"
}
```

## 如何使用访问令牌

您可以使用AccessToken访问需要认证的 Casdoor API。

例如，请求 `/api/userinfo` 的两种不同方法。

方法 1 查询参数：

`https://<CASDOOR_HOST>/api/userinfo?accessToken=<your_access_token>`

方法 2 HTTP Bearer token

`https://<CASDOOR_HOST>/api/userinfo` with the header: "Authorization: Bearer <your_access_token>"

Casdoor 将解析 access_token，根据 `scope` 作用域返回对应的用户信息。 您将得到响应：

```json
{
    "sub": "7a6b4a8a-b731-48da-bc44-36ae27338817",
    "iss": "http://localhost:8000",
    "aud": "c58c..."
}
```

如果您需要更多用户信息，在申请访问令牌[获取授权码](#1)这一步添加更多 `scope` 。

## `userinfo` 和 `get-account` API 之间的差异

- `/api/userinfo`: 返回用户信息是OIDC 协议的一部分。 返回少量信息，只包含OIDC标准中的基本信息 请查看 Cassdoor支持的[可用的作用域（scope）](#available-scopes)。

- `/api/get-account`: 获取当前登录帐户的用户对象。 这是一个 只适用于Casdoor 的API， 用于获取Cassdoor中的 [用户](/docs/basic/core-concepts#user) 的所有信息。
