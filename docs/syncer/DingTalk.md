---
title: DingTalk
description: Using DingTalk Syncer to synchronize users from DingTalk
keywords: [syncer, dingtalk]
authors: [mserico]
---

DingTalk Syncer automatically imports users from your DingTalk (钉钉) organization into Casdoor. The syncer retrieves user information across all departments through the DingTalk API and maintains synchronized user data.

## Configuration

The syncer requires these fields:

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
| job_number | Name | Employee number (falls back to userid if empty) |
| name | DisplayName | User's display name |
| email | Email | Email address |
| mobile | Phone | Mobile phone number |
| avatar | Avatar | Profile picture URL |
| title | Title | Job title or position |
| active | IsForbidden | Account status (inverted) |

Account status mapping works inversely: when a DingTalk user is marked as inactive (`active: false`), they appear as forbidden in Casdoor (`IsForbidden: true`). Active DingTalk users sync as normal Casdoor accounts.

The syncer intelligently handles the Name field by preferring the job_number when available, ensuring consistent user identification across your organization's systems.

## Running the Syncer

Enable the syncer through the **Is enabled** toggle to activate scheduled synchronization. For immediate imports, click the **Sync** button to trigger a manual synchronization run.

The syncer automatically retrieves users from all departments in your DingTalk organization, handling deduplication when users belong to multiple departments. Pagination is managed internally, ensuring complete user directory synchronization regardless of organization size.
