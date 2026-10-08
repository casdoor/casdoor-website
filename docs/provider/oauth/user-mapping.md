---
title: Map OAuth claims to user fields
sidebar_label: OAuth user mapping
description: Fill in Casdoor user fields, such as the phone number or the job title, from the claims that an OAuth provider returns.
keywords: [OAuth, user mapping, claims, IDP, identity provider]
authors: [nomeguy]
---

This guide explains how to map the claims that an OAuth provider returns to the fields of a Casdoor user. Casdoor reads the basic profile, such as the username, the email address, and the avatar, on its own. User mapping fills in more fields, such as the phone number, the name, or the region.

---

#### Learning outcomes

- Map a claim of a provider to a user field.
- Know when Casdoor applies the mapping and which values it overwrites.

#### What you need

- An [OAuth provider](/docs/provider/oauth/overview) in Casdoor
- The names of the claims that the provider returns. See the documentation of the provider

---

## Fields that you can map {#supported-fields}

| Field | Description |
|---|---|
| `phone` | Phone number |
| `countryCode` | Country calling code |
| `firstName` | First name |
| `lastName` | Last name |
| `region` | Geographic region |
| `location` | Location or address |
| `affiliation` | Organization or company |
| `title` | Job title |
| `homepage` | URL of a personal website |
| `bio` | Biography |
| `tag` | Tag |
| `language` | Preferred language |
| `gender` | Gender |
| `birthday` | Date of birth |
| `education` | Education |
| `idCard` | ID card number |
| `idCardType` | Type of ID card |

Casdoor fills the standard fields `id`, `username`, `displayName`, `email`, and `avatarUrl` without mapping.

## Map a claim {#configuration}

1. In the Casdoor admin console, go to **Identity** > **Providers** and open the OAuth provider.
1. In **User mapping**, add a row for each field:

   | Column | Value |
   |---|---|
   | User field | The Casdoor field to fill |
   | Claim name | The exact name of the claim in the response of the provider |

1. Save the provider.

For example, to fill the first name from the claim `given_name`, map `firstName` to `given_name`.

## Examples {#provider-specific-examples}

| Provider | Field | Claim |
|---|---|---|
| Okta | `firstName` | `given_name` |
| Okta | `lastName` | `family_name` |
| Okta | `language` | `locale` |
| Azure AD B2C | `phone` | `extension_PhoneNumber`, a custom claim of the user flow |
| Azure AD B2C | `title` | `jobTitle` |
| Azure AD B2C | `location` | `city` |
| Google | `firstName` | `given_name` |
| Google | `lastName` | `family_name` |
| GitHub | `location` | `location` |
| GitHub | `homepage` | `blog` |
| GitHub | `bio` | `bio` |

For an enterprise identity provider, typical mappings carry organizational data:

```text
title → jobTitle
affiliation → companyName
region → officeLocation
```

For a social provider, they carry profile details:

```text
location → location
homepage → website
bio → about_me
```

Each provider has its own mapping. Configure it per provider, because providers name the same data differently.

## How Casdoor applies the mapping {#behavior}

When a user signs in through the provider:

1. Casdoor fetches the user information from the provider.
1. Casdoor fills the standard fields.
1. Casdoor applies the mapping and fills the mapped fields from the claims.
1. Casdoor stores all claims of the response in the extra data of the user, including the claims that you haven't mapped.

The mapping fills only fields that are empty. It doesn't overwrite values that the user already has.

## See also

- [OAuth providers](/docs/provider/oauth/overview)
- [Okta](/docs/provider/oauth/okta)
- [Azure AD B2C](/docs/provider/oauth/azureADb2c)
