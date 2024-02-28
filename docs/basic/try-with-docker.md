---
title: (Optional) Try with Docker
description: Try Casdoor with Docker
keywords: [Casdoor, Docker]
authors: [hsluoyz]
---

## Requirements

### Hardware

If you want to build the Docker image yourself, please ensure that your machine has at least **2GB** of memory. Casdoor's frontend is an NPM project of React. Building the frontend requires at least **2GB** of memory. Having less than **2GB** of memory may result in a frontend build failure.

If you only need to run the pre-built image, please ensure that your machine has at least **100MB** of memory.

### OS

All operating systems (Linux, Windows, and macOS) are supported.

### Docker

You can use **Docker (docker-engine version >= 17.05)** in Linux or **Docker Desktop** in Windows and macOS.

* [Docker](https://docs.docker.com/get-docker/)

Regardless of the operating system, users must ensure that they have **docker-engine version >= 17.05**. This is because we utilize the multi-stage build feature in the docker-compose.yml, which is supported in versions 17.05 and above. For more information, see <https://docs.docker.com/develop/develop-images/multistage-build/>.

If you are also using docker-compose, please ensure that you have **docker-compose version >= 2.2**. For Linux users, you also need to make sure that docker-compose is installed, as it is separate from docker-engine.

## Get the image

We have provided two DockerHub images:

Name | Description | Suggestion
----|------|----
[casdoor-all-in-one](https://hub.docker.com/r/casbin/casdoor-all-in-one) | Both Casdoor and a MySQL database are included in the image | This image already includes a toy database and is only for testing purposes
[casdoor](https://hub.docker.com/r/casbin/casdoor) | Only Casdoor is included in the image | This image can be connected to your own database and used in production

1. casbin/casdoor-all-in-one: This image includes the casdoor binary, a MySQL database, and all the necessary configurations. It is designed for new users who want to try Casdoor quickly. With this image, you can start Casdoor immediately with just one or two commands, without any complex configuration. However, please note that we **do not recommend** using this image in a production environment.

### **Option-1**: Use the toy database

Run the container with port `8000` exposed to the host. The image will be automatically pulled if it doesn't exist on the local host.

```shell
docker run -p 8000:8000 casbin/casdoor-all-in-one
```

Visit [**http://localhost:8000**](http://localhost:8000) in your browser. Log into the Casdoor dashboard with the default global admin account: `built-in/admin`

```bash
admin
123
```

### **Option-2**: Try directly with the standard image

:::tip

If it is not convenient to mount the configuration file to a container, using environment variables is also a possible solution.

```bash title="example"

docker run \
  -e driverName=mysql \
  -e dataSourceName='user:password@tcp(x.x.x.x:3306)/' \
  -p 8000:8000 \
  casbin/casdoor:latest

```

:::

Create `conf/app.conf`. You can copy it from [conf/app.conf](https://github.com/casdoor/casdoor/blob/master/conf/app.conf) in Casdoor. For more details about `app.conf`, you can see [Via Ini file](/docs/basic/server-installation#via-ini-file).

Then run

```bash
docker run  -p 8000:8000 -v /folder/of/app.conf:/conf casbin/casdoor:latest
```

Anyway, just **mount the app.conf to /conf/app.conf** and start the container.

Visit [**http://localhost:8000**](http://localhost:8000) in your browser. Log into the Casdoor dashboard with the default global admin account: `built-in/admin`

```bash
admin
123
```

### **Option-3**: Try with docker-compose

Create a `conf/app.conf` directory in the same directory level as the `docker-compose.yml` file. Then, copy [app.conf](https://github.com/casdoor/casdoor/blob/master/conf/app.conf) from Casdoor. For more details about `app.conf`, you can see [Via Ini file](/docs/basic/server-installation#via-ini-file).

Create a separate database using docker-compose:

```bash
docker-compose up
```

That's it! :small_airplane:

Visit [**http://localhost:8000**](http://localhost:8000) in your browser. Log into the Casdoor dashboard with the default global admin account: `built-in/admin`

```bash
admin
123
```

:::note

If you dig deeper into the docker-compose.yml file, you may be puzzled by the environment variable we created called "RUNNING_IN_DOCKER". When the database 'db' is created via docker-compose, it is available on your PC's localhost but not the localhost of the Casdoor container. To prevent you from running into troubles caused by modifying app.conf, which can be quite difficult for a new user, we provided this environment variable and pre-assigned it in the docker-compose.yml. When this environment variable is set to true, localhost will be replaced with host.docker.internal so that Casdoor can access the database.

:::
