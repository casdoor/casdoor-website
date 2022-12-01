---
title: Gitee
description: Add Gitee OAuth provider to your application
keywords: [Gitee, OAuth]
authors: [ErikQQY]
---

To set up Gitee OAuth provider, please go to [Gitee developer](https://gitee.com/oauth/applications), if you have not created applications before, the gitee workbench would like this:

![Gitee Workbench](/img/providers/OAuth/giteebench.png)

Then you can create your gitee app.

![Gitee](/img/providers/OAuth/gitee.png)

Fill in the **name**, **description**, **homepage** and **callback URL** and carefully choose the **permissions**.

:::info Set authorization callback URL correctly

In Gitee OAuth config, the `authorization callback URL` must be **your Casdoor's callback url**, and the `Redirect URL` in Casdoor should be **your application callback url**

For more details, please read [App config](/docs/application/config#further-understanding)

:::

Then you can create you gitee app and get ```Client ID``` and ```Client Secrets``` now!

![Gitee Client](/img/providers/OAuth/giteeclient.png)

Add a Gitee OAuth provider and fill the ```Client ID``` and ```Client Secrets``` in your Casdoor.

![Gitee Provider](/img/providers/OAuth/giteeprovider.png)

Now you can use Gitee as third party service to complete authentication!

:::caution

Since Casdoor needs to obtain the user's email, the email option must be checked, otherwise it will cause scope authorization errors.

![gitee scope](/img/giteescope.jpg)

:::
