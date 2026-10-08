---
title: RP-initiated logout
description: Reference for the OpenID Connect end-session endpoint of Casdoor, which a client application calls to sign the user out of Casdoor.
keywords: [OIDC, RP-initiated logout, end session, logout, id_token_hint, post_logout_redirect_uri]
authors: [hsluoyz]
---

RP-initiated logout lets a relying party (RP), which is your client application, sign the user out of Casdoor and then send the browser back to the application. Casdoor implements [OpenID Connect RP-Initiated Logout 1.0](https://openid.net/specs/openid-connect-rpinitiated-1_0-final.html). OpenID Connect (OIDC) client libraries call this endpoint as the end-session endpoint.

To end every session of a user in the organization at once, use [single sign-out](/docs/session/single-sign-out) instead.

## Endpoint

```text
GET  /api/logout
POST /api/logout
```

## Parameters

| Parameter | Required | Description |
|---|---|---|
| `id_token_hint` | Recommended | The ID token (`id_token`) that Casdoor previously issued to the user. When present, Casdoor uses it to identify and expire the exact token/session. |
| `post_logout_redirect_uri` | Optional | Where to send the browser after logout. Must be registered in the application's **Redirect URLs** list, otherwise the request is rejected. |
| `client_id` | Optional | The client ID of the application. Used to resolve the application when `id_token_hint` is omitted and the application cannot be determined from the current session. |
| `state` | Optional | An opaque value echoed back as a `state` query parameter appended to `post_logout_redirect_uri`. |

:::info
The OIDC specification recommends `id_token_hint` but doesn't require it. Casdoor accepts requests without it and then signs out the current browser session. Some clients, such as [Gitea](https://github.com/casdoor/casdoor/issues/5607), send only `post_logout_redirect_uri`, optionally with `client_id`.
:::

## Behavior

What Casdoor does depends on whether the request contains `id_token_hint`.

### With an ID token hint

1. Casdoor expires the token that `id_token_hint` identifies.
1. Casdoor clears the current browser session and sends a back-channel logout notification to the other applications.
1. If `post_logout_redirect_uri` is present and valid for the application, Casdoor redirects the browser to it and appends `state` if the request contains it. Otherwise, Casdoor returns HTTP 200.

### Without an ID token hint

1. If the browser has no active session, the user is already signed out. Casdoor returns HTTP 200 and does nothing else.
1. Otherwise, Casdoor signs out the current session. It takes the application from the session and falls back to the application that `client_id` identifies.
1. Casdoor clears the session and its token and sends a back-channel logout notification.
1. If `post_logout_redirect_uri` is present and valid for the application, Casdoor redirects the browser to it and appends `state` if the request contains it.
1. If the request has no `post_logout_redirect_uri`, Casdoor returns HTTP 200. The response includes the home page URL of the application if one is set, except for the built-in application.

## Redirect URL validation {#redirect-uri-validation}

Casdoor always checks `post_logout_redirect_uri` against the **Redirect URLs** of the application. If the URL isn't in that list, or if Casdoor can't determine the application, Casdoor rejects the request with an error and doesn't redirect. This prevents open redirects.

Add your post-logout URL to the **Redirect URLs** of the application.

## Examples

Sign out with the ID token and return to the application:

```text
GET /api/logout?id_token_hint=<ID_TOKEN>&post_logout_redirect_uri=https://myapp.example.com/logged-out&state=xyz
```

Sign out the current session without an ID token, and identify the application by its client ID:

```text
GET /api/logout?client_id=<CLIENT_ID>&post_logout_redirect_uri=https://myapp.example.com/logged-out
```

## See also

- [Single sign-out](/docs/session/single-sign-out)
- [Session management](/docs/session/management)
- [Connect a standard OIDC client](/docs/how-to-connect/oidc-client)
