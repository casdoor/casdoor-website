---
sidebar_position: 1
title: Overview
---

Organization is the basic unit for Casdoor, it manages users and applications. If a user signed in to an organization, then he can access all applications belong to the organization without signing in again.

In the config of [applications](/docs/application/config) and [providers](/docs/provider/overview), choosing an organization is important, it determines whether a user can access the application using specific providers.

We can also set up LDAP in Casdoor, for more details, please see [LDAP](/docs/ldap/overview).

Casdoor provides multiple password storage algorithms that can be selected in the organization edit page.

|Name|Algorithm|Description|Scenario|
|:--:|:--:|--|:--:|
|plain|-|The password will be stored in cleartext. (default)|-|
|salt|[SHA256](https://github.com/casdoor/casdoor/blob/master/cred/sha256-salt.go)|[SHA-256](https://www.n-able.com/blog/sha-256-encryption) is a patented cryptographic hash function that outputs a value that is 256 bits long.|-|
|md5-salt|[MD5](https://github.com/casdoor/casdoor/blob/master/cred/md5-user-salt.go)|The [MD5 message-digest algorithm](https://en.wikipedia.org/wiki/MD5) is a cryptographically broken but still widely used hash function producing a 128-bit hash value. |[Discuz!](https://www.discuz.net/)|
|bcrypt|[bcrypt](https://github.com/casdoor/casdoor/blob/master/cred/bcrypt.go)|[bcrypt](https://en.wikipedia.org/wiki/Bcrypt) is a password-hashing function and is used to hash and salt passwords securely.|[Spring Boot](https://spring.io/projects/spring-boot), [WordPress](https://stackoverflow.com/questions/1045988/what-type-of-hash-does-wordpress-use)|
|pbkdf2-salt|[SHA256 and PBKDF2](https://github.com/casdoor/casdoor/blob/master/cred/pbkdf2-salt.go)|[PBKDF2](https://en.wikipedia.org/wiki/PBKDF2) is a simple cryptographic key derivation function, which is resistant to dictionary attacks and rainbow table attacks. It's originally implemented in Casdoor for Keycloak syncer.  Select this option if you import users by Keycloak syncer.|[Keycloak](http://keycloak.org/)|
