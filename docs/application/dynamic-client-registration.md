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

#### What you need

- Administrator access to the Casdoor admin console
- A client that can send HTTP requests

---

## Allow DCR for an organization {#controlling-dcr-per-organization}

DCR is off by default, for every organization including `built-in`. The registration endpoint needs no authentication, so Casdoor exposes it only after you turn it on.

1. In the Casdoor admin console, open the edit page of the organization.
1. Turn on **Enable dynamic client registration**.
1. Save the organization.

The switch sets the `dcrPolicy` field of the organization:

| `dcrPolicy` | Behavior |
|---|---|
| `disabled`, or empty | Casdoor rejects registration requests |
| `open` | Anyone can register an application in the organization, without authentication |

:::caution
Turn DCR on only for organizations that need it. Many setups work with applications that an administrator creates by hand, and leaving DCR off removes a way to abuse your Casdoor instance.
:::

## Find the registration endpoint {#registration-endpoint}

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

Store `client_id` and `client_secret` securely. The client uses them in all later OAuth 2.0 flows.

### Request parameters

| Parameter | Required | Description |
|---|---|---|
| `redirect_uris` | Yes | Array of callback URLs that Casdoor may redirect to after sign-in |
| `client_name` | No | Display name of the client. Casdoor generates a name if you omit it |
| `grant_types` | No | Grant types that the client uses. The default is `["authorization_code"]` |
| `token_endpoint_auth_method` | No | How the client authenticates at the token endpoint: `none`, `client_secret_post`, or `client_secret_basic` |
| `application_type` | No | `web` for server-side clients, or `native` for desktop and mobile clients |
| `logo_uri` | No | URL of the logo of the client |
| `client_uri` | No | URL of the home page of the client |
| `scope` | No | Space-separated list of the scopes that the client requests |

### Errors {#handling-registration-failures}

On failure, Casdoor returns an error as RFC 7591 defines it, with an `error` code and a readable `error_description`:

| Error | Cause |
|---|---|
| `invalid_redirect_uri` | `redirect_uris` is missing or invalid |
| `invalid_client_metadata` | A parameter is malformed |
| `access_denied` | DCR is turned off for the organization |

## Manage a registration {#managing-a-registered-client}

A client reads, updates, and deletes its own registration at `/api/oauth/register/<client-id>`:

| Request | Description |
|---|---|
| `GET /api/oauth/register/<client-id>` | Returns the current metadata of the client |
| `PUT /api/oauth/register/<client-id>` | Updates the metadata |
| `DELETE /api/oauth/register/<client-id>` | Deletes the client |

## What a registered client is and may do {#security-model}

Casdoor creates an application for each registered client. The application has the following properties:

- It belongs to the administrator account of the organization and appears in the application list with the tag `dcr`.
- Its tokens expire after seven days.
- Its client secret doesn't expire. An administrator can delete the application at any time.
- It runs under the restricted role `app-dcr`. With its client credentials, it can call only the endpoints of the sign-in flow: `/api/login/oauth/*`, `/api/get-oauth-token`, `/api/userinfo`, and `/api/get-application`. It can't call the management APIs.

So that users can sign in to the client right away, the application has password sign-in turned on and inherits the following settings from the default application of the organization:

| Setting | Inherited |
|---|---|
| Providers and sign-in methods | Yes, so that at least one sign-in method works |
| Branding | The theme, the footer HTML, and the form CSS. The logo too, unless the request contains `logo_uri` |
| Sign-in items | The layout of the sign-in form |
| Session and WebAuthn settings | `EnableSigninSession` and `EnableWebAuthn` |

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
- [Connect Claude Desktop to the Casdoor MCP server](/docs/how-to-connect/mcp/connect-claude-desktop)
