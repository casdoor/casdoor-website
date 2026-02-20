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

## Token Lifecycle and Invalidation

Tokens in Casdoor follow a specific lifecycle from creation through invalidation. When a user logs in, Casdoor generates both an access token and a refresh token. The access token is used for authentication, while the refresh token allows obtaining new access tokens without requiring the user to log in again.

During SSO logout, Casdoor invalidates tokens by setting their `ExpiresIn` field to 0 or a negative value. Both the token introspection endpoint and the refresh token endpoint validate this field before processing requests. If a token has `ExpiresIn <= 0`, it's considered invalid and rejected with an error, even if the token itself is structurally valid and hasn't reached its original expiration time. This approach ensures that refresh tokens cannot be used to obtain new access tokens after logout, providing complete session termination across all token types.

## Token Format Options

After logging into the application, there are three options to generate a JWT Token:

- `JWT`
- `JWT-Empty`
- `JWT-Custom`
- `JWT-Standard`

The token format options behave as follows:

- **JWT**: includes all User fields in the token payload
- **JWT-Empty**: includes only non-empty User fields
- **JWT-Custom**: includes the custom User Token fields you select (you can choose attributes in the Token fields)
- **JWT-Standard**: includes standard OIDC claims (email, phone, gender, address) in OIDC-compliant format

:::info

**Only JWT-Standard produces an OIDC-compliant `address` claim.** In JWT, JWT-Empty, and JWT-Custom formats the `address` field is included as a raw `[]string` array (the user's `Address` property), which does not conform to the OIDC specification. If your application parses the `address` claim as an object, use the **JWT-Standard** token format.

:::

## OIDC Address Claim

The [OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#AddressClaim) defines the `address` claim as a JSON object with the following fields:

| Field | Description |
|---|---|
| `formatted` | Full mailing address, formatted for display |
| `street_address` | Street address component (may include house number, street name, P.O. box, etc.) |
| `locality` | City or locality |
| `region` | State, province, prefecture, or region |
| `postal_code` | Zip code or postal code |
| `country` | Country name |

### How Casdoor maps user data to the address claim

Casdoor stores address information in two separate user fields:

- **`Location`** (string): A general location string (e.g., `"New York"`). This field is used as the plain-string `address` value returned by the `/api/userinfo` endpoint when the `address` scope is requested.
- **`Address`** (array of strings): An array of address-line strings (e.g., `["123 Main St", "Anytown, NY 12345", "USA"]`). This field is the source for the OIDC-compliant `address` claim in **JWT-Standard** tokens.

### JWT-Standard address claim

When the `address` scope is requested and the **JWT-Standard** format is used, Casdoor returns the following object in the token:

```json
{
  "address": {
    "street_address": "123 Main St\nAnytown, NY 12345\nUSA",
    "formatted": "",
    "locality": "",
    "region": "",
    "postal_code": "",
    "country": ""
  }
}
```

The `street_address` field contains the user's `Address` array entries joined with newlines. The remaining OIDC address sub-fields (`formatted`, `locality`, `region`, `postal_code`, `country`) are currently empty because Casdoor stores the entire address as free-form lines in the `Address` array rather than in per-component fields.

### Non-standard formats (JWT, JWT-Empty, JWT-Custom)

In JWT, JWT-Empty, and JWT-Custom token formats, the `address` field is the raw `Address` property of the user object — a **JSON array of strings** — not an OIDC address object:

```json
{
  "address": ["123 Main St", "Anytown, NY 12345", "USA"]
}
```

OIDC clients that expect the `address` claim to be a JSON object (per the OIDC spec) will fail to parse this. Switch to **JWT-Standard** if you need a spec-compliant `address` claim in the token.

![JWT-Custom](/img/token/overview/JWT-Custom.png)

### Standard OIDC Claims

All JWT token formats include these standard OpenID Connect claims in the payload:

- `sub` - Subject identifier (unique user ID)
- `email` - User's email address
- `email_verified` - Boolean indicating whether the email has been verified by Casdoor
- `name` or `preferred_username` - User's display name
- `picture` or `avatar` - User's avatar URL

The `email_verified` claim enables external applications using Casdoor as an identity provider to determine email verification status directly from the token without additional API calls.

## Custom Token Attributes

When using JWT-Custom format, you can define custom attributes with their data types. Each attribute has a **Type** field that controls how values are included in the JWT:

- **Array**: The attribute value will always be returned as an array, even if it contains a single element. This ensures compatibility with OIDC clients that expect array types for fields like roles, groups, or permissions.
- **String**: The attribute value will be returned as a single string (the first element if multiple values exist).

Empty attributes are automatically omitted from the token to keep the payload clean. When configuring attributes for roles, groups, or permissions, using the Array type is recommended for better OIDC compliance and compatibility with systems like Rancher and Keycloak.
