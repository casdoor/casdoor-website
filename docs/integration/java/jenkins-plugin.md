---
title: Jenkins Plugin
description: Using the Casdoor plugin for Jenkins security
keywords: [plugin, Jenkins]
authors: [Abingcbc]
---

Casdoor provides a plugin that allows users to log in to Jenkins. Here, we will show you how to use the Casdoor plugin for Jenkins security.

The following are some of the configuration settings:

`CASDOOR_HOSTNAME`: The domain name or IP where the Casdoor server is deployed.

`JENKINS_HOSTNAME`: The domain name or IP where Jenkins is deployed.

## Step 1: Deploy Casdoor and Jenkins

Firstly, deploy [Casdoor](/docs/basic/server-installation) and [Jenkins](https://www.jenkins.io/doc/book/installing/).

After a successful deployment, ensure the following:

1. Set the Jenkins URL (Manage Jenkins -> Configure System -> Jenkins Location) to `JENKINS_HOSTNAME`.
![Jenkins URL](/img/integration/java/jenkins_url.png)
2. Verify that Casdoor can be logged in and used normally.
3. Set the `origin` value of Casdoor (conf/app.conf) to `CASDOOR_HOSTNAME`.
![Casdoor conf](/img/integration/casdoor_origin.png)

## Step 2: Configure the Casdoor Application

1. Create a new Casdoor application or use an existing one.
2. Add a redirect URL: `http://JENKINS_HOSTNAME/securityRealm/finishLogin`
![Casdoor Application Setting](/img/integration/java/appseeting_jenkins.png)
3. Add the desired provider and provide any additional settings.

On the application settings page, you will find two values: `Client ID` and `Client secret`, as shown in the picture above. We will use these values in the next step.

Open your favorite browser and visit **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration** to view the OIDC configuration of Casdoor.

## Step 3: Configure Jenkins

Now, you can install the Casdoor plugin from the marketplace or by uploading its `jar` file.

After the installation is complete, go to Manage Jenkins -> Configure Global Security.

**Suggestion**: Back up the Jenkins `config.xml` file and use it for recovery in case of setup errors.

![Jenkins' Setting](/img/integration/java/jenkins-plugin/jenkins_plugin.png)

1. In the Security Realm section, select "Casdoor Authentication Plugin".
2. In the Casdoor Endpoint field, enter the `CASDOOR_HOSTNAME` mentioned earlier.
3. In the Client ID field, enter the `Client ID` mentioned earlier.
4. In the Client secret field, enter the `Client secret` mentioned earlier.
5. In the JWT Public Key field, provide the public key used to validate the JWT token. You can find the public key in Casdoor by clicking on `Cert` at the top. After clicking `edit` on your application, you can copy the public key from the following page.
![JWT Public Key](/img/integration/java/jenkins-plugin/jenkins_cert.png)
6. Organization Name and Application Name are optional. You can specify your organization and application to verify users in other organizations and applications. If these fields are left empty, the plugin will use the default organization and application.
7. In the Authorization section, check "Logged-in users can do anything". Disable "Allow anonymous read access".
8. Click `Save`.

Jenkins will now automatically redirect you to Casdoor for authentication.
