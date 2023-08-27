---
title: Keycloak
description: Using Keycloak Syncer to synchronize Keycloak
keywords: [Keycloak, Syncer]
authors: [Marvelousp4]
---

## Keycloak Syncer

The Keycloak syncer is essentially the same as the [database syncer](/docs/syncer/Database), with the added functionality of automatic configuration for Keycloak `Tables` and `Table columns`.

Furthermore, the Keycloak syncer will fetch data from the `credential` table, `keycloak_group` table, and `user_group_membership` table, as user information in Keycloak is stored across multiple tables.

![edit](/img/syncer/Keycloak/syncer_keycloak_edit.png)
