---
title: Configuration
description: Configure the Casdoor backend and frontend via app.conf and Conf.js.
keywords: [Casdoor, configuration, app.conf, Conf.js, backend, frontend]
authors: [hsluoyz]
---

Casdoor is configured through separate files for the backend and frontend. This page documents all supported options.

## Backend configuration (app.conf)

The backend reads a single config file: [**conf/app.conf**](https://github.com/casdoor/casdoor/blob/master/conf/app.conf). For a minimal setup, set `driverName` and `dataSourceName` for your database (see [Configure database](/docs/basic/server-installation#configure-database)). The table below lists every option.

| Parameter                   | Default Value                                                                        | Description                                                                                                                                          |
|-----------------------------|--------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `appname`                   | `casdoor`                                                                            | Application name (currently has no practical use)                                                                                                    |
| `httpport`                  | `8000`                                                                               | Port that the backend application listens on                                                                                                         |
| `runmode`                   | `dev`                                                                                | Running mode: `dev` or `prod`                                                                                                                        |
| `copyrequestbody`           | `true`                                                                               | Whether to copy request body for later use                                                                                                           |
| `driverName`                | `mysql`                                                                              | Database driver (e.g., `mysql`, `postgres`, `sqlite`). See [Configure Database](/docs/basic/server-installation#configure-database)                  |
| `dataSourceName`            | `root:123456@tcp(localhost:3306)/`                                                   | Database connection string. See [Configure Database](/docs/basic/server-installation#configure-database)                                             |
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

### Environment variables

Every Casdoor option in `app.conf` can be overridden with an environment variable of the same name. Some Beego options (e.g. `httpport`, `appname`) are also supported.

Example: starting Casdoor with config passed via environment variables:

```shell
appname=casbin go run main.go
```

Variables can also be `export`ed in the shell. Variable names must match the `app.conf` key names exactly.

:::note
Environment variables override values in `app.conf`.
:::

## Frontend configuration (Conf.js)

The frontend is configured in [**web/src/Conf.js**](https://github.com/casdoor/casdoor/blob/master/web/src/Conf.js). These options control the Casdoor web UI behavior and appearance.

| Parameter               | Default Value                                                                                     | Description                                                                                                                                 |
|-------------------------|---------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `DefaultApplication`    | `"app-built-in"`                                                                                  | The default application used for login when none is specified                                                                               |
| `CasvisorUrl`           | `""`                                                                                              | URL for Casvisor integration. Leave empty to disable                                                                                        |
| `ShowGithubCorner`      | `false`                                                                                           | Whether to show a GitHub corner link in the UI                                                                                              |
| `IsDemoMode`            | `false`                                                                                           | Whether to run the frontend in demo mode with restrictions                                                                                  |
| `ForceLanguage`         | `""`                                                                                              | Force a specific language for all users. Leave empty to allow user selection                                                                |
| `DefaultLanguage`       | `"en"`                                                                                            | Default language for the UI when no user preference is set                                                                                  |
| `InitThemeAlgorithm`    | `true`                                                                                            | Whether to enable the theme algorithm for UI styling                                                                                        |
| `ThemeDefault`          | `{themeType: "default", colorPrimary: "#5734d3", borderRadius: 6, isCompact: false}`              | Default theme settings including theme type, primary color, border radius, and compact mode                                                 |
| `CustomFooter`          | `null`                                                                                            | Custom footer content. Set to `null` to use the default footer                                                                              |
| `AiAssistantUrl`        | `"https://ai.casbin.com"`                                                                         | URL for the AI Assistant feature. Set to blank or `null` to hide the AI Assistant button                                                    |
| `MaxItemsForFlatMenu`   | `7`                                                                                               | Maximum number of navbar items before switching from a flat menu to a grouped/dropdown menu                                                 |

### Theme options

The `ThemeDefault` object supports:

| Property        | Type      | Description                                                              |
|-----------------|-----------|--------------------------------------------------------------------------|
| `themeType`     | `string`  | Theme type: `"default"`, `"dark"`, or `"compact"`                        |
| `colorPrimary`  | `string`  | Primary color in hex format (e.g., `"#5734d3"`)                          |
| `borderRadius`  | `number`  | Border radius in pixels for UI elements                                  |
| `isCompact`     | `boolean` | Whether to use compact mode for denser UI                                |

### Applying changes

1. Edit `web/src/Conf.js` in your Casdoor tree.
2. Adjust the values as needed.
3. Rebuild the frontend: run `yarn build` in the `web` directory.

:::tip
In development, restart the dev server (`yarn start` in `web`) for `Conf.js` changes to apply.
:::
