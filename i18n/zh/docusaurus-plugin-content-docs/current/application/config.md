---
title: 应用程序配置
description: 配置应用程序身份验证
keywords:
  - 配置
  - 应用程序
authors:
  - ErikQQY
---

```mdx-code-block
import styles from '../styles.module.css';
import CasdoorCard from "@site/src/components/CasdoorCard"
```

将 Casdoor 部署到服务器并设置组织后，您可以使用 Casdoor 配置应用程序身份验证并部署应用程序！

让我们看看如何使用Casdoor配置您的应用程序的身份认证系统吧！

:::note

:::note
例如，让我们看看如何为一个论坛使用 [Casnode](https://casnode.org) 设置身份验证。
:::

:::

首先，创建您的应用程序并填写必要的配置。

然后，选择您创建的组织，以便组织中的用户也可以使用该应用程序。

![选择组织](/img/application/config/organization.png)

由于组织的名称为 `my_organization`，请从下拉菜单中选择它。

![从下拉菜单中选择组织](/img/application/config/selectorganization.png)

接下来，将重定向 URL 输入为 `https://my-site-url.com/callback`，以便用户在注册时可以使用 Casdoor 完成身份验证。

:::caution

:::caution
请注意，提供程序应用程序中的 `callback URL` 应为 Casdoor 的回调 URL，并且 Casdoor 中的 `Redirect URL` 应为您的网站的回调 URL.

#### 进一步解释

为使身份验证过程正常工作，详细步骤如下：

Casdoor 使用 `Client ID` 和 `Client Secret` 从 GitHub、Google 或其他提供程序获取身份验证。

如果身份验证成功，则提供程序回调 URL 应为您的 Casdoor 回调 URL，即 `http://your-casdoor-url.com/callback`。

:::

最后，通过添加提供程序并设置其属性来添加可以注册的第三方应用程序。

![选择提供程序](/img/application/config/selectproviders.png)

```mdx-code-block
<div className={styles.signingradientborder}>
  <CasdoorCard src="https://door.casdoor.com/login/oauth/authorize?client_id=014ae4bd048734ca2dea&response_type=code&redirect_uri=https://forum.casbin.com/callback&scope=read&state=app-casbin-forum" height= "680" />
</div>
```

:::tip

:::tip
如果您不希望用户使用 **用户名/密码** 访问您的应用程序，则可以关闭 `Password On` 按钮。 这样，用户只能使用第三方服务访问应用程序。

![打开密码](/img/application/config/PasswordOn.png)

:::
