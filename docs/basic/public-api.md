---
title: Public API
description: Authenticate and call the Casdoor REST API from your apps and scripts.
keywords: [API, REST, authentication, OAuth, M2M]
authors: [hsluoyz]
---

The Casdoor web UI is a React [SPA](https://developer.mozilla.org/en-US/docs/Glossary/SPA) that talks to the same REST API as your code. That API is the **Casdoor Public API**: anything the UI does can be done via HTTP. It is used by:

- The Casdoor frontend
- Casdoor SDKs (e.g. casdoor-go-sdk)
- Your own applications and scripts

**API reference:** [https://door.casdoor.com/swagger](https://door.casdoor.com/swagger). To regenerate the Swagger spec, see [Developer guide – Swagger](/docs/developer-guide/swagger#generate-swagger-files).

## Response language

Responses can be localized. Send the `Accept-Language` header to get error messages and other text in that language:

```bash
# Example: Get error messages in French
curl -X GET https://door.casdoor.com/api/get-account \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Accept-Language: fr"
```

Supported codes include `en`, `zh`, `es`, `fr`, `de`, `ja`, `ko`, and others. See [Internationalization](/docs/internationalization) for the full list.

## Machine-to-machine (M2M) authentication

M2M authentication is for services or scripts that call the API **without a user present**. Use it for:

- Backend services calling Casdoor programmatically
- CLI tools using access tokens
- B2B: per-organization apps with their own client credentials
- Scheduled jobs, sync, and system integrations
- Service-to-service auth

Casdoor supports M2M via:

1. **Client Credentials Grant (OAuth 2.0)** — Recommended. Use [Client ID and Client Secret](/docs/how-to-connect/oauth#client-credentials-grant) to obtain an access token.
2. **Client ID + Client Secret on each request** — Pass credentials directly (see method #2 below).

### Typical M2M use cases

- **Per-organization API access:** One application per organization; client credentials give that org’s admin-level access.
- **Tokens for downstream services:** Use Client Credentials to get tokens for CLIs or other services.
- **Service-to-service:** Backend calls the API as the application (org-admin equivalent).

## How to authenticate

### 1. Access token (user context)

Use the access token obtained after a user signs in (e.g. from the OAuth code exchange). API calls run with that user’s permissions.

#### Getting the token

The app receives the token at the end of the OAuth login flow (code + state). Issued tokens are also visible in the Casdoor UI (**Tokens** page, e.g. `https://door.casdoor.com/tokens`).

Example (Go, casdoor-go-sdk):

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

#### Sending the token

1. **Query parameter:**

    ```shell
    /page?access_token=<The access token>
    ```

    Demo site example: `https://door.casdoor.com/api/get-global-providers?access_token=eyJhbGciOiJSUzI1NiIs`

2. **Bearer header:**

    ```shell
    Authorization: Bearer <The access token>
    ```

### 2. Client ID and Client Secret (M2M)

Use this for **machine-to-machine** calls (no user). Permissions are those of the application (equivalent to the organization admin).

#### Getting credentials

On the application edit page (e.g. `https://door.casdoor.com/applications/casbin/app-vue-python-example`) you’ll see **Client ID** and **Client Secret**.

#### Use cases

- **Service authentication**: Backend services calling Casdoor APIs programmatically
- **Organization management**: In B2B scenarios, create an application per organization to enable them to manage users and generate tokens independently
- **Token generation**: Obtain access tokens via the [OAuth Client Credentials Grant](/docs/how-to-connect/oauth#client-credentials-grant) flow for distribution to CLI tools or other services

#### Sending credentials

1. **Query parameters:** `/page?clientId=<clientId>&clientSecret=<clientSecret>`

2. **HTTP Basic Auth** — Header:

    ```shell
    Authorization: Basic <The Base64 encoding of client ID and client secret joined by a single colon ":">
    ```

Use any standard library for Base64-encoding `clientId:clientSecret`.

#### Getting an access token (Client Credentials flow)

To use a Bearer token instead of sending client ID/secret on every request, use the **Client Credentials Grant**:

1. Make a POST request to `https://<CASDOOR_HOST>/api/login/oauth/access_token` with:

    ```json
    {
        "grant_type": "client_credentials",
        "client_id": "YOUR_CLIENT_ID",
        "client_secret": "YOUR_CLIENT_SECRET"
    }
    ```

2. The response contains an access token:

    ```json
    {
        "access_token": "eyJhb...",
        "token_type": "Bearer",
        "expires_in": 10080,
        "scope": "openid"
    }
    ```

3. Call the API with the `access_token` as a Bearer token (same as method #1).

See [Client Credentials Grant](/docs/how-to-connect/oauth#client-credentials-grant) for full details.

:::info

**For B2B**: Create separate Casdoor applications per customer organization. Each application has its own `client_id` and `client_secret`, which your customers can use to:

- Authenticate as their organization (with admin privileges)
- Generate access tokens for their users or services
- Manage their organization's users and permissions independently
- Integrate your APIs into their systems without UI-based login flows

This approach allows you to delegate organization management to your customers while maintaining security and isolation between different organizations.

:::

### 3. Access key and Access secret (user context)

A user can have an **access key** and **access secret** (set in the account settings by the user or an admin, or via the `update-user` API). Requests using them run as that user.

#### Setup

Create a key pair on the user’s account settings page.

#### Sending them

**Query parameters:**

    ```shell
    /page?accessKey=<The user's access key>&accessSecret=<the user's access secret>"
    ```

Example: `https://door.casdoor.com/api/get-global-providers?accessKey=...&accessSecret=...`

![User Api Key](/img/basic/user_api_key.png)

```bash
curl --location 'http://door.casdoor.com/api/user?accessKey=b86db9dc-6bd7-4997-935c-af480dd2c796&accessSecret=79911517-fc36-4093-b115-65a9741f6b14'
```

### 4. Username and password

:::caution
**Not recommended.** Credentials are sent as query parameters and may be logged or visible on the network. Use only for compatibility or local demos. Prefer access token, client credentials, or access key/secret.
:::

Username format: `<organization>/<username>`. API calls run as that user.

**Query parameters:**

    ```shell
    /page?username=<The user's organization name>/<The user name>&password=<the user's password>"
    ```

## SSO logout

The `/api/sso-logout` endpoint logs a user out from all applications or only the current session, depending on `logoutAll`.

### Endpoint

```http
GET or POST /api/sso-logout?logoutAll=<true|false>
```

### Parameters

- **logoutAll** (optional): `true`, `1`, or omit → logout from all sessions and expire all tokens. `false` or `0` → current session only.

### Behavior

**Full SSO logout** (default):

- Deletes all active sessions for the user across all applications
- Expires all access tokens issued to the user
- Sends logout notifications with all session IDs and token hashes

**Session-only logout**:

- Deletes only the current session
- Preserves other active sessions and tokens
- Sends logout notification with only the current session ID

Use session-only logout when users should sign out from one device but stay signed in elsewhere.

### Authentication

The user must be authenticated. Use any of the [authentication methods](#how-to-authenticate) above.

### Example Request

```bash
# Full SSO logout (all sessions)
curl -X POST https://door.casdoor.com/api/sso-logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Session-level logout (current session only)
curl -X POST "https://door.casdoor.com/api/sso-logout?logoutAll=false" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Using session cookie
curl -X POST https://door.casdoor.com/api/sso-logout \
  --cookie "casdoor_session_id=abc123def456"
```

### Response

```json
{
  "status": "ok",
  "msg": "",
  "data": ""
}
```

## CORS

Casdoor sets CORS headers so browsers can call the API from your frontend. Allowed origins include:

- Your application’s **Redirect URIs**
- The Casdoor server hostname
- Configured origin in Casdoor settings
- Special cases: `/api/login/oauth/access_token`, `/api/userinfo`, and origin `appleid.apple.com`

The server checks the request `Origin` against these; if it matches, it adds the appropriate `Access-Control-Allow-*` headers. For `OPTIONS` preflight, allowed methods include `GET`, `POST`, `OPTIONS`, `DELETE`, with credentials supported.

**To allow your app:** Add your frontend origin to the application’s **Redirect URIs** in the Casdoor admin.
