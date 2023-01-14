---
title: Overview
description: Introduction to tokens in Casdoor
keywords: [token, OAuth]
authors: [sh1luo]
---

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
- `Scope` Scope of authorization
- `TokenType` E.g. type `Bear` 

There are two options to generate a JWT Token after logging into the application:
  - `JWT`
  - `JWT-Empty`

The JWT option will create a token with all `User` fields. The `JWT-Empty` will create a token with all non-empty values for the user.
