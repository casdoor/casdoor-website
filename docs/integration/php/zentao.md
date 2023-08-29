---
title: Zentao
description: Using Casdoor for authentication in Zentao
keywords: [Zentao, zentao-oidc]
authors: [leo220yuyaodog]
---

[Zentao](https://www.zentao.pm/) is an agile (scrum) project management system/tool, but it does not support OIDC itself.
To integrate Zentao with Casdoor SSO, we need to use a 3rd-party OIDC module called [zentao-oidc](https://github.com/casdoor/zentao-oidc), and this document will show you how to do it.

## Step 1: Deploy Casdoor and Zentao

Firstly, deploy [Casdoor](/docs/basic/server-installation) and
[Zentao](https://www.zentao.pm/download/zentao-community-edition-release-164-1100.html).
After a successful deployment, make sure:

1. Casdoor can be logged in and used successfully.
2. You can successfully log in and use Zentao.

## Step 2: Integrate Zentao OIDC third-party module

Install [zentao-oidc](https://github.com/casdoor/zentao-oidc) by running the following command:

```java
git clone https://github.com/casdoor/zentao-oidc.git
```

Alternatively, you can download the ZIP and unzip it.

This module is used to integrate Zentao with SSO for OpenId. Here's how to use it:

1. Copy the entire `oidc` directory to the module of Zentao and use it as a module of Zentao.
   Rename the downloaded package to "oidc".

2. Configure the filter.

   Since the Zentao framework filters the parameters in the URL and does not allow spaces,
   you need to put the following code at the end of `/config/my.php`.

   ```php
   $filter->oidc = new stdclass();
   $filter->oidc->index = new stdclass();
   $filter->oidc->index->paramValue['scope'] = 'reg::any';
   ```

3. Modify `/module/commom/model.php`.

   Add 'oidc' to the anonymous access list and add a line to the `isOpenMethod` method of `model.php`.

   ```php
   public function isOpenMethod($module, $method)
   {          
       if ($module == 'oidc' and $method == 'index') {
           return true; 
       }
   }
   ```

4. If you don't want the Zentao login screen to appear, go directly to the Casdoor login screen.

   Modify the last line of code in `public function checkPriv()` in `/module/common/model.php`.

   ```php
   //return print(js::locate(helper::createLink('user', 'login', "referer=$referer")));
   return print(js::locate(helper::createLink('oidc', 'index', "referer=$referer")));
   ```

5. Modify the `setSuperVars()` method inside `framework/base/router.class.php` and comment out the following statements.

   ```php
   public function setSuperVars()
   //  unset($_REQUEST);
   ```

## Step 3: Configure Casdoor Application

1. Create a new Casdoor application or use an existing one.
2. Add your redirect URL.
   ![Casdoor Application Setting](/img/integration/php/zentao/clientId.png)
3. Add the provider you want and fill in other required settings.

## Step 4: Configure Zentao

Configure the `config.php` file in the `oidc` directory.

```php
$config->oidc->clientId = "<Your ClientId>";
$config->oidc->clientSecret = "<Your ClientSecret>";
$config->oidc->issuer = "http://localhost:8000";
```

Set your redirect URL in `module/oidc` in the `public function index()` method.

```php
$oidc->setRedirectURL($path."/zentao/oidc-index.html");
```

:::note

The URL here refers to calling the 'index' method in the 'oidc' module. You also need to set a variable separator.
By default, the framework uses a dash ("-").
Please refer to the official Zentao framework for more details.
["zentaoPHP框架"](https://devel.easycorp.cn/book/zentaophphelp/about-10.html)

:::
