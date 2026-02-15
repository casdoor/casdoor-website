---
title: Dynamic Client Registration
description: Automatically register OAuth applications without admin intervention
keywords: [DCR, dynamic client registration, RFC 7591, OAuth, automation]
authors: [hsluoyz]
---

Dynamic Client Registration (DCR) enables applications to programmatically register themselves as OAuth clients without requiring manual configuration by administrators. This is particularly useful for MCP clients, developer tools, and scenarios where applications need to self-provision their OAuth credentials.

## How It Works

When DCR is enabled for your organization, applications can send a registration request to Casdoor's registration endpoint and receive back a client ID and secret. The entire process happens through a single API call—no admin dashboard access needed.

After a quick POST request with your application's metadata, you'll get back everything needed to start the OAuth flow: client credentials, redirect URIs, and token settings. The registered application appears in your organization's application list tagged as `dcr`, making it easy to identify auto-registered clients.

## Registration Endpoint

The registration endpoint is advertised through your OIDC discovery metadata. Applications can discover it automatically by querying:

```bash
curl https://your-casdoor.com/.well-known/openid-configuration
```

The response includes:

```json
{
  "registration_endpoint": "https://your-casdoor.com/api/oauth/register",
  ...
}
```

## Making a Registration Request

Send a POST request to `/api/oauth/register` with your application's details:

```bash
curl -X POST https://your-casdoor.com/api/oauth/register \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "My Application",
    "redirect_uris": ["https://myapp.com/callback"],
    "grant_types": ["authorization_code", "refresh_token"],
    "token_endpoint_auth_method": "client_secret_basic"
  }'
```

The `redirect_uris` array is required—everything else is optional. If you don't specify grant types or auth methods, Casdoor applies sensible defaults based on your application type.

For native or mobile apps that can't securely store secrets, use `token_endpoint_auth_method: "none"` to create a public client:

```bash
curl -X POST https://your-casdoor.com/api/oauth/register \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "Mobile App",
    "redirect_uris": ["myapp://callback"],
    "application_type": "native",
    "token_endpoint_auth_method": "none"
  }'
```

## Registration Response

When registration succeeds, you receive the client credentials and metadata:

```json
{
  "client_id": "a1b2c3d4e5f6",
  "client_secret": "s3cr3t_v4lu3_h3r3",
  "client_id_issued_at": 1737799294,
  "client_secret_expires_at": 0,
  "redirect_uris": ["https://myapp.com/callback"],
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"],
  "client_name": "My Application",
  "token_endpoint_auth_method": "client_secret_basic"
}
```

The `client_secret` is only shown once during registration. Store it securely—you won't be able to retrieve it later. Client secrets in Casdoor don't expire by default (`client_secret_expires_at: 0`), but you can rotate them through the admin interface if needed.

## Controlling DCR Access

Organization administrators control DCR availability through the **DCR Policy** setting on the organization edit page. Two policies are available:

**Open** (default) - Any application can register without authentication. This works well for public authorization servers and development environments where you want to minimize friction.

**Disabled** - Blocks all registration requests. Choose this when you need manual approval for each application or when running in environments where automated registration poses security concerns.

The policy is enforced at the organization level, so you can enable DCR for your development organization while keeping it disabled in production, or vice versa.

## Default Configuration

Applications created through DCR receive a standard configuration:

- **Owner**: `admin`
- **Organization**: The organization from the request URL
- **Token expiration**: 168 hours (7 days)
- **Tag**: `dcr` for easy identification
- **Grant types**: `authorization_code` and `refresh_token` (if not specified)
- **Auth method**: `client_secret_basic` (if not specified)

The application gets the same capabilities as manually created applications—you can configure providers, customize signin methods, or adjust token expiration through the admin interface after registration.

## Error Responses

When something goes wrong, the error response follows RFC 7591's error format:

```json
{
  "error": "invalid_redirect_uri",
  "error_description": "redirect_uris is required"
}
```

Common errors you might encounter:

- `invalid_redirect_uri` - Missing or malformed redirect URIs
- `invalid_client_metadata` - Invalid request format or unsupported parameters
- `access_denied` - DCR is disabled for this organization

The HTTP status code provides additional context: 400 for invalid requests, 403 when DCR is disabled.

## Integration with MCP

MCP clients can use DCR to automatically obtain OAuth credentials when connecting to Casdoor. The [MCP Authorization specification](https://spec.modelcontextprotocol.io/specification/basic/authorization/) recommends DCR for seamless client setup.

Here's how an MCP client would typically use DCR:

1. Discover the registration endpoint from OIDC metadata
2. Register as a client with appropriate redirect URIs
3. Use the returned credentials to complete the OAuth flow
4. Access the MCP server with the obtained access token

This eliminates the manual step of creating an application in the Casdoor UI before connecting an MCP client. For more details on using Casdoor as an MCP authorization server, see the [MCP documentation](/docs/basic/mcp).
