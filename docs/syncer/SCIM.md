---
title: SCIM 2.0 syncer
description: Pull users into Casdoor from any SCIM 2.0-compliant identity provider.
keywords: [syncer, SCIM, provisioning]
authors: [hsluoyz]
---

The **SCIM syncer** reads users from an external SCIM 2.0 server and imports them into Casdoor. It is read-only: Casdoor pulls from the SCIM source but does not push changes back.

:::info SCIM server vs. SCIM client
This page describes using Casdoor as a **SCIM client** (pulling users from an external SCIM server). For information on Casdoor acting as a **SCIM service provider** (receiving pushes from an external system), see [SCIM provisioning](/docs/scim/overview).
:::

## Configuration

Create a new syncer in Casdoor (**Syncers** → **Add**) and fill in:

| Field | Value |
|-------|-------|
| **Organization** | Target Casdoor organization |
| **Name** | A unique name for this syncer |
| **Type** | SCIM |
| **Server URL** | Base URL of the SCIM server (e.g. `https://idp.example.com/scim/v2`) |
| **Username** | Username for Basic Auth (optional) |
| **Password / API Token** | Password for Basic Auth, or a Bearer token |

If both Username and Password are provided, Casdoor uses HTTP Basic Auth. If only Password is set, it is sent as a `Bearer` token.

## Field mappings

| SCIM field | Casdoor field | Notes |
|------------|---------------|-------|
| `id` | `Id` | SCIM resource ID |
| `userName` | `Name` | Username |
| `displayName` | `DisplayName` | Display name; falls back to `name.formatted` then `givenName + familyName` |
| `name.givenName` | `FirstName` | First name |
| `name.familyName` | `LastName` | Last name |
| `emails[primary].value` | `Email` | Primary email; falls back to first email if no primary |
| `phoneNumbers[primary].value` | `Phone` | Primary phone number |
| `active` | `IsForbidden` | `active: false` → `IsForbidden: true` |

## Running the syncer

Click **Test Connection** to verify the server is reachable and credentials are accepted. Toggle **Is enabled** for scheduled sync, or click **Sync** to run immediately.

The syncer fetches users in pages of 100, iterating until all records are retrieved.
