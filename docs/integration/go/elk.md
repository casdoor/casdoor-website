---
title: ELK
description: "Put Casdoor single sign-on in front of Kibana with casdoor-forward-auth, without X-Pack's paid SSO features."
keywords: [ELK, Kibana, Elasticsearch, forward auth]
authors: [casdoor]
---

## Overview

Kibana's own SSO options (OAuth, OIDC, SAML, LDAP) belong to the paid subscriptions of the Elastic Stack. To protect Kibana with Casdoor for free, put [casdoor-forward-auth](https://github.com/casdoor/casdoor-forward-auth) in front of it: the reverse proxy asks casdoor-forward-auth about every request, sends users without a session to the Casdoor login page, and lets signed-in users through to Kibana.

This page uses Nginx as the reverse proxy. With Traefik, follow the [Traefik](/docs/integration/go/traefik) guide and use Kibana as the protected service; with Caddy, see the [casdoor-forward-auth README](https://github.com/casdoor/casdoor-forward-auth#caddy).

:::note

casdoor-forward-auth replaces [elk-auth-casdoor](https://github.com/casdoor/elk-auth-casdoor), which earlier versions of this page used.

:::

## Step 1: Configure the Casdoor application

1. Create or edit an application in Casdoor.
2. Add the callback of casdoor-forward-auth to **Redirect URLs**, e.g., `https://auth.example.com/callback`.
3. Note the **Client ID** and **Client secret**.

In the examples below, Kibana is served at `https://kibana.example.com` and casdoor-forward-auth at `https://auth.example.com`.

## Step 2: Run casdoor-forward-auth

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

## Step 3: Configure Nginx

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

## Step 4: Block direct access to Kibana

Kibana must only be reachable through Nginx. Bind it to localhost (`server.host: "127.0.0.1"` in `kibana.yml`) or block port `5601` in your firewall, otherwise anyone can bypass the login by connecting to Kibana directly.
