---
title: Overview
description: Synchronizing users in Casdoor
keywords: [users, sync, syncer]
authors: [leo220yuyaodog]
---

As an authentication platform, Casdoor can easily manage users stored in databases.

## Syncer

Casdoor stores users in the **user** table. So, when you plan to use Casdoor as an authentication platform, there is no need to worry about migrating your application's user data into Casdoor. Casdoor provides a **syncer** to quickly help you synchronize user data to Casdoor.

Casdoor supports multiple syncer types to import users from different sources:

- **Database**: Synchronize users from any database supported by Xorm (MySQL, PostgreSQL, SQL Server, Oracle, SQLite). See [database syncer](/docs/syncer/Database).
- **Azure AD**: Synchronize users from Azure Active Directory using Microsoft Graph API. See [Azure AD syncer](/docs/syncer/AzureAD).
- **Keycloak**: Import users directly from Keycloak databases. See [Keycloak syncer](/docs/syncer/Keycloak).
- **WeCom**: Fetch users from WeCom organizations via API. See [WeCom syncer](/docs/syncer/WeCom).

## Synchronization hash

Casdoor uses a hash function to determine how to update a user. This hash value is calculated for each user in the table, using information such as the password or mobile phone number.

If the calculated hash value of a user with a specific `Id` changes compared to the original value, Casdoor confirms that the user table has been updated. Subsequently, the database updates the old information, thereby achieving **bilateral synchronization** between the Casdoor user table and the original user table.
