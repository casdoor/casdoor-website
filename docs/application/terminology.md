---
title: Terminology Reference
description: Terminology reference
keywords: [terminology]
authors: [ErikQQY]
---

- `Name`: The name of the created app.
- `CreatedTime`: The time when the application is created.
- `DisplayName`: The name which the application displays to the public.
- `Logo`: Application logos will be displayed on the login and sign up pages.
- `HomepageUrl`: The URL of the application's homepage.
- `Description`: Describes the application.
- `Tags`: Only users with tags listed in the application tags can login.
- `Organization`: The organization that the app belongs to.
- `EnableSignUp`: If users can sign up. If not, accounts of the application.
- `SigninMethods`: Configuration of Sign-in Methods
- `SignupItems`: Fields that need to be filled in when users register.
- `Providers`: Provide all kinds of services for the applications (such as OAuth, Email, SMS service).
- `ClientId`: OAuth client ID.
- `ClientSecret`: OAuth client secret.
- `RedirectUris`: Casdoor will navigate to one of the URIs if the user logged in successfully.
- `TokenFormat`: The format of the generated token. It can be in the following formats: `JWT` (containing all `User` fields), `JWT-Empty` (containing all non-empty values) or `JWT-Custom` customizing `User` fields inside access token. When using JWT-Custom, each attribute includes a Type field (`Array` or `String`) to control how values are returned in the token.
- `ExpireInHours`: Login will expire after hours.
- `CookieExpireInHours`: Session timeout in hours (default: 720 hours / 30 days). Controls how long users stay logged in via session cookies. When users log in without selecting "Remember me", the session is capped at 24 hours for security. If set to 0, uses the default of 720 hours.
- `SigninUrl`:
- `SignupUrl`: If you provide a sign-up service independently outside of Casdoor, please fill in the URL here.
- `ForgetUrl`: Same as `SignupUrl`.
- `AffiliationUrl`:
