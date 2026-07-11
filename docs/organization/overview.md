---
title: Overview
description: Organizations are the core unit in Casdoor for managing users and applications.
keywords: [organization, users, applications]
authors: [sh1luo]
---

An **organization** is the primary unit in Casdoor for managing users and applications. Once a user signs in to an organization, they can access all applications in that organization without signing in again.

When configuring [applications](/docs/application/config) and [providers](/docs/provider/overview), the chosen organization determines which users can access the application and which providers apply.

The organization’s display name (or its name if no display name is set) is used as the issuer in TOTP authenticator apps, helping users distinguish accounts when they have multiple TOTP entries.

LDAP can be configured per organization. For details, see [LDAP](/docs/ldap/overview).

Casdoor supports multiple password storage algorithms, configurable on the organization edit page. New organizations use **bcrypt** by default for secure password hashing.

| Name        | Algorithm | Description | Typical use |
| :---------- | :-------- | ----------- | :---------- |
| plain       | —         | Passwords stored in cleartext. **Not recommended for production.** | — |
| salt        | [SHA-256](https://github.com/casdoor/casdoor/blob/master/cred/sha256-salt.go) | [SHA-256](https://www.n-able.com/blog/sha-256-encryption) is a cryptographic hash function that produces a 256-bit value. | — |
| md5-salt    | [MD5](https://github.com/casdoor/casdoor/blob/master/cred/md5-user-salt.go) | [MD5](https://en.wikipedia.org/wiki/MD5) is a widely used but cryptographically weak hash (128-bit). | [Discuz!](https://www.discuz.vip/) |
| bcrypt      | [bcrypt](https://github.com/casdoor/casdoor/blob/master/cred/bcrypt.go) | [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) hashes and salts passwords securely. **Default for new organizations.** | [Spring Boot](https://spring.io/projects/spring-boot), [WordPress](https://stackoverflow.com/questions/1045988/what-type-of-hash-does-wordpress-use) |
| pbkdf2-salt | [SHA-256 and PBKDF2](https://github.com/casdoor/casdoor/blob/master/cred/pbkdf2-salt.go) | [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2) is a key derivation function resistant to dictionary and rainbow-table attacks. Use when importing users via the Keycloak syncer. | [Keycloak](http://keycloak.org/) |

## Password Salt Configuration

For algorithms that use salts (`salt`, `md5-salt`, `pbkdf2-salt`), set the **Password salt** on the organization edit page:

- **Organization-level salt**: When **Password salt** is set, all users in the organization share the same salt. Use this when you need consistency (e.g. compatibility with another system).
- **Per-user random salt**: When **Password salt** is left empty, Casdoor generates a unique random salt per user. This improves security by limiting the impact of precomputed hash tables.

**Recommendation:** Use per-user salt for new deployments to strengthen protection against rainbow-table attacks. Salts are stored with the password hash and managed by Casdoor.

## Permanent avatar storage

By default, when a user signs in via an OAuth provider (GitHub, Google, etc.), Casdoor stores the provider-hosted avatar URL directly. If the provider changes or removes that URL later, the avatar breaks.

Enable **Use permanent avatar** on the organization edit page to have Casdoor download the avatar from the OAuth provider and re-upload it to Casdoor's configured [storage provider](/docs/provider/storage/overview). The stored URL is then stable and independent of the original provider.

When this setting is on, Casdoor checks whether a permanent avatar already exists for the user before uploading. Only new or changed avatars trigger an upload.

## Use email as username

Organizations can enable **Use email as username** so that the user’s email is used as their username when the username field is not shown at sign-up. This simplifies registration by avoiding a separate username.

When enabled:

- At sign-up, if the username field is hidden, the email is used as the username.
- If a user changes their email, their username is updated to match.
- Email and username stay in sync.

To enable it, check **Use email as username** on the organization edit page.

## Navbar items

You can control which pages appear in the Casdoor navigation bar for members of an organization. On the organization edit page there are two independent trees:

- **Admin navbar items** (`navItems`) — the navigation shown to administrators. Defaults to **all** items.
- **User navbar items** (`userNavItems`) — the navigation shown to regular (non-admin) users in the user portal. Defaults to **none**, so by default regular users only see their own account pages.

Check or uncheck entries in the tree to choose the visible pages (Applications, Providers, Resources, Keys, Products, Orders, Webhooks, and so on). Selecting **all** shows every page.

When a regular user opens the Casdoor home page (`/`), they are redirected to the first page that is enabled for them, in this order:

1. **Apps** (`/apps`) if it is enabled (or if all items are enabled),
2. otherwise **Shortcuts** (`/shortcuts`) if it is enabled,
3. otherwise their **Account** page (`/account`).

This ensures users are never redirected to a page they are not allowed to see.

:::tip

Besides signing in through an application (which redirects to Casdoor for SSO), users can sign in directly on an organization’s login page: `/login/<organization_name>` (e.g. `https://door.casdoor.com/login/casbin` on the demo site).

If a user signs in via an organization-specific URL, Casdoor remembers that organization. When the session expires, they are redirected back to that organization’s login page for a simpler re-authentication flow.

:::
