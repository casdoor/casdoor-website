---
title: Using Casdoor in ShenYu
description: How to use Casdoor with ShenYu
keywords: [ShenYu, Casdoor]
authors: [jakiuncle]
---

ShenYu has a Casdoor plugin to enable the use of Casdoor.

## Step 1: Deploy Casdoor

Firstly, Casdoor should be deployed. You can refer to the official Casdoor documentation for [Server Installation](/docs/basic/server-installation).

After a successful deployment, please ensure that:

- The Casdoor server is running on **<http://localhost:8000>**.
- Open your preferred browser and visit **<http://localhost:7001>** to see the Casdoor login page.
- Login functionality is working fine by inputting `admin` and `123`.

After following the above steps, you can quickly implement a Casdoor-based login page in your app with the following steps.

## Step 2: Configure the Casdoor application

1. **Create a new Casdoor application or use an existing one**
2. **Add your redirect URL**
   ![Casdoor Application Settings](/img/integration/java/shenyu/shenyu_config.png)
3. **On the certificate editing page, you can view your `Certificate`**
   ![Casdoor Certification Settings](/img/integration/java/shenyu/shenyu_cert.png)

## Step 3: Use the Casdoor plugin in ShenYu

### 1. Configure the Casdoor plugin in ShenYu

   ![Shenyu Plugin Configuration](/img/integration/java/shenyu/shenyu_configPlugin.png)

Note: As ShenYu only has a single line input box, `\n` must be added in every line of certificate.
   ![Casdoor Certification Settings](/img/integration/java/shenyu/shenyu_cert2.png)

You can copy it and paste it into the certificate of the ShenYu Casdoor config.

**You don't need to save it in the Casdoor certificate editing page**, as it is only for copying.

### 2. Configure the ShenYu Casdoor plugin

   ![Shenyu Casdoor Config](/img/integration/java/shenyu/shenyu_casdoor.png)
   You can configure what you need for the Casdoor config.

### 3. Getting the service and using it

#### 3.1 Directly visit the Web

   ![Shenyu Fail Login](/img/integration/java/shenyu/shenyu_faillogin.png)

#### 3.2 Use Casdoor Login

   ![Shenyu Login](/img/integration/java/shenyu/shenyu_login.png)
   ![Shenyu Successful Login](/img/integration/java/shenyu/shenyu_successlogin.png)

#### 3.3 Carry the token in Headers

   ![Shenyu Token](/img/integration/java/shenyu/shenyu_token.png)

#### 3.4 Save name, ID and organization in Headers

This makes it easier to use them in the future.
