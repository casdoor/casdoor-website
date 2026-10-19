---
title: LDAP server
description: Use Casdoor as an LDAP server for bind and search.
keywords: [LDAP, server, bind, search, Samba, POSIX]
authors: [forestmgy]
---

Casdoor can act as a simple LDAP server for systems (e.g. Nexus) that use LDAP for authentication. It supports **bind** and **search** with Simple Authentication.

## Port

The LDAP server listens on port **389** by default. Change it via `ldapServerPort` in [conf/app.conf](https://github.com/casdoor/casdoor/blob/master/conf/app.conf#L27).

## Behavior

- User entries follow the **posixAccount** style and also carry the Samba object classes. See [User attributes](#user-attributes).
- **Bind**: The server parses `cn` (username) and `ou` (organization). `dc` is ignored. It verifies the user with Casdoor and grants access for subsequent operations.
- **Search**: The server checks that the client has permission (from the bind) and returns results accordingly.

:::info
Only **Simple Authentication** is supported.
:::

## Bind

Use a DN in this form: `cn=<username>,ou=<organization>,dc=example,dc=com`.

Example: `cn=admin,ou=built-in,dc=example,dc=com`. Set the admin’s DN to this format, then bind with that DN and the user’s password. On success, the client is authorized for search. If the DN has no `ou`, Casdoor uses the `built-in` organization.

Attribute names in the DN are case-insensitive, so `CN=admin,OU=built-in` works too. Spaces around names and values are ignored. Values stay case-sensitive: `ou=Built-in` is a different organization from `ou=built-in`.

A bind with a correct password still fails with `invalidCredentials` when:

- The user has multi-factor authentication (MFA) turned on. The error reads "the user has MFA enabled and cannot bind with a password". An LDAP bind can't ask for a second factor.
- The user's organization has **Disable signin** turned on.
- The user must change the password first, or must set up the MFA that the organization requires. The user has to finish that on the Casdoor sign-in page before an LDAP bind works.

## Search

After a successful bind:

- **One user** (e.g. Alice in `built-in`): Base DN `ou=built-in,dc=example,dc=com`, filter `cn=Alice`.
- **All users in an org** (e.g. `built-in`): Base DN `ou=built-in,dc=example,dc=com`, filter `cn=*`.
- **All users in all orgs** (if permitted): Base DN `ou=*,dc=example,dc=com`, filter `cn=*`.
- **Users in a group**: Use a filter with the Casdoor group ID, such as `(memberOf=<organization>/<group-name>)`.
- **One user by POSIX ID**: Use a filter such as `(uidNumber=10001)`.

### User attributes

| Attribute | Description | Source |
|-----------|-------------|--------|
| `cn` | Common name | User name |
| `uid` | User ID | User id |
| `uidNumber` | POSIX user ID | The user's **UID number**. When it's `0`, a number derived from the username. |
| `gidNumber` | POSIX primary group ID | Same value as `uidNumber` |
| `homeDirectory` | Home directory | `/home/{username}` |
| `mail` | Email | User email |
| `mobile` | Phone | User phone |
| `sn` | Surname | User last name |
| `givenName` | Given name | User first name |
| `memberOf` | Groups | One DN per group of the user, in the form `cn=<group-name>,ou=<group-organization>,<dc-parts>` |
| `loginShell` | Login shell | `user.Properties["loginShell"]`, defaults to `/bin/bash` |
| `gecos` | GECOS (full name) | `user.DisplayName`, falls back to `user.Name` |
| `sshPublicKey` | SSH public key | `user.Properties["sshPublicKey"]`, omitted if empty |
| `userPassword` | Password | Returned only when the organization has **Enable LDAP password** on. See [Password attributes](#password-attributes). |

The Samba attributes are listed in [Samba and SMB clients](#samba-and-smb-clients).

In `memberOf`, `<group-organization>` is the organization that owns the group, and `<dc-parts>` are the `dc=` parts of the search base DN. For example, a search with base DN `ou=my-org,dc=example,dc=com` returns `memberOf: cn=dev,ou=my-org,dc=example,dc=com` for the group `my-org/dev`. If the base DN has no `dc=` parts, the value is `cn=<group-name>,ou=<group-organization>`.

All entries carry the object classes `posixAccount`, which PAM and NSS require for Linux authentication, and `sambaSamAccount` and `sambaIdmapEntry`.

The organization's **LDAP attributes** setting can limit which attributes are returned. See [LDAP server attribute filtering](/docs/ldap/config#ldap-server-attribute-filtering).

## Linux machine login

Casdoor’s LDAP server exposes `posixAccount`-compatible entries, so Linux hosts can authenticate users directly against Casdoor via standard tools such as `sssd`, `nss-ldap`, or `pam_ldap`.

To configure per-user values for `loginShell` and `sshPublicKey`, set them in the user’s **Properties** field (key-value map):

```json
{
  "loginShell": "/bin/zsh",
  "sshPublicKey": "ssh-ed25519 AAAA..."
}
```

If `loginShell` is not set, `/bin/bash` is used. If `sshPublicKey` is absent, the attribute is omitted from the LDAP entry entirely.

### Set POSIX user and group IDs

By default, Casdoor derives `uidNumber` from the username and the group's `gidNumber` from the group name. The numbers stay the same as long as the names don't change. To publish fixed numbers, for example to match file ownership on existing hosts:

1. On the user edit page, set **UID number**. Leave it as `0` to keep the derived number. Only administrators can see and change this field.
1. On the group edit page, set **GID number**. Leave it as `0` to keep the derived number.

If **UID number** isn't on the user edit page, add it to the organization's **Account items**. LDAP sync can also fill **UID number**. See [Sync POSIX IDs](/docs/ldap/config#sync-posix-ids). A database syncer can map a column to the `UidNumber` field.

## Samba and SMB clients

Every user entry is also a Samba account (`sambaSamAccount`, `sambaIdmapEntry`), so SMB clients that read accounts from LDAP, such as Synology DSM and TrueNAS, can use Casdoor as their directory.

| Attribute | Source |
|-----------|--------|
| `sambaSID` | User property `sambaSID`. Otherwise `<domain-sid>-<uidNumber>`, where `<domain-sid>` is `S-1-5-21-` followed by three numbers derived from the organization name. |
| `sambaPrimaryGroupSID` | User property `sambaPrimaryGroupSID`. Otherwise the same value as the derived `sambaSID`. |
| `sambaAcctFlags` | `[U          ]`, or `[DU         ]` when the user is forbidden or deleted |
| `sambaPwdLastSet` | Unix time of the user's last password change, otherwise of the user's creation time. It's never `0`, which Samba reads as "must change password at next logon". |
| `sambaDomainName` | Organization name |
| `sambaLMPassword` | Placeholder of 32 `X` characters. The LAN Manager hash isn't supported. |
| `sambaPasswordHistory` | Placeholder of 64 `0` characters |
| `sambaNTPassword` | Returned only when the organization has **Enable LDAP password** on. See [Password attributes](#password-attributes). |

You can search on `sambaSID`, `sambaPrimaryGroupSID`, `sambaAcctFlags`, `sambaDomainName` and `sambaPwdLastSet` with equality terms, for example `(sambaDomainName=built-in)`. They follow the same rules as the other computed attributes in [POSIX filters](#posix-filters).

To set a user's SID or NT hash, add the `sambaSID`, `sambaPrimaryGroupSID` or `sambaNTPassword` key to the user's **Properties** field.

### Password attributes

The built-in LDAP server returns the password attributes `userPassword` and `sambaNTPassword` only when the organization has **Enable LDAP password** turned on. While it's off, these attributes are never returned, even when the client asks for them or the organization's **LDAP attributes** lists them.

Only global administrators can turn on **Enable LDAP password**, on the organization edit page. Casdoor asks for confirmation first.

:::danger
With **Enable LDAP password** on, every client that can search the organization's users reads their password hashes, or the passwords themselves if the organization stores them in plain text. An NT hash can be used to sign in to SMB services directly (pass-the-hash). Turn it on only when an integration such as Samba needs it.
:::

- `userPassword`: The stored password with a prefix for the organization's **Password type**: `{sha256}` for `salt`, `{md5}` for `md5-salt`, `{pbkdf2}` for `pbkdf2-salt`, and `{<password-type>}` for the other types. With `plain`, the value is the password itself.
- `sambaNTPassword`: The user property `sambaNTPassword` in uppercase, if set. Otherwise Casdoor computes the NT hash, but only when the organization's **Password type** is `plain`. For other password types, set the property, or the attribute is omitted.

## RFC-style features

### Root DSE (baseDN="")

- **namingContexts**: `ldapsearch -x -H ldap://<casdoor-host>:389 -D "cn=admin,ou=built-in" -w <passwd> -b "" -s base "(objectClass=*)" namingContexts` — returns visible organization DNs.
- **subschemaSubentry**: `ldapsearch -x -H ldap://<casdoor-host>:389 -D "cn=admin,ou=built-in" -w <passwd> -b "" -s base "(objectClass=*)" subschemaSubentry` — returns `subschemaSubentry: cn=Subschema`.

### Schema

Query objectClasses: `ldapsearch -x -H ldap://<casdoor-host>:389 -D "cn=admin,ou=built-in" -w <passwd> -b "cn=Subschema" -s base "(objectClass=*)" objectClasses` — returns the `posixAccount`, `posixGroup`, `sambaSamAccount` and `sambaIdmapEntry` definitions.

### POSIX filters

- `(objectClass=posixAccount)` — user list. `(objectClass=sambaSamAccount)` and `(objectClass=sambaIdmapEntry)` return the same list.
- `(objectClass=posixGroup)` — group list for an org (e.g. `-b "ou=<org>" "(objectClass=posixGroup)"`).

`uidNumber`, `gidNumber`, `homeDirectory` and the Samba attributes are computed by the server. An equality term on one of them works on its own or inside `&`, for example `(&(objectClass=posixAccount)(uidNumber=10001))`. Inside `|` or `!`, or as a substring term such as `(uidNumber=100*)`, it makes the search return no entries.

A group search is one whose filter is `(objectClass=posixGroup)`, or an `&` filter that contains it. Casdoor checks the rest of the filter against each group entry, so you can combine `&`, `|`, `!`, equality, presence and substring terms on `cn`, `gidNumber`, `memberUid` and `objectClass`. Group values are compared case-insensitively. Examples:

- `(&(objectClass=posixGroup)(gidNumber=12345))` — the group with that GID.
- `(&(objectClass=posixGroup)(cn=dev*))` — groups whose name starts with `dev`.
- `(&(objectClass=posixGroup)(memberUid=alice))` — the groups of the user `alice`.

Each group entry has the DN `cn=<group-name>,<base-dn>` and these attributes:

| Attribute | Source |
|-----------|--------|
| `cn` | Group name |
| `gidNumber` | The group's **GID number**. When it's `0`, a number derived from the group name. |
| `memberUid` | Username of each member |
| `objectClass` | `posixGroup` |

## See also

- [LDAP configuration and sync](/docs/ldap/config)
- [Multi-factor authentication](/docs/user/multi-factor-authentication)
- [Organization overview](/docs/organization/overview)
