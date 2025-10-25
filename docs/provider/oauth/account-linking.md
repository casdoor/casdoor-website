---
title: OAuth Account Linking
description: Automatic account linking for OAuth authentication
keywords: [OAuth, account linking, username matching, WeChat, Wecom, SSO]
authors: [Copilot]
---

Casdoor supports automatic account linking when users authenticate through OAuth providers. This simplifies enterprise scenarios where users already exist in Casdoor and want to use OAuth for authentication.

## Username-Based Linking

When a user logs in via an OAuth provider (such as WeChat, Wecom, Google, GitHub, etc.), Casdoor automatically attempts to link their account using multiple strategies:

### Linking Priority

1. **Existing OAuth link**: If the OAuth account is already linked to a Casdoor user, authentication succeeds immediately
2. **Email/phone matching**: If `EnableLinkWithEmail` is enabled in the application settings, Casdoor tries to match by email or phone number
3. **Username matching**: If no match is found yet, Casdoor performs case-insensitive username matching
4. **New account creation**: If signup is enabled and no match is found, a new account is created

### Username Matching Behavior

The username matching feature is particularly useful for enterprise scenarios:

**Example scenario:**
- A user "john.doe" exists in Casdoor
- The organization uses Wecom for internal authentication
- Signup is disabled for security reasons
- The user attempts to log in via Wecom with username "John.Doe"

With username matching enabled, Casdoor automatically:
1. Searches for existing users with matching usernames (case-insensitive)
2. Links the OAuth account to the matched Casdoor user
3. Synchronizes OAuth profile information
4. Completes the authentication

## Configuration

No special configuration is required for username matching. It works automatically when:

- The OAuth provider returns a username in the authentication response
- No existing OAuth link exists for that provider
- Email/phone matching (if enabled) doesn't find a match

## Security Considerations

Username matching is secure because:

- **Organization-scoped**: Searches are limited to the application's organization, preventing cross-organization linking
- **OAuth-validated**: Username comes from a validated OAuth provider response
- **Trusted providers**: Only works after successful OAuth authentication
- **User verification**: Found users are checked for deletion status and validity

## Enterprise Use Cases

This feature is designed for enterprises that:

- Already have users in Casdoor from LDAP sync, database import, or manual creation
- Want to enable OAuth authentication without requiring manual account linking
- Have disabled signup for security reasons
- Use enterprise OAuth providers like Wecom, Azure AD, or Okta

## Manual Override

Administrators can still manually link or unlink OAuth accounts from the user management interface if needed. The automatic linking is a convenience feature that doesn't prevent manual management.

## Supported Providers

Username matching works with all OAuth providers that return username information, including but not limited to:

- Wecom (WeChat Work)
- Azure AD
- Okta
- Google
- GitHub
- GitLab
- Custom OAuth providers

## Troubleshooting

If automatic linking doesn't work as expected:

1. Verify the OAuth provider returns username information
2. Check that the username in Casdoor matches the OAuth provider's username (case-insensitive)
3. Ensure the user isn't already linked to a different OAuth account for that provider
4. Confirm the user isn't soft-deleted
5. Check application settings for conflicting configurations

## Alternative Linking Methods

If username matching doesn't meet your needs, consider:

- Enabling `EnableLinkWithEmail` for email-based linking
- Using LDAP sync to pre-populate users with OAuth identifiers
- Implementing custom account linking through the API
- Manually linking accounts through the admin interface
