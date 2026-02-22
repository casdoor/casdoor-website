---
title: Overview
description: Sync users from external systems (databases, Azure AD, Keycloak, etc.) into Casdoor.
keywords: [users, sync, syncer, import, migration]
authors: [leo220yuyaodog]
---

Casdoor stores users in its **user** table. When you adopt Casdoor, you don’t have to migrate users manually—use a **syncer** to import and keep user data in sync from your existing source.

## Supported syncers

Casdoor supports these syncer types:

- **Database**: Synchronize users from any database supported by Xorm (MySQL, PostgreSQL, SQL Server, Oracle, SQLite). See [database syncer](/docs/syncer/Database).
- **Azure AD**: Synchronize users from Azure Active Directory using Microsoft Graph API. See [Azure AD syncer](/docs/syncer/AzureAD).
- **Active Directory**: Synchronize users from Microsoft Active Directory via LDAP. See [Active Directory syncer](/docs/syncer/ActiveDirectory).
- **Google Workspace**: Synchronize users from Google Workspace using Admin SDK API. See [Google Workspace syncer](/docs/syncer/GoogleWorkspace).
- **Keycloak**: Import users directly from Keycloak databases. See [Keycloak syncer](/docs/syncer/Keycloak).
- **WeCom**: Fetch users from WeCom organizations via API. See [WeCom syncer](/docs/syncer/WeCom).
- **DingTalk**: Import users from DingTalk organizations via API. See [DingTalk syncer](/docs/syncer/DingTalk).

All syncers share a common interface, so new sources can be added without changing the rest of the system.

## Supported user attributes

Syncers can map a wide set of attributes: profile data, credentials (passwords, WebAuthn, MFA), security settings (IP allowlist, verification), and activity (login history, password changes). Complex data (e.g. WebAuthn credentials, Face ID) is stored as JSON.

## Sync and change detection

Casdoor computes a **hash** per user from fields such as password and phone. When the hash for a given user `Id` changes, Casdoor treats that user as updated and applies the change. This allows **two-way sync** between the Casdoor user table and the source system.
