---
title: Organizations
sidebar_label: Overview
description: An organization holds users and applications. This page describes the settings of an organization - password storage, avatars, usernames, soft deletion, and the navigation that members see.
keywords: [organization, users, applications]
authors: [sh1luo]
---

An organization is the unit in which Casdoor manages users and applications. A user who has signed in to an organization can open all applications of that organization without signing in again.

The organization that you select for an [application](/docs/application/config) or a [provider](/docs/provider/overview) determines which users can sign in to the application and where the provider is available.

You edit an organization in the Casdoor admin console under **User Management** > **Organizations**. The edit page has the tabs **Basic**, **Password type**, **Account items**, and **Advanced**. This page describes the general settings. Other pages of this section cover the [account page](/docs/organization/accountCustomization), [password complexity](/docs/organization/passwordComplexity), the [password obfuscator](/docs/organization/passwordObfuscator), the [theme](/docs/organization/customize-theme), [MFA items](/docs/organization/mfa-items), [groups](/docs/organization/organization-tree), and the [records](/docs/organization/records) of the audit log. You configure LDAP per organization as well. See [LDAP](/docs/ldap/overview).

## Sign-in page of an organization

Users usually sign in through an application. They can also sign in on the sign-in page of their organization, at `/login/<organization-name>`. On the demo site, for example: `https://door.casdoor.com/login/casbin`.

When a user signs in through this URL, Casdoor remembers the organization. When the session expires, Casdoor sends the user back to the sign-in page of the same organization.

## Organization names

The name of an organization can't be `admin` or `app`, because Casdoor uses these names internally. Creating or renaming an organization to one of them fails with `the organization name: <name> is reserved`.

## Logo in dark theme

On the **Basic** tab, turn on **Enable dark logo** to set **Logo dark**, a logo for the dark theme. The page shows a preview on a black background. Casdoor shows this logo in the sidebar of the Casdoor admin console when the console uses the dark theme. If **Logo dark** is empty, Casdoor shows **Logo**. Turning off **Enable dark logo** clears **Logo dark**.

The sign-in and sign-up pages don't use the logo of the organization. They show the logos of the application, see [Application terminology](/docs/application/terminology).

## Password storage

**Password type** sets the algorithm with which Casdoor stores the passwords of the organization's users. New organizations use `bcrypt`.

