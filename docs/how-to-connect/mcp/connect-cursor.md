---
title: Connect Cursor to the Casdoor MCP server
sidebar_label: Connect Cursor
description: Connect the Cursor editor to the Casdoor MCP server with OAuth 2.0, so that the AI of Cursor can manage applications and users in Casdoor.
keywords: [MCP, Cursor, IDE, OAuth, PKCE]
authors: [hsluoyz]
---

This guide explains how to connect Cursor to the MCP server of Casdoor, so that you can manage applications, users, and other objects from the editor.

---

#### Learning outcomes

- Register Cursor as an OAuth 2.0 client of Casdoor, dynamically or by hand.
- Add the Casdoor MCP server to the configuration of Cursor.
- Sign in and check that Cursor can call the tools.

#### What you need

- A running Casdoor instance. Use HTTPS in production.
- [Cursor](https://cursor.com/)
- Administrator access to the Casdoor admin console

---

## About the connection

Cursor connects to remote MCP servers over HTTP and runs the OAuth 2.0 flow itself. It uses the fixed redirect URL `cursor://anysphere.cursor-mcp/oauth/callback` for all MCP servers. Cursor gets its client ID in one of two ways:

- **Dynamic client registration (DCR)**: Cursor registers itself with Casdoor. This needs no application in Casdoor.
- **A static client**: You create an application in Casdoor and give its client ID to Cursor.

## Register the client

Choose one of the two options.

### Allow dynamic client registration

1. In the Casdoor admin console, go to **User Management** > **Organizations** and open the `built-in` organization. Clients register in this organization by default.
1. Turn on **Enable dynamic client registration**.
1. Save the organization.

### Create an application for Cursor

1. In the Casdoor admin console, go to **Identity** > **Applications** and add an application, for example `cursor-mcp`.
1. Add `cursor://anysphere.cursor-mcp/oauth/callback` to **Redirect URLs**.
1. Optionally, set **Category** to `Agent` and the type to `MCP`. See [Application categories](/docs/application/categories).
1. Save the application and copy its **Client ID**.

## Configure Cursor

1. Open the MCP configuration file of Cursor: `~/.cursor/mcp.json` for all projects, or `.cursor/mcp.json` in a project.
1. Add the Casdoor MCP server. Replace `your-casdoor.com` with the domain of your Casdoor instance.

   ```json
   {
     "mcpServers": {
       "casdoor": {
         "url": "https://your-casdoor.com/api/mcp"
       }
     }
   }
   ```

   If you created an application for Cursor, add an `auth` object with its client ID to the server entry:

   ```json
   {
     "mcpServers": {
       "casdoor": {
         "url": "https://your-casdoor.com/api/mcp",
         "auth": {
           "CLIENT_ID": "<client-id>",
           "scopes": ["application:read", "user:read"]
         }
       }
     }
   }
   ```

1. Reload Cursor: open the command palette, run `Developer: Reload Window`, or restart Cursor.

## Sign in

When Cursor connects to the server for the first time, it opens your default browser.

1. Sign in on the Casdoor sign-in page with an account that may manage the objects that you want Cursor to work with.
1. If Casdoor shows a consent screen, click **Allow**.
1. The browser hands the result back to Cursor.

## Verify the result

In the chat of Cursor, ask it to work with Casdoor, for example:

- "Using the Casdoor MCP server, list all applications."
- "Show me the application named `my-app` from Casdoor."
- "Create a Casdoor application called `test-app` in the organization `my-org`."

Cursor calls the MCP tools and answers with data from your Casdoor instance, for example:

```text
I've queried the Casdoor MCP server and found the following applications:

1. cursor-mcp (Cursor IDE MCP Client)
2. app-built-in (Casdoor)
...
```

## Troubleshooting

### Cursor doesn't list the server

- Check the path of the configuration file.
- Check that the file is valid JSON, without trailing commas.
- Reload Cursor after each change.

### Cursor can't connect to the MCP server

- Check the URL in `mcp.json`. It ends with `/api/mcp`.
- Check that Casdoor runs and that your computer can reach it.

### Casdoor reports a redirect URL mismatch

Check that `cursor://anysphere.cursor-mcp/oauth/callback` is in the **Redirect URLs** of the application.

### A tool call fails with insufficient_scope

The token lacks the scope that the tool requires. Add the scope to `scopes` in `mcp.json`, reload Cursor, and sign in again. See [MCP authorization and scopes](/docs/how-to-connect/mcp/authorization).

### The tools don't appear in the chat

- Open the developer tools of Cursor and look for errors.
- Check that you completed the sign-in.
- Name the server in your prompt: "using the Casdoor MCP server".

## Secure the connection

- **HTTPS**: Serve Casdoor over HTTPS in production.
- **Least privilege**: Request only the scopes that you need, and sign in with an account that has only the rights that Cursor needs.
- **Revocation**: To cut off the client, delete its tokens on the **Tokens** page of the Casdoor admin console.
- **Review**: Read what the AI is about to change in Casdoor before you approve a tool call.

## See also

- [MCP tools reference](/docs/how-to-connect/mcp/tools)
- [MCP authentication](/docs/how-to-connect/mcp/authentication)
- [MCP troubleshooting](/docs/how-to-connect/mcp/troubleshooting)
- [MCP in the Cursor documentation](https://cursor.com/docs/mcp)
