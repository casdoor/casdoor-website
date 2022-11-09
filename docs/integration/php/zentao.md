---
title: Zentao
description: Using Casdoor for authentication in Zentao
keywords: [Zentao, zentao-oidc]
author: leo220yuyaodog
---

[Zentao](https://www.zentao.pm/) is an agile(scrum) project management system/tool, but it does not support OIDC itself. 
For integrating Zentao with Casdoor SSO, we should via 3rd-party OIDC module 
[zentao-oidc](https://github.com/casdoor/zentao-oidc), and this document will show you how to do it.

## Step1. Deploy Casdoor and Zentao

Firstly, the [Casdoor](/docs/basic/server-installation) and 
[Zentao](https://www.zentao.pm/download/zentao-community-edition-release-164-1100.html) should be deployed.
After a successful deployment, you need to ensure:

1. Casdoor can be logged in and used successfully.
2. You can successfully log in and use Zentao

## Step2. Integrated Zentao OIDC third party module

install [zentao-oidc](https://github.com/casdoor/zentao-oidc)

```java
git clone https://github.com/casdoor/zentao-oidc.git
```

or you can download the ZIP and unzip it.

This module is used for Zentao integrating with SSO for OpenId. The usage is as follows:

1. Copy the entire oidc directory to the Module of The Zentao and use it as a module of the Zentao.
Rename the downloaded package to "oidc"

2. Configure the filter

   Because the framework of Zentao filters the parameters in URL and does not allow Spaces.
So you need to put the following code at the end of `/config/my.php`.

 ```php
 $filter->oidc=new stdclass();
 $filter->oidc->index=new stdclass();
 $filter->oidc->index->paramValue['scope']='reg::any';
 ```

3. Modify `/module/commom/model.php`

   Put 'oidc' on the anonymous access list and add a line to the `isOpenMethod` method of `model.php`.

```php
public function isOpenMethod($module, $method){        
   if($module == 'oidc' and $method == 'index')  return true; 
}
```

4. If you do not want the Zentao login screen to appear, go directly to the Casdoor login screen.
   Modify the last line of code at `public function checkPriv()` in `/module/common/model.php`.

```php
//return print(js::locate(helper::createLink('user', 'login', "referer=$referer")));
return print(js::locate(helper::createLink('oidc', 'index', "referer=$referer")));
```

5. Modify `setSuperVars()` method inside of `framework/base/router.class.php`, 
comment out the following statements.

```php
    public function setSuperVars()
//  unset($_REQUEST);
```

## Step3. Configure Casdoor Application

1. Create or use an existing Casdoor application.
2. Add Your redirect url
   ![Casdoor Application Setting](/img/integration/php/zentao/clientId.png)
3. Add provider you want and supplement other settings.

## Step4. Configure Zentao

Configure `config.php` in the oidc

```php
$config->oidc->clientId="<Your ClientId>";
$config->oidc->clientSecret="<Your ClientSecrect>";
$config->oidc->issuer="http://localhost:8000";
```

set your reditrect Url in module/oidc `public function index()`

```php
$oidc->setRedirectURL($path."/zentao/oidc-index.html");
```

:::note

The URL here refers to calling the 'index' method in the 'oidc' module. You also need to set a variable separator, 
which the framework defaults to with a dash : -  
please refer to zentao's official framework for details. 
["zentaoPHP框架"](https://devel.easycorp.cn/book/zentaophphelp/about-10.html)

:::
