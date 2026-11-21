---
title: Keycloak syncer
description: Sync users from Keycloak to Casdoor with automatic schema mapping.
keywords: [Keycloak, syncer]
authors: [Marvelousp4]
---

The **Keycloak syncer** extends the [database syncer](/docs/syncer/Database) with preset configuration for Keycloak’s schema, so you can migrate users from Keycloak to Casdoor without manual column mapping.

User data in Keycloak is spread across several tables (`credential`, `keycloak_group`, `user_group_membership`, etc.). The syncer reads from these tables and maps them into Casdoor users.

![edit](/img/syncer/Keycloak/syncer_keycloak_edit.png)

For a complete migration plan, including how password hashes carry over and how to cut over applications, see [Migrating from Keycloak to Casdoor](https://www.casdoor.com/blog/migrate-from-keycloak).
