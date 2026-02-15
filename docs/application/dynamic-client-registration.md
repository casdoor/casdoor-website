---
title: Dynamic Client Registration
description: Programmatically register OAuth applications using RFC 7591
keywords: [OAuth 2.0, DCR, dynamic registration, RFC 7591, MCP]
authors: [hsluoyz]
---

## Introduction

Dynamic Client Registration (DCR) enables applications to register themselves with Casdoor without admin intervention. This follows the OAuth 2.0 standard defined in [RFC 7591](https://datatracker.ietf.org/doc/html/rfc7591).

Instead of manually creating applications through the web interface, your software can send an HTTP request to obtain client credentials. This is particularly useful for MCP clients, CLI tools, and other automated systems that need OAuth access.

## Registration Endpoint

The registration endpoint is advertised through OIDC Discovery at `/.well-known/openid-configuration`. Clients can query this endpoint to find the `registration_endpoint`:

```bash
curl https://your-casdoor.com/.well-known/openid-configuration
```

The response includes:

```json
{
  "issuer": "https://your-casdoor.com",
  "authorization_endpoint": "https://your-casdoor.com/login/oauth/authorize",
  "token_endpoint": "https://your-casdoor.com/api/login/oauth/access_token",
  "registration_endpoint": "https://your-casdoor.com/api/oauth/register",
  ...
}
```

## Registering a Client

To register a new OAuth application, send a POST request to `/api/oauth/register`:

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

The server responds with your new client credentials:

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

Save the `client_id` and `client_secret` - you'll need them for OAuth flows.

## Request Parameters

The registration request accepts these fields:

- **redirect_uris** (required): Array of allowed callback URLs
- **client_name**: Human-readable application name
- **grant_types**: OAuth grant types, defaults to `["authorization_code"]`
- **token_endpoint_auth_method**: Client authentication method (`none`, `client_secret_post`, `client_secret_basic`)
- **application_type**: Either `web` or `native`
- **logo_uri**: URL to application logo
- **client_uri**: URL to application homepage
- **scope**: Space-separated OAuth scopes

If you omit optional fields, Casdoor applies secure defaults. Applications are created with a 7-day token expiration and tagged with `dcr` for easy identification.

## Organization Policy

Each organization controls DCR availability through the `dcrPolicy` setting:

- **open** (default): Anyone can register applications
- **disabled**: DCR is turned off, applications must be created manually

Organization admins can find this setting in the organization configuration page. When disabled, registration requests return an error indicating DCR is not available.

## Security Considerations

DCR requires no authentication - any client can register. This is by design for public clients like mobile apps or desktop tools. However, consider these points:

The created applications belong to the organization's admin account. They appear in your application list tagged as `dcr` for audit purposes. Client secrets don't expire by default (`client_secret_expires_at: 0`), but you can revoke applications anytime through the admin interface.

For production deployments, monitor DCR usage and consider disabling it for organizations that don't need automated registration. The feature shines when building developer tools, MCP servers, or other scenarios where manual app creation creates friction.

## Example: MCP Client Setup

Here's how an MCP client might use DCR:

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

The client can now proceed with the standard OAuth authorization code flow using these credentials.

## Error Responses

Registration failures return RFC 7591 compliant error responses:

```json
{
  "error": "invalid_redirect_uri",
  "error_description": "redirect_uris is required"
}
```

Common errors include:

- `invalid_redirect_uri`: Missing or malformed redirect URIs
- `invalid_client_metadata`: Invalid parameter values
- `access_denied`: DCR is disabled for this organization

Check the `error_description` field for details about what went wrong.
