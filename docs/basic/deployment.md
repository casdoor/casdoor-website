---
title: Deployment
description: How to deploy Casdoor static resource
keywords: [static resource, deployment, Intranet]
---

If you are deploying Casdoor on an **Intranet**, you may not be able to access the static resource directly over the
Internet. You need to deploy static resources where you can access them, and then modify the configuration in Casdoor in
3 places.

## Deploy static resource
All static resources in Casdoor, including images, logo, css, etc., are stored in [casbin/static repository](https://github.com/casbin/static).

**Clone** the repository and **deploy** it on a web servers. Make sure you can access the resource.

## Modify in Casdoor

1. Go to [conf/app.conf](https://github.com/casdoor/casdoor/blob/c92d34e27c707287545519202463632fb4deacc9/conf/app.conf#L19), modify `staticBaseUrl`.
```ini
staticBaseUrl = "https://cdn.casbin.org"
```
2. Go to [web/src/Setting.js](https://github.com/casdoor/casdoor/blob/ca1324757259c2a15aea60572adba50446e0cdbe/web/src/Setting.js#L29), modify `StaticBaseUrl`
```javascript
export const StaticBaseUrl = "https://cdn.casbin.org";
```
3. Go to [web/src/app.less](https://github.com/casdoor/casdoor/blob/c92d34e27c707287545519202463632fb4deacc9/web/src/App.less#L3), modify `@StaticBaseUrl`
```less
@StaticBaseUrl:"https://cdn.casbin.org";
```