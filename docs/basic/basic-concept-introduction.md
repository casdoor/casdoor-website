---
sidebar_position: 2
title: Basic Concept Introduction
---

This chapter is a brief introduction to concepts in Casdoor. Details of these concepts can be found in next chapters.

## User

As an authentication platform, Casdoor is able to manage users. Every user has these properties: 

- `Owner` Owner organization of the user
- `Name` User name
- `CreatedTime`
- `Id` Unique for every user.
- `Type`
- `Password`
- `DisplayName` Shown in UI
- `Avatar` A link to user's avatar.
- `Email`
- `Phone`
- `Affiliation`
- `Tag`
- `Ranking`
- `IsAdmin` Is the user the admin of his organization
- `IsGlobalAdmin` Does the user have the permission to manage the Casdoor
- `Hash`
- `PreHash`
- `Github` GitHub Id
- `Google` Google Account
- `QQ`
- `WeChat`
- `Properties` This is a string -> string map, stored all other properties may need.

## Organization

An organization is a set of users and applications. 

Organizations are basic units for a SSO platform. If a user signed in to an organization, then he can access all applications of the organization without signing in again.

- `Owner`
- `Name`
- `CreatedTime`
- `DisplayName` Name shown in UI
- `WebsiteUrl`
- `Favicon`
- `PasswordType`
- `PasswordSalt`
- `PhonePrefix` We think that users in the same organization are in the same country or region, and have the same phone prefix. So we do not record user phone prefix in `User`, but record them in `Organization`.

## Application

If you want to use Casdoor to provide login service for your web Web APPs, you can add them as Casdoor applications.

Users can access all applications in their organizations without login twice.

- `Owner`
- `Name`
- `CreatedTime`
- `DisplayName`
- `Logo`: Application logos will display in login and sign up page
- `HomepageUrl`
- `Description`
- `Organization` The organization that the APP belongs to
- `EnablePassword` If users can login via password
- `EnableSignUp` If users can sign up. If not, accounts of the application
- `Providers` Provide all kinds of service for the application (such as OAuth, Email, SMS service)
- `ClientId` OAuth client id
- `ClientSecret` OAuth client secret
- `RedirectUris` Casdoor will navigate to one of the uris if user logged in successfully
- `ExpireInHours` Login will expire after hours
- `SignupUrl` If you provide a sign up service independently out of Casdoor, please fill the url here
- `ForgetUrl` Same as `SignupUrl`
- `AffiliationUrl`

## Provider

Providers are used to provide services for Casdoor. Now, you can add OAuth providers, Email API providers, SMS API providers. We are going to integrate more providers in Casdoor in future.

- `Owner`
- `Name`
- `CreatedTime`
- `DisplayName` Displayed in UI
- `Category` Provider type. Now we have `OAuth`, `Phone`, `Email` for categories
- `Type` Provider types. For category `OAuth`, we have `Google, GitHub, QQ, WeChat` 4 types. For `Phone`, we have `Aliyun` and `Tencent Cloud` 2 types.
- `ClientId`
- `ClientSecret`
- `Host` For email providers
- `Port` For email providers
- `Title` For Phone providers
- `Content`
- `RegionId` For OSS and Phone providers
- `SignName` For Phone providers
- `TemplateCode` For Phone providers
- `AppId` For tencent cloud SMS services
- `ProviderUrl`

## Token

Casdoor is based on OAuth. Tokens are users' OAuth token.

- `Owner`
- `Name`
- `CreatedTime`
- `Application`
- `Organization`
- `User`
- `Code`
- `AccessToken`
- `ExpireIn` Tokens will expire in hours
- `Scope`
- `TokenType`

