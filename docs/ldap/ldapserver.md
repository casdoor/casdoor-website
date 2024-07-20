---
title: LDAP Server
description: How to connect LDAP client in Casdoor
keywords: [LDAP server]
authors: [forestmgy]
---

Many systems, like `Nexus`, support LDAP authentication. Casdoor also implements a simple LDAP server, which supports bind and search operations.

This document describes how to connect to the LDAP server in Casdoor and implement simple login authentication.

### LDAP Server Port

The LDAP server listens on port `389` by default. You can change the default port by modifying the `ldapServerPort` value in [conf/app.conf](https://github.com/casdoor/casdoor/blob/28b381e01eebac66e39e20179ed95282695ecd75/conf/app.conf#L22).

### How it Works

Similar to the LDAP client in Casdoor, the users in the LDAP server are all subclasses of `posixAccount`.

When the server receives a set of data transmitted by the LDAP, it will parse the `cn` and `ou`, where `cn` represents the username and `ou` represents the organization name. The `dc` does not matter.

If it is a bind operation, the server will use Casdoor to verify the username and password and grant the user permission in Casdoor.

If it is a search operation, the server will check whether the search operation is legal, according to the permissions granted to the client by the bind operation, and return a response.

:::info

We only support **Simple Authentication**.

:::

### How to Bind

In Casdoor LDAP server, we only recognize `DN` similar to this format: `cn=admin,ou=built-in,dc=example,dc=com`.

Please set the `DN` of the admin user to the above format. Then, you can use this `DN` to bind to the LDAP server with the user's password to log in to Casdoor for verification. If the server verification is successful, the user will be granted authority in Casdoor.

### How to Search

Once the bind operation completes successfully, you can perform the search operation. There are some differences between search and bind operations.

- To search for a certain user, such as `Alice` under the `built-in` organization, you should use a `DN` like this: `ou=built-in,dc=example,dc=com`, and add `cn=Alice` in the Filter field.
- To search for all users under a certain organization, such as all users in `built-in`, you should use a `DN` like this: `ou=built-in,dc=example,dc=com`, and add `cn=*` in the Filter field.
- To search for all users in all organizations (assuming the user has sufficient permissions), you should use a `DN` like this: `ou=*,dc=example,dc=com`, and add `cn=*` in the Filter field.
- To search for all users in a specific group, you should use a filter query like this: `(memberOf=organization_name/group_name)` in the Filter field.
