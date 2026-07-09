---
title: MCP server overview
description: Use Casdoor’s MCP server for programmatic access via JSON-RPC 2.0.
keywords: [MCP, Model Context Protocol, API, automation, JSON-RPC]
authors: [hsluoyz]
---

Casdoor exposes a **Model Context Protocol (MCP)** server at `/api/mcp`. Clients (e.g. AI assistants or automation tools) can call it over JSON-RPC 2.0 to manage applications, users, and other resources without using Casdoor’s REST API directly.

## What is MCP?

MCP is a JSON-RPC 2.0 protocol for discovering and calling tools provided by a server. Casdoor’s MCP server exposes tools so clients can manage Casdoor resources in a standard way.

## Getting Started

The MCP endpoint is available at `/api/mcp` and accepts POST requests with JSON-RPC 2.0 payloads. Before making tool calls, clients must complete the initialization handshake:

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

The server responds with its capabilities:

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

## Registering external MCP servers

Casdoor can also act as an MCP client and connect to external MCP servers. Navigate to **Servers** in the Casdoor sidebar to register an external server:

| Field | Description |
|-------|-------------|
| **Name** | Unique identifier for this server entry |
| **Display name** | Human-readable label shown in the UI |
| **URL** | The external MCP server's endpoint |
| **Application** | Casdoor application associated with this server (used for auth context) |
| **Token** | Bearer token used to authenticate with the external server |
| **Tools** | List of tools fetched from the server; each tool can be individually allowed or blocked |

When you save the configuration, Casdoor automatically fetches the tool list from the remote server and stores it. Use the **Sync** button on the server edit page to refresh the tool list at any time without re-saving the full configuration. The sync operation preserves the `IsAllowed` setting for any tools that already exist; new tools discovered during sync are enabled by default. Use the **Clear** button (next to Sync) to remove all stored tools for the server without fetching new ones—useful when you want to reset the tool list before re-syncing or decommissioning a server.

After initialization, send a notification to indicate the client is ready:

```json
POST /api/mcp
{
  "jsonrpc": "2.0",
  "method": "notifications/initialized"
}
```

## MCP Store

The **MCP Store** page (accessible from the sidebar under **Servers → Store**) shows a curated list of publicly available MCP servers sourced from an online registry. You can browse by name or tag, then click **Add** to create a local Server record pre-filled with the server's URL and metadata. After adding, configure the authentication token and tool permissions on the server edit page as needed.

## Scanning intranet MCP servers

If you have MCP servers running on your internal network, use the **Scan** button on the Servers list page to discover them automatically.

Clicking **Scan** opens a dialog where you specify:

| Field | Default | Description |
|-------|---------|-------------|
| **CIDR / IP** | — | One or more CIDR ranges or individual IPs to scan (e.g. `192.168.1.0/24`). Required. Max 1024 hosts per scan. |
| **Scheme** | `http` | `http` or `https` |
| **Ports** | `3000, 8080, 80` | Ports to probe on each host |
| **Paths** | `/`, `/mcp`, `/sse`, `/mcp/sse` | URL paths to try on each host/port combination |

Casdoor probes all host/port/path combinations concurrently (default timeout 1.2 s per probe, up to 32 concurrent connections). Any endpoint that responds with a valid MCP `initialize` handshake is listed in the results. From there you can select discovered servers and add them to your Servers list in one click.
