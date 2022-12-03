---
title: Overview
description: Synchronize users in Casdoor
keywords: [users, sync, syncer]
authors: [leo220yuyaodog]
---

As an authentication platform, Casdoor can easily manipulate users stored in databases.

## Syncer

Casdoor stores users in **user** table. Don't worry about migrating your application **user** data into Casdoor, when you plan to use Casdoor as an authentication platform. Casdoor provides **syncer** to quickly help you sync user data to Casdoor.

Specify the database and user table that you want to synchronize to Casdoor. And the syncer will sync the data after the specified interval. For details, see [database syncer](/docs/syncer/Database).

## Synchronization hash

Casdoor use hash to determine how to update a user. Casdoor would calculate the hash value of each user in the table, which is generated using users' information, such as password or mobile phone number.

If the calculated hash value of a user with a specific `Id` changed compared with the original value, Casdoor would affirm which user table has been updated. Then the database would update the old information, realize the **bilateral synchronization** between Casdoor user table and origin user table.
