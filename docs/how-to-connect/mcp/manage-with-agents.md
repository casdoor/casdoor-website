---
title: Let AI agents manage Casdoor
sidebar_label: Let agents manage Casdoor
description: Let an AI agent such as Claude Code or Cursor create applications, connect GitHub and Google sign-in, find why users can't sign in and change providers, roles and permissions through the Casdoor MCP server, with dry runs, change records, approval and rollback.
keywords: [MCP, AI agent, Claude Code, Cursor, create application, management tools, rollback, approval]
authors: [hsluoyz]
---

An AI agent that is connected to the [Casdoor MCP server](/docs/how-to-connect/mcp/overview) can manage Casdoor for you. Ask it in plain words, for example "create a Casdoor application for my Go service on port 8080 and add the sign-in code", and the agent calls the tools of the server.

The agent acts as the user who signed in when it connected, and can do only what that user may do in the console. An admin of an organization manages only that organization.

## What each edition offers

| Feature | Community | Commercial | Enterprise |
|---|:---:|:---:|:---:|
| [Application and user tools](/docs/how-to-connect/mcp/tools#application-management-tools) | ✓ | ✓ | ✓ |
| Tools for organizations, providers, roles, permissions, groups, certs and tokens |  | ✓ | ✓ |
| [`setup_application`, `get_integration_guide`, `add_login_provider`, `diagnose_login`](#set-up-an-app) |  | ✓ | ✓ |
| [Dry run](#preview-a-change) of every change |  | ✓ | ✓ |
| `update_*` tools that change only the fields given |  | ✓ | ✓ |
| [Record of what agents changed](#what-agents-changed) |  | ✓ | ✓ |
| [Approval of agent changes](#approve-agent-changes) |  |  | ✓ |
| [Rollback of agent changes](#roll-back-a-change) |  |  | ✓ |

Without a license, `tools/list` shows only the application and user tools, and calling another tool returns a message that it needs the commercial edition. See [pricing](https://www.casdoor.com/pricing/self-hosted).

## Connect the agent

Add `https://<your-casdoor>/api/mcp` to the agent as a remote MCP server, for example in Claude Code:

```shell
claude mcp add --transport http casdoor https://door.example.com/api/mcp
```

The agent opens the Casdoor sign-in page. Sign in as an admin and grant the `read` and `write` scopes. For an admin of one organization, use `https://<your-casdoor>/api/mcp/orgs/<organization>` and allow [dynamic client registration](/docs/application/dynamic-client-registration) in that organization. Other agents: [Claude Desktop](/docs/how-to-connect/mcp/connect-claude-desktop), [Cursor](/docs/how-to-connect/mcp/connect-cursor), [VS Code](/docs/how-to-connect/mcp/connect-vscode), [ChatGPT](/docs/how-to-connect/mcp/connect-chatgpt).

## Set up an app

| Tool | What it does |
|---|---|
| `setup_application` | Creates an application with the defaults of the console's **Add** button and the redirect URL of the app's framework, and returns the client ID, client secret, certificate, install command, settings and code to add sign-in. When the organization has an Email provider, the application uses it for the sign-up verification code; otherwise sign-up doesn't verify email addresses, and the result says so |
| `get_integration_guide` | Returns the same for an existing application |
| `add_login_provider` | Adds an OAuth provider (GitHub, Google, GitLab, Gitee, Facebook, LinkedIn, DingTalk, Lark, WeChat, QQ or Weibo) with the client ID and secret from the third party, or reuses an existing provider of the organization, puts it on the application's sign-in page and returns the callback URL to register at the third party. Needs the `provider:write` and `application:write` scopes |
| `diagnose_login` | Checks the application's redirect URLs, grant types, sign-in methods, cert, providers and sign-up items, and summarizes the failed requests of the last day that concern the application, each with how to fix it |

The frameworks of `setup_application` and `get_integration_guide` are `react` (any single-page app, with casdoor-js-sdk and PKCE), `nextjs`, `nodejs`, `go`, `python`, `spring-boot`, `dotnet` and `oidc` (any OpenID Connect library).

```json
{
  "jsonrpc": "2.0",
  "id": 8,
  "method": "tools/call",
  "params": {
    "name": "setup_application",
    "arguments": {
      "organization": "my-org",
      "name": "shop-web",
      "framework": "go",
      "homepageUrl": "http://localhost:8080"
    }
  }
}
```

The result starts with:

```text
Created the application.

Application: admin/shop-web (organization my-org)
Casdoor: https://door.example.com
Client ID: 78c3f665fdfcbb608be1
Client secret: c8e84de90c776f32aac0...
Redirect URLs: http://localhost:8080/callback
```

followed by the code for the framework, the certificate to save as `casdoor.pem`, and the changes the call made.

## Manage other objects

| Object | Tools | Scopes |
|---|---|---|
| Organization | `get_organizations`, `get_organization`, `add_organization`, `update_organization`, `delete_organization` | `organization:read`, `organization:write` |
| Provider | `get_providers`, `get_provider`, `add_provider`, `update_provider`, `delete_provider` | `provider:read`, `provider:write` |
| Role | `get_roles`, `get_role`, `add_role`, `update_role`, `delete_role` | `role:read`, `role:write` |
| Permission | `get_permissions`, `get_permission`, `add_permission`, `update_permission`, `delete_permission` | `permission:read`, `permission:write` |
| Group | `get_groups`, `get_group`, `add_group`, `update_group`, `delete_group` | `group:read`, `group:write` |
| Cert | `get_certs`, `get_cert`, `add_cert`, `update_cert`, `delete_cert` | `cert:read`, `cert:write` |
| Token | `get_tokens`, `get_token`, `delete_token` | `token:read`, `token:write` |

- The `get_<objects>` tools take `organization`, `page` and `pageSize`, and list the main fields of each object.
- `get_<object>` and `delete_<object>` take the object's `id` (`<owner>/<name>`).
- `add_<object>` takes the whole object, as in the REST API.
- `update_<object>` takes `id` and `fields`, and changes only those fields. A field the object doesn't have is refused, so a typo doesn't go unnoticed. With a commercial license, `update_application` and `update_user` also keep the fields that the call leaves out.

Every tool call is made as a request to the same REST API that the console uses, for the signed-in user. The same permission checks, validation and edition limits apply, and an admin of one organization can't read or change another organization's objects. The tools mask secrets, such as client secrets and private keys, as `***`; an update that leaves `***` keeps the old value.

## Preview a change

Every tool that changes something takes `"dryRun": true`. The call then changes nothing and lists what it would do:

```text
Dry run, nothing was changed. The call would:
- update the application admin/shop-web
    displayName: "Shop" -> "Shop Web"
    redirectUris: ["http://localhost:8080/callback"] -> ["http://localhost:8080/callback","https://shop.example.com/callback"]
```

## What agents changed

Every change that an agent makes through the MCP server is kept with the user it acted for, the agent (its OAuth client), the tool, the trace ID and each field before and after. Open **LLM AI** > **Agent changes** in the console. Its **Tool calls** tab lists every call of the server's tools, including the failed and the held ones. The result of a tool call ends with the changes it made and their trace ID, and the call is also in the [records](/docs/organization/records) as `mcp-tool-call`.

## Roll back a change

On **Agent changes**, **Roll back** undoes one change: an added object is deleted, an updated one gets its old fields back and a deleted one is added again. **Roll back the whole call** undoes all the changes of one tool call, the last one first, for example both the provider and the application change of `add_login_provider`. A change that a later change of the same object depends on can't be rolled back until that later change is; the whole call is checked before anything is undone, so it is rolled back completely or not at all. Masked secrets of a deleted object can't be restored.

## Approve agent changes

In the organization's **Compliance** tab, **Approval of agent changes** holds the changes that agents make until an admin of the organization approves them:

| Setting | Held calls |
|---|---|
| No approval | None |
| Deletions need approval | The `delete_*` tools |
| All changes need approval | Every tool that changes something |

A held call returns a link to the approval and the agent tells you to get it approved. An admin approves or rejects it on **LLM AI** > **Tool call approvals**; the user who asked for it can't approve it. Once approved, the same call (the same user, agent, tool and arguments) goes through once within an hour. Dry runs and people working in the console are never held.
