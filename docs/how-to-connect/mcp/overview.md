---
title: MCP server overview
sidebar_label: Overview
description: Casdoor exposes its management API as a Model Context Protocol (MCP) server at /api/mcp, and it can register, browse, and scan for external MCP servers.
keywords: [MCP, Model Context Protocol, API, automation, JSON-RPC]
authors: [hsluoyz]
---

Casdoor has a built-in Model Context Protocol (MCP) server at `/api/mcp`. MCP clients, such as AI assistants and automation tools, call it to manage applications, users, and other Casdoor objects, without using the REST API directly.

MCP is a protocol on top of JSON-RPC 2.0 through which a client discovers the tools of a server and calls them.

Casdoor works with MCP in two directions:

- **As an MCP server**: Casdoor offers its own management functions as tools. The pages of this section describe this server.
- **As a registry of external MCP servers**: Casdoor stores the MCP servers that your organization uses, with their tokens and the tools that you allow. See [Register an external MCP server](/docs/how-to-connect/mcp/overview#registering-external-mcp-servers).

## Connect to the Casdoor MCP server {#getting-started}

The endpoint `/api/mcp` accepts `POST` requests with JSON-RPC 2.0 payloads. Before a client calls tools, it completes the initialization handshake.

1. The client sends `initialize`:

   ```json
   POST /api/mcp
   {
     "jsonrpc": "2.0",
     "id": 1,
     "method": "initialize",
     "params": {
       "protocolVersion": "2024-11-05",
       "capabilities": {},
       "clientInfo": {
         "name": "my-client",
         "version": "1.0.0"
       }
     }
   }
   ```

1. Casdoor answers with its capabilities:

   ```json
   {
     "jsonrpc": "2.0",
     "id": 1,
     "result": {
       "protocolVersion": "2024-11-05",
       "capabilities": {
         "tools": {
           "listChanged": true
         }
       },
       "serverInfo": {
         "name": "Casdoor MCP Server",
         "version": "1.0.0"
       }
     }
   }
   ```

1. The client confirms that it is ready:

   ```json
   POST /api/mcp
   {
     "jsonrpc": "2.0",
     "method": "notifications/initialized"
   }
   ```

MCP client libraries perform the handshake for you. To connect a specific client, see:

- [Connect Claude Desktop](/docs/how-to-connect/mcp/connect-claude-desktop)
- [Connect Cursor](/docs/how-to-connect/mcp/connect-cursor)
- [Connect ChatGPT](/docs/how-to-connect/mcp/connect-chatgpt)

## Register an external MCP server {#registering-external-mcp-servers}

1. In the Casdoor admin console, open the **MCP Servers** page and add a server.
1. Fill in the following fields:

   | Field | Description |
   |-------|-------------|
   | **Name** | Unique identifier for this server entry |
   | **Display name** | Human-readable label shown in the UI |
   | **URL** | The external MCP server's endpoint |
   | **Application** | Casdoor application associated with this server (used for auth context) |
   | **Token** | Bearer token used to authenticate with the external server |
   | **Tools** | List of tools fetched from the server; each tool can be individually allowed or blocked |

1. Save the server. Casdoor fetches the list of tools from the server and stores it.

### Get a token from Casdoor

If the external server trusts Casdoor as its OAuth 2.0 provider, you don't have to paste a token. Select an **Application**, and then click **Get access token** next to the **Token** field. Casdoor issues an access token for the signed-in user and that application and fills it in. The button is unavailable until you select an application, because Casdoor issues the token for that application.

If the server uses credentials from another issuer, enter the token by hand.

### Refresh or clear the tool list

On the edit page of the server:

- **Sync** fetches the tool list again, without saving the rest of the configuration. Tools that already exist keep their allowed or blocked setting. New tools are allowed by default.
- **Clear** removes all stored tools of the server, without fetching new ones. Use it to reset the list before a new sync or before you retire a server.

## Add a server from the MCP Store {#mcp-store}

The **MCP Store** page lists public MCP servers from an online registry.

1. Search for a server by name or by tag.
1. Click **Add**. Casdoor creates a server record with the URL and the metadata of the server.
1. On the edit page of the new server, set the token and choose the allowed tools.

## Scan your network for MCP servers {#scanning-intranet-mcp-servers}

To find MCP servers that run on your internal network:

1. On the **MCP Servers** page, click **Scan**.
1. Fill in the scan settings:

   | Field | Default | Description |
   |-------|---------|-------------|
   | **CIDR / IP** | — | One or more CIDR ranges or individual IPs to scan (e.g. `192.168.1.0/24`). Required. Max 1024 hosts per scan. |
   | **Scheme** | `http` | `http` or `https` |
   | **Ports** | `3000, 8080, 80` | Ports to probe on each host |
   | **Paths** | `/`, `/mcp`, `/sse`, `/mcp/sse` | URL paths to try on each host/port combination |

1. Start the scan. Casdoor probes every combination of host, port, and path, with up to 32 connections at a time and a timeout of 1.2 seconds per probe. It lists every endpoint that answers with a valid MCP `initialize` response.
1. Select the servers that you want and add them to the **MCP Servers** list.

## See also

- [MCP authentication](/docs/how-to-connect/mcp/authentication)
- [MCP tools reference](/docs/how-to-connect/mcp/tools)
- [MCP authorization and scopes](/docs/how-to-connect/mcp/authorization)
- [Casdoor as an authorization server for MCP servers](/docs/mcp-auth/overview)
