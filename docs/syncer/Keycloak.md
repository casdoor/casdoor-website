---
title: Keycloak
description: Using Keycloak Syncer to synchronize Keycloak
keywords: [Keycloak, Syncer]
authors: [Marvelousp4]
---

## Keycloak Syncer

The Keycloak syncer extends the [database syncer](/docs/syncer/Database) with automatic configuration for Keycloak's schema. It simplifies the process of migrating users from Keycloak to Casdoor.

The syncer automatically fetches data from multiple Keycloak tables (`credential`, `keycloak_group`, `user_group_membership`) since user information in Keycloak is distributed across these tables.

![edit](/img/syncer/Keycloak/syncer_keycloak_edit.png)
