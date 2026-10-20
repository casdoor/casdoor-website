---
title: MCP authorization and scopes
description: The OAuth 2.0 scopes that control which tools of the Casdoor MCP server a token can call, how to request them, and how to define scopes for your own MCP server.
keywords: [MCP, OAuth, scopes, authorization, permissions]
authors: [hsluoyz]
---

The Casdoor MCP server authorizes tool calls by OAuth 2.0 scopes. A request that is authenticated with an access token can call only the tools that the scopes of the token allow. This lets you issue tokens with the least privilege that a task needs.

A request that is authenticated with a session cookie isn't checked against scopes and can call all tools.

## How scopes control tools {#scope-based-tool-access}

Each tool requires one scope. A scope has the form `resource:action`: the resource is the kind of object, and the action is `read` or `write`. For example:

- `application:read` allows `get_applications` and `get_application`.
- `application:write` allows `add_application`, `update_application`, and `delete_application`.

`tools/list` with a token returns only the tools that the token can call. A request without credentials still receives the full list for discovery, but can't call any tool.

Some tools have requirements beyond the scope:

- Creating an application counts against the application quota of the organization.
- Applications with an IP allowlist are subject to that check.
- In demo mode, Casdoor rejects write operations.

## Scope reference {#complete-scope-reference}

### Application scopes

| Scope | Mapped Tools | Description |
|-------|-------------|-------------|
| `application:read` | `get_applications`, `get_application` | View application configurations and settings |
| `application:write` | `add_application`, `update_application`, `delete_application` | Create, modify, and delete applications |

### User scopes

| Scope | Mapped Tools | Description |
|-------|-------------|-------------|
| `user:read` | `get_users`, `get_user` | View user profiles and information |
| `user:write` | `add_user`, `update_user`, `delete_user` | Create, modify, and delete user accounts |

### Organization scopes

| Scope | Mapped Tools | Description |
|-------|-------------|-------------|
| `organization:read` | `get_organizations`, `get_organization` | View organization details and settings |
| `organization:write` | `add_organization`, `update_organization`, `delete_organization` | Create, modify, and delete organizations |

### Role scopes

| Scope | Mapped Tools | Description |
|-------|-------------|-------------|
| `role:read` | `get_roles`, `get_role` | View role definitions and assignments |
| `role:write` | `add_role`, `update_role`, `delete_role` | Create, modify, and delete roles |

### Permission scopes

| Scope | Mapped Tools | Description |
|-------|-------------|-------------|
| `permission:read` | `get_permissions`, `get_permission` | View permission configurations |
| `permission:write` | `add_permission`, `update_permission`, `delete_permission` | Create, modify, and delete permissions |

### Provider scopes

| Scope | Mapped Tools | Description |
|-------|-------------|-------------|
| `provider:read` | `get_providers`, `get_provider` | View OAuth, SMS, email, and other provider configurations |
| `provider:write` | `add_provider`, `update_provider`, `delete_provider` | Create, modify, and delete provider integrations |

### Token scopes

| Scope | Mapped Tools | Description |
|-------|-------------|-------------|
| `token:read` | `get_tokens`, `get_token` | View access tokens and their metadata |
| `token:write` | `delete_token` | Delete access tokens |

### Alias scopes

Three aliases stand for groups of scopes:

| Alias | Stands for |
|---|---|
| `read` | Every `:read` scope |
| `write` | Every `:write` scope |
| `admin` | Every `:read` and `:write` scope |

## Request a token with scopes {#creating-scoped-tokens}

Name the scopes in the token request. For a token that can read applications but can't change them:

```bash
curl -X POST https://your-casdoor.com/api/login/oauth/access_token \
  -d "grant_type=client_credentials" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "scope=application:read"
```

For a token that can also create and change applications:

```bash
curl -X POST https://your-casdoor.com/api/login/oauth/access_token \
  -d "grant_type=client_credentials" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "scope=application:write"
```

Separate several scopes with spaces: `scope=application:read application:write`. In a URL, encode the space as `%20`.

### Clients identified by a metadata document URL {#client-id-metadata-documents}

