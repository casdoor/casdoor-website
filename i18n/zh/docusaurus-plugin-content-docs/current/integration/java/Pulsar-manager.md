---
title: Pulsar-manager
description: 在 Pulsar-manager 中使用 Cassdoor
keywords:
  - Pulsar-manager
authors:
  - jakiuncle
---

Casdoor可以轻易连接到Pulsar-manager。

因为 Pulsar-manager中已经添加了连接casdoor 的代码，所以我们只需要在后端的application.yml中做一些配置，并在前端打开一个开关 。

## 步骤1. 部署Casdoor

首先，部署Casdoor。

您可以参考Casdoor 官方文档 [Server Installation](/docs/basic/server-installation) 。

在成功部署后，您需要确保：

- Casdoor服务已经成功运行，能通过**http://localhost:8000** 访问。
- 打开您最喜欢的浏览器并访问 **http://localhost:7001**，您将看到Casdoor的登录页面。
- 输入 `admin` 和 `123` 测试登录功能正常工作。

然后您可以通过以下步骤在自己的应用程序中快速实现基于 Casdoor 的登录页面。

## 步骤2. 配置Casdoor

如何配置casdoor可以参考 [casdoor](https://door.casdoor.com/login)(配置casdoor和开发最好使用不同的浏览器)。

您还应该配置一个组织和一个应用程序。 您也可以参考 [Casdoor](https://door.casdoor.com/login)。

### 步骤2.1创建一个组织

![组织](/img/integration/java/Pulsar-manager/editOrganization.png)

### 步骤2.2 创建一个应用程序

![应用程序](/img/integration/java/Pulsar-manager/editApplication.png)

## 步骤3. 打开 Pulsar-Manager 前端中的开关。

打开此开关，将代码和状态发送到后端。

这个开关在pulsar-manager/front-end/src/router/index.js的第80行

![前置开关](/img/integration/java/Pulsar-manager/frontSwitch.png)

## 步骤4. 后端配置

您需要在pulsar-manager/src/main/resources/application.properties的154行加入casdoor的配置

```ini
casdoor.endpoint = http://localhost:8000
casdoor.clientId = <client id in previous step>
casdoor.clientSecret = <client Secret in previous step>
casdoor.certificate=<client certificate in previous step>
casdoor.organizationName=pulsar
casdoor.applicationName=app-pulsar
```
