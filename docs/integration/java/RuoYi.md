---
title: RuoYi
description: Using Casdoor in RuoYi-Cloud
keywords: [RuoYi]
---

Casdoor can connect to RuoYi-cloud simply.

## Step 1. Deploy Casdoor

Firstly, the Casdoor should be deployed. 

You can refer to the Casdoor official documentation for the [Server Installation](/docs/basic/server-installation).

After a successful deployment, you need to ensure:

- The Casdoor server is successfully running on **http://localhost:8000**.
- Open your favorite browser and visit **http://localhost:7001**, you will see the login page of Casdoor.
- Input `admin` and `123` to test login functionality is working fine.

Then you can quickly implement a casdoor-based login page in your own app with the following steps.


## Step 2. Configure Casdoor 
Configure casdoor can refer to [casdoor](https://door.casdoor.com/login)(Configure casdoor's browser better not use one browser as  your develop browser).

You also should configure an organization, an application and the Synchronizer. You also can refer to [casdoor](https://door.casdoor.com/login).

Some points needing attention:

1. The table columns in edit syncer:
![table colums](/img/RuoYi-Cloud_tableColumns.png)

2. The password type in edit organization:
![passwordType](/img/RuoYi-Cloud_passwordType.png)

3. You also should open soft deletion.
## Step 3. Reform your front-end
### 3.1 jump to casdoor's login page
We can use front-end sdk, take vue-sdk as an example here. After you init vue-sdk, you can get casdoor login page url by getSigninUrl().

You can link it with the way you like and you can delete some ruoyi-cloud original code which you have no further use, such as original account and password el-input.
### 3.2 Accept the code and state which return by casdoor
After we login in successfully by casdoor, casdoor sends the code and state to the page that we set up. We can get the code and state with function create.
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
For RuoYi-Cloud, we just change its original method which sends account and password to send code and state. Therefore, it just changes what is sent to the back end, relative to the original login.

## Step 4. Reform your back-end
### 4.1 Accept the code and state which return by front-end
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
In this method, we use casdoor-SpringBoot-sdk method and slightly modified RuoYi-Cloud Method.

For example, RuoYi-Cloud original register with account and password, I change the register with account like casdoorRegister.

I also add a method to execute whether this account exists like getUserByCasdoorName and change execute userinfo with account and password to with account.

It's easy, because we only need to delete the part of checking password.
## Step 5. Summary
### 5.1 front-end 
- We need to delete original login and register.
- We also need to accept code and state and send them to back-end.
### 5.2 back-end
RuoYi back-end has perfect login and registration function. We just need to change a little, so it is very convenient.
## Step 6. Detailed steps
1. Deploy and configure casdoor. We must take care of the organization's password type which should choose bcrypt because RuoYi-Cloud's password type is bcrypt.
2. We should use casdoor syncers to copy database users to your casdoor organization. This step can make the original account import to casdoor.
3. After we deployed casdoor, we should change front-end. We should close RuoYi check code 
![checkcode Switch](/img/RuoYi-Cloud_loginSwitch.png)

 Note that RuoYi-Cloud captcha needs to be close in nacos again.
 Note that RuoYi-Cloud open registration function requires changing sys.account.registerUser to true. 

4. We should add button jump to casdoor and change data's loginForm
![login button](/img/RuoYi-Cloud_loginButton.png)
![data loginForm](/img/RuoYi-Cloud_loginForm.png)
 Here I write url, you can get url by casdoor-vue-sdk or casdoor-SpringBoot-sdk.
5. Because we don't use the original login, we should delete the method about cookie and checkcode method.

 So the new create function:
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
6. In fact, we just need to change the parameter we send to back-end and delete the function we don't need, we don't need to change anything else.
![handleLogin](/img/RuoYi-Cloud_handleLogin.png)
![Login](/img/RuoYi-Cloud_Login.png)
![login](/img/RuoYi-Cloud_login2.png)
7. Import dependency in back-end.
```xml title="pom.xml"
<dependency>
    <groupId>org.casbin</groupId>
    <artifactId>casdoor-spring-boot-starter</artifactId>
    <version>1.2.0</version>
</dependency>
```
You also need to configure casdoor in resource.
8. Callback function is defined as the redirect function. I change some methods in sysLoginService slightly. I delete the check password step because we don't need it.
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
9. SysLoginService's new method
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

