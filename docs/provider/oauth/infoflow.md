---
title: Infoflow OAuth
description: Add Baidu Infoflow as an OAuth provider.
keywords: [Infoflow, OAuth, Baidu]
authors: [Steve0x2a]
---

1. Log in at [Infoflow](http://id.qy.baidu.com/static/ge/login.html#/) and open [Infoflow applications](http://qy.baidu.com/index.html#applist).
2. Register an application and note the **AgentID**.
3. In the **Setting** tab, create a management group. In address book permissions, add your structure and grant the app the needed permissions; add the app to the specified location. Add the required sensitive interface permissions.
4. On the same page, copy **CorpID** and **Secret**.

![Create APP](/img/providers/OAuth/infoflowapp1.png)
![Create APP](/img/providers/OAuth/infoflowapp2.png)
![AgentID](/img/providers/OAuth/infoflowagentid.png)
![Setting](/img/providers/OAuth/infoflowsetting.png)
![Permission](/img/providers/OAuth/infoflowpermission1.png)
![Permission](/img/providers/OAuth/infoflowpermission2.png)
![Permission](/img/providers/OAuth/infoflowsecret.png)

5. In Casdoor add an **OAuth** provider, set **Type** to **Infoflow**, and fill in:

| Casdoor       | Infoflow   |
|---------------|------------|
| Client ID     | CorpID     |
| Client secret | Secret     |
| Agent ID      | AgentID    |

![Infoflow Provider](/img/providers/OAuth/infoflowprovider.png)
