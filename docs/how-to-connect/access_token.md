---
title: Access Token
---

## Introduction

Casdoor supports AccessToken to authenticate clients. In this section, we will show you how to get AccessToken, how to verify AccessToken and how to use AccessToken.

## How to get AccessToken

You have two ways to get the AccessToken: you can use the [Casdoor SDK](/docs/how-to-connect/sdk), for details please refer to the SDK documentation, here we will mainly show you how to use the API to get the AccessToken.

Casdoor supports four OAuth grant types: [Authorization Code Grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1), [Implicit Grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.2), [Resource Owner Password Credentials Grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.3), and [Client Credentials Grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4). 

For security reasons, the Casdoor app has the authorization code mode turned on by default, if you need to use other modes, please go to the appropriate app to set it.

![Grant Types](/img/accesstoken_grant_types.png)

### Authorization Code Grant

First redirect your users to `https://<CASDOOR_HOST>/login/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&response_type=code&scope=openid&state=STATE`. After your user has authenticated with casdoor, casdoor will redirect him to `https://REDIRECT_URI?code=CODE&state=STATE`. Now that you have obtained the authorization code, make a POST request to `https://<CASDOOR_HOST>/api/login/oauth/access_token` in your backend application :
```json
{
    "grant_type": "authorization_code",
    "client_id": ClientId,
    "client_secret": ClientSecret,
    "code": Code,
}
```

You will get the following response:

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

Casdoor also supports [PKCE](https://datatracker.ietf.org/doc/html/rfc7636) feature, when getting the authorization code, you can add two parameters:`&code_challenge_method=S256&code_challenge=YOUR_CHANLLENGE`, to enable PKCE. Also when getting the token you need to pass `code_verifier` parameter to verify PKCE. It is worth mentioning that with PKCE enabled, Client_Secret is not required, but if you pass it, it must be the correct value.

### Implicit Grant

Maybe your application doesn't have a backend, and you need to use Implicit Grant. First you need to make sure you have Implicit Grant enabled, then redirect your users to:`https://<CASDOOR_HOST>/login/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&response_type=token&scope=openid&state=STATE`. After your user has authenticated with casdoor, casdoor will redirect him to `https://REDIRECT_URI/#token=ACCESS_TOKEN`

Casdoor also supports [id_token](https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#id_token) as `response_type`, which is a feature of OpenID.

### Resource Owner Password Credentials Grant
If your application doesn't have a frontend that redirects users to Casdoor, then you may need this.

First you need to make sure you have Password Credentials Grant enabled, and send a POST request to `https://<CASDOOR_HOST>/api/login/oauth/access_token`:
```json
{
    "grant_type": "password",
    "client_id": ClientId,
    "client_secret": ClientSecret,
    "username": Username,
    "password": Password,
}
```

You will get the following response:

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

### Client Credentials Grant

You can also use Client Credentials Grant when your application does not have a frontend.

First you need to make sure you have Client Credentials Grant enabled, and send a POST request to `https://<CASDOOR_HOST>/api/login/oauth/access_token`:

```json
{
    "grant_type": "client_credentials",
    "client_id": ClientId,
    "client_secret": ClientSecret,
}
```

You will get the following response:

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

It is important to note that the AccessToken obtained in this way differs from the first three in that it corresponds to the application rather than to the user.

### RefreshToken

Maybe you want to update your accessToken, then you can use the `refreshToken` you got above.

First you need to set the expiration time of refreshToken in the application (default is 0 hours), and send a POST request to `https://<CASDOOR_HOST>/api/login/oauth/refresh_token`

```json
{
    "grant_type": "refresh_token",
    "refresh_token": REFRESH_TOKEN,
    "scope": SCOPE,
    "client_id": ClientId,
    "client_secret": ClientSecret,
}
```

You will get the response like:
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

## How to verify AccessToken

Casdoor currently has support for [token introspection](https://datatracker.ietf.org/doc/html/rfc7662) endpoint. Currently the endpoind is protected by Basic Authoritarian(ClientId:ClientSecret):

```
POST /api/login/oauth/introspect HTTP/1.1
Host: CASDOOR_HOST
Accept: application/json
Content-Type: application/x-www-form-urlencoded
Authorization: Basic Y2xpZW50X2lkOmNsaWVudF9zZWNyZXQ=

token=ACCESS_TOKEN&token_type_hint=access_token
```

You will get the following response like:

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

## How to use AccessToken

You can use AccessToken to access Casdoor APIs that require authentication, here is `/api/userinfo` for example. This one is when we only use "openid" scope to get userinfo endpoint.

1. Query parameter
    
    Access `https://<CASDOOR_HOST>/api/userinfo?accessToken=ACCESSTOKEN`
2. HTTP Bearer token
    
    Access `https://<CASDOOR_HOST>/api/userinfo` with the header: "Authorization: Bearer ACCESSTOKEN"

You will get the same response like:

```json
{
    "sub": "7a6b4a8a-b731-48da-bc44-36ae27338817",
    "iss": "http://localhost:8000",
    "aud": "c58c..."
}
```

You can also use AccessToken to access Casdoor APIs that require authentication, here is `/api/userinfo` for example. This one is when we use "openid profile address phone email" scope to get userinfo endpoint.

1. Query parameter
    
    Access `https://<CASDOOR_HOST>/api/userinfo?accessToken=ACCESSTOKEN`
2. HTTP Bearer token
    
    Access `https://<CASDOOR_HOST>/api/userinfo` with the header: "Authorization: Bearer ACCESSTOKEN"

You will get the same response like:

```json
{
    "sub": "2f80c349-4beb-407f-b1f0-528aac0f1acd",
    "iss": "https://door.casbin.com",
    "aud": "7a11****0fa2172",
    "name": "admin",
    "preferred_username": "Admin",
    "email": "admin@example.com",
    "picture": "https://casbin.org/img/casbin.svg",
    "address": "Guangdong",
    "phone": "12345678910"
}
```