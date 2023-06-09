---
title: ShowDoc
description: 在 ShowDoc 中使用 Casdoor 为 oAuth2 服务器
keywords:
  - ShowDoc
authors:
  - leo220yuyaodog
---

## 在 ShowDoc 中使用 Casdoor 进行身份验证

[ShowDoc](https://www.showdoc.com.cn/) 是一个 IT 团队在线API文档、技术文档工具。 Showdoc 可以轻松使用 Markdown 语法来写美丽的 API 文档、数据字典文档、技术文档、在线Excel文档等等。

Showdoc 支持第三方身份验证，包括Oauth。 以下是操作教程。

### 第1步： 创建一个Casdoor应用程序

转到您的 Casdoor 并添加您的新应用程序 **ShowDoc**。 下面是在Casdoor中创建ShowDoc应用程序的**示例**。

![create_application.png](/img/integration/php/showdoc/create_application.png)

请记住下一步的`client ID` 和`client Secret`。

:::信息

请在此步骤中不要填写 **callback url** Url取决于下一步showdoc 的配置。 稍后我们将返回来设置一个正确的回调URL。

:::

### 第2步： 配置ShowDoc

首先，启动 oAuth2 登录按钮。 然后按照示例填写 `callback url` 填写上一步中记住的`client ID`和`client secret`。 ![showdoc_oauth2.png](/img/integration/php/showdoc/showdoc_oauth2.png)

需要` Authorize path `、`AccessToken path`、` User info path `。 您可以填写如下所示。

```ini
Authorize path:   /login/oauth/authorize
AccessToken path:   /api/login/oauth/access_token
User info path:   /api/get-account
```

### 第3步： 在casdoor中配置回调url

返回步骤1中的应用程序编辑页面并添加您填写在ShowDoc中的 `callback url`。 ![showdoc_callbackurl.png](/img/integration/php/showdoc/showdoc_callbackurl.png)

### 第4步： 在ShowDoc上试试

您应该在登录页面中看到这一点：

![showdoc_login.png](/img/integration/php/showdoc/showdoc_login.png)

恭喜您！ 您已完成所有步骤 按 **"castor sso"** 按钮，您将被重定向到casdoor登录页面。
