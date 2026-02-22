---
title: Firebase
description: Firebase project using Casdoor as Identity Provider
keywords: [Firebase, web, OIDC, IdP]
authors: [leo220yuyaodog]
---

Firebase supports OIDC; use Casdoor as the OIDC provider for a Firebase web app.

## 1. Create a Firebase project

Go to [Firebase Console](https://console.firebase.google.com/) to create a project.

### 1.1 Add Casdoor as provider

![provider](/img/integration/javascript/firebase/provider.png)

Enable the **Identity Platform** feature in Firebase first to use OIDC.

Select `OpenID Connect` in Custom providers, fill in the following information:

| Name (in order) | Description                           | Example value                                        |
|-----------------|---------------------------------------|------------------------------------------------------|
| Name            | Any string (e.g. provider name)       | casdoor                                              |
| Client ID       | Client ID for the Casdoor application | 294b09fbc17f95daf2fe                                 |
| Issuer (URL)    | Casdoor server URL                    | [https://door.casdoor.com](https://door.casdoor.com) |
| Client Secret   | Client secret for Casdoor application | dd8982f7046ccba1bbd7851d5c1ece4e52bf039d             |

![oidc_config0](/img/integration/javascript/firebase/oidc_config0.png)

The above examples values can be retrieved from Casdoor demo site: [app-vue-python-example](https://door.casdoor.com/applications/casbin/app-vue-python-example)

![oidc_config1](/img/integration/javascript/firebase/oidc_config1.png)

### 1.2 Add callback url

Add Callback URL to Casdoor application Redirect URLs:

![oidc_config2](/img/integration/javascript/firebase/oidc_config2.png)

![oidc_config3](/img/integration/javascript/firebase/oidc_config3.png)

Example: [casdoor-firebase-example](https://github.com/casdoor/casdoor-firebase-example). For using Casdoor auth in your app, see [Firebase Auth](https://firebase.google.com/docs/auth).
