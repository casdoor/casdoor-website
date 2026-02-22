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

After initialization, send a notification to indicate the client is ready:

```json
POST /api/mcp
{
  "jsonrpc": "2.0",
  "method": "notifications/initialized"
}
```
