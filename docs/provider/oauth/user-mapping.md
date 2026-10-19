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

Casdoor fills the standard fields `id`, `username`, `displayName`, `email`, and `avatarUrl` without mapping. For the [OIDC type](/docs/provider/oauth/oidc) and the [custom types](/docs/provider/oauth/CustomProvider), you can also map these standard fields and `phone` to other claims.

## Provider types that support mapping

Casdoor can map only the claims that the provider type passes on to it. These types pass on the claims of the provider:

- `OIDC` and `Custom` to `Custom10`: all claims of the ID token and the user info response
- Okta and Azure AD B2C: all claims of the user
- The types that Casdoor connects through the Goth library, such as Apple, Azure AD, Slack, Discord, and Gitea: the raw user data of the provider
- DingTalk: only `title`, the job title from the corporate directory
- WeChat: only its own IDs, such as `wechat_unionid`
- Kwai: only `gender` and `city`

Other types, such as Google and GitHub, pass on no claims, so a mapping has no effect for them.

## Map a claim {#configuration}

The provider edit page shows **User mapping** for the `OIDC` type and the `Custom` to `Custom10` types. It has one row per field, from **ID** to **Title**: the standard fields, `phone`, `countryCode`, `firstName`, `lastName`, `region`, `location`, `affiliation`, and `title`.

1. In the Casdoor admin console, go to **Identity** > **Providers** and open the OAuth provider.
1. In **User mapping**, enter the exact name of the claim in the response of the provider next to each field that you want to fill. Leave the other fields empty.
1. Save the provider.

For example, to fill the first name from the claim `given_name`, enter `given_name` next to **First name**.

For other provider types, and for the fields without a row, such as `homepage` or `bio`, set the `userMapping` field of the provider through the API, for example with `POST /api/update-provider`. It is a JSON object from the user field to the claim name, such as `{"title": "title"}`.

## Examples {#provider-specific-examples}

| Provider | Field | Claim |
|---|---|---|
| Okta | `firstName` | `given_name` |
| Okta | `lastName` | `family_name` |
| Okta | `language` | `locale` |
| Azure AD B2C | `phone` | `extension_PhoneNumber`, a custom claim of the user flow |
| Azure AD B2C | `title` | `jobTitle` |
| Azure AD B2C | `location` | `city` |
| OIDC | `firstName` | `given_name` |
| OIDC | `lastName` | `family_name` |
| DingTalk | `title` | `title` |

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
1. Casdoor stores the claims that the provider type passes on in the user property `oauth_<provider-type>_extra`, as JSON, including the claims that you haven't mapped.

The mapping fills only fields that are empty. It doesn't overwrite values that the user already has.

## Verified email and phone

The `OIDC` and `Custom` types read two more keys of `userMapping`:

| Key | Default claim | Description |
|---|---|---|
| `emailVerified` | `email_verified` | The email address is verified if the claim is `true` |
| `phoneVerified` | `phone_number_verified` | The phone number is verified if the claim is `true` |

These keys have no row in **User mapping**. Without them, Casdoor reads the default claims of the ID token and the user info response. The values decide whether the `Email` and `Phone` binding rules can link the sign-in to an existing user, and whether the email address of a new user is verified. See [How Casdoor links accounts](/docs/provider/oauth/overview#automatic-account-linking).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
- [Okta](/docs/provider/oauth/okta)
- [Azure AD B2C](/docs/provider/oauth/azureADb2c)
