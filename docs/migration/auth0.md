---
title: Migrate from Auth0
description: Move an Auth0 tenant to Casdoor through the Auth0 Management API. Users keep their Auth0 user IDs, social links and, with the password hash export, their passwords; applications keep their client IDs and secrets.
keywords: [Auth0, migrate from Auth0, Auth0 migration, Auth0 alternative, Management API, password hashes, import users]
authors: [hsluoyz]
---

Move the users, applications, organizations and roles of an Auth0 tenant into a Casdoor organization with the **Auth0 Migration** action from the Marketplace.

---

#### Learning outcomes

- Give Casdoor read access to the Auth0 tenant.
- Preview and apply the migration.
- Switch the applications from Auth0 to Casdoor.

#### What you need

- An admin account of the Casdoor organization that the tenant goes to. It can't be `built-in`.
- An Auth0 account that can create applications in the tenant.
- Optionally, the password hash export of the tenant from Auth0 support. Auth0 gives it on paid plans only, through a support ticket, and it can take several days.

---

## About the Auth0 migration

The action reads the tenant through the [Auth0 Management API](https://auth0.com/docs/api/management/v2) and sends requests only to the tenant's domain.

| Auth0 | Casdoor |
|---|---|
| User | A user. The Casdoor user ID is the Auth0 `user_id`, such as `auth0\|64b1f…`, so the `sub` claim stays the same. The user name is the `user_id` without the connection: `64b1f…` for a database user, `google-oauth2-1234…` for a social one. The Auth0 username goes into the property `auth0_username`. |
| Password hash | The bcrypt hash from the password hash export, matched to the user by `user_id` or by email. |
| Social identity | The field of the matching Casdoor provider type, such as `google` or `github`. Identities of other connections go into the property `oauth_<connection>_id`. |
| Application | An application with the same client ID, client secret, callback URLs and grant types, and the `JWT-Standard` token format. Global applications and the application the migration reads Auth0 with are skipped. |
| Organization | A group, with the organization's members. |
| Role | A role, with the users who have it. |

Users sign in with their email and password as before, because Casdoor accepts the email in the user name field.

## Create a machine-to-machine application in Auth0

1. In the Auth0 dashboard, go to **Applications** > **Applications** and click **Create Application**.
1. Choose **Machine to Machine Applications**, and authorize it for the **Auth0 Management API**.
1. Select these scopes, then click **Authorize**:

   ```text
   read:users read:clients read:client_keys read:roles read:organizations read:organization_members
   ```

   A missing scope doesn't stop the migration: the kinds it can't read are skipped with a warning in the report.

1. On the **Settings** tab of the application, copy the **Domain**, **Client ID** and **Client Secret**.

## Install the action

1. In the Casdoor admin console, go to **Identity** > **Marketplace**.
1. Search for **Auth0 Migration** and click **Install**.
1. Choose the organization that the tenant goes to, and click **Install**.

## Create the migration

1. Go to **Admin** > **Migrations** and click **Add**.
1. Set these fields:

   | Field | Value |
   |---|---|
   | **Organization** | The organization that you installed the action into. |
   | **Name** | A name, such as `auth0`. |
   | **Action** | **Auth0 Migration**. |
   | **Host** | The domain of the tenant, such as `your-tenant.us.auth0.com`. Use the tenant's own domain, not a custom domain. |
   | **Client ID** | The client ID of the machine-to-machine application. |
   | **Client secret** | The client secret of the machine-to-machine application. |

1. If you have the password hash export, choose it under **Files**. Choose it again before each **Preview** and **Apply**, because Casdoor doesn't save it.
1. Click **Test connection**.

   An error in the **Report** names the request that failed, such as HTTP 401 for a wrong client secret.

## Preview and apply

1. Click **Preview** and wait until the **Report** shows **Previewed**.
1. Check the numbers and the **Warnings**. Common warnings:
   - Users of database connections who have no password hash. Without the export, they reset their password in Casdoor.
   - The social connections that users signed in with. Add the same providers to the Casdoor applications, so that these users can sign in with them.
   - Users enrolled in Auth0 multi-factor authentication (MFA). Auth0 doesn't export the factors, so these users enroll again.
1. Click **Apply** and confirm.

The Management API returns at most 1,000 users for one search, so the action searches by creation time and goes on from the last user of each search. A tenant with tens of thousands of users takes several minutes, and longer when Auth0 limits the request rate.

## Use an AI agent instead

With Auth0 Migration installed, an AI agent connected to the [Casdoor MCP server](/docs/how-to-connect/mcp/overview) can create, preview and apply the migration for you. Give it the domain, client ID and client secret of the machine-to-machine application. It calls `plan_migration`, shows you the report, and calls `apply_migration` after you agree. See [Migration tools](/docs/how-to-connect/mcp/tools#migration-tools). The password hash export can't be passed through the agent, and applying again later doesn't add hashes to users that exist already. To use the export, let the agent only preview the migration, then choose the file on the migration page of the admin console and click **Apply** there.

## Switch the applications

1. In each application, replace the Auth0 domain with your Casdoor address as the OpenID Connect (OIDC) issuer, or set the discovery URL to `https://<your-casdoor-host>/.well-known/openid-configuration`. Keep the client ID and client secret. See [Standard OIDC client](/docs/how-to-connect/oidc-client).
1. In the APIs that check access tokens, replace Auth0's issuer and JSON Web Key Set (JWKS) URL with Casdoor's.
1. If Auth0 Actions or Rules added claims to the tokens, add them in Casdoor with a [flow](/docs/flows/overview) that runs before a token is issued, or with the [token attributes](/docs/application/terminology#token-attributes) of the application.

Right before the switch, click **Apply** again to bring over the users who signed up in Auth0 since the last run.

## Verify the result

1. Sign in to one of the applications with a migrated user's email and Auth0 password.
1. In the ID token, check that `sub` is the user's Auth0 `user_id`.
1. Go to **User Management** > **Users**, open the user, and check the user's groups and roles.

## Troubleshooting

- **A user can't sign in with the password**: The user had no hash in the export, or the export has another email for the user. Check the warnings, then have the user reset the password.
- **HTTP 429 in the report**: Auth0 limited the request rate longer than the action waits. Click **Apply** again: it only adds what is still missing.

## What is not imported

- The signing keys. Auth0 doesn't export them, so tokens that Auth0 issued are not valid in Casdoor, and users sign in again after the switch.
- MFA factors, Actions, Rules, Hooks and the permissions of Auth0 APIs.
- Connections. Add the identity providers to Casdoor yourself, as [providers](/docs/provider/overview).

## See also

- [Migrations](/docs/migration/overview)
- [Casdoor vs Auth0](/docs/comparison/casdoor-vs-auth0)
- [Auth0: export data](https://auth0.com/docs/troubleshoot/customer-support/manage-subscriptions/export-data)
