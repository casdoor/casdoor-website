---
sidebar_position: 2
title: Users Manipulation
description: Manipulate users in Casdoor
keywords: [users, manipulation]
---

As an authentication platform, Casdoor can easily manipulate users stored in databases.

We can think Casdoor stores users as a user table. And there is also a user table in external database. Every 60 seconds, Casdoor would calculate the hash value of each user in the table, which is generated using users' information, such as password or mobile phone number. If the calculated hash value of a user with a specific `Id` changed compared with the original value, Casdoor would affirm which user table has been updated. Then the database stores old information would update, realize the **bilateral synchronization** between Casdoor user table and external user table.
