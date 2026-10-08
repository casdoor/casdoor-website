---
title: Install the Casdoor server
description: Install Casdoor from a pre-built binary or from source, connect it to a database, and sign in to the admin console.
keywords: [Casdoor server, installation, configuration]
authors: [hsluoyz]
---

This guide explains how to install the Casdoor server on your own machine, connect it to a database, and sign in for the first time.

---

#### Learning outcomes

- Get Casdoor from a pre-built binary or build it from source.
- Connect Casdoor to a database.
- Run Casdoor in development mode and in production mode.
- Sign in to the Casdoor admin console.

#### What you need

- A machine that runs Windows, Linux, or macOS
- A supported [database](#supported-databases) that Casdoor can reach
- To build from source: [Go 1.21+](https://go.dev/dl/), [Node.js LTS (20)](https://nodejs.org), and [Yarn 1.x](https://classic.yarnpkg.com/en/docs/install)

---

:::tip Don't want to run it yourself?
[Casdoor Cloud](https://www.casdoor.com/pricing?utm_source=casdoor.ai&utm_medium=docs&utm_content=server-installation) gives you a dedicated Casdoor instance that we host and keep upgraded for you, from $25/month with no per-user fees.
:::

## About the Casdoor server

Casdoor is one repository, [casdoor/casdoor](https://github.com/casdoor/casdoor), with two parts:

| Part | Description | Stack |
|---|---|---|
| Frontend | Admin console and sign-in pages | TypeScript, React, Vite |
| Backend | REST API and protocol endpoints | Go, Beego, XORM |

In production, the backend serves the built frontend, so you run a single process on a single port.

### Supported databases

Casdoor uses [XORM](https://xorm.io/) to talk to the database and supports the databases that have an [XORM driver](https://xorm.io/docs/chapter-01/readme/):

- MySQL
- MariaDB
- PostgreSQL
- CockroachDB
- SQL Server
- Oracle
- SQLite 3
- TiDB

## Get Casdoor

Choose one of the two options.

### Download a pre-built binary

1. Download the archive for your platform from [GitHub Releases](https://github.com/casdoor/casdoor/releases). Binaries are available for Linux, macOS, and Windows, each for x86_64 and arm64.
1. Extract the archive. It contains the `casdoor` binary, the built frontend, and a sample `conf/app.conf`.

   ```bash
   # Linux and macOS
   tar -xzf casdoor_Linux_x86_64.tar.gz
   cd casdoor_Linux_x86_64
   ```

1. [Configure the database](/docs/basic/server-installation#configure-database).
1. Run the binary:

   ```bash
   ./casdoor
   ```

1. [Sign in to the admin console](/docs/basic/server-installation#sign-in) at `http://localhost:8000`.

### Build from source

1. Clone the repository. Casdoor uses Go modules, so you can clone it anywhere.

   ```bash
   cd path/to/folder
   git clone https://github.com/casdoor/casdoor
   ```

1. [Configure the database](/docs/basic/server-installation#configure-database).
1. Run Casdoor in [development mode](/docs/basic/server-installation#development-mode) or [production mode](/docs/basic/server-installation#production-mode).

:::caution
Use Yarn 1.x to build the frontend. npm can cause styling issues in the UI. See [casdoor#294](https://github.com/casdoor/casdoor/issues/294).
:::

If Go fails to download dependencies, set the `GOPROXY` environment variable, for example to `https://goproxy.cn/`.

## Configure the database {#configure-database}

Casdoor reads its settings from [`conf/app.conf`](https://github.com/casdoor/casdoor/blob/master/conf/app.conf). The default settings use MySQL. For a minimal setup, set `driverName`, `dataSourceName`, and `dbName`. For every other option, see [Configuration](/docs/basic/configuration).

### MySQL

1. Create a database named `casdoor`.
1. Set the connection in `conf/app.conf`:

   ```ini
   driverName = mysql
   dataSourceName = root:123456@tcp(localhost:3306)/
   dbName = casdoor
   ```

### PostgreSQL

1. Create a database, for example `casdoor`. XORM needs the database to exist before Casdoor starts.
1. Set the connection in `conf/app.conf`:

   ```ini
   driverName = postgres
   dataSourceName = user=postgres password=postgres host=localhost port=5432 sslmode=disable dbname=casdoor
   dbName = casdoor
   ```

:::info
For PostgreSQL, the database name appears twice: in `dbName` and as `dbname` inside `dataSourceName`. Both must be set. See [casdoor#2127](https://github.com/casdoor/casdoor/issues/2127).
:::

### CockroachDB

CockroachDB uses the PostgreSQL driver and the same settings as PostgreSQL, with one extra parameter:

```ini
driverName = postgres
dataSourceName = user=postgres password=postgres host=localhost port=5432 sslmode=disable dbname=casdoor serial_normalization=virtual_sequence
dbName = casdoor
```

:::caution
Add `serial_normalization=virtual_sequence` to `dataSourceName` before you create the database. Without it, Casdoor reports an error about an existing database every time it starts.
:::

### SQLite 3

Set the connection in `conf/app.conf`:

```ini
driverName = sqlite
dataSourceName = file:casdoor.db?cache=shared
dbName = casdoor
```

## Run Casdoor from source

### Run in development mode {#development-mode}

In development mode, the backend and the frontend run as two processes. The frontend reloads when you change its code.

1. In the repository root, start the backend. It listens on port 8000.

   ```bash
   go run main.go
   ```

1. In a second terminal, start the frontend. It is a [Vite](https://vite.dev/) project and listens on port 7001.

   ```bash
   cd web
   yarn install
   yarn start
   ```

1. [Sign in to the admin console](/docs/basic/server-installation#sign-in) at `http://localhost:7001`.

### Run in production mode {#production-mode}

In production mode, you build the frontend into static files and the backend serves them on port 8000.

1. Build the frontend:

   ```bash
   cd web
   yarn install
   yarn build
   ```

1. In the repository root, build and run the backend.

   On Linux and macOS:

   ```bash
   go build
   ./casdoor
   ```

   On Windows:

   ```bash
   go build
   casdoor.exe
   ```

1. [Sign in to the admin console](/docs/basic/server-installation#sign-in) at `http://localhost:8000`.

To listen on a different port, set `httpport` in `conf/app.conf` and restart the backend.

To load the configuration from another location, pass the `--config` flag. The flag takes an absolute or a relative path and replaces the default `conf/app.conf` lookup.

```bash
./casdoor --config /etc/casdoor/app.conf
```

## Sign in to the admin console {#sign-in}

1. Open the Casdoor URL in a browser: `http://localhost:7001` in development mode, or `http://localhost:8000` in production mode and for the pre-built binary.
1. Sign in with the organization `built-in`, the username `admin`, and the password `123`.

:::danger
Change the password of `built-in/admin` before you expose Casdoor to a network.
:::

## Choose the URL that your applications use

Applications that sign users in with Casdoor need the URL of the Casdoor sign-in page:

| Mode | Casdoor URL for your applications |
|---|---|
| Development | `http://localhost:7001` |
| Production | `https://<your-casdoor-domain>`, or the URL of your reverse proxy |

For example, [Casnode](https://casnode.org) signs users in with Casdoor. Its `serverUrl` is `http://localhost:7001` in development and `https://door.casdoor.com` in production.

![Casnode configuration with the Casdoor server URL](/img/basic/server-installation/casnodeexample.png)

## Next steps

- [Configuration](/docs/basic/configuration): Review every backend and frontend option.
- [Connect an application to Casdoor](/docs/how-to-connect/overview): Sign users in to your own application.
- [Deploy behind Nginx](/docs/deployment/nginx): Put Casdoor behind a reverse proxy with HTTPS.

## See also

- [Try with Docker](/docs/basic/try-with-docker)
- [Try with Helm](/docs/basic/try-with-helm)
- [Core concepts](/docs/basic/core-concepts)
