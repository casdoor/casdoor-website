---
title: JumpServer
description: Using CAS to connect JumpServer
keywords: [CAS, JumpServer, IDP]
authors: [jakiuncle]
---

[Casdoor](/docs/basic/server-installation) can be used to connect [JumpServer](https://github.com/jumpserver/jumpserver/).

The following are some of the names in the configuration:

`CASDOOR_HOSTNAME`: The domain name or IP where Casdoor server is deployed.

`JumpServer_HOSTNAME`: The domain name or IP where JumpServer is deployed.

## Step 1: Deploy Casdoor and JumpServer

Firstly, deploy [Casdoor](/docs/basic/server-installation) and [JumpServer](https://github.com/jumpserver/jumpserver/).

After successful deployment, ensure the following:

1. Casdoor can be logged in and used normally.
2. You can set CASDOOR_HOSTNAME to `http://localhost:8000` when deploying Casdoor in `prod` mode. See [production mode](https://casdoor.org/docs/basic/server-installation#production-mode).

## Step 2: Configure Casdoor application

1. Create a new Casdoor application or use an existing one.
2. Find a redirect URL: `CASDOOR_HOSTNAME`/cas/`your organization`/`your application`/login.
3. Add your redirect URL to the Casdoor application: `JumpServer_HOSTNAME`.

For more information about [CAS](https://casdoor.org/docs/how-to-connect/cas), refer to the documentation.

## Step 3: Configure JumpServer

1. Find Auth: ![Find_Auth](/img/integration/python/jumpServer/Auth.png).
2. Configure this app: ![configure](/img/integration/python/jumpServer/jumpServer.png).

- `/login` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/login`.
- `/logout` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/logout`.
- `/serviceValidate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/serviceValidate`.
- `/proxyValidate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/proxyValidate`.

For more information about [CAS](https://casdoor.org/docs/how-to-connect/cas) and [JumpServer](https://docs.jumpserver.org/zh/master/admin-guide/authentication/cas/), refer to the documentation.

Log out of JumpServer and test SSO:
![Login](/img/integration/python/jumpServer/login.gif)
