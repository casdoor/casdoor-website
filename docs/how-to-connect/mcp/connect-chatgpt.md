---
title: Connect ChatGPT to the Casdoor MCP server
sidebar_label: Connect ChatGPT
description: Connect ChatGPT to the Casdoor MCP server with OAuth 2.0, so that ChatGPT can manage applications and users in Casdoor.
keywords: [MCP, ChatGPT, OpenAI, OAuth, PKCE]
authors: [hsluoyz]
---

This guide explains how to connect ChatGPT to the MCP server of Casdoor, so that you can manage applications, users, and other objects from a ChatGPT conversation.

---

#### Learning outcomes

- Let ChatGPT register itself as an OAuth 2.0 client of Casdoor.
- Add the Casdoor MCP server to ChatGPT as a connector.
- Sign in and check that ChatGPT can call the tools.

#### What you need

- A Casdoor instance that is reachable from the internet over HTTPS. ChatGPT calls Casdoor from the servers of OpenAI.
- A ChatGPT plan that supports custom MCP connectors
- Administrator access to the Casdoor admin console

---

## About the connection

ChatGPT connects to a remote MCP server from the OpenAI platform. It reads the discovery documents of Casdoor, registers itself as a client through dynamic client registration (DCR), and runs the OAuth 2.0 authorization code flow with PKCE. See [Authentication](https://developers.openai.com/apps-sdk/build/auth) in the OpenAI documentation.

## Allow dynamic client registration

1. In the Casdoor admin console, go to **User Management** > **Organizations** and open the `built-in` organization. Clients register in this organization by default.
1. Turn on **Enable dynamic client registration**.
1. Save the organization.

When ChatGPT registers, Casdoor creates an application for it whose name starts with `dcr_`. See [Dynamic client registration](/docs/application/dynamic-client-registration).

## Add the connector in ChatGPT

The names of the settings in ChatGPT change over time. For the current steps, see the ChatGPT help.

1. In the settings of ChatGPT, turn on developer mode for connectors.
1. Add a custom connector with the following values:

   | Setting | Value |
   |---|---|
   | Name | `Casdoor`, or a name of your choice |
   | MCP server URL | `https://your-casdoor.com/api/mcp` |
   | Authentication | OAuth |

1. Save the connector. ChatGPT registers with Casdoor and opens the Casdoor sign-in page.

## Sign in

1. Sign in on the Casdoor sign-in page with an account that may manage the objects that you want ChatGPT to work with.
1. If Casdoor shows a consent screen, click **Allow**.
1. Casdoor sends you back to ChatGPT. The connector is now connected.

## Verify the result

In a new conversation, turn on the connector and ask ChatGPT to work with Casdoor, for example:

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

- Check the URL of the connector. It ends with `/api/mcp`.
- Check that Casdoor is reachable from the internet over HTTPS with a valid certificate. For development, a tunnel such as ngrok works.
- Call the endpoint yourself: `curl https://your-casdoor.com/api/mcp`.

### Registration fails

Check that **Enable dynamic client registration** is on for the `built-in` organization.

### Casdoor reports a redirect URL mismatch

If you use an application that you created by hand instead of DCR, add the redirect URL that ChatGPT shows for the connector to the **Redirect URLs** of the application. ChatGPT redirects to a URL of the form `https://chatgpt.com/connector/oauth/<callback-id>`.

### A tool call fails with insufficient_scope

The token of ChatGPT lacks the scope that the tool requires. See [MCP authorization and scopes](/docs/how-to-connect/mcp/authorization).

### The token expires in a long conversation

ChatGPT refreshes the token with the refresh token. If the refresh fails, reconnect the connector.

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
