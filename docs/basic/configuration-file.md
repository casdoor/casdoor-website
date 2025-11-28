---
title: Configuration File
description: Configure Casdoor backend and frontend settings
keywords: [Casdoor configuration, app.conf, Conf.js, backend config, frontend config]
authors: [hsluoyz]
---

This document describes how to configure Casdoor through its configuration files. Casdoor has two main configuration files:

- **Backend Configuration**: `conf/app.conf` - Controls the Go backend server settings
- **Frontend Configuration**: `web/src/Conf.js` - Controls the React frontend UI settings

## Backend Configuration (app.conf)

Casdoor's backend can be configured via a single file: [**conf/app.conf**](https://github.com/casdoor/casdoor/blob/master/conf/app.conf).

### Database Configuration

Casdoor supports MySQL, MSSQL, SQLite3, and PostgreSQL. By default, Casdoor uses MySQL.

#### MySQL

Casdoor stores user, node, and topic information in a MySQL database named `casdoor`. If the database does not exist, it must be created manually. The DB connection string can be specified at: <https://github.com/casdoor/casdoor/blob/master/conf/app.conf>

```ini
driverName = mysql
dataSourceName = root:123456@tcp(localhost:3306)/
dbName = casdoor
```

#### PostgreSQL

Before running Casdoor, you need to manually prepare a database for PostgreSQL, as Casdoor requires a database to be selected when opening Postgres with xorm.

Assuming you have already prepared a database called `casdoor`, you should specify `app.conf` like this:

```ini
driverName = postgres
dataSourceName = user=postgres password=postgres host=localhost port=5432 sslmode=disable dbname=casdoor
dbName = casdoor
```

