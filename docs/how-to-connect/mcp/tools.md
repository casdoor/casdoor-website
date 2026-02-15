---
title: Tools and API Reference
description: Available MCP tools and their usage
keywords: [MCP, tools, API, application management]
authors: [hsluoyz]
---

## Discovering Available Tools

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

## Application Management Tools

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
