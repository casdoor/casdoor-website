---
title: Casdoor vs. alternatives
description: How Casdoor compares with Keycloak, Authentik, Auth0, and Logto on language, license, protocols, AI agent and MCP support, and operations.
keywords: [Casdoor alternatives, Keycloak alternative, Auth0 alternative, open-source IAM comparison, SSO comparison]
authors: [hsluoyz]
---

People usually find Casdoor while evaluating an identity provider against one or two others. This page gives the short version; each linked page goes into detail and says plainly when the other product is the better choice.

| Compared with | Read this if you… |
|---|---|
| [Keycloak](/docs/comparison/casdoor-vs-keycloak) | want a lighter, UI-first server than a Java stack, or are planning to migrate off Keycloak |
| [Authentik](/docs/comparison/casdoor-vs-authentik) | are choosing a self-hosted IdP for a homelab or a small team |
| [Auth0](/docs/comparison/casdoor-vs-auth0) | want to stop paying per monthly active user, or need to self-host |
| [Logto](/docs/comparison/casdoor-vs-logto) | are building a SaaS product or an AI agent and want modern OIDC with a good developer experience |

## At a glance

The table describes each project as of 2026. Products change quickly; check the other project's documentation before making a decision.

| | Casdoor | Keycloak | Authentik | Auth0 | Logto |
|---|---|---|---|---|---|
| Backend language | Go | Java (Quarkus) | Python and Go | Closed source | TypeScript (Node.js) |
| License | Apache-2.0 | Apache-2.0 | MIT core, paid enterprise features | Proprietary SaaS | MPL-2.0 |
| Self-hosting | Yes | Yes | Yes | No (private cloud on enterprise plans) | Yes |
| Databases | MySQL, MariaDB, PostgreSQL, SQL Server, Oracle, SQLite, TiDB, CockroachDB | PostgreSQL, MySQL, MariaDB, SQL Server, Oracle | PostgreSQL | Managed | PostgreSQL |
| OAuth 2.0 / OIDC | Yes | Yes | Yes | Yes | Yes |
| SAML | IdP and SP | IdP and SP | IdP and SP | IdP and SP | IdP and SP |
| CAS | Built in | Via extension | No | No | No |
| LDAP server | Built in | No (federates to LDAP) | Via outpost | No | No |
| RADIUS server | Built in | No | Via outpost | No | No |
| MCP server and OAuth 2.1 for MCP | Built in | No built-in MCP server | No built-in MCP server | Separate add-on products | OAuth 2.1 for MCP servers |
| Permission model | Casbin (ACL, RBAC, ABAC) | Authorization Services (UMA) | Policies and bindings | RBAC, plus a separate FGA product | RBAC |
| Payments and subscriptions | Built in | No | No | No | No |

## What is specific to Casdoor

- **One Go binary and a React UI.** There is no JVM and no separate worker or cache process to operate; the only dependency is a SQL database.
- **Everything is configured in the web UI.** Sign-in pages, sign-up fields, providers, and themes are edited in the admin console, not in template files. See [UI customization](/docs/application/ui-customization).
- **Built for AI agents.** Casdoor exposes its own management API as an [MCP server](/docs/how-to-connect/mcp/overview) and acts as an [OAuth 2.1 authorization server for third-party MCP servers](/docs/mcp-auth/overview), including Dynamic Client Registration, PKCE, and resource indicators.
- **Wide protocol coverage.** OAuth 2.0, OIDC, SAML, [CAS](/docs/how-to-connect/cas), [LDAP](/docs/ldap/overview), [RADIUS](/docs/radius/overview), [SCIM](/docs/scim/overview), [WebAuthn](/docs/how-to-connect/webauthn), and Kerberos are served by the same process.
- **Many sign-in providers.** More than 70 [OAuth providers](/docs/provider/oauth/overview) are built in, including WeChat, DingTalk, Lark, and Alipay alongside Google, GitHub, and Microsoft.
- **Migration tools.** [Syncers](/docs/syncer/overview) import users from Keycloak, Okta, Azure AD, Active Directory, Google Workspace, or any SQL database, and keep them in sync during a gradual cutover.

## When Casdoor is not the best fit

- You need a vendor to run identity for you with a contractual SLA and you have no interest in self-hosting. A managed service such as Auth0 removes that work. Casdoor also has a [hosted offering](https://www.casdoor.com) if you want the product without the operations.
- Your organization already has deep Keycloak expertise, custom SPIs, and Red Hat support. Staying is reasonable.
- You need relationship-based authorization at very large scale, in the style of Google Zanzibar. Casdoor's permissions are built on [Casbin](/docs/permission/overview), which runs in-process; a dedicated Zanzibar-style service may fit better.

## Try it

The fastest way to compare is to run Casdoor next to what you have:

```bash
docker run -p 8000:8000 casbin/casdoor-all-in-one
```

Then open `http://localhost:8000` and sign in with `admin` / `123`. See [Try with Docker](/docs/basic/try-with-docker) for details, or use the [online demo](https://door.casdoor.com).
