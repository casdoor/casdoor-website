---
title: Exclusive sign-in
description: Allow only one active session per user per application.
keywords: [exclusive signin, session, single session]
authors: [hsluoyz]
---

**Exclusive sign-in** limits each user to one active session per application. A new sign-in from another device or browser ends all previous sessions for that user and application.

## Configuration

On the application edit page, enable **Enable exclusive signin**. The setting applies to all users of that application.

## Behavior

On sign-in with exclusive sign-in enabled:

- All existing sessions for that user and application are removed
- A new session is created for the current sign-in
- The user is effectively signed out everywhere else for this app

Example: user signs in on a laptop, then on a phone — the laptop session is terminated; only the phone session stays active.

## When to use it

Exclusive sign-in reduces the risk of concurrent use of the same account (e.g. after forgetting to sign out on a shared PC). It also limits concurrent sessions per user. Users who need to stay signed in on multiple devices will have to sign in again when they switch.

## How it works

For each sign-in with exclusive sign-in on: Casdoor finds all sessions for that user and application, deletes them, creates a new session, and keeps only that session ID. This is done per application.
