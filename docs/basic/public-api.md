---
title: Call the Casdoor API
sidebar_label: Public API
description: Authenticate to the Casdoor REST API with an access token, client credentials, an access key, or a username and password, and call it from your applications and scripts.
keywords: [API, REST, authentication, OAuth, M2M]
authors: [hsluoyz]
---

This guide explains how to authenticate to the Casdoor REST API and call it from your own applications, services, and scripts.

---

#### Learning outcomes

- Choose the authentication method that fits your caller.
- Send an access token, client credentials, or an access key with a request.
- Get an access token for a service without a user.
- Sign a user out of all sessions through the API.
- Allow your frontend origin to call the API from a browser.

#### What you need

- A running Casdoor instance. The examples use the demo site `https://door.casdoor.com`.
- An [application](/docs/application/overview) in Casdoor, with its client ID and client secret

---

## About the Casdoor API

The Casdoor admin console is a React single-page application that calls a REST API. Your code can call the same API, so everything that the console does is available over HTTP. The API has three kinds of callers:

- The Casdoor frontend
- The [Casdoor SDKs](/docs/how-to-connect/sdk), such as casdoor-go-sdk
- Your own applications and scripts

The API reference is the Swagger page of your Casdoor instance, for example [https://door.casdoor.com/swagger](https://door.casdoor.com/swagger). To regenerate the Swagger files, see [Generate Swagger files](/docs/developer-guide/swagger#generate-swagger-files).

## Choose an authentication method {#how-to-authenticate}

| Method | The request runs as | Use it for |
|---|---|---|
| [Access token](/docs/basic/public-api#access-token) | The user who signed in, or the application for a client credentials token | Applications that act for a signed-in user, and services that hold a token |
| [Client ID and client secret](/docs/basic/public-api#client-credentials) | The application, with the rights of an administrator of its organization | Machine-to-machine (M2M) calls from backend services, CLIs, and scheduled jobs |
| [Access key and access secret](/docs/basic/public-api#access-key) | The organization, application, or user that the key belongs to | Scripts and integrations that need a long-lived credential |
| [Username and password](/docs/basic/public-api#username-password) | The user | Local demos and compatibility only |

## Authenticate with an access token {#access-token}

An access token is what your application receives when a user signs in through OAuth 2.0. A request that carries the token runs with the permissions of that user.

### Get the token

Your application receives the token at the end of the OAuth 2.0 authorization code flow, when it exchanges the `code` for tokens. See [OAuth 2.0](/docs/how-to-connect/oauth). An administrator can also see the issued tokens on the **Tokens** page of the admin console, for example `https://door.casdoor.com/tokens`.

The following Go handler uses casdoor-go-sdk to exchange the code and read the token:

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

    claims.AccessToken = token.AccessToken
    c.SetSessionClaims(claims)

    c.ResponseOk(claims)
}
```

### Send the token

Send the token in the `Authorization` header:

```bash
curl https://door.casdoor.com/api/get-account \
  -H "Authorization: Bearer <access-token>"
```

Alternatively, send it as the `access_token` query parameter:

```text
https://door.casdoor.com/api/get-global-providers?access_token=<access-token>
```

Prefer the header. A token in a URL can end up in server logs and browser history.

## Authenticate with a client ID and client secret {#client-credentials}

Use the credentials of an application for M2M calls, where no user is present. The request runs as the application, with the rights of an administrator of the application's organization. Typical callers are:

- Backend services that manage users or permissions in Casdoor
- CLI tools, scheduled jobs, and synchronization scripts
- Business-to-business (B2B) setups, where each customer organization has its own application and manages its own users with that application's credentials

### Get the credentials

1. In the Casdoor admin console, open the edit page of the application, for example `https://door.casdoor.com/applications/casbin/app-vue-python-example`.
1. Copy the **Client ID** and the **Client secret**.

### Send the credentials with each request

Send the credentials with HTTP Basic authentication. The value is the Base64 encoding of `<client-id>:<client-secret>`:

```bash
curl https://door.casdoor.com/api/get-users?owner=<organization> \
  -u "<client-id>:<client-secret>"
```

Alternatively, send them as query parameters:

```text
https://door.casdoor.com/api/get-users?owner=<organization>&clientId=<client-id>&clientSecret=<client-secret>
```

### Exchange the credentials for an access token

To avoid sending the client secret with every request, exchange the credentials for an access token with the OAuth 2.0 client credentials grant.

1. Send a `POST` request to `https://<casdoor-host>/api/login/oauth/access_token`:

   ```json
   {
       "grant_type": "client_credentials",
       "client_id": "<client-id>",
       "client_secret": "<client-secret>"
   }
   ```

1. Read the access token from the response:

   ```json
   {
       "access_token": "eyJhb...",
       "token_type": "Bearer",
       "expires_in": 10080,
       "scope": "openid"
   }
   ```

1. Call the API with the token as described in [Send the token](#send-the-token).

For the details of the grant, see [Client credentials grant](/docs/how-to-connect/oauth#client-credentials-grant).

:::tip
In a B2B product, create one Casdoor application per customer organization. Each customer gets its own client ID and client secret, manages its own users and permissions, and can't reach the data of other organizations.
:::

## Authenticate with an access key and access secret {#access-key}

An access key pair is a long-lived credential that you create on the [Keys](/docs/key/overview) page. A key belongs to an organization, an application, or a user, and a request that carries it runs with the permissions of that owner.

### Create a key

1. In the Casdoor admin console, open the **Keys** page.
1. Add a key and select its **Type**: `Organization`, `Application`, or `User`.
1. Save the key and copy the access secret. Casdoor doesn't show the secret again.

### Send the key

Send the pair as query parameters:

```bash
curl "https://door.casdoor.com/api/get-global-providers?accessKey=<access-key>&accessSecret=<access-secret>"
```

## Authenticate with a username and password {#username-password}

:::caution
Don't use this method in production. The password travels in the URL, where proxies and servers can log it. Use an access token, client credentials, or an access key instead.
:::

Send the user ID, in the form `<organization>/<username>`, and the password as query parameters. The request runs as that user.

```text
https://door.casdoor.com/api/get-account?username=<organization>/<username>&password=<password>
```

Casdoor rejects this method for users who have multi-factor authentication (MFA) enabled.

## Set the response language

Casdoor localizes error messages and other text in responses. Send the `Accept-Language` header to choose the language:

```bash
curl https://door.casdoor.com/api/get-account \
  -H "Authorization: Bearer <access-token>" \
  -H "Accept-Language: fr"
```

Supported codes include `en`, `zh`, `es`, `fr`, `de`, `ja`, and `ko`. For the full list, see [Internationalization](/docs/internationalization).

## Read error responses

Every API response is a JSON object with a `status` field. A failed request returns `"status": "error"` and a localized message in `msg`. The HTTP status code stays `200`, so check `status` rather than the HTTP status.

Common errors also return a `code` field. Unlike `msg`, it doesn't depend on `Accept-Language` or the wording of the message, so your code can branch on it:

```json
{
  "status": "error",
  "code": "email-exists",
  "msg": "Email already exists",
  "sub": "",
  "name": "",
  "data": null,
  "data2": null,
  "data3": null
}
```

Errors that aren't listed below omit `code`; handle them by `status` and show `msg`.

### Duplicates

| `code` | Reason |
|---|---|
| `username-exists` | Another user in the organization has this username |
| `email-exists` | Another user in the organization has this email |
| `phone-exists` | Another user in the organization has this phone number |
| `user-exists` | Some of the imported users already exist, or a user appears twice in the uploaded file |
| `account-already-linked` | The third-party account is already linked to another user, or the user is already linked to another account of the provider |

`POST /api/add-user` checks the username before the email. If you derive the username from the email, a duplicate email returns `username-exists`.

### Invalid input

| `code` | Reason |
|---|---|
| `username-required` | The username is empty |
| `username-invalid` | The username is too short or too long, starts with a digit, contains spaces or other characters that aren't allowed, or is an email address where emails aren't allowed |
| `email-required` | The email is empty |
| `email-invalid` | The email isn't a valid email address |
| `email-domain-not-allowed` | The email domain isn't allowed to sign up |
| `phone-required` | The phone number is empty |
| `phone-invalid` | The phone number isn't valid, or isn't valid in the user's region |
| `phone-region-not-allowed` | The region of the phone number isn't allowed to sign up |
| `password-required` | The password is empty |
| `password-invalid` | The password doesn't meet the organization's password rules, or contains spaces |
| `password-reused` | The new password is the same as the current password or one of the recent passwords |
| `field-required` | A required field, such as the display name, first name, last name or affiliation, is empty |
| `field-invalid` | A field doesn't match the format the organization or application requires, or the display name isn't a valid real name |
| `parameter-required` | A required request parameter is missing |

### Invitation codes and sign-up

| `code` | Reason |
|---|---|
| `invitation-code-required` | The application requires an invitation code and none was given |
| `invitation-code-invalid` | The invitation code doesn't exist |
| `invitation-code-expired` | The invitation code has expired |
| `invitation-code-used` | The invitation code has been used up |
| `invitation-code-suspended` | The invitation code is suspended |
| `invitation-code-mismatch` | The invitation code is bound to a different username, email or phone number |
| `signup-disabled` | The application doesn't allow new users to sign up |

### Sign-in

| `code` | Reason |
|---|---|
| `user-not-found` | The user doesn't exist |
| `wrong-password` | The password or code is incorrect |
| `account-disabled` | The user is forbidden to sign in, or is a guest user who hasn't set a username and password |
| `account-deleted` | The user has been deleted |
| `account-frozen` | The user entered a wrong password or code too many times and must wait |
| `account-pending-approval` | The user is waiting for an administrator's approval |
| `password-expired` | The password has expired and must be reset |
| `mfa-failed` | The multi-factor authentication (MFA) passcode or recovery code is incorrect |
| `risk-denied` | [Adaptive risk](/docs/user/adaptive-risk) or [device trust](/docs/device-trust/overview) refused the sign-in |
| `ip-frozen` | Too many sign-ins failed from the client's IP address and it must wait |
| `ip-banned` | The client's IP address isn't in the IP whitelist of the user, application or organization |
| `signin-disabled` | The organization or application doesn't let users sign in |
| `signin-method-disabled` | The sign-in method, such as password, SMS, email, LDAP, WebAuthn, face or magic link, isn't enabled for the application |

When `enableErrorMask` is `true` in [`app.conf`](/docs/basic/configuration), an unknown user returns `wrong-password` instead of `user-not-found`, so the response doesn't reveal which accounts exist. Casdoor also stores the sign-in reason in the detail of the sign-in record.

### Sessions and permissions

| `code` | Reason |
|---|---|
| `login-required` | The request isn't signed in, or the session has expired |
| `invalid-token` | The token is invalid |
| `permission-denied` | The caller isn't allowed to perform the operation |
| `demo-mode-forbidden` | The operation isn't allowed in demo mode |
| `edition-required` | The feature needs a commercial or enterprise edition license |

### Missing objects

| `code` | Reason |
|---|---|
| `application-not-found` | The application doesn't exist |
| `organization-not-found` | The organization doesn't exist |
| `provider-not-found` | The provider doesn't exist |
| `object-not-found` | The requested object doesn't exist |

### Verification codes and magic links

| `code` | Reason |
|---|---|
| `verification-code-wrong` | The verification code is incorrect |
| `verification-code-expired` | The verification code has expired |
| `verification-code-used` | The verification code has already been used |
| `verification-code-not-sent` | No verification code has been sent to the email or phone number |
| `verification-code-too-frequent` | A code was sent too recently; wait before sending another |
| `verification-code-limit` | Too many codes have been sent to the phone number, or today's SMS quota has run out |
| `captcha-failed` | The CAPTCHA check failed |
| `email-provider-missing` | The application has no email provider to send the code |
| `sms-provider-missing` | The application has no SMS provider to send the code |
| `magic-link-invalid` | The magic link is invalid |
| `magic-link-expired` | The magic link has expired |
| `magic-link-used` | The magic link has already been used |

### Billing

| `code` | Reason |
|---|---|
| `insufficient-balance` | The user's or organization's balance would fall below its credit limit |

When `enableErrorMask2` is `true` in [`app.conf`](/docs/basic/configuration), responses carry neither `code` nor the detailed message.

## Sign a user out of all sessions

The `/api/sso-logout` endpoint signs the authenticated user out of every application, or only out of the current session.

```http
GET or POST /api/sso-logout?logoutAll=<true|false>
```

| Parameter | Required | Description |
|---|---|---|
| `logoutAll` | No | `true`, `1`, or omitted: sign out of all sessions. Any other value, such as `false`: sign out of the current session only |

| | `logoutAll=true` (default) | `logoutAll=false` |
|---|---|---|
| Sessions | Deletes all sessions of the user across all applications | Deletes the current session only |
| Access tokens | Expires all tokens issued to the user | Keeps all tokens |
| Sign-out notification | Contains all session IDs of the user and the hashes of all the user's tokens | Contains the current session ID and the hashes of all the user's tokens. The tokens stay valid |

Use `logoutAll=false` when a user signs out on one device and stays signed in on the others.

The request must be authenticated with one of the methods on this page or with the session cookie:

```bash
# Sign out of all sessions
curl -X POST https://door.casdoor.com/api/sso-logout \
  -H "Authorization: Bearer <access-token>"

# Sign out of the current session only
curl -X POST "https://door.casdoor.com/api/sso-logout?logoutAll=false" \
  -H "Authorization: Bearer <access-token>"

# Authenticate with the session cookie
curl -X POST https://door.casdoor.com/api/sso-logout \
  --cookie "casdoor_session_id=<session-id>"
```

A successful request returns:

```json
{
  "status": "ok",
  "msg": "",
  "data": ""
}
```

## Call the API from a browser

Browsers apply cross-origin resource sharing (CORS) rules to calls from your frontend to Casdoor. Casdoor compares the `Origin` header of a request with the origins that it trusts and, on a match, adds the `Access-Control-Allow-*` headers. Casdoor trusts origins at two levels.

These origins may send the session cookie (`Access-Control-Allow-Credentials: true`):

- The value of `origin` in [`app.conf`](/docs/basic/configuration)
- Any origin on the host name of the Casdoor server itself
- A loopback origin, such as `http://localhost:3000`, when Casdoor itself runs on a loopback address
- `appleid.apple.com`

These origins get CORS headers without credentials:

- The origins of the **Redirect URLs** of your applications. Clients registered through dynamic client registration don't count
- `http://localhost`, `https://localhost`, `http://127.0.0.1`, `http://casdoor-authenticator`, and `*.chromiumapp.org`, on any port
- Any origin for `POST /api/login/oauth/access_token` and `POST /api/acs`

`/api/userinfo` answers any origin, and allows credentials only for the value of `origin` or the Casdoor host. Casdoor rejects requests from other origins with HTTP 403. Responses carry `Vary: Origin`, and `Origin: null` counts as a request without an origin. The allowed methods are `GET`, `POST`, `OPTIONS`, and `DELETE`.

A request other than `GET`, `HEAD`, or `OPTIONS` from an origin without credentials runs as an anonymous user when only the session cookie authenticates it. SAML logout requests (`/api/saml/logout/...`) are the exception. Casdoor also refuses to link a provider account from such an origin.

To call the API from a frontend on another origin:

1. In the Casdoor admin console, add the URL of your frontend to the **Redirect URLs** of the application.
1. Authenticate each request with an [access token](/docs/basic/public-api#access-token) in the `Authorization` header, not with the session cookie.

## See also

- [OAuth 2.0](/docs/how-to-connect/oauth)
- [Keys](/docs/key/overview)
- [Casdoor SDKs](/docs/how-to-connect/sdk)
- [Single sign-out](/docs/session/single-sign-out)
