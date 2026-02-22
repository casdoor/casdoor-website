---
title: Dynamic client registration
description: Register OAuth clients programmatically via RFC 7591 (DCR).
keywords: [OAuth 2.0, DCR, dynamic registration, RFC 7591, MCP]
authors: [hsluoyz]
---

**Dynamic Client Registration (DCR)** lets your software register an OAuth client with Casdoor in one HTTP request instead of creating an application manually in the admin UI. That helps when you ship tools to end users: MCP clients, CLIs, or desktop apps can obtain client credentials at first run or install. Casdoor implements [RFC 7591](https://datatracker.ietf.org/doc/html/rfc7591).

## Registration endpoint

The endpoint is advertised in OIDC discovery. Request `/.well-known/openid-configuration`:

```bash
curl https://your-casdoor.com/.well-known/openid-configuration
```

Use the `registration_endpoint` value (e.g. `/api/oauth/register`) for registration:

```json
{
  "issuer": "https://your-casdoor.com",
  "authorization_endpoint": "https://your-casdoor.com/login/oauth/authorize",
  "token_endpoint": "https://your-casdoor.com/api/login/oauth/access_token",
  "registration_endpoint": "https://your-casdoor.com/api/oauth/register",
  ...
}
```

## Registering a client

POST to `/api/oauth/register` with JSON metadata:

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

Response includes the new client credentials:

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

Store the `client_id` and `client_secret` securely—you'll use them for all subsequent OAuth flows.

## Request Parameters

Your registration request needs at least one redirect URI. Everything else is optional, with Casdoor applying sensible defaults:

- **redirect_uris** (required): Array of allowed callback URLs where Casdoor redirects after authentication
- **client_name**: Display name for your application (auto-generated if omitted)
- **grant_types**: OAuth grant types your app will use—defaults to `["authorization_code"]`
- **token_endpoint_auth_method**: How your app authenticates at the token endpoint (`none`, `client_secret_post`, or `client_secret_basic`)
- **application_type**: Either `web` for server-side apps or `native` for desktop/mobile apps
- **logo_uri**: URL to your application's logo
- **client_uri**: URL to your application's homepage
- **scope**: Space-separated list of OAuth scopes your app requests

Applications created through DCR get a 7-day token expiration and are tagged with `dcr` for easy identification in the admin interface.

## Controlling DCR Per Organization

Organizations can control whether DCR is available through the `dcrPolicy` setting in the organization configuration page. When set to "disabled", registration requests will fail with an error. The default is "open", allowing anyone to register applications.

This gives you flexibility: enable DCR for developer-friendly organizations while keeping it locked down for production environments that require manual oversight.

## Security Model

DCR intentionally requires no authentication—this is by design for public clients like mobile apps and desktop tools that can't securely store credentials before registration. The model trades off unrestricted registration for the ability to support these client types.

Applications created through DCR belong to the organization's admin account and appear in your application list with a `dcr` tag. Client secrets never expire by default, but you can revoke any application through the admin interface at any time. For production deployments, consider whether your organization actually needs unauthenticated registration. Many scenarios work fine with manual app creation, and disabling DCR removes a potential abuse vector.

## Complete Example: MCP Client

Here's how an MCP client might implement DCR from scratch:

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

With these credentials, the client proceeds through the standard OAuth authorization code flow. The user authenticates in their browser, Casdoor redirects back to your callback URL with an authorization code, and you exchange it for access tokens.

## Handling Registration Failures

When something goes wrong, Casdoor returns RFC 7591 compliant errors with an `error` code and human-readable `error_description`. The most common issues: missing redirect URIs (`invalid_redirect_uri`), malformed parameters (`invalid_client_metadata`), or DCR being disabled for the organization (`access_denied`). Check the description field for specifics on what needs to be fixed.
