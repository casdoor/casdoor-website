---
title: Hosting static files on an intranet
description: Serve Casdoor static assets from an intranet-accessible URL.
keywords: [static resources, deployment, intranet]
authors: [leo220yuyaodog]
---

On an **intranet**, the default CDN URL for static assets may be unreachable. Deploy those assets somewhere your network can access and point Casdoor at that URL.

## Deploy static resources

Static assets (images, logos, CSS, etc.) are in the [casbin/static](https://github.com/casbin/static) repository. Clone it and serve it from a web server that is reachable from your intranet.

## Point Casdoor at your URL

In [conf/app.conf](https://github.com/casdoor/casdoor/blob/master/conf/app.conf), set `staticBaseUrl` to the base URL where you deployed the static files:

```ini
staticBaseUrl = "https://cdn.casbin.org"
```
