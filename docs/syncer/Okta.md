---
title: Okta syncer
description: Sync users from Okta to Casdoor via the Okta Users API.
keywords: [syncer, okta]
authors: [hsluoyz]
---

The **Okta syncer** pulls users from your Okta organization into Casdoor using the Okta Users API. It handles pagination automatically and maps account status to Casdoor's `IsForbidden` flag.

## Prerequisites

In the Okta Admin Console, create an API token (**Security** → **API** → **Tokens** → **Create Token**). The token needs read access to users.

Note your Okta domain (e.g. `https://your-org.okta.com`).

## Configuration

Create a new syncer in Casdoor (**Syncers** → **Add**) and fill in:

| Field | Value |
|-------|-------|
| **Organization** | Target Casdoor organization |
| **Name** | A unique name for this syncer |
| **Type** | Okta |
| **Server URL** | Your Okta domain (e.g. `https://your-org.okta.com`) |
| **Password** | Your Okta API token |

The database-related fields are not used and can be left empty.

## Field mappings

| Okta field | Casdoor field | Notes |
|------------|---------------|-------|
| `id` | `Id` | Okta user ID |
| `profile.login` | `Name` | Username (usually email) |
| `profile.displayName` | `DisplayName` | Full display name |
| `profile.firstName` | `FirstName` | Given name |
| `profile.lastName` | `LastName` | Family name |
| `profile.email` | `Email` | Primary email |
| `profile.mobilePhone` | `Phone` | Mobile number |
| `profile.title` | `Title` | Job title |
| `profile.preferredLanguage` | `Language` | Preferred language |
| `status` | `IsForbidden` | See status mapping below |

### Account status mapping

Okta users in the following states are marked as `IsForbidden = true` in Casdoor:

- `SUSPENDED`
- `DEPROVISIONED`
- `LOCKED_OUT`

All other statuses (`ACTIVE`, `STAGED`, `PROVISIONED`, `PASSWORD_EXPIRED`, `RECOVERY`) are treated as active.

## Running the syncer

Click **Test Connection** to verify connectivity before enabling. Toggle **Is enabled** for scheduled sync, or click **Sync** to run an immediate import.

Pagination is handled internally via Okta's `Link` response headers; all users are retrieved regardless of directory size.
