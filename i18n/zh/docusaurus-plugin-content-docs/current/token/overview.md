---
title: 概述
description: Casdoor令牌简介
keywords:
  - 令牌
  - OAuth
authors:
  - sh1luo
---

Casdoor 基于 OAuth。 Tokens 是用户的 OAuth 的 token。

- `Owner`
- `Name`
- `CreatedTime`
- `Application`
- `Organization`
- `User`
- `Code`
- `AccessToken`
- `ExpireIn` 令牌将在数小时后过期
- `Scope` 授权范围
- `TokenType` 例如 输入 `Bear`

There are two options to generate a JWT Token after logging into the application:
  - `JWT`
  - `JWT-Empty`

The JWT option will create a token with all `User` fields. The `JWT-Empty` will create a token with all non-empty values for the user.
