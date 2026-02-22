---
title: Session management
description: View and terminate user sessions in the Casdoor admin panel.
keywords: [session, management, delete, multi-session, logout]
authors: [hsluoyz]
---

In the Casdoor admin panel, view active sessions and end them individually or in bulk. Admins and users can control which devices or browsers stay signed in.

## Viewing sessions

1. Open **Sessions** in the sidebar.
2. You’ll see all active sessions for the organization, with user, application, creation time, and session IDs.

Each row is one user–application pair; multiple session IDs in a row mean the user is signed in from more than one device or browser.

## Deleting a single session

Ending a specific session revokes access from that device or browser only. Use this to:

- Revoking access from a lost or stolen device
- Terminating a suspicious login from an unfamiliar location
- Managing sessions across multiple devices individually
- Logging out from specific browsers while staying logged in elsewhere

### Steps

On the Sessions list, each session’s IDs appear as tags. To remove one:

1. Find the session row.
2. Click the × on the session ID tag you want to end.
3. Confirm in the dialog.

That session is invalidated immediately; the user is signed out on that device or browser only.

### Current session protection

The session you are currently using cannot be deleted. Attempting to delete it shows:

> "session id {'{'}session-id{'}'} is the current session and cannot be deleted"

Use the normal logout flow to sign out of your current session.

## Deleting all sessions

When you delete a session record entirely (not just a single session ID), Casdoor handles it intelligently:

- If the session record has multiple session IDs, deleting one ID removes just that session
- If only one session ID remains and you delete it, the entire session record is removed
- Delete the entire session record with the row's delete button

Deleting all sessions for a user effectively logs them out from all devices and browsers simultaneously.

## API for Session Deletion

Developers can programmatically delete sessions using the Casdoor API:

### Delete a Specific Session ID

To delete a single session ID from a session record:

```bash
POST /api/delete-session?sessionId={'{'}session-id{'}'}
Content-Type: application/json

{
  "owner": "organization-name",
  "name": "username",
  "application": "app-name"
}
```

The `sessionId` parameter specifies which session ID to remove. If this is the last session ID for the record, the entire session record is deleted.

### Delete All Session IDs

To delete all session IDs for a user-application pair:

```bash
POST /api/delete-session
Content-Type: application/json

{
  "owner": "organization-name",
  "name": "username",
  "application": "app-name"
}
```

Omit the `sessionId` parameter to delete all sessions. The current active session cannot be deleted this way; the API returns an error.

## Session Cleanup

Casdoor automatically cleans up expired sessions based on your session timeout configuration. You don't need to manually delete expired sessions unless you want to revoke access immediately before the automatic expiration.

## Best Practices

**Use individual session deletion for security incidents**: If you detect suspicious activity from a specific device, delete just that session ID rather than logging the user out everywhere.

**Educate users on session management**: Users should know how to view their active sessions and remove ones they don't recognize. Consider adding a "My Sessions" page in your application that integrates with Casdoor's session API.

**Monitor session patterns**: Unusual numbers of concurrent sessions may indicate account sharing or credential compromise. Regular session audits can help identify security issues.

**Clean up old sessions regularly**: While Casdoor handles automatic expiration, periodically review and clean up abandoned sessions to maintain good hygiene in your session database.

## Related Documentation

- [Single Sign-Out](/docs/session/single-sign-out): Learn about SSO logout functionality
- [Session Overview](/docs/session/overview): Understand session concepts in Casdoor
- [Tokens](/docs/token/overview): How sessions relate to access tokens