MCP clients often have no client ID of Casdoor. Such a client either registers itself through [dynamic client registration](/docs/application/dynamic-client-registration), or uses a client ID metadata document: its `client_id` is an `https` URL that points to a JSON document that describes the client, such as its name and its redirect URIs.

Casdoor accepts these client IDs when **Enable dynamic client registration** is on for the `built-in` organization. The discovery document then has `"client_id_metadata_document_supported": true`. Otherwise, the authorization request fails with `client ID metadata documents are not accepted, enable dynamic client registration of the organization: built-in first`.

At the first authorization request, Casdoor fetches the document and creates an application for the client in the `built-in` organization. The client is a public client: it uses PKCE and has no client secret. For the requirements on the document and the application that Casdoor creates, see [Dynamic client registration](/docs/application/dynamic-client-registration).

## Missing scopes {#scope-validation-errors}

When a token calls a tool without the required scope, Casdoor returns the error `insufficient_scope`:

```json
{
  "jsonrpc": "2.0",
  "id": 10,
  "error": {
    "code": -32001,
    "message": "insufficient_scope",
    "data": {
      "tool": "add_application",
      "granted_scopes": ["application:read"],
      "required_scope": "application:write"
    }
  }
}
```

`required_scope` is the scope that the tool needs, and `granted_scopes` are the scopes of your token. Request a new token that includes the required scope.

## Define scopes for your own MCP server {#custom-scopes-for-third-party-mcp-servers}

When Casdoor is the OAuth 2.0 provider of an MCP server that you build, define scopes that match the capabilities of your server.

1. In the Casdoor admin console, open the edit page of the application and set **Category** to `Agent`.
1. Add your scopes to the application, each with a name, a display name, and a description. See [Custom scopes](/docs/application/scopes).
1. In your MCP server, read the granted scopes from the `scope` claim of the access token and check them before you run a tool.

The scopes appear in the discovery document of the application and on the consent screen.

For example, a file management server could define:

| Name | Display Name | Description |
|------|--------------|-------------|
| `files:read` | Read Files | View and download files from storage |
| `files:write` | Write Files | Create, modify, and delete files |
| `metadata:read` | Read Metadata | View file metadata and properties |

## Consent screen {#consent-screen-configuration}

When a user authorizes an MCP client, Casdoor asks for consent if both of the following conditions hold:

- The application defines custom scopes.
- The client requests at least one of them, and the user hasn't granted or declined it for the application before.

The consent screen lists the requested scopes with their display names and descriptions, each with a checkbox. All scopes are selected at first, and the user can clear the ones they don't want to grant. `openid` and requested scopes that aren't custom scopes of the application are always granted, so their checkboxes can't be cleared. At least one scope must stay selected before the user can click **Allow**.

The authorization code and the tokens carry only the scopes that the user granted. The `scope` field of the token response, the `scope` claim of the access token, and the introspection response all show the granted scopes, so your client should read them instead of assuming that it received every scope it requested.

Casdoor remembers the scopes that the user granted and the scopes that the user declined, and doesn't ask again when a client requests the same scopes. A later request then receives only the granted scopes. When a client requests a custom scope that the user hasn't answered yet, Casdoor shows the consent screen again: the new scopes are marked **New**, and the scopes that the user answered before keep the earlier choice. Users and administrators can see and revoke grants on the **Consents** page. Casdoor asks again for a revoked scope.

Casdoor doesn't show a consent screen for applications without custom scopes.

## Add fine-grained rules with Casbin {#fine-grained-authorization-with-casbin}

Scopes answer the question of which tools a client may call. For rules that depend on the user or the object, use the [permissions](/docs/permission/overview) of Casdoor, which are built on Casbin. A Casbin policy can decide by:

- Attributes of the user, such as the organization, the role, or the department
- Properties of the object, such as its owner
- The environment, such as the time or the IP address
- Relationships, such as "the user owns the object"

To use Casbin with your MCP server:

1. Define a Casbin model in Casdoor that describes your rules.
1. Create a permission that connects your application to the model.
1. Add policies that map users and roles to actions.
1. In your MCP server, check the permission after you have checked the scope.

A request must pass both checks.

## See also

- [MCP tools reference](/docs/how-to-connect/mcp/tools)
- [Custom scopes](/docs/application/scopes)
- [Permissions](/docs/permission/overview)
