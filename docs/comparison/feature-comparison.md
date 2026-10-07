---
title: Feature comparison
description: Casdoor, Keycloak, ZITADEL, and authentik compared feature by feature - SAML IdP, LDAP server, multi-tenancy, SCIM, forward auth, RADIUS, CAS, Kubernetes, and scaling.
keywords: [Casdoor vs Keycloak vs ZITADEL vs authentik, open-source IAM feature comparison, SAML IdP, LDAP server, SCIM, forward auth, multi-tenancy]
authors: [hsluoyz]
---

This page compares the four most common self-hosted, open-source identity providers feature by feature. Each row was checked against the projects' own documentation in October 2026 (Casdoor v4.17, Keycloak 26.8, ZITADEL v4, authentik 2026.x); the [sources](#sources) are listed at the end. Projects ship new features often, so check the other project's documentation for anything that decides your choice, and [tell us](https://github.com/casdoor/casdoor-website/issues) if a row is out of date.

## Overview

| | Casdoor | Keycloak | ZITADEL | authentik |
|---|---|---|---|---|
| Language | Go, React UI | Java (Quarkus) | Go, TypeScript login UI | Python and Go |
| License | Apache-2.0 | Apache-2.0 | AGPL-3.0 | MIT core, enterprise features under a commercial license |
| Databases | MySQL, MariaDB, PostgreSQL, SQL Server, Oracle, SQLite, TiDB, CockroachDB | PostgreSQL, MySQL, MariaDB, SQL Server, Oracle | PostgreSQL | PostgreSQL |
| Multi-tenancy | [Organizations](/docs/organization/overview), each with its own users, applications, providers, and roles | Realms, plus Organizations inside a realm | Instances, and organizations inside an instance | Brands for separate branding; separate tenants are an alpha enterprise feature |

## Protocols

| | Casdoor | Keycloak | ZITADEL | authentik |
|---|---|---|---|---|
| OAuth 2.0 / OIDC provider | Yes | Yes | Yes | Yes |
| SAML 2.0 identity provider | [Yes](/docs/how-to-connect/saml/overview) | Yes | Yes | Yes |
| Sign in through external SAML / OIDC providers | [Yes](/docs/provider/saml/overview) | Yes | Yes | Yes |
| CAS server | [Built in](/docs/how-to-connect/cas) | Community extension | No | No |
| LDAP server (applications bind to the IdP) | [Built in](/docs/ldap/ldapserver) | No | No | LDAP outpost |
| RADIUS server | [Built in](/docs/radius/overview) | Community extension | No | RADIUS outpost |
| MCP server and OAuth 2.1 for MCP | [Built in](/docs/mcp-auth/overview) | No built-in MCP server | No built-in MCP server | No built-in MCP server |

## Users and directories

| | Casdoor | Keycloak | ZITADEL | authentik |
|---|---|---|---|---|
| LDAP / Active Directory as user source | [Sync users, check passwords against LDAP](/docs/ldap/overview) | User federation, live lookups | LDAP identity provider, users created on first login | LDAP source, sync and password checks |
| SCIM 2.0 server (receive users from Entra ID, Okta, ...) | [Users and groups](/docs/scim/overview) | Users and groups, supported since 26.8 | Users, preview | Users and groups (SCIM source) |
| SCIM client (push users to other applications) | No; the [SCIM syncer](/docs/syncer/SCIM) pulls users from a SCIM server | No | No | Yes (SCIM provider) |
| Import from other systems | [Syncers](/docs/syncer/overview) for Keycloak, Okta, Entra ID, Active Directory, Google Workspace, AWS IAM, DingTalk, WeCom, Lark, any SQL database | Realm import, LDAP federation | Import API, LDAP | Sources for LDAP, SCIM, and social logins |

## Applications without their own login

| | Casdoor | Keycloak | ZITADEL | authentik |
|---|---|---|---|---|
| Forward auth for reverse proxies | [casdoor-forward-auth](/docs/integration/go/traefik) for Traefik, [Caddy](/docs/integration/go/caddy), and Nginx | No; use [OAuth2 Proxy](https://oauth2-proxy.github.io/oauth2-proxy/) | No; use OAuth2 Proxy | Proxy provider for Traefik, Caddy, Nginx, and Envoy |
| Groups and roles passed to the application | `X-Forwarded-Groups`, `X-Forwarded-Roles` headers | Through OAuth2 Proxy | Through OAuth2 Proxy | Headers set by the outpost |
| Works with OAuth2 Proxy | [Yes](/docs/integration/go/oauth2-proxy), including group and role checks | Yes | Yes | Yes |

## Sign-in experience

| | Casdoor | Keycloak | ZITADEL | authentik |
|---|---|---|---|---|
| Login page customization | Per application in the admin console: fields, providers, layout, CSS, and HTML ([UI customization](/docs/application/ui-customization)) | Themes (FreeMarker or React) deployed to the server | Branding settings, or your own login UI built on its APIs | Flows and stages edited in the admin interface |
| Custom sign-in logic | [Webhooks](/docs/webhooks/overview) and the [REST API](/docs/basic/public-api) | Authentication flows, Java SPIs | Actions (scripts and webhooks) | Flows, stages, and Python expression policies |
| Built-in social and enterprise providers | 70+, including WeChat, DingTalk, Lark, and Alipay | About a dozen, plus generic OIDC and SAML | Templates for common providers, plus generic OIDC, OAuth, SAML, and LDAP | Apple, Discord, GitHub, Google, Twitch, and others, plus generic OIDC, OAuth, and SAML |

Of the four, authentik has the most flexible sign-in flow engine, and Keycloak the most extension points for Java developers. Casdoor keeps the login page in configuration rather than code, and moves custom logic into your own services through webhooks and the API.

## Operations

| | Casdoor | Keycloak | ZITADEL | authentik |
|---|---|---|---|---|
| Kubernetes | [Helm chart](/docs/basic/try-with-helm) | Operator | Helm chart | Helm chart |
| Horizontal scaling | Multiple replicas, with Redis for sessions | Clustering with Infinispan, multi-site | Stateless replicas | Multiple server and worker replicas |
| Infrastructure as code | [Terraform provider](/docs/deployment/terraform) | Terraform provider | Terraform provider | Terraform provider |
| Audit log | Records of every API call, with retention settings and [webhooks](/docs/webhooks/overview) | Login and admin events | Event-sourced: every change is stored as an event | Events, with notification rules |

## Sources

- **Keycloak:** [Server administration guide](https://www.keycloak.org/docs/latest/server_admin/), [Organizations](https://www.keycloak.org/docs/latest/server_admin/#_managing_organizations), [SCIM support](https://www.keycloak.org/2026/02/scim-support-survey-feedback), [Keycloak Operator](https://www.keycloak.org/operator/installation), [keycloak-protocol-cas](https://github.com/jacekkow/keycloak-protocol-cas), [keycloak-radius-plugin](https://github.com/vzakharchenko/keycloak-radius-plugin), [Terraform provider](https://www.keycloak.org/2024/12/terraform-provider-adoption)
- **ZITADEL:** [License](https://zitadel.com/blog/apache-to-agpl), [SCIM v2.0](https://zitadel.com/docs/apis/scim2), [SAML endpoints](https://zitadel.com/docs/apis/saml/endpoints), [LDAP identity provider](https://zitadel.com/docs/guides/integrate/identity-providers/ldap), [OAuth2 Proxy guide](https://zitadel.com/docs/examples/identity-proxy/oauth2-proxy), [Kubernetes deployment](https://zitadel.com/docs/self-hosting/deploy/kubernetes), [CockroachDB removal](https://github.com/zitadel/zitadel/issues/9414)
- **authentik:** [Proxy provider](https://docs.goauthentik.io/add-secure-apps/providers/proxy/), [Caddy forward auth](https://docs.goauthentik.io/add-secure-apps/providers/proxy/server_caddy/), [SCIM source](https://docs.goauthentik.io/users-sources/sources/protocols/scim/), [Tenancy](https://docs.goauthentik.io/sys-mgmt/tenancy/), [CAS](https://docs.goauthentik.io/users-sources/sources/social-logins/cas/)
