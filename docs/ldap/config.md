---
title: LDAP configuration and sync
description: Configure LDAP per organization and sync users into Casdoor.
keywords: [ldap, config, user, sync]
authors: [WindSpiritSR]
---

LDAP is configured per organization; synced users are created in that organization. Use a global admin to edit LDAP settings on the organization page.

![ldap_table](/img/ldap/ldap_table.png)

## Connecting to the LDAP server

![ldap_edit](/img/ldap/ldap_edit.png)

| Field | Description |
|-------|-------------|
| **Server name** | Friendly name for this server (e.g. `Example LDAP Server`). |
| **Server host** | Host or IP of the LDAP server (e.g. `example.com`). |
| **Server port** | Port number, numeric only (e.g. `389`). |
| **Base DN** | Base distinguished name for search. Casdoor uses subtree search and returns all users under this DN. The admin account must have at least read access at this base (e.g. `ou=Example,dc=example,dc=com`). |
| **Search filter** | LDAP filter for user search (e.g. `(objectClass=posixAccount)`). |
| **Filter fields** | LDAP attributes used to identify the user (e.g. `uid`, `mail`, `mobile`). The value entered at Casdoor login is matched against these; typically `uid` is used as the login name. |
| **Admin** | Bind DN or ID for the LDAP admin (depends on server; e.g. `cn=manager,dc=example,dc=com`). |
| **Admin password** | Password for the admin account. |
| **Auto sync** | `0` = disabled. Any other value = sync interval in minutes. |

![LDAP_field](/img/ldap/ldap_field.gif)

## Syncing users

The sync table lists users under the configured base DN. Already-synced users are shown with the checkbox disabled. Select users and sync to import them into the organization.

![ldap_sync](/img/ldap/ldap_sync.png)

## Default group

Group to assign to users after sync.

:::caution
If an LDAP user’s `uid` equals the `name` of an existing user in the organization, Casdoor creates a new user with a modified `name` (uid + random suffix). That user may not be able to sign in via LDAP because the LDAP server has no such `uid`. Avoid reusing existing Casdoor usernames as LDAP uids.
:::
