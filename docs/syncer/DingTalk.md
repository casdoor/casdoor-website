---
title: DingTalk syncer
description: Sync users from DingTalk (钉钉) to Casdoor via the DingTalk API.
keywords: [syncer, dingtalk]
authors: [mserico]
---

The **DingTalk syncer** imports users from your DingTalk organization into Casdoor. It uses the DingTalk API to fetch users from all departments and keeps data in sync.

## Configuration

Required fields:

- **Organization**: Target Casdoor organization for imported users
- **Name**: Unique identifier for this syncer
- **Type**: Select "DingTalk"
- **App Key**: Your DingTalk application's App Key
- **App Secret**: Your DingTalk application's App Secret

## Setup Steps

### Step 1: Obtain DingTalk Application Credentials

Access your DingTalk Open Platform and create or select an existing application. You'll need to obtain two critical pieces of information from your application settings:

The **App Key** serves as your application's public identifier, while the **App Secret** functions as your private authentication token. Both are essential for establishing secure API communication between Casdoor and your DingTalk organization.

Navigate to your application's management interface to locate these credentials. Keep the App Secret secure as it provides full access to your organization's user directory.

### Step 2: Configure in Casdoor

Open the Syncers tab and create a new syncer with type "DingTalk". Enter your App Key and App Secret in their respective fields. The syncer doesn't require database configuration fields since it connects directly to DingTalk's API.

After saving your configuration, use the **Test Connection** button to verify that Casdoor can successfully authenticate with your DingTalk organization.

## Field Mappings

The syncer maps DingTalk user attributes to Casdoor fields as follows:

| DingTalk Field | Casdoor Field | Description |
|----------------|---------------|-------------|
| userid | Id | User's unique identifier |
| unionid | Name | Unique user identifier (falls back to userid if empty) |
| name | DisplayName | User's display name |
| email | Email | Email address |
| mobile | Phone | Mobile phone number |
| avatar | Avatar | Profile picture URL |
| title | Title | Job title or position |
| active | IsForbidden | Account status (inverted) |

Account status mapping works inversely: when a DingTalk user is marked as inactive (`active: false`), they appear as forbidden in Casdoor (`IsForbidden: true`). Active DingTalk users sync as normal Casdoor accounts.

The syncer uses `unionid` as the username in Casdoor, matching the behavior of the OAuth provider. This ensures users who sign in via OAuth and those imported via the syncer maintain consistent identities. The `unionid` field provides a stable identifier that persists even when employee numbers or other attributes change.

## Custom field mapping

By default, the syncer maps a fixed set of DingTalk fields to Casdoor fields as shown in the table above. If your organization needs a different mapping, configure **Table columns** on the syncer. When at least one column is defined, the syncer uses your custom mapping instead of the defaults.

Each column entry has a **Name** (DingTalk source field) and maps it to the corresponding Casdoor field. The supported DingTalk source field names are:

| DingTalk field | Description |
|----------------|-------------|
| `userid` | User's unique identifier in DingTalk |
| `unionid` | Cross-app stable identifier |
| `name` | Display name |
| `email` | Email address |
| `mobile` | Mobile phone number |
| `avatar` | Profile picture URL |
| `title` | Job title |
| `job_number` | Employee number |
| `active` | Account status (inverted to `IsForbidden`) |

When **Table columns** is empty, the syncer falls back to its built-in mapping.

## Department and group sync

The DingTalk syncer also synchronizes departments as Casdoor groups. For each department in your organization, the syncer fetches the department ID and display name and creates a corresponding group in Casdoor. Each user's department memberships are mapped to group assignments, so users are placed in the correct groups after sync.

Department discovery is **recursive**: starting from the root department, the syncer calls `topapi/v2/department/listsub` for each parent department and traverses the full tree depth. This ensures that sub-departments nested at any level are included, not just the immediate children of root. Department details are then fetched individually via `topapi/v2/department/get`. If a department lookup fails, it is skipped and the rest of the sync continues.

## OAuth login binding

When a user is synced from DingTalk, their DingTalk `unionid` is stored in the `dingtalk` field on the Casdoor user. Synced users can therefore sign in via the DingTalk OAuth provider without a separate account link step.

## Running the Syncer

Enable the syncer through the **Is enabled** toggle to activate scheduled synchronization. For immediate imports, click the **Sync** button to trigger a manual synchronization run.

The syncer automatically retrieves users and departments from all parts of your DingTalk organization, handling deduplication when users belong to multiple departments. Pagination is managed internally, ensuring complete synchronization regardless of organization size.
