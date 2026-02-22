---
title: Jenkins (OIDC)
description: Use Casdoor as the OIDC IdP for Jenkins sign-in.
keywords: [OIDC, Jenkins, IDP]
authors: [Abingcbc]
---

Use Casdoor as the OIDC identity provider for Jenkins so users sign in with their Casdoor accounts.

**Terms:** `CASDOOR_HOSTNAME` — Casdoor server URL; `JENKINS_HOSTNAME` — Jenkins server URL.

## Step 1: Deploy Casdoor and Jenkins

[Deploy Casdoor](/docs/basic/server-installation) and [Jenkins](https://www.jenkins.io/doc/book/installing/). Then:

1. Set the Jenkins URL (Manage Jenkins -> Configure System -> Jenkins Location) to `JENKINS_HOSTNAME`.
![Jenkins URL](/img/integration/java/jenkins_url.png)

2. Ensure that Casdoor can be logged in and used normally.

3. Set Casdoor's `origin` value (conf/app.conf) to `CASDOOR_HOSTNAME`.
![Casdoor conf](/img/integration/casdoor_origin.png)

## Step 2: Configure the Casdoor application

1. Create or edit a Casdoor application.
2. Add redirect URL: `http://JENKINS_HOSTNAME/securityRealm/finishLogin`.
3. Add providers as needed. Note the **Client ID** and **Client secret** from the application page.

OIDC discovery URL: `http://CASDOOR_HOSTNAME/.well-known/openid-configuration`

![Casdoor Application Setting](/img/integration/java/appseeting_jenkins.png)

## Step 3: Configure Jenkins

Install the [OpenId Connect Authentication](https://plugins.jenkins.io/oic-auth/) plugin (Jenkins does not support OIDC by default).

After the installation is complete, go to **Manage Jenkins** -> **Configure Global Security**.
![jenkins global security](/img/integration/java/jenkins-oidc/jenkins_global_security.png)

:::tip

Make sure to back up the Jenkins `config.xml` file to recover in case of any setup errors.

:::

1. In Access Control, select `Login with Openid Connect` as the **Security Realm**.

2. Specify the `Client ID` noted above in the **Client ID** field.

3. Specify the `Client secret` noted above in the **Client secret** field.

4. In the Configuration mode, select `Automatic configuration` and enter **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration** as the Well-known configuration endpoint. ![Jenkins' Setting](/img/integration/java/jenkins-oidc/jenkins_auto.png)

    If your Casdoor is deployed locally, you may need to select `Manual configuration` and provide the following information:

    - Token server URL: **http://`CASDOOR_HOSTNAME`/api/login/oauth/access_token**
    - Authorization server URL: **http://`CASDOOR_HOSTNAME`/login/oauth/authorize**
    - UserInfo server URL: **http://`CASDOOR_HOSTNAME`/api/get-account**
    - Scopes: `address phone openid profile offline_access email`
    ![Manual configuration](/img/integration/java/jenkins-oidc/jenkins_manual.png)

5. Click on **Advanced settings** and fill in the following:

    - In the User name field, specify `name`.
    - In the Full name field, specify `displayName`.
    - In the Email field, specify `email`.

    ![Userinfo Field Setting](/img/integration/java/jenkins-oidc/jenkins_field.png)

6. In the **Authorization** section, enable “Logged-in users can do anything” and disable “Allow anonymous read access”. You can configure more complex authorization later, but for now, check if OpenID works correctly.

    Log out of Jenkins, and it should redirect you to Casdoor for authentication.
    ![Jenkins Login Page](/img/integration/java/jenkins-oidc/jenkins_login.png)
