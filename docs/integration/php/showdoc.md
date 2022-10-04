---
title: ShowDoc
description: Using Casdoor as oAuth2 server in ShowDoc
keywords: [ShowDoc]
---

## Using Casdoor for authentication in ShowDoc

[ShowDoc](https://www.showdoc.com.cn/) is an online API documentation, technical documentation tool perfect for IT 
teams. Showdoc makes it easy to use Markdown syntax to write beautiful API documents, data dictionary documents, technical documents, online Excel documents, and more.

Showdoc supports 3rd-party authentication including Oauth. Here is the tutorial for achieving this.

### step1. Create an Casdoor application

Go to your Casdoor and add your new application **Showdoc**. Here is an **example** of creating the Showdoc application in Casdoor.

![create_application.png](/img/integration/create_application.png)

Please remember the `client ID` and `client Secret` for next step.

:::info

Please don't fill in the **callback url** in this step. The url depends on the configurations on showdoc in next step. Later we will come back to set a correct callback url.

:::

### step2. Configure Showdoc

First, start the oAuth2 login button. Then fill in the `callback url` as shown in the example.
Fill in the `client ID` and `client secret` remembered in previous step.
![showdoc_oauth2.png](/img/integration/showdoc_oauth2.png)

`Authorize path`, `AccessToken path`, `User info path` are required. You can fill as shown below.

```ini
Authorize path:   /login/oauth/authorize
AccessToken path:   /api/login/oauth/access_token
User info path:   /api/get-account
```

### step3. Configure the callback url in casdoor

Go back to the application edit page in step 1, and add the `callback url` you filled in showdoc.
![showdoc_callbackurl.png](/img/integration/showdoc_callbackurl.png)

### step4. Have a try on showdoc

You are supposed to see this in login page:

![showdoc_login.png](/img/integration/showdoc_login.png)

Congratulations! You have completed all the steps. Press the **'casdoor sso'** button and you will be redirected to casdoor login page.

