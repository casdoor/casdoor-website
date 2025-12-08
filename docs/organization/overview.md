---
title: Overview
description: Casdoor basic unit — organization
keywords: [organization]
authors: [sh1luo]
---

An organization is the basic unit of Casdoor that manages users and applications. When a user signs in to an organization, they can access all applications belonging to that organization without needing to sign in again.

In the configuration of [applications](/docs/application/config) and [providers](/docs/provider/overview), selecting an organization is important, as it determines whether users can access the application using specific providers.

You can also set up LDAP in Casdoor. For more details, please see the [LDAP](/docs/ldap/overview) documentation.

Casdoor provides multiple password storage algorithms that can be selected on the organization edit page. New organizations use bcrypt by default for secure password hashing.

|Name|Algorithm|Description|Scenario|
|:--:|:--:|--|:--:|
|plain|-|The password will be stored in cleartext. Not recommended for production use.|-|
|salt|[SHA-256](https://github.com/casdoor/casdoor/blob/master/cred/sha256-salt.go)|[SHA-256](https://www.n-able.com/blog/sha-256-encryption) is a patented cryptographic hash function that outputs a value that is 256 bits long.|-|
|md5-salt|[MD5](https://github.com/casdoor/casdoor/blob/master/cred/md5-user-salt.go)|The [MD5 message-digest algorithm](https://en.wikipedia.org/wiki/MD5) is a cryptographically broken but still widely used hash function producing a 128-bit hash value. |[Discuz!](https://www.discuz.vip/)|
|bcrypt|[bcrypt](https://github.com/casdoor/casdoor/blob/master/cred/bcrypt.go)|[bcrypt](https://en.wikipedia.org/wiki/Bcrypt) is a password-hashing function used to hash and salt passwords securely. This is the default for new organizations.|[Spring Boot](https://spring.io/projects/spring-boot), [WordPress](https://stackoverflow.com/questions/1045988/what-type-of-hash-does-wordpress-use)|
|pbkdf2-salt|[SHA-256 and PBKDF2](https://github.com/casdoor/casdoor/blob/master/cred/pbkdf2-salt.go)|[PBKDF2](https://en.wikipedia.org/wiki/PBKDF2) is a simple cryptographic key derivation function that is resistant to dictionary attacks and rainbow table attacks. It was originally implemented in Casdoor for the Keycloak syncer. Select this option if you are importing users using the Keycloak syncer.|[Keycloak](http://keycloak.org/)|

## Password Salt Configuration

For algorithms that use salts (`salt`, `md5-salt`, `pbkdf2-salt`), Casdoor provides flexible salt configuration. On the organization edit page, you can set the `Password salt` field to define how passwords are salted:

- **Organization-level salt**: When the `Password salt` field is set, all users in the organization share the same salt value. This ensures consistency across the organization.
- **Per-user random salt**: When the `Password salt` field is left empty, Casdoor automatically generates a unique random salt for each user. This provides better security by preventing attackers from using precomputed hash tables across multiple users.

The per-user salt approach is recommended for new deployments as it provides stronger security against rainbow table attacks. Each user's salt is stored alongside their password hash and is automatically managed by Casdoor.

## Use Email as Username

Organizations can enable the "Use email as username" option, which automatically uses the user's email address as their username during signup when the username field is not visible. This simplifies the registration process by eliminating the need for users to choose a separate username.

When this option is enabled:

- During signup, if the username field is hidden, the email address becomes the username automatically
- When users reset their email address, their username is updated to match the new email
- The system maintains consistency between the email and username fields

To enable this feature, check the "Use email as username" option on the organization edit page.

:::tip

In addition to logging into Casdoor via an application (which redirects to Casdoor for SSO), Casdoor users can also choose to log in directly via the organization's login page: `/login/<organization_name>`, e.g., <https://door.casdoor.com/login/casbin> on the demo site.

:::
