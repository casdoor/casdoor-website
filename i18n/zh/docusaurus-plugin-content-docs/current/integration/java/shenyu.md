---
title: ShenYu
description: 在 ShenYu 中使用Cassoor
keywords:
  - ShenYu
authors:
  - jakiuncle
---

ShenYu 可通过插件使用 casdoor。

## 步骤1. 部署Casdoor

首先，部署Casdoor。

您可以参考Casdoor 官方文档 [Server Installation](/docs/basic/server-installation) 。

成功部署后，您需要确保：

- Casdoor服务已成功运行，能通过**http://localhost:8000** 访问。
- 打开您最喜欢的浏览器并访问 **http://localhost:7001**，您将看到Casdoor的登录页面。
- 输入 `admin` 和 `123` 测试登录功能正常工作。

然后您可以通过以下步骤在自己的应用程序中快速实现基于 Casdoor 的登录页面。

## 步骤2. 配置Casdoor应用程序

1. **创建或使用现有的 Casdoor 应用程序。**
2. **添加您的重定向url** ![Casdoor 应用设置](/img/integration/java/shenyu/shenyu_config.png)
3. 在证书编辑页面上，您可以看到您的 `证书`。 ![Casdoor 认证设置](/img/integration/java/shenyu/shenyu_cert.png)

## 步骤3. 在 shenyu 中使用casdoor插件

### 1. 在 shenyu 中配置casdoor插件

   ![Shenyu 配置插件](/img/integration/java/shenyu/shenyu_configPlugin.png)

注意：由于shenyu 仅有单行输入框，所以我们需要在每行证书中添加 \n ![Casdoor 认证设置](/img/integration/java/shenyu/shenyu_cert2.png)

你可以复制并粘贴到Shenyu 后台配置的证书。

**您不需要将其保存到casdoor证书编辑页面**，因为只需复制即可。

### 2. 配置shenyu casdoor的插件

   ![Shenyu Casdoor](/img/integration/java/shenyu/shenyu_casdoor.png) 您可以配置您需要使用casdoor配置

### 3. 使用Casdoor提供的相关服务

#### 3.1    直接访问Web

   ![Shenyu 登录失败](/img/integration/java/shenyu/shenyu_faillogin.png)

#### 3.2像这样登录casdoor

   ![Shenyu 登录](/img/integration/java/shenyu/shenyu_login.png) ![Shenyu 登录成功](/img/integration/java/shenyu/shenyu_successlogin.png)

#### 3.3 Headers中的Carry token，你也可以访问

   ![Shenyu token](/img/integration/java/shenyu/shenyu_token.png)

#### 3.4 它也可以保存 Headers 的用户名、id 和组织，以便下次使用。  
