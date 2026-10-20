---
title: Connect ChatGPT to the Casdoor MCP server
sidebar_label: Connect ChatGPT
description: Add the Casdoor MCP server to ChatGPT as a custom MCP server with OAuth 2.0 - the steps in ChatGPT Plugins, client ID metadata documents and dynamic client registration, the redirect URI, sign-in, and why ChatGPT asks for permission before tool calls.
keywords: [MCP, ChatGPT, ChatGPT MCP, connect ChatGPT to MCP server, add MCP server to ChatGPT, custom MCP server, ChatGPT plugins, ChatGPT MCP callback URL, OpenAI, OAuth, PKCE, CIMD]
authors: [hsluoyz]
---

This guide explains how to connect ChatGPT to the MCP server of Casdoor, so that you can manage applications, users, and other objects from a ChatGPT conversation.

---

#### Learning outcomes

- Let ChatGPT identify itself as an OAuth 2.0 client of Casdoor.
- Add the Casdoor MCP server to ChatGPT as a custom MCP server.
- Sign in and check that ChatGPT can call the tools.

#### What you need

- A Casdoor instance that is reachable from the internet over HTTPS. ChatGPT calls Casdoor from the servers of OpenAI.
- A ChatGPT account or workspace that allows custom MCP servers
- Administrator access to the Casdoor admin console

---

## About the connection

ChatGPT connects to a remote MCP server from the OpenAI platform. It reads the discovery documents of Casdoor and identifies itself as an OAuth client in one of two ways: with a client ID metadata document (CIMD), where its `client_id` is an HTTPS URL of a document that ChatGPT publishes, or through dynamic client registration (DCR). Then it runs the OAuth 2.0 authorization code flow with PKCE. See [Authenticate users](https://developers.openai.com/plugins/build/auth) in the OpenAI documentation.

## Allow dynamic client registration

1. In the Casdoor admin console, go to **User Management** > **Organizations** and open the `built-in` organization. Clients register in this organization by default.
1. Turn on **Enable dynamic client registration**.
1. Save the organization.

The same setting lets Casdoor accept client ID metadata documents. When ChatGPT registers through DCR, Casdoor creates an application for it whose name starts with `dcr_`; when it uses CIMD, the application's name starts with `cimd_` and its client ID is the URL of ChatGPT's document. See [Dynamic client registration](/docs/application/dynamic-client-registration) and [Accept clients identified by a metadata document URL](/docs/application/dynamic-client-registration#client-id-metadata-documents).

## Add the MCP server in ChatGPT

The names of the settings in ChatGPT change over time. For the current steps, see [Connect to ChatGPT](https://developers.openai.com/plugins/deploy/connect-chatgpt) in the OpenAI documentation. Account and workspace policies decide who can add custom MCP servers.

1. Go to [ChatGPT Plugins](https://chatgpt.com/plugins), select the plus button, and then select **Add custom MCP server**.
1. Enter a name, such as `Casdoor`, and a description.
1. Under **Connection**, enter the MCP server URL: `https://your-casdoor.com/api/mcp`.
1. Under authentication, choose OAuth.
1. Review the risk warning, select **I understand and want to continue**, and then select **Create as a plugin**.
1. Install the plugin. ChatGPT identifies itself to Casdoor and opens the Casdoor sign-in page.

## Sign in

1. Sign in on the Casdoor sign-in page with an account that may manage the objects that you want ChatGPT to work with.
1. If Casdoor shows a consent screen, click **Allow**.
1. Casdoor sends you back to ChatGPT. The plugin is now connected.

## Verify the result

In a new conversation, type `@` in the prompt box, select the plugin, and ask ChatGPT to work with Casdoor, for example:

- "Using Casdoor, list all applications."
- "Show me the application named `my-app` from Casdoor."
- "Create an application in Casdoor called `test-app` in the organization `my-org`."

ChatGPT calls the MCP tools and answers with data from your Casdoor instance, for example:

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

## Troubleshooting

### ChatGPT can't connect to the MCP server

- Check the MCP server URL in ChatGPT. It ends with `/api/mcp`.
- Check that Casdoor is reachable from the internet over HTTPS with a valid certificate. For development, a tunnel such as ngrok works.
- Call the endpoint yourself: `curl https://your-casdoor.com/api/mcp`.

### Registration fails

Check that **Enable dynamic client registration** is on for the `built-in` organization.

### Casdoor reports a redirect URL mismatch

If you use an application that you created by hand instead of DCR or CIMD, add the redirect URI that ChatGPT shows on the MCP server's management page to the **Redirect URLs** of the application. ChatGPT uses one of two forms:

- `https://chatgpt.com/connector_platform_oauth_redirect`, a stable URI, for authorization servers that support issuer identification ([RFC 9207](https://www.rfc-editor.org/rfc/rfc9207)). Casdoor announces this support in `authorization_response_iss_parameter_supported` and returns `iss` with the authorization code.
- `https://chatgpt.com/connector/oauth/<callback-id>`, specific to one connection, otherwise.

Copy the exact value from ChatGPT rather than typing it.

### ChatGPT asks for permission before every tool call

ChatGPT decides how to confirm a tool call from the tool's MCP annotations, such as `readOnlyHint` for tools that can't change anything and `destructiveHint` for tools whose effect is hard to undo. See [Build your MCP server](https://developers.openai.com/apps-sdk/build/mcp-server) in the OpenAI documentation. The tools of the Casdoor MCP server don't set annotations, so ChatGPT can't tell that `get_applications`, `get_application`, `get_users`, and `get_user` only read data, and it may ask for permission for them as well as for the `add_`, `update_`, and `delete_` tools.

Approve a call only after you check its arguments, in particular the object that an `update_` or `delete_` tool will change. To limit what ChatGPT can do whatever you approve, sign in with an account that has only the rights that ChatGPT needs, and grant only the scopes it needs (see [MCP authorization and scopes](/docs/how-to-connect/mcp/authorization)).

### A tool call fails with insufficient_scope

The token of ChatGPT lacks the scope that the tool requires. See [MCP authorization and scopes](/docs/how-to-connect/mcp/authorization).

### The token expires in a long conversation

ChatGPT refreshes the token with the refresh token. If the refresh fails, reconnect the plugin.

## Secure the connection

- **HTTPS**: ChatGPT requires HTTPS.
- **Least privilege**: Sign in with an account that has only the rights that ChatGPT needs.
- **Revocation**: To cut off the client, delete its tokens on the **Tokens** page of the Casdoor admin console.

:::caution
OpenAI processes the data that ChatGPT reads from your Casdoor instance. Don't ask ChatGPT to read passwords, secrets, or personal data that you may not share with OpenAI, and review the privacy policy of OpenAI.
:::

## See also

- [MCP tools reference](/docs/how-to-connect/mcp/tools)
- [MCP authentication](/docs/how-to-connect/mcp/authentication)
- [MCP troubleshooting](/docs/how-to-connect/mcp/troubleshooting)
