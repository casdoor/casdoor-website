---
title: Active Directory
description: Using Active Directory Syncer to synchronize users from Active Directory
keywords: [syncer, active directory, ad, ldap]
authors: [nomeguy]
---

Active Directory Syncer enables automatic user synchronization from Microsoft Active Directory to Casdoor. The syncer connects to Active Directory via LDAP/LDAPS protocol to retrieve user information and keep your user directory synchronized.

## Prerequisites

To use the Active Directory syncer, you need:

- An Active Directory domain controller accessible via network
- A service account with read permissions to the user directory
- The Base DN (search base) for your user directory
- Network connectivity on LDAP port 389 (or LDAPS port 636 for secure connection)

## Configuration

To create an Active Directory syncer in Casdoor:

1. Navigate to the **Syncers** tab
2. Click **Add** to create a new syncer
3. Fill in the following required fields:

| Field | Description | Example |
|-------|-------------|---------|
| Organization | The Casdoor organization where users will be imported | my-org |
| Name | A unique identifier for this syncer | ad-syncer |
| Type | Select "Active Directory" | Active Directory |
| Server | Hostname or IP address of your AD domain controller | dc.example.com |
| LDAP Port | LDAP port (389 for LDAP, 636 for LDAPS) | 389 |
| Bind DN | Distinguished name of the service account | CN=Service Account,CN=Users,DC=example,DC=com |
| Password | Password for the service account | your-password |
| Base DN | Search base for users | DC=example,DC=com |

Other database-related fields (Database type, Database, Table) are not used for Active Directory syncer and can be left empty.

:::tip

For production environments, it's recommended to use LDAPS (port 636) for secure communication with Active Directory.

:::

## Field Mappings

The syncer automatically maps Active Directory user attributes to Casdoor user fields:

| Active Directory Field | Casdoor Field | Description |
|------------------------|---------------|-------------|
| objectGUID | Id | User's unique identifier (GUID) |
| sAMAccountName | Name | Username (login name) |
| displayName | DisplayName | Display name |
| givenName | FirstName | First name |
| sn | LastName | Last name |
| mail | Email | Email address |
| mobile | Phone | Mobile phone number |
| title | Title | Job title |
| department | Affiliation | Department |
| userAccountControl | IsForbidden | Account status |

:::info

The `userAccountControl` attribute is used to determine account status. Bit 2 of this value indicates if the account is disabled. Disabled accounts in Active Directory will be marked as forbidden in Casdoor.

:::

## Running the Syncer

After configuration:

1. Click **Test Connection** to verify connectivity and credentials
2. Enable the syncer by toggling **Is enabled**
3. Click **Sync** to trigger an immediate synchronization
4. The syncer will automatically fetch all user accounts from the specified Base DN

The syncer uses the LDAP filter `(&(objectClass=user)(objectCategory=person))` to retrieve only user accounts, excluding computer accounts and other AD objects.

## Troubleshooting

If the syncer fails to connect or retrieve users, check the following:

- Verify network connectivity to the AD domain controller on the LDAP port
- Ensure the Bind DN and password are correct
- Confirm the service account has read permissions on the Base DN
- Check that the Base DN is correctly formatted (e.g., `DC=example,DC=com`)
- Verify firewall rules allow LDAP traffic from Casdoor to the domain controller
