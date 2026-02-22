---
title: WeCom syncer
description: Sync users from WeCom (企业微信) to Casdoor via the WeCom API.
keywords: [syncer, wecom, wechat work]
authors: [UsherFall]
---

The **WeCom syncer** imports users from your WeCom organization into Casdoor. It uses the WeCom API to fetch users from all departments and keeps data in sync.

## Configuration

Required fields:

- **Organization**: The Casdoor organization where users will be imported
- **Name**: A unique name for this syncer
- **Type**: Select "WeCom"
- **Corp ID**: Your WeCom organization's Corp ID
- **Corp Secret**: The secret for your WeCom application

## Setup Steps

### Step 1: Obtain WeCom Credentials

In your WeCom management platform, navigate to **My Company**, get **Corp ID** in **Company Information**.

![wecom_corpid](/img/syncer/WeCom/syncer_wecom_corpid.png)

In your Self-build App, get **App secret** (Corp Secret).

![wecom_app](/img/syncer/WeCom/syncer_wecom_app.png)

Optionally, in Sync of Contacts Management Tool, you can get **Sync of Contacts secret** for advanced configurations.

![wecom_contact](/img/syncer/WeCom/syncer_wecom_contact.png)

### Step 2: Configure the Syncer in Casdoor

Go to Syncers tab, select **WeCom** type and fill in the required information:

- Enter your WeCom **Corp ID** in the Corp ID field
- Enter your application **Secret** (App secret) in the Corp Secret field

Then save the changes.

![wecom_provider](/img/syncer/WeCom/syncer_wecom_provider.png)

Click **Test Connection** to verify your credentials before enabling the syncer.

## Field Mappings

The syncer automatically maps WeCom user fields to Casdoor user fields:

| WeCom Field | Casdoor Field | Description |
|-------------|---------------|-------------|
| userid | Id | User's unique identifier |
| name | DisplayName | User's display name |
| email | Email | Email address |
| mobile | Phone | Phone number |
| avatar | Avatar | Profile picture URL |
| position | Title | Job title |
| gender | Gender | Gender (1=Male, 2=Female) |
| status/enable | IsForbidden | Account status |

The syncer automatically handles user account status based on WeCom's status and enable fields:

- **Activated users** (status=1, enable=1): Normal Casdoor users
- **Disabled, not activated, or quit users** (status=2/4/5 or enable=0): Marked as forbidden in Casdoor

## Running the Syncer

After configuration, you can:

- Enable **Is enabled** to allow automatic synchronization on schedule
- Use the **Sync** button to manually trigger a synchronization
- The syncer will fetch users from all departments and deduplicate them automatically
