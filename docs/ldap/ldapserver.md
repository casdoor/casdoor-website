---
title: LDAP server
description: Use Casdoor as an LDAP server for bind and search.
keywords: [LDAP, server, bind, search]
authors: [forestmgy]
---

Casdoor can act as a simple LDAP server for systems (e.g. Nexus) that use LDAP for authentication. It supports **bind** and **search** with Simple Authentication.

## Port

The LDAP server listens on port **389** by default. Change it via `ldapServerPort` in [conf/app.conf](https://github.com/casdoor/casdoor/blob/master/conf/app.conf#L27).

## Behavior

- User entries follow the **posixAccount** style.
- **Bind**: The server parses `cn` (username) and `ou` (organization). `dc` is ignored. It verifies the user with Casdoor and grants access for subsequent operations.
- **Search**: The server checks that the client has permission (from the bind) and returns results accordingly.

:::info
Only **Simple Authentication** is supported.
:::

## Bind

Use a DN in this form: `cn=<username>,ou=<organization>,dc=example,dc=com`.

Example: `cn=admin,ou=built-in,dc=example,dc=com`. Set the admin’s DN to this format, then bind with that DN and the user’s password. On success, the client is authorized for search.

## Search

After a successful bind:

- **One user** (e.g. Alice in `built-in`): Base DN `ou=built-in,dc=example,dc=com`, filter `cn=Alice`.
- **All users in an org** (e.g. `built-in`): Base DN `ou=built-in,dc=example,dc=com`, filter `cn=*`.
- **All users in all orgs** (if permitted): Base DN `ou=*,dc=example,dc=com`, filter `cn=*`.
- **Users in a group**: Use a filter such as `(memberOf=organization_name/group_name)`.

### User attributes

| Attribute | Description | Source |
|-----------|-------------|--------|
| `cn` | Common name | User name |
| `uid` | User ID | User id |
| `homeDirectory` | Home directory | `/home/{username}` |
| `mail` | Email | User email |
| `mobile` | Phone | User phone |
| `sn` | Surname | User last name |
| `givenName` | Given name | User first name |
| `memberOf` | Groups | User’s groups |

## RFC-style features

### Root DSE (baseDN="")

- **namingContexts**: `ldapsearch -x -H ldap://<casdoor-host>:389 -D "cn=admin,ou=built-in" -w <passwd> -b "" -s base "(objectClass=*)" namingContexts` — returns visible organization DNs.
- **subschemaSubentry**: `ldapsearch -x -H ldap://<casdoor-host>:389 -D "cn=admin,ou=built-in" -w <passwd> -b "" -s base "(objectClass=*)" subschemaSubentry` — returns `subschemaSubentry: cn=Subschema`.

### Schema

Query objectClasses: `ldapsearch -x -H ldap://<casdoor-host>:389 -D "cn=admin,ou=built-in" -w <passwd> -b "cn=Subschema" -s base "(objectClass=*)" objectClasses` — returns posixAccount and posixGroup definitions.

### POSIX filters

- `(objectClass=posixAccount)` — user list.
- `(objectClass=posixGroup)` — group list for an org (e.g. `-b "ou=<org>" "(objectClass=posixGroup)"`).

:::note
`(objectClass=posixGroup)` does not support combined filters like `(&(objectClass=posixGroup)(cn=<group>))`. Use `memberOf` to find members of a group.
:::
