---
title: Hosting Static Files in Intranet
description: How to deploy Casdoor static resource
keywords: [static resource, deployment, Intranet]
authors: [leo220yuyaodog]
---

If you are deploying Casdoor on an **Intranet**, you may not be able to access the static resource directly over the
Internet. You need to deploy static resources where you can access them, and then modify the configuration in Casdoor in
3 places.

## Deploy static resource

All static resources in Casdoor, including images, logo, css, etc., are stored in [casbin/static repository](https://github.com/casbin/static).

**Clone** the repository and **deploy** it on a web servers. Make sure you can access the resource.

## Modify in Casdoor

You can simply modify the configuration file to set the static resource address to where you deployed it. Go to
[conf/app.conf](https://github.com/casdoor/casdoor/blob/c92d34e27c707287545519202463632fb4deacc9/conf/app.conf#L19), set `staticBaseUrl` to your deployed address.

```ini
staticBaseUrl = "https://cdn.casbin.org"
```
