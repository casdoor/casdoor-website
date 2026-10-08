---
title: Host static files on an intranet
description: Serve the images and logos that Casdoor loads from a public CDN from a server inside your own network.
keywords: [static resources, deployment, intranet]
authors: [leo220yuyaodog]
---

This guide explains how to run Casdoor in a network without internet access, where the default CDN for static files is unreachable.

---

#### Learning outcomes

- Serve the Casdoor static files from your own web server.
- Point Casdoor at that server.

#### What you need

- A web server that the users of your intranet can reach
- Access to `conf/app.conf` of your Casdoor instance

---

## About static files

Casdoor loads default images, such as logos, avatars, and provider icons, from `https://cdn.casbin.org`. The files are in the [casbin/static](https://github.com/casbin/static) repository. Without access to that CDN, the images don't load.

## Serve the static files

1. On a machine with internet access, clone [casbin/static](https://github.com/casbin/static).
1. Copy the files to a web server inside your intranet and serve them over HTTP or HTTPS.

## Point Casdoor at your server

1. In [`conf/app.conf`](https://github.com/casdoor/casdoor/blob/master/conf/app.conf), replace the default value of `staticBaseUrl` with the base URL of your web server:

   ```ini
   staticBaseUrl = "https://cdn.casbin.org"
   ```

1. Restart Casdoor.

## See also

- [Configuration reference](/docs/basic/configuration)
- [Host the frontend files on a CDN](/docs/deployment/deploy-cdn)
