---
title: Authorization and Scopes
description: Scope-based authorization for MCP tools
keywords: [MCP, OAuth, scopes, authorization, permissions]
authors: [hsluoyz]
---

The MCP server enforces fine-grained authorization through OAuth scopes. When you authenticate with an access token, the tools you can access depend on the scopes included in that token. This allows you to create tokens with limited permissions for specific automation tasks, following the principle of least privilege.

Session-based authentication (using cookies) bypasses scope checking and grants full access to all tools. This maintains backward compatibility with existing integrations while encouraging the adoption of scope-based authorization for better security.

## Scope-Based Tool Access

Each MCP tool requires a specific OAuth scope. For application management tools, the mapping is straightforward:

- `read:application` grants access to `get_applications` and `get_application`
- `write:application` grants access to `add_application`, `update_application`, and `delete_application`

When you request a token from Casdoor, include the scopes you need in your authorization request. The MCP server filters available tools based on these granted scopes, ensuring that automated processes can only perform actions they're explicitly authorized for.

If you call `tools/list` with a scoped token, the response only includes tools your token can access. Unauthenticated requests still receive the full tool list to enable discovery, but any attempt to actually call a tool without proper authentication will fail.

## Scope Validation Errors

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

## Creating Scoped Tokens

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
