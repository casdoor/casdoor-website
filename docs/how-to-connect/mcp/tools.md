---
title: MCP tools reference
description: The tools of the Casdoor MCP server for managing applications and users, how to list and call them, and the format of the results.
keywords: [MCP, tools, API, application management]
authors: [hsluoyz]
---

The Casdoor MCP server offers tools that manage Casdoor objects. This page describes how to list the tools, how to call them, and what they return.

## List the tools {#list-tools}

Call `tools/list`:

```json
POST /api/mcp
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/list"
}
```

Which tools the response contains depends on how the request is authenticated:

| Authentication | Tools in the response |
|---|---|
| None | All tools, so that clients can discover them. Calling a tool still requires authentication |
| Session cookie | All tools |
| Access token | The tools that the scopes of the token allow |

Each tool comes with a description and an input schema:

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

## Application tools {#application-management-tools}

| Tool | Description |
|---|---|
| `get_applications` | Gets all applications of an organization |
| `get_application` | Gets one application |
| `add_application` | Creates an application |
| `update_application` | Changes an application |
| `delete_application` | Deletes an application |

Call a tool with `tools/call`, the name of the tool, and its arguments.

`get_applications`:

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

`get_application`:

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

`add_application`:

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

`update_application`:

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

`delete_application`:

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

## User tools {#user-management-tools}

The user tools work like the application tools.

| Tool | Arguments | Description |
|---|---|---|
| `get_users` | `owner` | Lists all users of an organization |
| `get_user` | `id`, or `owner` and `email`, or `owner` and `phone` | Gets one user |
| `add_user` | `user` object | Creates a user |
| `update_user` | `id` and `user` object | Changes a user |
| `delete_user` | `user` object | Deletes a user |

## Migration tools {#migration-tools}

The migration tools run a [migration](/docs/migration/overview) from another identity system, such as Auth0, through an import action installed from the Marketplace. Use them instead of adding the users, groups, roles and applications of the other system one by one: a migration keeps the user IDs, password hashes, client IDs and client secrets, and can be undone.

| Tool | Arguments | Description |
|---|---|---|
| `get_migrations` | `organization` | Lists the migrations of an organization and the import actions installed in it |
| `get_migration` | `organization`, `name` | Gets the settings, state and report of a migration |
| `plan_migration` | `organization`, and optionally `name`, `action`, `host`, `clientId`, `clientSecret` and `metadata` | Creates or updates a migration and previews it. Nothing is changed |
| `apply_migration` | `organization`, `name` | Adds the objects that the preview found. Works only after a successful preview |
| `undo_migration` | `organization`, `name` | Deletes every object that the migration added |

`plan_migration`, `apply_migration` and `undo_migration` wait up to 50 seconds for the run and return the report as a table. A longer run goes on in the background: call `get_migration` to see its result. Actions that read export files, such as Keycloak Migration, need the files uploaded on the migration page of the admin console, so run them there.

The migration tools are in every edition. An organization admin can use them in their own organization.

## Other tools

With a commercial or enterprise license, the server also has tools for organizations, providers, roles, permissions, groups, certs and tokens, tools that set up an application for an app and connect third-party sign-in, a dry run of every change, a record of what agents changed, and approval and rollback of the changes. See [Let AI agents manage Casdoor](/docs/how-to-connect/mcp/manage-with-agents). For the scope that each tool requires, see the [scope reference](/docs/how-to-connect/mcp/authorization#complete-scope-reference).

## Result format {#response-format}

A successful call returns the result as content:

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

When the tool fails, the result has the `isError` flag:

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

Errors of the protocol itself, such as a missing scope, are JSON-RPC errors. See [MCP error handling](/docs/how-to-connect/mcp/error-handling).

## See also

- [MCP authorization and scopes](/docs/how-to-connect/mcp/authorization)
- [MCP integration example](/docs/how-to-connect/mcp/integration)
