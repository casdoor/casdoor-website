---
title: Overview
description: Use Casdoor as SCIM service provider
keywords: [SCIM]
authors: [Chinoholo0807]
---

The SCIM protocol is a HTTP-based protocol for provisioning and managing identity data specified through SCIM schemas.
You can use Casdoor as a SCIM service provider.

## Use Casdoor as SCIM service provider

Currently Casdoor only support `User Resource Schema`, you can manage users through SCIM User operations.
You can interact with the Casdoor through the following endpoints:

| Endpoint          | Method  | Description | 
| ------------- | ------------- | ------------- |
| /scim/ServiceProviderConfig | GET | Provide details about the features of the SCIM standard that are supported, for example, the resources that are supported. |
| /scim/Schemas | GET | Provide details about the service provider schemas. |
| /scim/ResourceTypes | GET | Specifie metadata about each resource. |
| /scim/Users/:id | GET | Retrieve a user with resource identifier `id`. |
| /scim/Users | GET | Query users with query parameters (currently only support `startIndex` and `count`). |
| /scim/Users | POST | Create a user. |
| /scim/Users/:id | PUT | Update a user with resource identifier `id`. |
| /scim/Users/:id | PATCH | Modify a user with resource identifier `id` by PATCH operation. |
| /scim/Users/:id | DEL | Delete a user with resource identifier `id`. |

For more details, please refer to [rfc7644](https://datatracker.ietf.org/doc/html/rfc7644).

## User Resource

Casdoor implements the mapping between `User Resource Schema` (SCIM) and `User` (Casdoor).
The mapping relationship between attributes is as follows:

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
