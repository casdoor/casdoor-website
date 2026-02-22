---
title: Try with Docker
description: Run Casdoor using Docker or Docker Compose for quick testing or production.
keywords: [Casdoor, Docker, docker-compose]
authors: [hsluoyz]
---

## Requirements

### Hardware

- **Building the image:** At least **2 GB** RAM. The frontend is a React (npm) project and the build can fail with less memory.
- **Running the pre-built image:** At least **100 MB** RAM.

### OS

Linux, Windows, and macOS are supported.

### Docker

- **Docker:** Use [Docker](https://docs.docker.com/get-docker/) (engine **≥ 17.05** on Linux) or **Docker Desktop** on Windows/macOS. Version 17.05+ is required for multi-stage builds used in the project (see [Docker multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/)).
- **Docker Compose:** If you use Compose, install **docker-compose v2.2+**. On Linux, Compose is installed separately from the Docker engine.

## Choosing an image

Two images are available on Docker Hub:

| Image | Contents | Use case |
|-------|----------|----------|
| [casdoor-all-in-one](https://hub.docker.com/r/casbin/casdoor-all-in-one) | Casdoor + embedded MySQL | Quick try-out only; **not for production** |
| [casdoor](https://hub.docker.com/r/casbin/casdoor) | Casdoor only | Connect to your own database; suitable for production |

**casdoor-all-in-one** includes the Casdoor binary, a MySQL database, and default config so Casdoor can be run with one or two commands. Use it only for testing.

### Option 1: All-in-one (toy database)

Expose port `8000` and run the all-in-one image. It will be pulled automatically if missing.

```shell
docker run -p 8000:8000 casbin/casdoor-all-in-one
```

Open [**http://localhost:8000**](http://localhost:8000) and sign in with the default admin: **built-in/admin** / **123**.

### Option 2: Standard image with your config

:::tip
Pass configuration via environment variables instead of mounting a config file.

```bash title="example"

docker run \
  -e driverName=mysql \
  -e dataSourceName='user:password@tcp(x.x.x.x:3306)/' \
  -p 8000:8000 \
  casbin/casdoor:latest

```

:::

Create `conf/app.conf` (copy from [conf/app.conf](https://github.com/casdoor/casdoor/blob/master/conf/app.conf)); see [Via Ini file](/docs/basic/server-installation#via-ini-file) for options. Then run:

```bash
docker run -p 8000:8000 -v /folder/of/app.conf:/conf casbin/casdoor:latest
```

:::note
Casdoor runs as uid/gid 1000. When using volume mounts (e.g. for SQLite or other file-based storage), ensure the mounted path is writable by uid 1000 to avoid `permission denied` errors.
:::

In short: **mount your `app.conf` at `/conf/app.conf`** and start the container. Then open [**http://localhost:8000**](http://localhost:8000) and sign in as **built-in/admin** / **123**.

### Option 3: Docker Compose

Place `app.conf` in a `conf/` directory next to `docker-compose.yml` (copy from [app.conf](https://github.com/casdoor/casdoor/blob/master/conf/app.conf); see [Via Ini file](/docs/basic/server-installation#via-ini-file)). Start Casdoor and the database with:

```bash
docker-compose up
```

Then open [**http://localhost:8000**](http://localhost:8000) and sign in as **built-in/admin** / **123**.

:::note
The `RUNNING_IN_DOCKER` environment variable in `docker-compose.yml` is used because the database service is reachable at `localhost` on the host but not inside the Casdoor container. When `RUNNING_IN_DOCKER` is set, Casdoor uses `host.docker.internal` so it can connect to the database without editing `app.conf`.
:::
