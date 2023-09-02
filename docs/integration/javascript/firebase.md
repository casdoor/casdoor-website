---
title: Firebase
description: Firebase project using Casdoor as Identity Provider
keywords: [Firebase, web, OIDC, IdP]
authors: [leo220yuyaodog]
---

Firebase supports OIDC as an Identity Provider, you can use Casdoor as an OIDC provider for Firebase web app.

## 1. Create a Firebase project

Go to [Firebase Console](https://console.firebase.google.com/) to create a project.

### 1.1 Add Casdoor as provider

![provider](/img/integration/javascript/firebase/provider.png)

You need to enable "Identity Platform" feature first to enable OIDC integration on Firebase.

Select `OpenID Connect` in Custom providers, fill in the following information:

| Name (in order) | Description                           | Example value                            |
|-----------------|---------------------------------------|------------------------------------------|
| Name            | Any be any string you would like      | casdoor                                  |
| Client ID       | Client ID for the Casdoor application | 294b09fbc17f95daf2fe                     |
| Issuer (URL)    | Casdoor server URL                    | https://door.casdoor.com                 |
| Client Secret   | Client secret for Casdoor application | dd8982f7046ccba1bbd7851d5c1ece4e52bf039d |

![oidc_config0](/img/integration/javascript/firebase/oidc_config0.png)

The above examples values can be retrieved from Casdoor demo site: https://door.casdoor.com/applications/casbin/app-vue-python-example

![oidc_config1](/img/integration/javascript/firebase/oidc_config1.png)

### 1.2 Add callback url

Add Callback URL to Casdoor application Redirect URLs:

![oidc_config2](/img/integration/javascript/firebase/oidc_config2.png)

![oidc_config3](/img/integration/javascript/firebase/oidc_config3.png)

Then click "Save" button. 

Here we provide an example [casdoor-firebase-example](https://github.com/casdoor/casdoor-firebase-example) for you to use Casdoor authentication in your app.
To see more details for how to use Casdoor authentication in your app, please refer to [Firebase document](https://firebase.google.com/docs/auth).