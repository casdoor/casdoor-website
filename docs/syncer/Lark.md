---
title: Lark syncer
description: Sync users from Lark (Feishu) to Casdoor via the Lark Open Platform API.
keywords: [syncer, lark, feishu]
authors: [hsluoyz]
---

The **Lark syncer** imports users from your Lark (飞书) organization into Casdoor. It authenticates as an app, walks the department tree recursively, and pulls each member's profile.

## Prerequisites

Create a Lark app at the [Lark Open Platform](https://open.feishu.cn/). The app needs the following permissions:

- `contact:user.base:readonly` — Read basic user info
- `contact:department.base:readonly` — Read department structure

After publishing the app to your organization, copy the **App ID** and **App Secret** from the app's credentials page.

## Configuration

Create a new syncer in Casdoor (**Syncers** → **Add**) and fill in:

| Field | Value |
|-------|-------|
| **Organization** | Target Casdoor organization |
| **Name** | A unique name for this syncer |
| **Type** | Lark |
| **Client ID** | Your Lark App ID |
| **Client Secret** | Your Lark App Secret |

The database-related fields (database type, port, table name, etc.) are not used for the Lark syncer and can be left empty.

## Field mappings

| Lark field | Casdoor field | Notes |
|------------|---------------|-------|
| `user_id` | `Id` | Stable internal user ID |
| `name` | `DisplayName` | User's display name |
| `email` | `Email` | Primary email |
| `mobile` | `Phone` | Mobile number |
| `avatar.avatar_origin` | `Avatar` | Original-size avatar URL |
| `job_title` | `Title` | Job title |
| `gender` | `Gender` | 1 = Male, 2 = Female |

## OAuth login binding

When a user is synced from Lark, their Lark `user_id` is stored in the `lark` field on the Casdoor user. Synced users can sign in via the Lark OAuth provider without a separate account link step.

## Running the syncer

Click **Test Connection** to verify your App ID and Secret before enabling. Toggle **Is enabled** for scheduled sync, or click **Sync** to run immediately.

The syncer fetches the complete department tree starting from the root, deduplicates users who belong to multiple departments, and handles pagination automatically.
