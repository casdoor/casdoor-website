---
title: Casdoor vs. Logto
description: Casdoor and Logto compared - language and license, databases, protocols, multi-tenancy, enterprise directory features, and authentication for AI agents and MCP servers.
keywords: [Casdoor vs Logto, Logto vs Casdoor, Logto alternative, open-source auth, OIDC provider comparison]
authors: [hsluoyz]
---

Logto and Casdoor are both newer open-source identity platforms with a web console, hosted options, and an interest in AI agent authentication. Logto focuses on being developer infrastructure for SaaS products and customer identity. Casdoor covers that ground too and adds the workforce and legacy side: directories, more protocols, and more sign-in providers.

## Summary

| | Casdoor | Logto |
|---|---|---|
| Backend | Go | TypeScript on Node.js |
| License | Apache-2.0 | MPL-2.0 |
| Database | MySQL, MariaDB, PostgreSQL, SQL Server, Oracle, SQLite, and others | PostgreSQL |
| OAuth 2.0, OIDC, SAML | Yes | Yes |
| CAS, LDAP server, RADIUS server, Kerberos | Built in | Not offered |
| Multi-tenancy | Organizations, each with its own users, applications, and theme | Organizations with organization roles |
| Sign-in providers | 70+ OAuth providers, SAML, LDAP, Web3 | Social and enterprise connectors |
| Directory sync | Syncers for Active Directory, Azure AD, Google Workspace, Okta, Keycloak, databases; SCIM | Enterprise SSO connectors |
| Authorization | Casbin models (ACL, RBAC, ABAC) | API resources with RBAC |
| AI agents and MCP | Built-in MCP server; OAuth 2.1 authorization server for MCP | OAuth 2.1 authorization server for MCP |
| Payments | Built in | No |

## Stack and deployment

Logto is a Node.js service that requires PostgreSQL. Casdoor is a Go binary that works with most SQL databases, including SQLite for small installations. Which one is easier depends on what you already run; if your infrastructure standard is MySQL or SQL Server, Casdoor fits without adding another database engine.

```bash
docker run -p 8000:8000 casbin/casdoor-all-in-one
```

## Developer experience

Logto invests heavily in quickstarts and framework SDKs for modern JavaScript stacks, and its console guides you through integrating a new application.

Casdoor provides [SDKs](/docs/how-to-connect/sdk) for Go, Java, Node.js, Python, PHP, .NET, Rust, and more, guides for [Next.js](/docs/how-to-connect/nextjs), [Nuxt](/docs/how-to-connect/nuxt), and [Vue](/docs/how-to-connect/vue-sdk), and works with any [standard OIDC client](/docs/how-to-connect/oidc-client). It also has a long list of [ready-made integrations](/docs/integration/go/grafana) for existing software such as Grafana, GitLab, Jenkins, and Kubernetes.

## Workforce and legacy needs

This is where the two differ most. Casdoor can:

- serve [LDAP](/docs/ldap/ldapserver), [RADIUS](/docs/radius/overview), and [CAS](/docs/how-to-connect/cas) to applications and devices that do not speak OIDC;
- sign users in with [Kerberos](/docs/how-to-connect/kerberos) on domain-joined machines;
- keep users in sync with Active Directory, Azure AD, Google Workspace, Okta, or a database through [syncers](/docs/syncer/overview), and provision through [SCIM](/docs/scim/overview);
- offer WeChat, DingTalk, Lark, and other regional providers on the login page.

If your product only needs customer sign-in over OIDC, none of this matters. If the same system must also serve employees and older internal tools, it does.

## AI agents and MCP

Both projects implement the OAuth 2.1 pieces the Model Context Protocol requires. Casdoor's documentation covers [using Casdoor as the authorization server for your MCP server](/docs/mcp-auth/overview), including Dynamic Client Registration, PKCE, and resource indicators.

Casdoor additionally ships an [MCP server for its own management API](/docs/how-to-connect/mcp/overview), so an assistant such as Claude or Cursor can list and update users or create and configure applications with a scoped token.

## Authorization

Logto models API resources, scopes, and roles. Casdoor uses [Casbin](/docs/permission/overview), which supports plain RBAC and also ACL, RBAC with domains, and ABAC, and exposes the [enforcement API](/docs/permission/exposed-casbin-apis) for your services to call.

## When to choose which

Choose **Logto** if you are a JavaScript team building a new SaaS product on PostgreSQL and want the most guided developer experience.

Choose **Casdoor** if you need more protocols and providers, directory synchronization, a choice of databases, an Apache-2.0 license, or an MCP server for managing identity from an AI assistant.

See also the [comparison overview](/docs/comparison/overview).
