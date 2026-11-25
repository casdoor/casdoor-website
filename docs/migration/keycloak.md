---
title: Migrate from Keycloak
description: Move a Keycloak realm to Casdoor from its realm export. Users keep their IDs, passwords and authenticator apps, clients keep their client IDs and secrets, and the realm's signing key keeps its key ID, so tokens verify as before.
keywords: [Keycloak, migrate from Keycloak, Keycloak migration, Keycloak alternative, realm export, kc.sh export, password hashes, import users]
authors: [hsluoyz]
---

Move the users, groups, OpenID Connect (OIDC) clients, roles and signing key of a Keycloak realm into a Casdoor organization with the **Keycloak Migration** action from the Marketplace.

---

#### Learning outcomes

- Export a realm with its users and client secrets.
- Preview and apply the migration.
- Switch the applications from Keycloak to Casdoor.

#### What you need

- An admin account of the Casdoor organization that the realm goes to. It can't be `built-in`.
- Shell access to the Keycloak server, to run `kc.sh export`.

---

## About the Keycloak migration

The action reads only the export files that you upload. It sends no requests, so Casdoor doesn't have to reach Keycloak.

| Keycloak | Casdoor |
|---|---|
| Realm signing key (RSA) | A [certificate](/docs/cert/overview) with the realm's private key, certificate and key ID. The imported applications sign tokens with it, so the `kid` of the tokens stays the same and they verify with the realm's public key. |
| Group | A group. Subgroups keep their parent. Subgroups with the same name under different parents get names from their path. |
| OIDC client | An application with the same client ID, client secret, redirect URIs and grant types, and the `JWT-Standard` token format. Redirect URIs with `*` become patterns. **Enable sign-up** follows the realm's **User registration** setting. |
| User | A user with the same ID, so the `sub` claim stays the same, and the same username, email, name, attributes and groups. |
| Password | The Keycloak hash. See [Passwords](#passwords). |
| One-time password (OTP) credential | The user's authenticator app, so the user doesn't scan a new QR code. |
| Identity provider link | The field of the matching Casdoor provider type, such as `google` or `github`. Links to other providers go into the property `oauth_<alias>_id`. |
| Realm role and client role | A role, with its users, groups and composite roles. Client roles are named `<client>-<role>`. |

### Passwords

All users sign in with their Keycloak password:

- Keycloak's former default, PBKDF2 with SHA-256, 27,500 iterations and a 64-byte key, is saved as Casdoor's `pbkdf2-salt` type.
- Other hashes, such as PBKDF2 with SHA-512 or other iteration counts and Argon2, the defaults of newer Keycloak versions, are checked by the action. After the first successful sign-in, Casdoor saves the password again with the password type of the organization.

See [Passwords](/docs/migration/overview#passwords) for how Casdoor checks hashes through the action.

## Export the realm

1. On the Keycloak server, export the realm with its users:

   ```bash
   bin/kc.sh export --dir /tmp/export --realm <realm> --users realm_file
   ```

   `<realm>` is the name of the realm. The command writes `/tmp/export/<realm>-realm.json`.

1. For a realm with many users, write the users into several files instead:

   ```bash
   bin/kc.sh export --dir /tmp/export --realm <realm> --users different_files --users-per-file 5000
   ```

   Upload all the files of the directory together. If they are larger than 45 MB in total, split the user files over several migrations, and upload the realm file with each part.

:::caution

Don't use **Partial export** in the Keycloak admin console. It has no users and replaces the client secrets with `**********`, so the applications would get new client secrets.

:::

## Install the action

1. In the Casdoor admin console, go to **Identity** > **Marketplace**.
1. Search for **Keycloak Migration** and click **Install**.
1. Choose the organization that the realm goes to, and click **Install**.

## Create the migration

1. Go to **Admin** > **Migrations** and click **Add**.
1. Choose the **Organization**, enter a **Name** such as `keycloak`, and choose **Keycloak Migration** as the **Action**. Leave **Host**, **Client ID** and **Client secret** empty.
1. If you exported several realms into the same files, set **Metadata** to the realm to import:

   ```json
   {"realm": "<realm>"}
   ```

1. Under **Files**, choose the export files. Choose them again before each **Preview** and **Apply**, because Casdoor doesn't save them.

## Preview and apply

1. Click **Preview** and wait until the **Report** shows **Previewed**.

   ![The preview of a Keycloak migration with the number of new objects of each kind and the warnings](/img/migration/migration_preview.png)

1. Check the numbers and the **Warnings**. Common warnings:
   - Clients of other protocols, such as SAML clients, are not imported.
   - The identity providers that users are linked to. Add them to Casdoor as [providers](/docs/provider/overview) of the applications.
   - Users from a user federation such as LDAP have no password in the export. Connect the LDAP server to the organization instead. See [LDAP](/docs/ldap/overview).
1. Click **Apply** and confirm.

## Switch the applications

1. In each application, replace the Keycloak issuer `https://<keycloak-host>/realms/<realm>` with your Casdoor address, or set the discovery URL to `https://<your-casdoor-host>/.well-known/openid-configuration`. Keep the client ID and client secret. See [Standard OIDC client](/docs/how-to-connect/oidc-client).
1. In the services that check access tokens, replace the Keycloak issuer and JSON Web Key Set (JWKS) URL with Casdoor's. A service that only checks the signature with the realm's public key keeps working without a change.
1. If a service reads Keycloak's own claims, such as `realm_access` and `resource_access`, add the claims it needs with a [flow](/docs/flows/overview) that runs before a token is issued, or read the roles from Casdoor.

Right before the switch, click **Apply** again to bring over the users who signed up in Keycloak since the last run.

## Verify the result

1. Sign in to one of the applications with a migrated user's username and Keycloak password.
1. Decode the ID token. Check that `sub` is the user's Keycloak ID, and that `kid` in the header is the key ID of the realm's RS256 key in Keycloak, under **Realm settings** > **Keys**.
1. If the user had an authenticator app in Keycloak, check that Casdoor asks for its code.

## What is not imported

- SAML clients, Keycloak organizations, authorization services and client scopes.
- Required actions, such as verifying the email or updating the password.
- Passkeys and security keys. They are bound to the Keycloak domain, so users register them again.
- Keys other than RSA signing keys.

## See also

- [Migrations](/docs/migration/overview)
- [Casdoor vs Keycloak](/docs/comparison/casdoor-vs-keycloak)
- [Keycloak syncer](/docs/syncer/Keycloak), to keep reading users from a Keycloak database that stays in use
- [Keycloak: importing and exporting realms](https://www.keycloak.org/server/importExport)
