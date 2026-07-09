---
title: Application terminology
description: Reference for application configuration fields and options, organized by tab.
keywords: [terminology, application, config]
authors: [ErikQQY]
---

The application edit page is split into eight tabs. Fields below are grouped by tab.

## Basic

- **Name** — Internal application name.
- **Display name** — Name shown to users.
- **Category** — `Default` (web apps) or `Agent` (M2M, e.g. MCP servers, API clients).
- **Type** — For Default: `All`, `OIDC`, `OAuth`, `SAML`, `CAS`. For Agent: `MCP`, `A2A`.
- **Is shared** — Whether the app is shared across organizations (global admin only).
- **Logo** — Branding image on login/sign-up pages (URL + preview).
- **Title** — Page title shown on sign-in/sign-up pages.
- **Favicon** — Browser tab icon (URL + preview).
- **Home** — Application homepage URL.
- **Description** — Short description of the application.
- **Organization** — Owning organization.
- **Tags** — Only users with one of these tags can sign in. See [Application Tags](/docs/application/tags).
- **Order** — Sort order in lists.
- **Menu mode** — Layout of the edit page navigation: `Horizontal` or `Vertical`.

## Authentication

- **Cookie expire** — Session cookie lifetime in hours (default: 720). Without "Remember me", the session is capped at 24 h regardless.
- **Default group** — Group automatically assigned to new users signing up through this application, including both direct sign-up and OAuth-based registration. Providers and invitations can override this per-signup: the effective group follows the priority **invitation SignupGroup > provider SignupGroup > application Default group**.
- **Enable signup** — Allow self sign-up. When off, only admins can create accounts.
- **Disable signin** — Disable all sign-in for this application.
- **Enable guest signin** — Allow unauthenticated guest access by presenting `code=guest-user` to the token endpoint. Requires **Enable signup** to be on as well. Not available for the `built-in` organization. See [Guest authentication](/docs/how-to-connect/guest-auth).
- **Enable exclusive signin** — Enforce one active session per user.
- **Signin session** — Enable persistent sign-in session across browser restarts.
- **Auto signin** — Automatically sign the user back in on revisit. Requires **Signin session** to be enabled first.
- **Enable Email linking** — Allow linking OAuth accounts to existing accounts by matching email.
- **Signup URL** — External sign-up URL, replaces Casdoor's built-in sign-up page.
- **Signin URL** — External sign-in URL, replaces Casdoor's built-in sign-in page.
- **Forget URL** — Custom password recovery URL.
- **Affiliation URL** — Affiliation or invitation URL.

## OIDC/OAuth

- **Client ID** — OAuth 2.0 client identifier.
- **Client secret** — OAuth 2.0 client secret.
- **Redirect URLs** — Allowed post-login redirect URIs. Matching is URL-based: scheme, port, and path must match exactly, and the host may be the configured host or any subdomain of it (e.g. configuring `https://example.com/callback` also allows `https://api.example.com/callback`). Entries that are not valid URLs are matched as anchored regular expressions.
- **Forced redirect origin** — When set, Casdoor forces all redirects to this origin.
- **Grant types** — Enabled OAuth grant types: Authorization Code, Password, Client Credentials, Token, ID Token, Refresh Token, Device Code, JWT Bearer.
- **Scopes** — Custom scopes for Agent-category apps (name, display name, description); exposed in OIDC discovery.
- **Token format** — `JWT`, `JWT-Empty`, `JWT-Custom`, or `JWT-Standard`. See [Token overview](/docs/token/overview).
- **Token signing method** — Signing algorithm: RS256, RS512, ES256, ES384, or ES512.
- **Token fields** — Additional user fields included in the token payload (available when format is `JWT-Custom`).
- **Token attributes** — Custom claims added to the token (available when format is `JWT-Custom`). Each row has a **Category**, **Value**, and **Type**:
  - **Category: Static Value** — the Value field is a template string (supports `${user.xxx}` substitution). Type controls whether the claim is a `String` or `Array`.
  - **Category: Existing Field** — the Value field is a dropdown of known user fields (`Owner`, `Name`, `Id`, `DisplayName`, `Email`, `Phone`, `Tag`, `Roles`, `Permissions`, `Groups`, etc.). Casdoor reads the field directly from the user object at token issuance. Properties sub-fields are referenced as `Properties.<key>`.
- **Token expire** — Access token lifetime in hours.
- **Refresh token expire** — Refresh token lifetime in hours.

## SAML

