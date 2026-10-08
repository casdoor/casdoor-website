---
title: Add Infoflow as an OAuth provider
sidebar_label: Infoflow
description: Let users sign in to Casdoor with their account in Baidu Infoflow.
keywords: [Infoflow, OAuth, Baidu]
authors: [Steve0x2a]
---

This guide explains how to let users sign in to Casdoor with their account in Baidu Infoflow.

---

#### Learning outcomes

- Register an application in Infoflow and grant it permissions.
- Add Infoflow as an OAuth provider in Casdoor.

#### What you need

- Administrator access to an [Infoflow](http://id.qy.baidu.com/static/ge/login.html#/) organization
- Administrator access to the Casdoor admin console

---

## Register an application in Infoflow

1. Sign in to Infoflow and open [Infoflow applications](http://qy.baidu.com/index.html#applist).
1. Register an application and note its AgentID.

   ![Application registration](/img/providers/OAuth/infoflowapp1.png)

   ![Application details](/img/providers/OAuth/infoflowapp2.png)

   ![AgentID of the application](/img/providers/OAuth/infoflowagentid.png)

1. On the **Setting** tab, create a management group. In its address book permissions, add your organization structure, grant the application the permissions that it needs, and add the required sensitive interface permissions.

   ![Setting tab](/img/providers/OAuth/infoflowsetting.png)

   ![Address book permissions](/img/providers/OAuth/infoflowpermission1.png)

   ![Sensitive interface permissions](/img/providers/OAuth/infoflowpermission2.png)

1. On the same page, copy the CorpID and the Secret.

   ![CorpID and Secret](/img/providers/OAuth/infoflowsecret.png)

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `OAuth` and **Type** to `Infoflow`.
1. Fill in the fields:

   | Casdoor       | Infoflow   |
   |---------------|------------|
   | Client ID     | CorpID     |
   | Client secret | Secret     |
   | Agent ID      | AgentID    |

   ![Infoflow provider in Casdoor](/img/providers/OAuth/infoflowprovider.png)

1. Save the provider.

## Next steps

Add the provider to an application. See [Add providers to an application](/docs/application/providers).

## See also

- [OAuth providers](/docs/provider/oauth/overview)
