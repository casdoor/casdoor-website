---
title: Overview
description: Understanding sessions in Casdoor
keywords: [session, authentication, token, login]
authors: [hsluoyz]
---

Casdoor manages authentication through sessions, which represent active login states across applications. Each session tracks a user's authenticated connection to one or more applications in an organization.

## What is a session?

A session represents an authenticated user state. When a user signs in to an application, Casdoor creates a session record that includes:

- **Session ID**: A unique identifier for each login instance
- **User information**: The authenticated user's identity
- **Application context**: Which application the user logged into
- **Creation time**: When the session was established
- **Expiration**: When the session will automatically terminate

Users can have multiple active sessions simultaneously - for example, logging in from different devices or browsers. Each session is tracked independently, allowing granular control over user access.

## Session lifecycle

Sessions move from creation to termination as follows:

**Creation**: When a user authenticates successfully (OAuth, SAML, username/password, etc.), Casdoor creates a new session and assigns a unique session ID.

**Active**: While active, the session grants access to protected resources without re-authenticating. Each request validates the session so expired or revoked sessions are rejected.

**Expiration**: Sessions expire after a configurable period of inactivity or at maximum lifetime. Casdoor cleans up expired sessions automatically.

**Termination**: Sessions can be ended by logout (user or admin). When terminated, all associated session IDs are invalidated immediately.

## Multi-session support

Casdoor supports multiple concurrent sessions per user. This is useful when:

- Users access applications from multiple devices (phone, tablet, desktop)
- Users maintain separate sessions in different browsers or private browsing windows
- Backend services need to manage sessions for different application instances

Each session is tracked separately with its own session ID. This allows users to selectively terminate specific sessions without affecting their other active logins - for example, logging out from a work computer while staying logged in on a mobile device.

## Session storage

Session data is stored in Casdoor's database and is associated with:

- The user who created the session
- The application through which they authenticated
- The organization context

Session IDs are stored as arrays, allowing a single session record to track multiple concurrent logins for the same user-application pair.

## Related topics

- [Session management](/docs/session/management): View and manage user sessions
- [Single sign-on](/docs/session/single-sign-on): SSO across multiple applications
- [Single sign-out](/docs/session/single-sign-out): Logout across all sessions
- [Tokens](/docs/token/overview): Sessions and access tokens
