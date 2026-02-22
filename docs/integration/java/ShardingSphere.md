---
title: ShardingSphere
description: Using Casdoor in ShardingSphere
keywords: [ShardingSphere]
authors: [jakiuncle]
---

[shardingsphere-elasticjob-ui](https://github.com/apache/shardingsphere-elasticjob-ui) includes Casdoor; configure it as below.

## Step 1: Deploy Casdoor

Deploy Casdoor. See [Server installation](/docs/basic/server-installation). Ensure the server is running and you can sign in at the Casdoor login page (e.g. `admin` / `123`).

## Step 2: Configure Casdoor application and configure application in ShardingSphere

1. **Create or use an existing Casdoor application**
![img](/img/integration/java/ShardingSphere/casdoorConfig.png)
Set **Redirect URLs** to where your app should redirect after login; note the chosen values for the next step.

2. **On the certificate editing page, copy your `Certificate`**

    ![img](/img/integration/java/ShardingSphere/cert.png)

3. **Configure the application in ShardingSphere**

    Locate the `application.properties` (or equivalent) to configure.

    ![img](/img/integration/java/ShardingSphere/list.png)

    Next, we need to copy the data from the Casdoor application and paste it into the application.

    ![img](/img/integration/java/ShardingSphere/application.png)

4. **Test it**

    ![img](/img/integration/java/ShardingSphere/test.gif)
