---
title: 百度
description: 向您的应用程序添加 Baidu OAuth 提供商
keywords:
  - 百度
  - Baidu OAuth
authors:
  - Steve0x2a
---

要设置 Baidu OAuth 提供商，请阅读 [百度的文档](https://openauth.baidu.com/doc/regdevelopers.html?qq-pf-to=pcqq.c2c) 并按其步骤完成 [应用程序创建](http://developer.baidu.com/console#app/create)。

![创建百度 APP](/img/providers/OAuth/baiduapp.png)

在创建您的应用后，重定向URL设置在以下位置：

![百度 URL 设置](/img/providers/OAuth/baidusetting.png)

在以下位置添加您的 Casdoor 域名：

![重定向 URL 设置](/img/providers/OAuth/baidudomain.png)

:::caution

这部分与百度给出的文档中的实际情况有很大的不同:

1. 将URL添加到回调URL设置中的话很可能验证URL失败，导致登录失败，所以我们要将我们的域名添加到域名设置中。
2. 只能添加一个URL或域名，这与文档有很大不同。

:::

然后您现在就可以获得 `Client ID` 和 `Client Secrets` 了！

![百度客户端](/img/providers/OAuth/baiduclient.png)

添加一个百度 OAuth 提供商并在您的 Casdoor 中填写 `Client ID` 和 `Client Secrets`。

![百度提供商](/img/providers/OAuth/baiduprovider.png)

现在你可以使用百度作为第三方服务来完成身份验证！

:::info 一般故障排除

故障排除如果您遇到百度提示您重定向URL不正确， 这里是你可能可以修复错误的一些方式：

1. 将你的域名添加到合适的位置，然后重置Secret(百度重置Secret有bug，会提示错误，但是刷新页面后Secret已经刷新)
2. 如果以上方法都不能解决问题，我们建议您删除应用程序并创建一个新的应用程序，并先设置您的域名。

另一个问题是百度返回的用户名被屏蔽了，不像它的文档显示用户名和显示的名称，所以我们目前只能使用被屏蔽的名称作为用户名。

:::
