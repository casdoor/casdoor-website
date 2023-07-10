---
title: Apache DolphinScheduler
description: Using Casdoor for DolphinScheduler SSO login
keywords: [DolphinScheduler]
authors: [Abingcbc]
---

Casdoor is one of the supported login method for [Apache DolphinScheduler](https://github.com/apache/dolphinscheduler).

## Step1. Deploy Casdoor

Firstly, the Casdoor should be deployed.

You can refer to the Casdoor official documentation for the [Server Installation](https://casdoor.org/docs/basic/server-installation).

After a successful deployment, you need to ensure:

* The Casdoor server is successfully running on <http://localhost:8000>.
* Open your favorite browser and visit <http://localhost:7001>, you will see the login page of Casdoor.
* Input admin and 123 to test login functionality is working fine.

Then you can quickly implement a Casdoor based login page in your own app with the following steps.

## Step2. Configure Casdoor Application

1. Create or use an existing Casdoor application.
2. Add Your redirect url (You can see more details about how to get redirect url in the next section)
   ![Casdoor Application Setting](/img/integration/java/spring_security/casdoor_setting.png)
3. Add provider you want and supplement other settings.

Not surprisingly, you can get two values on the application settings page: `Client ID` and `Client secret` like the picture above. We will use them in next step.

Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**, you will see the OIDC configure of Casdoor.

## Step3. Configure Dolphinscheduler

> dolphinscheduler-api/src/main/resources/application.yaml

```yaml
security:
  authentication:
    # Authentication types (supported types: PASSWORD,LDAP,CASDOOR_SSO)
    type: CASDOOR_SSO
casdoor:
  # Your Casdoor server url
  endpoint:
  client-id:
  client-secret:
  # The certificate may be multi-line, you can use `|-` for ease
  certificate: 
  # Your organization name added in Casdoor
  organization-name:
  # Your application name added in Casdoor
  application-name:
  # Doplhinscheduler login url
  redirect-url: http://localhost:5173/login 
```

Now, Dolphinschduler will automatically redirect you to Casdoor for authentication.
![Demo](/img/integration/java/dolphinscheduler/dolphinscheduler.gif)
