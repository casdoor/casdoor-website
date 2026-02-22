---
title: Azure Blob storage
description: Use Azure Blob Storage as a storage provider.
keywords: [Azure Blob, storage, provider]
authors: [sh1luo]
---

You need an [Azure Storage account](https://docs.microsoft.com/azure/storage/common/storage-account-create?tabs=azure-portal).

## 1. Select Azure Blob

In Casdoor **Providers** → **Add**, set **Category** to **Storage**, **Type** to **Azure Blob**.

![azureSelect.png](/img/providers/storage/azureSelect.png)

## 2. Map fields

| Casdoor field        | Azure / meaning        | Required |
|----------------------|------------------------|----------|
| Client ID            | AccountName            | Yes      |
| Client secret        | AccountKey             | Yes      |
| Endpoint             | ContainerUrl           | Yes      |
| Endpoint (intranet)  | PrivateEndpoint        | No       |
| Bucket               | ContainerName          | Yes      |
| Path prefix          | Path prefix            | No       |
| Domain               | Custom domain (e.g. CDN)| No      |

- **AccountName** — Storage account name.
- **AccountKey** — From Azure Portal → your storage account → **Access keys**.
- **ContainerUrl** — From the container’s properties.
- **PrivateEndpoint** — Optional; for [Azure Private Endpoint](https://learn.microsoft.com/azure/private-link/tutorial-private-endpoint-storage-portal).
- **ContainerName** — Container name (e.g. `default`).
- **Domain** — Optional custom domain (e.g. Azure CDN).

![azureKey.png](/img/providers/storage/azureKey.png)
![azureUrl.png](/img/providers/storage/azureUrl.png)
![azureContainer.png](/img/providers/storage/azureContainer.png)
![azureCDN.png](/img/providers/storage/azureCDN.png)

## 3. Save

Save the provider. Your application can use Azure Blob for file storage.

![azureResult.png](/img/providers/storage/azureResult.png)
