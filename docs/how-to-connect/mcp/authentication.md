---
title: MCP authentication
description: OAuth discovery and authentication methods for the MCP server.
keywords: [MCP, authentication, OAuth, access token]
authors: [hsluoyz]
---

## OAuth discovery

Casdoor supports [RFC 9728](https://datatracker.ietf.org/doc/html/rfc9728) OAuth 2.0 Protected Resource Metadata so MCP clients can discover auth requirements. Query the well-known endpoint:

```bash
curl https://your-casdoor.com/.well-known/oauth-protected-resource
```

The response indicates which OAuth authorization server protects the MCP resource:

```json
{
  "resource": "https://your-casdoor.com",
  "authorization_servers": ["https://your-casdoor.com"],
  "bearer_methods_supported": ["header"],
  "scopes_supported": ["openid", "profile", "email"]
}
```

For application-specific discovery, append the application name:

```bash
curl https://your-casdoor.com/.well-known/my-app/oauth-protected-resource
```

This returns metadata scoped to that specific application, useful when different applications have different authorization requirements.

## Authentication Methods

MCP requests must use one of the auth methods in [Public API authentication](/docs/basic/public-api). The authentication method you choose affects which tools you can access.

**Using an access token with scopes** (recommended for automation):

```bash
curl -X POST https://your-casdoor.com/api/mcp \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

Access tokens enforce scope-based authorization. The tools you can use depend on the scopes granted when the token was issued. This approach lets you create tokens with limited permissions for specific tasks.

**Using client credentials** (for service accounts):

```bash
curl -X POST https://your-casdoor.com/api/mcp \
  -u "CLIENT_ID:CLIENT_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

**Using session authentication** (for interactive use):

Session-based authentication through browser cookies grants access to all tools without scope restrictions. This method is intended for interactive use and maintains compatibility with existing workflows.

## Handling Unauthenticated Requests

Unauthenticated requests receive a JSON-RPC error response with a `WWW-Authenticate` header pointing to the OAuth protected resource metadata:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32001,
    "message": "Unauthorized",
    "data": "Unauthorized operation"
  }
}
```

The response includes a `WWW-Authenticate: Bearer realm="/.well-known/oauth-protected-resource"` header, allowing compliant OAuth clients to automatically discover the authorization server configuration.
