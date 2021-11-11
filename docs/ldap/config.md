---
sidebar_position: 2
title: Config
---

You need to enter the following information of the LDAP user synchronization.

### Organization

User information will be synchronized to the specified organization.

> e.g:
> `example-org`

### ID

A random string, automatically generated when creating the LDAP server configuration.

> e.g:
> `e00a633f-6fa7-49aa-aaf4-408f803e52fa`

### Server Name

A friendly name is used for managers to identify different servers.

> e.g:
> `Example LDAP Server`

### Server Host

LDAP server's host.

> e.g:
> `example.com`

### Server Port

LDAP server's ports, only allow numbers.

> e.g:
> `389`

### Base DN

Casdoor uses Sub search mode by default when searching in LDAP. Base DN is the basic distinguished name of the search. Casdoor will return all users under the current base DN.

The admin account configured in casdoor should have at least read-only permissions at base DN.

> e.g:
> `ou=Example,dc=example,dc=com`

### Admin

An account that can log in to the specified LDAP server.

Login with DN or ID depends on the LDAP server settings you want to connect.

> e.g:
> `cn=manager,dc=example,dc=com`

### Admin Password

Admin account's password.

### Auto Sync

Set `0` to disable auto sync, other value means **Sync every few minutes**.

> This configuration is currently not implemented, so modification is disabled by default.
