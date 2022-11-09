---
title: Config
description: LDAP configuration in Casdoor
keywords: [ldap, config]
author: WindSpiritSR
---

Ldap configurations belong to an organization, which ldap users will be synchronized into.

You are supposed to use a global admin user to modify the configuration. You need to enter the following information of the LDAP user synchronization in the "organization" page.

### Server Name

A friendly name is used by managers to identify different servers.

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

