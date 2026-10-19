---
title: Application settings reference
sidebar_label: Application terminology
description: Reference for every field of the application edit page in the Casdoor admin console, organized by tab.
keywords: [terminology, application, config]
authors: [ErikQQY]
---

This page describes every field of the application edit page in the Casdoor admin console. The page has eight tabs, and the fields are listed by tab, in the order of the page.

## Basic

| Field | Description |
|---|---|
| **Name** | Internal application name. |
| **Display name** | Name shown to users. |
| **Category** | `Default` (web apps) or `Agent` (M2M, e.g. MCP servers, API clients). |
| **Type** | For Default: `All`, `OIDC`, `OAuth`, `SAML`, `CAS`. For Agent: `MCP`, `A2A`. |
| **Is shared** | Whether the app is shared across organizations (global admin only). |
| **Logo** | Branding image on the sign-in and sign-up pages (URL + preview). |
| **Enable dark logo** | Shows **Logo dark**. Turning it off clears **Logo dark**. |
| **Logo dark** | Logo that the sign-in, sign-up, and other authentication pages show in the dark theme (URL + preview on a black background). Casdoor never takes it from the organization. Without it, the pages show **Logo** in the dark theme too. The organization has its own **Logo dark** for the sidebar of the admin console. |
| **Title** | Page title shown on the sign-in and sign-up pages. |
| **Favicon** | Browser tab icon (URL + preview). |
| **Home** | Application homepage URL. |
| **Description** | Short description of the application. |
| **Organization** | Owning organization. |
| **Tags** | Only users with one of these tags can sign in. See [Application Tags](/docs/application/tags). |
| **Order** | Sort order in lists. |
| **Menu mode** | Layout of the edit page navigation: `Horizontal` or `Vertical`. |

## Authentication

| Field | Description |
|---|---|
| **Cookie expire** | Session cookie lifetime in hours (default: 720). Without "Remember me", the session is capped at 24 h regardless. |
| **Default group** | Group automatically assigned to new users signing up through this application, including both direct sign-up and OAuth-based registration. Providers and invitations can override this per-signup: the effective group follows the priority **invitation SignupGroup > provider SignupGroup > application Default group**. |
| **Default tag** | Tag automatically assigned to new users who sign up through this application. |
| **Enable signup** | Allow new accounts: on the signup page, by magic link or verification code, and on the first sign-in with one of the application's providers (whose **Can signup** is on). When off, only admins can create accounts. |
| **Disable self signup** | Shown when **Enable signup** is on. Users can no longer sign themselves up on the signup page, by magic link or by verification code, and the sign-in page hides the sign-up link. The signup page still works with an [invitation code](/docs/invitation/overview) from an admin, and the first sign-in with a provider still creates the account. Use it to close public signup while keeping just-in-time accounts for SSO, e.g. new employees signing in with Lark or DingTalk for the first time. |
| **Disable signin** | Disable all sign-in for this application. |
| **Enable guest signin** | Allow unauthenticated guest access by presenting `code=guest-user` to the token endpoint. Requires **Enable signup** to be on as well. Not available for the `built-in` organization. See [Guest authentication](/docs/how-to-connect/guest-auth). |
| **Enable exclusive signin** | Limit the number of active sessions of each user in this application. A new sign-in ends the older sessions and expires their tokens. See [Allow one session per user](/docs/application/exclusive-signin). |
| **Max sessions** | Shown when **Enable exclusive signin** is on. The number of sessions a user may keep in the application, `1` by default. |
| **Signin session** | Enable persistent sign-in session across browser restarts. |
| **Auto signin** | Automatically sign the user back in on revisit. Requires **Signin session** to be enabled first. |
| **Enable Email linking** | Allow linking OAuth accounts to existing accounts by matching email. |
| **Signup URL** | External sign-up URL, replaces Casdoor's built-in sign-up page. |
| **Signin URL** | External sign-in URL, replaces Casdoor's built-in sign-in page. |
| **Forget URL** | Custom password recovery URL. |
| **Affiliation URL** | Affiliation or invitation URL. |

## OIDC/OAuth

