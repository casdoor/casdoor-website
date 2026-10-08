---
title: Connect Claude Desktop to the Casdoor MCP server
sidebar_label: Connect Claude Desktop
description: Connect Claude Desktop to the Casdoor MCP server through mcp-remote and OAuth 2.0, so that Claude can manage applications and users in Casdoor.
keywords: [MCP, Claude Desktop, OAuth, PKCE]
authors: [hsluoyz]
---

This guide explains how to connect Claude Desktop to the MCP server of Casdoor, so that you can manage applications, users, and other objects by talking to Claude.

---

#### Learning outcomes

- Let Claude Desktop register itself as an OAuth 2.0 client of Casdoor.
- Add the Casdoor MCP server to the configuration of Claude Desktop.
- Sign in and check that Claude can call the tools.

#### What you need

- A running Casdoor instance. Use HTTPS in production.
- [Claude Desktop](https://claude.ai/download) and Node.js, which provides `npx`
- Administrator access to the Casdoor admin console

---

## About the connection

Claude Desktop talks to local MCP servers over standard input and output. The [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) package bridges it to a remote server such as Casdoor, and runs the OAuth 2.0 flow: it reads the discovery documents of Casdoor, registers itself as a client through dynamic client registration (DCR), and opens your browser for the sign-in.

## Allow dynamic client registration

1. In the Casdoor admin console, go to **User Management** > **Organizations** and open the `built-in` organization. Clients register in this organization by default.
1. Turn on **Enable dynamic client registration**.
1. Save the organization.

When `mcp-remote` registers, Casdoor creates an application for it whose name starts with `dcr_`. See [Dynamic client registration](/docs/application/dynamic-client-registration).

## Configure Claude Desktop

1. Open the configuration file of Claude Desktop in a text editor:

   | Operating system | Path |
   |---|---|
   | macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
   | Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
   | Linux | `~/.config/Claude/claude_desktop_config.json` |

1. Add the Casdoor MCP server. Replace `your-casdoor.com` with the domain of your Casdoor instance.

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

1. Quit Claude Desktop completely, not only its window, and start it again.

## Sign in

When Claude Desktop starts, `mcp-remote` opens your default browser.

1. Sign in on the Casdoor sign-in page with an account that may manage the objects that you want Claude to work with.
1. If Casdoor shows a consent screen, click **Allow**.
1. The browser shows a success message. Return to Claude Desktop.

`mcp-remote` stores the tokens on your computer. You sign in again only after the tokens are revoked or expire without a refresh token.

## Verify the result

Ask Claude to work with Casdoor, for example:

- "List all applications in Casdoor."
- "Show me the application named `my-app`."
- "Create an application called `test-app` in the organization `my-org`."

Claude calls the MCP tools and answers with data from your Casdoor instance, for example:

```text
I found the following applications in your Casdoor instance:

1. claude-desktop-mcp (Claude Desktop MCP Client)
2. app-built-in (Casdoor)
...
```

## Troubleshooting

### Claude Desktop can't connect to the MCP server

- Check the URL in `claude_desktop_config.json`. It ends with `/api/mcp`.
- Check that Casdoor runs and that your computer can reach it.
- Check that the scheme is right: `https` in production.

### Registration fails

Check that **Enable dynamic client registration** is on for the `built-in` organization.

### Casdoor reports a redirect URL mismatch

`mcp-remote` listens for the callback at `http://localhost:3334/oauth/callback`. If port 3334 is in use, it chooses another port, and the redirect URL of an earlier registration no longer matches. Free the port, or delete the `dcr_` application in Casdoor and the cached credentials of `mcp-remote`, and connect again.

### A tool call fails with insufficient_scope

The token of the client lacks the scope that the tool requires. See [MCP authorization and scopes](/docs/how-to-connect/mcp/authorization).

## Secure the connection

- **HTTPS**: Serve Casdoor over HTTPS in production, to protect the OAuth 2.0 flow.
- **Least privilege**: Sign in with an account that has only the rights that Claude needs.
- **Revocation**: To cut off the client, delete its tokens on the **Tokens** page of the Casdoor admin console.

## See also

- [MCP tools reference](/docs/how-to-connect/mcp/tools)
- [MCP authentication](/docs/how-to-connect/mcp/authentication)
- [MCP troubleshooting](/docs/how-to-connect/mcp/troubleshooting)
- [Application categories](/docs/application/categories)
