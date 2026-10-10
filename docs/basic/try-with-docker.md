---
title: Run Casdoor with Docker
sidebar_label: Try with Docker
description: Run Casdoor in a Docker container, either with the all-in-one image for a quick trial or with the standard image and your own database.
keywords: [Casdoor, Docker, docker-compose]
authors: [hsluoyz]
---

This guide explains how to run Casdoor in a Docker container and sign in to the admin console.

---

#### Learning outcomes

- Choose between the two Casdoor images.
- Start Casdoor with one command for a trial.
- Run Casdoor against your own database with `docker run` or Docker Compose.

#### What you need

- [Docker](https://docs.docker.com/get-docker/) on Linux, Windows, or macOS. On Linux, Docker Engine 17.05 or later.
- At least 100 MB of RAM to run a pre-built image. At least 2 GB of RAM to build the image yourself, because the frontend build fails with less.
- For Docker Compose: Docker Compose v2.2 or later. On Linux, you install Compose separately from Docker Engine.
- For the standard image: a [supported database](/docs/basic/server-installation#supported-databases) that the container can reach.

---

:::tip Don't want to run it yourself?
[Casdoor Cloud](https://www.casdoor.com/pricing?utm_source=casdoor.ai&utm_medium=docs&utm_content=try-with-docker) gives you a dedicated Casdoor instance that we host and keep upgraded for you, from $29/month with no per-user fees. New accounts get $20 in free credit to try it.
:::

## Choose an image

Casdoor publishes two images on Docker Hub:

| Image | Contents | Use it for |
|---|---|---|
| [`casbin/casdoor-all-in-one`](https://hub.docker.com/r/casbin/casdoor-all-in-one) | Casdoor with an embedded SQLite database and default settings | A quick trial. Not for production |
| [`casbin/casdoor`](https://hub.docker.com/r/casbin/casdoor) | Casdoor only | Production, connected to your own database |

## Try Casdoor with the all-in-one image

1. Start the container. Docker pulls the image if you don't have it.

   ```bash
   docker run -p 8000:8000 casbin/casdoor-all-in-one
   ```

1. Open `http://localhost:8000` in a browser.
1. Sign in with the organization `built-in`, the username `admin`, and the password `123`.

The data lives in a SQLite file inside the container and is lost when you remove the container.

## Run the standard image with your database

Pass the settings to the container in one of two ways.

### Pass settings as environment variables

This is the recommended way. Every option of [`app.conf`](/docs/basic/configuration) is also an environment variable.

1. Start the container with the database settings:

   ```bash
   docker run \
     -e driverName=mysql \
     -e dataSourceName='<user>:<password>@tcp(<host>:3306)/' \
     -p 8000:8000 \
     casbin/casdoor:latest
   ```

   - `<user>` and `<password>`: the database account.
   - `<host>`: the address of the database as seen from inside the container.

1. Open `http://localhost:8000` and sign in as `built-in/admin` with the password `123`.

### Mount a configuration file

1. Copy [`conf/app.conf`](https://github.com/casdoor/casdoor/blob/master/conf/app.conf) to a folder on the host and set the database connection. See [Configure the database](/docs/basic/server-installation#configure-database).
1. Start the container and mount the folder at `/conf`, so that the file is at `/conf/app.conf` inside the container:

   ```bash
   docker run -p 8000:8000 -v /folder/of/app.conf:/conf casbin/casdoor:latest
   ```

1. Open `http://localhost:8000` and sign in as `built-in/admin` with the password `123`.

:::note
Casdoor runs as uid and gid 1000 inside the container. When you mount a volume that Casdoor writes to, for example for a SQLite file, make the path writable by uid 1000. Otherwise Casdoor fails with `permission denied`.
:::

## Run Casdoor and a database with Docker Compose

The Casdoor repository contains a [`docker-compose.yml`](https://github.com/casdoor/casdoor/blob/master/docker-compose.yml) that starts Casdoor together with a database.

1. Clone the repository or copy `docker-compose.yml` to a folder.
1. Put `app.conf` in a `conf/` directory next to `docker-compose.yml`. Start from [`conf/app.conf`](https://github.com/casdoor/casdoor/blob/master/conf/app.conf).
1. Start the services:

   ```bash
   docker-compose up
   ```

1. Open `http://localhost:8000` and sign in as `built-in/admin` with the password `123`.

:::info
`docker-compose.yml` sets the `RUNNING_IN_DOCKER` environment variable. The database is reachable at `localhost` from the host but not from inside the Casdoor container. When `RUNNING_IN_DOCKER` is set, Casdoor connects to `host.docker.internal` instead, so you don't have to edit `app.conf`.
:::

## Next steps

- Change the password of `built-in/admin` before you expose Casdoor to a network.
- [Deploy with Docker in production](/docs/deployment/docker)
- [Connect an application to Casdoor](/docs/how-to-connect/overview)

## See also

- [Configuration reference](/docs/basic/configuration)
- [Install the Casdoor server](/docs/basic/server-installation)
- [Run Casdoor on Kubernetes with Helm](/docs/basic/try-with-helm)
