---
title: Pulsar-manager
description: Using Casdoor in Pulsar-manager
keywords: [Pulsar-manager]
authors: [jakiuncle]
---

Casdoor can simply connect to Pulsar-manager.

Because the code for connecting casdoor has been added in Pulsar-manager, we just need to configure application.yml in back-end and open front switch.

## Step1. Deploy Casdoor

Firstly, the Casdoor should be deployed.

You can refer to the Casdoor official documentation for the [Server Installation](/docs/basic/server-installation).

After a successful deployment, you need to ensure:

- The Casdoor server is successfully running on **http://localhost:8000**.
- Open your favorite browser and visit **http://localhost:7001**, you will see the login page of Casdoor.
- Input `admin` and `123` to test login functionality is working fine.

Then you can quickly implement a Casdoor-based login page in your own app with the following steps.

## Step2. Configure Casdoor

Configure casdoor can refer to [casdoor](https://door.casdoor.com/login)(Configure casdoor's browser better not use one browser as your develop browser).

You also should configure an organization and an application. You also can refer to [casdoor](https://door.casdoor.com/login).

### step2.1 you should create an organization

![organization](/img/integration/java/Pulsar-manager/editOrganization.png)

### step2.2 you should create an application

![application](/img/integration/java/Pulsar-manager/editApplication.png)

## Step3. Open Pulsar-manager front-end switch

Open this switch to make code and state send to back-end.

This switch in the Line 80 of pulsar-manager/front-end/src/router/index.js

![frontSwitch](/img/integration/java/Pulsar-manager/frontSwitch.png)

## Step4. Configure back-end code

You should configure casdoor's Configuration in the Line 154 of pulsar-manager/src/main/resources/application.properties

```ini
casdoor.endpoint = http://localhost:8000
casdoor.clientId = <client id in previous step>
casdoor.clientSecret = <client Secret in previous step>
casdoor.certificate=<client certificate in previous step>
casdoor.organizationName=pulsar
casdoor.applicationName=app-pulsar
```
