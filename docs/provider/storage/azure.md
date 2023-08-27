---
title: Azure Blob
description: Using Azure Blob as a storage provider for Casdoor
keywords: [Azure Blob, storage, provider]
authors: [sh1luo]
---

:::note

This is an example of **Azure Blob**.

:::

- You must have an [Azure storage](https://docs.microsoft.com/azure/storage/common/storage-account-create?tabs=azure-portal) account.

### Step 1: Select Azure Blob

Select Azure Blob as the storage type. ![azureSelect.png](/img/providers/storage/azureSelect.png)

### Step 2: Fill in the necessary information in Casdoor

There are four required fields: `Client ID`, `Client secret`, `Endpoint`, and `Bucket`. The corresponding relationship to the Azure Blob account is as follows:

| Field Name    | Azure Name    | Required |
| ------------- | ------------- | -------- |
| Client ID     | AccountName   | Required |
| Client secret | AccountKey    | Required |
| Endpoint      | ContainerUrl  | Required |
| Endpoint (intranet) | PrivateEndpoint | |
| Bucket        | ContainerName | Required |
| Path prefix   |               | |
| Domain        | DomainName    | |

- AccountName

The `AccountName` is your AccountName.

- AccountKey

The `AccountKey` is your key to access the Azure API.

:::note

You can obtain your account key from the Azure Portal under the "Access Keys" section on the left-hand pane of your storage account.

:::

![azureKey.png](/img/providers/storage/azureKey.png)

- ContainerUrl

You can obtain the ContainerUrl from your container properties.

![azureUrl.png](/img/providers/storage/azureUrl.png)

- (Optional) PrivateEndpoint

Azure Private Endpoint is a feature that allows connecting Azure services to Azure Virtual Network (VNet) private subnets. You can refer to the official Azure documentation for configuration: [private endpoint config](https://learn.microsoft.com/zh-cn/azure/private-link/tutorial-private-endpoint-storage-portal)

- ContainerName

In this example, a default container called 'default' is created.

![azureContainer.png](/img/providers/storage/azureContainer.png)

- (Optional) DomainName

The custom domain name in your Azure CDN.

![azureCDN.png](/img/providers/storage/azureCDN.png)

### Step 3: Save your configuration

The final result is as follows:

![azureResult.png](/img/providers/storage/azureResult.png)

Now you can use Azure Blob Storage services in your application.
