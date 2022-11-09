---
title: Baidu
description: Add Baidu OAuth provider to your application
keywords: [Baidu, Baidu OAuth]
author: Steve0x2a
---

To set up Baidu OAuth provider, please read the [Baidu documentation](https://openauth.baidu.com/doc/regdevelopers.html?qq-pf-to=pcqq.c2c) and follow their steps to complete the [application creation](http://developer.baidu.com/console#app/create).

![Create Baidu APP](/img/providers/OAuth/baiduapp.png)

After creating your app, the redirect url is set in the following position:

![Baidu URL Setting](/img/providers/OAuth/baidusetting.png)

Add your Casdoor domain in the following position:

![Redirect URL Setting](/img/providers/OAuth/baidudomain.png)

:::caution

This part is very different from the actual situation in the documentation given by Baidu:

1. Adding the url to the callback url setting will most likely fail to validate the url and cause the login to fail, so we add our domain name to the domain setting.
2. Only one url or domain name can be added, which is very different from the documentation.

:::

Then you can get ```Client ID``` and ```Client Secrets``` now!

![Baidu Client](/img/providers/OAuth/baiduclient.png)

Add a Baidu OAuth provider and fill the ```Client ID``` and ```Client Secrets``` in your Casdoor.

![Baidu Provider](/img/providers/OAuth/baiduprovider.png)

Now you can use Baidu as third party service to complete authentication!

:::info General troubleshooting

If you encounter a Baidu prompt that your redirect url is incorrect, here are some ways you might be able to fix it:

1. Add your domain name to the appropriate location, and then reset the Secret (Baidu reset Secret has a bug, it will prompt you an error, but after refreshing the page the Secret has been refreshed)
2. If the above methods do not solve the problem, we suggest you delete the application and create a new one, and set your domain name first.

Another problem is that the user name returned by Baidu is masked, unlike its documentation which shows the user name and the displayed name, so we can currently only use the masked name as the user name.

:::
