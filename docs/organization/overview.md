---
sidebar_position: 1
title: Overview
---

An organization is a set of users and applications.

Organizations are basic units for a SSO platform. If a user signed in to an organization, then he can access all applications of the organization without signing in again.

- `Owner`
- `Name`
- `CreatedTime` 
- `DisplayName` Name shown in UI
- `WebsiteUrl`
- `Favicon`
- `PasswordType` plain or hashed
- `PasswordSalt`
- `PhonePrefix` We think that users in the same organization are in the same country or region, and have the same phone prefix. So we do not record user phone prefix in `User`, but record them in `Organization`.
- `DefaultAvatar` When the organization avatar is not set, the default avatar will be used