:::info
For PostgreSQL, ensure that `dataSourceName` has a non-empty `dbName` and also [duplicate](https://github.com/casdoor/casdoor/issues/2127) the database name for the `dbname` field as shown in the example above.
:::

#### CockroachDB

CockroachDB can also be used with the PostgreSQL driver and has the same configuration as PostgreSQL.

```ini
driverName = postgres
dataSourceName = user=postgres password=postgres host=localhost port=5432 sslmode=disable dbname=casdoor serial_normalization=virtual_sequence
dbName = casdoor
```

:::info
For CockroachDB, remember to add `serial_normalization=virtual_sequence` to the `dataSourceName` as shown in the example above. Otherwise, you will get an error regarding an existing database whenever the service starts or restarts. Note that this must be added before the database is created.
:::

#### SQLite3

To configure SQLite3, you should specify `app.conf` like this:

```ini
driverName = sqlite
dataSourceName = file:casdoor.db?cache=shared
dbName = casdoor
```

### Configuration Reference

Below is a complete reference of all backend configuration options:

| Parameter                   | Default Value                                                                        | Description                                                                                                                                          |
|-----------------------------|--------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `appname`                   | `casdoor`                                                                            | Application name (currently has no practical use)                                                                                                    |
| `httpport`                  | `8000`                                                                               | Port that the backend application listens on                                                                                                         |
| `runmode`                   | `dev`                                                                                | Running mode: `dev` or `prod`                                                                                                                        |
| `copyrequestbody`           | `true`                                                                               | Whether to copy request body for later use                                                                                                           |
| `driverName`                | `mysql`                                                                              | Database driver (e.g., `mysql`, `postgres`, `sqlite`). See [Database Configuration](#database-configuration)                                        |
| `dataSourceName`            | `root:123456@tcp(localhost:3306)/`                                                   | Database connection string. See [Database Configuration](#database-configuration)                                                                   |
| `dbName`                    | `casdoor`                                                                            | Database name used by Casdoor                                                                                                                        |
| `tableNamePrefix`           | (empty)                                                                              | Prefix for table names when using an adapter                                                                                                         |
| `showSql`                   | `false`                                                                              | Show SQL statements in logger when log level is greater than INFO                                                                                    |
| `redisEndpoint`             | (empty)                                                                              | Redis endpoint for session storage (e.g., `localhost:6379`). If empty, sessions are stored locally in `./tmp`. For password: `host:port,db,password` |
| `defaultStorageProvider`    | (empty)                                                                              | Default storage provider name for file uploads (e.g., avatars). See [storage](/docs/provider/storage/overview)                                       |
| `isCloudIntranet`           | `false`                                                                              | Whether provider endpoints use intranet addresses                                                                                                    |
| `authState`                 | `"casdoor"`                                                                          | Authorization application name checked during login                                                                                                  |
| `socks5Proxy`               | `"127.0.0.1:10808"`                                                                  | SOCKS5 proxy address for OAuth providers (Google, GitHub, etc.) that may be blocked                                                                  |
| `verificationCodeTimeout`   | `10`                                                                                 | Verification code expiration time in minutes                                                                                                         |
| `initScore`                 | `0`                                                                                  | Initial score assigned to new users (used by Casnode, not Casdoor)                                                                                   |
| `logPostOnly`               | `true`                                                                               | Whether to log only POST requests                                                                                                                    |
| `isUsernameLowered`         | `false`                                                                              | Whether to convert usernames to lowercase                                                                                                            |
| `origin`                    | (empty)                                                                              | Backend origin URL (e.g., `https://door.casdoor.com`)                                                                                                |
| `originFrontend`            | (empty)                                                                              | Frontend origin URL if different from backend                                                                                                        |
| `staticBaseUrl`             | `"https://cdn.casbin.org"`                                                           | CDN URL for static assets used during database initialization                                                                                        |
| `isDemoMode`                | `false`                                                                              | Enable demo mode restrictions                                                                                                                        |
| `batchSize`                 | `100`                                                                                | Batch size for bulk operations                                                                                                                       |
| `enableErrorMask`           | `false`                                                                              | Whether to mask detailed error messages                                                                                                              |
| `enableGzip`                | `true`                                                                               | Accept and respond with gzip encoding when client supports it                                                                                        |
| `inactiveTimeoutMinutes`    | (empty)                                                                              | Auto-logout timeout in minutes. Empty or ≤0 means no timeout                                                                                         |
| `ldapServerPort`            | `389`                                                                                | Port for LDAP server                                                                                                                                 |
| `ldapsCertId`               | `""`                                                                                 | Certificate ID for LDAPS connections                                                                                                                 |
| `ldapsServerPort`           | `636`                                                                                | Port for LDAPS (LDAP over SSL) server                                                                                                                |
| `radiusServerPort`          | `1812`                                                                               | Port for RADIUS server                                                                                                                               |
| `radiusDefaultOrganization` | `"built-in"`                                                                         | Default organization for RADIUS authentication                                                                                                       |
| `radiusSecret`              | `"secret"`                                                                           | Shared secret for RADIUS authentication                                                                                                              |
| `quota`                     | `{"organization": -1, "user": -1, "application": -1, "provider": -1}`                | Resource quotas (-1 means unlimited)                                                                                                                 |
| `logConfig`                 | `{"adapter":"file", "filename": "logs/casdoor.log", "maxdays":99999, "perm":"0770"}` | Logging configuration (adapter, file path, rotation, permissions)                                                                                    |
| `initDataNewOnly`           | `false`                                                                              | Whether to initialize data only for new installations                                                                                                |
| `initDataFile`              | `"./init_data.json"`                                                                 | Path to data initialization file. See [Data Initialization](/docs/deployment/data-initialization)                                                    |
| `frontendBaseDir`           | `"../cc_0"`                                                                          | Base directory for frontend files (only for development)                                                                                             |

### Environment Variables

All configuration items defined by Casdoor in the ini file mentioned above can be configured via environment variables, as well as some of the beego configurations items (httpport, appname).

For example, when you try to start Casdoor, you can use something like this to pass the configuration via environment variables:

```shell
appname=casbin go run main.go
```

In addition, `export` derivatives are also a possible method. The names of environmental variables should exactly match the names you want to use in the ini file.

Note: configurations in environmental variables can override the configurations in the ini file.

## Frontend Configuration (Conf.js)

Casdoor's frontend can be configured via: [**web/src/Conf.js**](https://github.com/casdoor/casdoor/blob/master/web/src/Conf.js). This file contains settings that control the React frontend UI behavior.

### Configuration Reference

Below is a complete reference of all frontend configuration options:

| Parameter            | Default Value                                           | Description                                                                                                               |
|---------------------|---------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `DefaultApplication` | `"app-built-in"`                                        | The default application name used when no specific application is specified                                               |
| `CasvisorUrl`        | `""`                                                    | URL to the Casvisor service for audit logging. If empty, Casvisor integration is disabled                                 |
| `ShowGithubCorner`   | `false`                                                 | Whether to show the GitHub corner link in the UI                                                                          |
| `IsDemoMode`         | `false`                                                 | Enable demo mode restrictions in the frontend (complements backend `isDemoMode`)                                          |
| `ForceLanguage`      | `""`                                                    | Force a specific language for the UI. If empty, users can select their preferred language                                 |
| `DefaultLanguage`    | `"en"`                                                  | Default language for the UI when no language is selected                                                                  |
| `InitThemeAlgorithm` | `true`                                                  | Whether to initialize the theme algorithm on startup                                                                      |
| `ThemeDefault`       | See below                                               | Default theme configuration object                                                                                        |
| `CustomFooter`       | `null`                                                  | Custom footer content. If `null`, the default footer is used                                                              |
| `AiAssistantUrl`     | `"https://ai.casbin.com"`                               | URL to the AI Assistant service. If empty or `null`, the AI Assistant button is hidden                                    |
| `MaxItemsForFlatMenu`| `7`                                                     | Maximum number of navbar items before switching from a flat menu to a grouped/collapsed menu                              |

### ThemeDefault Configuration

The `ThemeDefault` object controls the default theme appearance:

| Property       | Default Value | Description                                                        |
|---------------|---------------|--------------------------------------------------------------------|
| `themeType`    | `"default"`   | The type of theme to use                                           |
| `colorPrimary` | `"#5734d3"`   | Primary color for the theme (in hex format)                        |
| `borderRadius` | `6`           | Border radius for UI elements (in pixels)                          |
| `isCompact`    | `false`       | Whether to use a compact layout                                    |

### Example Configuration

Here is an example of how the `Conf.js` file might be customized:

```javascript
export const DefaultApplication = "my-custom-app";

export const CasvisorUrl = "https://casvisor.example.com";

export const ShowGithubCorner = true;
export const IsDemoMode = false;

export const ForceLanguage = "";
export const DefaultLanguage = "zh";

export const InitThemeAlgorithm = true;
export const ThemeDefault = {
  themeType: "default",
  colorPrimary: "#1890ff",
  borderRadius: 8,
  isCompact: false,
};

export const CustomFooter = null;

export const AiAssistantUrl = "";

export const MaxItemsForFlatMenu = 10;
```

:::tip
After modifying the frontend configuration, you need to rebuild the frontend for the changes to take effect:

```bash
cd web
yarn build
```

:::
