---
title: WeCom
description: Add WeCom OAuth provider to your application
keywords: [WeCom, OAuth]
authors: [leo220yuyaodog]
---

## Introduction

WeCom provides an authorized login method using OAuth, which allows you to obtain members' identity information directly from the webpage opened by the WeCom terminal, eliminating the need for a login process.

There are two types of applications: **internal** applications and **third-party** applications.

## Basic Configuration

To configure a WeCom provider, you need to provide the following parameters:

**Parameter Description**:

| Parameter    | Description                                   |
|:------------:|:--------------------------------------------:|
| Sub type     | Internal or Third-party                       |
| Method       | Silent or Normal                              |
| Client ID    | The enterprise CorpID                         |
| Client secret| The enterprise CorpSecret                      |
| Agent ID     | Application agentid                           |

:::info

WeCom supports two authorization methods: **Silent** authorization and **normal** authorization.

**Silent authorization**: After the user clicks the link, the page is redirected to `redirect_URI? code=CODE&state=STATE`

**Normal authorization**: After the user clicks the link, a middle page is displayed for the user to choose whether to authorize or not. After the user confirms the authorization, they are redirected to `redirect_uri?code=CODE&state=STATE`

For more details, please refer to the [official documentation](https://developer.work.weixin.qq.com/document/path/91119).

:::

## More Information

For more information about internal applications, please refer to the [Internal Application](https://developer.work.weixin.qq.com/document/path/91022) documentation.

For information about third-party applications, please refer to the [Third-Party Application](https://developer.work.weixin.qq.com/document/path/91120) documentation.
