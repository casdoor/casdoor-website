---
title: Config and Sync LDAP Users
description: Casdoor LDAP 配置
keywords:
  - ldap
  - 配置
  - user
  - sync
authors:
  - WindSpiritSR
---

Ldap 配置属于一个组织，该组织的用户将被同步。

您应该使用全局管理员用户来修改配置。 您需要在“组织”页面中输入LDAP用户同步的以下信息。 ![idap_table](/img/ldap/idap_table.png)
## Config to connect LDAP server
![idap_edit](/img/ldap/idap_edit.png)
#### Server Name

A friendly name is used by managers to identify different servers.

> 例如： `LDAP 服务器示例`

#### Server Host

LDAP server's host or IP address.

> 例如： `example.com`

#### Server Port

LDAP server's ports, only allow numbers.

> 例如： `389`

#### Base DN

Casdoor uses Sub search mode by default when searching in LDAP. Base DN is the basic distinguished name of the search. Casdoor will return all users under the current base DN.

The admin account configured in casdoor should have at least read-only permissions at base DN.

> 例如： `ou=Example,dc=example,dc=com`

#### Search filter

Casdoor uses search filter to query ldap users.

> e.g: `(objectClass=posixAccount)`

#### Filter fields

Filter fields are the identifier of the user in LDAP server, When you log in to Casdoor as an LDAP user. Casdoor regards the entered login username as the `uid` of LDAP user. You can also config other filed, such as `mail`, `mobile`.

![LDAP_field](/img/ldap/ldap_field.gif)

#### Admin

An account that can log in to the specified LDAP server.

Login with DN or ID depends on the LDAP server settings you want to connect.

> e.g: `cn=manager,dc=example,dc=com`

#### Admin Password

Password of LDAP server Admin account.

#### Auto Sync

Set `0` to disable auto sync, other value means **Sync every few minutes**.

## Sync users
The sync table displays all users get from the LDAP server in the specific `ou`. If the users have been synced, the checkbox will be disabled. You can check the box to select users, then sync the selected users from the LDAP server. ![ldap_sync](/img/ldap/ldap_sync.png)

:::caution
If the `uid` of the user in LDAP server is same as the `name` of a user existed in the organization of Casdoor, Casdoor will create a new user that the `name` include the `uid` and a random string. But the user may can not to login, because the name of the new synced user not exist in LDAP server. So try to avoid that.
:::
