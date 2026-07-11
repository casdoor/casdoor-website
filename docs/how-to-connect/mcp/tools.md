---
title: MCP tools reference
description: List and call MCP tools (applications and more).
keywords: [MCP, tools, API, application management]
authors: [hsluoyz]
---

## List tools

Call `tools/list` to discover tools:

```json
POST /api/mcp
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/list"
}
```

The response depends on auth: unauthenticated requests see all tools (for discovery); session auth returns the full list; a scoped token returns only tools allowed by that token’s scopes.

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

## User Management Tools

The MCP server also provides user management tools, mirroring the application tools:

- **get_users** — List all users in an organization (argument: `owner`).
- **get_user** — Get one user by `id`, or by `owner` + `email`, or `owner` + `phone`.
- **add_user** — Create a user (argument: `user` object).
- **update_user** — Modify an existing user (arguments: `id` and `user` object).
- **delete_user** — Delete a user (argument: `user` object).

They are called the same way as the application tools — via `tools/call` with the tool `name` and `arguments`. As with the other tools, results are subject to the caller's auth and scopes.

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
