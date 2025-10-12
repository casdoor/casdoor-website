---
title: Overview
description: Managing Users in Casdoor
keywords: [user, properties, import]
authors: [sh1luo]
---

## User Properties

As an authentication platform, Casdoor is able to manage users. Every user has the following properties:

- `Owner`: The organization that owns the user
- `Name`: The unique username
- `CreatedTime`
- `UpdatedTime`
- `Id`: Unique identifier for each user
- `Type`
- `Password`
- `PasswordSalt`
- `PasswordOptions`: Password complexity options
- `DisplayName`: Displayed in the user interface
- `FirstName`
- `LastName`
- `Avatar`: A link to the user's avatar
- `PermanentAvatar`
- `Email`
- `Phone`
- `Location`
- `Address`
- `Affiliation`
- `Title`
- `IdCardType`
- `IdCard`
- `Homepage`
- `Bio`
- `Tag`
- `Region`
- `Language`
- `Gender`
- `Birthday`
- `Education`
- `Score`
- `Karma`
- `Ranking`
- `IsDefaultAvatar`
- `IsOnline`
- `IsAdmin`: Indicates whether the user is an admin of their organization
- `IsGlobalAdmin`: Indicates whether the user has permission to manage the Casdoor
- `IsForbidden`
- `IsDeleted`
- `SignupApplication`
- `Hash`
- `PreHash`
- `CreatedIp`
- `LastSigninTime`
- `LastSigninIp`
- `Roles`: An array of the user's roles
- `Permissions`: An array of the user's permissions

Unique IDs for social platform logins:

- `Github`
- `Google`
- `QQ`
- `WeChat`
- `Facebook`
- `DingTalk`
- `Weibo`
- `Gitee`
- `LinkedIn`
- `Wecom`
- `Lark`
- `Gitlab`
- `Adfs`
- `Baidu`
- `Casdoor`
- `Infoflow`
- `Apple`
- `Azure AD`
- `Azure AD B2C`
- `Slack`
- `Steam`
- `Ldap`
- `Properties`: A string->string map that stores any additional custom properties.

## Using the Properties Field

The `Properties` field is a flexible key-value map (`map[string]string`) that allows you to store custom attributes for users beyond the predefined fields in the User schema. This is particularly useful when you need to:

- Store organization-specific user attributes
- Add custom metadata that doesn't fit into standard fields
- Extend user profiles without modifying the core schema

### Setting Properties

You can set properties when creating or updating a user through the API. Here's an example of a user object with custom properties:

```json
{
  "owner": "my-organization",
  "name": "john_doe",
  "displayName": "John Doe",
  "email": "john@example.com",
  "properties": {
    "department": "Engineering",
    "employeeId": "EMP-12345",
    "costCenter": "CC-100",
    "manager": "jane_smith"
  }
}
```

### Accessing Properties

Properties can be accessed through:

- **Casdoor API**: When retrieving user information via API calls, the `properties` field will be included in the response
- **User Interface**: Properties can be viewed and edited in the Casdoor user management interface if configured as visible in the organization's account customization settings
- **Token Claims**: Custom properties can be included in JWT tokens if configured in your application settings

### Use Cases

Common use cases for the Properties field include:

- **Employee Information**: Store employee-specific data like employee ID, department, or job level
- **Integration Data**: Store external system identifiers for user synchronization
- **Custom Attributes**: Add any organization-specific attributes such as team name, project assignments, or security clearance levels
- **Temporary Flags**: Store temporary status flags or metadata for user workflows

### Best Practices

- Use consistent naming conventions for property keys (e.g., camelCase or snake_case)
- Document your custom properties and their expected values
- Keep property values as strings; perform type conversions in your application as needed
- Avoid storing sensitive information in properties; use appropriate secure fields instead

## Importing Users from XLSX File

You can add new users or update existing Casdoor users by uploading an XLSX file containing user information.

In the Admin Console, go to Users and click the **Upload (.xlsx)** button.

![Importing Users](/img/user/import_users.png)

Select your XLSX file and click Open. The users will be imported.

We provide a [template XLSX file](https://github.com/casdoor/casdoor/blob/master/xlsx/user_test.xlsx) named `user_test.xlsx` in the `xlsx` folder. The template includes 5 test users and headers for some required user properties.

![Import Successful](/img/user/import_success.png)

## Bypass password encryption

When migrating users from an external database to Casdoor, there might be situations where you want to bypass or control the default encryption method provided by `organization` default Password type method.

This can be achieved by using the `passwordType` field during user import.

:::note User with Bycrypt password

Below is an example of a POST body request for the API route `/api/add-user`.

```json
{
  "owner": "organization",
    "signupApplication": "first-app",
    "email":"dev@dev.com",
    "name": "dev",
    "displayName": "developper",
    "password": "$2a$10$.o/iVyDE9Xk8ioywHDnQRu72RviOi6FPa1ujhusbSCZeg7VOa6MY6",
    "passwordType":"bcrypt",
}
```

Here, the user's password is already encrypted using the bcrypt algorithm, so we specify the `passwordType` as "bcrypt" to inform Casdoor not to encrypt it again.

:::
