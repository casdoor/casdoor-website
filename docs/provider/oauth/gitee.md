---
title: Gitee
description: Add Gitee OAuth provider to your application
keywords: [Gitee, OAuth]
authors: [ErikQQY]
---

To set up the Gitee OAuth provider, please go to the [Gitee developer](https://gitee.com/oauth/applications) website. If you haven't created applications before, the Gitee workbench will look like this:

![Gitee Workbench](/img/providers/OAuth/giteebench.png)

You can then create your Gitee app.

![Gitee](/img/providers/OAuth/gitee.png)

Enter the **name**, **description**, **homepage**, and **callback URL**, and carefully choose the **permissions**.

:::info Set the authorization callback URL correctly

In the Gitee OAuth config, the `authorization callback URL` must be **your Casdoor's callback URL**, and the `Redirect URL` in Casdoor should be **your application's callback URL**.

For more details, please read the [App config](/docs/application/config#further-understanding) guide.

:::

After creating the Gitee app, you can obtain the ```Client ID``` and ```Client Secrets```!

![Gitee Client](/img/providers/OAuth/giteeclient.png)

Add a Gitee OAuth provider and enter the ```Client ID``` and ```Client Secrets``` in your Casdoor.

![Gitee Provider](/img/providers/OAuth/giteeprovider.png)

Now you can use Gitee as a third-party service to complete authentication!

:::caution

Since Casdoor needs to obtain the user's email, the email option must be checked; otherwise, it will cause scope authorization errors.

![Gitee scope](/img/giteescope.jpg)

:::
