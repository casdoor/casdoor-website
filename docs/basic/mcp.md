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

## Discovering Casdoor's OAuth Configuration

Casdoor implements [RFC 9728](https://datatracker.ietf.org/doc/html/rfc9728) OAuth 2.0 Protected Resource Metadata, enabling MCP clients to automatically discover authentication requirements. Query the well-known endpoint to retrieve Casdoor's authorization server details:

```bash
curl https://your-casdoor.com/.well-known/oauth-protected-resource
```

The response indicates which OAuth authorization server protects the MCP resource:

```json
{
  "resource": "https://your-casdoor.com",
  "authorization_servers": ["https://your-casdoor.com"],
  "bearer_methods_supported": ["header"],
  "scopes_supported": ["openid", "profile", "email"]
}
```

For application-specific discovery, append the application name:

```bash
curl https://your-casdoor.com/.well-known/my-app/oauth-protected-resource
```

This returns metadata scoped to that specific application, useful when different applications have different authorization requirements.

## Authentication

MCP requests require authentication using any of the methods described in the [Public API authentication](/docs/basic/public-api) documentation. The authentication method you choose affects which tools you can access.

**Using an access token with scopes** (recommended for automation):

```bash
curl -X POST https://your-casdoor.com/api/mcp \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

Access tokens enforce scope-based authorization. The tools you can use depend on the scopes granted when the token was issued. This approach lets you create tokens with limited permissions for specific tasks.

**Using client credentials** (for service accounts):

```bash
curl -X POST https://your-casdoor.com/api/mcp \
  -u "CLIENT_ID:CLIENT_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

**Using session authentication** (for interactive use):

Session-based authentication through browser cookies grants access to all tools without scope restrictions. This method is intended for interactive use and maintains compatibility with existing workflows.

Unauthenticated requests receive a JSON-RPC error response with a `WWW-Authenticate` header pointing to the OAuth protected resource metadata:

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

The response includes a `WWW-Authenticate: Bearer realm="/.well-known/oauth-protected-resource"` header, allowing compliant OAuth clients to automatically discover the authorization server configuration.

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

The tools returned depend on your authentication. Without credentials, you see all available tools for discovery purposes. With session authentication, you get the complete list. When using a scoped OAuth token, the response includes only tools your scopes permit.

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

The MCP server enforces fine-grained authorization through OAuth scopes. When you authenticate with an access token, the tools you can access depend on the scopes included in that token. This allows you to create tokens with limited permissions for specific automation tasks, following the principle of least privilege.

Session-based authentication (using cookies) bypasses scope checking and grants full access to all tools. This maintains backward compatibility with existing integrations while encouraging the adoption of scope-based authorization for better security.

### Scope-Based Tool Access

Each MCP tool requires a specific OAuth scope. For application management tools, the mapping is straightforward:

- `read:application` grants access to `get_applications` and `get_application`
- `write:application` grants access to `add_application`, `update_application`, and `delete_application`

When you request a token from Casdoor, include the scopes you need in your authorization request. The MCP server filters available tools based on these granted scopes, ensuring that automated processes can only perform actions they're explicitly authorized for.

If you call `tools/list` with a scoped token, the response only includes tools your token can access. Unauthenticated requests still receive the full tool list to enable discovery, but any attempt to actually call a tool without proper authentication will fail.

### Scope Validation Errors

When you try to use a tool without the required scope, the server responds with an `insufficient_scope` error:

```json
{
  "jsonrpc": "2.0",
  "id": 10,
  "error": {
    "code": -32001,
    "message": "insufficient_scope",
    "data": {
      "tool": "add_application",
      "granted_scopes": ["read:application"],
      "required_scope": "write:application"
    }
  }
}
```

This error tells you exactly which scope you need to request a new token with the appropriate permissions. The `granted_scopes` field shows what your current token has, and `required_scope` indicates what's needed for the operation.

### Creating Scoped Tokens

When obtaining an OAuth token for MCP access, specify the scopes in your authorization request. For example, to get a token that can only read applications but not modify them:

```bash
curl -X POST https://your-casdoor.com/api/login/oauth/access_token \
  -d "grant_type=client_credentials" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "scope=read:application"
```

For automation that needs to create and update applications, request the write scope:

```bash
curl -X POST https://your-casdoor.com/api/login/oauth/access_token \
  -d "grant_type=client_credentials" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "scope=write:application"
```

You can request multiple scopes by separating them with spaces: `scope=read:application write:application` (or `scope=read:application%20write:application` when URL-encoded). The token will then have access to all tools covered by those scopes.

Some operations have additional requirements beyond scope authorization. Creating applications checks against your organization's application quota. IP whitelist validation runs for applications with restricted access. Demo mode applies additional constraints to prevent modifications to the demonstration instance.

## Integration Example

Here's a complete example showing how to connect to Casdoor's MCP server with scoped authorization:

```python
import requests
import json

# Server configuration
server_url = "https://your-casdoor.com/api/mcp"
token_url = "https://your-casdoor.com/api/login/oauth/access_token"
client_id = "your-client-id"
client_secret = "your-client-secret"

# Get a scoped token for application management
token_response = requests.post(token_url, data={
    "grant_type": "client_credentials",
    "client_id": client_id,
    "client_secret": client_secret,
    "scope": "read:application write:application"
})
access_token = token_response.json()["access_token"]

# Create a session with the token
session = requests.Session()
session.headers.update({
    "Authorization": f"Bearer {access_token}",
    "Content-Type": "application/json"
})

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

# List available tools (filtered by scopes)
list_tools_request = {
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/list"
}
response = session.post(server_url, json=list_tools_request)
print("Available tools:", response.json())

# Create a new application (requires write:application scope)
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
result = response.json()

if "error" in result:
    error = result["error"]
    if error["code"] == -32001 and error.get("message") == "insufficient_scope":
        # Handle insufficient scope error
        error_data = error.get("data", {})
        print(f"Need scope: {error_data.get('required_scope', 'unknown')}")
        print(f"Have scopes: {error_data.get('granted_scopes', [])}")
    else:
        print(f"Error: {error['message']}")
else:
    print("Created application:", result)
```

This example demonstrates obtaining a scoped token, using it to authenticate with the MCP server, and handling potential scope-related errors. The token includes both read and write scopes, allowing full application management.

## Error Handling

The MCP server returns standard JSON-RPC 2.0 error codes:

- **-32700**: Parse error - Invalid JSON
- **-32600**: Invalid Request - Missing required fields
- **-32601**: Method not found - Unknown method name
- **-32602**: Invalid params - Malformed parameters
- **-32001**: Unauthorized or Insufficient scope

The `-32001` error code covers both authentication failures and authorization issues. When you lack the required scope for a tool, the error includes details about what scope you need:

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "error": {
    "code": -32001,
    "message": "insufficient_scope",
    "data": {
      "tool": "add_application",
      "granted_scopes": ["read:application"],
      "required_scope": "write:application"
    }
  }
}
```

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
