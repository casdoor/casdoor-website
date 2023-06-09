---
title: Azure Blob
description: 使用 Azure Blob 作为Casdoor的存储提供商
keywords:
  - Azure Blob
  - 存储
  - 提供商
authors:
  - sh1luo
---

:::note

这是** Azure Blob **的一个示例

:::

- 您必须拥有一个[ Azure storage ](https://docs.microsoft.com/azure/storage/common/storage-account-create?tabs=azure-portal) 帐户。

### 步骤1. 选择 Azure Blob

选择 Azure Blob 作为存储类型。 ![azureSelect.png](/img/providers/storage/azureSelect.png)

### 步骤2. 填写 Casdoor 的必要信息

有三个必填字段。 `Client ID`,  `Client secret`, `Bucket`. Azure Blob账户的对应关系如下：

| 名称            | Azure 中的名称    | 是否必填项 |
| ------------- | ------------- | ----- |
| Client ID     | AccountName   | 必填    |
| Client secret | AccountKey    | 必填    |
| Bucket        | ContainerName | 必填    |
| Domain        | DomainName    |       |

- 帐号名称

    `AccountName` 是您的帐户名称。

- 账户密钥

    `AccountKey` 是您访问 Azure API的密钥。

:::note

您可以在 Azure Portal 中，在您的存储帐户左手窗格的“访问密钥”部分下获取您的帐户密钥。

:::

![azureKey.png](/img/providers/storage/azureKey.png)

- 容器名称

  您首先需要创建一个容器。 也可以点default选择一个默认容器。 ![azureContainer.png](/img/providers/storage/azureContainer.png)

- 域名

您Azure CDN中的自定义域名。 ![azureCDN.png](/img/providers/storage/azureCDN.png)

### 步骤3. 保存您的配置

最终结果如下： ![azureResult.png](/img/providers/storage/azureResult.png)

然后您可以在应用程序中使用阿里云云存储服务。
