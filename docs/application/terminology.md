---
title: Application terminology
description: Reference for application configuration fields and options.
keywords: [terminology, application, config]
authors: [ErikQQY]
---

## Basic information

- **Name** — Internal application name.
- **CreatedTime** — When the application was created.
- **DisplayName** — Name shown to users.
- **Category** — `Default` (web apps) or `Agent` (M2M, e.g. MCP servers, API clients).
- **Type** — For Default: `All`, `OIDC`, `OAuth`, `SAML`, `CAS`. For Agent: `MCP`, `A2A`.
- **Logo**, **Title**, **Favicon** — Branding on login/sign-up pages.
- **Order** — Sort order in lists.
- **HomepageUrl**, **Description** — App homepage and description.
- **Organization** — Owning organization.
- **Tags** — Only users with one of these tags can sign in.
- **IsShared** — Whether the app is shared across organizations.

## Authentication and sign-in

- **EnablePassword** — Password sign-in.
- **EnableSignUp** — Allow self sign-up; if off, only admins can create accounts.
- **DisableSignin** — Turn off sign-in for this app.
- **EnableSigninSession**, **EnableAutoSignin** — Session and auto sign-in.
- **EnableCodeSignin** — Email/SMS verification code sign-in.
- **EnableExclusiveSignin** — One active session per user.
- **EnableWebAuthn** — WebAuthn (passwordless).
- **EnableLinkWithEmail** — Account linking via email.
- **SigninMethods**, **SigninItems** — Sign-in method and UI config.
- **SignupItems** — Registration form fields.
- **OrgChoiceMode** — How users pick organization at sign-in.

## OAuth and token

- **ClientId**, **ClientSecret** — OAuth credentials.
- **RedirectUris** — Allowed post-login redirect URIs.
- **ForcedRedirectOrigin** — Force redirect to a given origin.
- **GrantTypes** — Allowed OAuth grant types.
- **Scopes** — Custom scopes for Agent apps (name, display name, description); appear in OIDC discovery.
- **TokenFormat** — `JWT`, `JWT-Empty`, `JWT-Custom` (see [Token overview](/docs/token/overview)).
- **TokenSigningMethod** — e.g. RS256, HS256.
- **TokenFields**, **TokenAttributes** — Custom token content.
- **ExpireInHours**, **RefreshExpireInHours** — Access and refresh token lifetime.
- **CookieExpireInHours** — Session cookie lifetime (default 720 h). Without “Remember me”, session is limited to 24 h. `0` = use default.

## SAML

- `Cert`: Certificate used for SAML signing.
- `EnableSamlCompress`: Enable compression for SAML requests and responses.
- `EnableSamlC14n10`: Enable C14N 1.0 canonicalization for SAML.
- `EnableSamlPostBinding`: Use POST binding instead of GET for SAML responses.
- `DisableSamlAttributes`: Disable sending user attributes in SAML responses (only sends NameID).
- `EnableSamlAssertionSignature`: Enable digital signatures for SAML assertions. When disabled, only the response envelope is signed while maintaining compatibility with service providers that don't support assertion signatures.
- `UseEmailAsSamlNameId`: Use user's email as the SAML NameID instead of username.
- `SamlReplyUrl`: The ACS (Assertion Consumer Service) URL for SAML responses.
- `SamlAttributes`: Custom SAML attributes to include in the response.
- `SamlHashAlgorithm`: Hash algorithm for SAML signatures (e.g., SHA256).

## Providers

- **Providers** — OAuth, email, SMS, and other providers attached to the application.

## UI customization

- **HeaderHtml**, **FooterHtml** — Custom header/footer on login/sign-up pages.
- **SignupHtml**, **SigninHtml** — Custom HTML for sign-up/sign-in pages.
- **FormCss**, **FormCssMobile** — CSS for the login form (desktop and mobile).
- **FormOffset** — Vertical offset of the form.
- **FormSideHtml** — HTML beside the form.
- **FormBackgroundUrl**, **FormBackgroundUrlMobile** — Login page background image.
- **ThemeData** — Theme/color config.

## Security and access control

- **DefaultGroup** — Default group for new users.
- **IpRestriction**, **IpWhitelist** — IP allowlist (see [IP allowlist](/docs/ip-whitelist/ip-whitelist)).
- **FailedSigninLimit** — Failed attempts before lockout.
- **FailedSigninFrozenTime** — Lockout duration (seconds).

## External URLs

- **SigninUrl** — Custom sign-in URL for external auth.
- **SignupUrl** — External sign-up URL if not using Casdoor sign-up.
- **ForgetUrl** — Password recovery URL.
- **AffiliationUrl** — Affiliation or invitation URL.
- **TermsOfUse** — Terms of use URL or id.

## Other

- **CodeResendTimeout** — Seconds before another verification code can be requested (default: 60).
