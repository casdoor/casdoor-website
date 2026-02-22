---
title: Local file system storage
description: Store uploaded files on the Casdoor server’s filesystem.
keywords: [Local File System, storage, provider]
authors: [UsherFall]
---

The **Local File System** provider stores uploads in the Casdoor `files` directory. For example, if Casdoor is at `/home/user/casdoor`, files are stored under `/home/user/casdoor/files`.

## Configure the provider

![Local File configuration](/img/providers/storage/localFileConfig.png)

**Path prefix** — Optional prefix for object paths. With a prefix, files are stored under that subpath.

### With prefix

![With prefix configuration](/img/providers/storage/localFileWithPre.png)
![Files with prefix](/img/providers/storage/localFileWithResult.png)

### Without prefix

![Without prefix configuration](/img/providers/storage/localFileWithoutPre.png)
![Files without prefix](/img/providers/storage/localFileWithoutResult.png)
