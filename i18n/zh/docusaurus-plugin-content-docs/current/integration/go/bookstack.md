---
title: BookStack
description: 在 BookStack 中使用 Casdoor 进行身份验证
keywords:
  - BookStack
authors:
  - leo220yuyaodog
---

## 在 BookStack 中使用 Casdoor 进行身份验证

**[BookStack](https://www.bookstack.cn)**  是一个开源书和文档共享网站 以及使用 Go 语言开发的开源应用程序，帮助您更好地实现文档阅读管理。

Bookstack-casdoor 已经与 **castor**集成，您现在可以快速开始一个简单的配置。

### 步骤1. 创建一个Casdoor应用程序

转到您的 Casdoor 并添加您的新应用程序 **BookStack**。 下面是在Casdoor中创建BookStack应用程序的**示例**。

![bookstack_config.png](/img/integration/go/bookstack/config.png) 请记住 `名称`, `组织`, `客户端 ID`, 和 `客户密钥`。 您将在下一步中使用它们。

### 步骤2. 配置Cassdoor 登录

现在，请移动到BookStack。  查找文件： `oauth.conf.example`。

将 `oauth.conf.example` 重命名为 `oauth.conf` 和 **修改配置** 默认内容为：

```ini
[oauth]

casdoorOrganization =  <"Organization">
casdoorApplication = "bookstack"              
casdoorEndpoint = http://localhost:8000 
clientId =   <client ID>
clientSecret =  <client Secret>
redirectUrl = http://localhost:8181/login/callback 

```

### 步骤3. 在Casdoor中填写 `重定向Url`

最后一步，请回到您添加 **BookStack 应用程序**的页面， 填写 `重定向URL` 请确保 `重定向URL` 和 `oauth.conf` 文件中的 `重定向URL` 相同。 ![bookstack_callback](/img/integration/go/bookstack/callback.png)

**现在你已经完成了Casdoor的所有配置！**

一旦BookStack成功部署，您可以使用Cassdoor 返回BookStack和体验以进行登录认证。

