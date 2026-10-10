---
title: Add login to an app without OIDC
description: Put Casdoor in front of an app that has no login or no OIDC support, and pass the signed-in user to it.
keywords: [forward auth, auth proxy, reverse proxy, trusted header, Grafana, Traefik, Caddy, Nginx]
authors: [hsluoyz]
---

Some apps have no login at all, such as an internal dashboard or a static site, and some only support login by a trusted request header. Casdoor can sit in front of them: users sign in with Casdoor, only the users you allow get through, and the app receives the username in a request header.

This guide protects Grafana at `grafana.example.com` as an example. Grafana runs on `127.0.0.1:3000` and signs users in with the `X-Forwarded-User` header. Any other app works the same way; skip the Grafana step if the app has no login of its own.

There are two ways to put Casdoor in front:

- **Casdoor's site proxy**: Casdoor receives the traffic on ports 80 and 443 and forwards it to the app. Use it when nothing else is in front of the app.
- **Forward auth**: Traefik, Caddy or Nginx keeps receiving the traffic and asks Casdoor about each request. Use it when you already run one of them.

## 1. Create the application

1. Go to **Applications** and add an application, e.g. `app-grafana`, in the organization whose users should sign in.
2. Add `https://grafana.example.com/caswaf-handler` to its **Redirect URLs**. Users come back to this path after signing in.

## 2. Decide who can get in

By default, every user of the organization can get in. To allow only some of them, go to **Permissions** and add a permission:

- **Resource type**: `Application`
- **Resources**: `app-grafana`
- **Actions**: `Read`
- **Effect**: `Allow`
- **Users**, **Groups** or **Roles**: who may get in, e.g. the group `ops`

Casdoor checks the permission when the user signs in, and again at least once a minute afterwards, so removing someone from the group takes effect within a minute.

## 3. Add the site

Go to **Sites** and add a site:

- **Domain**: `grafana.example.com`
- **Casdoor app**: `app-grafana`
- **Public paths**: `/api/health`, so that monitoring can reach Grafana's health check without signing in

For the site proxy, also set:

- **Host**: `http://127.0.0.1:3000`
- **Mode**: `HTTPS Only`, and select the certificate of the domain in **SSL cert**

For forward auth, leave **Host** empty.

## 4. Route the traffic

With the site proxy, point the DNS record of `grafana.example.com` to the Casdoor server. Casdoor serves the site on ports 80 and 443.

With forward auth, configure your proxy as shown in [Using your own reverse proxy](/docs/site/overview#using-your-own-reverse-proxy-forward-auth). For Caddy:

```caddyfile
grafana.example.com {
    forward_auth casdoor:8000 {
        uri /api/forward-auth
        copy_headers X-Forwarded-User X-Forwarded-Email X-Forwarded-Groups
    }
    reverse_proxy 127.0.0.1:3000
}
```

## 5. Let Grafana trust the header

In `grafana.ini`:

```ini
[auth.proxy]
enabled = true
header_name = X-Forwarded-User
header_property = username
auto_sign_up = true
headers = Email:X-Forwarded-Email
whitelist = 127.0.0.1
```

`whitelist` makes Grafana accept the header only from the proxy. Make sure Grafana can't be reached in any other way, otherwise anyone could send `X-Forwarded-User: admin` themselves.

## 6. Try it

Open `https://grafana.example.com` in a private window. You are sent to the Casdoor login page, and after signing in you land in Grafana as your Casdoor user. A user who isn't allowed by the permission gets a 403 page, and `https://grafana.example.com/api/health` answers without signing in.
