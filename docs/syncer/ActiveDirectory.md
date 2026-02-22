---
title: Active Directory syncer
description: Sync users from Microsoft Active Directory to Casdoor via LDAP/LDAPS.
keywords: [syncer, active directory, ad, ldap]
authors: [nomeguy]
---

The **Active Directory syncer** pulls users from Microsoft Active Directory into Casdoor over LDAP or LDAPS and keeps the directory in sync.

## Prerequisites

You need:

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

Leave database-related fields (Database type, Database, Table) empty for the Active Directory syncer.

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
`userAccountControl` bit 2 indicates a disabled account; those users are marked as forbidden in Casdoor.
:::

## Running the syncer

1. Click **Test Connection** to verify connectivity and credentials.
2. Toggle **Is enabled** and click **Sync** for an immediate run.
3. The syncer fetches all user accounts under the Base DN using the filter `(&(objectClass=user)(objectCategory=person))` (computers and other AD objects are excluded).

## Troubleshooting

If the syncer fails to connect or retrieve users, check the following:

- Verify network connectivity to the AD domain controller on the LDAP port
- Ensure the Bind DN and password are correct
- Confirm the service account has read permissions on the Base DN
- Check that the Base DN is correctly formatted (e.g., `DC=example,DC=com`)
- Verify firewall rules allow LDAP traffic from Casdoor to the domain controller
