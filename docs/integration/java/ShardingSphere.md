---
title: ShardingSphere
description: Using Casdoor in ShardingSphere
keywords: [ShardingSphere]
authors: [jakiuncle]
---

[shardingsphere-elasticjob-ui](https://github.com/apache/shardingsphere-elasticjob-ui) has integrated Casdoor. You can use it after configuring it.

## Step 1: Deploy Casdoor

Firstly, Casdoor should be deployed.

You can refer to the Casdoor official documentation for the [Server Installation](/docs/basic/server-installation).

After a successful deployment, make sure:

- The Casdoor server is successfully running on **<http://localhost:8000>**.
- Open your favorite browser and visit **<http://localhost:7001>**. You will see the login page of Casdoor.
- Input `admin` and `123` to test if the login functionality is working fine.

Then, you can quickly implement a Casdoor-based login page in your own app with the following steps.

## Step 2: Configure Casdoor application and configure application in ShardingSphere

1. **Create or use an existing Casdoor application**
![img](/img/integration/java/ShardingSphere/casdoorConfig.png)
The RedirectURLs depend on the URL you need to redirect to. The selected data will be used in the next step.

2. **On the certificate editing page, you can see your `Certificate`**

    ![img](/img/integration/java/ShardingSphere/cert.png)

3. **Configure the application in ShardingSphere**

    First, we need to find the application.properties that we need to configure.

    ![img](/img/integration/java/ShardingSphere/list.png)

    Next, we need to copy the data from the Casdoor application and paste it into the application.

    ![img](/img/integration/java/ShardingSphere/application.png)

4. **Test it**

    ![img](/img/integration/java/ShardingSphere/test.gif)
