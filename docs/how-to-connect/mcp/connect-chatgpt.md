---
title: Connect ChatGPT
description: Step-by-step guide to connect ChatGPT to Casdoor's MCP server
keywords: [MCP, ChatGPT, OpenAI, OAuth, PKCE, MCP client]
authors: [hsluoyz]
---

This guide demonstrates how to connect ChatGPT to Casdoor's MCP server, enabling ChatGPT to manage your Casdoor applications, users, and resources through natural language conversations.

## Prerequisites

Before you begin, ensure you have:

- A running Casdoor instance (HTTPS required for ChatGPT integration)
- A ChatGPT Plus or Enterprise account with MCP support
- Admin access to your Casdoor instance to create applications

:::info
MCP support in ChatGPT is available for Plus and Enterprise users. Check [OpenAI's documentation](https://openai.com/chatgpt) for the latest availability.
:::

## Step 1: Create an Application in Casdoor

Configure a Casdoor application that ChatGPT will use for OAuth authentication:

1. Log in to your Casdoor admin panel
2. Navigate to **Applications** and click **Add**
3. Configure the application with these settings:

   - **Name**: `chatgpt-mcp` (or your preferred name)
   - **Display Name**: `ChatGPT MCP Client`
   - **Organization**: Select your organization
   - **Redirect URIs**: Add the ChatGPT OAuth callback URL:

     ```text
     https://chat.openai.com/auth/callback
     ```

     :::warning
     ChatGPT requires HTTPS for OAuth callbacks. Ensure your Casdoor instance is accessible via HTTPS.
     :::

4. **Grant Types**: Enable `Authorization Code` and `Refresh Token`
5. **Enable PKCE**: Check this option for enhanced security
6. **Token Format**: `JWT` (recommended)
7. **(Optional) Application Type**: Set to `Agent`
8. **(Optional) Category**: Set to `MCP` for better organization

   :::info
   Application categories help organize your apps. See [Application Categories](/docs/application/categories) for more details.
   :::

9. Click **Save** and note down your **Client ID** and **Client Secret** (you'll need them in the next step)

## Step 2: Configure ChatGPT MCP Connection

ChatGPT supports connecting to MCP servers through its settings interface.

### Access MCP Settings

1. Log in to [ChatGPT](https://chat.openai.com)
2. Click on your profile icon in the bottom left
3. Go to **Settings** → **Beta Features**
4. Enable **Model Context Protocol** (if not already enabled)
5. Navigate to **Settings** → **MCP Servers**

### Add Casdoor MCP Server

1. Click **Add Server** or **+ New Server**
2. Fill in the server details:

   - **Server Name**: `Casdoor` (or your preferred name)
   - **Server URL**: `https://your-casdoor.com/api/mcp`
   - **Authentication Type**: Select `OAuth 2.0`
   - **Client ID**: Your Client ID from Step 1
   - **Client Secret**: Your Client Secret from Step 1
   - **Authorization URL**: `https://your-casdoor.com/api/login/oauth/authorize`
   - **Token URL**: `https://your-casdoor.com/api/login/oauth/access_token`
   - **Scopes**: `read:application write:application openid profile email`

3. Click **Save** or **Connect**

:::note
The exact UI and field names may vary depending on ChatGPT's current interface. Refer to ChatGPT's help documentation for the most up-to-date instructions.
:::

### Configuring Scopes

The scopes you configure control what permissions ChatGPT has. Common scopes include:

- `read:application` - View applications
- `write:application` - Create, update, delete applications
- `read:user` - View users
- `write:user` - Create, update, delete users
- `openid profile email` - Basic user information (required for OAuth)

See [Authorization and Scopes](/docs/how-to-connect/mcp/authorization) for the complete list of available scopes.

## Step 3: Complete the OAuth Flow

After adding the server configuration:

1. ChatGPT will automatically initiate the OAuth flow
2. You'll be redirected to the Casdoor login page (if not already logged in)
3. After logging in, you'll see a **Consent Screen** asking you to authorize ChatGPT
4. The consent screen displays the requested scopes (permissions)
5. Click **Authorize** to grant access
6. You'll be redirected back to ChatGPT with a success message
7. The connection is now established

:::tip
The OAuth token is securely stored by ChatGPT. You won't need to re-authorize unless you revoke the token or change scopes.
:::

## Step 4: Verify the Connection

Test the connection by asking ChatGPT to interact with Casdoor in a new conversation:

**Example prompts to try:**

- "Using Casdoor, list all applications"
- "Show me details about the application named 'my-app' from Casdoor"
- "Create a new application in Casdoor called 'test-app' in organization 'my-org'"

ChatGPT will use the MCP tools to execute these commands. You should see responses with data from your Casdoor instance.

**Expected output for "List all applications":**

```text
I've connected to your Casdoor instance and found the following applications:

1. chatgpt-mcp (ChatGPT MCP Client)
   - Organization: my-org
   - Created: 2024-01-15

2. app-built-in (Casdoor)
   - Organization: built-in
   - Default application

...
```

## Alternative: Using MCP Proxy (Advanced)

If ChatGPT doesn't support direct MCP server connections or you need more control, you can use an MCP proxy service:

### Using a Cloud MCP Proxy

1. Deploy an MCP proxy service (e.g., using the `@modelcontextprotocol/server-oauth` package) on a cloud platform
2. Configure the proxy to connect to your Casdoor instance
3. Add the proxy URL to ChatGPT instead of the direct Casdoor URL

### Example: Deploying MCP Proxy on Vercel

```bash
# Install the MCP OAuth server
npm install -g @modelcontextprotocol/server-oauth

# Create a simple server wrapper
cat > server.js << 'EOF'
const { createServer } = require('@modelcontextprotocol/server-oauth');

const server = createServer({
  targetUrl: process.env.CASDOOR_URL + '/api/mcp',
  clientId: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  scopes: process.env.OAUTH_SCOPES.split(' ')
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`MCP proxy listening on port ${PORT}`);
});
EOF

# Deploy to your preferred platform
```

Set environment variables:

- `CASDOOR_URL`: Your Casdoor instance URL
- `OAUTH_CLIENT_ID`: Your Client ID
- `OAUTH_CLIENT_SECRET`: Your Client Secret
- `OAUTH_SCOPES`: Space-separated list of scopes

## Troubleshooting

### Issue: "Unable to connect to MCP server"

**Cause**: The MCP server URL might be incorrect or unreachable.

**Solution**:

- Verify the URL in ChatGPT settings is correct
- Ensure your Casdoor instance is publicly accessible via HTTPS
- Test the MCP endpoint manually: `curl https://your-casdoor.com/api/mcp`

### Issue: "Redirect URI mismatch" error during OAuth

**Cause**: The callback URL doesn't match the configured Redirect URI in Casdoor.

**Solution**:

- In Casdoor, ensure your application has the correct redirect URI:

  ```text
  https://chat.openai.com/auth/callback
  ```

- Check ChatGPT's documentation for the current callback URL

### Issue: "HTTPS required" error

**Cause**: ChatGPT requires HTTPS for OAuth flows.

**Solution**:

- Ensure your Casdoor instance uses HTTPS
- Configure SSL certificates for your domain
- Use a reverse proxy (Nginx, Caddy) with automatic HTTPS
- For development, consider using ngrok or similar tunneling services

### Issue: "CORS error" during OAuth flow

**Cause**: Cross-Origin Resource Sharing (CORS) restrictions.

**Solution**:

- Casdoor should automatically allow CORS for OAuth endpoints
- If using a reverse proxy, ensure CORS headers are properly forwarded
- Check your Casdoor CORS configuration for ChatGPT's domain

### Issue: "insufficient_scope" error

**Cause**: The requested operation requires a scope that wasn't granted.

**Solution**:

- Update the scopes in ChatGPT's MCP server settings
- Example: Add `write:application` if you want to create/modify applications
- Reconnect the server to get a new token with updated scopes

### Issue: OAuth token expired in long conversations

**Cause**: Access tokens expire after a certain time.

**Solution**:

- Ensure `Refresh Token` grant type is enabled in your Casdoor application (Step 1)
- ChatGPT should automatically refresh tokens, but you may need to reconnect if refresh fails

### Issue: MCP server not available in conversation

**Cause**: The server might not be properly connected or recognized.

**Solution**:

- Verify the connection in ChatGPT settings
- Try explicitly mentioning "using Casdoor MCP server" in your prompts
- Start a new conversation to ensure fresh initialization

## Security Considerations

- **HTTPS Only**: Always use HTTPS for production Casdoor instances when integrating with ChatGPT
- **PKCE (Proof Key for Code Exchange)**: Always enable PKCE in your Casdoor application
- **Scopes**: Follow the principle of least privilege - only grant scopes that ChatGPT needs
- **Token Storage**: ChatGPT stores tokens securely on OpenAI's infrastructure
- **Client Secret**: Keep your Client Secret confidential - don't share it in conversations
- **Token Revocation**: You can revoke access tokens in Casdoor's admin panel under **Tokens**
- **Audit Logs**: Monitor Casdoor's audit logs for actions performed by ChatGPT

## Privacy Considerations

:::warning
When using ChatGPT with Casdoor MCP server, be aware that:

- Data from your Casdoor instance may be processed by OpenAI
- Avoid sharing sensitive user information, passwords, or secrets
- Review OpenAI's privacy policy and terms of service
- Consider using data masking or filtering for sensitive fields
:::

## Use Cases

With ChatGPT connected to Casdoor's MCP server, you can:

- **Natural language queries**: "Show me all users created last week"
- **Bulk operations**: "Create 5 test applications for development"
- **Configuration assistance**: "What's the current OAuth configuration for app-xyz?"
- **Troubleshooting**: "Why isn't user John able to log in?"
- **Documentation**: "Explain the setup for our authentication system"
- **Reporting**: "Generate a summary of all active applications"

## Next Steps

Now that ChatGPT is connected to Casdoor:

- Explore available [MCP Tools](/docs/how-to-connect/mcp/tools) that ChatGPT can use
- Learn about [Authentication](/docs/how-to-connect/mcp/authentication) methods
- Understand [Error Handling](/docs/how-to-connect/mcp/error-handling) for better debugging
- Check out the [Integration Example](/docs/how-to-connect/mcp/integration) for programmatic access

## Related Resources

- [MCP Server Overview](/docs/how-to-connect/mcp/overview)
- [Authorization and Scopes](/docs/how-to-connect/mcp/authorization)
- [Application Categories](/docs/application/categories)
- [ChatGPT Documentation](https://help.openai.com/en/collections/3742473-chatgpt)
