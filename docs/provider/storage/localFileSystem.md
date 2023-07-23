---
title: Local File System
description: Using Local File System as a storage provider for Casdoor
keywords: [Local File System, storage, provider]
authors: [UsherFall]
---

:::info

Local File System provider will store your uploaded files in the Casdoor `files` folder

For example, When your Casdoor is located in the `/home/user/casdoor` directory, the uploaded files will be stored in the `/home/user/casdoor/files` folder.

:::

## Config the Casdoor provider

![local file config](/img/providers/storage/localFileConfig.png)

`Path prefix` is the prefix of the location path for your files, you can fill it in as needed.
In the following example, you can see the difference with or without prefix.

### With prefix

![with prefix config](/img/providers/storage/localFileWithPre.png)

![with prefix](/img/providers/storage/localFileWithResult.png)

### Without prefix

![with prefix config](/img/providers/storage/localFileWithoutPre.png)

![with prefix](/img/providers/storage/localFileWithoutResult.png)
