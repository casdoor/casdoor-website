---
title: 短信
description: 使用短信来完成身份验证
keywords:
  - 短信
authors:
  - kininaru
---

我们使用 [casdoor/go-sms-sender](https://github.com/casdoor/go-sms-sender) 发送短信给Casdoor。 现在， `go-sms-sender` 支持阿里云、腾讯云和Volc SMS API。 如果您想要支持其他短信提供商，您可以提出一个issue，或提出一个pull request。

## 添加短信提供商

1. 点击 `添加` 以添加一个新的提供者。
2. 在 `类别` 中选择 `SMS`

![选择类别](/img/providers/selectcategory.png)

3. 选择您的提供商类型 (`阿里云短信`, `腾讯云短信` 或 `Volc Engine SMS`)

![选择类型](/img/providers/selecttype.png)

4. 从阿里云、腾讯云或 Volc Engine 获取您的信息并填写。

### 示例

:::note

这里我使用阿里云短信服务作为示例

:::

登录我的阿里云工作台后，点击AccessKey 来创建 ID 和密钥。

![阿里云工作台](/img/providers/aliyunsms.png)

通过创建AccessKey ID和AccessKey 密钥，我可以获得我的AccessKey ID和访问密钥：

![访问密钥](/img/providers/accesskey.png)

填充 `AccessKey ID` and `AccessKey` 到 Cassdoor `Client ID` 和 `Client Secret`。