---
title: WeCom
description: Using WeCom Syncer to synchronize users from WeCom
keywords: [syncer, wecom, wechat work]
authors: [UsherFall]
---

WeCom Syncer allows you to automatically import users from your WeCom (企业微信) organization into Casdoor. The syncer fetches user information from all departments in your WeCom organization through the WeCom API and keeps the user data synchronized.

## Configuration

The following fields are required:

- **Organization**: The Casdoor organization where users will be imported
- **Name**: A unique name for this syncer
- **Type**: Select "WeCom"
- **Corp ID**: Your WeCom organization's Corp ID
- **Corp Secret**: The secret for your WeCom application

## Setup Steps

### Step 1: Obtain WeCom Credentials

1. Log in to your [WeCom Admin Console](https://work.weixin.qq.com/)
2. Navigate to **My Company** → **Company Information** to find your **Corp ID**
3. Go to **Applications & Tools** → **Applications** → Create or select an application
4. Get the **Secret** (Corp Secret) from the application details page

### Step 2: Configure the Syncer in Casdoor

1. Navigate to the **Syncers** page in Casdoor
2. Click **Add** to create a new syncer
3. Fill in the required information:
   - Set **Type** to "WeCom"
   - Enter your WeCom **Corp ID** in the Corp ID field
   - Enter your application **Secret** in the Corp Secret field
4. Click **Test Connection** to verify your credentials
5. Configure the table columns mapping (the default mapping should work for most cases)
6. Save the syncer configuration

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
