---
title: Define custom scopes
sidebar_label: Custom scopes
description: Define your own OAuth 2.0 scopes on an Agent application, such as an MCP server, so that clients request only the permissions that they need.
keywords: [scopes, OAuth, OIDC, agent, MCP, permissions]
authors: [hsluoyz]
---

This guide explains how to define custom scopes on an application. A custom scope names one permission or capability of your service. Clients request the scopes that they need, and your service checks the scopes of the token.

---

#### Learning outcomes

- Add custom scopes to an application.
- Know how Casdoor validates the scopes that a client requests.
- Request several scopes with a pattern.

#### What you need

- An [application](/docs/application/overview) with the [category](/docs/application/categories) `Agent`

---

## About custom scopes

Custom scopes are available on applications with the category `Agent`. Typical uses are:

- An MCP server that defines a permission for each kind of resource
- An API that controls access to single endpoints or features
- A service with a fine-grained authorization model

Custom scopes extend the standard OpenID Connect (OIDC) scopes and don't replace them. The standard scopes stay available on every application. Casdoor lists the custom scopes in the discovery document of the application, at `/.well-known/openid-configuration`.

## Add scopes {#adding-scopes}

1. In the Casdoor admin console, open the edit page of the application.
1. Check that **Category** is `Agent`.
1. In **Scopes**, click **Add** and fill in the row:

   | Column | Description | Example |
   |---|---|---|
   | Name | Identifier of the scope in OAuth 2.0 requests | `files:read` |
   | Display name | Name shown to the user on the consent screen | Read files |
   | Description | What the scope allows | Allow reading your files |

1. To change the order of the scopes, use the arrows. To remove a scope, delete its row.
1. Save the application. The scopes are available at once.

For example, an MCP server that manages files and databases could define:

| Name | Display Name | Description |
|------|--------------|-------------|
| `files:read` | Read Files | View and download files from your storage |
| `files:write` | Write Files | Create, modify, and delete files in your storage |
| `db:query` | Query Database | Execute read-only database queries |
| `db:modify` | Modify Database | Create, update, and delete database records |

A client then requests only the scopes for the operations that it performs.

## How Casdoor validates scopes {#scope-enforcement}

| Application | Validation of the `scope` parameter in a token request |
|---|---|
| Has no custom scopes | Casdoor accepts any value |
| Has at least one custom scope | Casdoor accepts only the scopes in the list |

When a client requests a scope that isn't in the list, Casdoor returns the error `invalid_scope`, as RFC 6749 defines:

```json
{
  "error": "invalid_scope",
  "error_description": "the requested scope is invalid, unknown, or malformed"
}
```

## Request scopes with a pattern {#regex-and-wildcard-scopes}

A client can request several scopes at once with a regular expression. Casdoor treats a requested scope as a pattern when it contains one of the following characters: `.`, `*`, `+`, `?`, `^`, `$`, `{`, `}`, `(`, `)`, `|`, `[`, `]`, `\`.

Casdoor matches the pattern against the names of all custom scopes of the application and grants every scope that matches. A requested scope without these characters must match a name exactly.

For example, an application defines `files:read`, `files:write`, and `db:query`. A client that requests `scope=files:.*` receives `files:read` and `files:write`.

If a pattern matches no scope, Casdoor rejects the request with `invalid_scope`.

## See also

- [Application categories](/docs/application/categories)
- [MCP authorization and scopes](/docs/how-to-connect/mcp/authorization)
- [OAuth 2.0](/docs/how-to-connect/oauth)
