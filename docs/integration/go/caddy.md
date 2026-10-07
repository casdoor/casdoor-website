---
title: Caddy
description: Protect services behind Caddy with Casdoor SSO using casdoor-forward-auth and Caddy's forward_auth directive.
keywords: [Caddy, forward_auth, forward auth, reverse proxy, authentication]
authors: [casdoor]
---

[casdoor-forward-auth](https://github.com/casdoor/casdoor-forward-auth) puts Casdoor single sign-on in front of any service behind [Caddy](https://caddyserver.com/), without changing the service. Caddy asks casdoor-forward-auth about every request through its built-in [forward_auth](https://caddyserver.com/docs/caddyfile/directives/forward_auth) directive: signed-in users reach the service with their identity in request headers, everyone else is sent to the Casdoor login page first.

The same service also works with [Traefik](/docs/integration/go/traefik) and [Nginx](https://github.com/casdoor/casdoor-forward-auth#nginx). The setup on this page was tested end to end with Caddy v2.11 and casdoor-forward-auth v2.0.

## How it works

1. Caddy sends every request for a protected site to `/auth` of casdoor-forward-auth.
2. With a valid session cookie, `/auth` answers `200` with headers like `X-Forwarded-User`, and Caddy copies them into the request to your service.
3. Without a session, page loads (`GET`, `HEAD`) are redirected to Casdoor. Other requests (`POST`, `PUT`, ...) get `401`, since they can't follow a login redirect. Caddy returns these answers to the browser unchanged.
4. After the login, Casdoor redirects to `/callback`. casdoor-forward-auth checks the `state`, exchanges the authorization code, verifies the access token, stores the user in a signed `HttpOnly` session cookie and sends the user back to the page they asked for.

## Prerequisites

- Caddy v2
- A Casdoor instance (see [Server Installation](/docs/basic/server-installation))
- Two host names pointing to Caddy, e.g., `auth.example.com` for casdoor-forward-auth and `app.example.com` for the protected service

## Step 1: Configure the Casdoor application

1. Create or edit an application in Casdoor.
2. Add the callback of casdoor-forward-auth to **Redirect URLs**:

   ```text
   https://auth.example.com/callback
   ```

3. Note the **Client ID** and **Client secret**.

## Step 2: Deploy casdoor-forward-auth and Caddy

Create a `Caddyfile`:

```text
auth.example.com {
    reverse_proxy casdoor-forward-auth:9999
}

app.example.com {
    forward_auth casdoor-forward-auth:9999 {
        uri /auth
        copy_headers X-Forwarded-User X-Forwarded-User-Id X-Forwarded-Organization X-Forwarded-Email X-Forwarded-Groups X-Forwarded-Roles
    }
    reverse_proxy app:8080
}
```

`app:8080` is the service you protect. To protect more services, give each site the same `forward_auth` block. Don't put `forward_auth` on the site of casdoor-forward-auth itself.

Create a `docker-compose.yml`:

```yaml
services:
  caddy:
    image: caddy:2
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data

  casdoor-forward-auth:
    image: ghcr.io/casdoor/casdoor-forward-auth:latest
    environment:
      CASDOOR_ENDPOINT: https://door.casdoor.com
      CLIENT_ID: <client ID>
      CLIENT_SECRET: <client secret>
      EXTERNAL_URL: https://auth.example.com
      COOKIE_DOMAIN: example.com
      COOKIE_SECRET: <random string of at least 32 characters>

  app:
    image: traefik/whoami
    command: --port 8080

volumes:
  caddy_data:
```

Replace the placeholders:

- `CASDOOR_ENDPOINT`: the URL of your Casdoor server
- `CLIENT_ID` and `CLIENT_SECRET`: the values from Step 1
- `EXTERNAL_URL`: the public URL of casdoor-forward-auth. `<EXTERNAL_URL>/callback` must be a Redirect URL of the application
- `COOKIE_DOMAIN`: the parent domain of the protected hosts, so the session cookie is sent to all of them
- `COOKIE_SECRET`: a random secret, e.g., from `openssl rand -hex 32`. Keep it stable: changing it signs everybody out

Caddy gets HTTPS certificates for both hosts automatically. Start the services:

```bash
docker compose up -d
```

## Step 3: Test the integration

1. Open the protected service, e.g., `https://app.example.com`.
2. You are redirected to the Casdoor login page.
3. After signing in, you are back on the page you opened, and the service receives the identity headers. `traefik/whoami` prints them, so you can check them there.

## Identity headers

| Header | Value |
|----------|-------------|
| `X-Forwarded-User` | User name, e.g., `alice` |
| `X-Forwarded-User-Id` | User ID |
| `X-Forwarded-Organization` | Organization of the user |
| `X-Forwarded-Email` | Email address |
| `X-Forwarded-Groups` | Comma-separated groups, e.g., `built-in/dev,built-in/ops` |
| `X-Forwarded-Roles` | Comma-separated role names |

casdoor-forward-auth always returns all of them, possibly empty, so Caddy's `copy_headers` replaces whatever the client sent in the same headers. Make sure the protected service is only reachable through Caddy, otherwise anyone can send these headers directly.

## Restricting access

By default every user who can sign in to the Casdoor application is let in. To let in only users with certain Casdoor roles or groups, add `roles` and/or `groups` (comma separated) to the `uri` of that site:

```text
app.example.com {
    forward_auth casdoor-forward-auth:9999 {
        uri /auth?roles=admin,ops
        copy_headers X-Forwarded-User X-Forwarded-User-Id X-Forwarded-Organization X-Forwarded-Email X-Forwarded-Groups X-Forwarded-Roles
    }
    reverse_proxy app:8080
}
```

A user passes with at least one of the listed roles and, if `groups` is given too (e.g., `groups=built-in/dev`), at least one of the listed groups. Everyone else who is signed in gets `403`. Each site can have its own rule; the `ALLOWED_ROLES` and `ALLOWED_GROUPS` environment variables set one rule for all sites.

This also covers "sign up first, get access later": new users, e.g., from Google sign-up, have no role and get `403` until an admin assigns them one on the **Roles** page of Casdoor. Roles and groups are read at login, so after a change the user has to open `https://auth.example.com/logout` and sign in again, or wait for the session to end (`SESSION_TTL`).

## Configuration and logout

casdoor-forward-auth is configured with the same environment variables for every reverse proxy; see [Configuration](/docs/integration/go/traefik#configuration) on the Traefik page. `/logout` clears the session of casdoor-forward-auth (with `?rd=<url>` to redirect afterwards); the user stays signed in to Casdoor.
