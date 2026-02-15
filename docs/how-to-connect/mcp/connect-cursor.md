---
title: Connect Cursor
description: Step-by-step guide to connect Cursor IDE to Casdoor's MCP server
keywords: [MCP, Cursor, IDE, OAuth, PKCE, MCP client]
authors: [hsluoyz]
---

This guide shows you how to connect Cursor IDE to Casdoor's MCP server, enabling AI-powered code assistance with direct access to manage your Casdoor applications, users, and resources.

## Prerequisites

Before you begin, ensure you have:

- A running Casdoor instance (HTTPS recommended for production)
- [Cursor IDE](https://cursor.sh/) installed on your computer
- Admin access to your Casdoor instance to create applications

## Step 1: Create an Application in Casdoor

Configure a Casdoor application that Cursor will use for OAuth authentication:

1. Log in to your Casdoor admin panel
2. Navigate to **Applications** and click **Add**
3. Configure the application with these settings:

   - **Name**: `cursor-mcp` (or your preferred name)
   - **Display Name**: `Cursor IDE MCP Client`
   - **Organization**: Select your organization
   - **Redirect URIs**: Add these OAuth callback URLs:
     ```
     http://127.0.0.1:*/callback
     http://localhost:*/callback
     ```
     :::tip
     The wildcard `*` allows Cursor to use any available port for the OAuth callback.
     :::

4. **Grant Types**: Enable `Authorization Code` and optionally `Refresh Token`
5. **Enable PKCE**: Check this option for enhanced security
6. **Token Format**: `JWT` (recommended)
7. **(Optional) Application Type**: Set to `Agent`
8. **(Optional) Category**: Set to `MCP` for better organization

   :::info
   Application categories help organize your apps. See [Application Categories](/docs/application/categories) for more details.
   :::

9. Click **Save** and note down your **Client ID** (you'll need it in the next step)

## Step 2: Configure Cursor MCP Settings

Cursor supports MCP server configuration through its settings. You can configure it either through the UI or by directly editing the configuration file.

### Option A: Using Cursor Settings UI

1. Open Cursor IDE
2. Go to **Settings** (Cmd+, on macOS or Ctrl+, on Windows/Linux)
3. Search for "MCP" in the settings search bar
4. Click **Edit in settings.json** to open the MCP configuration file

### Option B: Direct File Edit

The MCP configuration file location depends on your operating system:

- **macOS**: `~/Library/Application Support/Cursor/User/mcp.json`
- **Windows**: `%APPDATA%\Cursor\User\mcp.json`
- **Linux**: `~/.config/Cursor/User/mcp.json`

Add your Casdoor MCP server configuration:

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
The `@modelcontextprotocol/server-oauth` package handles OAuth flows automatically. Cursor will open your browser to complete authentication.
:::

### Configuring Scopes

The `OAUTH_SCOPES` environment variable controls what permissions Cursor's AI has. Common scopes include:

- `read:application` - View applications
- `write:application` - Create, update, delete applications
- `read:user` - View users
- `write:user` - Create, update, delete users
- `openid profile email` - Basic user information (required for OAuth)

See [Authorization and Scopes](/docs/how-to-connect/mcp/authorization) for the complete list of available scopes.

## Step 3: Reload Cursor

After saving the configuration:

1. Reload Cursor IDE (Cmd+Shift+P or Ctrl+Shift+P → "Developer: Reload Window")
2. Alternatively, restart Cursor completely

Cursor will automatically detect and load the new MCP server configuration.

## Step 4: Complete the OAuth Flow

When Cursor first connects to your Casdoor MCP server:

1. Cursor will automatically open your default web browser
2. You'll see the Casdoor login page (if not already logged in)
3. After logging in, you'll see a **Consent Screen** asking you to authorize Cursor
4. The consent screen displays the requested scopes (permissions)
5. Click **Authorize** to grant access
6. Your browser will redirect to `http://127.0.0.1:<port>/callback` and show a success message
7. Return to Cursor - the connection is now established

:::tip
The OAuth token is securely stored by the MCP OAuth helper. You won't need to re-authorize unless you revoke the token or change scopes.
:::

## Step 5: Verify the Connection

Test the connection by using Cursor's AI features to interact with Casdoor:

**Example prompts to try in Cursor's chat:**

- "Using the Casdoor MCP server, list all applications"
- "Show me details about the application named 'my-app' from Casdoor"
- "Create a new Casdoor application called 'test-app' in organization 'my-org'"

Cursor's AI will use the MCP tools to execute these commands. You should see responses with data from your Casdoor instance.

**Expected output:**

```
I've queried the Casdoor MCP server and found the following applications:

1. cursor-mcp (Cursor IDE MCP Client)
2. app-built-in (Casdoor)
...
```

## Troubleshooting

### Issue: "MCP server not found" in Cursor

**Cause**: The configuration file might not be in the correct location or has syntax errors.

**Solution**:
- Verify the file path for your operating system
- Check that the JSON is valid (no trailing commas, proper quotes)
- Reload Cursor after making changes

### Issue: "Unable to connect to MCP server"

**Cause**: The MCP server URL might be incorrect or unreachable.

**Solution**:
- Verify the URL in your `mcp.json` is correct
- Ensure your Casdoor instance is running and accessible
- Check for HTTPS/HTTP mismatch (use HTTPS in production)

### Issue: "Redirect URI mismatch" error during OAuth

**Cause**: The callback URL doesn't match the configured Redirect URI in Casdoor.

**Solution**:
- In Casdoor, ensure your application has these redirect URIs:
  ```
  http://127.0.0.1:*/callback
  http://localhost:*/callback
  ```
- The wildcard `*` is crucial - it allows any port

### Issue: "CORS error" in browser console

**Cause**: Cross-Origin Resource Sharing (CORS) restrictions.

**Solution**:
- Casdoor's MCP endpoint should automatically handle CORS for localhost origins
- If you're using a custom domain, ensure CORS is properly configured in Casdoor

### Issue: "insufficient_scope" error when using AI features

**Cause**: The requested operation requires a scope that wasn't granted.

**Solution**:
- Update the `OAUTH_SCOPES` in your `mcp.json` to include the required scope
- Example: Add `write:application` if you want to create/modify applications
- Reload Cursor and re-authorize to get a new token with updated scopes

### Issue: OAuth token expired

**Cause**: Access tokens expire after a certain time.

**Solution**:
- If you enabled `Refresh Token` grant type in Step 1, the MCP OAuth helper will automatically refresh expired tokens
- Otherwise, you'll need to re-authorize by reloading Cursor

### Issue: MCP tools not available in Cursor's AI

**Cause**: Cursor might not have loaded the MCP server or OAuth hasn't completed.

**Solution**:
- Check Cursor's developer console (Help → Toggle Developer Tools) for errors
- Try explicitly mentioning "using Casdoor MCP server" in your prompts
- Ensure you've completed the OAuth flow in Step 4

## Security Considerations

- **PKCE (Proof Key for Code Exchange)**: Always enable PKCE in your Casdoor application for enhanced security
- **Scopes**: Follow the principle of least privilege - only grant scopes that Cursor actually needs
- **Token Storage**: The MCP OAuth helper stores tokens securely in your system's keychain
- **HTTPS**: Always use HTTPS for production Casdoor instances to protect OAuth flows
- **Token Revocation**: You can revoke access tokens in Casdoor's admin panel under **Tokens**
- **Code Review**: Always review AI-generated code that interacts with Casdoor before executing it

## Use Cases

With Cursor connected to Casdoor's MCP server, you can:

- **Generate configuration code**: Ask Cursor to generate application setup code based on existing Casdoor apps
- **Automate user management**: Create scripts to bulk-create users or update permissions
- **Documentation**: Generate documentation for your Casdoor setup automatically
- **Testing**: Create test applications and clean them up programmatically
- **Migration scripts**: Build scripts to migrate configurations between Casdoor instances

## Next Steps

Now that Cursor is connected to Casdoor:

- Explore available [MCP Tools](/docs/how-to-connect/mcp/tools) that Cursor can use
- Learn about [Authentication](/docs/how-to-connect/mcp/authentication) methods
- Understand [Error Handling](/docs/how-to-connect/mcp/error-handling) for better debugging
- Check out the [Integration Example](/docs/how-to-connect/mcp/integration) for programmatic access

## Related Resources

- [MCP Server Overview](/docs/how-to-connect/mcp/overview)
- [Authorization and Scopes](/docs/how-to-connect/mcp/authorization)
- [Application Categories](/docs/application/categories)
- [Cursor Documentation](https://cursor.sh/docs)
