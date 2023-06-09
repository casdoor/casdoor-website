---
title: 禅道
description: 在禅道中使用 Casdoor 进行身份验证
keywords:
  - 禅道
  - zentao-oidc
authors:
  - leo220yuyaodog
---

[禅道](https://www.zentao.pm/) 是一个 敏捷(scrum) 项目管理系统/工具，但它不支持 OIDC 本身。 为了整合禅道和 Casdoor SSO，我们应该通过第三方OIDC 模块 [zentao-oidc](https://github.com/casdoor/zentao-oidc), 和这个文档将显示你如何去做。

## 步骤1. 部署Casdoor和禅道

首先，应该部署 [Casdoor](/docs/basic/server-installation) 和 [禅道](https://www.zentao.pm/download/zentao-community-edition-release-164-1100.html)。 在成功部署后，您需要确保：

1. Casdoor 可以正常登录使用。
2. 您可以成功登录并使用禅道

## 步骤2. 集成禅道 OIDC 第三方模块

安装 [zentao-oidc](https://github.com/casdoor/zentao-oidc)

```java
git clone https://github.com/casdoor/zentao-oidc.git
```

或者您可以下载 ZIP 并解压缩它。

此模块用于在 OpenID 与 SSO 集成时使用 禅道 用法如下：

1. 将整个oidc目录复制到禅道模块中，并使用它作为禅道模块。 重命名下载的软件包为“oidc”

2. 配置过滤器

   因为禅道框架过滤了URL中的参数，不允许空格。 所以你需要在 `/config/my.php` 末尾放置以下代码。

 ```php
 $filter->oidc=new stdclass();
 $filter->oidc->index=new stdclass();
 $filter->oidc->index->paramValue['scope']='reg::any';
 ```

3. 修改 `/module/commom/model.php`

   将“oidc”放在匿名访问列表中，并添加一行到 `isOpenMethody` 方法 `model.php` 中。

```php
public function isOpenMethod($module, $method){        
   if($module == 'oidc' and $method == 'index')  return true; 
}
```

4. 如果您不想显示禅道登录屏幕，直接进入Casto登录屏幕。 修改最后一行代码在 `public function checkPriv()` 在`/module/common/model.php` 中。

```php
//return print(js::locate(helper::createLink('user', 'login', "referer=$referer")));
return print(js::locate(helper::createLink('oidc', 'index', "referer=$referer")));
```

5. 修改 `setSuperVars()` 方法在 `framework/base/router.class.php`, 注释掉以下代码

```php
    public function setSuperVars()
//  unset($_REQUEST);
```

## 步骤3. 配置Casdoor应用程序

1. 创建或使用现有的 Casdoor 应用程序。
2. 添加您的重定向url ![Casdoor 应用程序设置](/img/integration/php/zentao/clientId.png)
3. 添加您想要的提供商并补充其他设置。

## 步骤4. 配置 Jenkins

在 oidc 中配置 `config.php`

```php
$config->oidc->clientId="<Your ClientId>";
$config->oidc->clientSecret="<Your ClientSecrect>";
$config->oidc->issuer="http://localhost:8000";
```

在 module/oidc `公共函数索引()` 中设置你的重定向Url

```php
$oidc->setRedirectURL($path."/zentao/oidc-index.html");
```

:::note

这里的URL是指调用 'index' 方法在 'oidc ' 模块中。 您还需要设置一个变量分隔符。 哪个框架默认为破折号：- 请参阅禅道的官方框架以了解详情。 ["禅道框架"](https://devel.easycorp.cn/book/zentaophphelp/about-10.html)

:::
