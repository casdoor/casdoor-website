---
title: Sites
description: Configure reverse-proxy sites with SSL, health checks, and traffic rules.
keywords: [site, reverse proxy, SSL, WAF, rules]
authors: [hsluoyz]
---

**Sites** let you configure a reverse-proxy entry point for a web service. Each site maps one or more domains to an upstream backend, manages SSL certificates, attaches traffic [Rules](/docs/rule/overview), and optionally links to a Casdoor application for authentication.

## Site properties

| Field | Description |
|-------|-------------|
| **Domain** | Primary domain for this site (e.g. `example.com`). |
| **Other domains** | Additional domains that route to the same backend. |
| **Need redirect** | Redirect all other domains to the primary domain. |
| **Disable verbose** | Suppress detailed request/response logging for this site. |
| **Rules** | List of [Rules](/docs/rule/overview) applied to incoming requests. Rules are evaluated in order; the first match wins. |
| **Host** | Upstream backend hostname or IP. |
| **Port** | Upstream backend port. |
| **Hosts** | Multiple upstream hosts for load balancing (one per line). |
| **Public IP** | Public IP address reported for this site. |
| **Mode** | SSL mode: `None`, `HTTP`, `HTTPS and HTTP`, or `HTTPS Only`. |
| **SSL cert** | Certificate used for HTTPS. Select an SSL certificate from the [Certs](/docs/cert/overview) page. |
| **Casdoor app** | Casdoor application to use for authentication on this site. |
| **Status** | Current proxy status (reported by the node running the proxy). |

## Health checks and alerts

Enable **Enable alert** to monitor site availability. When enabled:

| Field | Description |
|-------|-------------|
| **Alert interval** | How often (in seconds) to check site health. |
| **Alert try times** | Number of consecutive failures before triggering an alert. |
| **Alert providers** | Notification providers to alert (e.g. email, SMS). |

## Setting up a site

1. Navigate to **Sites** in the Casdoor sidebar.
2. Click **Add** and fill in the domain, host, and port.
3. Choose an SSL mode and select a certificate if using HTTPS.
4. Optionally attach one or more [Rules](/docs/rule/overview) to control traffic.
5. If the site requires authentication, set **Casdoor app** to the relevant application.
6. Save. The proxy starts serving traffic on the configured domain.

## Protecting an app that has no login

When **Casdoor app** is set, the site only lets signed-in users through, so you can put Casdoor in front of an app that has no login of its own or no OIDC support.

- A visitor without a valid session is sent to the Casdoor login page of that application, and comes back to the original URL after signing in.
- Who can get in is decided by the application's [permissions](/docs/permission/permission-configuration): add a permission with resource type **Application**, the application as its resource, and the users, groups or roles that are allowed. Without such a permission, every user of the organization can get in. Organization admins and users of the `built-in` organization can always get in.
- The user and the permissions are checked again at least once a minute, so a user who is disabled, deleted or removed from the permission loses access within a minute, and gets a 403 page.

The proxy passes the signed-in user to the backend in these request headers:

| Header | Value |
|--------|-------|
| `X-Forwarded-User` | The user's name (username), e.g. `alice` |
| `X-Forwarded-Email` | The user's email, if set |
| `X-Forwarded-Groups` | The user's group names, separated by commas, e.g. `staff,dev` |

Headers with these names sent by the client are removed, so the backend can trust them. Apps that support login by a trusted header, such as Grafana's auth proxy, can use `X-Forwarded-User` to sign the user in. Only expose the backend through the site, otherwise anyone who reaches it directly can set these headers themselves.

## Relationship with Application reverse proxy

Applications also have a **Reverse Proxy** tab for basic proxy configuration scoped to that application. Sites provide a standalone, more feature-rich proxy configuration that can be used independently of any application, with additional capabilities like health checks, multi-domain routing, and traffic rules.
