---
title: Connect Claude to the Casdoor MCP server
sidebar_label: Connect Claude
description: Connect Claude Desktop, claude.ai, and Claude Code to the Casdoor MCP server, or to an MCP server behind the Casdoor MCP gateway, with OAuth 2.0 - custom connectors, Claude's client ID metadata document, the callback URL, claude_desktop_config.json with mcp-remote, and claude mcp add.
keywords: [MCP, Claude, Claude Desktop, claude.ai, Claude Code, custom connector, claude_desktop_config.json, mcp-remote, Claude MCP callback URL, CIMD, OAuth, PKCE]
authors: [hsluoyz]
---

This guide explains how to connect Claude to the MCP server of Casdoor, or to an MCP server behind the [Casdoor MCP gateway](/docs/how-to-connect/mcp/gateway). It covers three ways:

- **A custom connector** in Claude Desktop, claude.ai, and the Claude mobile apps. Claude connects from the cloud of Anthropic, so Casdoor must be reachable from the Internet.
- **Claude Code**, the command-line agent, which connects from your computer.
- **`mcp-remote`** in `claude_desktop_config.json`, for a Casdoor instance that only your computer can reach.

---

#### Learning outcomes

- Let Claude identify itself to Casdoor without an application created by hand.
- Add the MCP server to Claude in the way that fits your network.
- Sign in and check that Claude can call the tools.

#### What you need

- A running Casdoor instance. Use HTTPS in production.
- Claude Desktop, a claude.ai account, or Claude Code
- Global administrator access to the Casdoor admin console

---

## Accept Claude in Casdoor {#accept-claude-in-casdoor}

Claude identifies itself with a client ID metadata document (CIMD): its client ID is the URL of a document that Anthropic publishes, and Casdoor reads the document instead of asking Claude to register. Claude falls back to dynamic client registration (DCR) when the authorization server doesn't support CIMD. Both are governed by one switch:

1. In the Casdoor admin console, go to **User Management** > **Organizations** and open the organization whose users sign in to Claude: `built-in` for the Casdoor MCP server, or the organization of the server for a server behind the MCP gateway.
1. Turn on **Enable dynamic client registration**.
1. Save the organization.

The discovery document of the organization then announces `client_id_metadata_document_supported: true` and lists `none` in `token_endpoint_auth_methods_supported`, the two values that Claude checks before it uses CIMD.

| Claude | Client ID | Redirect URI |
|---|---|---|
| Claude Desktop, claude.ai, mobile | `https://claude.ai/oauth/mcp-oauth-client-metadata` | `https://claude.ai/api/mcp/auth_callback` |
| Claude Code | `https://claude.ai/oauth/claude-code-client-metadata` | `http://localhost:<port>/callback` |

