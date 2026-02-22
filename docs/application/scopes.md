---
title: Custom scopes
description: Define custom OAuth scopes for Agent applications (e.g. MCP servers).
keywords: [scopes, OAuth, OIDC, agent, MCP, permissions]
authors: [hsluoyz]
---

**Custom scopes** let Agent applications define permissions or capabilities exposed via OAuth. They are added to the app’s OIDC discovery and used alongside standard OIDC scopes.

## When to use custom scopes

Available for applications with category **Agent**. Useful for:

- MCP servers that need to define granular permissions for different resources
- API services that want to control access to specific endpoints or features
- Applications implementing fine-grained authorization models

Default (non-Agent) applications use only standard OIDC scopes and do not need custom scopes.

## Configuring scopes

On the application edit page, add scopes. Each has:

- **Name** — Scope identifier in OAuth (e.g. `files:read`, `messages:write`).
- **Display name** — Shown to the user during consent (e.g. “Read files”).
- **Description** — What the scope allows (e.g. “Allow reading your files”).

## How scopes work

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
