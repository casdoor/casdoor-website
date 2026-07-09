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
- **Application** — Key is scoped to a specific application within the organization.
- **User** — Key is tied to a specific user and carries that user's permissions.

## Managing keys

Navigate to **Keys** in the Casdoor sidebar to view, create, and manage keys.

When creating a key, Casdoor auto-generates the Access key and Access secret. Copy the Access secret immediately after creation — it is not shown again in plaintext after you navigate away.

Set **State** to `Inactive` to temporarily disable a key without deleting it.

The **Owner** field of an existing key can only be changed by a global admin. Non-global-admin users cannot reassign a key to a different owner; such requests are rejected with an authorization error.

:::caution

Treat the Access secret like a password. Store it in a secrets manager and never commit it to source control.

:::
