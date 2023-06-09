---
title: CloudFoundry
description: Learn how to integrate Casdoor with CloudFoundry to secure your applications
keywords:
  - oauth
  - CloudFoundry
  - integration
authors:
  - RanTao123
---

Before the integration, we need to deploy Casdoor locally.

Then we can quickly implement a Casdoor-based login page in our own app with the following steps.

## Step1. Configure Casdoor application

1. Create or use an existing Casdoor application.
2. Add a redirect url: `http://CASDOOR_HOSTNAME/login` ![Casdoor Application Setting](/img/integration/java/CloudFoundry/cas.png)
3. Copy the client ID, we will need it in the following steps.

## Step2. Add user in Casdoor

Now you have the application, but not a user. That means you need to create a user and assign the role.

Go to the “Users” page and click on “Add user” in the top right corner. That opens a new page where you can add the new user.

Save the user after adding a username and adding the organisation CloudFoundry(other details are optional).

Now you need to set up a password for your user, which you can do by clicking manage your password.

Choose a password for your user and confirm it.

## Step3. Build CloudFoundry App

Start the CloudFoundry by follow.

* $git clone git://github.com/cloudfoundry/uaa.git
* $ cd uaa
* $./gradlew run ![Casdoor Application Setting](/img/integration/java/CloudFoundry/command.png)

## Step4. Integrate Casdoor

Now open another command line and input :
* $ curl 'http://localhost/oauth/authorize?response_type=token&client_id=app&scope=openid&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapp%2F' -i -X GET \
  -H 'Accept: application/x-www-form-urlencoded'

we have already got the client_id and redirect_uri before, we input these parameters. ![Casdoor Application Setting](/img/integration/java/CloudFoundry/parameter.png)

execute the command, we can get the result below, which means that we have integrated Casdoor with CloudFoundry successfully. ![Casdoor Application Setting](/img/integration/java/CloudFoundry/result.png)

![Casdoor Application Setting](/img/integration/java/CloudFoundry/login.gif)
