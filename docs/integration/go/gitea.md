---
title: Gitea
description: Using Casdoor for authentication in Gitea
keywords: [Gitea]
---

## Using Casdoor for authentication in Gitea
[Gitea](https://gitea.io/en-us/) is a community managed lightweight code hosting solution written in Go. It is published under the MIT license.


Gitea supports 3rd-party authentication including Oauth, which makes it possible to use Casdoor to authenticate it. Here is the tutorial for achieving this.

### Preparations

To configure Gitea to use Casdoor as identification provider, you need to have Gitea installed as well as access to administrator account.

For more information about how to download, install and run Gitea see <https://docs.gitea.io/en-us/install-from-binary/>

You are supposed to create an administrator account during installation. If you didn't, the administrator will be the first registered user. Please use this account proceed the following procedures.

### 1. Create an Casdoor application 
Like this
![](/img/gitea6.png)

Please remember the client ID and client Secret for the next step.

**Please don't fill in the callback url in this step. The url depends on the configurations on gitea in the next step. Later we will come back to set a correct callback url.**

### 2. Configure Gitea to use Casdoor

Log in as administrator. Go to 'Site Administration' page via drop-down menu  in the upper right corner. Then Switch to "Authentication Source" Page.

You are supposed to see something like this. 

![](/img/gitea2.png)

Press the "Add Authentication Source" Button, and fill in the form like this.


![](/img/gitea3.png)

Please choose the authentication type as "oauth2".

Please input a name for this authentication source and **remember this name**. This name will be used for the callback_url in the next step.

Please choose the `OpenID Connect` Oauth2 Provider.

Fill in the client ID and client secret remembered in the previous step.

Fill in the open id connect auto discovery url, which is supposed to be `<your endpoint of casdoor>/.well-known/openid-configuration`.

Fill in the other optional configuration items as you wish. And then submit it.

Submit the form.


### 3. Configure the callback url in casdoor

Go back to the application edit page in step 2, and add the following callback url:

`<endpoint of gitea>/user/oauth2/<authentication source name>/callback`

The `<authentication source name>`is the name for authentication source in Gitea in the previous step.

### 4. Have a try on Gitea
Logout the current administrator account.

You are supposed to see this in login page:

![](/img/gitea4.png)

Press the 'sign in with openid' button and you will be redirected to casdoor login page.

After login you will see this:
![](/img/gitea5.png)

Follow the instructions and bind the casdoor account with a new gitea account or existing account.

Then everything will be working correctly. 

