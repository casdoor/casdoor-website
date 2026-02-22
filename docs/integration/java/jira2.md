---
title: Via built-in SSO
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

Deploy [Casdoor](/docs/basic/server-installation) and [Jira](https://www.atlassian.com/software/jira/guides/getting-started/overview).

After a successful deployment, ensure the following:

1. Casdoor can be logged in and used normally.
2. For local `prod` mode, set `CASDOOR_HOSTNAME` to `http://localhost:8000`. See [production mode](/docs/basic/server-installation#production-mode).

## Step 2: Configure Casdoor application

1. Create or use an existing Casdoor application.
2. Find Authentication methods: ![Jira Callback](/img/integration/java/jira2/System.png)
3. Add a Configuration and choose OpenID Connection single sign-on in the Authentication method ![Jira Method](/img/integration/java/jira2/method.png)
4. Find the redirect URL: ![redirect](/img/integration/java/jira2/redirect.png)
5. Add a redirect URL: ![Jira Application](/img/integration/java/jira2/jira_application.png)

Note **Client ID** and **Client secret** from the application page for the next step.

Open **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration** in a browser to view Casdoor's OIDC configuration.

## Step 3: Configure Jira

1. We need to continue configuring our Configuration in Jira ![Config](/img/integration/java/jira2/Config.png) ![Config2](/img/integration/java/jira2/Config2.png)

2. Configure more complex authorization later; first verify that OpenID sign-in works.
![Jira Login](/img/integration/java/jira2/login.gif)
