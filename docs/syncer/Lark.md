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
| **Lark platform** | `Feishu (open.feishu.cn)` for an app on Feishu, or `Lark (open.larksuite.com)` for an app on Lark |
| **App ID** | Your Lark App ID |
| **App secret** | Your Lark App Secret |

Feishu and Lark are separate platforms, so choose the one where you created the app. Casdoor selects Feishu when you set the type to Lark. If the platform is empty, Casdoor calls Lark.

The database-related fields (database type, port, table name, etc.) are not used for the Lark syncer and can be left empty.

## Field mappings

| Lark field | Casdoor field | Notes |
|------------|---------------|-------|
| `user_id` | `Id` | Stable internal user ID |
| `user_id` | `Name` | Username (falls back to `union_id`, then `open_id`, if empty) |
| `name` | `DisplayName` | User's display name |
| `email` | `Email` | Primary email |
| `mobile` | `Phone` | Mobile number |
| `avatar.avatar_240` | `Avatar` | 240 x 240 avatar URL (falls back to `avatar_72`) |
| `job_title` | `Title` | Job title |
| `gender` | `Gender` | 1 = Male, 2 = Female |

## OAuth login binding

When a user is synced from Lark, their Lark `user_id` is stored in the `lark` field on the Casdoor user. The Lark OAuth provider identifies users by their `open_id` instead, so the first Lark sign-in of a synced user doesn't find the user through this field.

Casdoor then applies the **Binding rule** of the provider in the application, which is `Email`, `Phone` by default. The synced user is linked if their email address matches the one that Lark returns. `Phone` also compares the country code, which the syncer doesn't set, so it usually doesn't match a synced user. To link by username, add `Name` to the binding rule: the synced username is the `user_id`, which is also the username that Lark sign-in returns when the app may read the `user_id`. When a rule matches, Casdoor writes the `open_id` into the `lark` field and later sign-ins find the user directly. If no rule matches, Casdoor handles the sign-in as the sign-up of a new user, which fails with `Email already exists` if the synced user has the same email address. See [How Casdoor links accounts](/docs/provider/oauth/overview#automatic-account-linking).

When a later sync updates the user, the syncer writes the `user_id` back into the `lark` field, and the next sign-in links the user again through the binding rule.

## Running the syncer

Click **Test Connection** to verify your App ID and Secret before enabling. Toggle **Is enabled** for scheduled sync, or click **Sync** to run immediately.

The syncer fetches the complete department tree starting from the root, deduplicates users who belong to multiple departments, and handles pagination automatically.