| Name        | Algorithm | Description | Typical use |
| :---------- | :-------- | ----------- | :---------- |
| plain       | —         | Passwords stored in cleartext. **Not recommended for production.** | — |
| salt        | [SHA-256](https://github.com/casdoor/casdoor/blob/master/cred/sha256-salt.go) | [SHA-256](https://www.n-able.com/blog/sha-256-encryption) is a cryptographic hash function that produces a 256-bit value. | — |
| md5-salt    | [MD5](https://github.com/casdoor/casdoor/blob/master/cred/md5-user-salt.go) | [MD5](https://en.wikipedia.org/wiki/MD5) is a widely used but cryptographically weak hash (128-bit). | [Discuz!](https://www.discuz.vip/) |
| bcrypt      | [bcrypt](https://github.com/casdoor/casdoor/blob/master/cred/bcrypt.go) | [bcrypt](https://en.wikipedia.org/wiki/Bcrypt) hashes and salts passwords securely. **Default for new organizations.** | [Spring Boot](https://spring.io/projects/spring-boot), [WordPress](https://stackoverflow.com/questions/1045988/what-type-of-hash-does-wordpress-use) |
| pbkdf2-salt | [SHA-256 and PBKDF2](https://github.com/casdoor/casdoor/blob/master/cred/pbkdf2-salt.go) | [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2) is a key derivation function resistant to dictionary and rainbow-table attacks. Use when importing users via the Keycloak syncer. | [Keycloak](http://keycloak.org/) |
| sha512-salt | [SHA-512](https://github.com/casdoor/casdoor/blob/master/cred/sha512-salt.go) | SHA-512 of the password and the salt, stored as a hexadecimal string. | — |
| argon2id | [Argon2id](https://github.com/casdoor/casdoor/blob/master/cred/argon2id.go) | [Argon2id](https://en.wikipedia.org/wiki/Argon2) with the default parameters of the `alexedwards/argon2id` library. The hash carries its own salt. To check an imported hash, Casdoor also accepts a hash of the password followed by the salt of the user or the organization, as some systems add a pepper this way. | — |
| pbkdf2-django | [PBKDF2 with SHA-256](https://github.com/casdoor/casdoor/blob/master/cred/pbkdf2_django.go) | The Django format `pbkdf2_sha256$<iterations>$<salt>$<hash>`. Casdoor hashes new passwords with 260000 iterations and reads the iterations and the salt from the stored hash. | [Django](https://www.djangoproject.com/) |

### Password salt {#password-salt-configuration}

The algorithms `salt`, `sha512-salt`, `md5-salt`, `pbkdf2-salt`, and `pbkdf2-django` use a salt. **Password salt** controls where the salt comes from:

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
- The user can no longer sign in, and Casdoor revokes the tokens and sessions of the user at once.
- To restore the user, clear **Is deleted** on the edit page of the user.
- To remove the user for good, delete the user a second time.

## When Casdoor revokes the tokens of a user

Casdoor expires all tokens of a user in every application when:

- The user is deleted or soft-deleted.
- An administrator turns on **Is forbidden** for the user. Casdoor also ends the sessions of the user, see [Forbid or delete a user](/docs/user/overview#forbid-or-delete-a-user).
- The password of the user changes through `POST /api/set-password`. This covers the account page, the edit page of the user, and the forgot-password page.

The applications of the user then have to sign the user in again.

## Sign-in across applications

On the **Basic** tab, **Enable exclusive signin across applications** limits the number of browser sessions that a user of the organization keeps over all applications. **Max sessions** appears when the switch is on and sets that number. Empty or 1 keeps only the current session. Casdoor applies the setting of the user's own organization, also when the user signs in through a shared application of another organization. See [Exclusive sign-in](/docs/application/exclusive-signin).

## Disable the admin console

Turn on **Disable console** on the **Basic** tab to use Casdoor only as an identity provider for the regular users of the organization. When a regular user signs in to the Casdoor admin console, Casdoor shows a page with HTTP 403, the title **Unauthorized**, the text "The Casdoor console is disabled for the regular users of this organization", and a **Logout** button.

The setting doesn't affect:

- The sign-in pages and the OAuth 2.0 and OpenID Connect (OIDC) flows of applications. Users sign in to your applications as before.
- Organization administrators and global administrators. They can use the console.
- The MFA setup page (`/mfa/setup`), so that users can still set up a required MFA method.

:::caution
Only the console frontend enforces **Disable console**. The Casdoor API stays available to the users with their own permissions.
:::

## Defaults for new applications

Two settings on the **Advanced** tab fill the token settings of applications that are created later in the organization. Existing applications don't change.

| Setting | Description |
|---|---|
| **Default token format** (`defaultTokenFormat`) | `JWT`, `JWT-Empty`, `JWT-Custom`, or `JWT-Standard`. Casdoor uses it for a new application that has no **Token format**. Empty means `JWT` |
| **Default token fields** (`defaultTokenFields`) | Claims for a new application that has no **Token fields**. The options are the same as for **Token fields** of an application, and you can type other values. Empty means no fields |

The new-application form of the console leaves both fields of the application empty, so it uses these defaults. Applications created through [Dynamic Client Registration](/docs/application/dynamic-client-registration) get them as well. See [Tokens](/docs/token/overview) for the token formats.

## Retention of tokens and records

Two settings on the **Advanced** tab control how long Casdoor keeps the data of the organization. A cleanup job applies them at startup and then every day at 00:00 server time.

| Setting | Description |
|---|---|
| **Token retention days** (`tokenRetentionDays`) | Casdoor deletes an expired token of the organization once it has been expired for longer than this number of days. 0 or empty means 30 days |
| **Record retention days** (`recordRetentionDays`) | Casdoor deletes the [records](/docs/organization/records) (audit log entries) of the organization that are older than this number of days. 0 or empty keeps the records forever, which is the default |

The **Record retention days** of the `built-in` organization also applies to old records that have no organization or the owner `anonymous`.

## Trusted database hosts

The [database syncers](/docs/syncer/Database) and [Casbin adapters](/docs/permission/adapter) of an organization other than `built-in` may only connect to databases on Internet addresses, and a syncer may not connect to the database server of Casdoor itself. **Trusted database hosts** (`trustedDbHosts`) on the **Advanced** tab lifts these limits for the hosts that it lists.

Enter a comma-separated list of `host` or `host:port` entries, for example `10.0.0.5,db.internal:3306`. An entry without a port matches every port. Casdoor compares host names without regard to case and ignores the brackets around IPv6 addresses.

Only a global administrator can change **Trusted database hosts**. Casdoor ignores changes by anyone else. A syncer can never use the database of Casdoor itself, even on a trusted host.

## LDAP passwords and RADIUS

Two switches on the **Advanced** tab enable features of the built-in servers for the users of the organization. Only a global administrator can change them, and both are off by default.

| Setting | Description |
|---|---|
| **Enable LDAP password** (`enableLdapPassword`) | The [built-in LDAP server](/docs/ldap/ldapserver) returns the password attributes `userPassword` and `sambaNTPassword` of the users, for example for Samba. When it is off, the server never returns them, even if **LDAP attributes** lists them. Turning it on asks for a confirmation: the server then exposes the password hashes, or the plain-text passwords if the organization stores them in plain text, and an NT hash is enough to sign in (pass-the-hash) |
| **Enable RADIUS** (`enableRadius`) | The [built-in RADIUS server](/docs/radius/overview) accepts authentication and accounting requests for the users of the organization. When it is off, the server rejects Access-Request packets and doesn't answer Accounting-Request packets. After an upgrade, turn it on for organizations that already use RADIUS |

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
