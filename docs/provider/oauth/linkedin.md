---
title: LinkedIn OAuth
description: Add LinkedIn as an OAuth provider.
keywords: [LinkedIn, OAuth]
authors: [ErikQQY]
---

1. Create an app at [LinkedIn Developers](https://www.linkedin.com/developers/apps/new).

![LinkedIn](/img/providers/OAuth/linkedin.png)

2. Verify the LinkedIn page linked to the app. Only a company page admin can verify and grant permissions.

![LinkedIn Verify](/img/providers/OAuth/linkedin-verify.png)

:::note
Verification must be done by the company page administrator.
:::

3. In the app, enable **Sign In with LinkedIn** and add **Authorized redirect URLs**: use **Casdoor’s callback URL**. In Casdoor, set the application **Redirect URL** to your application’s callback URL. See [Application config](/docs/application/config#further-understanding).

![LinkedIn sign in](/img/providers/OAuth/linkedinsignin.png)
![LinkedIn Redirect](/img/providers/OAuth/linkedinredirecturl.png)

4. Copy **Client ID** and **Client Secret** from the app.

![LinkedIn Client](/img/providers/OAuth/linkedinclient.png)

5. In Casdoor add an **OAuth** provider, set **Type** to **LinkedIn**, and enter **Client ID** and **Client secret**.

![LinkedIn Provider](/img/providers/OAuth/linkedinprovider.png)
