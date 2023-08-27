---
title: Hosting Static Files in an Intranet
description: How to deploy Casdoor static resources
keywords: [static resources, deployment, intranet]
authors: [leo220yuyaodog]
---

If you are deploying Casdoor on an **intranet**, you may not be able to access the static resources directly over the
internet. You need to deploy the static resources where you can access them, and then modify the configuration in Casdoor in
three places.

## Deploy static resources

All static resources in Casdoor, including images, logos, CSS, etc., are stored in the [casbin/static repository](https://github.com/casbin/static).

**Clone** the repository and **deploy** it on a web server. Make sure you can access the resources.

## Modify in Casdoor

You can simply modify the configuration file to set the static resource address to where you deployed it. Go to
[conf/app.conf](https://github.com/casdoor/casdoor/blob/c92d34e27c707287545519202463632fb4deacc9/conf/app.conf#L19) and set `staticBaseUrl` to your deployed address.

```ini
staticBaseUrl = "https://cdn.casbin.org"
```
