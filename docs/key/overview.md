---
title: Keys
description: Manage API access keys (AccessKey/AccessSecret pairs) scoped to an organization, application, or user.
keywords: [key, API key, access key, access secret]
authors: [hsluoyz]
---

**Keys** are AccessKey/AccessSecret pairs that can be used to authenticate API requests. Unlike OAuth tokens, keys are long-lived credentials with an explicit expiry date and state.

## Key properties

| Field | Description |
|-------|-------------|
| **Name** | Unique identifier for this key within the organization |
| **Display name** | Human-readable label |
| **Type** | Scope of the key: `Organization`, `Application`, or `User` |
| **Organization** | The organization this key belongs to |
| **Application** | The application this key is scoped to (when Type is `Application`) |
| **User** | The user this key is scoped to (when Type is `User`) |
| **Access key** | The public key identifier (auto-generated) |
| **Access secret** | The secret portion of the key pair (auto-generated, treat as a password) |
| **Expire time** | When the key expires. After this time, the key is no longer valid |
| **State** | `Active` or `Inactive` |

## Key types

- **Organization** — Key is valid for all operations within the organization.
- **Application** — Key acts as the application, with the same rights as the application's client ID and client secret: an administrator of the application's organization, or a global administrator when the application belongs to the `built-in` organization. Only global administrators can create application keys.
- **User** — Key is tied to a specific user and carries that user's permissions.
- **Prometheus** — Key that authorizes scraping the [Prometheus metrics endpoint](/docs/monitoring/Prometheus) (`/api/metrics`). The key must belong to the `admin` or `built-in` organization.

## Managing keys

Navigate to **Keys** in the Casdoor sidebar to view, create, and manage keys.

When creating a key, Casdoor auto-generates the Access key and Access secret. Copy the Access secret immediately after creation — it is not shown again in plaintext after you navigate away.

Set **State** to `Inactive` to temporarily disable a key without deleting it.

:::caution

Treat the Access secret like a password. Store it in a secrets manager and never commit it to source control.

:::

## Who can create and edit keys

Global administrators can create and edit any key. For everyone else, Casdoor applies these rules when a key is added or updated:

- The key must belong to the caller's organization. Casdoor sets **Organization** to the caller's organization, and refuses a request that names another organization.
- An organization administrator can create keys for any user of their organization, but can't create **Application** keys.
- A user who isn't an administrator can create and edit only keys whose **User** is themselves.

Casdoor rejects a request that breaks a rule with `Unauthorized operation`.
