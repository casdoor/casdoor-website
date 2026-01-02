---
title: Session Management
description: Managing user sessions in Casdoor
keywords: [session, management, delete, multi-session, logout]
authors: [hsluoyz]
---

Casdoor provides tools to manage user sessions, including viewing active sessions and selectively terminating them. This gives administrators and users control over who can access their applications and from which devices.

## Viewing Sessions

Access the session management interface through the Casdoor admin panel:

1. Navigate to the **Sessions** page from the main menu
2. View all active sessions across your organization
3. See session details including user, application, creation time, and session IDs

Each session record shows all active session IDs for that user-application combination. Multiple session IDs indicate the user has logged in from different devices or browsers.

## Deleting Individual Sessions

You can delete specific sessions to revoke access from particular devices or browsers while keeping other sessions active. This is particularly useful for:

- Revoking access from a lost or stolen device
- Terminating a suspicious login from an unfamiliar location
- Managing sessions across multiple devices individually
- Logging out from specific browsers while staying logged in elsewhere

### How to Delete a Session

In the Sessions list page, each session shows its associated session IDs as tags. To delete a specific session:

1. Locate the session record for the user
2. Find the session ID you want to terminate (shown as a tag)
3. Click the close icon (×) on that session ID tag
4. Confirm the deletion in the popup dialog

The selected session will be immediately invalidated. The user will be logged out from that specific device or browser, but their other active sessions remain unaffected.

### Current Session Protection

Casdoor prevents you from accidentally deleting your own active session. If you attempt to delete the session ID you're currently using, you'll receive an error message:

> "session id {session-id} is the current session and cannot be deleted"

This protection ensures you don't accidentally log yourself out while managing sessions. To log out from your current session, use the standard logout functionality instead.

## Deleting All Sessions

When you delete a session record entirely (not just a single session ID), Casdoor handles it intelligently:

- If the session record has multiple session IDs, deleting one ID removes just that session
- If only one session ID remains and you delete it, the entire session record is removed
- You can delete the entire session record at once using the delete button for that row

Deleting all sessions for a user effectively logs them out from all devices and browsers simultaneously.

## API for Session Deletion

Developers can programmatically delete sessions using the Casdoor API:

### Delete a Specific Session ID

To delete a single session ID from a session record:

```bash
POST /api/delete-session?sessionId={session-id}
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

Omit the `sessionId` parameter to delete all sessions. However, you cannot delete your current active session this way - the API will return an error if you try.

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
