---
title: Overview
description: Understanding sessions in Casdoor
keywords: [session, authentication, token, login]
authors: [hsluoyz]
---

Casdoor manages user authentication through sessions, which represent active login states for users across applications. Each session tracks a user's authenticated connection to one or more applications within your organization.

## What is a Session?

A session in Casdoor represents an authenticated user state. When a user logs into an application, Casdoor creates a session record that includes:

- **Session ID**: A unique identifier for each login instance
- **User information**: The authenticated user's identity
- **Application context**: Which application the user logged into
- **Creation time**: When the session was established
- **Expiration**: When the session will automatically terminate

Users can have multiple active sessions simultaneously - for example, logging in from different devices or browsers. Each session is tracked independently, allowing granular control over user access.

## Session Lifecycle

Sessions follow a clear lifecycle from creation to termination:

**Creation**: When a user successfully authenticates through any supported method (OAuth, SAML, username/password, etc.), Casdoor generates a new session and assigns it a unique session ID.

**Active State**: While active, the session allows the user to access protected resources without re-authenticating. The session is validated on each request to ensure it hasn't expired or been revoked.

**Expiration**: Sessions automatically expire after a configurable period of inactivity or when reaching their maximum lifetime. Expired sessions are cleaned up automatically by Casdoor.

**Termination**: Sessions can be explicitly terminated through logout actions, either by the user or administratively. When terminated, all associated session IDs are invalidated immediately.

## Multi-Session Support

Casdoor supports multiple concurrent sessions per user. This is useful when:

- Users access applications from multiple devices (phone, tablet, desktop)
- Users maintain separate sessions in different browsers or private browsing windows
- Backend services need to manage sessions for different application instances

Each session is tracked separately with its own session ID. This allows users to selectively terminate specific sessions without affecting their other active logins - for example, logging out from a work computer while staying logged in on a mobile device.

## Session Storage

Session data is stored in Casdoor's database and is associated with:

- The user who created the session
- The application through which they authenticated
- The organization context

Session IDs are stored as arrays, allowing a single session record to track multiple concurrent logins for the same user-application pair.

## Related Topics

- [Session Management](/docs/session/management): Learn how to view and manage user sessions
- [Single Sign-On](/docs/session/single-sign-on): Configure SSO across multiple applications
- [Single Sign-Out](/docs/session/single-sign-out): Implement logout across all sessions
- [Tokens](/docs/token/overview): Understand the relationship between sessions and access tokens
