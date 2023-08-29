---
title: LinkedIn
description: Add LinkedIn OAuth provider to your application
keywords: [LinkedIn, OAuth]
authors: [ErikQQY]
---

To set up the LinkedIn OAuth provider, please go to the [LinkedIn Developer](https://www.linkedin.com/developers/apps/new) page to create a new app.

![LinkedIn](/img/providers/OAuth/linkedin.png)

After filling in the form above and creating your app, you'll need to verify the LinkedIn page associated with the app.

![LinkedIn Verify](/img/providers/OAuth/linkedin-verify.png)

:::note

Only the company page administrator can verify your app and grant permission to it.

:::

Once your app is verified, you can continue:

![LinkedIn sign in](/img/providers/OAuth/linkedinsignin.png)

Add authorized redirect URLs for your app as **your Casdoor callback URL**.

![LinkedIn Redirect](/img/providers/OAuth/linkedinredirecturl.png)

:::info Set authorized redirect URLs correctly

In the LinkedIn OAuth configuration, the `authorized redirect URLs` must be **your Casdoor's callback URL**, and the `Redirect URL` in Casdoor should be **your application's callback URL**.

For more details, please read the [App Config](/docs/application/config#further-understanding) section.

:::

You can then obtain your `Client ID` and `Client Secret`.

![LinkedIn Client](/img/providers/OAuth/linkedinclient.png)

Add a LinkedIn OAuth provider and fill in the `Client ID` and `Client Secret` in your Casdoor.

![LinkedIn Provider](/img/providers/OAuth/linkedinprovider.png)

Now you can use LinkedIn as a third-party service to complete authentication!
