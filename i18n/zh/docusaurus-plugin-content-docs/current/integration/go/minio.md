---
title: MinIO
description: 配置 Casdoor 作为身份提供者与 MinIO 支持
keywords:
  - MinIO
authors:
  - Abingcbc
---

[MinIO](https://github.com/minio/minio) 支持使用OpenID Connect (OIDC) 兼容的程序提供服务进行外部身份管理。 此文档介绍了通过配置Casdoor为身份提供者来支持MinIO。

## 第 1 步： 部署Casdoor & MinIO

第一，应该先部署Casdoor。

您可以参考 [服务器安装](/docs/basic/server-installation) 的 Casdoor 官方文档。

在成功部署后，您需要确保：

- Casdoor服务器已成功运行在 **http://localhost:8000** 上了。
- 打开您最喜欢的浏览器并访问 **http://localhost:7001**，您将看到Casdoor的登录页面。
- 输入 `admin` 和 `123` 测试登录功能正常工作。

然后您可以通过以下步骤在自己的应用程序中快速实现基于Casdoor的登录页面。

您可以参考 [这里](https://github.com/minio/minio#minio-quickstart-guide) 来部署您的 MinIO 服务器， 以及[这里](https://docs.min.io/minio/baremetal/reference/minio-mc.html#install-mc) 对于名为 `mc 的 MinIO 客户端`。

## 第 2 步： 配置Casdoor应用

1. 创建或使用现有的 Casdoor 应用程序。
2. 添加您的redirect url ![保存应用程序设置](/img/integration/appsetting_spring_security.png)
3. 添加您想要的提供商并补充其他设置。

这时， 您可以在应用程序设置页面获得两个值： `Client ID` 和 `Client secret`， 就像上图一样。 我们将在下一步骤中使用它们。

打开您最喜欢的浏览器并访问： **http://`CASDOOR_HOSTNAME`/.well known / openid-configur**, 您将看到Casdoor配置的OIDC。

4. 这个步骤对于MinIO是必要的。 由于MinIO 需要在 JWT 中使用一个索赔属性来执行其政策，因此您也应该在Casdoor中配置它。 目前，Casdoor使用 `tag` 作为配置MinIO 策略的一个环境。

![MinIO 策略设置](/img/integration/go/minio/minio_policy.png)

您可以在这里找到所有支持的策略 [](https://docs.min.io/minio/baremetal/security/minio-identity-management/policy-based-access-control.html#minio-policy)。

## 第 3 步： 配置 MinIO

您可以通过以下命令启动 MinIO 服务器：

```shell
导出MINIO_ROOT_USER=minio
导出 MINIO_ROOT_PASSSWORD=minio123
minio server /mnt/export
```

您可以使用参数 `--console-address` 来配置地址和端口。

然后您可以在 MinIO 客户端 `mc` 中添加一个服务别名。

```
mc 别名设置了myminio <You console address> minio minio123
```

现在，您可以配置 MinIO 的 OpenID 连接。 对于Casdoor，命令如下：

```
mc admin config set myminio identity_openid config_url="http://CASDOOR_HOSTNAME/.well-known/openid-configuration" client_id=<client id> client_secret=<client secret> claim_name="tag"
```

更详细的参数，您可以参考 [官方文档](https://docs.min.io/minio/baremetal/reference/minio-server/minio-server.html#openid-identity-management)。

一旦设置成功，请重启 MinIO 实例。

```
mc 管理服务重启myminio
```

## 第 4 步： 试用一下demo！

现在，您可以在浏览器上打开您的 MinIO 控制台，然后点击 `Login with SSO`。

您将重新转至登录页面 您将被重定向到Casdoor用户登录页面。登录成功后，您将被重定向到 MinIO 页面并自动登录， 您应该现在看到他们可以访问的buckets和objects。

:::caution

如果您在不同的端口部署Casdoor前端和后端， 您被重定向的登录页面将是后端端口，它将显示 `404 找不到`。 您可以修改端口到前端。 然后您可以成功访问Casdooor登录页面。

:::
