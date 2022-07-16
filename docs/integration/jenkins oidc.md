---
sidebar_position: 1
title: Jenkins OIDC
description:  Using OIDC protocol as IDP to connect various applications, like Jenkins
keywords: [OIDC, Jenkins, IDP]
---

Casdoor can use OIDC protocol as IDP to connect various applications. Here we will use Jenkins as an example to show you how to use OIDC to connect to your applications.

The following are some of the names in the configuration:

`CASDOOR_HOSTNAME`: Domain name or IP where Casdoor server is deployed.

`JENKINS_HOSTNAME`: Domain name or IP where Jenkins is deployed.


## Step1. Deploy Casdoor and Jenkins 
Firstly, the [Casdoor](/docs/basic/server-installation) and [Jenkins](https://www.jenkins.io/doc/book/installing/) should be deployed. 

After a successful deployment, you need to ensure:
1. Set Jenkins URL(Manage Jenkins -> Configure System -> Jenkins Location) to `JENKINS_HOSTNAME`.
![Jenkins URL](/img/jenkins_url.png)
2. Casdoor can be logged in and used normally.
3. Set Casdoor's `origin` value (conf/app.conf) to `CASDOOR_HOSTNAME`.
![Casdoor conf](/img/casdoor_origin.png)
## Step2. Configure Casdoor application
1. Create or use an existing Casdoor application.
2. Add a redirect url: `http://JENKINS_HOSTNAME/securityRealm/finishLogin` 
![Casdoor Application Setting](/img/appseeting_jenkins.png)
3. Add provider you want and supplement other settings.

Not surprisingly, you can get two values ​​on the application settings page: `Client ID` and `Client secret` like the picture above, we will use them in next step.

Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**, you will see the OIDC configure of Casdoor.

## Step3. Configure Jenkins
Jenkins does not natively support OIDC, so we need to install [OpenId Connect Authentication](https://plugins.jenkins.io/oic-auth/).

After completing the installation, go to Manage Jenkins -> Configure Global Security.

**Suggestion**: Back up the Jenkins `config.xml` file, and use it to recover in case of setup errors.

1. In Access Control, Security Realm select "Login with Openid Connect".
2. In Client ID, specify the `Client ID` noted above.
3. In Client secret, specify the `Client secret` noted above.
4. In Configuration mode, select `Automatic configuration` and fill in **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration** into Well-known configuration endpoint.![Jenkins' Setting](/img/jenkins_auto.png)If your casdoor is deployed locally, you may need select `Manual configuration` and input some infomation:
    - `Token server url`: **http://`CASDOOR_HOSTNAME`/api/login/oauth/access_token**
    - `Authorization server url`: **http://`CASDOOR_HOSTNAME`/login/oauth/authorize**
    - `UserInfo server url`: **http://`CASDOOR_HOSTNAME`/api/get-account**
    - `Scopes`: `address phone openid profile offline_access email`
    ![Manual configuration](/img/jenkins_manual.png)
5. Click Advanced setting, fill in the following:
    - In User name field, specify `data.name`
    - In Full name feild, specify `data.displayName`
    - In Email field, specify `data.email`
    ![Userinfo Field Setting](/img/jenkins_field.png)
6. In the Authorization section, check “Logged-in users can do anything”. Disable “Allow anonymous read access”. You can configure more complex authorization later, for now check if OpenID actually works.

Log out of Jenkins, it should now redirect you to Casdoor for authentication.
![Jenkins Login Page](/img/jenkins_login.png)
