---
title: OAuth2 Proxy
description: Put OAuth2 Proxy in front of any web application with Casdoor as the OIDC provider, and let in only members of a Casdoor group or holders of a Casdoor role.
keywords: [OAuth2 Proxy, oauth2-proxy, OIDC, groups claim, oidc_groups_claim, allowed_groups, roles]
authors: [casdoor]
---

[OAuth2 Proxy](https://oauth2-proxy.github.io/oauth2-proxy/) is a reverse proxy that signs users in with an OIDC provider before they reach your application. It can also act as the forward-auth endpoint of Nginx, Caddy, or Traefik. With Casdoor as the provider, you can let in only the members of a Casdoor group or the users who hold a Casdoor role.

The configuration on this page was tested end to end with OAuth2 Proxy v7.15 and Casdoor v4.17.

:::tip

If you only need Casdoor sign-in in front of an application and don't need OAuth2 Proxy itself, [casdoor-forward-auth](/docs/integration/go/traefik) does the same job for Traefik, [Caddy](/docs/integration/go/caddy), and Nginx, and passes the user's groups and roles in request headers.

:::

## Step 1: Create the application in Casdoor

1. In the organization of your users, add an application (or open an existing one).
2. Add the callback of OAuth2 Proxy to **Redirect URLs**:

   ```text
   https://app.example.com/oauth2/callback
   ```

3. On the **OIDC/OAuth** tab, set:
   - **Token format**: `JWT-Standard`
   - **Token group format**: `Name (group)`, so groups arrive as `devs` instead of `my-org/devs`
4. Save, and note the **Client ID** and **Client secret**.

Why `JWT-Standard`: with the default `JWT` format, a user whose email is not verified can't sign in (OAuth2 Proxy rejects `email_verified: false`, and users created by an administrator usually have an unverified email), and the `roles` claim holds whole role objects instead of role names. See [What Casdoor sends](#what-casdoor-sends).

## Step 2: Configure OAuth2 Proxy

Create `oauth2-proxy.cfg`:

```toml
provider = "oidc"
oidc_issuer_url = "https://door.example.com"
client_id = "<client ID>"
client_secret = "<client secret>"
redirect_url = "https://app.example.com/oauth2/callback"
scope = "openid email profile"
email_domains = ["*"]

cookie_secret = "<random secret>"
http_address = "0.0.0.0:4180"
upstreams = ["http://127.0.0.1:8080"]

# Let in only members of the Casdoor group "devs"
oidc_groups_claim = "groups"
allowed_groups = ["devs"]
```

- `oidc_issuer_url` is the URL of Casdoor, without a trailing slash. It must be exactly the `issuer` shown at `https://door.example.com/.well-known/openid-configuration`. Casdoor builds the issuer from `origin` in `conf/app.conf`, or from the request's host when `origin` is empty; if the two differ, OAuth2 Proxy fails with `issuer did not match`.
- `cookie_secret` must be 16, 24, or 32 bytes, for example the output of `openssl rand -base64 32 | tr -- '+/' '-_'`.
- Keep the `profile` scope: Casdoor returns groups and roles from its userinfo endpoint only when `profile` is granted.
- `upstreams` is your application.

Start it:

```bash
oauth2-proxy --config oauth2-proxy.cfg
```

Open `https://app.example.com`. After signing in to Casdoor, members of `devs` reach the application and everyone else gets `403 Forbidden`.

### Restrict access by role instead

To check a Casdoor role instead of a group, read the `roles` claim:

```toml
oidc_groups_claim = "roles"
allowed_groups = ["admin"]
```

`allowed_groups` then holds role names, without the organization.

### Check what OAuth2 Proxy received

After signing in, open `https://app.example.com/oauth2/userinfo`. It shows the groups OAuth2 Proxy extracted:

```json
{"user":"d1a5f427-...","email":"alice@example.com","groups":["devs"],"preferredUsername":"alice"}
```

If `groups` is empty, the user has no group or role in Casdoor, or the claim name is wrong. If it contains long JSON strings like `{"owner":"my-org","name":"admin",...}`, the application still uses the default `JWT` format with `oidc_groups_claim = "roles"`; switch the format to `JWT-Standard`.

## What Casdoor sends

How the user's groups and roles reach OAuth2 Proxy depends on the application's **Token format**:

| Token format | `groups` | `roles` | Unverified email |
|---|---|---|---|
| `JWT-Standard` | from userinfo, group names | from userinfo, role names | signs in |
| `JWT-Custom` | in the token if `Groups` is in **Token fields** | in the token if you add a token attribute `roles` (see below) | signs in |
| `JWT` (default) | in the token | role objects, not usable for `allowed_groups` | rejected |
| `JWT-Empty` | in the token | from userinfo, role names | signs in |

With `JWT-Standard`, the token itself carries only standard OIDC claims. OAuth2 Proxy looks up any claim that is missing from the token at Casdoor's userinfo endpoint, so `groups` and `roles` still arrive, once per sign-in.

**Token group format** controls the group values in all formats: `ID` (default) gives `my-org/devs`, `Name` gives `devs`, and `Path` gives `my-org/parent/devs` for nested groups.

To put role names into the token itself, use `JWT-Custom` and add a row to **Token attributes**:

| Name | Category | Value | Type |
|---|---|---|---|
| `roles` | Existing Field | `Roles` | Array |

If **Token fields** is not empty, it also limits what the userinfo endpoint returns (see [Token fields](/docs/token/overview#restricting-fields-with-token-fields)). Include `Groups` (and `Roles` when you read roles from userinfo), or leave it empty.

If you must keep the default `JWT` format, add `insecure_oidc_allow_unverified_email = true` so users with an unverified email can sign in, and restrict by `groups` only.

## Pass the user to your application

OAuth2 Proxy adds these headers to requests it forwards (`pass_user_headers`, on by default):

| Header | Value |
|---|---|
| `X-Forwarded-User` | Casdoor user ID (the `sub` claim) |
| `X-Forwarded-Preferred-Username` | Casdoor user name, e.g. `alice` |
| `X-Forwarded-Email` | Email address |
| `X-Forwarded-Groups` | Groups (or roles), comma separated |

Make sure your application is only reachable through OAuth2 Proxy, otherwise anyone can send these headers directly.

To use OAuth2 Proxy as the forward-auth endpoint of Nginx (`auth_request`), Caddy (`forward_auth`), or Traefik (`forwardAuth`) instead of as a reverse proxy, point the proxy at its `/oauth2/auth` endpoint; see [Integrations](https://oauth2-proxy.github.io/oauth2-proxy/configuration/integrations/) in the OAuth2 Proxy documentation.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| `issuer did not match the issuer returned by provider` at startup | `oidc_issuer_url` differs from the `issuer` in Casdoor's discovery document. Set `origin` in Casdoor's `conf/app.conf` to its public URL and use the same value here. |
| `500` after sign-in, log says `email in id_token ... isn't verified` | The application uses the default `JWT` format and the user's email is not verified. Switch to `JWT-Standard`, or set `insecure_oidc_allow_unverified_email = true`. |
| `403 Forbidden` after sign-in | The user is not in `allowed_groups`. Open `/oauth2/userinfo` to see what OAuth2 Proxy received and compare it with **Token group format**. |
| Casdoor shows `Redirect URI: ... doesn't exist in the allowed Redirect URI list` | Add `https://app.example.com/oauth2/callback` to the application's **Redirect URLs**. |
