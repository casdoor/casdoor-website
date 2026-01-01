---
title: Session Management
description: Manage and monitor user sessions in Casdoor
keywords: [session, session management, active sessions, security]
authors: [leo220yuyaodog]
---

Casdoor tracks active user sessions across all applications in your organization. Each session represents an authenticated user session on a specific device or browser. Session management helps you monitor user activity, enforce security policies, and respond to security incidents.

## Understanding Sessions

When a user signs in to a Casdoor-protected application, Casdoor creates a session record that includes:

- **Session ID**: Unique identifier for the session
- **User information**: Username and organization
- **Application**: Which application the user signed into
- **Session metadata**: IP address, user agent, creation time
- **Token information**: Associated access token and expiration

Sessions remain active until the user signs out, the token expires, or an administrator manually terminates the session.

## Viewing Active Sessions

Administrators can view all active sessions for users in their organization through the Casdoor web UI. The session list displays currently authenticated users across all applications.

To access the session management interface:

1. Sign in to Casdoor as an administrator
2. Navigate to the Sessions page from the main menu
3. View the list of active sessions with details about each user's current sessions

The session list shows key information at a glance, helping you identify suspicious activity or enforce access policies.

## Session Security

Session management is critical for maintaining security:

**Detect unauthorized access**: Review active sessions to identify logins from unexpected locations or devices. If you notice a session from an unrecognized IP address or location, you can immediately terminate it.

**Enforce access policies**: When users change roles or leave the organization, you can quickly revoke all their active sessions to prevent further access. This ensures that access changes take effect immediately across all applications.

**Respond to incidents**: If a user's credentials are compromised, terminating all sessions for that user immediately locks them out of all applications. This stops unauthorized access while you investigate and remediate the issue.

**Monitor user activity**: Track which applications users are accessing and from which locations. This visibility helps with compliance auditing and identifying unusual patterns that might indicate security threats.

## Automatic Session Cleanup

Casdoor automatically manages session lifecycle:

- Sessions are removed when users explicitly sign out
- Expired tokens automatically invalidate their associated sessions
- The SSO logout endpoint clears all sessions for a user across applications

This automatic cleanup ensures that session records remain accurate and reduces manual maintenance.

## Session Limitations

Each user can have multiple concurrent sessions across different devices and browsers. Casdoor does not impose a hard limit on concurrent sessions by default, but administrators can implement custom session limits through their applications if needed.

When multiple sessions exist for the same user:

- Each session is independent with its own token
- Terminating one session does not affect others
- SSO logout terminates all sessions simultaneously

## Related Features

Session management works together with other Casdoor features:

- **Single Sign-Out**: The `/api/sso-logout` endpoint terminates all sessions for a user. See [Single Sign-Out](/docs/session/single-sign-out) for implementation details.
- **Token Management**: Each session is associated with an access token. See [Tokens](/docs/token/overview) for more information about token lifecycle.
- **Single Sign-On**: Users can sign in once and access multiple applications. See [Single Sign-On](/docs/session/single-sign-on) for configuration details.
