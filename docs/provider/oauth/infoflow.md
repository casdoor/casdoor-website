---
title: Infoflow
description: Add Infoflow OAuth provider to your application
keywords: [Infoflow, OAuth]
author: Steve0x2a
---

To set up Infoflow OAuth provider, please go to [Infoflow](http://id.qy.baidu.com/static/ge/login.html#/) and log in using your Infoflow account.

First, please visit [Infoflow Application](http://qy.baidu.com/index.html#applist).

![Create APP](/img/providers/OAuth/infoflowapp1.png)

And register your Infoflow app.
![Create APP](/img/providers/OAuth/infoflowapp2.png)

Then you can get ```AgentID``` now.
![AgentID](/img/providers/OAuth/infoflowagentid.png)

Then navigate to **Setting** tab, and create a new management group.
![Setting](/img/providers/OAuth/infoflowsetting.png)

Add your structure to the address book permissions, and give it the permissions shown below. Also add the application you just created to the following location.
![Permission](/img/providers/OAuth/infoflowpermission1.png)

Add the sensitive interface permissions as shown below:
![Permission](/img/providers/OAuth/infoflowpermission2.png)

You will be able to see ```CorpID``` and ```Secret``` on the same page:
![Permission](/img/providers/OAuth/infoflowsecret.png)

Add an Infoflow OAuth provider and fill the ```Client ID``` , ```Client Secret``` and ```Agent ID``` in your Casdoor.
![Infoflow Provider](/img/providers/OAuth/infoflowprovider.png)

Now you can use Infoflow as third party service to complete authentication!