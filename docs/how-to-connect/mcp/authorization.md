---
title: MCP authorization and scopes
description: Scope-based access control for MCP tools.
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

## Complete Scope Reference

Casdoor's built-in MCP server supports scopes across multiple resource types. Each scope follows the `resource:action` pattern, where `resource` identifies the entity type and `action` specifies the operation level.

### Application Scopes

| Scope | Mapped Tools | Description |
|-------|-------------|-------------|
| `read:application` | `get_applications`, `get_application` | View application configurations and settings |
| `write:application` | `add_application`, `update_application`, `delete_application` | Create, modify, and delete applications |

### User Scopes

| Scope | Mapped Tools | Description |
|-------|-------------|-------------|
| `read:user` | `get_users`, `get_user` | View user profiles and information |
| `write:user` | `add_user`, `update_user`, `delete_user` | Create, modify, and delete user accounts |

### Organization Scopes

| Scope | Mapped Tools | Description |
|-------|-------------|-------------|
| `read:organization` | `get_organizations`, `get_organization` | View organization details and settings |
| `write:organization` | `add_organization`, `update_organization`, `delete_organization` | Create, modify, and delete organizations |

### Role Scopes

| Scope | Mapped Tools | Description |
|-------|-------------|-------------|
| `read:role` | `get_roles`, `get_role` | View role definitions and assignments |
| `write:role` | `add_role`, `update_role`, `delete_role` | Create, modify, and delete roles |

### Permission Scopes

| Scope | Mapped Tools | Description |
|-------|-------------|-------------|
| `read:permission` | `get_permissions`, `get_permission` | View permission configurations |
| `write:permission` | `add_permission`, `update_permission`, `delete_permission` | Create, modify, and delete permissions |

### Provider Scopes

| Scope | Mapped Tools | Description |
|-------|-------------|-------------|
| `read:provider` | `get_providers`, `get_provider` | View OAuth, SMS, email, and other provider configurations |
| `write:provider` | `add_provider`, `update_provider`, `delete_provider` | Create, modify, and delete provider integrations |

### Token Scopes

| Scope | Mapped Tools | Description |
|-------|-------------|-------------|
| `read:token` | `get_tokens`, `get_token` | View access tokens and their metadata |
| `write:token` | `refresh_token`, `revoke_token` | Refresh and revoke access tokens |

## Custom Scopes for Third-Party MCP Servers

When building your own MCP server with Casdoor as the OAuth provider, you can define custom scopes to match your server's capabilities. This allows fine-grained authorization beyond the built-in Casdoor scopes.

To configure custom scopes:

1. Set your application's **Category** to "Agent" in the Casdoor admin panel
2. Add custom scopes in the application configuration with Name, Display Name, and Description
3. Your MCP server validates these scopes from the access token's `scope` claim
4. The scopes appear in the OIDC discovery endpoint and consent screen

See [Custom scopes](/docs/application/scopes) for configuration.

**Example custom scopes for a file management MCP server:**

| Name | Display Name | Description |
|------|--------------|-------------|
| `files:read` | Read Files | View and download files from storage |
| `files:write` | Write Files | Create, modify, and delete files |
| `metadata:read` | Read Metadata | View file metadata and properties |

## Consent Screen Configuration

When users authorize an MCP client, Casdoor displays a consent screen showing the requested scopes. The consent screen uses the **Display Name** and **Description** fields you configure for each scope.

To control when the consent screen appears:

1. Navigate to your application configuration in Casdoor
2. Set the **Consent Policy** field:
   - **Always**: Show consent screen on every authorization request
   - **Once**: Show consent screen only on first authorization
   - **Never**: Skip consent screen (not recommended for third-party clients)

The consent screen lists all requested scopes with their display names and descriptions, allowing users to understand what permissions they're granting before approving the request.

## Fine-Grained Authorization with Casbin

For authorization requirements beyond simple scopes, Casdoor integrates with Casbin to provide fine-grained access control. Casbin policies can enforce complex rules based on:

- User attributes (organization, role, department)
- Resource properties (owner, sensitivity level)
- Environmental factors (time, location, IP address)
- Relationships (user is owner, user is team member)

To use Casbin with your MCP server:

1. Define a Casbin model in Casdoor that describes your authorization rules
2. Create a permission resource linking your application to the Casbin model
3. Configure policies that map users, roles, and scopes to specific actions
4. Your MCP server enforces these policies by checking permissions after validating scopes

Casbin authorization runs in addition to scope validation. A request must pass both scope checking and Casbin policy enforcement to succeed. See [Permissions](/docs/permission/overview) for Casbin integration.
