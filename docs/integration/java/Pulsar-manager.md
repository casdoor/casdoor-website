---
title: Pulsar manager
description: Using Casdoor in Pulsar Manager
keywords: [Pulsar Manager]
authors: [jakiuncle]
---

Casdoor can easily connect to Pulsar Manager.

The code for connecting Casdoor has already been added to Pulsar Manager, so we just need to configure the `application.yml` file in the back-end and enable the front-end switch.

## Step 1: Deploy Casdoor

Deploy Casdoor. See [Server installation](/docs/basic/server-installation). Ensure the server is running and you can sign in at the Casdoor login page (e.g. `admin` / `123`).

## Step 2: Configure Casdoor

Configure an organization and an application in Casdoor (see [Application](/docs/application/config) and [Organization](/docs/organization/overview)).

### Step 2.1: Create an organization

![organization](/img/integration/java/Pulsar-manager/editOrganization.png)

### Step 2.2: Create an application

![application](/img/integration/java/Pulsar-manager/editApplication.png)

## Step 3: Enable the Pulsar Manager front-end switch

Enable this switch to send code and state to the back-end.

The switch is on line 80 of `pulsar-manager/front-end/src/router/index.js`.

![frontSwitch](/img/integration/java/Pulsar-manager/frontSwitch.png)

## Step 4: Configure the back-end code

Configure Casdoor's settings in the `application.properties` file, which can be found on line 154 of `pulsar-manager/src/main/resources/application.properties`.

```ini
casdoor.endpoint = http://localhost:8000
casdoor.clientId = <client id from previous step>
casdoor.clientSecret = <client secret from previous step>
casdoor.certificate = <client certificate from previous step>
casdoor.organizationName = pulsar
casdoor.applicationName = app-pulsar
```
