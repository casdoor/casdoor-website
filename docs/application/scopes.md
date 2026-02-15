---
title: Custom Scopes
description: Configure custom OAuth scopes for Agent applications
keywords: [scopes, oauth, oidc, agent, MCP, permissions]
authors: [copilot]
---

Custom scopes allow Agent applications to define specific permissions or capabilities they expose through OAuth. These scopes work alongside standard OIDC scopes and appear in the application's OIDC discovery endpoint.

## When to Use Custom Scopes

Custom scopes are available for applications with the **Agent** category. They're particularly useful for:

- MCP servers that need to define granular permissions for different resources
- API services that want to control access to specific endpoints or features
- Applications implementing fine-grained authorization models

Default applications use the standard OIDC scopes (`openid`, `email`, `profile`, `address`, `phone`, `offline_access`) and don't need custom scopes.

## Configuring Scopes

For Agent applications, you can add custom scopes from the application edit page. Each scope has three components:

**Name**: The scope identifier used in OAuth flows. Use a descriptive format like `resource:action` (e.g., `files:read`, `messages:write`).

**Display Name**: A human-readable name shown during authorization. Keep it short and clear (e.g., "Read Files", "Send Messages").

**Description**: Explains what the scope allows. This helps users understand what they're granting access to (e.g., "Allow reading your files and documents").

## How Scopes Work

When you configure custom scopes for an Agent application:

1. The scopes are stored with the application configuration
2. They're merged with standard OIDC scopes in the discovery endpoint
3. Client applications can request these scopes during OAuth flows
4. The scopes appear in the OIDC discovery document at `/.well-known/openid-configuration`

Standard OIDC scopes are always available regardless of your custom scopes configuration. Your custom scopes extend rather than replace the defaults.

## Example

Here's a practical example for an MCP server that manages files and databases:

| Name | Display Name | Description |
|------|--------------|-------------|
| `files:read` | Read Files | View and download files from your storage |
| `files:write` | Write Files | Create, modify, and delete files in your storage |
| `db:query` | Query Database | Execute read-only database queries |
| `db:modify` | Modify Database | Create, update, and delete database records |

When clients connect to this MCP server, they can request specific scopes based on what operations they need to perform, following the principle of least privilege.

## Adding Scopes

From the application edit page:

1. Ensure your application Category is set to "Agent"
2. Scroll to the Scopes section
3. Click "Add" to create a new scope
4. Fill in the Name, Display Name, and Description
5. Use the up/down arrows to reorder scopes
6. Click the delete button to remove unwanted scopes
7. Save your application

The scopes are immediately available after saving and will appear in your OIDC discovery endpoint.
