---
title: OAuth user mapping
description: Map OAuth provider claims to Casdoor user fields.
keywords: [OAuth, user mapping, claims, IDP, identity provider]
authors: [nomeguy]
---

Casdoor captures basic profile data (username, email, avatar) from OAuth sign-in. **User mapping** lets you map additional IdP claims to Casdoor user fields (phone, name, region, etc.).

## Supported Fields

Supported user fields for mapping:

- **phone** - Phone number
- **countryCode** - Country calling code
- **firstName** - First name
- **lastName** - Last name
- **region** - Geographic region
- **location** - Full location or address
- **affiliation** - Organization or company affiliation
- **title** - Job title or position
- **homepage** - Personal website URL
- **bio** - Biography or description
- **tag** - Custom tag or category
- **language** - Preferred language
- **gender** - Gender identity
- **birthday** - Date of birth
- **education** - Educational background
- **idCard** - ID card number
- **idCardType** - Type of ID card

Standard fields (id, username, displayName, email, avatarUrl) are handled automatically and don't need mapping configuration.

## Configuration

To configure user mapping:

1. Open **Providers** and select or create an OAuth provider (e.g. Okta, Azure AD B2C, Google).
2. Scroll to **User mapping** and add entries:
   - **User field**: The Casdoor user field you want to populate
   - **Claim name**: The exact claim name from your OAuth provider's response

For example, if your identity provider returns a claim named `given_name` and you want to map it to the user's first name in Casdoor:

- User field: `firstName`
- Claim name: `given_name`

## Provider-Specific Examples

### Okta

Okta returns claims like `given_name`, `family_name`, and `locale`. You might configure:

- `firstName` → `given_name`
- `lastName` → `family_name`
- `language` → `locale`

### Azure AD B2C

Azure AD B2C can return custom claims configured in your user flows. For instance:

- `phone` → `extension_PhoneNumber`
- `title` → `jobTitle`
- `location` → `city`

### Generic OAuth Providers

Most OAuth providers following standard protocols return claims in their userinfo endpoint. Check your provider's documentation to find available claim names.

## Behavior

The mapping works with these characteristics:

- **Non-destructive**: Existing user field values are preserved. Mapping only updates empty fields.
- **Automatic sync**: When users sign in via OAuth, the mapping is applied automatically.
- **Flexible**: Each provider can have its own unique mapping configuration.
- **Extra claims**: All claims from the provider are stored in the user's extra data, even if not explicitly mapped.

## Common Scenarios

### Enterprise SSO

When integrating with enterprise identity providers like Okta or Azure AD, you often want to sync organizational data:

```text
title → jobTitle
affiliation → companyName
region → officeLocation
```

### Social Login Enhancement

Social providers (e.g. Google, Facebook) provide basic profile data; additional details can be captured as follows:

```text
location → location
homepage → website
bio → about_me
```

### Multi-Provider Setup

Different providers may use different claim names for the same data. Configure each provider independently:

**Google OAuth**:

- `firstName` → `given_name`
- `lastName` → `family_name`

**GitHub OAuth**:

- `location` → `location`
- `homepage` → `blog`
- `bio` → `bio`

## Technical Details

When a user authenticates through OAuth:

1. Casdoor receives the OAuth token and fetches user info from the provider
2. The provider response includes standard fields plus extra claims
3. Standard fields (username, email, etc.) are processed first
4. User mapping rules are applied to populate additional fields from extra claims
5. All raw claims are stored in the user's OAuth extra data for reference

This ensures that user profiles in Casdoor stay synchronized with your identity provider while maintaining flexibility in how data is structured.
