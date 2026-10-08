---
title: Organizations
sidebar_label: Overview
description: An organization holds users and applications. This page describes the settings of an organization - password storage, avatars, usernames, soft deletion, and the navigation that members see.
keywords: [organization, users, applications]
authors: [sh1luo]
---

An organization is the unit in which Casdoor manages users and applications. A user who has signed in to an organization can open all applications of that organization without signing in again.

The organization that you select for an [application](/docs/application/config) or a [provider](/docs/provider/overview) determines which users can sign in to the application and where the provider is available.

You edit an organization in the Casdoor admin console under **User Management** > **Organizations**. This page describes the general settings. Other pages of this section cover the [account page](/docs/organization/accountCustomization), [password complexity](/docs/organization/passwordComplexity), the [password obfuscator](/docs/organization/passwordObfuscator), the [theme](/docs/organization/customize-theme), [MFA items](/docs/organization/mfa-items), and [groups](/docs/organization/organization-tree). You configure LDAP per organization as well. See [LDAP](/docs/ldap/overview).

## Sign-in page of an organization

Users usually sign in through an application. They can also sign in on the sign-in page of their organization, at `/login/<organization-name>`. On the demo site, for example: `https://door.casdoor.com/login/casbin`.

When a user signs in through this URL, Casdoor remembers the organization. When the session expires, Casdoor sends the user back to the sign-in page of the same organization.

## Password storage

**Password type** sets the algorithm with which Casdoor stores the passwords of the organization's users. New organizations use `bcrypt`.

| Name        | Algorithm | Description | Typical use |
| :---------- | :-------- | ----------- | :---------- |
| plain       | —         | Passwords stored in cleartext. **Not recommended for production.** | — |
| salt        | [SHA-256](https://github.com/casdoor/casdoor/blob/master/cred/sha256-salt.go) | [SHA-256](https://www.n-able.com/blog/sha-256-encryption) is a cryptographic hash function that produces a 256-bit value. | — |
| md5-salt    | [MD5](https://github.com/casdoor/casdoor/blob/master/cred/md5-user-salt.go) | [MD5](https://en.wikipedia.org/wiki/MD5) is a widely used but cryptographically weak hash (128-bit). | [Discuz!](https://www.discuz.vip/) |
| bcrypt      | [bcrypt](https://github.com/casdoor/casdoor/blob/master/cred/bcrypt.go) | [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) hashes and salts passwords securely. **Default for new organizations.** | [Spring Boot](https://spring.io/projects/spring-boot), [WordPress](https://stackoverflow.com/questions/1045988/what-type-of-hash-does-wordpress-use) |
| pbkdf2-salt | [SHA-256 and PBKDF2](https://github.com/casdoor/casdoor/blob/master/cred/pbkdf2-salt.go) | [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2) is a key derivation function resistant to dictionary and rainbow-table attacks. Use when importing users via the Keycloak syncer. | [Keycloak](http://keycloak.org/) |

### Password salt {#password-salt-configuration}

The algorithms `salt`, `md5-salt`, and `pbkdf2-salt` use a salt. **Password salt** controls where the salt comes from:

| **Password salt** | Salt | Use it when |
|---|---|---|
| Set | All users of the organization share this salt | You need hashes that are compatible with another system |
| Empty | Casdoor generates a random salt for each user and stores it with the password hash | You set up a new organization. This is the recommended setting, because it limits the use of precomputed hash tables |

## Permanent avatars {#permanent-avatar-storage}

When a user signs in through an OAuth provider, such as GitHub or Google, Casdoor stores the URL of the avatar at the provider. If the provider later changes or removes that URL, the avatar breaks.

Turn on **Use permanent avatar** to make Casdoor download the avatar and upload it to its own [storage provider](/docs/provider/storage/overview). The URL then stays stable. Casdoor uploads an avatar only when it is new or has changed.

## Email as username {#use-email-as-username}

Turn on **Use Email as username** to register users without a separate username. Then:

- At sign-up, if the username field is hidden, the email address becomes the username.
- When a user changes the email address, the username changes with it.

## Soft deletion

By default, deleting a user removes the user from the database.

With **Soft deletion** turned on, deleting a user only marks the user as deleted:

- The user stays in the user list, with **Is deleted** selected and a **Deleted time**.
- The user can no longer sign in, and Casdoor revokes the tokens and sessions of the user.
- To restore the user, clear **Is deleted** on the edit page of the user.
- To remove the user for good, delete the user a second time.

## Navigation of the admin console {#navbar-items}

Two settings control which pages members of the organization see in the navigation of the Casdoor admin console:

| Setting | Applies to | Default |
|---|---|---|
| **Admin navbar items** (`navItems`) | Administrators | All pages |
| **User navbar items** (`userNavItems`) | Regular users | No pages. Regular users see only their own account pages |

Select the pages in each tree, for example Applications, Providers, Resources, Keys, Products, Orders, and Webhooks.

When a regular user opens the Casdoor home page (`/`), Casdoor redirects the user to the first of the following pages that the user may see:

1. **Apps** (`/apps`)
1. **Shortcuts** (`/shortcuts`)
1. The account page (`/account`)

## Issuer name in authenticator apps

Casdoor uses the display name of the organization, or its name if it has no display name, as the issuer of time-based one-time passwords (TOTP). Users who have several entries in an authenticator app recognize the account by it.

## See also

- [Core concepts](/docs/basic/core-concepts)
- [Users](/docs/user/overview)
- [Applications](/docs/application/overview)
