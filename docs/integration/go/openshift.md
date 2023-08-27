---
title: OpenShift
description: Using Casdoor for authentication in OpenShift
keywords: [OpenShift]
authors: [UsherFall]
---

OpenShift supports OIDC, so we can integrate Casdoor with OpenShift. The following steps demonstrate how to integrate Casdoor with OpenShift Local using the [online demo of Casdoor](https://demo.casdoor.com/).

## Step 1: Create an Casdoor application

Add a new application in Casdoor, noting the following points:

- Remember the `Client ID` and `Client secret` for the next step.
- The format of the Redirect URL is `https://oauth-openshift.apps.<cluster_name>.<cluster_domain>/*`. Fill it in depending on your situation.

![Create an application in Casdoor](/img/integration/go/openshift/openshift_1.png)

## Step 2: OpenShift OAuth Configuration

Now log into the OpenShift Console as Kubeadmin. Once you are logged in, browse to the side menu and locate the Cluster settings.

![OpenShift side menu](/img/integration/go/openshift/openshift_2.png)

Under Global Configuration, you will see OAuth.

![OAuth configuration in Cluster settings](/img/integration/go/openshift/openshift_3.png)

You will see the Identity Provider section. In the ADD section, select OpenID Connect from the options.

![Select menu](/img/integration/go/openshift/openshift_4.png)

Configure OIDC, noting the following points:

- Fill in the `Client ID` and `Client Secret` remembered from the previous step.
- The Issuer URL must use https, in the form `https://<casdoor-host>`, again depending on your situation.

![Configure OIDC](/img/integration/go/openshift/openshift_5.png)

## Step 3: Test OIDC Authentication

Access the OpenShift console in the browser. You will see Casdoor (the name you configured in the previous step). Click on the Casdoor login option. You will be redirected to the Casdoor login page.

![Final result](/img/integration/go/openshift/login.gif)
