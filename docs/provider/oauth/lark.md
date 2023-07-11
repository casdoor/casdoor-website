---
title: Lark
description: Add Lark OAuth provider to your application
keywords: [Lark, OAuth]
authors: [Chinoholo0807]
---

:::note

This is an example of how to configure a **Lark** OAuth provider.

:::

### Step1. Create a Lark application

First, you need to create a new application in [Lark Open Platform](https://open.feishu.cn/) and enable it.
You can find the `App ID` and `App Secret` in the basic information of your application.

![create a new app](/img/providers/OAuth/lark_create_app.png)

Next, add the redirect URL `<your-casdoor-domain>/callback` (e.g., `http://localhost:7001/callback`) in the security settings of your application.

![add redirect url](/img/providers/OAuth/lark_redirect_url.png)

### Step2. Create a Lark OAuth provider

Now create a Lark OAuth provider in Casdoor. Fill the necessary information.

|    Name       |   Name in Lark |
|      ----     |   ----          |  
|Category       |   choose `OAuth`                     |
|Type           |   choose `Lark`                      |
|Client ID      |   `App ID` obtained from Step1       |
|Client secret  |   `App Secret` obtained from Step1   |

![create a lark oauth provider](/img/providers/OAuth/lark_provider_conf_detail.png)

Now you can use Lark as the third party service to complete authentication.