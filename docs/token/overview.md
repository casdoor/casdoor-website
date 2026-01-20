---
title: Overview
description: Introduction to tokens in Casdoor
keywords: [token, OAuth]
authors: [sh1luo]
---

Casdoor is built on OAuth and utilizes tokens as users' OAuth tokens.

## Access Token and ID Token

In Casdoor, the `access_token` and `id_token` are **identical**. Both tokens contain the same JWT payload with user information and claims. This is a design choice in Casdoor that simplifies token management.

This approach means:

- Both tokens contain the same user information and custom claims
- Both tokens can be used interchangeably for authentication and authorization
- The token format and expiration settings apply to both tokens equally
- You cannot configure separate claims for `access_token` and `id_token`

## Token Fields

The following are the available token fields in Casdoor:

- `Owner`
- `Name`
- `CreatedTime`
- `Application`
- `Organization`
- `User`
- `Code`
- `AccessToken`
- `ExpireIn` (Tokens will expire in hours)
- `Scope` (Scope of authorization)
- `TokenType` (e.g., `Bearer` type)

After logging into the application, there are three options to generate a JWT Token:

- `JWT`
- `JWT-Empty`
- `JWT-Custom`
- `JWT-Standard`

The options are as follows: JWT will generate a token containing all User fields, JWT-Empty will generate a token with all non-empty values for the user, and JWT-Custom will generate a token containing custom User Token fields (you can choose attributes in the Token fields). JWT-Standard will generate a token with some standard OIDC token fields include email, phone, gender and Address (Address value in other format is not standard).

All token formats now include the `email_verified` claim in accordance with OpenID Connect standards. This boolean field indicates whether the user's email address has been verified by Casdoor. External applications that rely on Casdoor as an identity provider can use this claim to determine email verification status without additional API calls.

![JWT-Custom](/img/token/overview/JWT-Custom.png)

## Custom Token Attributes

When using JWT-Custom format, you can define custom attributes with their data types. Each attribute has a **Type** field that controls how values are included in the JWT:

- **Array**: The attribute value will always be returned as an array, even if it contains a single element. This ensures compatibility with OIDC clients that expect array types for fields like roles, groups, or permissions.
- **String**: The attribute value will be returned as a single string (the first element if multiple values exist).

Empty attributes are automatically omitted from the token to keep the payload clean. When configuring attributes for roles, groups, or permissions, using the Array type is recommended for better OIDC compliance and compatibility with systems like Rancher and Keycloak.
