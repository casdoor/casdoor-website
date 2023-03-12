---
title: Config and Sync LDAP Users
description: LDAP configuration in Casdoor
keywords: [ldap, config, user, sync]
authors: [WindSpiritSR]
---

Ldap configurations belong to an organization, which ldap users will be synchronized into.

You are supposed to use a global admin user to modify the configuration. You need to enter the following information of the LDAP user synchronization in the "organization" page.
![idap_table](/img/ldap/idap_table.png)
## Config to connect LDAP server
![idap_edit](/img/ldap/idap_edit.png)
#### Server Name

A friendly name is used by managers to identify different servers.

> e.g:
> `Example LDAP Server`

#### Server Host

LDAP server's host or IP address

> e.g:
> `example.com`

#### Server Port

LDAP server's ports, only allow numbers.

> e.g:
> `389`

#### Base DN

Casdoor uses Sub search mode by default when searching in LDAP. Base DN is the basic distinguished name of the search. Casdoor will return all users under the current base DN.

The admin account configured in casdoor should have at least read-only permissions at base DN.

> e.g:
> `ou=Example,dc=example,dc=com`

#### Admin

An account that can log in to the specified LDAP server.

Login with DN or ID depends on the LDAP server settings you want to connect.

> e.g:
> `cn=manager,dc=example,dc=com`

#### Admin Password

Password of LDAP server Admin account.

#### Auto Sync

Set `0` to disable auto sync, other value means **Sync every few minutes**.

## Sync users
The sync table displays all users get from the LDAP server in the specific `ou`. If the users have been synced, the checkbox will
be disabled. You can check the box to select users, then sync the selected users from the LDAP server.
![ldap_sync](/img/ldap/ldap_sync.png)

:::caution
If the `uid` of the user in LDAP server is same as the `name` of a user existed in the organization of Casdoor, Casdoor will create a 
new user that the `name` include the `uid` and a random string. But the user may can not to login, because the name of the new synced user not exist in LDAP server.
So try to avoid that.
:::
