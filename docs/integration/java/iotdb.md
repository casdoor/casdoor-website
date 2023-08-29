---
title: Apache IoTDB
description: Using Casdoor with Apache IoTDB
keywords: [Apache IoTDB]
authors: [jakiuncle]
---

Casdoor can easily connect to [Apache IoTDB](https://github.com/apache/iotdb).

The code for connecting Casdoor has already been added in [Apache IoTDB Web Workbench](https://github.com/apache/iotdb-web-workbench), so all we need to do is configure the application.yml file in the back-end and activate the front-end switch.

## Step 1: Deploy Casdoor

First, deploy Casdoor.

You can refer to the official Casdoor documentation for the [Server Installation](/docs/basic/server-installation).

After deploying successfully, ensure that:

- The Casdoor server is running successfully at **<http://localhost:8000>**.
- Open your preferred browser and visit **<http://localhost:7001>**, where you will see the Casdoor login page.
- Test the login functionality by entering `admin` and `123`.

With these steps completed, you can now quickly implement a Casdoor-based login page in your own application.

## Step 2: Configure Casdoor

To configure Casdoor, refer to [casdoor](https://door.casdoor.com/login) (It is recommended not to use the same browser you are developing in to configure Casdoor's browser).

You should also create an organization and an application. Refer to [casdoor](https://door.casdoor.com/login) for instructions.

### 2.1 Create an organization

![organization](/img/integration/java/IoTDB/editOrganization.png)

### 2.2 Create an application

![application](/img/integration/java/IoTDB/editApplication.png)

## Step 3: Activate Apache IoTDB Web Workbench front-end switch

Open this switch to send the code and state to the back-end.

This switch can be found in iotdb-web-workbench/fronted/.env file.

![frontSwitch](/img/integration/java/IoTDB/frontSwitch.png)

## Step 4: Configure the back-end code

You need to configure Casdoor's settings in the iotdb-web-workbench/backend/src/main/resources/application.properties file.

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
