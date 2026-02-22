---
title: Overview
description: Sync users from an LDAP server into Casdoor and authenticate them against LDAP.
keywords: [LDAP, sync, authentication]
authors: [WindSpiritSR]
---

Casdoor can sync users from an LDAP server into Casdoor and use the LDAP server to authenticate them. Sync can also run on a schedule (e.g. via cron).

## How Casdoor works with LDAP

1. **Sync:** Casdoor connects to the LDAP server and reads user attributes (e.g. `uidNumber`, `uid`, `cn`, `gidNumber`, `mail`, `email`, `telephoneNumber`, `mobile`, `registeredAddress`, `postalAddress`). It creates corresponding Casdoor accounts and stores them in the database.

2. **Authentication:** Casdoor does not store or sync LDAP passwords. When a synced user signs in, Casdoor checks the password against the LDAP server. Application-level settings (e.g. failed sign-in limit, captcha) still apply to LDAP sign-ins.

3. **Identity:** Casdoor uses `uid` as the unique user identifier. Ensure every LDAP user has a unique `uid`.

After sync, Casdoor user records are independent: changes in Casdoor do not update LDAP, and changes in LDAP (except password) do not automatically update the Casdoor user. Password checks always go to LDAP.
