---
title: Connect Claude Desktop to MCP
description: Connect Claude Desktop to Casdoor’s MCP server with OAuth.
keywords: [MCP, Claude Desktop, OAuth, PKCE]
authors: [hsluoyz]
---

Connect Claude Desktop to Casdoor’s MCP server so Claude can manage your applications, users, and resources via natural language.

## Prerequisites

- A running Casdoor instance (accessible via HTTPS recommended for production)
- [Claude Desktop](https://claude.ai/download) installed on your computer
- Admin access to your Casdoor instance to create applications

## Step 1: Create an application in Casdoor

Create a Casdoor application for Claude Desktop’s OAuth:

1. Log in to your Casdoor admin panel
2. Navigate to **Applications** and click **Add**
3. Configure the application with these settings:

   - **Name**: `claude-desktop-mcp` (or your preferred name)
   - **Display Name**: `Claude Desktop MCP Client`
   - **Organization**: Select your organization
   - **Redirect URIs**: Add these OAuth callback URLs:

     ```text
     http://127.0.0.1:*/callback
     http://localhost:*/callback
     ```

     :::tip
     The wildcard `*` allows Claude Desktop to use any available port for the OAuth callback.
     :::

4. **Grant Types**: Enable `Authorization Code` and optionally `Refresh Token`
5. **Enable PKCE**: Check this option for enhanced security
6. **Token Format**: `JWT` (recommended)
7. **(Optional) Application Type**: Set to `Agent`
8. **(Optional) Category**: Set to `MCP` for better organization

   :::info
   See [Application categories](/docs/application/categories) for Category and Type options.
   :::

9. Click **Save** and note the **Client ID** for the next step.

## Step 2: Configure Claude Desktop

Claude Desktop stores MCP server configurations in a JSON file. The location depends on your operating system:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

Open this file in a text editor and add your Casdoor MCP server configuration:

```json
{
  "mcpServers": {
    "casdoor": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-oauth",
        "https://your-casdoor.com/api/mcp"
      ],
      "env": {
        "OAUTH_CLIENT_ID": "your-client-id",
        "OAUTH_SCOPES": "read:application write:application openid profile email"
      }
    }
  }
}
```

Replace the following placeholders:

- `your-casdoor.com` → Your Casdoor instance domain
- `your-client-id` → The Client ID from Step 1

:::note
The `@modelcontextprotocol/server-oauth` package handles OAuth flows automatically. Claude Desktop will open your browser to complete authentication.
:::

### Configuring Scopes

The `OAUTH_SCOPES` environment variable controls what permissions Claude has. Common scopes include:

- `read:application` - View applications
- `write:application` - Create, update, delete applications
- `read:user` - View users
- `write:user` - Create, update, delete users
- `openid profile email` - Basic user information (required for OAuth)

See [Authorization and Scopes](/docs/how-to-connect/mcp/authorization) for the complete list of available scopes.

## Step 3: Restart Claude Desktop

After saving the configuration file:

1. Completely quit Claude Desktop (don't just close the window)
2. Relaunch Claude Desktop

Claude will automatically detect the new MCP server configuration.

## Step 4: Complete the OAuth Flow

The first time Claude Desktop connects to your Casdoor MCP server:

1. Claude Desktop will automatically open your default web browser
2. You'll see the Casdoor login page (if not already logged in)
3. After logging in, you'll see a **Consent Screen** asking you to authorize Claude Desktop
4. The consent screen shows the requested scopes (permissions)
5. Click **Authorize** to grant access
6. Your browser will redirect to `http://127.0.0.1:<port>/callback` and show a success message
7. Return to Claude Desktop - the connection is now established

:::tip
The OAuth token is securely stored by the MCP OAuth helper. You won't need to re-authorize unless you revoke the token or change scopes.
:::

## Step 5: Verify the Connection

Test the connection by asking Claude to interact with Casdoor:

**Example prompts to try:**

- "List all applications in Casdoor"
- "Show me details about the application named 'my-app'"
- "Create a new application called 'test-app' in organization 'my-org'"

Claude will use the MCP tools to execute these commands. You should see responses with data from your Casdoor instance.

**Expected output for "List all applications":**

```text
I found the following applications in your Casdoor instance:

1. claude-desktop-mcp (Claude Desktop MCP Client)
2. app-built-in (Casdoor)
...
```

## Troubleshooting

### Issue: "Unable to connect to MCP server"

**Cause**: The MCP server URL might be incorrect or unreachable.

**Solution**:

- Verify the URL in your `claude_desktop_config.json` is correct
- Ensure your Casdoor instance is running and accessible
- Check for HTTPS/HTTP mismatch (use HTTPS in production)

### Issue: "Redirect URI mismatch" error during OAuth

**Cause**: The callback URL doesn't match the configured Redirect URI in Casdoor.

**Solution**:

- In Casdoor, ensure your application has these redirect URIs:

  ```text
  http://127.0.0.1:*/callback
  http://localhost:*/callback
  ```

- The wildcard `*` is crucial - it allows any port

### Issue: "CORS error" in browser console

**Cause**: Cross-Origin Resource Sharing (CORS) restrictions.

**Solution**:

- Casdoor's MCP endpoint should automatically handle CORS for localhost origins
- If you're using a custom domain, ensure CORS is properly configured in Casdoor

### Issue: "insufficient_scope" error

**Cause**: The requested operation requires a scope that wasn't granted.

**Solution**:

- Update the `OAUTH_SCOPES` in your `claude_desktop_config.json` to include the required scope
- Example: Add `write:application` if you want to create/modify applications
- Restart Claude Desktop and re-authorize to get a new token with updated scopes

### Issue: OAuth token expired

**Cause**: Access tokens expire after a certain time.

**Solution**:

- If you enabled `Refresh Token` grant type in Step 1, the MCP OAuth helper will automatically refresh expired tokens
- Otherwise, you'll need to re-authorize by restarting Claude Desktop

### Issue: HTTPS requirement in production

**Cause**: OAuth best practices require HTTPS for production environments.

**Solution**:

- Use HTTPS for your Casdoor instance in production
- For local development/testing, HTTP with localhost is acceptable
- Configure SSL certificates or use a reverse proxy like Nginx

## Security Considerations

- **PKCE (Proof Key for Code Exchange)**: Always enable PKCE in your Casdoor application for enhanced security
- **Scopes**: Follow the principle of least privilege - only grant scopes that Claude actually needs
- **Token Storage**: The MCP OAuth helper stores tokens securely in your system's keychain
- **HTTPS**: Always use HTTPS for production Casdoor instances to protect OAuth flows
- **Token Revocation**: You can revoke access tokens in Casdoor's admin panel under **Tokens**

## Next Steps

Now that Claude Desktop is connected to Casdoor:

- Explore available [MCP Tools](/docs/how-to-connect/mcp/tools) that Claude can use
- Learn about [Authentication](/docs/how-to-connect/mcp/authentication) methods
- Understand [Error Handling](/docs/how-to-connect/mcp/error-handling) for better debugging
- Check out the [Integration Example](/docs/how-to-connect/mcp/integration) for programmatic access

## Related Resources

- [MCP Server Overview](/docs/how-to-connect/mcp/overview)
- [Authorization and Scopes](/docs/how-to-connect/mcp/authorization)
- [Application Categories](/docs/application/categories)
- [Claude.ai](https://claude.ai)
