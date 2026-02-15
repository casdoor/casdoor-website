---
title: Terminology Reference
description: Terminology reference
keywords: [terminology]
authors: [ErikQQY]
---

## Basic Information

- `Name`: The name of the created app.
- `CreatedTime`: The time when the application is created.
- `DisplayName`: The name which the application displays to the public.
- `Category`: Application category - either "Default" for standard web applications or "Agent" for machine-to-machine applications like MCP servers and API clients.
- `Type`: Application type based on category. For Default: "All", "OIDC", "OAuth", "SAML", "CAS". For Agent: "MCP", "A2A".
- `Logo`: Application logos will be displayed on the login and sign up pages.
- `Title`: Custom title for the login page.
- `Favicon`: The favicon URL for the application login page.
- `Order`: Display order of the application.
- `HomepageUrl`: The URL of the application's homepage.
- `Description`: Describes the application.
- `Organization`: The organization that the app belongs to.
- `Tags`: Only users with tags listed in the application tags can login.
- `IsShared`: Whether the application is shared across multiple organizations.

## Authentication & Sign-in

- `EnablePassword`: Enable password-based authentication.
- `EnableSignUp`: If users can sign up. If not, accounts must be created by administrators.
- `DisableSignin`: Disable sign-in for this application.
- `EnableSigninSession`: Enable session-based sign-in tracking.
- `EnableAutoSignin`: Enable automatic sign-in for users.
- `EnableCodeSignin`: Enable sign-in using verification codes sent via email or SMS.
- `EnableExclusiveSignin`: Only allow one active session per user.
- `EnableWebAuthn`: Enable WebAuthn for passwordless authentication.
- `EnableLinkWithEmail`: Allow users to link accounts using email verification.
- `SigninMethods`: Configuration of Sign-in Methods.
- `SigninItems`: Customizable UI elements on the sign-in page.
- `SignupItems`: Fields that need to be filled in when users register.
- `OrgChoiceMode`: How users choose their organization during sign-in.

## OAuth & Token Configuration

- `ClientId`: OAuth client ID.
- `ClientSecret`: OAuth client secret.
- `RedirectUris`: Casdoor will navigate to one of the URIs if the user logged in successfully.
- `ForcedRedirectOrigin`: Force redirect to a specific origin after authentication.
- `GrantTypes`: Supported OAuth grant types.
- `Scopes`: Custom OAuth scopes for Agent applications. Each scope includes a name, display name, and description. These scopes extend the standard OIDC scopes and appear in the OIDC discovery endpoint.
- `TokenFormat`: The format of the generated token. It can be in the following formats: `JWT` (containing all `User` fields), `JWT-Empty` (containing all non-empty values) or `JWT-Custom` customizing `User` fields inside access token. When using JWT-Custom, each attribute includes a Type field (`Array` or `String`) to control how values are returned in the token.
- `TokenSigningMethod`: Algorithm used to sign tokens (e.g., RS256, HS256).
- `TokenFields`: Custom fields to include in the token.
- `TokenAttributes`: Custom JWT attributes to include in tokens.
- `ExpireInHours`: Login will expire after hours.
- `RefreshExpireInHours`: Time in hours before refresh tokens expire.
- `CookieExpireInHours`: Session timeout in hours (default: 720 hours / 30 days). Controls how long users stay logged in via session cookies. When users log in without selecting "Remember me", the session is capped at 24 hours for security. If set to 0, uses the default of 720 hours.

## SAML Configuration

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

## Providers & Services

- `Providers`: Provide all kinds of services for the applications (such as OAuth, Email, SMS service).

## UI Customization

- `HeaderHtml`: Custom HTML to display in the header of login/signup pages.
- `FooterHtml`: Custom HTML to display in the footer of login/signup pages.
- `SignupHtml`: Custom HTML for the signup page.
- `SigninHtml`: Custom HTML for the signin page.
- `FormCss`: Custom CSS for the login form.
- `FormCssMobile`: Custom CSS for the login form on mobile devices.
- `FormOffset`: Vertical offset for the login form position.
- `FormSideHtml`: Custom HTML to display beside the login form.
- `FormBackgroundUrl`: Background image URL for the login page.
- `FormBackgroundUrlMobile`: Background image URL for the login page on mobile devices.
- `ThemeData`: Theme configuration data for customizing colors and styles.

## Security & Access Control

- `DefaultGroup`: Default group assigned to new users.
- `IpRestriction`: IP-based access restrictions for the application.
- `IpWhitelist`: List of allowed IP addresses.
- `FailedSigninLimit`: Number of failed sign-in attempts before account is temporarily locked.
- `FailedSigninFrozenTime`: Duration in seconds that an account remains locked after exceeding failed sign-in limit.

## External URLs

- `SigninUrl`: Custom sign-in URL if using external authentication.
- `SignupUrl`: If you provide a sign-up service independently outside of Casdoor, please fill in the URL here.
- `ForgetUrl`: Custom URL for password recovery page.
- `AffiliationUrl`: URL for affiliation or invitation system.
- `TermsOfUse`: URL or identifier for terms of use document.

## Other

- `CodeResendTimeout`: Time in seconds before users can request another verification code (default: 60).