- **SAML reply URL** — Assertion Consumer Service (ACS) URL where Casdoor posts the SAML response.
- **Enable SAML compression** — Compress SAML requests and responses.
- **Enable SAML C14N10** — Use C14N 1.0 canonicalization when signing SAML documents.
- **Use Email as NameID** — Use the user's email address as the SAML `NameID` instead of username.
- **Enable SAML POST binding** — Use HTTP POST binding instead of Redirect binding.
- **SAML hash algorithm** — Signature hash algorithm: SHA1, SHA256, or SHA512.
- **Disable SAML attributes** — Send only `NameID` in the assertion, omit all other user attributes.
- **Enable SAML assertion signature** — Sign the assertion element in addition to the response envelope.
- **SAML attributes** — Custom attribute statements included in the SAML assertion (available when Disable SAML attributes is off).
- **SAML metadata** — Read-only XML metadata for this application; includes a button to copy the metadata URL.

## Providers

- **Providers** — OAuth, email, SMS, storage, and other providers attached to this application. Controls which sign-in methods and integrations are available.

Each OAuth / Web3 / SAML provider entry in the provider table has additional per-provider settings:

| Column | Description |
|--------|-------------|
| **Can sign up** | Allow new users to register via this provider. |
| **Can sign in** | Allow existing users to sign in via this provider. |
| **Can unlink** | Allow users to unlink this provider from their account. |
| **Binding rule** | Fields used to match an OAuth identity to an existing Casdoor user. Available fields: `Email`, `Phone`, `Name`. Checked in order — the first match links the accounts. Default is `Email`, `Phone`, `Name`. Only applies to OAuth, Web3, and SAML providers. |
| **Country codes** | Restrict phone-based providers to specific country calling codes. |
| **Prompted** | Show a prompt asking users to bind this provider after sign-up if they haven't already. |
| **Signup group** | Override the application's Default group for users who sign up via this provider. |

## UI Customization

- **Org choice mode** — How users select their organization at sign-in: `None`, `Select` (dropdown), or `Input` (text field).
- **Signin methods** — Ordered list of sign-in methods shown on the login page (e.g. Password, Verification code, WebAuthn).
- **Signup HTML** — Custom HTML injected into the sign-up page.
- **Signin HTML** — Custom HTML injected into the sign-in page.
- **Signin items** — Configure which fields and controls appear on the sign-in form.
- **Signup items** — Configure the registration form fields (visible only when **Enable signup** is on).
- **Background URL** — Desktop login page background image (URL + preview).
- **Background URL Mobile** — Mobile login page background image (URL + preview).
- **Custom CSS** — CSS applied to the login form (desktop).
- **Custom CSS Mobile** — CSS applied to the login form (mobile).
- **Form position** — Horizontal alignment of the login form: Left, Center, Right, or Enable side panel.
- **Side panel HTML** — HTML shown in the panel beside the login form (visible when Form position is set to **Enable side panel**).
- **Theme** — Use the organization theme or define a custom color/border-radius for this application.
- **Header HTML** — Custom HTML rendered above the login/sign-up form.
- **Footer HTML** — Custom HTML rendered below the login/sign-up form.

## Security

- **Token cert** — Certificate used to sign tokens issued by this application.
- **Client cert** — Certificate used to verify client identity. For mutual TLS it authenticates the client connection; for the JWT Bearer grant (RFC 7523), the public key in this certificate is used to verify the client's JWT assertion signature.
- **Failed signin limit** — Number of consecutive failed sign-in attempts before the account is locked. This limit also applies to the `/api/verify-code` OTP endpoint: too many wrong verification codes will temporarily block that user+destination combination using the same counter and freeze time.
- **Failed signin frozen time** — Lock duration in minutes after hitting the failed sign-in limit.
- **Code resend timeout** — Seconds a user must wait before requesting another verification code (default: 60; set to 0 for the global default).
- **IP whitelist** — Comma-separated list of allowed IP addresses or CIDR ranges. Overrides the organization-level whitelist. See [IP allowlist](/docs/ip-whitelist/ip-whitelist).
- **Terms of Use** — URL or path to the terms-of-use page (up to 200 characters). An HTML file can be uploaded directly and the resulting URL is filled in automatically.

## Reverse Proxy

- **Domain** — Primary domain this application is served on (e.g. `blog.example.com`).
- **Other domains** — Additional domains that should route to this application.
- **Upstream host** — The backend service address Casdoor proxies requests to (e.g. `localhost:8080`).
- **SSL mode** — TLS handling: `None`, `HTTP`, `HTTPS and HTTP`, or `HTTPS Only`.
- **SSL cert** — Certificate used for HTTPS when acting as a reverse proxy.
