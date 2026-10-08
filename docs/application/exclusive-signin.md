---
title: Allow one session per user
sidebar_label: Exclusive sign-in
description: Limit each user to one active session per application, so that a new sign-in ends the sessions on other devices.
keywords: [exclusive signin, session, single session]
authors: [hsluoyz]
---

This guide explains exclusive sign-in. With exclusive sign-in, each user has at most one active session in an application. A sign-in on another device or in another browser ends the earlier sessions of that user in that application.

---

#### Learning outcomes

- Turn on exclusive sign-in for an application.
- Understand what happens to existing sessions.

#### What you need

- An [application](/docs/application/overview)

---

## About exclusive sign-in {#when-to-use-it}

Exclusive sign-in lowers the risk that several people use one account at the same time, for example after a user forgot to sign out on a shared computer. The cost is for users who work on several devices: they sign in again each time they switch.

## Turn on exclusive sign-in {#configuration}

1. In the Casdoor admin console, open the edit page of the application.
1. Turn on **Enable exclusive signin**. The setting applies to all users of the application.
1. Save the application.

## What happens at sign-in {#behavior}

When a user signs in to the application, Casdoor:

1. Finds all sessions of the user in the application.
1. Deletes them. The user is signed out of the application everywhere else.
1. Creates a session for the new sign-in and keeps only that session.

For example, a user signs in on a laptop and then on a phone. Casdoor ends the session on the laptop, and only the phone stays signed in.

Casdoor does this per application. Sessions of the same user in other applications stay.

## See also

- [Session management](/docs/session/management)
- [Single sign-out](/docs/session/single-sign-out)
