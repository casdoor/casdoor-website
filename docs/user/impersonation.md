---
title: User Impersonation
description: Impersonate users in Casdoor for troubleshooting and support
keywords: [user impersonation, master password, admin login, simulate user]
---

User impersonation allows administrators to temporarily view and interact with the system as another user. This capability helps with troubleshooting, testing permissions, and providing support without needing access to users' actual credentials.

## Overview

Casdoor provides two ways for administrators to impersonate users in their organization:

1. **Session-based impersonation** - A one-click approach from the admin interface
2. **Master password** - A password-based login method

Both methods give administrators the same level of access as the impersonated user, allowing them to see exactly what that user sees and experiences.

## Session-Based Impersonation

This method lets administrators start an impersonation session directly from the user management interface without needing any passwords.

### Starting an impersonation session

Navigate to the Users page in your Casdoor admin panel. Each user row includes an "Impersonation" button. Clicking this button immediately switches your session to that user's context - you'll see the interface exactly as they do, with their permissions and access rights.

![enter impersonation](/img/user/user_impersonation.png)

During impersonation, you remain logged in with the impersonated user's identity until you explicitly exit. Your session remembers both your admin identity and the impersonated user, so Casdoor knows you're in an impersonation context.

### Exiting impersonation

When you're ready to return to your admin account, click your user menu in the top right corner. Instead of the usual "Logout" option, you'll see "Exit impersonation." Selecting this returns you to your admin session without logging out completely.

![exit impersonation](/img/user/exit_user_impersonation.png)

:::tip Admin-only feature

Only users with administrator privileges can impersonate other users. Regular users won't see impersonation buttons in the interface.

:::

## Master Password Method

The master password approach provides an alternative impersonation method through the standard login flow. When configured, administrators can use a special organization-wide password to sign in as any user.

### How master password works

During login, Casdoor checks credentials in a specific order: first against the organization's master password, then against the user's individual password. If the master password matches, authentication succeeds regardless of the user's actual password.

### Setting up master password

To configure this feature, open your Organization settings and locate the Master Password field. Enter a strong password and save. From that point forward, you can use this password at the login screen with any username from your organization to sign in as that user.

![masterpassword](/img/user/master_password.png)

:::caution Handle with care

The master password grants access to any account in your organization. Treat it like a master key - share it only with trusted administrators, store it securely in a password manager, and rotate it immediately if you suspect it's been compromised.

:::

### Using master password

Navigate to your organization's login page at `/login/<organization_name>`. Enter the target user's username and the master password instead of their personal password. Casdoor authenticates you as that user, giving you their exact permissions and view of the system.

:::tip Example

For an organization called "my-company", visit `https://your-casdoor-domain.com/login/my-company`, enter the username you want to impersonate, and use the master password.

:::

## When to use impersonation

Impersonation becomes valuable when you need to see the system through a user's eyes. Support teams often use it to reproduce reported issues - seeing exactly what the user sees makes debugging much faster. Testing permission configurations also benefits from impersonation, letting you verify access controls work correctly for different roles without creating test accounts.

Emergency situations sometimes require immediate access to a user's data when they're unavailable. Similarly, investigating security concerns or unusual account activity becomes more effective when you can navigate the system with that user's context.

## Security considerations

Session-based impersonation requires admin privileges and creates an audit trail of who impersonated whom. The system tracks these sessions separately from normal logins, maintaining accountability.

Master password authentication doesn't distinguish between administrator impersonation and regular login in basic audit logs, since it uses the standard authentication flow. This makes session-based impersonation preferable for most scenarios.

Both methods respect multi-factor authentication settings. If a user has MFA enabled, you'll need to complete those verification steps even when impersonating.

## Disabling master password

To remove the master password option, clear the Master Password field in your Organization settings and save. This only affects password-based impersonation - the session-based method remains available to administrators regardless of master password configuration.

## Related configuration

Organizations can set a default password assigned to newly created users, which differs from the master password used for impersonation. Password complexity rules apply to all passwords including the master password, helping maintain security standards across your organization.
