---
title: OpenShift
description: Using Casdoor for authentication in openshift
keywords: [openshift]
authors: [UsherFall]
---

OpenShift supports OIDC, so we can integrate Casdoor with OpenShift. 
The following steps demonstrate how to integrate Casdoor with OpenShift Local using [the online demo of Casdoor](https://demo.casdoor.com/).

## Step1. Create an Casdoor application
Add a new application in Casdoor, note following points.
- Remember the `Client ID` and `Client secret` for the next step.
- The format of the Redirect URL is `https://oauth-openshift.apps.<cluster_name>.<cluster_domain/*`, Fill it in depending your situation

![](/img/integration/go/openshift/openshift_1.png)

## Step2. Openshift Oauth Configuration
Now, login into the Openshift Console as Kubeadmin. Once you are logged In. Browse to the side menu, locate the Cluster settings

![](/img/integration/go/openshift/openshift_2.png)

Under Global Configuration You will see Oauth

![](/img/integration/go/openshift/openshift_3.png)

You will see the Identity Provider section. In ADD section, select the OpenID Connect from options.

![](/img/integration/go/openshift/openshift_4.png)

Configure OIDC, note following points.
- Fill in the `Client ID` and `Client Secret` remembered in the previous step.
- The Issuer URL must use https, with the form `https://<casdoor-host>`, again depending on your situation

![](/img/integration/go/openshift/openshift_5.png)

## Step3. Test OIDC Authentication
Access the Openshift console in the browser. You will see casdoor (The Name you configured in the previous step). Click on the casdoor login option. You will get redirected to the Casdoor login page. 

![](/img/integration/go/openshift/login.gif)