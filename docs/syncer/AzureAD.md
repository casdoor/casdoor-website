---
title: Azure AD
description: Using Azure AD Syncer to synchronize users from Azure Active Directory
keywords: [syncer, azure ad, microsoft]
authors: [Copilot]
---

Azure AD Syncer enables automatic user synchronization from Azure Active Directory (Microsoft Entra ID) to Casdoor. The syncer uses the Microsoft Graph API to fetch user information and keeps your user directory up to date.

## Prerequisites

Before configuring the Azure AD syncer, you need to set up an application registration in Azure Portal with the appropriate permissions.

### Step 1: Register an Application

Navigate to [Azure Portal](https://portal.azure.com) and register a new application:

1. Go to **Azure Active Directory** → **App registrations** → **New registration**
2. Enter a name for your application
3. Select the appropriate account type (typically "Accounts in this organizational directory only")
4. Click **Register**

### Step 2: Create a Client Secret

After registration, create a client secret:

1. In your application, go to **Certificates & secrets**
2. Click **New client secret**
3. Add a description and select an expiration period
4. Click **Add** and copy the secret value immediately (it won't be shown again)

### Step 3: Grant API Permissions

Configure the required Microsoft Graph API permissions:

1. Go to **API permissions** → **Add a permission**
2. Select **Microsoft Graph** → **Application permissions**
3. Add the `User.Read.All` permission
4. Click **Grant admin consent** for your organization

:::tip

The `User.Read.All` permission allows the syncer to read all user profiles in your Azure AD tenant.

:::

## Configuration

To create an Azure AD syncer in Casdoor:

1. Navigate to the **Syncers** tab
2. Click **Add** to create a new syncer
3. Fill in the following required fields:

| Field | Description |
|-------|-------------|
| Organization | The Casdoor organization where users will be imported |
| Name | A unique identifier for this syncer |
| Type | Select "Azure AD" |
| Tenant ID | Your Azure AD tenant ID (found in Azure Portal → Azure Active Directory → Overview) |
| Client ID | The Application (client) ID from your app registration |
| Client Secret | The client secret value you created earlier |

Other database-related fields (Database type, Port, Database, Table) are not used for Azure AD syncer and can be left empty.

## Field Mappings

The syncer automatically maps Azure AD user attributes to Casdoor user fields:

| Azure AD Field | Casdoor Field | Description |
|----------------|---------------|-------------|
| id | Id | User's unique identifier |
| userPrincipalName | Name | User principal name |
| displayName | DisplayName | User's display name |
| givenName | FirstName | First name |
| surname | LastName | Last name |
| mail | Email | Email address |
| mobilePhone | Phone | Mobile phone number |
| jobTitle | Title | Job title |
| officeLocation | Location | Office location |
| preferredLanguage | Language | Preferred language |
| accountEnabled | IsForbidden | Account status (inverted) |

:::info

The `accountEnabled` field is inverted when mapped to `IsForbidden`. When a user is disabled in Azure AD (`accountEnabled: false`), they will be marked as forbidden in Casdoor (`IsForbidden: true`).

:::

## Running the Syncer

After configuration:

1. Click **Test Connection** to verify your credentials and permissions
2. Enable the syncer by toggling **Is enabled**
3. Click **Sync** to trigger an immediate synchronization
4. The syncer will automatically fetch all users from your Azure AD tenant

The syncer handles pagination automatically, retrieving all users regardless of the total count.
