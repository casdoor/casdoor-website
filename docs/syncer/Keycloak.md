## Keycloak Syncer

The Keycloak syncer is basically the same as the [database syncer](#database-syncer), except that the `Table` and `Table columns` can be configured automatically for Keycloak. 

In addition, the Keycloak syncer will query `credential` table, `keycloak_group` table and `user_group_membership` table because the user information in Keycloak are stored in multiple tables. 

![](/img/syncer_keycloak_edit.png)