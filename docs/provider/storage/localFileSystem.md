---
title: Local File System
description: Using the Local File System as a storage provider for Casdoor
keywords: [Local File System, storage, provider]
authors: [UsherFall]
---

:::info

The Local File System provider will store your uploaded files in the Casdoor `files` folder.

For example, when your Casdoor is located in the `/home/user/casdoor` directory, the uploaded files will be stored in the `/home/user/casdoor/files` folder.

:::

## Configure the Casdoor provider

![Local File configuration](/img/providers/storage/localFileConfig.png)

The `Path prefix` is the prefix of the location path for your files. You can fill it in as needed.
In the following example, you can see the difference with or without the prefix.

### With prefix

![With prefix configuration](/img/providers/storage/localFileWithPre.png)

![Files with prefix](/img/providers/storage/localFileWithResult.png)

### Without prefix

![Without prefix configuration](/img/providers/storage/localFileWithoutPre.png)

![Files without prefix](/img/providers/storage/localFileWithoutResult.png)
