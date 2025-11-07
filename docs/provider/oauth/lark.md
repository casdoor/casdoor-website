---
title: Lark
description: Add Lark OAuth provider to your application
keywords: [Lark, OAuth]
authors: [Chinoholo0807]
---

:::note

This is an example of how to configure a **Lark** OAuth provider.

:::

### Step 1: Create a Lark application

First, you need to create a new application on the [Lark Open Platform](https://open.feishu.cn/) and enable it.
You can find the `App ID` and `App Secret` in the basic information of your application.

![create a new app](/img/providers/OAuth/lark_create_app.png)

Next, add the redirect URL `<your-casdoor-domain>/callback` (e.g., `http://localhost:7001/callback`) in the security settings of your application.

![add redirect URL](/img/providers/OAuth/lark_redirect_url.png)

### Step 2: Create a Lark OAuth provider

Now create a Lark OAuth provider in Casdoor. Fill in the necessary information.

| Name | Name in Lark |
| ---- | ---- |
| Category | Choose `OAuth` |
| Type | Choose `Lark` |
| Client ID | `App ID` obtained from Step 1 |
| Client secret | `App Secret` obtained from Step 1 |

![create a Lark OAuth provider](/img/providers/OAuth/lark_provider_conf_detail.png)

Now you can use Lark as the third-party service to complete authentication.

## Username Handling

Casdoor uses a fallback mechanism to ensure user accounts are created successfully even when Lark's OAuth response has incomplete data. The username field follows this priority:

1. **UserId** - Primary identifier used when available
2. **UnionId** - Links users across multiple Lark organizations
3. **OpenId** - Always present, used as final fallback

This ensures authentication succeeds reliably since OpenId is guaranteed in Lark's OAuth response.
