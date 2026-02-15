---
title: Troubleshooting
description: Common MCP OAuth issues and debugging techniques
keywords: [MCP, OAuth, troubleshooting, debugging, errors]
authors: [hsluoyz]
---

This guide covers common issues when using Casdoor with MCP servers, whether you're connecting to Casdoor's built-in MCP server or using Casdoor as an OAuth provider for your own MCP server.

## Common Errors

### 401 Unauthorized from MCP Server

**Symptom**: MCP server rejects requests with `401 Unauthorized` status code.

**Causes**:

- Access token has expired
- Token's `aud` (audience) claim doesn't match the MCP server's resource URI
- Missing `Authorization: Bearer` header in requests
- Token was issued for a different resource

**Fix**:

1. Decode your token at [jwt.io](https://jwt.io) and check the `exp` claim for expiration
2. Verify the `aud` claim matches your MCP server's URI exactly (including scheme, host, and port)
3. Ensure requests include the header: `Authorization: Bearer YOUR_TOKEN`
4. If using the `resource` parameter during OAuth, confirm it matches the MCP server URI

```bash
# Example: Check token claims
curl -X GET https://your-mcp-server.com/api/mcp \
  -H "Authorization: Bearer YOUR_TOKEN"

# If 401, inspect token at jwt.io:
# - exp: 1735689600 (must be in future)
# - aud: "https://your-mcp-server.com" (must match server URI)
# - scope: "read:application" (must include required scopes)
```

### CORS Errors in Browser

**Symptom**: Browser console shows CORS errors when MCP client attempts to connect to Casdoor.

**Causes**:

- Casdoor CORS settings don't include the MCP client's origin
- Preflight requests are being blocked
- Wildcard CORS is disabled for security

**Fix**:

1. Log into Casdoor admin panel
2. Navigate to your application configuration
3. Add the MCP client's origin to the **CORS Allowed Origins** field
4. Include the full origin: `https://client-domain.com` (with scheme and port if non-standard)
5. For local development, add `http://localhost:PORT`

```text
# Example CORS configuration:
https://claude.ai
https://cursor.sh
http://localhost:3000
```

### Redirect URI Mismatch

**Symptom**: OAuth flow fails with `redirect_uri_mismatch` error.

**Causes**:

- The `redirect_uri` in the authorization request doesn't exactly match the application configuration
- Scheme mismatch (`http` vs `https`)
- Port number missing or incorrect
- Trailing slash mismatch

**Fix**:

1. Copy the exact `redirect_uri` from your authorization request
2. In Casdoor, edit the application configuration
3. Add the exact URI to **Redirect URLs** field (must match character-for-character)
4. Ensure scheme, host, port, and path all match exactly

```bash
# These are all different redirect URIs:
http://localhost:3000/callback
https://localhost:3000/callback  # Different scheme
http://localhost:3000/callback/  # Trailing slash
http://localhost:3001/callback   # Different port
```

### Discovery Endpoint 404

**Symptom**: Attempting to fetch `.well-known` discovery document returns 404.

**Causes**:

- Using wrong discovery path for your use case
- Casdoor configuration doesn't expose discovery endpoints
- Application not configured as OIDC provider

**Fix**:

Try these discovery endpoints in order:

1. **OAuth Authorization Server Metadata** (RFC 8414):

   ```bash
   curl https://your-casdoor.com/.well-known/oauth-authorization-server
   ```

2. **OpenID Connect Discovery**:

   ```bash
   curl https://your-casdoor.com/.well-known/openid-configuration
   ```

3. **OAuth Protected Resource Metadata** (RFC 9470):

   ```bash
   curl https://your-casdoor.com/.well-known/oauth-protected-resource
   ```

For MCP servers acting as resource servers, use the `oauth-protected-resource` endpoint to advertise OAuth requirements.

### DCR Registration Rejected

**Symptom**: Dynamic Client Registration (DCR) request fails with error.

**Causes**:

- Organization has DCR disabled in settings
- Registration request missing required fields
- Software statement rejected or invalid
- Rate limiting on registration endpoint

**Fix**:

1. Navigate to your organization settings in Casdoor
2. Enable **Dynamic Client Registration** toggle
3. Configure **Allowed Redirect URI Patterns** to restrict client URIs
4. For registration requests, include all required metadata:

   ```json
   {
     "client_name": "My MCP Client",
     "redirect_uris": ["https://client.example.com/callback"],
     "grant_types": ["authorization_code"],
     "token_endpoint_auth_method": "client_secret_basic"
   }
   ```

For more details, see the [Dynamic Client Registration](/docs/application/dynamic-client-registration) documentation.

### Consent Screen Not Showing

**Symptom**: OAuth flow completes without showing user consent screen.

**Causes**:

- Application's **Consent Policy** is set to "Never"
- User has previously granted consent and policy is "Once"
- Session authentication bypasses consent

**Fix**:

1. Edit your application in Casdoor admin panel
2. Set **Consent Policy** to:
   - **Always**: Show consent on every authorization request
   - **Once**: Show consent only on first authorization (recommended)
3. Save the application configuration
4. Clear user's previous consent if testing (revoke application access)

The consent screen displays requested scopes with their display names and descriptions from your scope configuration.

### insufficient_scope Error

**Symptom**: MCP tool calls fail with `insufficient_scope` JSON-RPC error.

**Causes**:

- Access token doesn't include the scope required by the tool
- Token was requested with incorrect scopes
- Scope names don't match server expectations

**Fix**:

1. Check the error response for `required_scope` and `granted_scopes`:

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

2. Request a new token with the required scope:

   ```bash
   curl -X POST https://your-casdoor.com/api/login/oauth/access_token \
     -d "grant_type=client_credentials" \
     -d "client_id=YOUR_CLIENT_ID" \
     -d "client_secret=YOUR_CLIENT_SECRET" \
     -d "scope=read:application write:application"
   ```

For available scopes, see the [Authorization and Scopes](/docs/how-to-connect/mcp/authorization) documentation.

### invalid_target / Resource Error

**Symptom**: Authorization request fails with `invalid_target` or `invalid_resource` error.

**Causes**:

- `resource` parameter is not a valid URI (RFC 8707)
- Resource URI missing scheme (`http://` or `https://`)
- Resource parameter conflicts with token audience

**Fix**:

1. Ensure `resource` parameter is a full URL:

   ```bash
   # Correct:
   resource=https://your-server.com
   resource=https://api.example.com:8080

   # Incorrect:
   resource=your-server.com        # Missing scheme
   resource=localhost:3000         # Missing scheme
   ```

2. The `resource` value becomes the `aud` claim in the access token
3. Resource must match the MCP server's expected audience exactly

### Claude Desktop / Cursor Connection Failures

**Symptom**: Claude Desktop or Cursor IDE fails to connect to MCP server with OAuth errors.

**Causes**:

- MCP server not returning valid Protected Resource Metadata (PRM)
- `WWW-Authenticate` header malformed or missing
- Discovery endpoint not accessible
- Token validation failing

**Fix**:

1. **Verify PRM endpoint** returns valid JSON:

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

2. **Check WWW-Authenticate header** on unauthorized requests:

   ```bash
   curl -v https://your-mcp-server.com/api/mcp
   ```

   Expected header:

   ```http
   WWW-Authenticate: Bearer realm="mcp-server",
     authorization_uri="https://your-casdoor.com/login/oauth/authorize",
     scope="read:application write:application"
   ```

3. **Test complete OAuth flow** with curl:

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

## Debugging Tools

### MCP Inspector

The official MCP Inspector helps test MCP connections interactively:

```bash
npx @modelcontextprotocol/inspector
```

Features:

- Interactive tool browser and testing
- Real-time JSON-RPC request/response viewer
- OAuth flow testing
- Connection diagnostics

### Testing Discovery Endpoints

Verify each discovery endpoint returns valid JSON:

```bash
# OAuth Authorization Server
curl -s https://your-casdoor.com/.well-known/oauth-authorization-server | jq

# OIDC Configuration
curl -s https://your-casdoor.com/.well-known/openid-configuration | jq

# Protected Resource (for MCP resource servers)
curl -s https://your-mcp-server.com/.well-known/oauth-protected-resource | jq
```

### Inspecting JWT Tokens

Use [jwt.io](https://jwt.io) to decode access tokens and verify claims:

**Key claims to check**:

- `aud` (audience): Must match MCP server URI
- `scope`: Must include required scopes for tools
- `exp` (expiration): Must be in the future (Unix timestamp)
- `iss` (issuer): Should match Casdoor's authorization server URL
- `sub` (subject): User identifier
- `client_id`: Application/client that received the token

```bash
# Alternative: Decode token with jq
echo "YOUR_JWT_TOKEN" | cut -d. -f2 | base64 -d | jq
```

### Token Introspection Endpoint

Casdoor provides a token introspection endpoint (RFC 7662) to validate and inspect tokens:

```bash
curl -X POST https://your-casdoor.com/api/login/oauth/introspect \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "CLIENT_ID:CLIENT_SECRET" \
  -d "token=ACCESS_TOKEN"
```

Response includes:

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

### Testing with curl

Manual OAuth flow testing with curl:

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

### Debug Logging

Enable debug logging in your MCP client or server to see detailed OAuth flows:

**For MCP clients**:

- Check client configuration for debug/verbose mode
- Review client logs for OAuth redirect, token exchange, and API calls
- Capture network traffic with browser DevTools or mitmproxy

**For MCP servers**:

- Enable server debug logging to see incoming requests
- Log token validation results (success/failure and reasons)
- Monitor authorization checks and scope validation

### Network Debugging

Use browser DevTools or network analysis tools:

1. **Browser DevTools (F12)**:
   - Network tab shows all OAuth redirects and API calls
   - Console tab displays JavaScript errors
   - Application tab shows stored tokens and cookies

2. **mitmproxy** for CLI clients:

   ```bash
   mitmproxy -p 8080
   # Configure client to use proxy: http://localhost:8080
   ```

3. **Wireshark** for low-level packet analysis

## Related Documentation

- [Authorization and Scopes](/docs/how-to-connect/mcp/authorization) - Complete scope reference
- [Error Handling](/docs/how-to-connect/mcp/error-handling) - JSON-RPC error codes
- [Authentication](/docs/how-to-connect/mcp/authentication) - OAuth flows and token management
- [Custom Scopes](/docs/application/scopes) - Configuring custom scopes for Agent applications
- [Dynamic Client Registration](/docs/application/dynamic-client-registration) - DCR setup and configuration