On the first sign-in, Casdoor creates an application for each client ID, with a name that starts with `cimd_` and the tag `cimd`. All organizations share this one application, and each user signs in to their own organization. See [Accept clients identified by a metadata document URL](/docs/application/dynamic-client-registration#client-id-metadata-documents).

## Option 1: add a custom connector {#custom-connector}

Claude Desktop, claude.ai, and the mobile apps share connectors. Claude connects to the MCP server and to Casdoor from the cloud of Anthropic, from the address range `160.79.104.0/21`, so both must be reachable from the Internet over HTTPS. For the current steps, see [Get started with custom connectors](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp) in the Claude Help Center.

**Free, Pro, and Max plans:**

1. In Claude, go to **Customize** > **Connectors**, and select **Add custom connector**.
1. Enter a name, such as `Casdoor`, and the URL of the MCP server:
   - `https://your-casdoor.com/api/mcp` for the MCP server of Casdoor
   - `https://your-casdoor.com/api/server/<organization>/<server-name>` for a server behind the MCP gateway
1. Under the OAuth client options, keep **Use Claude's published identity (Recommended)**.
1. Select **Add**, and then **Connect**.

**Team and Enterprise plans:** an owner adds the connector in **Organization settings** > **Connectors** > **Add** > **Custom** > **Web** with the same URL, and each member selects **Connect** in their own **Connectors** settings.

When you select **Connect**, Claude opens the Casdoor sign-in page:

1. Sign in with your account.
1. If Casdoor shows a consent screen, click **Allow**.
1. Casdoor sends you back to Claude. The connector shows as connected.

You can't change the authentication of a connector later. To switch to another OAuth client, remove the connector and add it again.

### Use an application that you create

If you don't want to turn on dynamic client registration, create the client yourself:

1. In the Casdoor admin console, go to **Identity** > **Applications** and add an application in the organization of your users, for example `claude-mcp`.
1. Add `https://claude.ai/api/mcp/auth_callback` to **Redirect URLs**.
1. Save the application and copy its **Client ID** and **Client Secret**.
1. In the **Add custom connector** dialog, choose **Use your own OAuth client** and enter them.

## Option 2: Claude Code {#claude-code}

Claude Code runs on your computer, so Casdoor only has to be reachable from it.

1. Add the server:

   ```bash
   claude mcp add --transport http casdoor https://your-casdoor.com/api/mcp
   ```

   For a server behind the MCP gateway, use the gateway URL instead. Add `--scope project` to share the server with your team through `.mcp.json`, or `--scope user` for all your projects.

1. Start Claude Code, run `/mcp`, select the server, and select **Authenticate**. Your browser opens the Casdoor sign-in page.

Claude Code listens on a random port for the callback. Its document lists `http://localhost/callback` and `http://127.0.0.1/callback`, and Casdoor matches a loopback redirect URI on any port, as [RFC 8252](https://www.rfc-editor.org/rfc/rfc8252#section-7.3) requires. To sign out, run `claude mcp logout casdoor`, or select **Clear authentication** in `/mcp`.

To use an application that you create, pass its credentials and fix the port, so that the redirect URI is known:

```bash
claude mcp add --transport http --client-id <client-id> --client-secret --callback-port 8080 casdoor https://your-casdoor.com/api/mcp
```

Add `http://localhost:8080/callback` to the **Redirect URLs** of the application. See [Connect Claude Code to tools via MCP](https://code.claude.com/docs/en/mcp).

## Option 3: claude_desktop_config.json and mcp-remote {#mcp-remote}

When Casdoor is on your local network or your computer, the cloud of Anthropic can't reach it. Run the connection on your computer with the [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) package instead, which bridges Claude Desktop to a remote server over standard input and output and runs the OAuth 2.0 flow with DCR. It needs Node.js, which provides `npx`.

1. Open the configuration file of Claude Desktop in a text editor:

   | Operating system | Path |
   |---|---|
   | macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
   | Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
   | Linux | `~/.config/Claude/claude_desktop_config.json` |

1. Add the server:

   ```json
   {
     "mcpServers": {
       "casdoor": {
         "command": "npx",
         "args": [
           "mcp-remote",
           "https://your-casdoor.com/api/mcp"
         ]
       }
     }
   }
   ```

1. Quit Claude Desktop completely, not only its window, and start it again. `mcp-remote` opens your browser for the sign-in.

`mcp-remote` registers an application whose name starts with `dcr_` and listens for the callback at `http://localhost:3334/oauth/callback`. It stores the tokens on your computer.

## Verify the result

Ask Claude to use the server, for example:

- "List all applications in Casdoor."
- "Show me the application named `my-app`."
- "Create an application called `test-app` in the organization `my-org`."

Claude calls the MCP tools and answers with data from the server. In the Casdoor admin console, the **Tokens** page shows the token of your user for the `cimd_` or `dcr_` application.

## Troubleshooting

### Claude says it can't reach the server

- Check that the URL ends with `/api/mcp`, or is a gateway URL `/api/server/<organization>/<server-name>`.
- For a custom connector, check that Casdoor is reachable from the Internet with a valid certificate, and that no firewall blocks `160.79.104.0/21`. Use Claude Code or `mcp-remote` for a Casdoor instance on a private network.
- Call the server yourself: `curl -i -X POST https://your-casdoor.com/api/mcp`. Casdoor answers HTTP 401 with a `WWW-Authenticate` header that names the protected resource metadata, which is what starts the sign-in in Claude.

### Casdoor rejects the client ID metadata document

The error "client ID metadata documents are not accepted" means that **Enable dynamic client registration** is off for the organization. See [Accept Claude in Casdoor](/docs/how-to-connect/mcp/connect-claude-desktop#accept-claude-in-casdoor).

### Casdoor reports a redirect URL mismatch

For an application that you created, check that **Redirect URLs** contains the exact callback of the client: `https://claude.ai/api/mcp/auth_callback` for a connector, or `http://localhost:<port>/callback` for Claude Code with `--callback-port`. For `mcp-remote`, if port 3334 is in use, it chooses another port; free the port, delete the `dcr_` application and the cached credentials of `mcp-remote` in `~/.mcp-auth`, and connect again.

### A tool call fails with insufficient_scope

The token lacks the scope that the tool requires. See [MCP authorization and scopes](/docs/how-to-connect/mcp/authorization).

## Secure the connection

- **HTTPS**: Serve Casdoor over HTTPS in production, to protect the OAuth 2.0 flow.
- **Least privilege**: Sign in with an account that has only the rights that Claude needs.
- **Revocation**: To cut off the client, delete its tokens on the **Tokens** page of the Casdoor admin console.
- **Enterprise**: With an enterprise identity provider, Claude Team and Enterprise can get tokens without a browser sign-in. See [Enterprise-managed authorization](/docs/mcp-auth/enterprise-managed-authorization).

## See also

- [The MCP gateway of Casdoor, end to end](/docs/how-to-connect/mcp/gateway)
- [Connect VS Code](/docs/how-to-connect/mcp/connect-vscode)
- [Connect Cursor](/docs/how-to-connect/mcp/connect-cursor)
- [Connect ChatGPT](/docs/how-to-connect/mcp/connect-chatgpt)
- [MCP tools reference](/docs/how-to-connect/mcp/tools)
- [Building custom connectors: authentication](https://claude.com/docs/connectors/building/authentication) in the Claude documentation
