---
title: thingsboard
description:  Learn how to integrate Casdoor with thingsboard to secure your applications
keywords: [oauth2, thingsboard, integration]
authors: [RanTao123]
---

Before the integration, we need to deploy Casdoor locally.

Then we can quickly implement a Casdoor-based login page in our own app with the following steps.

## Step1. Configure Casdoor application

1. Create or use an existing Casdoor application.
2. Add a redirect url: `http://CASDOOR_HOSTNAME/login`
   ![Casdoor Application Setting](/img/integration/java/thingsboard/cas.png)
3. Copy the client ID and client secret, we will need it in the following steps.

## Step2. Add user in Casdoor

Now you have the application, but not a user. That means you need to create a user and assign the role.

Go to the “Users” page and click on “Add user” in the top right corner. That opens a new page where you can add the new user.

Save the user after adding a username and adding the organisation thingsboard(other details are optional).

Now you need to set up a password for your user, which you can do by clicking manage your password.

Choose a password for your user and confirm it.

## Step3. Prerequisites and Build thingsboard App

First of all, thingsboard only support Java 11 (OpenJDK)

You can download in the following link:

[JDK Download Page](https://adoptium.net/zh-CN/)

Start the thingsboard by follow.(Take Windows system as example)

* $Download and extract the package. [Download the package](https://github.com/thingsboard/thingsboard/releases/download/v3.5/thingsboard-windows-3.5.zip)
* $We can configure thingsboard in \thingsboard\conf\thingsboard.yml as you like, configure the Kafka、PostgreSQL and others.
* $Run “install.bat –loadDemo” in command line in thingsboard folder to install and add demo data
  ![Casdoor Application Setting](/img/integration/java/thingsboard/img_5.png)
* $Input "net start thingsboard" in command line, we will get
  ![Casdoor Application Setting](/img/integration/java/thingsboard/img_4.png)

## Step4. Integrate Casdoor

Now open http://localhost:8080/ and login in admin account:

account: sysadmin@thingsboard.org / password: sysadmin

After login in successfully, we click the oath2 button on the left bottom in the page.

![Casdoor Application Setting](/img/integration/java/thingsboard/img_3.png)

Fill in the blank like this:

![Casdoor Application Setting](/img/integration/java/thingsboard/img_2.png)

We can get these values in this link:
[OIDC discovery URL](https://casdoor.org/docs/how-to-connect/oidc-client#oidc-discovery/)
![Casdoor Application Setting](/img/integration/java/thingsboard/img_1.png)

After filling these blanks, we successfully integrate Casdoor with thingsboard, when we login http://localhost:8080/, we can get this:

![Casdoor Application Setting](/img/integration/java/thingsboard/img.png)

![Casdoor Application Setting](/img/integration/java/thingsboard/integrate.gif)
