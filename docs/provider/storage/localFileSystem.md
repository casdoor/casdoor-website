---
title: Store files on the local file system
sidebar_label: Local file system
description: Store uploaded files in the files directory of the Casdoor server.
keywords: [Local File System, storage, provider]
authors: [UsherFall]
---

This guide explains how to store uploaded files on the file system of the Casdoor server. Casdoor stores them in its `files` directory. For example, if Casdoor runs in `/home/user/casdoor`, the files are in `/home/user/casdoor/files`.

---

#### Learning outcomes

- Add a local file system storage provider.
- Choose a path prefix.

#### What you need

- Administrator access to the Casdoor admin console

---

## Add the provider

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Storage` and **Type** to `Local File System`.

   ![Local file system provider](/img/providers/storage/localFileConfig.png)

1. Optionally, set **Path prefix**. Casdoor then stores the files in a subdirectory with that name.
1. Save the provider.

With a path prefix:

![Provider with a path prefix](/img/providers/storage/localFileWithPre.png)

![Files stored under the prefix](/img/providers/storage/localFileWithResult.png)

Without a path prefix:

![Provider without a path prefix](/img/providers/storage/localFileWithoutPre.png)

![Files stored without a prefix](/img/providers/storage/localFileWithoutResult.png)

:::note
In a container, mount the `files` directory on a volume. Otherwise, the files are lost when the container is replaced.
:::

## See also

- [Storage providers](/docs/provider/storage/overview)
