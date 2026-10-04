---
title: ELK
description: "Put Casdoor single sign-on in front of Kibana with elk-auth-casdoor or casdoor-forward-auth, without X-Pack's paid SSO features."
keywords: [ELK, Kibana, Elasticsearch, forward auth, reverse proxy]
authors: [casdoor]
---

## Overview

Kibana's own SSO options (OAuth, OIDC, SAML, LDAP) belong to the paid subscriptions of the Elastic Stack. To protect Kibana with Casdoor for free, put one of these in front of it:

| | [elk-auth-casdoor](https://github.com/casdoor/elk-auth-casdoor) | [casdoor-forward-auth](https://github.com/casdoor/casdoor-forward-auth) |
| --- | --- | --- |
| What it is | A reverse proxy: browsers talk to it and it forwards to Kibana | A forward auth service that your existing reverse proxy (Nginx, Traefik, Caddy) asks about every request |
| You need | Nothing else | Nginx, Traefik or Caddy |
| Hosts | Kibana's host only | A host for the auth service (e.g. `auth.example.com`) next to Kibana's, sharing a cookie domain |
| Good for | Protecting a single Kibana with the fewest moving parts | Setups that already have a reverse proxy, or several services behind one sign-in |

Both send users without a session to the Casdoor login page, verify the access token, and pass the signed-in user to Kibana in the `X-Forwarded-User` header.

## Step 1: Configure the Casdoor application

1. Create or edit an application in Casdoor.
2. Add the callback to **Redirect URLs**:
    - elk-auth-casdoor: `https://kibana.example.com/casdoor-auth/callback`
    - casdoor-forward-auth: `https://auth.example.com/callback`
3. Note the **Client ID** and **Client secret**.

In the examples below, Kibana is served at `https://kibana.example.com` and listens on `127.0.0.1:5601`.

## Option A: elk-auth-casdoor

### Step 2: Configure elk-auth-casdoor

Save the public certificate of the application's cert (**Certs** page in Casdoor) as `conf/token_jwt_key.pem`, and create `conf/config.json`:

```json
{
  "listenAddr": ":8080",
  "pluginEndpoint": "https://kibana.example.com",
  "targetEndpoint": "http://127.0.0.1:5601",
  "casdoorEndpoint": "https://door.casdoor.com",
  "clientId": "<client ID>",
  "clientSecret": "<client secret>",
  "certificateFile": "conf/token_jwt_key.pem",
  "organization": "<organization of the application>",
  "application": "<application name>"
}
```

- `pluginEndpoint` is the public URL users type in the browser; `targetEndpoint` is where elk-auth-casdoor reaches Kibana.
- Only users of `organization` can sign in.
- If Elasticsearch security is enabled and Kibana asks for its own login, set `upstreamUsername` and `upstreamPassword` to a Kibana user; elk-auth-casdoor sends them to Kibana with basic auth for everybody who signs in through Casdoor.

See the [elk-auth-casdoor README](https://github.com/casdoor/elk-auth-casdoor#quick-start) for all settings.

### Step 3: Run elk-auth-casdoor

```bash
docker run -d --name elk-auth-casdoor --network host \
  -v "$PWD/conf:/app/conf" \
  -e SESSION_SECRET=<random string of at least 32 characters> \
  ghcr.io/casdoor/elk-auth-casdoor:latest
```

`SESSION_SECRET` signs the session cookies; keep it the same across restarts, otherwise everybody is signed out. Terminate TLS in front of port `8080` (or run elk-auth-casdoor behind your load balancer) so that users reach it at `pluginEndpoint`.

Open `https://kibana.example.com`. You are redirected to Casdoor, and after signing in you see Kibana. `/casdoor-auth/logout` signs out of elk-auth-casdoor.

## Option B: casdoor-forward-auth with Nginx

### Step 2: Run casdoor-forward-auth

```bash
docker run -d --name casdoor-forward-auth -p 9999:9999 \
  -e CASDOOR_ENDPOINT=https://door.casdoor.com \
  -e CLIENT_ID=<client ID> \
  -e CLIENT_SECRET=<client secret> \
  -e EXTERNAL_URL=https://auth.example.com \
  -e COOKIE_DOMAIN=example.com \
  -e COOKIE_SECRET=<random string of at least 32 characters> \
  ghcr.io/casdoor/casdoor-forward-auth:latest
```

`COOKIE_DOMAIN` must cover both `auth.example.com` and `kibana.example.com`, so the session cookie set after login is sent to Kibana's host. See [Configuration](/docs/integration/go/traefik#configuration) for all settings.

### Step 3: Configure Nginx

Nginx's [auth_request](https://nginx.org/en/docs/http/ngx_http_auth_request_module.html) module calls `/verify` of casdoor-forward-auth for every request and redirects to the login on `401`:

```nginx
server {
    listen 443 ssl;
    server_name auth.example.com;
    # ssl_certificate ...

    location / {
        proxy_pass http://127.0.0.1:9999;
        proxy_set_header Host $host;
    }
}

server {
    listen 443 ssl;
    server_name kibana.example.com;
    # ssl_certificate ...

    location = /_casdoor_verify {
        internal;
        proxy_pass http://127.0.0.1:9999/verify;
        proxy_pass_request_body off;
        proxy_set_header Content-Length "";
    }

    location @casdoor_login {
        return 302 https://auth.example.com/login?rd=$scheme://$http_host$request_uri;
    }

    location / {
        auth_request /_casdoor_verify;
        error_page 401 = @casdoor_login;

        auth_request_set $casdoor_user $upstream_http_x_forwarded_user;
        proxy_set_header X-Forwarded-User $casdoor_user;

        proxy_pass http://127.0.0.1:5601;
        proxy_set_header Host $host;
    }
}
```

Reload Nginx and open `https://kibana.example.com`. You are redirected to Casdoor, and after signing in you see Kibana.

With Traefik, follow the [Traefik](/docs/integration/go/traefik) guide and use Kibana as the protected service; with Caddy, see the [casdoor-forward-auth README](https://github.com/casdoor/casdoor-forward-auth#caddy).

## Block direct access to Kibana

With either option, Kibana must only be reachable through the proxy. Bind it to localhost (`server.host: "127.0.0.1"` in `kibana.yml`) or block port `5601` in your firewall, otherwise anyone can bypass the login by connecting to Kibana directly.
