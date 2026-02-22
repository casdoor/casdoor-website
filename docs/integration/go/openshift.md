---
title: OpenShift
description: Using Casdoor for authentication in OpenShift
keywords: [OpenShift]
authors: [UsherFall]
---

OpenShift supports OIDC, so we can integrate Casdoor with OpenShift. The following steps demonstrate how to integrate Casdoor with OpenShift Local using the [online demo of Casdoor](https://demo.casdoor.com/).

## Step 1: Create a Casdoor application

In Casdoor add an application. Note **Client ID** and **Client secret**. Set **Redirect URL** to `https://oauth-openshift.apps.<cluster_name>.<cluster_domain>/*` (adjust for your cluster).

![Create an application in Casdoor](/img/integration/go/openshift/openshift_1.png)

## Step 2: OpenShift OAuth Configuration

Now log into the OpenShift Console as Kubeadmin. Once you are logged in, browse to the side menu and locate the Cluster settings.

![OpenShift side menu](/img/integration/go/openshift/openshift_2.png)

Under **Global Configuration**, open **OAuth**.

![OAuth configuration in Cluster settings](/img/integration/go/openshift/openshift_3.png)

In **Identity Provider** → **ADD**, select **OpenID Connect**.

![Select menu](/img/integration/go/openshift/openshift_4.png)

Enter **Client ID** and **Client secret** from step 1. Set **Issuer URL** to `https://<casdoor-host>` (HTTPS required).

![Configure OIDC](/img/integration/go/openshift/openshift_5.png)

## Step 3: Test OIDC Authentication

Open the OpenShift console in a browser. Select the Casdoor login option (the name configured above); you are redirected to the Casdoor login page.

![Final result](/img/integration/go/openshift/login.gif)
