---
title: Configuration reference
sidebar_label: Configuration
description: Every option in the Casdoor configuration file app.conf, and how to override options with environment variables.
keywords: [Casdoor, configuration, app.conf, environment variables, backend, frontend]
authors: [hsluoyz]
---

Casdoor reads its settings from one file, [`conf/app.conf`](https://github.com/casdoor/casdoor/blob/master/conf/app.conf). You can override every option with an environment variable. This page lists all options.

For a minimal setup, set only `driverName`, `dataSourceName`, and `dbName`. See [Configure the database](/docs/basic/server-installation#configure-database).

## Backend options

The options appear in the order of `conf/app.conf`. Restart Casdoor after you change an option.

| Option                      | Default                                                                              | Description                                                                                                                                          |
|-----------------------------|--------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `appname`                   | `casdoor`                                                                            | Application name. Not used at the moment                                                                                                    |
| `httpport`                  | `8000`                                                                               | Port that the backend application listens on                                                                                                         |
| `runmode`                   | `dev`                                                                                | Running mode: `dev` or `prod`                                                                                                                        |
| `copyrequestbody`           | `true`                                                                               | Whether to copy request body for later use                                                                                                           |
| `driverName`                | `mysql`                                                                              | Database driver (e.g., `mysql`, `postgres`, `sqlite`). See [Configure the database](/docs/basic/server-installation#configure-database)                  |
| `dataSourceName`            | `root:123456@tcp(localhost:3306)/`                                                   | Database connection string. See [Configure the database](/docs/basic/server-installation#configure-database)                                             |
| `dbName`                    | `casdoor`                                                                            | Database name used by Casdoor                                                                                                                        |
| `tableNamePrefix`           | (empty)                                                                              | Prefix for table names when using an adapter                                                                                                         |
| `showSql`                   | `false`                                                                              | Show SQL statements in logger when log level is greater than INFO                                                                                    |
| `redisEndpoint`             | (empty)                                                                              | Redis server for the session store and the OAuth device authorization store, in the format `host:port[,poolSize[,password[,db]]]`, for example `localhost:6379,100,<redis-password>,2`. `poolSize` defaults to `1000` and `db` to `0`. List several addresses separated by `;` in the first field to use Redis Cluster, for example `10.0.0.1:6379;10.0.0.2:6379,100,<redis-password>`; `db` isn't used in cluster mode. If empty, sessions are stored in files in `./tmp` and device authorizations in memory. If Redis can't be reached at startup, device authorizations fall back to memory |
| `sessionCookieLifeTime`     | (empty)                                                                              | Session cookie lifetime in seconds. Defaults to 30 days (`2592000`) when empty or not greater than 0; set a value greater than 0 to override it.     |
| `defaultStorageProvider`    | (empty)                                                                              | Default storage provider name for file uploads (e.g., avatars). See [storage](/docs/provider/storage/overview)                                       |
| `isCloudIntranet`           | `false`                                                                              | Whether provider endpoints use intranet addresses                                                                                                    |
| `authState`                 | `"casdoor"`                                                                          | Authorization application name that Casdoor checks during sign-in                                                                                                  |
| `socks5Proxy`               | `"127.0.0.1:10808"`                                                                  | SOCKS5 proxy for OAuth providers (Google, GitHub, etc.) that may be blocked. Use `host:port`, or `socks5://<user>:<password>@host:port` for a proxy that requires authentication. If the proxy can't be reached at startup or the URL is invalid, Casdoor connects directly. Email providers with **Enable proxy** need the plain `host:port` form, without credentials |
| `verificationCodeTimeout`   | `10`                                                                                 | Verification code expiration time in minutes                                                                                                         |
| `initScore`                 | `0`                                                                                  | Initial score assigned to new users (used by Casnode, not Casdoor)                                                                                   |
| `logPostOnly`               | `true`                                                                               | Whether to record only non-GET requests. `logout` and `sso-logout` are recorded for GET requests too, for example OpenID Connect RP-initiated logout through `GET /api/logout`, so that their records and webhooks aren't lost |
| `isUsernameLowered`         | `false`                                                                              | Whether to convert usernames to lowercase                                                                                                            |
| `origin`                    | (empty)                                                                              | Backend origin URL (e.g., `https://door.casdoor.com`)                                                                                                |
| `originFrontend`            | (empty)                                                                              | Frontend origin URL if different from backend                                                                                                        |
| `basePath`                  | (empty)                                                                              | Path that Casdoor is served under behind a reverse proxy, for example `/casdoor`. Empty serves Casdoor at the root. See [Serve Casdoor under a path](/docs/deployment/nginx#serve-casdoor-under-a-path) |
| `trustedProxies`            | (empty)                                                                              | Comma-separated IPs or CIDR ranges of reverse proxies whose `X-Forwarded-For` and `X-Real-IP` headers are trusted for the client IP (`*` trusts any). When empty, loopback and private addresses are trusted |
| `staticBaseUrl`             | `"https://cdn.casbin.org"`                                                           | CDN URL for static assets used during database initialization                                                                                        |
| `frontendCdnUrl`            | (empty)                                                                              | Serve the frontend's JavaScript and CSS from a CDN, e.g. `https://cdn.jsdelivr.net/npm/{name}@{version}`. Only applies to a frontend installed from the `casdoor-web` npm package; files that fail to load from the CDN are loaded from Casdoor |
| `formCssAllowedUrls`        | (empty)                                                                              | Comma-separated URL prefixes from which organization admins may load images, fonts, and other files in the custom HTML and CSS of applications, in addition to this Casdoor's `origin`, the domains of global storage providers, and built-in font and CDN hosts. An entry without a scheme gets `https://`. See [Customize the look of the sign-in page](/docs/application/ui-customization) |
| `isDemoMode`                | `false`                                                                              | Make the site a read-only public demo: most write requests are refused (sign-in, sign-up, sign-out, verification codes, and users editing their own profile still work), `withSecret=1` is refused, and `built-in/admin` is created with the password `123` when `initAdminPassword` is empty. A `dbName` of `casdoor_demo` applies the same rules except the read-only one, and also refuses changes to the Host, Endpoint, or Type of a provider |
| `batchSize`                 | `100`                                                                                | Batch size for bulk operations                                                                                                                       |
| `showGithubCorner`          | `false`                                                                              | Show the GitHub corner ribbon on the UI                                                                                                              |
| `forceLanguage`             | `""`                                                                                 | Language of the UI (e.g. `"zh"`, `"en"`) for visitors who haven't picked a language in this browser. Overrides the browser language, but not a language that the user picked. Empty means no override. See [How Casdoor picks the language](/docs/internationalization#how-casdoor-picks-the-language) |
| `defaultLanguage`           | `"en"`                                                                               | Default UI language when no browser preference or force override is set                                                                              |
| `defaultApplication`        | `"app-built-in"`                                                                     | Name of the application to redirect to after sign-in when no specific application is requested                                                         |
| `maxItemsForFlatMenu`       | `7`                                                                                  | Maximum number of items to show in a flat (non-grouped) sidebar menu. When the count exceeds this, the menu switches to a tree/grouped view           |
| `enableErrorMask`           | `false`                                                                              | Whether to mask detailed error messages                                                                                                              |
| `enableErrorMask2`          | `false`                                                                              | Replace every API error message with a generic one, so that responses don't reveal why a request failed                                                |
| `enableGzip`                | `true`                                                                               | Accept and respond with gzip encoding when client supports it                                                                                        |
| `inactiveTimeoutMinutes`    | (empty)                                                                              | Automatic sign-out timeout in minutes. Empty or ≤0 means no timeout                                                                                         |
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
| `initAdminPassword`         | (empty)                                                                              | Password of `built-in/admin` when Casdoor creates it on an empty database. Existing databases aren't changed. If empty, the first visitor sets the password on the **Welcome to Casdoor** page, except in demo mode (see `isDemoMode`). See [Sign in to the admin console](/docs/basic/server-installation#sign-in) |
| `initDataNewOnly`           | `false`                                                                              | Only add the objects of the init data file that don't exist yet, existing ones are left as they are                                                  |
| `initDataMerge`             | `false`                                                                              | Update the existing objects with only the fields set in the init data file, instead of deleting and re-creating them                                 |
| `initDataFile`              | `"./init_data.json"`                                                                 | Path to the data initialization file, JSON or YAML (`.yaml`/`.yml`). See [Data initialization](/docs/deployment/data-initialization)                 |
| `initDataWatchInterval`     | `0`                                                                                  | Seconds between the checks of the init data file for changes, a changed file is applied again without a restart. `0` applies it only at startup      |
| `disableVersionCheck`       | `false`                                                                              | Don't check GitHub for the latest Casdoor release on the System Info page, for example on an offline or intranet deployment. See [Upgrade Casdoor](/docs/deployment/upgrade) |
| `disableUpgrade`            | `false`                                                                              | Hide the one-click upgrade button of release binaries on the System Info page and reject the upgrade API. See [Upgrade Casdoor](/docs/deployment/upgrade) |
| `frontendBaseDir`           | `"../cc_0"`                                                                          | Base directory for frontend files (only for development)                                                                                             |

## Override options with environment variables

An environment variable with the same name as an option in `app.conf` overrides the value in the file. The name must match the option name exactly, including case. Some Beego options, such as `httpport` and `appname`, work the same way.

Set a variable for one run:

```bash
appname=casbin go run main.go
```

Or export it in the shell before you start Casdoor:

```bash
export httpport=9000
./casdoor
```

In Docker, pass the options with `-e`. See [Try with Docker](/docs/basic/try-with-docker).

## Options that affect the admin console

The frontend reads the following options from the backend at runtime. Change them in `app.conf` or with environment variables and restart the backend. You don't need to rebuild the frontend.

| Option | Effect on the admin console |
|---|---|
| `defaultApplication` | Application whose sign-in page appears when the request names no application |
| `defaultLanguage` | Language used when the browser doesn't ask for a supported one |
| `forceLanguage` | Language used instead of the browser language, until the user picks another one |
| `isDemoMode` | Makes the console read-only, for public demo sites. Also shows the Marketplace themes in turn on the sign-in pages and lets visitors switch between them, as does a `dbName` of `casdoor_demo` |
| `maxItemsForFlatMenu` | Number of top menu items above which the menu is grouped |
| `showGithubCorner` | Shows the GitHub corner ribbon |
| `staticBaseUrl` | Base URL of static images such as logos and avatars |

## Compile-time frontend settings

The compile-time defaults of the options above, the default theme (`ThemeDefault`), and an optional custom footer (`CustomFooter`) are in [`web/src/Conf.ts`](https://github.com/casdoor/casdoor/blob/master/web/src/Conf.ts). After you change that file, rebuild the frontend:

```bash
cd web
yarn build
```

To set a theme for one organization or one application, use the admin console instead. See [Customize the theme](/docs/organization/customize-theme).

## See also

- [Install the Casdoor server](/docs/basic/server-installation)
- [Data initialization](/docs/deployment/data-initialization)
- [Deploy behind Nginx](/docs/deployment/nginx)
