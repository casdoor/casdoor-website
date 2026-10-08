---
title: MCP troubleshooting
description: Causes and fixes for common problems with the Casdoor MCP server and with MCP servers that use Casdoor as their OAuth 2.0 provider.
keywords: [MCP, OAuth, troubleshooting, debugging, errors]
authors: [hsluoyz]
---

This page covers problems with the built-in MCP server of Casdoor and with your own MCP servers that use Casdoor as their OAuth 2.0 provider.

## Common problems {#common-errors}

### The MCP server answers with HTTP 401

**Causes**

- The access token has expired.
- The `aud` (audience) claim of the token doesn't match the resource URI of the MCP server.
- The request has no `Authorization: Bearer` header.

**Solution**

1. Decode the token, for example at [jwt.io](https://jwt.io), and check the `exp` claim.
1. Check that the `aud` claim is exactly the URI of your MCP server, including the scheme, the host, and the port.
1. Check that the request carries the header `Authorization: Bearer <access-token>`.
1. If your client sends the `resource` parameter in the OAuth 2.0 flow, check that it is the URI of the MCP server.

```bash
# Example: Check token claims
curl -X GET https://your-mcp-server.com/api/mcp \
  -H "Authorization: Bearer YOUR_TOKEN"

# If 401, inspect token at jwt.io:
# - exp: 1735689600 (must be in future)
# - aud: "https://your-mcp-server.com" (must match server URI)
# - scope: "read:application" (must include required scopes)
```

### The browser reports a CORS error

**Cause**

The origin of the MCP client isn't an origin that Casdoor trusts. Casdoor allows cross-origin requests from the origins of the **Redirect URLs** of your applications.

**Solution**

1. In the Casdoor admin console, open the edit page of the application.
1. Add a URL with the origin of the MCP client, including the scheme and a non-standard port, to **Redirect URLs**. For local development, add `http://localhost:<port>`.

See [Call the API from a browser](/docs/basic/public-api#call-the-api-from-a-browser).

### The redirect URL doesn't match

**Causes**

- The `redirect_uri` of the authorization request isn't in the **Redirect URLs** of the application.
- The scheme (`http` or `https`), the port, or a trailing slash differs.

**Solution**

1. Copy the exact `redirect_uri` from the authorization request.
1. Add it to **Redirect URLs** of the application.

The following URLs are all different:

```bash
# These are all different redirect URIs:
http://localhost:3000/callback
https://localhost:3000/callback  # Different scheme
http://localhost:3000/callback/  # Trailing slash
http://localhost:3001/callback   # Different port
```

### A discovery endpoint returns HTTP 404

**Cause**

The client requests a discovery path that doesn't fit its role.

**Solution**

Request the endpoint for your use case:

1. OAuth 2.0 Authorization Server Metadata (RFC 8414):

   ```bash
   curl https://your-casdoor.com/.well-known/oauth-authorization-server
   ```

1. OpenID Connect Discovery:

   ```bash
   curl https://your-casdoor.com/.well-known/openid-configuration
   ```

1. OAuth 2.0 Protected Resource Metadata (RFC 9728):

   ```bash
   curl https://your-casdoor.com/.well-known/oauth-protected-resource
   ```

An MCP server that is a resource server publishes the `oauth-protected-resource` document to advertise its authorization server.

### Dynamic client registration is rejected

**Causes**

- Dynamic client registration (DCR) is turned off for the organization.
- The registration request lacks required fields.

**Solution**

1. In the Casdoor admin console, open the edit page of the organization and turn on **Enable dynamic client registration**. A client registers in the `built-in` organization unless the registration URL has an `organization` parameter.
1. Send all required metadata in the registration request:

   ```json
   {
     "client_name": "My MCP Client",
     "redirect_uris": ["https://client.example.com/callback"],
     "grant_types": ["authorization_code"],
     "token_endpoint_auth_method": "client_secret_basic"
   }
   ```

See [Dynamic client registration](/docs/application/dynamic-client-registration).

### The consent screen doesn't appear

**Causes**

- The application has no custom scopes. Casdoor asks for consent only for custom scopes.
- The client doesn't request a custom scope.
- The user has already granted the requested scopes to the application.

**Solution**

1. Check that the application defines the scopes and that the client requests them. See [Custom scopes](/docs/application/scopes).
1. To test the consent screen again, revoke the earlier grant on the **Consents** page.

### A tool call fails with insufficient_scope

**Cause**

The access token lacks the scope that the tool requires.

**Solution**

1. Read `required_scope` and `granted_scopes` from the error:

   ```json
   {
     "error": {
       "code": -32001,
       "message": "insufficient_scope",
       "data": {
         "tool": "add_application",
         "granted_scopes": ["read:application"],
         "required_scope": "write:application"
       }
     }
   }
   ```

1. Request a new token with the required scope:

   ```bash
   curl -X POST https://your-casdoor.com/api/login/oauth/access_token \
     -d "grant_type=client_credentials" \
     -d "client_id=YOUR_CLIENT_ID" \
     -d "client_secret=YOUR_CLIENT_SECRET" \
     -d "scope=read:application write:application"
   ```

See the [scope reference](/docs/how-to-connect/mcp/authorization#complete-scope-reference).

### The authorization request fails with invalid_target

**Causes**

- The `resource` parameter isn't an absolute URI, as RFC 8707 requires.
- The resource URI has no scheme.

**Solution**

1. Send a complete URL as `resource`:

   ```bash
   # Correct:
   resource=https://your-server.com
   resource=https://api.example.com:8080

   # Incorrect:
   resource=your-server.com        # Missing scheme
   resource=localhost:3000         # Missing scheme
   ```

1. Remember that the value of `resource` becomes the `aud` claim of the access token. It must be exactly the audience that the MCP server expects.

### Claude Desktop or Cursor can't connect to your own MCP server

**Causes**

- Your MCP server doesn't return valid Protected Resource Metadata.
- The `WWW-Authenticate` header is missing or malformed.
- The client can't reach the discovery endpoints.
- Your MCP server fails to validate the token.

**Solution**

1. Check that the metadata endpoint returns valid JSON:

   ```bash
   curl https://your-mcp-server.com/.well-known/oauth-protected-resource
   ```

   Expected response:

   ```json
   {
     "resource": "https://your-mcp-server.com",
     "authorization_servers": [
       "https://your-casdoor.com"
     ]
   }
   ```

1. Check the `WWW-Authenticate` header of an unauthenticated request:

   ```bash
   curl -v https://your-mcp-server.com/api/mcp
   ```

   Expected header:

   ```http
   WWW-Authenticate: Bearer realm="mcp-server",
     authorization_uri="https://your-casdoor.com/login/oauth/authorize",
     scope="read:application write:application"
   ```

1. Run the OAuth 2.0 flow by hand:

   ```bash
   # 1. Get authorization code (requires browser)
   # 2. Exchange for token
   curl -X POST https://your-casdoor.com/api/login/oauth/access_token \
     -d "grant_type=authorization_code" \
     -d "code=AUTH_CODE" \
     -d "redirect_uri=YOUR_REDIRECT_URI" \
     -d "client_id=YOUR_CLIENT_ID" \
     -d "client_secret=YOUR_CLIENT_SECRET"

   # 3. Test MCP endpoint with token
   curl https://your-mcp-server.com/api/mcp \
     -H "Authorization: Bearer ACCESS_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
   ```

## Debugging tools

### MCP Inspector

The official MCP Inspector tests an MCP connection interactively. It browses and calls tools, shows the JSON-RPC requests and responses, and runs the OAuth 2.0 flow.

```bash
npx @modelcontextprotocol/inspector
```

### Discovery endpoints

Check that each discovery endpoint returns valid JSON:

```bash
# OAuth Authorization Server
curl -s https://your-casdoor.com/.well-known/oauth-authorization-server | jq

# OIDC Configuration
curl -s https://your-casdoor.com/.well-known/openid-configuration | jq

# Protected Resource (for MCP resource servers)
curl -s https://your-mcp-server.com/.well-known/oauth-protected-resource | jq
```

### Token claims

Decode the access token at [jwt.io](https://jwt.io), or on the command line:

```bash
# Alternative: Decode token with jq
echo "YOUR_JWT_TOKEN" | cut -d. -f2 | base64 -d | jq
```

| Claim | Check |
|---|---|
| `aud` | Matches the URI of the MCP server |
| `scope` | Contains the scopes that the tools require |
| `exp` | Is in the future. The value is a Unix timestamp |
| `iss` | Is the URL of Casdoor |
| `sub` | Is the ID of the user |
| `client_id` | Is the application that received the token |

### Token introspection

Ask Casdoor whether a token is valid and what it contains (RFC 7662):

```bash
curl -X POST https://your-casdoor.com/api/login/oauth/introspect \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "CLIENT_ID:CLIENT_SECRET" \
  -d "token=ACCESS_TOKEN"
```

The response:

```json
{
  "active": true,
  "scope": "read:application write:application",
  "client_id": "your-client-id",
  "username": "admin",
  "exp": 1735689600,
  "iat": 1735603200,
  "aud": "https://your-mcp-server.com"
}
```

### OAuth 2.0 flow with curl

```bash
# 1. Test authorization endpoint (requires browser)
# Open in browser:
https://your-casdoor.com/login/oauth/authorize?
  client_id=YOUR_CLIENT_ID&
  redirect_uri=http://localhost:8080/callback&
  response_type=code&
  scope=read:application&
  state=random-state

# 2. Exchange authorization code for token
curl -X POST https://your-casdoor.com/api/login/oauth/access_token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "code=AUTHORIZATION_CODE" \
  -d "redirect_uri=http://localhost:8080/callback" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET"

# 3. Use access token with MCP server
curl https://your-mcp-server.com/api/mcp \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

### Logs and network traces

- **MCP client**: Turn on debug or verbose mode, and read the log for the redirect, the token exchange, and the tool calls.
- **MCP server**: Log each incoming request, the result of the token validation with the reason for a failure, and the scope checks.
- **Browser**: Open the developer tools. The network tab shows the redirects and the API calls, and the console shows JavaScript errors.
- **CLI clients**: Route the client through mitmproxy to see its requests:

  ```bash
  mitmproxy -p 8080
  # Configure client to use proxy: http://localhost:8080
  ```

## See also

- [MCP authorization and scopes](/docs/how-to-connect/mcp/authorization)
- [MCP error handling](/docs/how-to-connect/mcp/error-handling)
- [MCP authentication](/docs/how-to-connect/mcp/authentication)
- [Custom scopes](/docs/application/scopes)
- [Dynamic client registration](/docs/application/dynamic-client-registration)
