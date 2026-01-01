---
title: Overview
description: Managing Users in Casdoor
keywords: [user, properties, import]
authors: [sh1luo]
---

## User Properties

As an authentication platform, Casdoor manages user accounts. Every user has the following properties:

- `Owner`: The organization that owns the user
- `Name`: The unique username
- `CreatedTime`
- `UpdatedTime`
- `Id`: Unique identifier for each user
- `Type`
- `Password`
- `PasswordSalt`
- `PasswordOptions`: Password complexity options
- `DisplayName`: Displayed in the user interface
- `FirstName`
- `LastName`
- `Avatar`: A link to the user's avatar
- `PermanentAvatar`
- `Email`
- `Phone`
- `Location`
- `Address`
- `Affiliation`
- `Title`
- `IdCardType`
- `IdCard`
- `RealName`: The user's verified real name (becomes read-only after identity verification)
- `IsVerified`: Indicates whether the user has completed identity verification through an ID Verification provider
- `Homepage`
- `Bio`
- `Tag`
- `Region`
- `Language`
- `Gender`
- `Birthday`
- `Education`
- `Balance`: The user's account balance
- `Score`
- `Karma`
- `Ranking`
- `IsDefaultAvatar`
- `IsOnline`
- `IsAdmin`: Indicates whether the user is an administrator of their organization
- `IsGlobalAdmin`: Indicates whether the user has permission to manage Casdoor
- `IsForbidden`
- `IsDeleted`: When a user is soft-deleted (`IsDeleted = true`), they cannot sign in through any authentication method, including OAuth providers. This prevents deleted users from re-registering via third-party login.
- `SignupApplication`
- `Hash`
- `PreHash`
- `CreatedIp`
- `LastSigninTime`
- `LastSigninIp`
- `Roles`: An array of the user's roles (extended field, read-only via User API)
- `Permissions`: An array of the user's permissions (extended field, read-only via User API)

Unique IDs for social platform logins:

- `Github`
- `Google`
- `QQ`
- `WeChat`
- `Facebook`
- `DingTalk`
- `Weibo`
- `Gitee`
- `LinkedIn`
- `Wecom`
- `Lark`
- `Gitlab`
- `Adfs`
- `Baidu`
- `Casdoor`
- `Infoflow`
- `Apple`
- `Azure AD`
- `Azure AD B2C`
- `Slack`
- `Steam`
- `Ldap`

## Organization Admin Privileges

Users with `IsAdmin` set to true have administrator privileges within their organization:

- Full access to manage users, applications, and resources within their organization
- Access to verification code records sent to users in their organization
- Ability to configure organization-level settings and policies

Organization admins have elevated permissions but are scoped to their organization only. Global admins (`built-in` organization users) have full access across all organizations in the Casdoor instance.

## User Tags

The `Tag` field allows you to categorize users for different purposes. Casdoor uses specific tag values for special user types:

- `normal-user`: Standard users with full authentication capabilities
- `guest-user`: Temporary users created through [guest authentication](/docs/how-to-connect/guest-auth) without initial credentials
  - Automatically upgrade to `normal-user` when they set a proper username or password
  - Cannot sign in directly until they upgrade their account

You can also define custom tags to restrict application access. See [Application Tags](/docs/application/tags) for more information.

## Identity Verification

Casdoor supports real-world identity verification through ID Verification providers. Users can verify their identity by submitting their ID card information and real name, which gets validated through third-party services like Jumio.

When a user completes identity verification:

- The `IsVerified` field is set to `true`
- The `RealName`, `IdCardType`, `IdCard`, and related identity fields become read-only
- The verified status is included in JWT tokens and OIDC userinfo responses
- A verification badge appears on the user's profile

This feature is useful for applications that require KYC (Know Your Customer) compliance or need to ensure user identity authenticity. See [ID Verification Providers](/docs/provider/idv/overview) for more information on configuring identity verification.

## Email Normalization

Casdoor normalizes all email addresses to lowercase to ensure uniqueness and prevent duplicate accounts. This means that `user@example.com`, `User@Example.com`, and `USER@EXAMPLE.COM` are treated as the same email address, complying with RFC 5321 standards.

This normalization happens automatically during:

- User signup and account creation
- User login and authentication
- Email duplicate checking

## Understanding Roles and Permissions Fields

The `Roles` and `Permissions` fields in the User object are **extended fields** that are dynamically populated when retrieving user data. These fields are not stored directly in the User table but are collected from the Roles and Permissions resources through the `ExtendUserWithRolesAndPermissions()` function.