| Field | Description |
|---|---|
| **Client ID** | OAuth 2.0 client identifier. |
| **Client secret** | OAuth 2.0 client secret. |
| **Redirect URLs** | Allowed redirect URLs after sign-in. Casdoor checks them for the authorization code flow, the implicit flow, and the CAS `service` parameter. See [Redirect URL matching](#redirect-url-matching). |
| **Forced redirect origin** | When set, Casdoor forces all redirects to this origin. |
| **Grant types** | Enabled OAuth grant types: Authorization Code, Password, Client Credentials, Token, ID Token, Refresh Token, Device Code, Token Exchange, JWT Bearer. |
| **Scopes** | Custom scopes for Agent-category apps (name, display name, description); exposed in OIDC discovery. |
| **Federated credentials** | External OpenID Connect (OIDC) issuers whose tokens Casdoor accepts as a credential of this application, without a client secret. Each row has **Issuer**, **JWKS URL**, **Subject**, **Audience**, and **User**. See [Federated credentials](/docs/how-to-connect/oauth#federated-credentials). |
| **Token format** | `JWT`, `JWT-Empty`, `JWT-Custom`, or `JWT-Standard`. A new application gets the **Default token format** of its organization. See [Token overview](/docs/token/overview). |
| **Token signing method** | Signing algorithm: RS256, RS512, ES256, ES384, or ES512. |
| **Token group format** | How the `groups` claim of every token format and the `groups` of `/api/userinfo` name each group: `ID (org/group)` (the default), `Path (org/parent/group)`, or `Name (group)`. `Path` replaces the removed `useGroupPathInToken` setting of `conf/app.conf`. |
| **Token fields** | User fields included in the token payload (available when format is `JWT-Custom`). This list also acts as a whitelist for the `/userinfo` endpoint: when non-empty, only the listed fields are returned. Leave empty to include the full set. A new application gets the **Default token fields** of its organization. See [Token overview](/docs/token/overview#restricting-fields-with-token-fields). |
| **Token attributes** | Custom claims added to the token (available when format is `JWT-Custom`). Each row has a **Category**, **Value**, and **Type**. See [Token attributes](#token-attributes) |
| **Token expire** | Access token lifetime in hours. |
| **Refresh token expire** | Refresh token lifetime in hours. |

### Token attributes

Each row of **Token attributes** adds a custom claim to the token and has a **Category**, a **Value**, and a **Type**:

| Category | Value | Result |
|---|---|---|
| `Static Value` | A template string. It supports `${user.xxx}` substitution | **Type** sets whether the claim is a `String` or an `Array` |
| `Existing Field` | A user field from the list: `Owner`, `Name`, `Id`, `DisplayName`, `Avatar`, `Email`, `Phone`, `Tag`, `Roles`, `Permissions`, `permissionNames`, or `Groups`. Reference a key of the properties map as `Properties.<key>` | Casdoor reads the field from the user when it issues the token |

### Redirect URL matching

Casdoor accepts a redirect URL when it equals an entry of **Redirect URLs**, or when it matches an entry by these rules:

| Entry | Matches |
|---|---|
| A full URL, such as `https://example.com/callback` | The same scheme, port, and path. The host is the same host or a subdomain of it, so the entry also allows `https://api.example.com/callback`. |
| A loopback URL, such as `http://localhost/callback` or `http://127.0.0.1/callback` | The same URL on any port, as RFC 8252 requires for native applications. |
| A host without a scheme, such as `example.com` or `example.com/callback` | `http` and `https` URLs on the host or its subdomains, with the path of the entry, or with any path if the entry has none. `.example.com` matches only the subdomains. |
| Anything else | The entry is a regular expression that must match the whole URL. |

Casdoor always rejects `javascript:`, `data:`, and `vbscript:` URLs. `localhost`, `127.0.0.1`, and `casdoor-authenticator` URLs need an entry like any other URL.

## SAML

| Field | Description |
|---|---|
| **SAML reply URL** | Assertion Consumer Service (ACS) URL where Casdoor posts the SAML response. |
| **Enable SAML compression** | Compress SAML requests and responses. |
| **Enable SAML C14N10** | Use C14N 1.0 canonicalization when signing SAML documents. |
| **SAML C14N prefix** | Namespace prefix list used for the C14N 1.0 canonicalization (applies when **Enable SAML C14N10** is on; default `xs`). |
| **Use Email as NameID** | Use the user's email address as the SAML `NameID` instead of username. |
| **Enable SAML POST binding** | Use HTTP POST binding instead of Redirect binding. |
| **SAML hash algorithm** | Signature hash algorithm: SHA1, SHA256, or SHA512. |
| **Disable SAML attributes** | Send only `NameID` in the assertion, omit all other user attributes. |
| **Enable SAML assertion signature** | Sign the assertion element in addition to the response envelope. |
| **SAML attributes** | Custom attribute statements included in the SAML assertion (available when Disable SAML attributes is off). |
| **SAML metadata** | Read-only XML metadata for this application; includes a button to copy the metadata URL. |

## Providers

| Field | Description |
|---|---|
| **Providers** | OAuth, email, SMS, storage, and other providers attached to this application. Controls which sign-in methods and integrations are available. |

Each OAuth and SAML provider in the **Providers** table has the following settings:

| Column | Description |
|---|---|
| **Can sign up** | Allow new users to register via this provider. |
| **Can sign in** | Allow existing users to sign in via this provider. |
| **Can unlink** | Allow users to unlink this provider from their account. |
| **Binding rule** | Fields used to link a new external identity to an existing Casdoor user of the organization, checked in order: the first match links the accounts. `Email` matches only an email address that the provider reports as verified, and only a user whose email is verified or who didn't sign up through an application. `Phone` matches only a verified phone number, with its country code. `Name` matches the username, case-insensitively. The default is `Email`, `Phone`. An empty list turns linking off. If no rule links the identity and its email or phone already belongs to another user, Casdoor refuses the sign-up. A linked user completes their multi-factor authentication (MFA) before the sign-in finishes. See [How Casdoor links accounts](/docs/provider/oauth/overview#automatic-account-linking). |
| **Country codes** | Restrict phone-based providers to specific country calling codes. |
| **Prompted** | Show a prompt asking users to bind this provider after sign-up if they haven't already. |
| **Signup group** | Override the application's Default group for users who sign up via this provider. |

## UI Customization

| Field | Description |
|---|---|
| **Org choice mode** | How users select their organization at sign-in: `None`, `Select` (dropdown), or `Input` (text field). |
| **Signin methods** | Ordered list of sign-in methods shown on the sign-in page (e.g. Password, Verification code, WebAuthn). |
| **Signup HTML** | Custom HTML injected into the sign-up page. See [Custom HTML and scripts](/docs/application/terminology#custom-html). |
| **Signin HTML** | Custom HTML injected into the sign-in page. See [Custom HTML and scripts](/docs/application/terminology#custom-html). |
| **Page HTML** | Custom HTML injected into the page `<head>` (e.g. meta tags, analytics snippets, or custom styles) for all of the application's pages. |
| **Signin items** | Configure which fields and controls appear on the sign-in form. |
| **Signup items** | Configure the registration form fields (visible only when **Enable signup** is on). |
| **Background URL** | Desktop sign-in page background image (URL + preview). |
| **Background URL Mobile** | Mobile sign-in page background image (URL + preview). |
| **Custom CSS** | CSS applied to the sign-in form (desktop). |
| **Custom CSS Mobile** | CSS applied to the sign-in form (mobile). |
| **Form position** | Horizontal alignment of the sign-in form: Left, Center, Right, or Enable side panel. |
| **Side panel HTML** | HTML shown in the panel beside the sign-in form (visible when Form position is set to **Enable side panel**). |
| **Theme** | Use the organization theme or define a custom color/border-radius for this application. |
| **Header HTML** | Custom HTML injected into the page `<head>` of the sign-in and sign-up pages. |
| **Footer HTML** | Custom HTML rendered below the sign-in and sign-up forms. The footer of the Casdoor admin console shows the **Footer HTML** of the default application of the signed-in user's organization, in place of "Powered by Casdoor". |

### Custom HTML and scripts {#custom-html}

Casdoor treats the custom HTML of an application differently depending on its organization:

- Applications of the `built-in` organization: Casdoor renders the HTML as it is, and `<script>` elements run.
- Applications of other organizations: Casdoor removes scripts, event handlers, and other active content before it renders the HTML. Links that open in another window get `rel="noopener noreferrer"`.

This applies to **Header HTML**, **Page HTML**, **Footer HTML**, **Side panel HTML**, **Signin HTML**, **Signup HTML**, custom sign-in items, and the `Text` sign-up items. The footer of the admin console is always sanitized, also for `built-in`. What organization admins may save in these fields is limited too. See [What organization admins can put in custom HTML and CSS](/docs/application/ui-customization#organization-admin-limits).

## Security

| Field | Description |
|---|---|
| **Token cert** | Certificate used to sign tokens issued by this application. |
| **Client cert** | Certificate used to verify client identity. For mutual TLS it authenticates the client connection; for the JWT Bearer grant (RFC 7523), the public key in this certificate is used to verify the client's JWT assertion signature. |
| **Failed signin limit** | Number of consecutive failed sign-in attempts before the account is locked. This limit also applies to the `/api/verify-code` OTP endpoint: too many wrong verification codes will temporarily block that user+destination combination using the same counter and freeze time. |
| **Failed signin frozen time** | Lock duration in minutes after hitting the failed sign-in limit. |
| **Code resend timeout** | Seconds a user must wait before requesting another verification code (default: 60; set to 0 for the global default). |
| **IP whitelist** | Comma-separated list of allowed IP addresses or CIDR ranges. Overrides the organization-level whitelist. See [IP allowlist](/docs/ip-whitelist). |
| **Terms of Use** | URL or path to the terms-of-use page (up to 200 characters). An HTML file can be uploaded directly and the resulting URL is filled in automatically. |

## Reverse Proxy

| Field | Description |
|---|---|
| **Domain** | Primary domain this application is served on (e.g. `blog.example.com`). |
| **Other domains** | Additional domains that should route to this application. |
| **Upstream host** | The backend service address Casdoor proxies requests to (e.g. `localhost:8080`). |
| **SSL mode** | TLS handling: `None`, `HTTP`, `HTTPS and HTTP`, or `HTTPS Only`. |
| **SSL cert** | Certificate used for HTTPS when acting as a reverse proxy. |

## See also

- [Application configuration](/docs/application/config)
- [UI customization](/docs/application/ui-customization)
- [Tokens](/docs/token/overview)
- [Use Casdoor as a SAML identity provider](/docs/how-to-connect/saml/overview)
