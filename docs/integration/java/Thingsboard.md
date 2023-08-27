---
title: Thingsboard
description: Learn how to integrate Casdoor with Thingsboard to secure your applications
keywords: [oauth2, Thingsboard, integration]
authors: [RanTao123]
---

Before the integration, we need to deploy Casdoor locally.

Then, we can quickly implement a Casdoor-based login page in our own app by following these steps.

## Step 1: Configure Casdoor application

1. Create a new Casdoor application or use an existing one.
2. Add a redirect URL: `http://CASDOOR_HOSTNAME/login`
   ![Casdoor Application Setting](/img/integration/java/Thingsboard/img_6.png)
3. Copy the client ID and client secret. We will need them in the following steps.

## Step 2: Add a user in Casdoor

Now that you have the application, you need to create a user and assign a role.

Go to the "Users" page and click on "Add user" in the top right corner. This will open a new page where you can add the new user.

Save the user after adding a username and selecting the organization "Thingsboard" (other details are optional).

Next, you need to set up a password for the user. You can do this by clicking on "Manage your password".

Choose a password for the user and confirm it.

## Step 3: Prerequisites and Build Thingsboard App

First of all, Thingsboard only supports Java 11 (OpenJDK).

You can download it from the following link:

[JDK Download Page](https://adoptium.net/zh-CN/)

To start Thingsboard, follow these steps (for Windows system):

* Download and extract the package. [Download the package](https://github.com/thingsboard/thingsboard/releases/download/v3.5/thingsboard-windows-3.5.zip)
* Configure Thingsboard in \thingsboard\conf\thingsboard.yml according to your preferences, including the configuration of Kafka, PostgreSQL, and others.
* Run `install.bat –loadDemo` in the command line in the Thingsboard folder to install and add demo data.
  ![Casdoor Application Setting](/img/integration/java/Thingsboard/img_5.png)
* Run `net start thingsboard` in the command line to start Thingsboard. You should see the following output:
  ![Casdoor Application Setting](/img/integration/java/Thingsboard/img_4.png)

## Step 4: Integrate Casdoor

Now open <http://localhost:8080/> and log in to the admin account:

Account: <sysadmin@thingsboard.org> / Password: sysadmin

After successfully logging in, click the OAuth2 button at the bottom left of the page.

![Casdoor Application Setting](/img/integration/java/Thingsboard/img_3.png)

Fill in the blanks as follows:

![Casdoor Application Setting](/img/integration/java/Thingsboard/img_2.png)

You can get these values from the following link:
[OIDC discovery URL](https://casdoor.org/docs/how-to-connect/oidc-client#oidc-discovery/)
![Casdoor Application Setting](/img/integration/java/Thingsboard/img_1.png)

After filling in these blanks, you have successfully integrated Casdoor with Thingsboard. When you log in to <http://localhost:8080/>, you should see the following:

![Casdoor Application Setting](/img/integration/java/Thingsboard/integrate.gif)
