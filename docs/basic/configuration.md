---
title: Configuration
description: Configure the Casdoor backend and web console via app.conf and environment variables.
keywords: [Casdoor, configuration, app.conf, environment variables, backend, frontend]
authors: [hsluoyz]
---

Casdoor is configured with one file, `conf/app.conf`, whose options can also be set as environment variables. This page lists every option.

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
| `sessionCookieLifeTime`     | (empty)                                                                              | Session cookie lifetime in seconds. Defaults to 30 days (`2592000`) when empty or not greater than 0; set a value greater than 0 to override it.     |
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
| `trustedProxies`            | (empty)                                                                              | Comma-separated IPs or CIDR ranges of reverse proxies whose `X-Forwarded-For` and `X-Real-IP` headers are trusted for the client IP (`*` trusts any). When empty, loopback and private addresses are trusted |
| `staticBaseUrl`             | `"https://cdn.casbin.org"`                                                           | CDN URL for static assets used during database initialization                                                                                        |
| `frontendCdnUrl`            | (empty)                                                                              | Serve the frontend's JavaScript and CSS from a CDN, e.g. `https://cdn.jsdelivr.net/npm/{name}@{version}`. Only applies to a frontend installed from the `casdoor-web` npm package; files that fail to load from the CDN are loaded from Casdoor |
| `isDemoMode`                | `false`                                                                              | Enable demo mode restrictions                                                                                                                        |
| `batchSize`                 | `100`                                                                                | Batch size for bulk operations                                                                                                                       |
| `showGithubCorner`          | `false`                                                                              | Show the GitHub corner ribbon on the UI                                                                                                              |
| `forceLanguage`             | `""`                                                                                 | Force the UI to use a specific language (e.g. `"zh"`, `"en"`). Overrides the user's browser language. Empty means no override.                       |
| `defaultLanguage`           | `"en"`                                                                               | Default UI language when no browser preference or force override is set                                                                              |
| `defaultApplication`        | `"app-built-in"`                                                                     | Name of the application to redirect to after login when no specific application is requested                                                         |
| `maxItemsForFlatMenu`       | `7`                                                                                  | Maximum number of items to show in a flat (non-grouped) sidebar menu. When the count exceeds this, the menu switches to a tree/grouped view           |
| `enableErrorMask`           | `false`                                                                              | Whether to mask detailed error messages                                                                                                              |
| `enableErrorMask2`          | `false`                                                                              | Replace every API error message with a generic one, so that responses don't reveal why a request failed                                                |
| `enableGzip`                | `true`                                                                               | Accept and respond with gzip encoding when client supports it                                                                                        |
| `inactiveTimeoutMinutes`    | (empty)                                                                              | Auto-logout timeout in minutes. Empty or ≤0 means no timeout                                                                                         |
| `ldapServerPort`            | `389`                                                                                | Port for LDAP server                                                                                                                                 |
| `ldapsCertId`               | `""`                                                                                 | Certificate ID for LDAPS connections                                                                                                                 |
| `ldapsServerPort`           | `636`                                                                                | Port for LDAPS (LDAP over SSL) server                                                                                                                |
| `radiusServerPort`          | `1812`                                                                               | Port for RADIUS server                                                                                                                               |
| `radiusDefaultOrganization` | `"built-in"`                                                                         | Default organization for RADIUS authentication                                                                                                       |
| `radiusSecret`              | `"secret"`                                                                           | Shared secret for RADIUS authentication                                                                                                              |
| `gatewayHttpPort`           | `80`                                                                                 | HTTP port of the reverse-proxy gateway for [Sites](/docs/site/overview). The gateway only starts when at least one site exists                         |
| `gatewayHttpsPort`          | `443`                                                                                | HTTPS port of the reverse-proxy gateway for [Sites](/docs/site/overview)                                                                               |
| `acmeEmail`                 | (empty)                                                                              | Email of the ACME (Let's Encrypt) account used to issue certificates for Sites                                                                         |
| `acmePrivateKey`            | (empty)                                                                              | Private key (PEM) of that ACME account                                                                                                                 |
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

## Frontend configuration

The web console reads a few settings from the backend at runtime, so you change them in `app.conf` (or with environment variables) and restart the backend; there is no need to rebuild the frontend:

| `app.conf` option     | Effect on the web console                                                       |
|-----------------------|---------------------------------------------------------------------------------|
| `defaultApplication`  | Application whose sign-in page is shown when none is specified                  |
| `showGithubCorner`    | Show the GitHub corner ribbon                                                   |
| `isDemoMode`          | Restrict what the console allows, for public demo sites                         |
| `forceLanguage`       | Use this language for every user, ignoring the browser language                 |
| `defaultLanguage`     | Language used when the browser doesn't ask for a supported one                  |
| `staticBaseUrl`       | Base URL of static images such as logos and avatars                             |
| `maxItemsForFlatMenu` | Number of top menu items above which the menu is grouped                        |

The compile-time defaults of these settings, plus the default theme (`ThemeDefault`) and an optional custom footer (`CustomFooter`), are in [**web/src/Conf.ts**](https://github.com/casdoor/casdoor/blob/master/web/src/Conf.ts). Changing that file requires rebuilding the frontend with `yarn build` in the `web` directory. Per-organization and per-application themes are set in the console instead; see [Customize theme](/docs/organization/customize-theme).
