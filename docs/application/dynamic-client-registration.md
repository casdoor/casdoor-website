---
title: Register clients dynamically
sidebar_label: Dynamic client registration
description: Let software register itself as an OAuth 2.0 client of Casdoor with one HTTP request, as defined in RFC 7591, and control where this is allowed.
keywords: [OAuth 2.0, DCR, dynamic registration, RFC 7591, MCP]
authors: [hsluoyz]
---

This guide explains dynamic client registration (DCR): software registers itself as an OAuth 2.0 client of Casdoor with one HTTP request, and nobody creates an application in the admin console. DCR suits tools that you ship to end users, such as MCP clients, CLIs, and desktop applications, which get their client credentials on first run. Casdoor implements [RFC 7591](https://datatracker.ietf.org/doc/html/rfc7591) and [RFC 7592](https://datatracker.ietf.org/doc/html/rfc7592).

---

#### Learning outcomes

- Allow DCR for an organization.
- Find the registration endpoint and register a client.
- Read, update, and delete a registration.
- Understand what a registered client may do.
- Accept clients that identify themselves with a metadata document URL.

#### What you need

- Global administrator access to the Casdoor admin console
- A client that can send HTTP requests

---

## Allow DCR for an organization {#controlling-dcr-per-organization}

DCR is off by default, for every organization including `built-in`. The registration endpoint needs no authentication, so Casdoor exposes it only after you turn it on.

1. In the Casdoor admin console, open the edit page of the organization.
1. Turn on **Enable dynamic client registration**.
1. Save the organization.

Only a global administrator can change this switch. For an organization admin, the switch is disabled, and Casdoor ignores a change sent through the API.

The switch sets the `dcrPolicy` field of the organization:

| `dcrPolicy` | Behavior |
|---|---|
| `disabled`, or empty | Casdoor rejects registration requests |
| `open` | Anyone can register an application in the organization, without authentication |

:::caution
Turn DCR on only for organizations that need it. Many setups work with applications that an administrator creates by hand, and leaving DCR off removes a way to abuse your Casdoor instance.
:::

## Find the registration endpoint {#registration-endpoint}

The registration endpoint is `/api/oauth/register`. It takes an optional `organization` query parameter, the organization in which Casdoor creates the client. The default is `built-in`.

The discovery document advertises the endpoint. Request it:

```bash
curl https://your-casdoor.com/.well-known/openid-configuration
```

Read the value of `registration_endpoint`:

```json
{
  "issuer": "https://your-casdoor.com",
  "authorization_endpoint": "https://your-casdoor.com/login/oauth/authorize",
  "token_endpoint": "https://your-casdoor.com/api/login/oauth/access_token",
  "registration_endpoint": "https://your-casdoor.com/api/oauth/register",
  ...
}
```

The global discovery document has no `organization` parameter, so clients register in `built-in`. Two other discovery documents return `https://your-casdoor.com/api/oauth/register?organization=<organization>`, so that a client registers in that organization:

- The discovery document of an application, `/.well-known/<application>/openid-configuration`, with the organization of the application.
- The discovery document of an organization that has **Use organization issuer** turned on, `/.well-known/oauth-authorization-server/orgs/<organization>` or `/.well-known/openid-configuration/orgs/<organization>`. Its issuer is `https://your-casdoor.com/orgs/<organization>`. The [MCP gateway](/docs/how-to-connect/mcp/gateway) names this issuer as the authorization server of the MCP servers of the organization.

## Register a client {#registering-a-client}

Send a `POST` request with the metadata of the client as JSON to the registration endpoint:

```bash
curl -X POST https://your-casdoor.com/api/oauth/register \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "Claude Desktop",
    "redirect_uris": ["http://localhost:3000/callback"],
    "grant_types": ["authorization_code", "refresh_token"],
    "token_endpoint_auth_method": "none",
    "application_type": "native"
  }'
```

The response contains the credentials of the new client:

```json
{
  "client_id": "a1b2c3d4e5f6",
  "client_secret": "secret_xyz789...",
  "client_id_issued_at": 1737799294,
  "client_secret_expires_at": 0,
  "redirect_uris": ["http://localhost:3000/callback"],
  "grant_types": ["authorization_code", "refresh_token"],
  "token_endpoint_auth_method": "none",
  "application_type": "native"
}
```

Store `client_id` and `client_secret` securely. The client uses them in all later OAuth 2.0 flows. The response also contains `registration_client_uri` and `registration_access_token`, which the client needs to [manage its registration](/docs/application/dynamic-client-registration#managing-a-registered-client).

### Request parameters

| Parameter | Required | Description |
|---|---|---|
| `redirect_uris` | Yes | Array of callback URLs that Casdoor may redirect to after sign-in |
| `client_name` | No | Display name of the client. Casdoor generates a name if you omit it |
| `grant_types` | No | Grant types that the client uses: `authorization_code`, `refresh_token`, `urn:ietf:params:oauth:grant-type:device_code`, or `urn:ietf:params:oauth:grant-type:jwt-bearer`, which a registered client can use only to redeem an [ID-JAG](/docs/mcp-auth/enterprise-managed-authorization). Casdoor drops any other value without an error. The default is `["authorization_code"]` |
| `token_endpoint_auth_method` | No | How the client authenticates at the token endpoint: `none`, `client_secret_post`, `client_secret_basic`, or `private_key_jwt` |
| `jwks_uri` | With `private_key_jwt` | HTTPS URL of the key set whose keys sign the `client_assertion` of the client ([RFC 7523](https://www.rfc-editor.org/rfc/rfc7523)) |
| `application_type` | No | `web` for server-side clients, or `native` for desktop and mobile clients |
| `logo_uri` | No | URL of the logo of the client |
| `client_uri` | No | URL of the home page of the client |
| `policy_uri` | No | URL of the privacy policy of the client |
| `tos_uri` | No | URL of the terms of service of the client. Casdoor sets it as the **Terms of Use** of the application |
| `scope` | No | Space-separated list of the scopes that the client requests |

### Errors {#handling-registration-failures}

On failure, Casdoor returns an error as RFC 7591 defines it, with an `error` code and a readable `error_description`:

| Error | Cause |
|---|---|
| `invalid_redirect_uri` | `redirect_uris` is missing, or an entry uses the `javascript:`, `data:`, or `vbscript:` scheme |
| `invalid_client_metadata` | DCR is turned off for the organization, the organization doesn't exist, or a parameter is malformed. `logo_uri`, `client_uri`, `policy_uri`, and `tos_uri` must be absolute `http` or `https` URLs |

## Manage a registration {#managing-a-registered-client}

A client reads, updates, and deletes its own registration at `/api/oauth/register/<client-id>`. Each request sends the `registration_access_token` from the registration response in the `Authorization: Bearer <registration-access-token>` header:

| Request | Description |
|---|---|
| `GET /api/oauth/register/<client-id>` | Returns the current metadata of the client |
| `PUT /api/oauth/register/<client-id>` | Updates the metadata |
| `DELETE /api/oauth/register/<client-id>` | Deletes the client |

## What a registered client is and may do {#security-model}

Casdoor creates an application for each registered client. The application has the following properties:

- It belongs to the organization of the registration endpoint and appears in the application list with the tag `dcr`, the category `Agent`, and the type `MCP`.
- Its client secret doesn't expire. An administrator can delete the application at any time.
- It runs under the restricted role `app-dcr`. With its client credentials, it can call only the endpoints of the sign-in flow: `/api/login/oauth/*`, `/api/get-oauth-token`, `/api/userinfo`, and `/api/get-application`. It can't call the management APIs.
- A token that a user gets through the client, and the session that comes with it, can call only `/api/userinfo`, `/api/user`, `/api/mcp`, `/api/login/oauth`, and `/api/server/*`. Casdoor denies other requests with such a token. If the browser only sends the session cookie that such a request left behind, Casdoor signs that session out and handles the request as anonymous. Anyone can register a client and ask users to authorize it, so the client can't use their tokens to manage Casdoor.

So that users can sign in to the client right away, the application has password sign-in turned on and inherits the following settings from the default application of the organization:

| Setting | Inherited |
|---|---|
| Providers and sign-in methods | Yes, so that at least one sign-in method works |
| Branding | The theme, the footer HTML, and the form CSS. The logo too, unless the request contains `logo_uri` |
| Sign-in items | The layout of the sign-in form |
| Session and WebAuthn settings | `EnableSigninSession` and `EnableWebAuthn` |
| Token lifetimes | **Token expire**, **Refresh token expire**, and **Cookie expire**, when they are above `0`. Otherwise, the access token lasts 168 hours, and the refresh token and the cookie last 720 hours |

The token format and the token fields don't come from the default application. They come from the **Default token format** and the **Default token fields** of the organization. See [Organizations](/docs/organization/overview).

## Accept clients identified by a metadata document URL {#client-id-metadata-documents}

A client can skip registration and use as its `client_id` an HTTPS URL that points to a client ID metadata document, as MCP clients do. The document is a JSON file with the same metadata as a registration request. Casdoor follows [draft-ietf-oauth-client-id-metadata-document](https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/).

### Which organization {#cimd-organization}

The same client, such as ChatGPT, Claude, or VS Code, has one client ID URL for all the Casdoor instances and organizations that it connects to. Casdoor therefore keeps one application per URL, shared by all organizations, and serves it as an application of the organization that the user signs in to:

- The organization comes from the `organization` parameter of the authorization endpoint. The discovery document of an application, and that of an organization with **Use organization issuer**, add this parameter to `authorization_endpoint`. Without it, the organization is `built-in`.
- Casdoor accepts the URL only when **Enable dynamic client registration** is on for that organization. Otherwise, the authorization request fails with "client ID metadata documents are not accepted, enable dynamic client registration of the organization: <organization> first". The discovery document shows the setting in `client_id_metadata_document_supported`.
- The user signs in on the sign-in page of the organization, and the tokens carry the issuer of the user's organization, also after a refresh.

The application belongs to `built-in`, has **Is shared** turned on, the URL as its client ID, a name that starts with `cimd_`, and the tag `cimd`. An application that an earlier version of Casdoor added to another organization becomes such a shared application on its next fetch.

### The document {#cimd-document}

The `client_id` URL must use `https`, have a path other than `/`, and contain no user information, no `#` fragment, and no `.` or `..` segments.

At `/login/oauth/authorize`, Casdoor fetches the document with a `GET` request. The request has a timeout of 5 seconds, doesn't follow redirects, and goes only to public Internet addresses. The document must meet these rules:

- The response is HTTP 200, valid JSON, and at most 16 KB.
- `client_id` equals the URL, and there is no `client_secret`.
- `token_endpoint_auth_method` is empty or `none`, for a public client with PKCE, or `private_key_jwt` with an HTTPS `jwks_uri`, for a client that signs a `client_assertion`, such as ChatGPT.
- `redirect_uris` holds at least one full URL.
- The other metadata follows the rules of a registration request. `grant_types` defaults to `["authorization_code"]`.

The application uses the same defaults and inherited settings as a registered client, taken from the default application of `built-in`. The display name is `<client_name> (<host>)`, or the host. The home page is `client_uri` when it is on the same host, and `https://<host>` otherwise.

On later authorization requests, Casdoor fetches the document again at most once an hour and updates the name, the home page, the redirect URLs, the grant types, the terms of use, the logo, and the key set. If an application without the tag `cimd` already has the URL as its client ID, Casdoor uses that application as it is.

## Example: an MCP client {#complete-example-mcp-client}

The following JavaScript discovers the registration endpoint and registers a client:

```javascript
// Discover the registration endpoint
const discovery = await fetch('https://your-casdoor.com/.well-known/openid-configuration')
  .then(r => r.json());

// Register the application
const registration = await fetch(discovery.registration_endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    client_name: 'MCP Client',
    redirect_uris: ['http://127.0.0.1:6437/callback'],
    grant_types: ['authorization_code', 'refresh_token'],
    token_endpoint_auth_method: 'none',
    application_type: 'native'
  })
}).then(r => r.json());

// Store credentials for OAuth flows
const { client_id, client_secret } = registration;
```

With the credentials, the client runs the authorization code flow: the user signs in in the browser, Casdoor redirects to the callback URL with an authorization code, and the client exchanges the code for tokens. See [OAuth 2.0](/docs/how-to-connect/oauth).

## See also

- [OAuth 2.0](/docs/how-to-connect/oauth)
- [Application categories](/docs/application/categories)
- [Organizations](/docs/organization/overview)
- [Put MCP servers behind the Casdoor MCP gateway](/docs/how-to-connect/mcp/gateway)
- [Connect Claude to the Casdoor MCP server](/docs/how-to-connect/mcp/connect-claude-desktop)
- [Enterprise-managed authorization with ID-JAG](/docs/mcp-auth/enterprise-managed-authorization)
