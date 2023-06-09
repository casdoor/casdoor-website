---
title: 将静态文件托管在局域网内
description: 如何部署Casdoor静态资源
keywords:
  - 静态资源
  - 部署
  - 局域网
authors:
  - leo220yuyaodog
---

如果您在 **内网**上部署了Casdoor， 您可能无法直接通过 互联网访问静态资源。 您需要将静态资源部署在能够访问到它们的地方，然后在Casdoor中 3 处地方的配置。

## 部署静态资源
Casdoor的所有静态资源，包括图像、标志、css等，都存储在[casbin/static repository](https://github.com/casbin/static)仓库中。

**克隆** **仓库，在网页服务器上部署静态资源**。 请确保您可以访问该资源。

## 配置Casdoor

您可以简单地修改配置文件，将静态资源地址设置为您部署的地址。 转至 [conf/app.conf](https://github.com/casdoor/casdoor/blob/c92d34e27c707287545519202463632fb4deacc9/conf/app.conf#L19), 修改 `staticBaseUrl`.

```ini
staticBaseUrl = "https://cdn.casbin.org"
```
