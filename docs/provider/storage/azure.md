---
title: Azure Blob
description: Using Azure Blob as a storage provider for Casdoor
keywords: [Azure Blob, storage, provider]
---

:::note

This is an example of **Azure Blob** 

:::

- You must have an [Azure storage](https://docs.microsoft.com/azure/storage/common/storage-account-create?tabs=azure-portal) account.

### Step1. Select Azure Blob

Select the Azure Blob as the storage type. ![azureSelect.png](/img/providers/storage/azureSelect.png)

### Step2. Fill the necessary information in Casdoor.

There are three required fields. `Client ID`, 
 `Client secret`, `Bucket`. The relationship corresponding to the Azure Blob account is as follows:

|    Name       |   Name in Azure |   is required |
|      ----     |   ----          |  ----         |
|Client ID      |   AccountName   | required     |
|Client secret  |   AccountKey    | required      |
|Bucket         |   ContainerName | required     |
|Domain         |   DomainName    |               |

- AccountName

    `AccountName` is your AccountName.

- AccountKey

    The `AccountKey` is your key to access Azure API.

:::note

You can obtain your account key from the Azure Portal under the "Access Keys" section on the left-hand pane of your storage account.

:::


![azureKey.png](/img/providers/storage/azureKey.png)


- ContainerName

  You first need to create a container, there is a default container called 'default'.
![azureContainer.png](/img/providers/storage/azureContainer.png)

- Domain 

The custom domain name in your Azure CDN.
![azureCDN.png](/img/providers/storage/azureCDN.png)


### Step3. Save your configuration
The final result is as follows:
![azureResult.png](/img/providers/storage/azureResult.png)

Then you can use Azure Blob Storage services in your application.