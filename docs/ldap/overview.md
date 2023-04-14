---
title: Overview
description: Casdoor cooperates with a ldap server
keywords: [idap]
authors: [WindSpiritSR]
---

Support for ldap server currenty has been introduced into Casdoor. Casdoor is able to synchronize users from ldap servers to Casdoor to use them as user accounts to log in, and authenticate them using the ldap servers. Casdoor also supports setting up cron job to synchronize users automatically on a regular basis.
## Detail about Casdoor-Ldap synchroniztion mechanism
How Casdoor cooperates with a ldap server is described as follows:

1. Synchronization: Casdoor can connect to ldap server fetch users' information, reads all users' information (include `uidNumber`,`uid`, `cn`, `gidNumber`, `mail`, `email`, `emailAddress`, `telephoneNumber`, `mobile`, `mobileTelephoneNumber`, `registeredAddress`, `postalAddress`), and creates Casdoor accounts for each user in ldap, and stores the accounts in database.

2. Authentication: As we have seen, Casdoor doesn't fetch ldap users' passwords to Casdoor. Thus, when the account which is synchronized from ldap server tries to log in through Casdoor, instead of checking password stored in casdoor's database, Casdoor connects to ldap server and verifies whether the user's password is correct.  

3. User distinguished: Casdoor uses `uid` to exclusively identify a user, thus please make sure every ldap user has a different uid.

Once a user is synchronized into Casdoor,that user's information is detached with the ldap user, which means, if you modify the user's information in Casdoor, the user's information in ldap won't be modified and vice versa (except ldap user's password, we rely on it to authenticate a user)





