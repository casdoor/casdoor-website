---
title: ShardingSphere
description: 在ShardingSphere中使用 Casdoor
keywords:
  - ShardingSphere
authors:
  - jakiuncle
---

[](https://github.com/apache/shardingsphere-elasticjob-ui) shardingsphere-elasticjob-ui已经集成了Casdoor。 配置后我们可以使用它。

## 步骤1. 部署 Casdoor

首先，部署Casdoor。

您可以参考Casdoor 官方文档 [Server Installation](/docs/basic/server-installation) 。

成功部署后，您需要确保：

- Casdoor服务已成功运行，能通过**http://localhost:8000** 访问。
- 打开您最喜欢的浏览器并访问 **http://localhost:7001**，您将看到Casdoor的登录页面。
- 输入 `admin` 和 `123` 测试登录功能正常工作。

然后您可以通过以下步骤在自己的应用程序中快速实现基于 Casdoor 的登录页面。

## 步骤2. 配置ShardingSphere 中的 cassdoor 应用程序并配置

1.**创建或使用现有的 Casdoor 应用程序** ![img](/img/integration/java/ShardingSphere/casdoorConfig.png) 重定向URL 取决于您需要重定向的网址。 他选择的数据将在下次使用。

2. 在证书编辑页面上，您可以看到您的 `证书`。

![img](/img/integration/java/ShardingSphere/cert.png)

3.**配置在 ShardingSphere 中的应用程序**

首先，我们需要找到应用程序以及我们需要配置的属性。

![img](/img/integration/java/ShardingSphere/list.png)

其次，我们需要复制Casdoor应用程序中的数据并将其粘贴到应用中。

![img](/img/integration/java/ShardingSphere/application.png)

4.**测试**

![img](/img/integration/java/ShardingSphere/test.gif)