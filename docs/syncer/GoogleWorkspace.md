---
title: Google Workspace
description: Using Google Workspace Syncer to synchronize users from Google Workspace
keywords: [syncer, google workspace, google admin]
authors: [nomeguy]
---

Google Workspace Syncer enables automatic user synchronization from Google Workspace (formerly G Suite) to Casdoor. The syncer uses the Google Admin SDK Directory API to retrieve user information and keep your user directory synchronized.

## Prerequisites

Before configuring the syncer, you need to set up a Google Cloud service account with domain-wide delegation and the Admin SDK enabled.

### Step 1: Create a Service Account

Navigate to [Google Cloud Console](https://console.cloud.google.com) and create a service account:

1. Go to **IAM & Admin** → **Service Accounts** → **Create Service Account**
2. Enter a name and description for the service account
3. Click **Create and Continue**
4. Grant the service account the **Service Account User** role (optional)
5. Click **Done**

### Step 2: Generate a Service Account Key

After creating the service account, generate a JSON key:

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** → **Create new key**
4. Select **JSON** format
5. Click **Create** and save the downloaded JSON file securely

### Step 3: Enable Admin SDK API

Enable the Admin SDK API for your Google Cloud project:

1. Go to **APIs & Services** → **Library**
2. Search for "Admin SDK API"
3. Click on it and click **Enable**

### Step 4: Configure Domain-Wide Delegation

Set up domain-wide delegation in Google Workspace Admin:

1. In the service account details, copy the **Client ID**
2. Go to [Google Workspace Admin Console](https://workspace.google.com)
3. Navigate to **Security** → **Access and data control** → **API controls**
4. Click **Manage Domain Wide Delegation**
5. Click **Add new**
6. Paste the service account Client ID
7. Add the OAuth scope: `https://www.googleapis.com/auth/admin.directory.user.readonly`
8. Click **Authorize**

:::tip

The `admin.directory.user.readonly` scope allows the syncer to read user profiles in your Google Workspace domain in read-only mode.

:::

## Configuration

To create a Google Workspace syncer in Casdoor:

1. Navigate to the **Syncers** tab
2. Click **Add** to create a new syncer
3. Fill in the following required fields:

| Field | Description |
|-------|-------------|
| Organization | The Casdoor organization where users will be imported |
| Name | A unique identifier for this syncer |
| Type | Select "Google Workspace" |
| Admin Email | Email address of a Google Workspace admin user (e.g., <admin@yourdomain.com>) |
| Service Account Key | Paste the complete JSON content of the service account key file |

Other database-related fields (Database type, Port, Database, Table) are not used for Google Workspace syncer and can be left empty.

## Field Mappings

The syncer automatically maps Google Workspace user attributes to Casdoor user fields:

| Google Workspace Field | Casdoor Field | Description |
|------------------------|---------------|-------------|
| id | Id | User's unique identifier |
| primaryEmail | Email | Primary email address |
| name.fullName | Name | Full name |
| name.givenName | FirstName | First name |
| name.familyName | LastName | Last name |
| phones[0].value | Phone | Primary phone number |
| isAdmin | IsAdmin | Admin status |
| suspended | IsForbidden | Account suspension status |

:::info

The `suspended` field maps directly to `IsForbidden`. When a user is suspended in Google Workspace (`suspended: true`), they will be marked as forbidden in Casdoor (`IsForbidden: true`).

:::

## Running the Syncer

After configuration:

1. Click **Test Connection** to verify your credentials and permissions
2. Enable the syncer by toggling **Is enabled**
3. Click **Sync** to trigger an immediate synchronization
4. The syncer will automatically fetch all users from your Google Workspace domain

The syncer handles pagination automatically, retrieving all users regardless of the total count.
