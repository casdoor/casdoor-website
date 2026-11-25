---
title: Keycloak syncer
description: Sync users from Keycloak to Casdoor with automatic schema mapping.
keywords: [Keycloak, syncer]
authors: [Marvelousp4]
---

The **Keycloak syncer** extends the [database syncer](/docs/syncer/Database) with preset configuration for Keycloak’s schema, so you can migrate users from Keycloak to Casdoor without manual column mapping.

User data in Keycloak is spread across several tables (`credential`, `keycloak_group`, `user_group_membership`, etc.). The syncer reads from these tables and maps them into Casdoor users.

![edit](/img/syncer/Keycloak/syncer_keycloak_edit.png)

To move a realm to Casdoor once, with its clients, roles, signing key and all password hashes, use a migration instead. See [Migrate from Keycloak](/docs/migration/keycloak).
