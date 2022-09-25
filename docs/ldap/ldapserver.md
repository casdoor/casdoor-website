---
title: Ldapserver
description: How to connect ldap client in Casdoor
keywords: [ldapserver]
---

Many systems like `Nexus` support `ldap` authentication. A simple ldap server is also implemented in Casdoor, which supports bind and search operations. 

The following describes how to connect to the ldap server in Casdoor and implement simple login authentication.

### LDAP Server Port

The LDAP server listens on port `389` by default, you can change the default port by changing `ldapServerPort` in `conf/app.conf`.

### How it works

Similar to the ldap client in Casdoor, the users in the ldap server are all subclasses of `poxisAccount`.

When the server receives a set of data transmitted by the ldap, it will parse the `cn` and `ou`, where `cn` represents the username, `ou` represents the organization name. It doesn't matter what `dc` is.

If it is a bind operation, the server will use Casdoor to verify the username and password and give the user permission in Casdoor.

If it is a search operation, the server will check whether the Search operation is legal according to the permissions given to the client by the bind operation and return a response.

> **We only support `Simple Authentication`**.

### How to bind

In Casdoor ldapserver, we only recognize `DN` similar to this: `cn=admin,ou=built-in,dc=example,dc=com`. 

So please set the `DN` of the admin user to the above form. Then you can use this`DN` to bind to ldap server with the user's password to log in to casdoor for verification. If the server verification is passed, the user will be granted the authority in Casdoor.

### How to search

Once the bind operation completes successfully, you can perform the correct search operation. There are some differences between search and bind.

- If you want to search for a certain user, such as `Alice` under the `built-in` organization, you should use `DN` like this :`ou=built-in,dc=example,dc=com`, and add `cn=Alice` in the Filter field.
- If you want to search for all users under a certain organization, such as all users in `built-in`,  you should use `DN` like this :`ou=built-in,dc=example,dc=com`, and add `cn=*` in the Filter field.
- If you want to search for all users for all organizations (the premise is that the user has sufficient permissions),  you should use `DN` like this :`ou=*,dc=example,dc=com`, and add `cn=*` in the Filter field.