---
title: (Optional) Try with Docker
description: Try Casdoor with Docker
keywords: [Casdoor, Docker]
---

## Requirements

### Hardware

If you want to build the Docker image by yourself, please ensure that your machine has at least **2GB** memory. Casdoor's frontend is a NPM project of React. Building the frontend requires at least **2GB** memory. Less than **2GB** memory may lead to frontend build failure.

If you just need to run the pre-built image,  please ensure that your machine has at least **100MB** memory.

### OS

All OSes (Linux, Windows and macOS) are supported.

### Docker

You can use **docker (docker-engine version >= 17.05)** in Linux or **Docker Desktop** in Windows and macOS.

* [Docker](https://docs.docker.com/get-docker/)

Users of all OSes must ensure that the **docker-engine version >= 17.05**. It is because that we use multi-stage build feature in docker-compose.yml, which was supported in 17.05 and above versions. See <https://docs.docker.com/develop/develop-images/multistage-build/> for more information.

If you also use docker-compose, please ensure that **docker-compose version >= 2.2**. For Linux users, you also need to make sure that docker-compose is installed, given that it is seperated from docker-engine.

## Get the image

We have provided two DockerHub images:

Name | Description | Suggestion
----|------|----
[casdoor-all-in-one](https://hub.docker.com/r/casbin/casdoor-all-in-one) | Both Casdoor and a MySQL database are inside the image | Already includes a toy database and only for test purpose
[casdoor](https://hub.docker.com/r/casbin/casdoor) | Only Casdoor is inside the image | Can be connected to your own database and used in production


1. casbin/casdoor-all-in-one, in which casdoor binary, a mysql database and all necessary configurations are packed up. This image is for new user to have a trial on casdoor quickly. **With this image you can start a casdoor immediately with one single command (or two) without any complex configuration**. **Note: we DO NOT recommend you to use this image in productive environment**

### **Option-1**: Use the toy database

Run the container with port `8000` exposed to host. It will automatically pull the image if it doesn't exist in the local host.

```shell
docker run -p 8000:8000 casbin/casdoor-all-in-one
```

:::caution

Some users in areas like China usually use Docker image mirror services like [Alibaba Cloud Image Booster](https://help.aliyun.com/document_detail/60750.html) ([English](https://www.alibabacloud.com/help/en/container-registry/latest/accelerate-the-download-of-docker-official-images)) to achieve higher download speed compared to DockerHub. However, it has a known issue that the `latest` tag provided by those services is not up-to-date. It probably results in a very old image by fetching the `latest` tag. To mitigate this issue, you can specify the image version number explicitly by using the following command:

```shell
docker pull casbin/casdoor-all-in-one:$(curl -sS "https://hub.docker.com/v2/repositories/casbin/casdoor-all-in-one/tags/?page_size=1&page=2" | sed 's/,/,\n/g' | grep '"name"' |awk -F '"' '{print $4}')
```

Note: the above command utilizes Linux tools like `curl`, `sed`, `grep`, `awk`. If you are using Windows, make sure you run it in a Linux-style shell like `Git Shell` or `Cygwin`. `CMD` or `PowerShell` won't work.

:::

Visit: [**http://localhost:8000**](http://localhost:8000) in your browser. Log into Casdoor dashboard with the default global admin account: `built-in/admin`

```bash
admin
123
```

### **Option-2**: Try with docker-compose

:::caution

Some users in areas like China usually use Docker image mirror services like [Alibaba Cloud Image Booster](https://help.aliyun.com/document_detail/60750.html) ([English](https://www.alibabacloud.com/help/en/container-registry/latest/accelerate-the-download-of-docker-official-images)) to achieve higher download speed compared to DockerHub. However, it has a known issue that the `latest` tag provided by those services is not up-to-date. It probably results in a very old image by fetching the `latest` tag. To mitigate this issue, you can specify the image version number explicitly by using the following command:

```shell
docker pull casbin/casdoor:$(curl -sS "https://hub.docker.com/v2/repositories/casbin/casdoor/tags/?page_size=1&page=2" | sed 's/,/,\n/g' | grep '"name"' |awk -F '"' '{print $4}')
```

Note: the above command utilizes Linux tools like `curl`, `sed`, `grep`, `awk`. If you are using Windows, make sure you run it in a Linux-style shell like `Git Shell` or `Cygwin`. `CMD` or `PowerShell` won't work.

:::

Create a `conf/app.conf` directory in the same level directory of the `docker-compose.yml` file, then copy [app.conf](https://github.com/casdoor/casdoor/blob/master/conf/app.conf) from Casdoor. For more details about `app.conf`, you can see [Via Ini file](/docs/basic/server-installation#via-ini-file).


Create a separate database by docker-compose:

```bash
docker-compose up
```

That's it! :small_airplane:

Visit: [**http://localhost:8000**](http://localhost:8000) in your browser. Log into Casdoor dashboard with the default global admin account: `built-in/admin`

```bash
admin
123
```

*Note: if you dive deeper into the docker-compose.yml, you may be puzzled by the environment variable we created in it called "RUNNING_IN_DOCKER". When database 'db' is created via docker-compose, it is available on localhost of your pc but not localhost of the casdoor container. To prevent you from the troubles caused by modifying app.conf which are pretty difficult for a new user, we provided this environment variable and pre-assigned it in  docker-compose.yml. When this environment variable is true, localhost will be replaced with host.docker.internal so that you casdoor can visit the db.*

### **Option-3** Try directly with standard image'

:::caution

Some users in areas like China usually use Docker image mirror services like [Alibaba Cloud Image Booster](https://help.aliyun.com/document_detail/60750.html) ([English](https://www.alibabacloud.com/help/en/container-registry/latest/accelerate-the-download-of-docker-official-images)) to achieve higher download speed compared to DockerHub. However, it has a known issue that the `latest` tag provided by those services is not up-to-date. It probably results in a very old image by fetching the `latest` tag. To mitigate this issue, you can specify the image version number explicitly by using the following command:

```shell
docker pull casbin/casdoor:$(curl -sS "https://hub.docker.com/v2/repositories/casbin/casdoor/tags/?page_size=1&page=2" | sed 's/,/,\n/g' | grep '"name"' |awk -F '"' '{print $4}')
```

Note: the above command utilizes Linux tools like `curl`, `sed`, `grep`, `awk`. If you are using Windows, make sure you run it in a Linux-style shell like `Git Shell` or `Cygwin`. `CMD` or `PowerShell` won't work.

:::

Create `conf/app.conf`, you can copy it from [conf/app.conf](https://github.com/casdoor/casdoor/blob/master/conf/app.conf) in Casdoor. For more details about `app.conf`, you can see [Via Ini file](/docs/basic/server-installation#via-ini-file).

:::tip

if it is not convenient to mount the configuration file to a container, using environment variables is also a possible solution see [Via Environment Variables](/docs/basic/server-installation#via-environment-variables) for details

:::

Then run 

```
docker run  -p 8000:8000 -v /path/to/app.conf:/conf casbin/casdoor:latest
```
The `/path/to/app.conf` refers to the path to the **folder** containing app.conf.

Anyway just **mount the app.conf to /conf/app.conf** and start it.

Visit: [**http://localhost:8000**](http://localhost:8000) in your browser. Log into Casdoor dashboard with the default global admin account: `built-in/admin`

```bash
admin
123
```
