---
title: JumpServer
description:  Using CAS to connect JumpServer
keywords: [CAS, JumpServer, IDP]
authors: [jakiuncle]
---

[Casdoor](/docs/basic/server-installation) can use CAS to connect [JumpServer](https://github.com/jumpserver/jumpserver/).

The following are some of the names in the configuration:

`CASDOOR_HOSTNAME`: Domain name or IP where Casdoor server is deployed.

`JumpServer_HOSTNAME`: Domain name or IP where JumpServer is deployed.

## Step1. Deploy Casdoor and JumpServer

Firstly, the [Casdoor](/docs/basic/server-installation) and [JumpServer](https://github.com/jumpserver/jumpserver/) should be deployed.

After a successful deployment, you need to ensure:

1. Casdoor can be logged in and used normally.
2. You can set CASDOOR_HOSTNAME = `http://localhost:8000`. When deploy Casdoor in `prod` mode. See [production mode](https://casdoor.org/docs/basic/server-installation#production-mode).

## Step2. Configure Casdoor application

1. Create or use an existing Casdoor application.
2. Find a redirect url: `CASDOOR_HOSTNAME`/cas/`your orgnazition`/`your application`/login
3. Add your redirect url to casdoor application: `JumpServer_HOSTNAME`

More infomation for [CAS](https://casdoor.org/zh/docs/how-to-connect/cas)

## Step3. Configure JumpServer

1. You should find Auth ![Find_Auth](/img/integration/python/Auth.png)
2. You should config this app ![configure](/img/integration/python/jumpServer.png)

- `/login` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/login`
- `/logout` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/logout`
- `/serviceValidate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/serviceValidate`
- `/proxyValidate` endpoint: `https://door.casdoor.com/cas/casbin/cas-java-app/proxyValidate`

More infomation for [CAS](https://casdoor.org/zh/docs/how-to-connect/cas) and [JumpServer](https://docs.jumpserver.org/zh/master/admin-guide/authentication/cas/)

Log out of JumpServer, and test SSO.
![Login](/img/integration/python/login.gif)
