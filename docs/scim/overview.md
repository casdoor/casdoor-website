---
title: Overview
description: Provision and manage users in Casdoor via the SCIM 2.0 API.
keywords: [SCIM, provisioning, user management]
authors: [Chinoholo0807]
---

[SCIM](https://datatracker.ietf.org/doc/html/rfc7644) is an HTTP-based standard for provisioning and managing identity data. Casdoor can act as a **SCIM service provider** so external systems can create, read, update, and delete users via SCIM.

## Supported resources

Casdoor currently supports the **User** resource only. You manage users with these endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/scim/ServiceProviderConfig` | GET | Supported SCIM features and resources |
| `/scim/Schemas` | GET | Service provider schemas |
| `/scim/ResourceTypes` | GET | Resource type metadata |
| `/scim/Users/:id` | GET | Get user by id |
| `/scim/Users` | GET | List users (query params: `startIndex`, `count`) |
| `/scim/Users` | POST | Create user |
| `/scim/Users/:id` | PUT | Replace user |
| `/scim/Users/:id` | PATCH | Partial update |
| `/scim/Users/:id` | DELETE | Delete user |

See [RFC 7644](https://datatracker.ietf.org/doc/html/rfc7644) for the full SCIM spec.

## User attribute mapping

SCIM User attributes map to Casdoor User fields as follows:

| User Resource Schema (SCIM)          | User (Casdoor)  |
| ------------- | -------------------------------------- |
| id | Id |
| meta.created | CreatedTime |
| meta.lastModified | UpdatedTime |
| meta.version | UpdatedTime |
| externalId | ExternalId |
| userName | Name |
| password | Password |
| displayName | DisplayName |
| profileUrl | Homepage |
| userType | Type |
| name.givenName | FirstName |
| name.familyName | LastName |
| emails[0].value | Email |
| phoneNumbers[0].value | Phone |
| photos[0].value | Avatar |
| addresses[0].locality | Location |
| addresses[0].region | Region |
| addresses[0].country | CountryCode |

Since Casdoor use Organization to manage User, where each User belongs to a specific Organization, the `organization` attribute should be passed in `Enterprise User Schema Extension` (identified by the schema URI `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User`). Here is a User Resource Schema SCIM representation in JSON format:

```json
{
    "active": true,
    "addresses": [
        {
            "country": "CN",
            "locality": "Shanghai",
            "region": "CN"
        }
    ],
    "displayName": "Bob~",
    "emails": [
        {
            "value": "test1@casdoor.com"
        }
    ],
    "externalId": "1234123543234234",
    "id": "ceacbcb6-40d0-48f1-af23-0990232d570a",
    "meta": {
        "resourceType": "User",
        "created": "2023-10-08T23:51:55+08:00",
        "lastModified": "2023-10-12T20:38:49+08:00",
        "location": "Users/ceacbcb6-40d0-48f1-af23-0990232d570a",
        "version": "2023-10-12T20:38:49+08:00"
    },
    "name": {
        "familyName": "bob",
        "formatted": "alice bob",
        "givenName": "alice"
    },
    "nickName": "Bob~",
    "phoneNumbers": [
        {
            "value": "18700006475"
        }
    ],
    "photos": [
        {
            "value": "https://cdn.casbin.org/img/casbin.svg"
        }
    ],
    "profileUrl": "https://test.com/profile/built-in/scim_test_user2",
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User",
        "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
    ],
    "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": { // The enterprise User extension is identified using this schema URI
        "organization": "built-in" // This attribute MUST be passed
    },
    "userName": "scim_test_user2",
    "userType": "normal-user"
}
```
