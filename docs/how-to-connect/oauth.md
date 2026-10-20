---
title: OAuth 2.0
description: Reference for the OAuth 2.0 endpoints of Casdoor - every supported grant type, the hybrid flow and response modes, PKCE, resource indicators, federated credentials, DPoP, token introspection, and the UserInfo endpoint.
keywords: [OAuth 2.0, access token, refresh token, grant types]
authors: [nomeguy]
---

Casdoor is an OAuth 2.0 authorization server. This page describes how to get an access token with each grant type, how to verify a token, and how to use it. If you prefer not to call the endpoints yourself, use a [Casdoor SDK](/docs/how-to-connect/sdk) or a [standard OIDC client](/docs/how-to-connect/oidc-client).

## Endpoints

| Endpoint | URL |
|---|---|
| Authorization | `https://<casdoor-host>/login/oauth/authorize` |
| Token | `https://<casdoor-host>/api/login/oauth/access_token` |
| Refresh token | `https://<casdoor-host>/api/login/oauth/refresh_token` |
| Token introspection | `https://<casdoor-host>/api/login/oauth/introspect` |
| UserInfo | `https://<casdoor-host>/api/userinfo` |

In the examples, `ClientId` and `ClientSecret` are the **Client ID** and the **Client secret** of the Casdoor [application](/docs/application/overview).

## Supported grant types

