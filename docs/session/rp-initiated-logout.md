---
title: RP-initiated logout (OIDC end-session endpoint)
sidebar_label: RP-initiated logout
description: What OpenID Connect RP-initiated logout is and how to use Casdoor's end-session endpoint - parameters, id_token_hint, post_logout_redirect_uri, what Casdoor revokes, and how it relates to back-channel logout.
keywords: [OIDC, RP-initiated logout, rp initiated logout, end session endpoint, end_session_endpoint, OIDC logout, logout, id_token_hint, post_logout_redirect_uri]
authors: [hsluoyz]
---

RP-initiated logout lets a relying party (RP), which is your client application, sign the user out of Casdoor and then send the browser back to the application. Casdoor implements [OpenID Connect RP-Initiated Logout 1.0](https://openid.net/specs/openid-connect-rpinitiated-1_0-final.html). OpenID Connect (OIDC) client libraries call this endpoint as the end-session endpoint.

## What RP-initiated logout is

Signing out of your application only ends the application's own session. The user is still signed in to the identity provider, so the next sign-in goes straight through without a password. RP-initiated logout closes that gap: when the user clicks **Sign out** in your application, the application clears its own session and redirects the browser to the identity provider's end-session endpoint, which ends the provider's session and redirects back.

OpenID Connect has three logout specifications that work together:

| Specification | Who starts it | What it does |
|---|---|---|
| RP-initiated logout | Your application, through the browser | Ends the session at the identity provider |
| Back-channel logout | The identity provider, server to server | Tells the other applications of the session to end their sessions |
| Front-channel logout | The identity provider, through the browser | The same, through hidden iframes in the browser |

Casdoor implements RP-initiated logout and back-channel logout: after a logout at this endpoint, it sends back-channel logout notifications to the other applications of the session. Its discovery document at `/.well-known/openid-configuration` announces the endpoint in `end_session_endpoint`, so most OIDC libraries find it without configuration.

A typical request:

```text
https://door.example.com/api/logout?id_token_hint=<ID token>&post_logout_redirect_uri=https%3A%2F%2Fapp.example.com%2F&state=af0ifjsldkj
```

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

1. Casdoor looks up the token whose ID token is `id_token_hint`. For a hint that an older version of Casdoor issued, when the access token and the ID token were the same, Casdoor looks the hint up as an access token. If it finds no token, Casdoor returns the error `Token not found, invalid accessToken`.
1. Casdoor expires that token. If the request has no session cookie, Casdoor takes the user from the token.
1. Casdoor clears the current browser session and sends a back-channel logout notification to the other applications, and a SAML logout request to the SAML applications of the session. If the application signed the user in through a Custom OAuth provider with a logout URL, Casdoor calls that URL with the access token of the token.
1. If `post_logout_redirect_uri` is present and valid for the application, Casdoor redirects the browser to it and appends `state` if the request contains it. Otherwise, Casdoor returns HTTP 200.

### Without an ID token hint

1. Casdoor takes the application from the session and falls back to the application that `client_id` identifies.
1. If the browser has no active session, the user is already signed out, for example because the session expired or ended in another tab. If the request has a `post_logout_redirect_uri` and Casdoor knows the application, Casdoor still checks the URL, redirects the browser to it, and appends `state`. Otherwise, Casdoor returns HTTP 200 and does nothing else.
1. Otherwise, Casdoor signs out the current session.
1. Casdoor clears the session and its token and sends a back-channel logout notification.
1. If `post_logout_redirect_uri` is present and valid for the application, Casdoor redirects the browser to it and appends `state` if the request contains it.
1. If the request has no `post_logout_redirect_uri`, Casdoor returns HTTP 200. The response includes the home page URL of the application if one is set, except for the built-in application.

### Audit records

Casdoor records every logout, also for `GET` requests when `logPostOnly` is `true`, and fires the webhooks of the logout. When the request has no session cookie, the record names the user of `id_token_hint`. Casdoor removes `id_token_hint` from the request URI that it stores in the record. See the [Configuration reference](/docs/basic/configuration).

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
