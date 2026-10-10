---
title: Casdoor vs. Keycloak
description: A practical comparison of Casdoor and Keycloak - architecture, protocols, customization, AI agent and MCP support, operations, and how to migrate users from Keycloak.
keywords: [Casdoor vs Keycloak, Keycloak alternative, Keycloak vs Casdoor, open-source SSO, migrate from Keycloak]
authors: [hsluoyz]
---

Keycloak and Casdoor are both open-source, self-hosted identity providers under the Apache-2.0 license. Both speak OAuth 2.0, OpenID Connect, and SAML, and both can sit in front of LDAP or Active Directory. They differ mostly in how they are built and how you operate and customize them.

## Summary

| | Casdoor | Keycloak |
|---|---|---|
| Backend | Go, single binary | Java on Quarkus |
| Admin and login UI | React, configured in the web console | Admin console plus FreeMarker or React-based themes packaged as files |
| Tenancy | Organizations, with applications shared or scoped per organization | Realms, plus Organizations inside a realm |
| Protocols served | OAuth 2.0, OIDC, SAML, CAS, LDAP, RADIUS, SCIM, WebAuthn, Kerberos | OAuth 2.0, OIDC, SAML, WebAuthn, Kerberos; LDAP and AD as user federation |
| Social and enterprise sign-in | More than 70 built-in providers, including WeChat, DingTalk, Lark, Alipay | A smaller built-in set; others through generic OIDC/SAML or community extensions |
| Extending | REST API, webhooks, SDKs in 10+ languages | Java Service Provider Interfaces (SPIs) deployed into the server |
| Authorization | Casbin models (ACL, RBAC, ABAC) | Authorization Services (UMA 2.0, policies) |
| AI agents and MCP | Built-in MCP server; OAuth 2.1 authorization server for MCP | Standard OAuth; no built-in MCP server |
| Governance | Casdoor community, commercial support from Casbin | CNCF project, commercial support from Red Hat |

## Architecture and operations

Keycloak is a Java application built on Quarkus. It is mature and scales well, and it expects JVM tuning, a build step when you change providers or features, and Infinispan caches when you run a cluster.

Casdoor is a Go backend that serves a React frontend. It starts as one process, keeps its state in a SQL database, and supports MySQL, MariaDB, PostgreSQL, SQL Server, Oracle, SQLite, TiDB, and CockroachDB. For a trial you can run the whole thing with one command:

```bash
docker run -p 8000:8000 casbin/casdoor-all-in-one
```

See [Server installation](/docs/basic/server-installation) and [Kubernetes deployment](/docs/deployment/k8s) for production setups.

## Customizing the login experience

In Keycloak, changing the look of the login pages means writing a theme (FreeMarker templates or a React-based theme), packaging it, and deploying it to the server.

In Casdoor, each [application](/docs/application/overview) has its own sign-in and sign-up pages that you edit in the admin console: which fields appear, which providers are offered, the layout, background, and custom CSS or HTML. See [UI customization](/docs/application/ui-customization) and [Sign-up items](/docs/application/signup-items-table). Nothing is redeployed.

If you need behavior the server does not offer, Keycloak's answer is a Java SPI running inside the server. Casdoor's answer is to call its [REST API](/docs/basic/public-api) or react to [webhooks](/docs/webhooks/overview) from your own service, in any language.

## Protocols

Both products cover OAuth 2.0, OIDC, and SAML as an identity provider and as a service provider. The differences are at the edges:

- **CAS**: Casdoor is a [CAS server](/docs/how-to-connect/cas) out of the box. Keycloak needs a community extension.
- **LDAP and RADIUS**: Casdoor can act as an [LDAP server](/docs/ldap/ldapserver) and a [RADIUS server](/docs/radius/overview), so legacy applications, VPNs, and network devices can authenticate against it. Keycloak consumes LDAP directories but does not serve LDAP or RADIUS.
- **Advanced OAuth profiles**: both support the device authorization grant, token exchange, and DPoP. Keycloak also covers UMA 2.0, FAPI, and pushed authorization requests (PAR); if you depend on those, Keycloak is the safer choice.

## AI agents and MCP

Casdoor treats agents as first-class clients:

- Casdoor's management API is available as an [MCP server](/docs/how-to-connect/mcp/overview), so Claude, Cursor, or ChatGPT can manage users and applications with scoped tokens.
- Casdoor is an [OAuth 2.1 authorization server for your own MCP servers](/docs/mcp-auth/overview): authorization server metadata, Dynamic Client Registration, PKCE, and resource indicators are built in.

Keycloak can issue tokens for MCP clients through standard OAuth, and it supports Dynamic Client Registration, but MCP-specific pieces are left to you to assemble.

## Authorization

Keycloak's Authorization Services model resources, scopes, policies, and permissions inside the server and follow UMA 2.0.

Casdoor uses [Casbin](/docs/permission/overview). You choose or write a model (ACL, RBAC, RBAC with domains, ABAC), manage policies in the UI, and can call the same [enforcement API](/docs/permission/exposed-casbin-apis) from your services. If your applications already use Casbin, policies and identity live in one place.

## Migrating from Keycloak

You do not have to switch in one step.

1. **Import users.** The [Keycloak syncer](/docs/syncer/Keycloak) reads Keycloak's database tables and maps users, credentials, and groups into Casdoor.
2. **Run side by side.** Add Keycloak to Casdoor as a [SAML provider](/docs/provider/saml/keycloak) or a custom OIDC provider so existing Keycloak sessions keep working while applications move over.
3. **Move applications one at a time.** Each application only needs a new issuer URL, client ID, and client secret, because both servers speak standard OIDC and SAML.

## When to choose which

Choose **Keycloak** if you need its advanced OAuth profiles, already maintain Java SPIs, or want Red Hat's supported distribution.

Choose **Casdoor** if you want a smaller service to operate, login pages your team can change without a deployment, built-in CAS, LDAP, and RADIUS servers, sign-in providers for the Chinese market, or first-class support for AI agents and MCP.

You can self-host Casdoor for free, or let us run it: [Casdoor Cloud](https://www.casdoor.com/pricing?utm_source=casdoor.ai&utm_medium=docs&utm_content=comparison) gives you a dedicated instance, priced per instance rather than per user.

See also the [comparison overview](/docs/comparison/overview).