**Important:** You cannot update roles and permissions through the `/api/update-user` endpoint, even when using the `columns` parameter. To manage user roles and permissions, you must use the dedicated APIs for Roles and Permissions resources.

To assign roles or permissions to users:

- **Roles**: Use the Roles API endpoints to create and assign roles. Visit the Roles management page (e.g., `https://door.casdoor.com/roles`) or use the [roles API](/docs/user/roles#managing-roles-via-api).
- **Permissions**: Use the Permissions API endpoints to create and assign permissions. Visit the Permissions management page (e.g., `https://door.casdoor.com/permissions`) or use the [permissions API](/docs/user/permissions#managing-permissions-via-api).

## Session Management

Casdoor tracks active user sessions across different devices and browsers. Each time a user signs in, a new session is created with a unique session ID. Administrators can view and manage these sessions through the Sessions page (e.g., `https://door.casdoor.com/sessions`) in the admin console.

### Managing Multiple Sessions

By default, users can maintain multiple active sessions simultaneously when signed in from different locations or devices. For example, a user might be logged in from their office computer, mobile phone, and home laptop at the same time. The Sessions page displays all active sessions for each user, showing session IDs and login details.

Note: If [Exclusive Signin](/docs/application/exclusive-signin) is enabled for an application, users are restricted to one active session at a time, and signing in from a new location automatically terminates previous sessions.

Administrators can selectively remove individual sessions by clicking the close button (×) on any session ID tag. This is useful when you need to terminate access from a specific device without affecting the user's other active sessions. When you attempt to delete a session, a confirmation dialog appears to prevent accidental removals.

### Current Session Protection

For security, Casdoor prevents you from deleting your own active session. If you try to remove the session you're currently using, the system will display an error message. This safeguard ensures you don't accidentally lock yourself out. To end your current session, use the standard logout function instead.

When deleting the last remaining session for a user, the entire session record is automatically cleaned up to maintain database efficiency.

## Using the Properties Field

The `Properties` field is a flexible key-value map (`map[string]string`) that allows you to store custom attributes for users beyond the predefined fields in the User schema. This is particularly useful when you need to:

- Store organization-specific user attributes
- Add custom metadata that doesn't fit into standard fields
- Extend user profiles without modifying the core schema

## Importing Users from XLSX File

You can add new users or update existing Casdoor users by uploading an XLSX file containing user information.

### Getting Started

In the Admin Console, navigate to the Users page. You'll find two buttons for bulk user operations:

- **Download template**: Generates an XLSX template with all available user fields and their localized column headers
- **Upload (.xlsx)**: Opens the upload dialog to import users from your XLSX file

![Importing Users](/img/user/import_users.png)

The template file includes headers in the format `Display Name#field_name` (e.g., `Organization#owner`), where the display name is localized to your language and the field name after `#` is used for import mapping. The comment prefix (everything before `#`) is automatically removed during import.

### Upload Process

When you select an XLSX file, Casdoor displays a preview modal showing all the data to be imported. This allows you to review and verify the information before final submission. Once you confirm, click the upload button to import the users.

We also provide a [sample XLSX file](https://github.com/casdoor/casdoor/blob/master/xlsx/user_test.xlsx) named `user_test.xlsx` in the `xlsx` folder with 5 test users for reference.

![Import Successful](/img/user/import_success.png)

### Upload Permissions

User upload permissions depend on your admin role:

- **Global admins** (users in the `built-in` organization with `IsGlobalAdmin` set to true) can upload users to any organization. The target organization is determined by the `Owner` field in the XLSX file.
- **Organization admins** (users with `IsAdmin` set to true) can only upload users to their own organization. The system ensures that duplicate checking and user creation are scoped to the correct organization.

## Bypass password encryption

When migrating users from an external database to Casdoor, there might be situations where you want to bypass or control the default encryption method provided by `organization` default Password type method.

This can be achieved by using the `passwordType` field during user import.

:::note User with Bycrypt password

Below is an example of a POST body request for the API route `/api/add-user`.

```json
{
  "owner": "organization",
    "signupApplication": "first-app",
    "email":"dev@dev.com",
    "name": "dev",
    "displayName": "developper",
    "password": "$2a$10$.o/iVyDE9Xk8ioywHDnQRu72RviOi6FPa1ujhusbSCZeg7VOa6MY6",
    "passwordType":"bcrypt",
}
```

Here, the user's password is already encrypted using the bcrypt algorithm, so we specify the `passwordType` as "bcrypt" to inform Casdoor not to encrypt it again.

:::
