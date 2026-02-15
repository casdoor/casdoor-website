---
title: MCP Server Overview
description: Introduction to Casdoor's Model Context Protocol (MCP) server
keywords: [MCP, Model Context Protocol, API, automation, JSON-RPC]
authors: [hsluoyz]
---

Casdoor provides a Model Context Protocol (MCP) server at `/api/mcp` that enables programmatic management of applications and other resources through a standardized JSON-RPC 2.0 interface. MCP servers expose tools that AI assistants and other clients can use to interact with your Casdoor instance.

## What is MCP?

The Model Context Protocol is a JSON-RPC 2.0 protocol that defines a standard way for clients (like AI assistants or automation tools) to discover and invoke tools provided by servers. Casdoor's MCP implementation allows clients to manage applications, users, and other resources without needing to understand Casdoor's specific REST API structure.

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
