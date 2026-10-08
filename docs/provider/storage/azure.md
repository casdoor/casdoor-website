---
title: Store files in Azure Blob Storage
sidebar_label: Azure Blob
description: Store uploaded files, such as avatars, in a container of Azure Blob Storage.
keywords: [Azure Blob, storage, provider]
authors: [sh1luo]
---

This guide explains how to store the uploaded files of Casdoor, such as avatars, in Azure Blob Storage.

---

#### Learning outcomes

- Find the values of your storage account.
- Add Azure Blob as a storage provider in Casdoor.

#### What you need

- An [Azure storage account](https://docs.microsoft.com/azure/storage/common/storage-account-create?tabs=azure-portal) with a container
- Administrator access to the Casdoor admin console

---

## Find the values in Azure

| Value | Where to find it |
|---|---|
| AccountName | The name of the storage account |
| AccountKey | The storage account, **Access keys** |
| ContainerUrl | The properties of the container |
| ContainerName | The name of the container, for example `default` |
| PrivateEndpoint | Optional. A [private endpoint](https://learn.microsoft.com/azure/private-link/tutorial-private-endpoint-storage-portal) of the account |
| Domain | Optional. A custom domain, such as one of Azure CDN |

![Access keys of the storage account](/img/providers/storage/azureKey.png)

![URL of the container](/img/providers/storage/azureUrl.png)

![Name of the container](/img/providers/storage/azureContainer.png)

![Azure CDN domain](/img/providers/storage/azureCDN.png)

## Add the provider in Casdoor {#1-select-azure-blob}

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Storage` and **Type** to `Azure Blob`.

   ![Azure Blob type selection](/img/providers/storage/azureSelect.png)

1. Fill in the fields:

   | Casdoor field        | Azure / meaning        | Required |
   |----------------------|------------------------|----------|
   | Client ID            | AccountName            | Yes      |
   | Client secret        | AccountKey             | Yes      |
   | Endpoint             | ContainerUrl           | Yes      |
   | Endpoint (Intranet)  | PrivateEndpoint        | No       |
   | Bucket               | ContainerName          | Yes      |
   | Path prefix          | Path prefix            | No       |
   | Domain               | Custom domain (e.g. CDN)| No      |

1. Save the provider.

   ![Azure Blob provider in Casdoor](/img/providers/storage/azureResult.png)

## See also

- [Storage providers](/docs/provider/storage/overview)
