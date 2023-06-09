---
title: (可选) 使用 Docker 运行
description: 使用 Docker 运行
keywords:
  - Casdoor
  - Docker
authors:
  - hsluoyz
---

## 安装要求

### 硬件

如果您想要自己构建Docker镜像，请确保您的机器至少有**2GB** 的内存。 Cassdoor的前端是React的一个NPM项目。 构建前端至少需要 **2GB** 的内存。 低于 **2GB** 的内存可能导致前端构建失败。

如果您只需要运行预编译的镜像，请确保您的机器至少有**100MB** 的内存。

### 操作系统

支持所有操作系统 (Linux, Windows 和 macOS)

### Docker

在Linux系统中，您可以使用**docker (要求docker-engine 版本不低于 17.05)** ，在Windows和mac系统中可以使用 **Docker Desktop** 。

* [Docker](https://docs.docker.com/get-docker/)

所有操作系统的用户必须确保 **docker-engine 版本不低于17.05**。 这是因为我们在docker-compose.yml 中使用多阶段构建功能，这个功能在17.05及以上版本中得到支持。 更多信息请参阅 <https://docs.docker.com/develop/develop-images/multistage-build/>

如果你使用docker-compose，请确保 **docker-compose 版本不低于2.2** 对于Linux用户，考虑到docker-compose与docker-engine相分离，你还需要确保已安装docker-compose。

## 获取镜像

我们提供了两个DockerHub 镜像：

| 名称                                                                       | 描述                       | 建议                |
| ------------------------------------------------------------------------ | ------------------------ | ----------------- |
| [casdoor-all-in-one](https://hub.docker.com/r/casbin/casdoor-all-in-one) | Casdoor 和 MySQL 数据库都在镜像内 | 已经包含示例数据库，仅用于测试   |
| [casdoor](https://hub.docker.com/r/casbin/casdoor)                       | 只有casdoor在镜像里            | 可以连接到您自己的数据库并用于生产 |


1. 在casbin/casdoor-all-in-one中，casdoor二进制文件、mysql数据库和所有必要的配置都打包在一起。 这个镜像是为了让新用户能够快速试用Casdoor。 **通过这个镜像，您可以使用一两个命令而不是复杂的配置即可启动Casdoor** 。 **注意：我们不建议您在生产环境中使用此镜像**。

### **选项 1**: 使用示例数据库

使用端口 `8000` 运行容器。 如果本地host中不存在，它将自动下载镜像。

```shell
docker run -p 8000:8000 casbin/casdoor-all-in-one
```

:::caution

中国等地区的一些用户通常使用 Docker 镜像服务，例如 [Alibaba Cloud Image Booster](https://help.aliyun.com/document_detail/60750.html) ([English](https://www.alibabacloud.com/help/en/container-registry/latest/accelerate-the-download-of-docker-official-images)) 实现比DockerHub 更高的下载速度。 然而，有一个问题，那些服务提供的 `latest` 标签不是最新的。 它可能会通过获取 `latest` 标签来产生一个非常旧的镜像。 为了缓解这个问题，您可以使用以下命令明确指定镜像版本号：

```shell
docker pull casbin/casdoor-all-in-one:$(curl -sS "https://hub.docker.com/v2/repositories/casbin/casdoor-all-in-one/tags/?page_size=1&page=2" | sed 's/,/,\n/g' | grep '"name"' |awk -F '"' '{print $4}')
```

注意：上面的命令使用的 Linux 工具，例如 `curl`, `ed`, `grep`, `awk`. 如果您正在使用 Windows，请确保您在 Linux 样式外壳中运行，如 `Git Shell` 或 `Cygwin`。 `CMD` 或 `PowerShell` 将无法工作。

:::

在您的浏览器中访问： [**http://localhost:8000**](http://localhost:8000) 。 使用默认的全局管理员帐户登录 Casdoor 仪表板： `built-in/admin`

```bash
admin
123
```

### **选项 2**: 使用 docker-compose

:::caution

中国等地区的一些用户通常使用 Docker 镜像服务，例如 [Alibaba Cloud Image Booster](https://help.aliyun.com/document_detail/60750.html) ([English](https://www.alibabacloud.com/help/en/container-registry/latest/accelerate-the-download-of-docker-official-images)) 实现比DockerHub 更高的下载速度。 然而，有一个问题，那些服务提供的 `latest` 标签不是最新的。 它可能会通过获取 `latest` 标签来产生一个非常古老的图像。 为了缓解这个问题，您可以使用以下命令明确指定图像版本号：

```shell
docker pull casbin/casdoor:$(curl -sS "https://hub.docker.com/v2/repositories/casbin/casdoor/tags/?page_size=1&page=2" | sed 's/,/,\n/g' | grep '"name"' |awk -F '"' '{print $4}')
```

注意：上面的命令使用的 Linux 工具，例如 `curl`, `ed`, `grep`, `awk`. 如果您正在使用 Windows，请确保您在 Linux 样式外壳中运行，如 `Git Shell` 或 `Cygwin`。 `CMD` 或 `PowerShell` 将无法工作。

:::

在与 `docker-compose.yml` 同级目录下创建 `conf/app.conf` 文件，然后从 Casdoor 复制 [app.conf](https://github.com/casdoor/casdoor/blob/master/conf/app.conf) 。 您可以从 [Via Ini file](/docs/basic/server-installation#via-ini-file) 找到 `app.conf` 的详细信息。


通过docker-compose 创建一个独立的数据库:

```bash
docker-compose up
```

这样就完成了！ :small_airplane:

在您的浏览器中访问 [**http://localhost:8000**](http://localhost:8000) 。 使用默认的全局管理账户登录 Casdoor 控制面板： `built-in/admin`

```bash
admin
123
```

*注意：如果你深入了解 docker-compose.yml，你可能会对我们创建的称为“RUNNING_IN_DOCKER”的环境变量感到困惑。 当数据库'db'是通过 docker-compose 创建时，它可以在您的 pc 的本地主机上使用，而不是连带容器的本地主机上使用。 这是为了防止你因修改应用程序而引起问题。我们提供这个环境变量，并且在docker-compose.yml中预先分配了它。 当此环境变量为 true时，本地主机将被替换为 host.docker.internal ，以便您可以访问db。*

### **选项3** 直接尝试使用标准镜像

:::caution

中国等地区的一些用户通常使用 Docker 镜像服务，例如 [Alibaba Cloud Image Booster](https://help.aliyun.com/document_detail/60750.html) ([English](https://www.alibabacloud.com/help/en/container-registry/latest/accelerate-the-download-of-docker-official-images)) 实现比DockerHub 更高的下载速度。 然而，有一个问题，那些服务提供的 `latest` 标签不是最新的。 它可能会通过获取 `latest` 标签来产生一个非常旧的镜像。 为了缓解这个问题，您可以使用以下命令明确指定镜像版本号：

```shell
docker pull casbin/casdoor:$(curl -sS "https://hub.docker.com/v2/repositories/casbin/casdoor/tags/?page_size=1&page=2" | sed 's/,/,\n/g' | grep '"name"' |awk -F '"' '{print $4}')
```

注意：上面的命令使用的 Linux 工具，例如 `curl`, `sed`, `grep`, `awk`. 如果您正在使用 Windows，请确保您在 Linux 样式外壳中运行，如 `Git Shell` 或 `Cygwin`。 `CMD` 或 `PowerShell` 将无法工作。

:::

:::tip

如果不方便挂载配置文件，使用环境变量也是一种可能的解决方法。

```bash title="example"

docker run \
  -e driverName=mysql \
  -e dataSourceName='user:password@tcp(x.x.x.x:3306)/' \
  -p 8000:8000 \
  casbin/casdoor:latest

```

:::

创建 `conf/app.conf`文件，您可以从[conf/app.conf](https://github.com/casdoor/casdoor/blob/master/conf/app.conf)复制。 关于`app.conf`的更多信息，您可以访问[Via Ini file](/docs/basic/server-installation#via-ini-file).

然后运行

```bash
docker run  -p 8000:8000 -v /folder/of/app.conf:/conf casbin/casdoor:latest
```

**将app.conf 挂载到 /conf/app.conf** 并启动它。

使用您的浏览器访问http://localhost:8000 使用默认的全局管理账户登录 Casdoor 控制面板： `built-in/admin`

```bash
admin
123
```
