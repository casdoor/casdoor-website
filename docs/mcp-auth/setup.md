---
title: Setting Up the Auth Provider
description: Step-by-step guide to configure Casdoor as an OAuth provider for MCP servers
keywords: [MCP, setup, configuration, OAuth, scopes, redirect URIs, consent, JWKS]
authors: [hsluoyz]
---

This guide walks you through configuring Casdoor as the authorization server for your MCP server. You'll configure the Casdoor side (application settings, scopes, consent) and the MCP server side (Protected Resource Metadata, token validation).

## Prerequisites

- A running Casdoor instance (see [Server Installation](../basic/server-installation.mdx) or use [Casdoor Cloud](https://door.casdoor.com))
- Admin access to Casdoor's management interface
- Your MCP server's public URL (e.g., `https://your-mcp-server.com`)

## Part 1: Casdoor Configuration

### Step 1: Create an Application

Navigate to the Casdoor admin panel and create a new application for your MCP server.

1. Go to **Applications** → **Add Application**
2. Fill in the basic details:
   - **Name**: Choose a descriptive name (e.g., "My Files MCP Server")
   - **Organization**: Select the organization that will own this application
   - **Category**: Select **Agent** (this unlocks MCP-specific features)
   - **Type**: Select **MCP** (automatically set when Category is Agent)

The Agent category with MCP type optimizes the application for programmatic access and enables custom scope configuration.

**Reference**: See [Application Categories](../application/categories.md) for more details on Agent vs Default applications.

### Step 2: Configure Redirect URIs

Redirect URIs are where Casdoor sends users after authorization. For MCP servers, you need to support both development and production environments.

1. In the application settings, find **Redirect URIs**
2. Add development URIs for local testing:
   - `http://localhost:*` (wildcard for any local port)
   - `http://127.0.0.1:*`
3. Add production URIs for deployment:
   - `https://your-mcp-server.com/oauth/callback`
   - Any other callback URLs your server uses

**Example configuration**:

```text
http://localhost:*
http://127.0.0.1:*
https://mcp.example.com/oauth/callback
```

**Security note**: Wildcard URIs (`*`) are convenient for development but should be restricted in production. Consider using exact URLs for production deployments.

### Step 3: Set Grant Types

Configure which OAuth grant types your application supports.

1. Find the **Grant types** setting
2. Enable these grant types:
   - ✅ **authorization_code**: The primary OAuth flow for MCP
   - ✅ **refresh_token**: Allows long-lived access without re-authentication

**Do not enable**:

- ❌ **implicit**: Deprecated and insecure for MCP use
- ❌ **password**: Not compatible with MCP's authorization flow

### Step 4: Define Custom Scopes

Custom scopes represent the permissions your MCP server's tools require. Each scope should map to a logical capability.

1. Scroll to **Custom Scopes** section
2. Click **Add Scope** for each permission you want to define
3. For each scope, provide:
   - **Name**: Use `resource:action` format (e.g., `files:read`, `db:query`)
   - **Display Name**: Short, user-friendly name (e.g., "Read Files")
   - **Description**: Explain what the scope allows (e.g., "View and download files from your storage")

**Example scopes for a file management MCP server**:

| Name | Display Name | Description |
|------|--------------|-------------|
| `files:read` | Read Files | View and download files from your storage |
| `files:write` | Write Files | Create, modify, and delete files in your storage |
| `files:list` | List Files | See file names and metadata in directories |

**Example scopes for a database MCP server**:

| Name | Display Name | Description |
|------|--------------|-------------|
| `db:query` | Query Database | Execute read-only database queries |
| `db:modify` | Modify Database | Create, update, and delete database records |
| `db:admin` | Database Admin | Manage schemas, tables, and database settings |

**Best practices**:

- Keep scopes granular—users should be able to grant partial access
- Use consistent naming (e.g., `resource:action` pattern)
- Write clear descriptions—users see these during authorization
- Start with fewer scopes, add more as your tools evolve

**Reference**: See [Custom Scopes](../application/scopes.md) for detailed guidance.

### Step 5: Configure Consent Policy

The consent screen shows users what permissions they're granting.

1. Find **Consent Policy** setting
2. Choose one of:
   - **Always**: Show consent screen on every authorization (recommended for sensitive data)
   - **Once**: Show consent only on first authorization (better UX for frequent access)
   - **Never**: Skip consent (only for trusted first-party applications)

For MCP servers with powerful tools (file access, database modifications), we recommend **Always** or **Once** to ensure users understand what they're authorizing.

### Step 6: Enable Dynamic Client Registration (Optional)

If your MCP server will be distributed to end users who need to register their own clients:

1. Go to **Organization Settings** (not Application Settings)
2. Find **Enable Dynamic Client Registration**
3. Toggle to **Enabled**

When enabled, anyone can register new OAuth clients via `/api/oauth/register` without admin intervention. This is essential for MCP clients like Claude Desktop that auto-register on first use.

**Reference**: See [Dynamic Client Registration](../application/dynamic-client-registration.md) for implementation details.

### Step 7: Note Your Discovery URLs

Your MCP server will need these Casdoor URLs for token validation:

- **Authorization Server Metadata**: `https://your-casdoor.com/.well-known/oauth-authorization-server`
- **OIDC Discovery**: `https://your-casdoor.com/.well-known/openid-configuration`
- **JWKS Endpoint**: `https://your-casdoor.com/.well-known/jwks`

You can verify these endpoints are working:

```bash
# Check OAuth metadata
curl https://your-casdoor.com/.well-known/oauth-authorization-server

# Check OIDC discovery
curl https://your-casdoor.com/.well-known/openid-configuration

# Check JWKS (JSON Web Key Set for token validation)
curl https://your-casdoor.com/.well-known/jwks
```

## Part 2: MCP Server Configuration

Now configure your MCP server to use Casdoor for authentication.

### Step 1: Implement Protected Resource Metadata Endpoint

Your MCP server must serve a JSON document at `/.well-known/oauth-protected-resource` that tells clients where to find the authorization server.

**Endpoint**: `GET /.well-known/oauth-protected-resource`

**Response**:

```json
{
  "resource": "https://your-mcp-server.com",
  "authorization_servers": ["https://your-casdoor.com"],
  "scopes_supported": [
    "files:read",
    "files:write",
    "files:list"
  ],
  "bearer_methods_supported": ["header"]
}
```

**Field descriptions**:

- `resource`: Your MCP server's public URL (used as the `aud` claim in tokens)
- `authorization_servers`: Array of OAuth servers (just Casdoor's URL)
- `scopes_supported`: The custom scopes you defined in Step 4
- `bearer_methods_supported`: Always `["header"]` for MCP (tokens in Authorization header)

**Example implementations**:

<details>
<summary><strong>Python (Flask)</strong></summary>

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/.well-known/oauth-protected-resource')
def protected_resource_metadata():
    return jsonify({
        "resource": "https://your-mcp-server.com",
        "authorization_servers": ["https://your-casdoor.com"],
        "scopes_supported": ["files:read", "files:write", "files:list"],
        "bearer_methods_supported": ["header"]
    })
```

</details>

<details>
<summary><strong>Node.js (Express)</strong></summary>

```javascript
const express = require('express');
const app = express();

app.get('/.well-known/oauth-protected-resource', (req, res) => {
  res.json({
    resource: 'https://your-mcp-server.com',
    authorization_servers: ['https://your-casdoor.com'],
    scopes_supported: ['files:read', 'files:write', 'files:list'],
    bearer_methods_supported: ['header']
  });
});
```

</details>

<details>
<summary><strong>Go (net/http)</strong></summary>

```go
package main

import (
    "encoding/json"
    "net/http"
)

type ProtectedResourceMetadata struct {
    Resource                 string   `json:"resource"`
    AuthorizationServers     []string `json:"authorization_servers"`
    ScopesSupported          []string `json:"scopes_supported"`
    BearerMethodsSupported   []string `json:"bearer_methods_supported"`
}

func protectedResourceHandler(w http.ResponseWriter, r *http.Request) {
    metadata := ProtectedResourceMetadata{
        Resource:                 "https://your-mcp-server.com",
        AuthorizationServers:     []string{"https://your-casdoor.com"},
        ScopesSupported:          []string{"files:read", "files:write", "files:list"},
        BearerMethodsSupported:   []string{"header"},
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(metadata)
}

func main() {
    http.HandleFunc("/.well-known/oauth-protected-resource", protectedResourceHandler)
    http.ListenAndServe(":8080", nil)
}
```

</details>

### Step 2: Return 401 Challenges on Unauthorized Requests

When an MCP client connects without a valid token, your server must return a 401 response with a `WWW-Authenticate` header.

**Response headers**:

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="MCP Server", resource_metadata="https://your-mcp-server.com/.well-known/oauth-protected-resource"
Content-Type: application/json
```

**Response body**:

```json
{
  "error": "unauthorized",
  "message": "Authentication required. Use OAuth 2.0 with the authorization server listed in the Protected Resource Metadata."
}
```

The `resource_metadata` parameter in the `WWW-Authenticate` header tells the client where to find your Protected Resource Metadata endpoint.

### Step 3: Validate JWT Tokens

When a client sends a request with a Bearer token, your server must validate it against Casdoor's JWKS endpoint.

**Token validation steps**:

1. **Extract the token** from the `Authorization: Bearer <token>` header
2. **Fetch JWKS** from `https://your-casdoor.com/.well-known/jwks`
3. **Verify the signature** using the public key from JWKS
4. **Check the `aud` claim** matches your server's resource URI (`https://your-mcp-server.com`)
5. **Check the `exp` claim** to ensure the token hasn't expired
6. **Extract scopes** from the `scope` claim (space-separated string)

See [Third-party Integration](./third-party-integration.md) for complete code examples in Python, Node.js, and Go.

### Step 4: Enforce Scopes in Tool Handlers

Each MCP tool should check that the token contains the required scopes.

**Example**: A `read_file` tool requires the `files:read` scope:

```python
def read_file(token_scopes, file_path):
    if "files:read" not in token_scopes:
        raise PermissionError("Missing required scope: files:read")
    
    # Proceed with file reading
    with open(file_path, 'r') as f:
        return f.read()
```

**Best practices**:

- Check scopes before executing any privileged operation
- Return clear error messages when scopes are missing
- Log authorization failures for security auditing

## Testing Your Setup

### Test the Protected Resource Metadata

```bash
curl https://your-mcp-server.com/.well-known/oauth-protected-resource
```

Expected output:

```json
{
  "resource": "https://your-mcp-server.com",
  "authorization_servers": ["https://your-casdoor.com"],
  "scopes_supported": ["files:read", "files:write"],
  "bearer_methods_supported": ["header"]
}
```

### Test the 401 Challenge

```bash
curl -i https://your-mcp-server.com/api/mcp
```

Expected response:

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="MCP Server", resource_metadata="https://your-mcp-server.com/.well-known/oauth-protected-resource"
```

### Test with Claude Desktop (or other MCP client)

1. Configure your MCP client to connect to `https://your-mcp-server.com`
2. The client should automatically discover Casdoor via Protected Resource Metadata
3. The client will redirect you to Casdoor's authorization page
4. After consenting, the client receives a token and can call your tools

## Troubleshooting

### "Invalid redirect URI" error

**Problem**: Casdoor rejects the authorization request with an invalid redirect URI error.

**Solution**: Verify that the client's redirect URI is listed in Step 2 (Redirect URIs). For Claude Desktop, you may need `http://localhost:*`.

### "Token signature verification failed"

**Problem**: Your server can't verify Casdoor's JWT tokens.

**Solution**:

- Ensure you're using the correct JWKS endpoint: `https://your-casdoor.com/.well-known/jwks`
- Check that your server's system clock is synchronized (JWT expiry is time-sensitive)
- Verify the token is a valid JWT (use [jwt.io](https://jwt.io) to inspect it)

### "Audience mismatch" error

**Problem**: The token's `aud` claim doesn't match your server's resource URI.

**Solution**: Ensure the `resource` field in your Protected Resource Metadata exactly matches your server's public URL, including scheme (`https://`) and no trailing slash.

### Consent screen not showing

**Problem**: Users are not seeing the consent screen when authorizing.

**Solution**: Check the Consent Policy in Step 5. If set to "Never", the consent screen is skipped. Change to "Once" or "Always".

## Next Steps

- **[Integration Examples →](./third-party-integration.md)**: See complete, runnable code in Python, Node.js, and Go
- **[MCP Specification →](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)**: Read the official MCP authorization spec
- **[OAuth 2.0 in Casdoor →](../how-to-connect/oauth.md)**: Learn more about Casdoor's OAuth implementation
- **[OIDC Client →](../how-to-connect/oidc-client.md)**: Understand Casdoor's OIDC capabilities
