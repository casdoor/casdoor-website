---
title: User Impersonation
description: Using master password to impersonate users in Casdoor
keywords: [user impersonation, master password, admin login, simulate user]
authors: [copilot]
---

User impersonation allows administrators to temporarily sign in as another user within their organization. This feature is useful for troubleshooting user-specific issues, testing permissions, or providing support without requiring the user's actual password.

## Overview

Casdoor supports user impersonation through the **Master Password** feature. When an organization's master password is configured, administrators can use it to sign in as any user within that organization.

## How It Works

When you attempt to sign in as a user, Casdoor checks the password in the following order:

1. First, it checks if the entered password matches the organization's master password
2. If not, it checks if the password matches the user's actual password

If either check succeeds, the authentication is successful. This means that when a master password is set, administrators can use it to sign in as any user account.

## Setting Up Master Password

To enable user impersonation in your organization:

1. Navigate to your **Organization** settings in the Casdoor admin console
2. Go to the **Organizations** page
3. Click on your organization to edit it
4. Find the **Master Password** field
5. Enter a strong, secure password
6. Save the changes

:::caution Security Important

The master password is extremely sensitive. Anyone with access to the master password can sign in as any user in the organization. It should be:

- Known only to trusted administrators
- Stored securely (e.g., in a password manager)
- Changed immediately if compromised
- Sufficiently complex and unique

:::

## Using Master Password for Impersonation

To sign in as a user using the master password:

1. Go to the login page for your organization: `/login/<organization_name>`
2. Enter the username of the user you want to impersonate
3. Enter the organization's master password (not the user's password)
4. Sign in

You will be authenticated as that user and have access to their account with their permissions and settings.

## Use Cases

Common scenarios where user impersonation is helpful:

- **Technical Support**: Troubleshoot user-specific issues by viewing exactly what the user sees
- **Testing**: Verify that permissions and roles are working correctly for different user types
- **Emergency Access**: Access critical information when a user is unavailable
- **Demonstration**: Show features or workflows from a specific user's perspective
- **Audit**: Investigate suspicious activity or verify user actions

## Security Considerations

When using the master password feature:

1. **Audit Logging**: All sign-in attempts, including those using the master password, are logged in Casdoor
2. **Limited Distribution**: Only share the master password with administrators who absolutely need it
3. **Regular Rotation**: Change the master password periodically as part of your security policy
4. **Alternative Methods**: Consider using role-based testing accounts instead of impersonation when possible
5. **Compliance**: Ensure that user impersonation complies with your organization's privacy and security policies

:::tip Best Practice

Document when and why the master password was used for impersonation. This creates an audit trail and helps maintain accountability.

:::

## Disabling User Impersonation

To disable user impersonation:

1. Navigate to your **Organization** settings
2. Find the **Master Password** field
3. Clear the master password field
4. Save the changes

Once removed, administrators will no longer be able to use a master password to sign in as other users.

## Related Features

- **Default Password**: Organizations can also set a default password that is assigned to new users when they are created
- **Password Complexity**: Configure password requirements to ensure all passwords (including master password) meet security standards
- **Multi-Factor Authentication (MFA)**: Even when using master password, MFA requirements will still apply if enabled for the user
