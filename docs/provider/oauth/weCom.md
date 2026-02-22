---
title: WeCom OAuth
description: Add WeCom (WeChat Work) as an OAuth provider for internal or third-party apps.
keywords: [WeCom, OAuth, WeChat Work]
authors: [leo220yuyaodog]
---

WeCom supports OAuth so users can sign in from the WeCom client. You can use **internal** or **third-party** applications.

| Casdoor field   | Description |
|-----------------|-------------|
| Sub type        | Internal or Third-party |
| Method          | Silent or Normal |
| Client ID       | Enterprise **CorpID** |
| Client secret   | Enterprise **CorpSecret** |
| Agent ID        | Application **AgentId** |

:::info
- **Silent:** User clicks the link and is redirected to `redirect_URI?code=CODE&state=STATE`.
- **Normal:** A consent page is shown; after the user authorizes, redirect to `redirect_uri?code=CODE&state=STATE`.

See [WeCom OAuth](https://developer.work.weixin.qq.com/document/path/91119).
:::

**Internal apps:** [Internal Application](https://developer.work.weixin.qq.com/document/path/91022).  
**Third-party apps:** [Third-Party Application](https://developer.work.weixin.qq.com/document/path/91120).
