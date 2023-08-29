---
title: Via Built-in SSO
description: Using the OIDC protocol as an IDP to connect various applications, such as Jira
keywords: [OIDC, Jira, IDP]
authors: [jakiuncle]
---
This is a free method to connect Casdoor, but your website must use HTTPS.

[Casdoor](/docs/basic/server-installation) can use the OIDC protocol as an IDP to connect various applications. Here is a [Jira](https://www.atlassian.com/software/jira/guides/getting-started/overview) tutorial.

The following are some of the names in the configuration:

- `CASDOOR_HOSTNAME`: Domain name or IP where the Casdoor server is deployed.
- `Jira_HOSTNAME`: Domain name or IP where Jira is deployed.

## Step 1: Deploy Casdoor and Jira

Firstly, deploy [Casdoor](/docs/basic/server-installation) and [Jira](https://www.atlassian.com/software/jira/guides/getting-started/overview).

After a successful deployment, ensure the following:

1. Casdoor can be logged in and used normally.
2. You can set `CASDOOR_HOSTNAME` to `http://localhost:8000` when deploying Casdoor in `prod` mode. See [production mode](https://casdoor.org/docs/basic/server-installation#production-mode).

## Step 2: Configure Casdoor application

1. Create or use an existing Casdoor application.
2. Find Authentication methods: ![Jira Callback](/img/integration/java/jira2/System.png)
3. Add a Configuration and choose OpenID Connection single sign-on in the Authentication method ![Jira Method](/img/integration/java/jira2/method.png)
4. Find the redirect URL: ![redirect](/img/integration/java/jira2/redirect.png)
5. Add a redirect URL: ![Jira Application](/img/integration/java/jira2/jira_application.png)

Not surprisingly, you can obtain two values on the application settings page: `Client ID` and `Client secret`, like the picture above. We will use them in the next step.

Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**. You will see the OIDC configuration of Casdoor.

## Step 3: Configure Jira

1. We need to continue configuring our Configuration in Jira ![Config](/img/integration/java/jira2/Config.png) ![Config2](/img/integration/java/jira2/Config2.png)

2. You can configure more complex authorization later. For now, check if OpenID actually works.
![Jira Login](/img/integration/java/jira2/login.gif)
