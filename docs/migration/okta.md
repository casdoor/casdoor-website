---
title: Migrate from Okta
description: Move an Okta org to Casdoor through the Okta API. Users keep their Okta user IDs and profiles and, because Casdoor checks each password with Okta on the first sign-in, their passwords; groups keep their members, and OpenID Connect applications keep their client IDs and secrets.
keywords: [Okta, migrate from Okta, Okta migration, Okta alternative, Okta API, import users, password migration]
authors: [hsluoyz]
---

Move the users, groups and OpenID Connect (OIDC) applications of an Okta org into a Casdoor organization with the **Okta Migration** action from the Marketplace.

---

#### Learning outcomes

- Give Casdoor read access to the Okta org.
- Preview and apply the migration.
- Switch the applications from Okta to Casdoor while the users keep their passwords.

#### What you need

- An admin account of the Casdoor organization that the Okta org goes to. It can't be `built-in`.
- An Okta admin account that can create API tokens. A super admin's token also returns the client secrets of the applications.

---

## About the Okta migration

The action reads the org through the Okta API with an API token, and sends requests only to the org's domain.

| Okta | Casdoor |
|---|---|
| User | A user. The Casdoor user ID is the Okta user ID, such as `00u1a2b3c4…`, so the `sub` claim stays the same. The user name is the Okta login, which is often the email. Name, email, phone, title and organization go into the matching fields, and the other profile attributes into properties. Suspended users are imported as forbidden. |
| Password | Checked with Okta on the user's first sign-in. See [Passwords](#passwords). |
| Group | A group with the same members. The `Everyone` group is skipped. |
| OIDC application | An application with the same client ID, client secret, redirect URIs and grant types, and the `JWT-Standard` token format. The Okta Admin Console and the Okta Dashboard are skipped. |

### Passwords

Okta never exports password hashes. Instead, Casdoor saves these users with a password that the action checks:

1. The first time a user signs in to Casdoor, the action sends the user name and password to the Okta authentication API, `POST /api/v1/authn` on the org's domain.
1. If Okta accepts the password, the user is signed in, and Casdoor saves the password with the password type of the organization. Okta is not asked again for this user.
1. If Okta rejects it, the sign-in fails as with any wrong password.

This works for users with an Okta password and for users whom Okta signs in through Active Directory or LDAP. A user who has to complete MFA in Okta still passes, because the password is correct. Casdoor asks for its own MFA once the user has set it up.

:::caution

Keep the Okta org running and don't delete the migration in Casdoor until your users have signed in to Casdoor once. Casdoor finds the Okta domain in the migration. After Okta is shut down, the users who haven't signed in yet reset their password in Casdoor.

:::

Users who never activated their Okta account, and users who sign in to Okta only through an identity provider, have no Okta password. The report counts them.

## Create an API token in Okta

1. In the Okta Admin Console, go to **Security** > **API** and open the **Tokens** tab.
1. Click **Create token**, enter a name such as `casdoor-migration`, and click **Create token**.
1. Copy the token value. Okta shows it only once.

The token acts with the permissions of the admin who created it. To import the client secrets of the applications, create it as a super admin. Revoke the token after the migration.

## Install the action

1. In the Casdoor admin console, go to **Identity** > **Marketplace**.
1. Search for **Okta Migration** and click **Install**.
1. Choose the organization that the Okta org goes to, and click **Install**.

## Create the migration

1. Go to **Admin** > **Migrations** and click **Add**.
1. Set these fields:

   | Field | Value |
   |---|---|
   | **Organization** | The organization that you installed the action into. |
   | **Name** | A name, such as `okta`. |
   | **Action** | **Okta Migration**. |
   | **Host** | The domain of the Okta org, such as `your-org.okta.com`. |
   | **Client secret** | The API token. |

   Leave **Client ID** and **Files** empty.

1. Click **Test connection**.

   An error in the **Report** says what Okta returned, such as HTTP 401 for a wrong or revoked token.

## Preview and apply

1. Click **Preview** and wait until the **Report** shows **Previewed**.
1. Check the numbers and the **Warnings**. Common warnings:
   - The applications that are not OIDC applications, such as SAML applications. Add them to Casdoor yourself.
   - Applications whose client secret Okta didn't return. Casdoor gives them new secrets: update them in the applications, or create the token as a super admin and preview again.
   - Users who sign in to Okta through an identity provider. Add the provider to the Casdoor applications.
1. Click **Apply** and confirm.

An AI agent connected to the [Casdoor MCP server](/docs/how-to-connect/mcp/overview) can do the same with `plan_migration` and `apply_migration`. See [Migration tools](/docs/how-to-connect/mcp/tools#migration-tools).

## Switch the applications

1. In each application, replace the Okta issuer, such as `https://your-org.okta.com/oauth2/default`, with your Casdoor address, or set the discovery URL to `https://<your-casdoor-host>/.well-known/openid-configuration`. Keep the client ID and client secret. See [Standard OIDC client](/docs/how-to-connect/oidc-client).
1. In the APIs that check access tokens, replace Okta's issuer and JSON Web Key Set (JWKS) URL with Casdoor's.
1. If your applications read claims that an Okta authorization server adds, such as `groups`, add them in Casdoor with a [flow](/docs/flows/overview) that runs before a token is issued, or with the [token attributes](/docs/application/terminology#token-attributes) of the application.

Right before the switch, click **Apply** again to bring over the users who were added in Okta since the last run.

## Verify the result

1. Sign in to one of the applications with a migrated user's Okta login and password.
1. In the ID token, check that `sub` is the user's Okta user ID.
1. Go to **User Management** > **Users**, open the user, and check that the password type changed from `plugin:okta-migration` to the password type of the organization.

## What is not imported

- The signing keys. Okta doesn't export them, so tokens that Okta issued are not valid in Casdoor, and users sign in again after the switch.
- MFA factors. Users who use MFA enroll again.
- Admin roles, authorization servers, policies, and which groups have access to which applications.
- Applications other than OIDC, such as SAML and bookmark applications.
- Deactivated users.

## See also

- [Migrations](/docs/migration/overview)
- [Okta syncer](/docs/syncer/Okta), to keep reading users from an Okta org that stays in use
- [Okta: Create an API token](https://developer.okta.com/docs/guides/create-an-api-token/main/)
