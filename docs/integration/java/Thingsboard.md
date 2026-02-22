---
title: Thingsboard
description: Learn how to integrate Casdoor with Thingsboard to secure your applications
keywords: [oauth2, Thingsboard, integration]
authors: [RanTao123]
---

Deploy Casdoor first (see [Server installation](/docs/basic/server-installation)). Then configure the application and Thingsboard as below.

## Step 1: Configure Casdoor application

1. Create a new Casdoor application or use an existing one.
2. Add a redirect URL: `http://CASDOOR_HOSTNAME/login`
   ![Casdoor Application Setting](/img/integration/java/Thingsboard/img_6.png)
3. Note the **Client ID** and **Client secret** for the following steps.

## Step 2: Add a user in Casdoor

Create a user and assign a role to the application.

Go to **Users** → **Add user** to open the new-user page.

Save the user after adding a username and selecting the organization "Thingsboard" (other details are optional).

Set a password via "Manage your password".

Choose a password for the user and confirm it.

## Step 3: Prerequisites and Build Thingsboard App

First of all, Thingsboard only supports Java 11 (OpenJDK).

Download from:

[JDK Download Page](https://adoptium.net/zh-CN/)

To start Thingsboard, follow these steps (for Windows system):

* Download and extract the package. [Download the package](https://github.com/thingsboard/thingsboard/releases/download/v3.5/thingsboard-windows-3.5.zip)
* Configure Thingsboard in \thingsboard\conf\thingsboard.yml according to your preferences, including the configuration of Kafka, PostgreSQL, and others.
* Run `install.bat –loadDemo` in the command line in the Thingsboard folder to install and add demo data.
  ![Casdoor Application Setting](/img/integration/java/Thingsboard/img_5.png)
* Run `net start thingsboard` in the command line to start Thingsboard. You should see the following output:
  ![Casdoor Application Setting](/img/integration/java/Thingsboard/img_4.png)

## Step 4: Integrate Casdoor

Now open `http://localhost:8080/` and log in to the admin account:

Account: `sysadmin@thingsboard.org` / Password: sysadmin

After successfully logging in, click the OAuth2 button at the bottom left of the page.

![Casdoor Application Setting](/img/integration/java/Thingsboard/img_3.png)

Fill in the blanks as follows:

![Casdoor Application Setting](/img/integration/java/Thingsboard/img_2.png)

Obtain these values from:
[OIDC discovery URL](https://casdoor.org/docs/how-to-connect/oidc-client#oidc-discovery/)
![Casdoor Application Setting](/img/integration/java/Thingsboard/img_1.png)

After filling in these blanks, you have successfully integrated Casdoor with Thingsboard. When you log in to `http://localhost:8080/`, you should see the following:

![Casdoor Application Setting](/img/integration/java/Thingsboard/integrate.gif)
