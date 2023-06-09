---
title: RuoYi
description: 在 RuoYi-Cloud上使用 Casdoor
keywords:
  - RuoYi
authors:
  - jakiuncle
---

Casdoor可以轻易连接到 RuoYi-cloud。

## 步骤1. 部署Casdoor

首先，部署Casdoor。

您可以参考Casdoor 官方文档 [Server Installation](/docs/basic/server-installation) 。

在成功部署后，您需要确保：

- Casdoor服务已经成功运行，能通过**http://localhost:8000** 访问。
- 打开您最喜欢的浏览器并访问 **http://localhost:7001**，您将看到Casdoor的登录页面。
- 输入 `admin` 和 `123` 测试登录功能正常工作。

然后您可以通过以下步骤在自己的应用程序中快速实现基于 Casdoor 的登录页面。

## 步骤2. 配置Casdoor

如何配置casdoor可以参考 [casdoor](https://door.casdoor.com/login)(配置casdoor和开发最好使用不同的浏览器)。

您还应该配置一个组织、应用程序和同步器。 您也可以参考 [Casdoor](https://door.casdoor.com/login)。

需要注意的一些要点：

1. 修改同步器表格中的列 ![表格列](/img/integration/java/RuoYi/tableColumns.png)
2. 修改组织中的密码类型 ![密码类型](/img/integration/java/RuoYi/passwordType.png)
3. 您也应该打开软删除。

## 步骤3. 前端改造

### 3.1 跳转到casdoor的登录页

我们可以前端的sdk，这里我们以vue-sdk为例。 在 加入vue-sdk 后，您可以通过 getSigninUrl() 获得casdoor登录页面

您可以以您喜欢的方式链接到它，并且您可以删除一些不再使用的ruoyi-cloud的代码，如账户和密码EL输入框。

### 3.2 接收casdoor返回的code和state

在我们通过casdoor成功登录后，casdoor会把code和state返回给我们创建的页面。 我们可以通过create函数获取code和state。

```javascript
created() {
    let url = window.document.location.href//get url
    let u = new URL(url);
    this.loginForm.code = u.searchParams.get('code')//get code and state
    this.loginForm.state = u.searchParams.get('state')
    if(this.loginForm.code!=null&&this.loginForm.state!=null){//if code and state is null, execute handleLogin
      this.handleLogin()
    }  
}
```

对于RuoYi-Cloud，我们只是将发送的账户和密码更改为code和state。 因此，相对于原始登录，它只是改变发送到后端的内容。

## 步骤4. 后端改造

### 4.1 接收前端返回的code和state

```java
@PostMapping("login")
public R<?> callback(@RequestBody CodeBody code) {//we should define a CodeBody entity which have code and state
    String token = casdoorAuthService.getOAuthToken(code.getCode(), code.getState());
    CasdoorUser casdoorUser = casdoorAuthService.parseJwtToken(token);
    if(casdoorUser.getName()!=null){
        String casdoorUserName = casdoorUser.getName();
        if(sysLoginService.getUserByCasdoorName(casdoorUserName)==null){//if database haven't this user
            // add this user into database
            sysLoginService.casdoorRegister(casdoorUserName);
        }
    }
    LoginUser userInfo = sysLoginService.casdoorLogin(casdoorUser.getName());//get this user's information by database
    return R.ok(tokenService.createToken(userInfo));
}
```

在这种方法中，我们使用 casdoor-SpringBoot-sdk ，并对 RuoYi-Cloud 方法稍做修改。

例如，RuoYi-Cloud原本的register使用账户和密码注册，我将register改成了casdoorRegister。

我还添加了一个getUserByCasdoorname这样的方法来检查账户是否存在，并将基于账户和密码用户切换成了当前用户。

这很简单，因为我们只需要删除检查密码的部分。

## 步骤5. 总结

### 5.1 前端

- 我们需要删除原始的登录和注册功能。
- 我们还需要接受code和state并发送到后端。

### 5.2 后端

RuoYi 后端具有极好的登录和注册功能。 我们只需要稍做改变，因此非常方便。

## 步骤6. 详细步骤

1. 部署和配置Casdoor。 部署并配置casdoor。我们必须注意组织的密码类型必须为bcrypt ，因为 RuoYi-Cloud的密码类型是bcrypt 。
2. 我们应该使用casdoor的同步器将数据库用户中的用户信息复制到您的casdoor组织。 此步骤可以将原始帐户导入到casdoor。
3. 在我们部署了casdoor之后，我们应当改造前端。 我们应该关闭 RuoYi 的校验码功能 ![校验码切换](/img/integration/java/RuoYi/loginSwitch.png)

 请注意，在 nacos 中也要关闭RuoYi-Cloud校验码功能。 请注意，RuoYi-Cloud开放注册功能还需要更改配置 sys.account.registerUser 的值为true。

4. 我们应该添加按钮跳到casdoor的按钮并更改数据的loginForm ![login button](/img/integration/java/RuoYi/loginButton.png) ![data loginForm](/img/integration/java/RuoYi/loginForm.png) 你可以通过casdoor-vue-sdk或casdoor-SpringBoot-sdk获得这里的网址。
5. 由于我们不使用原先的登录功能，我们应该删除关于 cookie 和校验码的方法。

 所以创建新的函数：

```javascript
created() {
    let url = window.document.location.href//get url
    let u = new URL(url);
    this.loginForm.code = u.searchParams.get('code')//get code and state
    this.loginForm.state = u.searchParams.get('state')
    if(this.loginForm.code!=null&&this.loginForm.state!=null){//if code and state is null, execute handleLogin
      this.handleLogin()
    }  
}
```

6. 事实上，我们只需要更改发送到后端的参数并删除不需要的函数，此外无需其他改动。 ![处理登录](/img/integration/java/RuoYi/handleLogin.png) ![登录](/img/integration/java/RuoYi/Login.png) ![登录](/img/integration/java/RuoYi/login2.png)
7. 在后端导入依赖

```xml title="pom.xml"
<dependency>
    <groupId>org.casbin</groupId>
    <artifactId>casdoor-spring-boot-starter</artifactId>
    <version>1.2.0</version>
</dependency>
```

您还需要在代码上配置casdoor。
8. 回调函数被定义为重定向函数。 我对sysLoginService 中的一些方法做了小修改 删除检查密码步骤，因为我们不需要它。

```java
@PostMapping("login")
public R<?> callback(@RequestBody CodeBody code) {//we should define a CodeBody entity which have code and state
    String token = casdoorAuthService.getOAuthToken(code.getCode(), code.getState());
    CasdoorUser casdoorUser = casdoorAuthService.parseJwtToken(token);
    if(casdoorUser.getName()!=null){
        String casdoorUserName = casdoorUser.getName();
        if(sysLoginService.getUserByCasdoorName(casdoorUserName)==null){//if database haven't this user
            // add this user into database
            sysLoginService.casdoorRegister(casdoorUserName);
        }
    }
    LoginUser userInfo = sysLoginService.casdoorLogin(casdoorUser.getName());//get this user's information by database
    return R.ok(tokenService.createToken(userInfo));
}
```

9. SysLoginService的新方法

```java
public LoginUser casdoorLogin(String username){
    // execute user
    R<LoginUser> userResult = remoteUserService.getUserInfo(username, SecurityConstants.INNER);
    if (R.FAIL == userResult.getCode())
    {
        throw new ServiceException(userResult.getMsg());
    }

    if (StringUtils.isNull(userResult) || StringUtils.isNull(userResult.getData()))
    {
        recordLogService.recordLogininfor(username, Constants.LOGIN_FAIL, "this user is not exist");
        throw new ServiceException("user：" + username + " is not exist");
    }
    LoginUser userInfo = userResult.getData();
    SysUser user = userResult.getData().getSysUser();
    if (UserStatus.DELETED.getCode().equals(user.getDelFlag()))
    {
        recordLogService.recordLogininfor(username, Constants.LOGIN_FAIL, "sorry, your account was deleted");
        throw new ServiceException("sorry, your account：" + username + " was deleted");
    }
    if (UserStatus.DISABLE.getCode().equals(user.getStatus()))
    {
        recordLogService.recordLogininfor(username, Constants.LOGIN_FAIL, "your account is disabled, you can contact admin ");
         throw new ServiceException(sorry, your account：" + username + " is disabled");
    }
    recordLogService.recordLogininfor(username, Constants.LOGIN_SUCCESS, "login successfully");
    return userInfo;
}
```

```java
public String getUserByCasdoorName(String casdoorUsername){
    R<LoginUser> userResult = remoteUserService.getUserInfo(casdoorUsername, SecurityConstants.INNER);
    if (StringUtils.isNull(userResult) || StringUtils.isNull(userResult.getData()))
    {
        //if this user is not in RuoYi-Cloud database and casdoor have this user, we should create this user in database
        return null;
    }
    String username = userResult.getData().getSysUser().getUserName();
    return username;
}
```

```java
public void casdoorRegister(String username){
    if (StringUtils.isAnyBlank(username))
    {
        throw new ServiceException("User must fill in");
    }
    SysUser sysUser = new SysUser();
    sysUser.setUserName(username);
    sysUser.setNickName(username);
    R<?> registerResult = remoteUserService.registerUserInfo(sysUser, SecurityConstants.INNER);
    System.out.println(registerResult);
    if (R.FAIL == registerResult.getCode())
    {
        throw new ServiceException(registerResult.getMsg());
    }
    recordLogService.recordLogininfor(username, Constants.REGISTER, "register successfully");
}
```
