---
title: OAuth 2.0
description: Using Access Token to authenticate clients
keywords: [OAuth 2.0, access token, refresh token]
authors: [nomeguy]
---

## Introduction

Casdoor supports using Access Token to authenticate clients. In this section, we will show you how to obtain an Access Token, how to verify an Access Token, and how to use an Access Token.

## How to Get an Access Token

There are two ways to obtain an Access Token: you can use the [Casdoor SDKs](/docs/how-to-connect/sdk). For detailed information, please refer to the SDK documentation. Here, we will mainly show you how to use the API to get the Access Token.

Casdoor supports standard OAuth 2.0 grant types including [Authorization Code Grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1), [Implicit Grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.2), [Resource Owner Password Credentials Grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.3), [Client Credentials Grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4), [Refresh Token](https://datatracker.ietf.org/doc/html/rfc6749#section-6), [Device Authorization Grant](https://datatracker.ietf.org/doc/html/rfc8628), and [Token Exchange](https://datatracker.ietf.org/doc/html/rfc8693).

For security reasons, the Casdoor app has the authorization code mode turned on by default. If you need to use other modes, please go to the appropriate app to set it.

![Grant Types](/img/how-to-connect/oauth/accesstoken_grant_types.png)

### Authorization Code Grant <span id="1"></span>

First, redirect your users to:

```url
https://<CASDOOR_HOST>/login/oauth/authorize?
client_id=CLIENT_ID&
redirect_uri=REDIRECT_URI&
response_type=code&
scope=openid&
state=STATE
```

#### Available scopes

|  Name |  Description  |
|---|---|
| openid (no scope)  | sub (user's id), iss (issuer), and aud (audience)   |
| profile  | user profile info, including name, displayName, and avatar   |
| email  | user's email address   |
| address  |  user's address  |
| phone |  user's phone number  |

:::info

Your OAuth Application can request the scopes in the initial redirection. You can specify multiple scopes by separating them with a space using %20:

```text
https://<CASDOOR_HOST>/login/oauth/authorize?
client_id=...&
scope=openid%20email
```

For more details, please see the [OIDC standard](https://openid.net/specs/openid-connect-core-1_0.html#UserInfoResponse)

:::

After your user has authenticated with Casdoor, Casdoor will redirect them to:

```url
https://REDIRECT_URI?code=CODE&state=STATE
```

Now that you have obtained the authorization code, make a POST request to:

```url
https://<CASDOOR_HOST>/api/login/oauth/access_token
```

in your backend application:

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

:::note

Casdoor supports [PKCE](https://datatracker.ietf.org/doc/html/rfc7636) (Proof Key for Code Exchange) for enhanced security. To enable PKCE, add two parameters when requesting the authorization code:

```url
&code_challenge_method=S256&code_challenge=YOUR_CHALLENGE
```

The code challenge should be a Base64-URL-encoded SHA-256 hash of your randomly generated code verifier (43-128 characters). When requesting the token, include the original `code_verifier` parameter. With PKCE enabled, `client_secret` becomes optional, but if provided, it must be correct.

For OAuth providers configured in Casdoor (like Twitter and custom providers with PKCE enabled), Casdoor automatically generates unique code verifiers for each authentication flow, so you don't need to manually implement PKCE.

:::

#### Signup Flow with OAuth

When users sign up through the OAuth authorization flow, they are automatically redirected to your application's callback URL with the authorization code, just like the sign-in flow. Previously, users had to manually click through intermediate pages after creating their account. Now the signup process matches the streamlined experience of signing in—once registration completes, Casdoor immediately generates the authorization code and redirects to your `redirect_uri`.

Your application doesn't need any changes to support this. The authorization parameters (`client_id`, `response_type`, `redirect_uri`, etc.) are automatically passed through the signup process when users choose to create a new account during OAuth authorization.

### Implicit Grant

Maybe your application doesn't have a backend, and you need to use Implicit Grant. First, you need to make sure you have Implicit Grant enabled, then redirect your users to:

```url
https://<CASDOOR_HOST>/login/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&response_type=token&scope=openid&state=STATE
```

After your user has authenticated with Casdoor, Casdoor will redirect them to:

```url
https://REDIRECT_URI/#access_token=ACCESS_TOKEN
```

Casdoor also supports the [id_token](https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#id_token) as `response_type`, which is a feature of OpenID.

### Device Grant

Maybe your devices have limited input capabilities or lack a suitable browser, and you need to use Device Grant. First, you need to make sure you have Device Grant enabled, the request `device_authorization_endpoint` in OIDC discover, then use QR code or text to show `verification_uri` and lead user to enter login page.

Second, you should request `token endpoint` to get Access Token with parameter define in [rfc8628](https://datatracker.ietf.org/doc/html/rfc8628#section-3.4).

### Resource Owner Password Credentials Grant

If your application doesn't have a frontend that redirects users to Casdoor, then you may need this.

First, you need to make sure you have Password Credentials Grant enabled and send a POST request to:

```url
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

First, you need to make sure you have Client Credentials Grant enabled and send a POST request to `https://<CASDOOR_HOST>/api/login/oauth/access_token`:

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

### Refresh Token

Maybe you want to update your Access Token, then you can use the `refreshToken` you obtained above.

First, you need to set the expiration time of the Refresh Token in the application (default is 0 hours), and send a POST request to `https://<CASDOOR_HOST>/api/login/oauth/refresh_token`

```json
{
    "grant_type": "refresh_token",
    "refresh_token": REFRESH_TOKEN,
    "scope": SCOPE,
    "client_id": ClientId,
    "client_secret": ClientSecret,
}
```

You will get a response like this:

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

### Token Exchange Grant

Token Exchange (RFC 8693) lets you swap an existing token for a new one with different characteristics—particularly useful when one service needs to call another on behalf of a user, or when you need to narrow down a token's scope for a specific downstream service.

To exchange a token, send a POST request to `https://<CASDOOR_HOST>/api/login/oauth/access_token`:

```json
{
    "grant_type": "urn:ietf:params:oauth:grant-type:token-exchange",
    "client_id": ClientId,
    "client_secret": ClientSecret,
    "subject_token": SubjectToken,
    "subject_token_type": "urn:ietf:params:oauth:token-type:access_token",
    "scope": "openid email"
}
```

The `subject_token` is the token you want to exchange—typically an access token or JWT you already have. If you want to narrow the permissions in the new token, specify a `scope` that's a subset of the original token's scope. When you omit `scope`, the new token inherits the same scope as the subject token.

Casdoor supports three token types for `subject_token_type`:

- `urn:ietf:params:oauth:token-type:access_token` (default)
- `urn:ietf:params:oauth:token-type:jwt`
- `urn:ietf:params:oauth:token-type:id_token`

The response returns a new token tied to the same user as your subject token:

```json
{
    "access_token": "eyJhb...",
    "id_token": "eyJhb...",
    "refresh_token": "eyJhb...",
    "token_type": "Bearer",
    "expires_in": 10080,
    "scope": "openid email"
}
```

For example, an API gateway might exchange a broad-scoped access token for a narrower one before forwarding requests to a downstream microservice. This pattern—called scope downscoping—ensures each service gets only the permissions it needs, rather than inheriting full access from the original token.

## How to Verify Access Token

Casdoor currently supports the [token introspection](https://datatracker.ietf.org/doc/html/rfc7662) endpoint. This endpoint is protected by Basic Authentication (ClientId:ClientSecret).

```http
POST /api/login/oauth/introspect HTTP/1.1
Host: CASDOOR_HOST
Accept: application/json
Content-Type: application/x-www-form-urlencoded
Authorization: Basic Y2xpZW50X2lkOmNsaWVudF9zZWNyZXQ=

token=ACCESS_TOKEN&token_type_hint=access_token
```

You will receive the following response:

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

## How to Use `AccessToken`

You can use AccessToken to access Casdoor APIs that require authentication.

For example, there are two different ways to request `/api/userinfo`.

Type 1: Query parameter

`https://<CASDOOR_HOST>/api/userinfo?accessToken=<your_access_token>`

Type 2: HTTP Bearer token

`https://<CASDOOR_HOST>/api/userinfo` with the header: "Authorization: Bearer <your_access_token>"

Casdoor will parse the access_token and return corresponding user information according to the `scope`.
You will receive the same response, which looks like this:

```json
{
    "sub": "7a6b4a8a-b731-48da-bc44-36ae27338817",
    "iss": "http://localhost:8000",
    "aud": "c58c..."
}
```

If you expect more user information, add `scope` when obtaining the AccessToken in step [Authorization Code Grant](#1).

## Accessing OAuth Provider Tokens

When users authenticate through OAuth providers (GitHub, Google, etc.), you can access the provider's original access token to make API calls to the third-party service on their behalf. This token is stored in the user's `originalToken` field.

The token is available through the `/api/get-account` endpoint:

```json
{
  "status": "ok",
  "data": {
    "name": "user123",
    "originalToken": "ya29.a0AfH6SMBx...",
    ...
  }
}
```

The `originalToken` is visible only when the user requests their own account or when the requester is an admin. For other requests, it is masked for privacy.

This allows your application to interact with third-party APIs (e.g., GitHub API, Google Drive API) using the provider's access token without requiring additional OAuth flows.

## Differences between the `userinfo` and `get-account` APIs

- `/api/userinfo`: This API returns user information as part of the OIDC protocol. It provides limited information, including only the basic information defined in OIDC standards. For a list of available scopes supported by Casdoor, please refer to the [available scopes](#available-scopes) section.

- `/api/get-account`: This API retrieves the user object for the currently logged-in account. It is a Casdoor-specific API that allows you to obtain all the information of the [user](/docs/basic/core-concepts#user) in Casdoor, including the OAuth provider's access token when applicable.
