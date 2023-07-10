---
title: Jenkins Plugin
description: Using Casdoor plugin for your Jenkins security
keywords: [plugin, Jenkins]
authors: [Abingcbc]
---

Casdoor provides a plugin for users to login Jenkins. Here we will show you how to use Casdoor plugin for your Jenkins security.

The following are some of the names in the configuration:

`CASDOOR_HOSTNAME`: Domain name or IP where Casdoor server is deployed.

`JENKINS_HOSTNAME`: Domain name or IP where Jenkins is deployed.

## Step1. Deploy Casdoor and Jenkins

Firstly, the [Casdoor](/docs/basic/server-installation) and [Jenkins](https://www.jenkins.io/doc/book/installing/) should be deployed.

After a successful deployment, you need to ensure:

1. Set Jenkins URL(Manage Jenkins -> Configure System -> Jenkins Location) to `JENKINS_HOSTNAME`.
![Jenkins URL](/img/integration/java/jenkins_url.png)
2. Casdoor can be logged in and used normally.
3. Set Casdoor's `origin` value (conf/app.conf) to `CASDOOR_HOSTNAME`.
![Casdoor conf](/img/integration/casdoor_origin.png)

## Step2. Configure Casdoor application

1. Create or use an existing Casdoor application.
2. Add a redirect url: `http://JENKINS_HOSTNAME/securityRealm/finishLogin`
![Casdoor Application Setting](/img/integration/java/appseeting_jenkins.png)
3. Add provider you want and supplement other settings.

Not surprisingly, you can get two values ​​on the application settings page: `Client ID` and `Client secret` like the picture above, we will use them in next step.

Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**, you will see the OIDC configure of Casdoor.

## Step3. Configure Jenkins

Now, you can install Casdoor plugin from the market or by uploading its `jar` file.

After completing the installation, go to Manage Jenkins -> Configure Global Security.

**Suggestion**: Back up the Jenkins `config.xml` file, and use it to recover in case of setup errors.

![Jenkins' Setting](/img/integration/java/jenkins-plugin/jenkins_plugin.png)

1. In Security Realm, select "Casdoor Authentication Plugin".
2. In Casdoor Endpoint, specify the `CASDOOR_HOSTNAME` noted above.
3. In Client ID, specify the `Client ID` noted above.
4. In Client secret, specify the `Client secret` noted above.
5. In JWT Public Key, specify the public key used to validate JWT token. You can find the public key in Casdoor by clicking `Cert` at the top. After clicking `edit` your application, you can copy your public key in the following page.
![JWT Public Key](/img/integration/java/jenkins-plugin/jenkins_cert.png)
6. Organization Name and Application Name is optional. You can specify your organization and application to verify users in other organizations and applications. If they are empty, the plugin will use the default organization and application.
7. In the Authorization section, check “Logged-in users can do anything”. Disable “Allow anonymous read access”.
8. Click `save`.

Now, Jenkins will automatically redirect you to Casdoor for authentication.
