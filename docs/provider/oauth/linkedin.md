---
title: Linkedin
description: Add Linkedin OAuth provider to your application
keywords: [Linkedin, OAuth]
authors: [ErikQQY]
---

To set up Linkedin OAuth provider, please go to [Linkedin developer](https://www.linkedin.com/developers/apps/new) to create a new app.

![Linkedin](/img/providers/OAuth/linkedin.png)

After filling in the form above and creating your app, you'll need to verify the Linkedin page associated with the app

![Linkedin Verify](/img/providers/OAuth/linkedin-verify.png)

:::note

Only the company page administrator can verify your app, and give permission to your app

:::

After your app is verified, you can continue:

![Linkedin signin](/img/providers/OAuth/linkedinsignin.png)

Add Authorized redirect URLs for your app as **your Casdoor callback URL**.

![Linkedin Redirect](/img/providers/OAuth/linkedinredirecturl.png)

:::info Set authorized redirect URLs correctly

In Linkedin OAuth config, the `authorized redirect URLs` must be **your Casdoor's callback url**, and the `Redirect URL` in Casdoor should be **your application callback url**

For more details, please read [App config](/docs/application/config#further-understanding)

:::

Then you can obtain your ```Client ID``` and ```Client Secret```

![Linkedin Client](/img/providers/OAuth/linkedinclient.png)

Add a Linkedin OAuth provider and fill the ```Client ID``` and ```Client Secret``` in your Casdoor.

![Linkedin Provider](/img/providers/OAuth/linkedinprovider.png)

Now you can use Linkedin as third party service to complete authentication!
