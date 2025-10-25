---
title: Soft-Deleted User Handling
description: Understanding how Casdoor handles soft-deleted users
keywords: [soft delete, user management, security, authentication]
authors: [Copilot]
---

Casdoor implements soft deletion for user accounts, which marks users as deleted without permanently removing their data from the database. This provides recovery options while preventing unauthorized access.

## How Soft Delete Works

When a user account is soft-deleted:

- The user's `isDeleted` field is set to `true`
- The account remains in the database
- The user cannot sign in through any authentication method
- Third-party login attempts are blocked

## Authentication Behavior

### Regular Login

When a soft-deleted user attempts to log in using username/password or any authentication method, they receive an error message:

```text
The user has been deleted and cannot be used to sign in, please contact the administrator
```

### Third-Party OAuth Login

Casdoor now prevents soft-deleted users from re-registering through third-party OAuth providers (Google, GitHub, WeChat, etc.). This addresses a security concern where:

1. Admin soft-deletes a user account
2. User attempts to log in via OAuth provider with the same linked account
3. System correctly rejects the login instead of re-creating the account

This ensures that administrative decisions to remove user access are consistently enforced across all authentication methods.

## User Recovery

Administrators can restore soft-deleted users by:

1. Navigating to the user management page
2. Locating the soft-deleted user
3. Updating the `isDeleted` field to `false`
4. Saving the changes

Once restored, the user can authenticate normally using any configured sign-in method.

## Why Soft Delete?

Soft deletion provides several advantages:

- **Audit trail**: Complete history of user activity is preserved
- **Recovery**: Accidental deletions can be easily reversed
- **Compliance**: Maintains records for regulatory requirements
- **Analytics**: Historical user data remains available for reporting

## Security Implications

The improved soft-delete handling enhances security by:

- Preventing bypassing deletion through OAuth re-registration
- Ensuring consistent access control across authentication methods
- Protecting against unauthorized account recreation
- Maintaining administrative control over user access

## Best Practices

When managing user accounts:

1. Use soft delete for most scenarios to preserve audit trails
2. Communicate with users before deleting their accounts
3. Document the reason for account deletion
4. Regularly review soft-deleted accounts for permanent deletion if needed
5. Implement policies for how long soft-deleted accounts are retained
