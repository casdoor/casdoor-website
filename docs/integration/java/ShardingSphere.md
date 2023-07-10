---
title: ShardingSphere
description: Using Casdoor in ShardingSphere
keywords: [ShardingSphere]
authors: [jakiuncle]
---

[shardingsphere-elasticjob-ui](https://github.com/apache/shardingsphere-elasticjob-ui) have integrated Casdoor. We can use it after config it.

## Step1. Deploy Casdoor

Firstly, the Casdoor should be deployed.

You can refer to the Casdoor official documentation for the [Server Installation](/docs/basic/server-installation).

After a successful deployment, you need to ensure:

- The Casdoor server is successfully running on **<http://localhost:8000>**.
- Open your favorite browser and visit **<http://localhost:7001>**, you will see the login page of Casdoor.
- Input `admin` and `123` to test login functionality is working fine.

Then you can quickly implement a casdoor based login page in your own app with the following steps.

## Step2. Configure Casdoor application and configure application in ShardingSphere

1.**Create or use an existing Casdoor application**
![img](/img/integration/java/ShardingSphere/casdoorConfig.png)
RedirectURLs is depend on what url you need redirect.The selected data will use in next.

2.**On the certificate editing page, you can see your `Certificate`**

![img](/img/integration/java/ShardingSphere/cert.png)

3.**Configure application in ShardingSphere**

First we need find the application.properties we need configure

![img](/img/integration/java/ShardingSphere/list.png)

Second we need copy the data in Casdoor application and paste them into application.

![img](/img/integration/java/ShardingSphere/application.png)

4.**Test it**

![img](/img/integration/java/ShardingSphere/test.gif)
