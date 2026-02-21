---
title: Exclusive Sign-in
description: Configure exclusive signin to allow only one active session per user
keywords: [exclusive signin, session management, single session]
authors: [copilot]
---

Exclusive signin restricts users to maintaining only one active session at a time. When enabled, signing in from a new device or browser automatically terminates all previous sessions for that user.

## Configuration

Enable exclusive signin in the application settings:

1. Navigate to **Applications** in Casdoor
2. Select your application
3. Toggle **Enable exclusive signin**

Once enabled, the system enforces single-session access for all users of that application.

## Behavior

When a user with exclusive signin enabled signs in:

- Any existing active sessions are immediately terminated
- A new session is created for the current signin
- The user is logged out from all other devices or browsers

For example, if a user signs in on their laptop, then later signs in on their phone, the laptop session is automatically ended. Only the phone session remains active.

## Security Implications

Exclusive signin prevents concurrent session abuse where multiple parties could access the same account simultaneously. This is particularly useful when users forget to sign out from shared or public computers, as the next signin automatically invalidates the previous session.

The feature also helps manage server resources by limiting the number of concurrent sessions, though users working across multiple devices will need to re-authenticate when switching between them.

## Technical Implementation

When a user signs in with exclusive signin enabled:

1. Casdoor queries all existing sessions for that user and application
2. All found session IDs are destroyed in the backend
3. A new session is created and stored
4. Only the new session ID is maintained in the database

This per-application session management works independently for each application configured in Casdoor.
