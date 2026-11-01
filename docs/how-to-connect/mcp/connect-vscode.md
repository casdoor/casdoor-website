---
title: Connect VS Code to the Casdoor MCP server
sidebar_label: Connect VS Code
description: Connect GitHub Copilot in VS Code to the Casdoor MCP server, or to an MCP server behind the Casdoor MCP gateway, with OAuth 2.0 - the mcp.json entry, the client ID metadata document of VS Code, the redirect URIs, and sign-out.
keywords: [MCP, VS Code, Visual Studio Code, GitHub Copilot, agent mode, mcp.json, VS Code MCP OAuth, VS Code MCP redirect URI, CIMD, OAuth, PKCE]
authors: [hsluoyz]
---

This guide explains how to connect GitHub Copilot in VS Code to the MCP server of Casdoor, or to an MCP server behind the [Casdoor MCP gateway](/docs/how-to-connect/mcp/gateway), so that Copilot can call its tools in agent mode.

---

#### Learning outcomes

- Let VS Code identify itself to Casdoor without an application created by hand.
- Add the MCP server to `mcp.json`.
- Sign in, check the tools, and sign out.

#### What you need

- A running Casdoor instance. Use HTTPS in production.
- [VS Code](https://code.visualstudio.com/) with GitHub Copilot
- Global administrator access to the Casdoor admin console

---

## About the connection

VS Code connects to remote MCP servers over HTTP and runs the OAuth 2.0 authorization code flow with PKCE itself. When an MCP server answers with HTTP 401, VS Code reads the protected resource metadata of the server, finds Casdoor as its authorization server, and gets a client ID in the first way that works:

1. **A client ID in `mcp.json`**: an application that you create in Casdoor. See [Use an application that you create](/docs/how-to-connect/mcp/connect-vscode#use-an-application-that-you-create).
1. **A client ID metadata document (CIMD)**: VS Code uses the URL of a document that it publishes, `https://vscode.dev/oauth/client-metadata.json`, as its client ID. Casdoor reads the document and needs no registration.
1. **Dynamic client registration (DCR)**: VS Code registers itself through the registration endpoint of Casdoor.

The document of VS Code lists two redirect URIs: `http://127.0.0.1:33418/` for the desktop app and `https://vscode.dev/redirect` for VS Code for the Web. See [MCP developer guide](https://code.visualstudio.com/api/extension-guides/ai/mcp) in the VS Code documentation.

## Accept VS Code in Casdoor

CIMD and DCR are both governed by **Enable dynamic client registration** of an organization.

1. In the Casdoor admin console, go to **User Management** > **Organizations** and open the organization whose users sign in to VS Code: `built-in` for the Casdoor MCP server, or the organization of the server for a server behind the MCP gateway.
1. Turn on **Enable dynamic client registration**.
1. Save the organization.

On the first sign-in, Casdoor creates an application with the client ID `https://vscode.dev/oauth/client-metadata.json`, a name that starts with `cimd_`, and the tag `cimd`. All organizations share this one application. See [Accept clients identified by a metadata document URL](/docs/application/dynamic-client-registration#client-id-metadata-documents).

## Add the MCP server to VS Code

1. Open the Command Palette and run **MCP: Open User Configuration** for all workspaces, or create `.vscode/mcp.json` in a workspace.
1. Add the server. Replace `your-casdoor.com` with the domain of your Casdoor instance.

   For the MCP server of Casdoor:

   ```json
   {
     "servers": {
       "casdoor": {
         "type": "http",
         "url": "https://your-casdoor.com/api/mcp"
       }
     }
   }
   ```

   For a server behind the MCP gateway, use the gateway URL `https://your-casdoor.com/api/server/<organization>/<server-name>`:

   ```json
   {
     "servers": {
       "acme-tools": {
         "type": "http",
         "url": "https://your-casdoor.com/api/server/acme/tools"
       }
     }
   }
   ```

1. Save the file. VS Code shows a **Start** CodeLens above the server. Select it.

## Sign in

1. VS Code asks whether the server may sign in with Casdoor. Select **Allow**.
1. Your browser opens the Casdoor sign-in page. Sign in.
1. If Casdoor shows a consent screen, click **Allow**.
1. The browser sends you back to VS Code, and the server starts.

## Verify the result

1. Open the Chat view and switch to **Agent** mode.
1. Select the **Tools** button and check that the tools of the server are listed.
1. Ask Copilot to use them, for example "List all applications in Casdoor".

To check the client on the Casdoor side, open **Identity** > **Applications** and find the `cimd_` application whose client ID is `https://vscode.dev/oauth/client-metadata.json`, or open **Tokens** and find the token of your user.

## Use an application that you create {#use-an-application-that-you-create}

If you don't want to turn on dynamic client registration, create the client yourself:

1. In the Casdoor admin console, go to **Identity** > **Applications** and add an application in the organization of your users, for example `vscode-mcp`.
1. Add `http://127.0.0.1:33418/` and `https://vscode.dev/redirect` to **Redirect URLs**.
1. Save the application and copy its **Client ID**.
1. Put the client ID in `mcp.json`:

   ```json
   {
     "servers": {
       "casdoor": {
         "type": "http",
         "url": "https://your-casdoor.com/api/mcp",
         "oauth": {
           "clientId": "<client-id>"
         }
       }
     }
   }
   ```

1. If the application needs a client secret, select the **Set Client Secret** CodeLens above the server and paste the **Client Secret**. VS Code keeps it in its secret storage, not in `mcp.json`.

## Sign out

- To sign out, open the **Accounts** menu at the bottom of the Activity Bar, select the Casdoor account, and select **Sign Out**.
- To make VS Code forget a client that it registered through DCR, run **Authentication: Remove Dynamic Authentication Providers**.
- To cut the client off on the Casdoor side, delete its tokens on the **Tokens** page.

## Troubleshooting

### Casdoor reports a redirect URL mismatch

VS Code listens on port 33418 for the callback. If another process uses the port, the redirect URI no longer matches. Free the port and try again.

### Casdoor rejects the client ID metadata document

The error "client ID metadata documents are not accepted" means that **Enable dynamic client registration** is off for the organization. See [Accept VS Code in Casdoor](/docs/how-to-connect/mcp/connect-vscode#accept-vs-code-in-casdoor). Casdoor must also reach `https://vscode.dev` over the Internet.

### VS Code asks for a client ID

VS Code asks when it can use neither CIMD nor DCR. Turn on **Enable dynamic client registration**, or enter the client ID of an application that you created.

### The gateway answers 401 after sign-in

See [Troubleshooting](/docs/how-to-connect/mcp/gateway#troubleshooting) in the MCP gateway guide.

## See also

- [The MCP gateway of Casdoor, end to end](/docs/how-to-connect/mcp/gateway)
- [Connect Claude](/docs/how-to-connect/mcp/connect-claude-desktop)
- [Connect Cursor](/docs/how-to-connect/mcp/connect-cursor)
- [Connect ChatGPT](/docs/how-to-connect/mcp/connect-chatgpt)
- [MCP configuration reference](https://code.visualstudio.com/docs/agents/reference/mcp-configuration) in the VS Code documentation
