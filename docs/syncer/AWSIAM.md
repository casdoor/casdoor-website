---
title: AWS IAM syncer
description: Sync users and groups from AWS IAM into Casdoor.
keywords: [syncer, AWS, IAM]
authors: [hsluoyz]
---

The **AWS IAM syncer** imports users and groups from an AWS account into Casdoor using the AWS IAM API.

## Configuration

| Casdoor field | AWS IAM value |
|---------------|---------------|
| **Host** | AWS region (e.g. `us-east-1`) |
| **User** | AWS Access Key ID |
| **Password** | AWS Secret Access Key |

The IAM credentials must have at least the following permissions:

- `iam:ListUsers`
- `iam:ListUserTags`
- `iam:ListGroups`

## Field mappings

| AWS IAM field | Casdoor field | Notes |
|---------------|---------------|-------|
| `UserId` | `Id` | Stable unique identifier |
| `UserName` | `Name`, `DisplayName` | |
| `CreateDate` | `CreatedTime` | |
| Tag `Email` / `email` | `Email` | |
| Tag `Phone` / `phone` | `Phone` | |
| Tag `DisplayName` / `displayName` | `DisplayName` | Overrides UserName if set |
| Tag `FirstName` / `firstName` | `FirstName` | |
| Tag `LastName` / `lastName` | `LastName` | |
| Tag `Title` / `title` | `Title` | |
| Tag `Department` / `department` | `Affiliation` | |
| Other tags | `Properties` | Stored as-is |

Additional user attributes are read from IAM user tags. Any tag not listed above is stored in the user's `Properties` map.

### Status mapping

IAM users are active by default. To mark a user as forbidden in Casdoor, add one of these tags on the IAM user:

- `Status` = `Inactive` or `Disabled`
- `Active` = `false`, `False`, or `0`

## Group sync

The syncer fetches all IAM groups and creates corresponding Casdoor groups. Group membership sync is a known limitation: the AWS IAM API identifies groups by user name, while Casdoor's syncer interface works with user IDs. As a result, users are imported correctly but are not automatically placed in their IAM groups.

## Notes

- The syncer is **read-only**. It only pulls data from AWS; it does not create or modify IAM users.
- All API calls use a 60-second timeout for list operations and a 10-second timeout for per-user tag lookups.
- Pagination is handled automatically via IAM's marker-based paging, so there is no limit on the number of users.
