---
title: Apache IoTDB
description: Using Casdoor with Apache IoTDB
keywords: [Apache IoTDB]
authors: [jakiuncle]
---

Casdoor can easily connect to [Apache IoTDB](https://github.com/apache/iotdb).

[Apache IoTDB Web Workbench](https://github.com/apache/iotdb-web-workbench) already includes Casdoor support. Configure the backend `application.yml` and enable the front-end switch.

## Step 1: Deploy Casdoor

Deploy Casdoor. See [Server installation](/docs/basic/server-installation). Ensure the server is running and you can sign in at the Casdoor login page.

## Step 2: Configure Casdoor

Create an organization and an application in Casdoor (see [Application](/docs/application/config) and [Organization](/docs/organization/overview)).

### 2.1 Create an organization

![organization](/img/integration/java/IoTDB/editOrganization.png)

### 2.2 Create an application

![application](/img/integration/java/IoTDB/editApplication.png)

## Step 3: Activate Apache IoTDB Web Workbench front-end switch

Open this switch to send the code and state to the back-end.

This switch can be found in iotdb-web-workbench/fronted/.env file.

![frontSwitch](/img/integration/java/IoTDB/frontSwitch.png)

## Step 4: Configure the back-end code

Configure Casdoor in `iotdb-web-workbench/backend/src/main/resources/application.properties`.

```ini
casdoor.endpoint = http://localhost:8000
casdoor.clientId = <client id from previous step>
casdoor.clientSecret = <client secret from previous step>
casdoor.certificate=<client certificate from previous step>
casdoor.organizationName=IoTDB
casdoor.applicationName=app-IoTDB
```

## Result

![result](/img/integration/java/IoTDB/iotdb.gif)
