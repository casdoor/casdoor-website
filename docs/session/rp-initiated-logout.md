---
title: RP-initiated logout
description: Log a user out of Casdoor from a relying party using the OIDC RP-Initiated Logout endpoint.
keywords: [OIDC, RP-initiated logout, end session, logout, id_token_hint, post_logout_redirect_uri]
authors: [hsluoyz]
---

## Overview

**RP-Initiated Logout** lets a relying party (RP, i.e. your client application) log the user out of Casdoor and, optionally, redirect the browser back to the application afterward. It follows the [OpenID Connect RP-Initiated Logout 1.0](https://openid.net/specs/openid-connect-rpinitiated-1_0-final.html) specification.

This is the endpoint an OIDC client calls as its "end session" endpoint. It differs from [single sign-out](/docs/session/single-sign-out), which terminates every session in the organization at once.

## Endpoint

```text
GET  /api/logout
POST /api/logout
```

| Parameter | Required | Description |
|---|---|---|
| `id_token_hint` | Recommended | The ID token (`id_token`) that Casdoor previously issued to the user. When present, Casdoor uses it to identify and expire the exact token/session. |
| `post_logout_redirect_uri` | Optional | Where to send the browser after logout. Must be registered in the application's **Redirect URLs** list, otherwise the request is rejected. |
| `client_id` | Optional | The client ID of the application. Used to resolve the application when `id_token_hint` is omitted and the application cannot be determined from the current session. |
| `state` | Optional | An opaque value echoed back as a `state` query parameter appended to `post_logout_redirect_uri`. |

:::info

Per the OIDC spec, `id_token_hint` is **RECOMMENDED, not REQUIRED**. Casdoor therefore accepts logout requests without it and falls back to the user's current browser session. Some clients (for example, [Gitea](https://github.com/casdoor/casdoor/issues/5607)) only send `post_logout_redirect_uri` (optionally with `client_id`) — these requests are supported.

:::

## Behavior

Casdoor selects one of two paths depending on whether `id_token_hint` is provided.

### With `id_token_hint`

1. The token identified by `id_token_hint` is expired.
2. The current browser session is cleared and a back-channel logout notification is sent to other applications.
3. If `post_logout_redirect_uri` is present and valid for the application, the browser is redirected there (with `state` appended when supplied). Otherwise the endpoint returns `200 OK`.

### Without `id_token_hint`

1. If there is no active session, the endpoint returns `200 OK` and does nothing (the user is already logged out).
2. Otherwise Casdoor logs out the current session. The application is resolved from the session first, and falls back to the one identified by `client_id` when provided.
3. The session and its token are cleared and a back-channel logout notification is sent.
4. If `post_logout_redirect_uri` is present and valid for the application, the browser is redirected there (with `state` appended when supplied).
5. If no `post_logout_redirect_uri` is given, Casdoor returns `200 OK`, including the application's homepage URL when one is configured (except for the built-in application).

## Redirect URI validation

`post_logout_redirect_uri` is always validated against the target application's registered **Redirect URLs**. If the URI is not in that list — or the application cannot be resolved — Casdoor rejects the request with an error instead of redirecting. This prevents open-redirect abuse. Make sure your post-logout URL is added to the application's Redirect URLs.

## Examples

Log out using the ID token and return to the app:

```text
GET /api/logout?id_token_hint=<ID_TOKEN>&post_logout_redirect_uri=https://myapp.example.com/logged-out&state=xyz
```

Log out based on the current session, resolving the app by `client_id` (no `id_token_hint`):

```text
GET /api/logout?client_id=<CLIENT_ID>&post_logout_redirect_uri=https://myapp.example.com/logged-out
```

## See also

- [Single sign-out (SSO logout)](/docs/session/single-sign-out) — terminate every session in the organization at once.
- [Session management](/docs/session/management)
