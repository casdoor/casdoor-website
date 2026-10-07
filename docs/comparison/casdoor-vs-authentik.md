---
title: Casdoor vs. Authentik
description: Casdoor and Authentik compared for self-hosted SSO - architecture, flows and UI customization, protocols, reverse-proxy authentication, licensing, and AI agent support.
keywords: [Casdoor vs Authentik, Authentik vs Casdoor, Authentik alternative, self-hosted SSO, homelab identity provider]
authors: [hsluoyz]
---

Authentik and Casdoor are both popular choices for self-hosted single sign-on, from homelabs to company deployments. Both provide OIDC, SAML, LDAP access, and a web admin console. The main differences are the runtime, how login is modeled, and what is included in the open-source edition.

## Summary

| | Casdoor | Authentik |
|---|---|---|
| Backend | Go, single binary | Python (Django) server and worker, with Go outposts |
| Database | MySQL, MariaDB, PostgreSQL, SQL Server, Oracle, SQLite, and others | PostgreSQL |
| License | Apache-2.0 | MIT for the core; some features require the paid Enterprise edition |
| Login modeling | Per-application sign-in and sign-up pages configured in the UI | Flows built from stages and policies |
| OAuth 2.0, OIDC, SAML | Yes | Yes |
| CAS | Built in | No |
| LDAP and RADIUS for legacy clients | Served by the Casdoor process | Served by separate outposts |
| Protecting apps without their own login | [Sites](/docs/site/overview) reverse proxy, plus [casdoor-forward-auth](/docs/integration/go/traefik) for Traefik, [Caddy](/docs/integration/go/caddy), and Nginx, and an [Envoy](/docs/integration/C++/Envoy) filter | Proxy provider with outposts |
| AI agents and MCP | Built-in MCP server; OAuth 2.1 authorization server for MCP | Standard OAuth |

## Architecture and operations

Authentik runs a server container and a worker container backed by PostgreSQL. Features such as the LDAP provider, the RADIUS provider, and the proxy provider run as additional *outpost* containers that Authentik manages.

Casdoor is one Go process and a database. LDAP, RADIUS, CAS, SAML, and OIDC are all served by that process. For a quick look:

```bash
docker run -p 8000:8000 casbin/casdoor-all-in-one
```

Fewer moving parts matters most on small machines and when something breaks at night.

## Flows versus pages

Authentik's central idea is the **flow**: an ordered list of stages (identification, password, MFA, consent, and so on) with policies bound to them. It is very flexible. You can express almost any login logic, and the cost is a model you need to learn before your first custom login works.

Casdoor is more direct. Each [application](/docs/application/overview) has a sign-in page and a sign-up page. You pick the [sign-in methods](/docs/application/signin-methods), the [providers](/docs/application/providers), the [fields on the sign-up form](/docs/application/signup-items-table), MFA rules, and the [look of the page](/docs/application/ui-customization) in the admin console. Most teams get the result they want faster, and there is less room to build something unusual.

## Sign-in providers

Authentik supports the common social logins and generic OAuth, SAML, and LDAP sources.

Casdoor ships more than 70 [OAuth providers](/docs/provider/oauth/overview), plus SAML, LDAP, and Web3 wallets. If your users sign in with WeChat, DingTalk, Lark, Alipay, or QQ, Casdoor supports them without extra work.

## Reverse-proxy authentication

Authentik's proxy provider is well loved by homelab users: it puts a login in front of applications that have none.

Casdoor offers two routes to the same result. [Sites](/docs/site/overview) is a built-in reverse proxy with TLS certificates and traffic [rules](/docs/rule/overview). If you already run a proxy, use the integrations for [Nginx](/docs/integration/C++/Nginx), [Traefik](/docs/integration/go/traefik), or [Envoy](/docs/integration/C++/Envoy).

## Licensing

Casdoor's repository is Apache-2.0 throughout.

Authentik's core is MIT-licensed, and a set of features is reserved for the Enterprise edition. Check Authentik's current pricing page for the list, because it changes between releases.

## AI agents and MCP

Casdoor exposes its management API as an [MCP server](/docs/how-to-connect/mcp/overview) and acts as an [OAuth 2.1 authorization server for third-party MCP servers](/docs/mcp-auth/overview), with Dynamic Client Registration, PKCE, and resource indicators. If you are putting authentication in front of MCP tools, this is ready to use.

## When to choose which

Choose **Authentik** if you want to design login logic as flows with policies, or you already rely on its proxy outposts.

Choose **Casdoor** if you want a single small service, more built-in sign-in providers, a CAS server, a choice of databases, an Apache-2.0 license for every feature in the repository, or built-in MCP support.

See also the [comparison overview](/docs/comparison/overview).
