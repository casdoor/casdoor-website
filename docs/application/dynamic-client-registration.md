---
title: Dynamic Client Registration
description: Programmatically register OAuth applications using RFC 7591
keywords: [OAuth 2.0, DCR, dynamic registration, RFC 7591, MCP]
authors: [hsluoyz]
---

## What is Dynamic Client Registration?

When you're building a tool that needs OAuth access to Casdoor, you typically create an application through the admin interface and manually configure the client credentials. Dynamic Client Registration (DCR) eliminates this manual step—your software can register itself on the fly by making a single HTTP request.

This is especially valuable when you're distributing tools to end users. An MCP client doesn't need pre-configured credentials, a CLI tool can self-register when first run, and desktop apps can obtain their OAuth credentials during installation. Casdoor's implementation follows [RFC 7591](https://datatracker.ietf.org/doc/html/rfc7591), the OAuth 2.0 standard for dynamic registration.

## Finding the Registration Endpoint

Casdoor advertises its registration endpoint through OIDC Discovery. Query the `/.well-known/openid-configuration` endpoint to discover all available OAuth endpoints:

```bash
curl https://your-casdoor.com/.well-known/openid-configuration
```

Look for the `registration_endpoint` field in the response—that's where you'll send registration requests:

```json
{
  "issuer": "https://your-casdoor.com",
  "authorization_endpoint": "https://your-casdoor.com/login/oauth/authorize",
  "token_endpoint": "https://your-casdoor.com/api/login/oauth/access_token",
  "registration_endpoint": "https://your-casdoor.com/api/oauth/register",
  ...
}
```

## How to Register a Client

Registration is straightforward. Send a POST request to `/api/oauth/register` with your application's metadata:

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

Casdoor responds with your new client credentials:

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