| Grant Type | RFC | Use Case |
|------------|-----|----------|
| [Authorization Code](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1) | RFC 6749 §4.1 | Default; web/mobile apps with a backend. Enabled by default. |
| [Implicit](https://datatracker.ietf.org/doc/html/rfc6749#section-4.2) | RFC 6749 §4.2 | Frontend-only apps without a backend. |
| [Resource Owner Password](https://datatracker.ietf.org/doc/html/rfc6749#section-4.3) | RFC 6749 §4.3 | Apps with no frontend redirect; user credentials sent directly. |
| [Client Credentials](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4) | RFC 6749 §4.4 | Service-to-service calls with no user involved. |
| [Refresh Token](https://datatracker.ietf.org/doc/html/rfc6749#section-6) | RFC 6749 §6 | Renew an access token without re-authenticating. |
| [Device Authorization](https://datatracker.ietf.org/doc/html/rfc8628) | RFC 8628 | Devices with limited input or no browser. |
| [Token Exchange](https://datatracker.ietf.org/doc/html/rfc8693) | RFC 8693 | Swap an existing token for one with different scope or audience. |
| [JWT Bearer](https://datatracker.ietf.org/doc/html/rfc7523) | RFC 7523 | Service auth using a signed JWT assertion instead of a client secret. |
| [Verification Code](/docs/how-to-connect/oauth#verification-code-grant) | Casdoor extension | Native apps that sign users in (and up) with a code sent by SMS or email. |
| [Mobile One-Click](/docs/how-to-connect/mobile-one-click) | Casdoor extension | Native apps that sign users in (and up) with the phone number of the device, through Alibaba Cloud PNVS. |

The authorization code grant is on by default. Turn on the other grant types in **Grant types** on the edit page of the application.

![Grant types setting of the application](/img/how-to-connect/oauth/accesstoken_grant_types.png)

## Authorization code grant {#authorization-code-grant}

Use this grant for applications that sign users in through the browser. It is the recommended grant.

1. Redirect the user to the authorization endpoint:

   ```url
   https://<CASDOOR_HOST>/login/oauth/authorize?
   client_id=CLIENT_ID&
   redirect_uri=REDIRECT_URI&
   response_type=code&
   scope=openid&
   state=STATE
   ```

1. The user signs in. Casdoor redirects the browser to your redirect URL with an authorization code:

   ```url
   https://REDIRECT_URI?code=CODE&state=STATE&iss=ISSUER
   ```

   `iss` is the issuer URL of Casdoor, as defined by [RFC 9207](https://datatracker.ietf.org/doc/html/rfc9207). Compare it with the `issuer` of the [discovery document](/docs/how-to-connect/oidc-client#discovery-endpoints) to make sure that the response comes from the Casdoor server that you sent the user to. Casdoor adds `iss` to every authorization response and to every error that it sends back to the redirect URL, and the discovery document announces this with `"authorization_response_iss_parameter_supported": true`.

1. Exchange the code for tokens. Send a `POST` request to the token endpoint:

   ```url
   https://<CASDOOR_HOST>/api/login/oauth/access_token
   ```

   With the body:

   ```json
   {
       "grant_type": "authorization_code",
       "client_id": ClientId,
       "client_secret": ClientSecret,
       "code": Code,
   }
   ```

1. Read the tokens from the response:

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

An authorization code is valid for 5 minutes and works once. A second exchange of the same code fails with `invalid_grant` and the description `authorization code has been used for token: [...]`.

The responses of the token endpoint and the refresh token endpoint carry the headers `Cache-Control: no-store` and `Pragma: no-cache`, so that no cache keeps the tokens.

### Scopes

Request scopes with the `scope` parameter of the authorization URL. They determine which user fields the tokens and the [UserInfo endpoint](/docs/how-to-connect/oauth#how-to-use-accesstoken) return.

| Scope | Description |
|-------|-------------|
| openid (default) | `sub`, `iss`, `aud` |
| profile | name, displayName, avatar |
| email | email address |
| address | address (OIDC object in **JWT-Standard**; see [OIDC address claim](/docs/token/overview#oidc-address-claim)) |
| phone | phone number |

Separate several scopes with `%20`:

```text
https://<CASDOOR_HOST>/login/oauth/authorize?
client_id=...&
scope=openid%20email
```

For the claims behind each scope, see the [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html#UserInfoResponse).

### PKCE

Casdoor supports [Proof Key for Code Exchange (PKCE)](https://datatracker.ietf.org/doc/html/rfc7636), which protects the authorization code of public clients such as mobile and single-page applications.

1. Generate a random code verifier of 43 to 128 characters.
1. Compute the code challenge: the Base64-URL-encoded SHA-256 hash of the verifier.
1. Add two parameters to the authorization URL:

   ```url
   &code_challenge_method=S256&code_challenge=YOUR_CHALLENGE
   ```

1. Add the `code_verifier` parameter, with the original verifier, to the token request.

With PKCE, `client_secret` is optional in the token request. If you send it, it must be correct.

:::note
When Casdoor itself signs users in at an external OAuth provider that requires PKCE, such as Twitter or a custom provider with PKCE turned on, Casdoor generates the code verifier for each flow. You don't implement PKCE for that part.
:::

### Bind a token to one service {#binding-tokens-to-specific-services}

If your application calls several backend services, you can bind a token to one of them, so that a token that was issued for one service can't be used at another. Casdoor supports [Resource Indicators (RFC 8707)](https://datatracker.ietf.org/doc/html/rfc8707) for this.

1. Add the `resource` parameter, with an absolute URI that identifies the service, to the authorization URL:

   ```url
   https://<CASDOOR_HOST>/login/oauth/authorize?
   client_id=CLIENT_ID&
   redirect_uri=REDIRECT_URI&
   response_type=code&
   scope=openid&
   state=STATE&
   resource=https://api.example.com
   ```

1. Send the same `resource` in the token request:

   ```json
   {
       "grant_type": "authorization_code",
       "client_id": ClientId,
       "client_secret": ClientSecret,
       "code": Code,
       "resource": "https://api.example.com"
   }
   ```

The `aud` (audience) claim of the access token is then the resource URI and not the client ID. The service verifies that a token was issued for it by checking `aud`. The value of `resource` must be exactly the same in both requests.

Casdoor carries the `resource` parameter through interactive sign-in. If the user has to enter a password, complete multi-factor authentication (MFA), use WebAuthn, or approve the consent page, the parameter survives the redirects. It's also kept when Casdoor signs the user in automatically with an existing session.

When you refresh the token, the new access token keeps the `aud` of the original grant. You can repeat `resource` in the refresh request, as a query parameter or a field of the body. If you do, it must be the same value as in the original grant. Otherwise, Casdoor returns `invalid_grant` with the description `resource parameter does not match the original grant`.

### Skip the sign-in page with a provider hint {#provider_hint-parameter}

To send the user straight to one OAuth provider, without showing the Casdoor sign-in page, add `provider_hint=<provider-name>` to the authorization URL:

```url
https://<CASDOOR_HOST>/login/oauth/authorize?
client_id=CLIENT_ID&
redirect_uri=REDIRECT_URI&
response_type=code&
scope=openid&
state=STATE&
provider_hint=github
```

Casdoor then serves a small redirect page, without loading the full frontend, and sends the user to the provider. This shortens the time to the redirect on slow devices and connections.

### Sign-up in the authorization flow {#signup-flow-with-oauth}

A user who creates an account during the authorization flow is redirected to your redirect URL with an authorization code as soon as the sign-up completes, exactly as after a sign-in. Casdoor carries the authorization parameters, such as `client_id`, `response_type`, and `redirect_uri`, through the sign-up. Your application needs no changes for this.

### Control the sign-in prompt {#prompt-and-max-age}

By default, a user who already has a Casdoor session can be signed in without entering credentials again. Add the OpenID Connect parameters `prompt` and `max_age` to the authorization URL to change this:

| Parameter | Effect |
|---|---|
| `prompt=login` | The user must enter credentials again, even with an existing session |
| `max_age=<seconds>` | The user must enter credentials again if they last entered them more than `<seconds>` seconds ago, or if Casdoor doesn't know when they did |
| `prompt=none` | Casdoor shows no page. It signs the user in with the existing session, or sends an error back to the redirect URL |

`prompt` takes a space-separated list of values. When the existing session doesn't satisfy `prompt=login` or `max_age`, a sign-in with that session fails with `login_required` and the message `Please sign in again`. The time at which the user entered credentials is in the `auth_time` claim of the ID token.

Use `prompt=none` to check, for example from a hidden iframe, whether the user is still signed in. Casdoor then skips the automatic redirect to a single provider, and answers in the same way as a successful response would go, with `state` and `iss`, and with one of these errors:

| Error | Reason |
|---|---|
| `login_required` | No Casdoor session, the user of the session isn't in the organization of the application, or the session doesn't satisfy `max_age` |
| `consent_required` | The user must approve the consent page first |
| `interaction_required` | The user must update the password, set up or complete MFA, select a plan, or fill in the prompt page first |
| `access_denied` | The sign-in failed for another reason. `error_description` says why |
| `server_error` | The request to Casdoor failed |

## Implicit grant

Use this grant only for applications without a backend. Prefer the authorization code grant with PKCE.

1. In **Grant types** of the application, turn on **Token** to return an access token, **ID Token** to return an ID token, or both.
1. Redirect the user to:

   ```url
   https://<CASDOOR_HOST>/login/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&response_type=token&scope=openid&state=STATE
   ```

1. After the user signs in, Casdoor redirects the browser to:

   ```url
   https://REDIRECT_URI#access_token=ACCESS_TOKEN&token_type=Bearer&state=STATE&iss=ISSUER
   ```

`response_type` can be `token`, [`id_token`](https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#id_token), or `id_token token`. The authorization endpoint never returns a refresh token. If the grant type that a response type needs isn't turned on, Casdoor shows `Grant_type: token is not supported in this application` (or `id_token`).

When `scope` contains `openid` and the response contains an ID token, send a `nonce` parameter. Casdoor copies it into the ID token, and refuses the request without it: `The nonce parameter is required for this response type`.

:::caution
The implicit grant at the token endpoint (`grant_type=token` with a username and a password) requires a user with a local password. Users who were created only through an external provider and have no local password can't use it and receive `invalid_grant`. The same [rules as for the password grant](/docs/how-to-connect/oauth#password-grant-refusals) apply. Use the authorization code grant for these users.
:::

## Hybrid flow {#hybrid-flow}

In the OpenID Connect hybrid flow, the authorization endpoint returns an authorization code together with tokens. Your frontend can use the tokens at once, and your backend exchanges the code as in the [authorization code grant](/docs/how-to-connect/oauth#authorization-code-grant).

`response_type` is a space-separated combination of `code`, `token`, and `id_token`. The hybrid values are:

| `response_type` | The authorization endpoint returns |
|---|---|
| `code id_token` | `code` and `id_token` |
| `code token` | `code` and `access_token` |
| `code token id_token` | `code`, `access_token`, and `id_token` |

1. In **Grant types** of the application, turn on **Token** for a response type that contains `token`, and **ID Token** for one that contains `id_token`.
1. Redirect the user to the authorization endpoint with the response type and a `nonce`:

   ```url
   https://<CASDOOR_HOST>/login/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&response_type=code%20id_token&scope=openid&state=STATE&nonce=NONCE
   ```

   `nonce` is required when `scope` contains `openid` and the response type contains `id_token`, or is `code token`.

1. After the user signs in, Casdoor redirects the browser to your redirect URL. The values are in the fragment, unless you ask for another [response mode](/docs/how-to-connect/oauth#response-modes).
1. Exchange the code at the token endpoint. Only this exchange returns a refresh token.

The ID token carries these claims of the OpenID Connect specification:

| Claim | When it's present |
|---|---|
| `auth_time` | When Casdoor knows the time at which the user last entered credentials |
| `at_hash` | When the ID token comes with an access token, and in the ID token of the authorization code grant |
| `c_hash` | When the ID token comes with an authorization code |

`at_hash` and `c_hash` use SHA-256, or SHA-384 or SHA-512 when the **Token signing method** of the application ends in `384` or `512`. Verify them as the [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html#HybridIDToken) describes.

## Response modes {#response-modes}

`response_mode` decides how Casdoor sends the authorization response, or the error, to the redirect URL:

| `response_mode` | Delivery | Default for |
|---|---|---|
| `query` | In the query string | `response_type=code` |
| `fragment` | In the fragment, after `#` | Every response type that returns a token |
| `form_post` | In a form that the browser submits to the redirect URL with `POST` | None |

Casdoor never puts tokens in the query string. A response that contains a token goes in the fragment, even with `response_mode=query`. The response contains `state` and `iss`, and `token_type=Bearer` when it contains an access token. With `form_post`, they are fields of the form. The sign-in page and the consent page both support all three modes.

With **Auto signin** on, Casdoor signs a user who has a session in without loading the sign-in page only for `response_type=code` with `response_mode` empty or `query`. Other requests load the sign-in page, which then completes the sign-in.

## Device grant

Use this grant for devices with limited input or without a browser, such as smart TVs and CLI tools.

1. Turn on the device grant in **Grant types** of the application.
1. Send a request to the `device_authorization_endpoint` from the [discovery document](/docs/how-to-connect/oidc-client#discovery-endpoints).
1. Show the `verification_uri` from the response to the user, as text or as a QR code.
1. The user opens the URL on another device, enters the user code, and signs in. Casdoor provides the page behind `verification_uri`, so you don't build a UI for it.
1. Meanwhile, the device polls the token endpoint with its `device_code` until the user has signed in. See [RFC 8628, section 3.4](https://datatracker.ietf.org/doc/html/rfc8628#section-3.4).

You can also offer device login as a sign-in method in the **Signin methods** table of the application.

### Let users sign in to your website by scanning a QR code {#scanning-the-websites-qr-code-with-your-app}

The same flow lets users who are signed in to your native app sign in to your website by scanning a QR code with the app.

1. In the Casdoor admin console, add **Device login** to the **Signin methods** of the application, with the rule **Login page**.
1. Turn on **Device Code** in **Grant types**.

The sign-in page now shows a QR code next to the form and completes the sign-in on its own once the QR code is approved.

The QR code contains the `verification_uri`, for example `https://<casdoor-host>/login/oauth/device/ra91hy?cancelToken=...`. A user who scans it with the camera of a phone opens the URL in the browser, signs in, and approves there. Your app can approve it directly instead, with the access token that it already holds:

1. Take the user code from the path of the URL. In the example, it is `ra91hy`.
1. Show the user what they are about to sign in to.
1. Send a `POST` request to `https://<casdoor-host>/api/login` with the header `Authorization: Bearer <access-token>` and the body:

   ```json
   {
       "application": ApplicationName,
       "organization": OrganizationName,
       "type": "device",
       "userCode": "ra91hy"
   }
   ```

To reject the sign-in, send `userCode` and the `cancelToken` from the same URL as query parameters to `https://<casdoor-host>/api/cancel-device-auth`.

### Device grant with several replicas

By default, Casdoor keeps pending device authorization requests, which map device codes to user codes, in memory. With several replicas of Casdoor, the polling request of the device and the confirmation in the browser can reach different replicas, and the flow then fails intermittently.

To share the requests between replicas, set `redisEndpoint` in `conf/app.conf`. Casdoor then stores them in Redis. This is the same option that shares sessions, in the format `host:port[,poolSize[,password[,db]]]`, for example `localhost:6379,100,mypassword,2`, and no further option is needed. Several addresses in the first field, separated by `;`, use Redis Cluster. If Casdoor can't reach Redis at startup, it logs a warning and uses the in-memory store. See the [Configuration reference](/docs/basic/configuration).

## Resource owner password credentials grant

Use this grant only when your application can't redirect the user to Casdoor and collects the username and password itself.

1. Turn on the password grant in **Grant types** of the application.
1. Send a `POST` request to the token endpoint:

   ```url
   https://<CASDOOR_HOST>/api/login/oauth/access_token
   ```

   With the body:

   ```json
   {
       "grant_type": "password",
       "client_id": ClientId,
       "client_secret": ClientSecret,
       "username": Username,
       "password": Password,
   }
   ```

1. Read the tokens from the response:

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

### When Casdoor refuses the password grant {#password-grant-refusals}

A password alone would skip the checks of the sign-in page. Casdoor therefore refuses the password grant, and the implicit grant at the token endpoint, with `invalid_grant` in these cases:

| Case | `error_description` |
|---|---|
| The user has MFA enabled | `the user has MFA enabled and cannot sign in with a password grant, please use the authorization code flow` |
| The organization has turned off sign-in | `The organization: <organization> has disabled users to signin` |
| The user must change the password, or must set up MFA that the organization requires | `the user: <organization>/<user> must update the password or set up MFA on the login page first` |
| The user has no local password, for example a user created through an external provider | `OAuth users cannot use password grant type, please use authorization code flow` |

The other sign-in restrictions of the application and the organization, such as IP restrictions, apply as well. A user who must change the password or set up MFA does that on the sign-in page first, after which the password grant works again.

## Verification code grant {#verification-code-grant}

Use this grant in native apps that sign users in with a phone number or an email address and a one-time code, without opening a browser. It is an extension grant of Casdoor, as allowed by RFC 6749, section 4.5. If the application allows it, an address that has no account yet is signed up in the same step.

1. Turn on **Verification Code** in **Grant types** of the application, and add an SMS provider, an email provider, or both to the application.
1. Send the code. Send a `POST` request with form data to `https://<casdoor-host>/api/send-verification-code`:

   | Field | Value |
   |-------|-------|
   | `applicationId` | `admin/<APPLICATION_NAME>` |
   | `type` | `phone` or `email` |
   | `dest` | The phone number or email |
   | `countryCode` | The region of a phone number, e.g. `CN` or `US`. Not needed for an E.164 number like `+8613800000000` |
   | `method` | `login` |
   | `captchaType` | `none`, or the captcha type and `captchaToken` when the application's captcha provider asks for one |

1. Exchange the code for tokens. Send a `POST` request to `https://<casdoor-host>/api/login/oauth/access_token`:

   ```json
   {
       "grant_type": "urn:casdoor:params:oauth:grant-type:verification-code",
       "client_id": ClientId,
       "username": "+8613800000000",
       "code": "123456",
       "scope": "openid profile"
   }
   ```

   `username` is the phone number or the email address that the code was sent to. For a phone number in the national format, also send `country_code`.

The grant needs no client secret, so it works from a public client. The response is the same as for the other grants and contains a `refresh_token` that keeps the user signed in.

Wrong codes count toward the **Failed signin limit** of the application. Casdoor refuses users who have MFA enabled. Use the authorization code grant for them.

### Sign up new users with a verification code

When no user has the phone number or the email address, the grant creates the user, as the sign-up page would, if all of the following conditions hold:

- **Enable signup** is on for the application, and **Disable self signup** is off.
- The **Signup items** of the application require nothing beyond what the code proves. Only ID, Username, Display name, Password, Confirm password, Agreement, Signup button, and Providers may be required, plus `Email` when the user signs up with an email address, or `Phone` when the user signs up with a phone number. The default sign-up items require both `Email` and `Phone`, so make the other one optional.
- For a phone number, its region is in the **Supported country codes** of the organization.

Otherwise, `/api/send-verification-code` answers that the user doesn't exist, and only existing users can sign in.

## Mobile one-click grant {#mobile-one-click-grant}

Native apps in mainland China can also sign users in with the phone number of the device, without an SMS code: the one-click login SDK of Alibaba Cloud PNVS returns a token, and the app exchanges it with the grant type `urn:casdoor:params:oauth:grant-type:mobile-one-click`. See [Mobile one-click login](/docs/how-to-connect/mobile-one-click).

## Client credentials grant {#client-credentials-grant}

Use this grant for machine-to-machine calls, where no user is present.

1. Turn on the client credentials grant in **Grant types** of the application.
1. Send a `POST` request to `https://<casdoor-host>/api/login/oauth/access_token`:

   ```json
   {
       "grant_type": "client_credentials",
       "client_id": ClientId,
       "client_secret": ClientSecret,
   }
   ```

1. Read the token from the response:

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

Unlike the tokens of the grants above, this access token belongs to the application and not to a user.

## Refresh token grant {#refresh-token}

Use the refresh token from an earlier response to get a new access token.

1. Set the lifetime of refresh tokens in **Refresh token expire** of the application. The default is 0 hours.
1. Send a `POST` request to `https://<casdoor-host>/api/login/oauth/refresh_token`:

   ```json
   {
       "grant_type": "refresh_token",
       "refresh_token": REFRESH_TOKEN,
       "scope": SCOPE,
       "client_id": ClientId,
       "client_secret": ClientSecret,
   }
   ```

1. Read the tokens from the response:

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

Casdoor checks the refresh request as follows:

- If the token was issued by an authorization code exchange that sent a `client_secret`, or by a token exchange, the refresh request must contain the correct `client_secret`. Otherwise, Casdoor returns `invalid_client`. A public client that used PKCE without a secret refreshes without one.
- The refresh token must belong to the requesting application. Otherwise, Casdoor returns `invalid_grant` with `the token is for wrong application (client_id)`.
- A `scope` in the request must be a subset of the original scope. If you omit it, the new token has the original scope.
- An unknown or revoked refresh token fails with `invalid_grant` and `refresh token is invalid or revoked`. A refresh token that Casdoor has invalidated, for example at sign-out, fails with `invalid_grant` and `refresh token is expired`.

Renaming a user doesn't invalidate the refresh tokens of the user. For the events that do revoke tokens, see [When Casdoor revokes tokens](/docs/token/overview#when-casdoor-revokes-tokens).

### Refresh token rotation

By default, every refresh returns a new refresh token and revokes the one that was used, as [RFC 9700](https://datatracker.ietf.org/doc/html/rfc9700#section-4.14.2) recommends for public clients. Store the new refresh token after each refresh. A refresh token that was already used fails with `invalid_grant`.

Rotation breaks clients in which several processes share one refresh token, for example a CLI that runs parallel jobs with a token from an environment variable: the first refresh revokes the token for all the others. For such clients, turn on **Disable refresh token rotation** in the **OIDC/OAuth** settings of the application. Then:

- A refresh returns the same refresh token, which keeps its original expiry.
- The access tokens of earlier refreshes stay valid until they expire.
- Signing out still revokes the refresh token for all processes.

:::caution
Without rotation, a leaked refresh token works until it expires. Keep **Refresh token expire** short, and prefer [DPoP](/docs/how-to-connect/oauth#dpop-sender-constrained-tokens) for public clients.
:::

## Token exchange grant

[Token Exchange (RFC 8693)](https://datatracker.ietf.org/doc/html/rfc8693) swaps a token for a new token with different properties. Use it when one service calls another on behalf of a user, or to narrow the scope of a token before you pass it to a downstream service. For example, an API gateway exchanges a token with a broad scope for a token with a narrow scope before it forwards a request to a microservice, so that each service gets only the permissions that it needs.

Send a `POST` request to `https://<casdoor-host>/api/login/oauth/access_token`:

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

| Parameter | Description |
|---|---|
| `subject_token` | The token to exchange, typically an access token or a JSON Web Token (JWT) that you already hold |
| `subject_token_type` | `urn:ietf:params:oauth:token-type:access_token` (default), `urn:ietf:params:oauth:token-type:jwt`, or `urn:ietf:params:oauth:token-type:id_token` |
| `scope` | Optional. A subset of the scope of the subject token. If you omit it, the new token has the scope of the subject token |
| `audience` | Optional. The application that the new access token is for, by its client ID or by its application name. The `aud` claim of the new access token is then the client ID of that application, and the `aud` of the new ID token stays the requesting client |

The response contains a new token for the same user as the subject token:

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

Casdoor validates the subject token with the certificate of the application that issued it, which the `azp` claim identifies, and not with the certificate of the requesting client. If the requesting client isn't the issuer, the `aud` claim of the subject token must include the client ID of the requesting client. Otherwise, Casdoor rejects the exchange with `invalid_grant`. This keeps one application from exchanging the tokens of another application without being named as an audience (RFC 8693, section 2.1). The rule applies to every **Token format**, including **JWT-Standard**.

Casdoor also refuses the exchange in these cases:

| Case | Error |
|---|---|
| The subject token isn't an active token of Casdoor, for example because it was revoked or has expired. With `subject_token_type` set to `urn:ietf:params:oauth:token-type:id_token`, Casdoor looks the token up as an ID token, otherwise as an access token | `invalid_grant`, `subject_token is revoked or unknown` |
| The subject token has no user, for example a token of the client credentials grant | `invalid_grant`, `subject_token has no user` |
| The user is forbidden to sign in | `invalid_grant` |
| The user isn't in the organization of the requesting application, and the application isn't shared | `invalid_grant` |
| `audience` isn't a known application | `invalid_target` |
| The `audience` application isn't in the organization of the user, and isn't shared | `invalid_target` |

A token of an external issuer can be the subject token too, without a client secret. See [Federated credentials](/docs/how-to-connect/oauth#federated-credentials).

## JWT bearer grant

With the [JWT bearer grant (RFC 7523)](https://datatracker.ietf.org/doc/html/rfc7523), a client gets an access token by presenting a signed JWT assertion instead of a client secret. Use it for service-to-service calls in which the client holds a private key and you don't want to share a long-lived secret.

1. Turn on **JWT Bearer** in **Grant types** of the application.
1. Upload the certificate of the client in **Client cert** on the **Security** tab of the application. Casdoor verifies assertions with the public key of that certificate.
1. Create the assertion: a JWT that is signed with the private key of the client and contains the following claims:

   | Claim | Description |
   |-------|-------------|
   | `iss` | Issuer — the `client_id` of the application |
   | `sub` | Subject — the `client_id` of the application |
   | `aud` | Audience — the Casdoor token endpoint URL |
   | `exp` | Expiry time (Unix timestamp) |

1. Send a `POST` request to `https://<casdoor-host>/api/login/oauth/access_token`:

   ```json
   {
       "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
       "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
       "client_assertion": "<signed-JWT>",
       "client_id": "CLIENT_ID"
   }
   ```

1. Read the token from the response:

   ```json
   {
       "access_token": "eyJhb...",
       "token_type": "Bearer",
       "expires_in": 10080,
       "scope": "openid"
   }
   ```

Casdoor verifies the signature and the standard JWT claims. The access token belongs to the application, as with the client credentials grant.

The `assertion` of the JWT bearer grant can also be a token of an external issuer that the application trusts. See [Federated credentials](/docs/how-to-connect/oauth#federated-credentials).

## Federated credentials (workload identity) {#federated-credentials}

With federated credentials, an application trusts the tokens of an external OpenID Connect issuer, such as GitHub Actions, Kubernetes, a cloud workload identity, or another IdP, as its credential. A workload that already holds such a token gets a Casdoor token without a client secret or a client certificate.

1. In the Casdoor admin console, open the application and go to the **OIDC/OAuth** tab.
1. In **Federated credentials**, add a row for each issuer and subject that you trust:

   | Column | Description |
   |---|---|
   | **Issuer** | The issuer of the external tokens. It must equal the `iss` claim exactly, for example `https://token.actions.githubusercontent.com` |
   | **JWKS URL** | The URL of the signing keys of the issuer. If you leave it empty, Casdoor reads `jwks_uri` from `<issuer>/.well-known/openid-configuration`, whose `issuer` must match |
   | **Subject** | Required. The `sub` claim to accept. `*` matches any text, for example `repo:my-org/my-repo:*` |
   | **Audience** | The `aud` value to accept. If you leave it empty, Casdoor accepts its own origin, its token endpoint `https://<casdoor-host>/api/login/oauth/access_token`, or the client ID of the application |
   | **User** | The user that the token stands for: a username, or `{claim}` to take the username from a claim, for example `{email}`. If you leave it empty, the token stands for the application itself |

1. In **Grant types**, turn on the grant that the workload uses.
1. Click **Save**.

The workload then presents its external token in one of three ways:

- As `client_assertion` at the token endpoint, with `client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer`, to authenticate the client in any grant. Send `client_id` in the request too, because the `sub` of an external token isn't a client ID.
- As the `assertion` of the [JWT bearer grant](/docs/how-to-connect/oauth#jwt-bearer-grant).
- As the `subject_token` of the [token exchange grant](/docs/how-to-connect/oauth#token-exchange-grant). No client secret is needed.

For example, a GitHub Actions job exchanges its OIDC token for a Casdoor token:

```bash
curl -X POST https://<casdoor-host>/api/login/oauth/access_token \
  -d grant_type=urn:ietf:params:oauth:grant-type:token-exchange \
  -d client_id=<client-id> \
  -d subject_token=<github-oidc-token> \
  -d subject_token_type=urn:ietf:params:oauth:token-type:jwt
```

Casdoor verifies an external token as follows:

- The signature is checked with the keys of the issuer. Casdoor caches the keys for one hour, and fetches them again, at most once a minute, when a token has an unknown `kid`.
- The signing algorithm is one of RS256, RS384, RS512, PS256, PS384, PS512, ES256, ES384, ES512, or EdDSA.
- The token must have an `exp` claim. Casdoor allows one minute of clock skew.
- A token of a trusted issuer whose subject matches no row fails, for example with `the subject: <sub> of issuer: <issuer> is not trusted by application: [<application>]`.

With **User** empty, the new token is an application token, as with the client credentials grant, without a refresh token or an ID token. Otherwise, it's a token of the mapped user in the organization of the application. If that user doesn't exist, or the token lacks the claim, Casdoor returns `invalid_grant`.

The discovery document lists `private_key_jwt` in `token_endpoint_auth_methods_supported`.

## DPoP (sender-constrained tokens) {#dpop-sender-constrained-tokens}

Casdoor supports [Demonstrating Proof of Possession (DPoP, RFC 9449)](https://datatracker.ietf.org/doc/html/rfc9449). DPoP binds an access token to a key that the client holds, so that a leaked token is useless without the private key.

To get a DPoP-bound token, send a `DPoP` header with a DPoP proof JWT in the token request:

```http
POST /api/login/oauth/access_token
DPoP: <DPoP proof JWT>
```

Casdoor binds the token to the public key of the proof, by its JWK thumbprint (`jkt`), and returns the `token_type` `DPoP` instead of `Bearer`:

```json
{
    "access_token": "eyJhb...",
    "token_type": "DPoP",
    "expires_in": 10080,
    "scope": "openid"
}
```

The refresh token request accepts the same `DPoP` header. Casdoor rejects an invalid proof with the error `invalid_dpop_proof`. A refresh token that was issued with DPoP is bound to the key too: refreshing it requires a `DPoP` proof signed with the same key. Without a proof, or with a proof of another key, the refresh fails with `invalid_dpop_proof`. Casdoor checks the `htu` claim of a refresh proof against the token endpoint, `https://<casdoor-host>/api/login/oauth/access_token`.

The discovery document lists the signing algorithms that Casdoor accepts for proofs in `dpop_signing_alg_values_supported`:

```json
{
    "dpop_signing_alg_values_supported": ["RS256", "RS512", "ES256", "ES384", "ES512", "PS256", "PS384", "PS512"]
}
```

The [token introspection](/docs/how-to-connect/oauth#how-to-verify-access-token) response shows the key binding in the `cnf.jkt` claim (RFC 9449, section 8).

## Verify an access token {#how-to-verify-access-token}

Casdoor supports [token introspection (RFC 7662)](https://datatracker.ietf.org/doc/html/rfc7662). Authenticate the request with HTTP Basic authentication, with the client ID as the username and the client secret as the password:

```http
POST /api/login/oauth/introspect HTTP/1.1
Host: CASDOOR_HOST
Accept: application/json
Content-Type: application/x-www-form-urlencoded
Authorization: Basic Y2xpZW50X2lkOmNsaWVudF9zZWNyZXQ=

token=ACCESS_TOKEN&token_type_hint=access_token
```

Example response:

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

Alternatively, verify the signature of the token yourself with the public key of the application's certificate, or with the keys of the [JWKS endpoint](/docs/how-to-connect/oidc-client#discovery-endpoints). The SDKs do this in `ParseJwtToken()`.

## Use an access token {#how-to-use-accesstoken}

Send the access token to call the Casdoor API. For example, call `/api/userinfo`, with `GET` or `POST`, in one of two ways:

- With the `Authorization` header: `Authorization: Bearer <access-token>`
- With a query parameter: `https://<casdoor-host>/api/userinfo?accessToken=<access-token>`

Casdoor returns the fields of the user that the scope of the token allows:

```json
{
    "sub": "7a6b4a8a-b731-48da-bc44-36ae27338817",
    "iss": "http://localhost:8000",
    "aud": "c58c..."
}
```

To get more fields, request more [scopes](#scopes) in the authorization request.

### UserInfo and get-account {#differences-between-the-userinfo-and-get-account-apis}

| Endpoint | Returns |
|---|---|
| `/api/userinfo` | The standard OpenID Connect (OIDC) claims of the user, limited by the [scopes](#scopes) of the token |
| `/api/get-account` | The complete [user](/docs/basic/core-concepts#user) object of the signed-in account. This endpoint is specific to Casdoor. It includes the access token of the external OAuth provider, if there is one |

## Get the access token of an external provider {#accessing-oauth-provider-tokens}

When a user signs in through an external OAuth provider, such as GitHub or Google, Casdoor stores the access token of that provider in the `originalToken` field of the user. Your application can use it to call the API of the provider, such as the GitHub API or the Google Drive API, on behalf of the user, without another OAuth flow.

Read the token from `/api/get-account`:

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

Casdoor returns `originalToken` only to the user and to administrators. For all other requesters, it masks the field.

## See also

- [Connect a standard OIDC client](/docs/how-to-connect/oidc-client)
- [Sign users in with a Casdoor SDK](/docs/how-to-connect/sdk)
- [Tokens](/docs/token/overview)
- [Call the Casdoor API](/docs/basic/public-api)
