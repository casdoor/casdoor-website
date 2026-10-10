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
| **Public paths** | Paths that can be visited without signing in, e.g. `/api/webhook` or `/health`. A path also covers everything under it: `/public` covers `/public/logo.png` but not `/publicity`. Shown when **Casdoor app** is set. |
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
- Paths listed in **Public paths** are passed without signing in, for webhooks, health checks or static files that other systems fetch. No user headers are sent for them.
- The site's [Rules](/docs/rule/overview) are checked before the login, so blocked IPs or user agents never reach the login page.

The proxy passes the signed-in user to the backend in these request headers:

| Header | Value |
|--------|-------|
| `X-Forwarded-User` | The user's name (username), e.g. `alice` |
| `X-Forwarded-Email` | The user's email, if set |
| `X-Forwarded-Groups` | The user's group names, separated by commas, e.g. `staff,dev` |

Headers with these names sent by the client are removed, so the backend can trust them. Apps that support login by a trusted header, such as Grafana's auth proxy, can use `X-Forwarded-User` to sign the user in. Only expose the backend through the site, otherwise anyone who reaches it directly can set these headers themselves.

## Using your own reverse proxy (forward auth)

If Traefik, Caddy or Nginx already sits in front of your app, keep it and let it ask Casdoor whether each request may pass, instead of routing the traffic through the site proxy. Casdoor answers at `/api/forward-auth`:

- `200` with the `X-Forwarded-User`, `X-Forwarded-Email` and `X-Forwarded-Groups` headers when the user is signed in and allowed, copy them to the request sent to the app.
- A redirect to the Casdoor login page when the user isn't signed in (`401` with a `Location` header for Nginx).
- `403` when the user is disabled or not allowed by the application's permissions.
- `200` without user headers for the site's **Public paths**.
- The status of the rule when one of the site's [Rules](/docs/rule/overview) blocks the request (always `403` for Nginx). Rules see the original method, path, user agent and client IP, taken from the `X-Forwarded-*` headers that the proxy sends.

Set up a site for it first:

1. Add a site whose **Domain** is the app's domain, e.g. `app.example.com`, and set **Casdoor app**. **Host** and **Port** can stay empty, since the traffic doesn't go through Casdoor.
2. Add `https://app.example.com/caswaf-handler` to the **Redirect URLs** of that application. After signing in, the user comes back to this path, the proxy passes it to Casdoor like any other request, and Casdoor sets the session cookie on the app's domain.

Casdoor finds the site by the `X-Forwarded-Host` header (or `X-Original-URL` for Nginx), so the proxy must send the original host, scheme and URI.

### Traefik

```yaml
http:
  middlewares:
    casdoor:
      forwardAuth:
        address: "http://casdoor:8000/api/forward-auth"
        authResponseHeaders:
          - X-Forwarded-User
          - X-Forwarded-Email
          - X-Forwarded-Groups
```

Add the `casdoor` middleware to the router of the app.

### Caddy

```caddyfile
app.example.com {
    forward_auth casdoor:8000 {
        uri /api/forward-auth
        copy_headers X-Forwarded-User X-Forwarded-Email X-Forwarded-Groups
    }
    reverse_proxy app:3000
}
```

### Nginx

Nginx's `auth_request` can't follow redirects, so Casdoor returns `401` with the login URL in `Location`, and the callback path is passed to Casdoor directly:

```nginx
server {
    server_name app.example.com;

    # The session cookie holds a JWT, which can be larger than the default buffer
    proxy_buffer_size 16k;
    proxy_buffers 8 16k;

    location = /caswaf-handler {
        proxy_pass http://casdoor:8000/api/forward-auth;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $http_host;
        proxy_set_header X-Forwarded-Uri $request_uri;
    }

    location = /casdoor-auth {
        internal;
        proxy_pass http://casdoor:8000/api/forward-auth;
        proxy_pass_request_body off;
        proxy_set_header Content-Length "";
        proxy_set_header X-Original-URL $scheme://$http_host$request_uri;
        proxy_set_header X-Forwarded-Method $request_method;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location / {
        auth_request /casdoor-auth;
        auth_request_set $casdoor_redirect $upstream_http_location;
        auth_request_set $casdoor_user $upstream_http_x_forwarded_user;
        auth_request_set $casdoor_email $upstream_http_x_forwarded_email;
        auth_request_set $casdoor_groups $upstream_http_x_forwarded_groups;
        error_page 401 =302 $casdoor_redirect;

        proxy_set_header X-Forwarded-User $casdoor_user;
        proxy_set_header X-Forwarded-Email $casdoor_email;
        proxy_set_header X-Forwarded-Groups $casdoor_groups;
        proxy_pass http://app:3000;
    }
}
```

As with the site proxy, the app must only be reachable through the reverse proxy, otherwise anyone can set the `X-Forwarded-*` headers themselves.

For a step-by-step example with Grafana, see [Add login to an app without OIDC](/docs/site/protect-app).

## Relationship with Application reverse proxy

Applications also have a **Reverse Proxy** tab for basic proxy configuration scoped to that application. Sites provide a standalone, more feature-rich proxy configuration that can be used independently of any application, with additional capabilities like health checks, multi-domain routing, and traffic rules.
