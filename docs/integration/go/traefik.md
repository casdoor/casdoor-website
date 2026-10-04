---
title: Traefik
description: Protect services behind Traefik with Casdoor SSO using casdoor-forward-auth and Traefik's forwardAuth middleware.
keywords: [Traefik, forwardAuth, forward auth, middleware, authentication]
authors: [casdoor]
---

[casdoor-forward-auth](https://github.com/casdoor/casdoor-forward-auth) puts Casdoor single sign-on in front of any service behind [Traefik](https://traefik.io/), without changing the service. Traefik asks casdoor-forward-auth about every request through its built-in [forwardAuth](https://doc.traefik.io/traefik/middlewares/http/forwardauth/) middleware: signed-in users reach the service with their identity in request headers, everyone else is sent to the Casdoor login page first.

The same service also works with [Caddy](https://github.com/casdoor/casdoor-forward-auth#caddy) (`forward_auth`) and [Nginx](https://github.com/casdoor/casdoor-forward-auth#nginx) (`auth_request`).

## How it works

1. Traefik calls `/auth` of casdoor-forward-auth for every request to a protected service.
2. With a valid session cookie, `/auth` answers `200` with headers like `X-Forwarded-User`, which Traefik copies into the request to your service.
3. Without a session, page loads are redirected to Casdoor. Other requests (`POST`, `PUT`, ...) get `401`, since they can't follow a login redirect.
4. After the login, Casdoor redirects to `/callback`. casdoor-forward-auth checks the `state`, exchanges the authorization code, verifies the access token, stores the user in a signed `HttpOnly` session cookie and sends the user back to the page they asked for.

casdoor-forward-auth keeps no state on the server, so you can run several replicas as long as they share the same cookie secret.

## Prerequisites

- Traefik v2 or v3
- A Casdoor instance (see [Server Installation](/docs/basic/server-installation))
- Two host names pointing to Traefik, e.g., `auth.example.com` for casdoor-forward-auth and `app.example.com` for the protected service. With only one host, see [Using a single host](#using-a-single-host).

## Step 1: Configure the Casdoor application

1. Create or edit an application in Casdoor.
2. Add the callback of casdoor-forward-auth to **Redirect URLs**:

   ```text
   https://auth.example.com/callback
   ```

3. Note the **Client ID** and **Client secret**.

![Casdoor Application Setting](/img/integration/appsetting_spring_security.png)

## Step 2: Deploy casdoor-forward-auth and Traefik

Create a `docker-compose.yml`:

```yaml
services:
  traefik:
    image: traefik:v3.1
    command:
      - --providers.docker=true
      - --providers.docker.exposedbydefault=false
      - --entrypoints.web.address=:80
    ports:
      - "80:80"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro

  casdoor-forward-auth:
    image: ghcr.io/casdoor/casdoor-forward-auth:latest
    environment:
      CASDOOR_ENDPOINT: https://door.casdoor.com
      CLIENT_ID: <client ID>
      CLIENT_SECRET: <client secret>
      EXTERNAL_URL: http://auth.example.com
      COOKIE_DOMAIN: example.com
      COOKIE_SECRET: <random string of at least 32 characters>
    labels:
      - traefik.enable=true
      - traefik.http.routers.casdoor-auth.rule=Host(`auth.example.com`)
      - traefik.http.routers.casdoor-auth.entrypoints=web
      - traefik.http.services.casdoor-auth.loadbalancer.server.port=9999
      - traefik.http.middlewares.casdoor.forwardauth.address=http://casdoor-forward-auth:9999/auth
      - traefik.http.middlewares.casdoor.forwardauth.authResponseHeaders=X-Forwarded-User,X-Forwarded-User-Id,X-Forwarded-Organization,X-Forwarded-Email,X-Forwarded-Groups,X-Forwarded-Roles

  # the protected service
  whoami:
    image: traefik/whoami
    labels:
      - traefik.enable=true
      - traefik.http.routers.whoami.rule=Host(`app.example.com`)
      - traefik.http.routers.whoami.entrypoints=web
      - traefik.http.routers.whoami.middlewares=casdoor
```

Replace the placeholders:

- `CASDOOR_ENDPOINT`: the URL of your Casdoor server
- `CLIENT_ID` and `CLIENT_SECRET`: the values from Step 1
- `EXTERNAL_URL`: the public URL of casdoor-forward-auth. `<EXTERNAL_URL>/callback` must be a Redirect URL of the application
- `COOKIE_DOMAIN`: the parent domain of the protected hosts, so the session cookie is sent to all of them
- `COOKIE_SECRET`: a random secret, e.g., from `openssl rand -hex 32`. Keep it stable: changing it signs everybody out

Use `https://` URLs in production, so the cookies are only sent over HTTPS.

Start the services:

```bash
docker compose up -d
```

To protect another service, add `traefik.http.routers.<router>.middlewares=casdoor` to its router. Don't add the middleware to the router of casdoor-forward-auth itself.

### Using the file provider

If you configure Traefik with files instead of Docker labels, define the middleware and routers in the dynamic configuration:

```yaml
http:
  middlewares:
    casdoor:
      forwardAuth:
        address: http://casdoor-forward-auth:9999/auth
        authResponseHeaders:
          - X-Forwarded-User
          - X-Forwarded-User-Id
          - X-Forwarded-Organization
          - X-Forwarded-Email
          - X-Forwarded-Groups
          - X-Forwarded-Roles

  routers:
    casdoor-auth:
      rule: Host(`auth.example.com`)
      service: casdoor-auth
    app:
      rule: Host(`app.example.com`)
      service: app
      middlewares:
        - casdoor

  services:
    casdoor-auth:
      loadBalancer:
        servers:
          - url: http://casdoor-forward-auth:9999
    app:
      loadBalancer:
        servers:
          - url: http://app:8080
```

casdoor-forward-auth can also run without Docker: `go install github.com/casdoor/casdoor-forward-auth@latest`, then start it with the same environment variables or a JSON config file (`casdoor-forward-auth -config config.json`, see [conf/config.json](https://github.com/casdoor/casdoor-forward-auth/blob/master/conf/config.json)).

### Using a single host

With only one host name, mount casdoor-forward-auth under a path of the service, e.g., `EXTERNAL_URL=https://app.example.com/_auth` without `COOKIE_DOMAIN`. Route that path to casdoor-forward-auth without the middleware:

```yaml
  routers:
    casdoor-auth:
      rule: Host(`app.example.com`) && PathPrefix(`/_auth`)
      service: casdoor-auth
    app:
      rule: Host(`app.example.com`)
      service: app
      middlewares:
        - casdoor
```

Set the forwardAuth address to `http://casdoor-forward-auth:9999/_auth/auth`, and add `https://app.example.com/_auth/callback` to the Redirect URLs in Casdoor.

## Step 3: Test the integration

1. Open the protected service, e.g., `http://app.example.com`.
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

casdoor-forward-auth always returns all of them, possibly empty, so Traefik replaces whatever the client sent in the same headers. Make sure the protected service is only reachable through Traefik, otherwise anyone can send these headers directly.

## Configuration

Every setting can be given as an environment variable or in a JSON config file:

| Environment variable | Default | Description |
|----------|-------------|-------------|
| `CASDOOR_ENDPOINT` | required | URL of the Casdoor server |
| `CLIENT_ID` | required | Client ID of the Casdoor application |
| `CLIENT_SECRET` | required | Client secret of the Casdoor application |
| `EXTERNAL_URL` | required | Public URL of casdoor-forward-auth, may include a path |
| `COOKIE_SECRET` | required | Secret of at least 32 characters for signing the cookies |
| `COOKIE_DOMAIN` | empty | Domain of the session cookie, e.g., `example.com` |
| `COOKIE_NAME` | `casdoor_forward_auth` | Name of the session cookie |
| `SESSION_TTL` | `24h` | Session lifetime, never longer than the access token from Casdoor |
| `ALLOWED_REDIRECT_DOMAINS` | host of `EXTERNAL_URL` and `.<COOKIE_DOMAIN>` | Comma-separated domains users may be sent back to after login |
| `CERTIFICATE` | empty | PEM certificate for verifying access tokens. By default it's looked up in Casdoor's `/.well-known/jwks` |
| `LISTEN_ADDR` | `:9999` | Address to listen on |

`/logout` clears the session of casdoor-forward-auth (with `?rd=<url>` to redirect afterwards). The user stays signed in to Casdoor.

## Troubleshooting

### Casdoor shows "Redirect URI ... doesn't exist in the allowed Redirect URI list"

`<EXTERNAL_URL>/callback` is not in the Redirect URLs of the application. The scheme, host, port and path must match.

### Redirected to the login page again after signing in

The session cookie isn't sent to the protected host:

- Set `COOKIE_DOMAIN` to a domain that covers both `EXTERNAL_URL` and the protected hosts.
- With `https://` in `EXTERNAL_URL` the cookie is `Secure`, so the protected service must be served over HTTPS as well.

### "the login state is missing or has expired"

The login took longer than 10 minutes, or the browser blocked the cookie set by `/login`. Open the protected page again to start a new login.

### Requests from the frontend get 401

Without a session, only `GET` and `HEAD` requests are redirected to the login. API calls with other methods get `401`; let the user reload the page to sign in.

## Upgrading from traefik-casdoor-auth

casdoor-forward-auth was called `traefik-casdoor-auth` before v2 and needed a Traefik plugin. To upgrade:

- Remove the local plugin (`experimental.localPlugins` and `plugins-local`) and use the `forwardAuth` middleware shown above.
- Rename the config keys: `casdoorClientId` → `clientId`, `casdoorClientSecret` → `clientSecret`, `pluginEndpoint` → `externalUrl`. `casdoorOrganization` and `casdoorApplication` are no longer needed, and `cookieSecret` is new and required.
- The Redirect URL in Casdoor stays `<externalUrl>/callback`.

## Resources

- [casdoor-forward-auth on GitHub](https://github.com/casdoor/casdoor-forward-auth)
- [Traefik forwardAuth middleware](https://doc.traefik.io/traefik/middlewares/http/forwardauth/)
- [ELK](/docs/integration/go/elk): protecting Kibana with casdoor-forward-auth or elk-auth-casdoor
