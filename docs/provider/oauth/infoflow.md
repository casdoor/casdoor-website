---
title: Infoflow
description: Add Infoflow OAuth provider to your application
keywords: [Infoflow, OAuth]
authors: [Steve0x2a]
---

To set up the Infoflow OAuth provider, please follow these steps:

1. Go to [Infoflow](http://id.qy.baidu.com/static/ge/login.html#/){:target="_blank"} and log in using your Infoflow account.

2. Visit the [Infoflow Application](http://qy.baidu.com/index.html#applist){:target="_blank"} page.

    ![Create APP](/img/providers/OAuth/infoflowapp1.png)

3. Register your Infoflow app.

    ![Create APP](/img/providers/OAuth/infoflowapp2.png)

4. Obtain the ```AgentID```.

    ![AgentID](/img/providers/OAuth/infoflowagentid.png)

5. Navigate to the **Setting** tab and create a new management group.

    ![Setting](/img/providers/OAuth/infoflowsetting.png)

6. Add your structure to the address book permissions and give it the necessary permissions. Also, add the application you just created to the specified location.

    ![Permission](/img/providers/OAuth/infoflowpermission1.png)

7. Add the sensitive interface permissions as shown.

    ![Permission](/img/providers/OAuth/infoflowpermission2.png)

8. On the same page, you will find the ```CorpID``` and ```Secret```.

    ![Permission](/img/providers/OAuth/infoflowsecret.png)

9. Add an Infoflow OAuth provider to Casdoor and fill in the ```Client ID```, ```Client Secret```, and ```Agent ID```.

    ![Infoflow Provider](/img/providers/OAuth/infoflowprovider.png)

    You can now use Infoflow as a third-party service for authentication.
