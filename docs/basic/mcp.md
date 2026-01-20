---
title: MCP Server
description: Using Casdoor's Model Context Protocol (MCP) server for application management
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

## Authentication

MCP requests require authentication using any of the methods described in the [Public API authentication](/docs/basic/public-api) documentation. The most common approaches are:

**Using an access token** (for user-scoped operations):

```bash
curl -X POST https://your-casdoor.com/api/mcp \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

**Using client credentials** (for service accounts):

```bash
curl -X POST https://your-casdoor.com/api/mcp \
  -u "CLIENT_ID:CLIENT_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

Unauthenticated requests receive a JSON-RPC error response:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32001,
    "message": "Unauthorized",
    "data": "Unauthorized operation"
  }
}
```

## Available Tools

To discover available tools, call the `tools/list` method:

```json
POST /api/mcp
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/list"
}
```

The server returns tool definitions with input schemas:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "tools": [
      {
        "name": "get_applications",
        "description": "Get all applications for a specific owner",
        "inputSchema": {
          "type": "object",
          "properties": {
            "owner": {
              "type": "string",
              "description": "The owner of applications"
            }
          },
          "required": ["owner"]
        }
      }
    ]
  }
}
```

### Application Management Tools

The MCP server currently provides these application management tools:

**get_applications** - Retrieve all applications for an organization:

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "get_applications",
    "arguments": {
      "owner": "my-org"
    }
  }
}
```

**get_application** - Get details of a specific application:

```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "tools/call",
  "params": {
    "name": "get_application",
    "arguments": {
      "id": "my-org/my-app"
    }
  }
}
```

**add_application** - Create a new application:

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "method": "tools/call",
  "params": {
    "name": "add_application",
    "arguments": {
      "application": {
        "owner": "my-org",
        "name": "new-app",
        "displayName": "New Application",
        "organization": "my-org"
      }
    }
  }
}
```

**update_application** - Modify an existing application:

```json
{
  "jsonrpc": "2.0",
  "id": 6,
  "method": "tools/call",
  "params": {
    "name": "update_application",
    "arguments": {
      "id": "my-org/my-app",
      "application": {
        "owner": "my-org",
        "name": "my-app",
        "displayName": "Updated Name"
      }
    }
  }
}
```

**delete_application** - Remove an application:

```json
{
  "jsonrpc": "2.0",
  "id": 7,
  "method": "tools/call",
  "params": {
    "name": "delete_application",
    "arguments": {
      "application": {
        "owner": "my-org",
        "name": "old-app"
      }
    }
  }
}
```

## Response Format

Tool calls return results in a structured format:

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "[{\"name\":\"app1\",\"displayName\":\"App 1\"}]"
      }
    ]
  }
}
```

When errors occur during tool execution, the response includes an `isError` flag:

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "application quota is exceeded"
      }
    ],
    "isError": true
  }
}
```

## Permission Model

The MCP server follows Casdoor's standard permission model. When you authenticate with client credentials, you operate with the privileges of that application's organization admin. Access tokens provide the permissions of the authenticated user.

Some operations have specific requirements. Creating applications checks against your organization's application quota. IP whitelist validation runs for applications with restricted access. Demo mode applies additional constraints to prevent modifications to the demonstration instance.

## Integration Example

Here's a complete example showing how to connect to Casdoor's MCP server and create an application:

```python
import requests
import json

# Server configuration
server_url = "https://your-casdoor.com/api/mcp"
client_id = "your-client-id"
client_secret = "your-client-secret"

# Create a session with authentication
session = requests.Session()
session.auth = (client_id, client_secret)
session.headers.update({"Content-Type": "application/json"})

# Initialize the connection
init_request = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
        "protocolVersion": "2024-11-05",
        "capabilities": {},
        "clientInfo": {"name": "python-client", "version": "1.0.0"}
    }
}
response = session.post(server_url, json=init_request)
print("Initialize:", response.json())

# Send initialized notification
notify_request = {
    "jsonrpc": "2.0",
    "method": "notifications/initialized"
}
session.post(server_url, json=notify_request)

# List available tools
list_tools_request = {
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/list"
}
response = session.post(server_url, json=list_tools_request)
print("Tools:", response.json())

# Create a new application
create_app_request = {
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/call",
    "params": {
        "name": "add_application",
        "arguments": {
            "application": {
                "owner": "my-org",
                "name": "automated-app",
                "displayName": "Automated Application",
                "organization": "my-org"
            }
        }
    }
}
response = session.post(server_url, json=create_app_request)
print("Create application:", response.json())
```

## Error Handling

The MCP server returns standard JSON-RPC 2.0 error codes:

- **-32700**: Parse error - Invalid JSON
- **-32600**: Invalid Request - Missing required fields
- **-32601**: Method not found - Unknown method name
- **-32602**: Invalid params - Malformed parameters
- **-32001**: Unauthorized - Authentication failed

Invalid JSON triggers a parse error:

```json
{
  "jsonrpc": "2.0",
  "id": null,
  "error": {
    "code": -32700,
    "message": "Parse error",
    "data": "unexpected character at position 12"
  }
}
```

Unknown methods return method not found:

```json
{
  "jsonrpc": "2.0",
  "id": 8,
  "error": {
    "code": -32601,
    "message": "Method not found",
    "data": "Method 'unknown_method' not found"
  }
}
```

## Additional Features

The MCP server implements the full JSON-RPC 2.0 specification including notifications (requests without an `id` field) and batch requests. The `ping` method provides a simple health check:

```json
{
  "jsonrpc": "2.0",
  "id": 9,
  "method": "ping"
}
```

When running in demo mode, the server restricts write operations to protect the demonstration instance while allowing all read operations and authentication flows.
