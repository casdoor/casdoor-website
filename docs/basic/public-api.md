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

## API Response Language

Casdoor APIs support internationalized responses. The default response language is English. To receive error messages and other text content in your preferred language, include the `Accept-Language` header in your API requests:

```bash
# Example: Get error messages in French
curl -X GET https://door.casdoor.com/api/get-account \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Accept-Language: fr"
```

Supported language codes include `en`, `zh`, `es`, `fr`, `de`, `ja`, `ko`, and more. For a complete list and more details, see the [Internationalization](/docs/internationalization) documentation.

## Machine-to-Machine (M2M) Authentication

Machine-to-machine (M2M) authentication is designed for scenarios where services, applications, or backend systems need to authenticate and communicate with APIs **without user interaction**. This is particularly useful for:

- **Backend services** calling Casdoor APIs programmatically
- **CLI tools** that need to interact with your APIs using access tokens
- **B2B enterprise scenarios** where organizations need to generate tokens for API access (e.g., admin tokens for management operations, read tokens for data access)
- **Automated processes** such as scheduled jobs, data synchronization, or system integrations
- **Microservices** that need to authenticate with each other

Casdoor supports M2M authentication through the following methods:

1. **Client Credentials Grant (OAuth 2.0)**: The recommended approach for M2M scenarios. This uses the [Client Credentials Grant flow](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4) where applications authenticate using their `Client ID` and `Client Secret` to obtain access tokens. See the [OAuth Client Credentials Grant](/docs/how-to-connect/oauth#client-credentials-grant) documentation for details on obtaining tokens via this flow.

2. **Direct API Authentication with Client ID and Secret**: Use the application's credentials directly in API calls (see method #2 below).

### Use Cases for M2M Authentication

- **Organization-level API access**: In B2B scenarios, you can create a Casdoor application for each organization. The application's client credentials provide admin-level permissions for that organization, enabling them to manage their users, generate tokens, and access organizational resources independently.

- **Token generation for downstream services**: Generate access tokens programmatically (using Client Credentials Grant) that can be distributed to CLI tools, read-only services, or other applications that need scoped access to your APIs.

- **Service-to-service authentication**: Backend services can authenticate as an "application" rather than as a user, with permissions equivalent to the organization admin.

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

### 2. By `Client ID` and `Client secret` (Machine-to-Machine)

This method is the primary approach for **machine-to-machine (M2M) authentication**. It allows applications, services, or backend systems to authenticate with Casdoor APIs without any user interaction.

#### How to get the client ID and secret?

The application edit page (e.g., <https://door.casdoor.com/applications/casbin/app-vue-python-example>) will show the client ID and secret for an application. This authentication method is useful when you want to call the API as a "machine", "application", or a "service" instead of a user. The permissions for the API calls will be the same as the application (equivalent to the admin of the organization).

#### Use cases

- **Service authentication**: Backend services calling Casdoor APIs programmatically
- **Organization management**: In B2B scenarios, create an application per organization to enable them to manage users and generate tokens independently
- **Token generation**: Obtain access tokens via the [OAuth Client Credentials Grant](/docs/how-to-connect/oauth#client-credentials-grant) flow for distribution to CLI tools or other services

#### How to authenticate?

1. HTTP `GET` parameter, the URL format is:

    ```shell
    /page?clientId=<The client ID>&clientSecret=<the client secret>
    ```

    Demo site example: `https://door.casdoor.com/api/get-global-providers?clientId=294b09fbc17f95daf2fe&clientSecret=dd8982f7046ccba1bbd7851d5c1ece4e52bf039d`

2. [HTTP Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication), the HTTP header format is:

    ```shell
    Authorization: Basic <The Base64 encoding of client ID and client secret joined by a single colon ":">
    ```

If you are not familiar with the Base64 encoding, you can use a library to do that because `HTTP Basic Authentication` is a popular standard supported by many places.

#### Obtaining access tokens with Client Credentials

For machine-to-machine scenarios where you need to obtain an access token (rather than using client credentials directly), use the **OAuth 2.0 Client Credentials Grant** flow:

1. Make a POST request to `https://<CASDOOR_HOST>/api/login/oauth/access_token` with:

    ```json
    {
        "grant_type": "client_credentials",
        "client_id": "YOUR_CLIENT_ID",
        "client_secret": "YOUR_CLIENT_SECRET"
    }
    ```

2. You will receive an access token response:

    ```json
    {
        "access_token": "eyJhb...",
        "token_type": "Bearer",
        "expires_in": 10080,
        "scope": "openid"
    }
    ```

3. Use the `access_token` to call Casdoor APIs (see method #1 above).

For more details, see the [Client Credentials Grant](/docs/how-to-connect/oauth#client-credentials-grant) documentation.

:::info

**For B2B Enterprises**: You can create separate Casdoor applications for each of your customer organizations. Each application has its own `client_id` and `client_secret`, which your customers can use to:

- Authenticate as their organization (with admin privileges)
- Generate access tokens for their users or services
- Manage their organization's users and permissions independently
- Integrate your APIs into their systems without UI-based login flows

This approach allows you to delegate organization management to your customers while maintaining security and isolation between different organizations.

:::

### 3. By `Access key` and `Access secret`

We can use the access key and access secret for a Casdoor user to call `Casdoor Public API` as the user itself. The access key and access secret can be configured in the user setting page by an admin or the user himself. the `update-user` API can also be called to update these fields. The permissions for the API calls will be the same as the user.

#### How to authenticate?

1. Create a pair of accessKey and accessSecret in account setting page.

2. HTTP `GET` parameter, the URL format is:

    ```shell
    /page?accessKey=<The user's access key>&accessSecret=<the user's access secret>"
    ```

Demo site example: `https://door.casdoor.com/api/get-global-providers?accessKey=b86db9dc-6bd7-4997-935c-af480dd2c796/admin&accessSecret=79911517-fc36-4093-b115-65a9741f6b14`

![User Api Key](/img/basic/user_api_key.png)

```bash
curl --location 'http://door.casdoor.com/api/user?accessKey=b86db9dc-6bd7-4997-935c-af480dd2c796&accessSecret=79911517-fc36-4093-b115-65a9741f6b14'
```

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

## CORS (Cross-Origin Resource Sharing)

Casdoor implements flexible CORS handling to allow secure cross-origin API requests. The server validates the `Origin` header and returns appropriate `Access-Control-Allow-Origin` headers based on the following rules:

**Allowed origins:**

- Origins matching your application's **redirect URIs** (configured in the application settings)
- Origins matching the Casdoor server's own hostname
- The configured origin in Casdoor's settings
- Special endpoint exceptions: requests to `/api/login/oauth/access_token` and `/api/userinfo` endpoints, and requests with origin `appleid.apple.com`

**How it works:**

When you make a cross-origin API request, Casdoor validates the origin through multiple checks: localhost/intranet addresses, matching redirect URIs in any application, matching the server's hostname, or configured origins. If any validation passes, the server includes CORS headers in the response allowing the request. For preflight `OPTIONS` requests, Casdoor returns appropriate headers including allowed methods (`POST`, `GET`, `OPTIONS`, `DELETE`) and credentials support.

**Configuration:**

To enable CORS for your application, add your frontend's origin to the application's **Redirect URIs** in the Casdoor admin panel. This allows your application to make authenticated API calls from the browser.
