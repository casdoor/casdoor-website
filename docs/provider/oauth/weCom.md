---
title: WeCom
description: Add WeCom OAuth provider to your application
keywords: [WeCom, OAuth]
author: leo220yuyaodog
---

## Introduction

The WeCom provides the authorized login method of OAuth, which can obtain members' identity information from 
the webpage opened by the WeCom terminal, eliminating the need for login.

There are two different types of applications: **internal** applications and **third-party** applications.

## Basic

To configure a WeCom provider, the following table describes the required parameters.

**Parameter Description**:

| Parameter| Description|
|:---------: | :--------------------: |
|Sub type|   Internal or Third-party    |
| Method|    Silent or Normal           |
|Client ID|    The enterprise  CorpID  |
|Client secret|  The enterprise  CorpSecret  |
|Agent ID|      Application agentid           |

:::info

WeCom has two authorization methods. **Silent** authorization and **normal** authorization.

**Silent authorization**: After the user clicks the link, the page is `redirect_URI? code=CODE&state=STATE`

**Normal authorization**: After the user clicks the link, a middle page is displayed for the user to choose whether to 
authorize or not. After the user confirms the authorization, go to `redirect_uri?code=CODE&state=STATE`

For more details, please see [document](https://developer.work.weixin.qq.com/document/path/91119).

:::

## More

For more information about internal application, please see [Internal application](https://developer.work.weixin.qq.com/document/path/91022).

About Third-party application, please see [Third-party application](https://developer.work.weixin.qq.com/document/path/91120).