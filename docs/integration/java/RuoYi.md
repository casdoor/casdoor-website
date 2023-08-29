---
title: RuoYi
description: Using Casdoor in RuoYi-Cloud
keywords: [RuoYi]
authors: [jakiuncle]
---

Casdoor can be easily integrated with RuoYi-cloud.

## Step 1: Deploy Casdoor

First, deploy Casdoor.

You can refer to the Casdoor official documentation for the [Server Installation](/docs/basic/server-installation).

After successful deployment, ensure the following:

- The Casdoor server is running at **<http://localhost:8000>**.
- Open your favorite browser and visit **<http://localhost:7001>** to access the Casdoor login page.
- Test the login functionality by entering `admin` and `123`.

Next, you can quickly implement a Casdoor-based login page in your own app following these steps.

## Step 2: Configure Casdoor

To configure Casdoor, please follow these steps:

1. Open Casdoor in a browser by clicking [here](https://door.casdoor.com/login). It is recommended to use a different browser than your development browser.

2. Configure an organization, an application, and the Synchronizer in Casdoor. You can find detailed instructions on how to do this [here](https://door.casdoor.com/login).

Here are some additional points to keep in mind:

1. When editing the syncer, make sure to check the table columns: ![Table Columns](/img/integration/java/RuoYi/tableColumns.png).

2. When editing the organization, make sure to select the correct password type: ![Password Type](/img/integration/java/RuoYi/passwordType.png).

3. Lastly, ensure that you have enabled soft deletion.

Please make sure to follow these instructions carefully to properly configure Casdoor.

## Step 3. Reform your front-end

### 3.1 Jump to Casdoor's login page

We can use a front-end SDK, taking vue-sdk as an example here. After you initialize vue-sdk, you can obtain the Casdoor login page URL by using the getSigninUrl() function.

You can link it in the way you prefer, and feel free to delete any original code from Ruoyi-Cloud that is no longer necessary, such as the original account and password el-input.

### 3.2 Accept the code and state returned by Casdoor

After successfully logging in through Casdoor, Casdoor sends the code and state to the page we set up. We can retrieve the code and state using the create() function.

```javascript
created() {
    let url = window.document.location.href; // get URL
    let u = new URL(url);
    this.loginForm.code = u.searchParams.get('code'); // get code and state
    this.loginForm.state = u.searchParams.get('state');
    if (this.loginForm.code != null && this.loginForm.state != null) { // if code and state are not null, execute handleLogin
      this.handleLogin();
    }  
}
```

For RuoYi-Cloud, we simply modify its original method of sending the account and password to send the code and state instead. Therefore, the change is only in what is sent to the backend, in relation to the original login.

## Step 4: Refactor your back-end

### 4.1 Accept the code and state returned by the front-end

```java
@PostMapping("login")
public R<?> callback(@RequestBody CodeBody code) {
    String token = casdoorAuthService.getOAuthToken(code.getCode(), code.getState());
    CasdoorUser casdoorUser = casdoorAuthService.parseJwtToken(token);
    if (casdoorUser.getName() != null) {
        String casdoorUserName = casdoorUser.getName();
        if (sysLoginService.getUserByCasdoorName(casdoorUserName) == null) {
            sysLoginService.casdoorRegister(casdoorUserName); // Add this user to the database if they don't exist
        }
    }
    LoginUser userInfo = sysLoginService.casdoorLogin(casdoorUser.getName()); // Get the user's information from the database
    return R.ok(tokenService.createToken(userInfo));
}
```

In this method, we are using the casdoor-SpringBoot-sdk method and making slight modifications to the RuoYi-Cloud method.

For example, the RuoYi-Cloud original method registers an account with a password. I have changed it to register an account using the `casdoorRegister` method.

I have also added a method `getUserByCasdoorName` to check if the account exists, and changed the method `executeUserInfo` to `executeWithAccount` to reflect this change.

This is an easy modification, as we only need to remove the part that checks the password.

## Step 5: Summary

### 5.1 Front-end

- The existing login and register pages need to be removed.
- Additionally, the front-end needs to accept code and state parameters and send them to the back-end.

### 5.2 Back-end

The RuoYi back-end already has a well-implemented login and registration function. We just need to make some minor modifications, which makes the process highly convenient.

## Step 6: Detailed Steps

1. Deploy and configure Casdoor. Be sure to select the bcrypt password type for the organization, as RuoYi-Cloud also uses bcrypt for passwords.

2. Use Casdoor syncers to copy database users to your Casdoor organization. This will import the original accounts into Casdoor.

3. After deploying Casdoor, make changes to the front-end. Disable the RuoYi check code.

    ![checkcode Switch](/img/integration/java/RuoYi/loginSwitch.png)

    Note that the RuoYi-Cloud captcha needs to be disabled in Nacos again.
    Also, the RuoYi-Cloud registration function needs to be enabled by setting `sys.account.registerUser` to `true`.

4. Add a button for users to log in with Casdoor, and modify the data's `loginForm`.

    ![login button](/img/integration/java/RuoYi/loginButton.png)
    ![data loginForm](/img/integration/java/RuoYi/loginForm.png)
    Here, I have written the URL, but you can obtain it using the Casdoor-Vue-SDK or Casdoor-SpringBoot-SDK.

5. Since we are no longer using the original login method, delete the cookie and checkcode methods.

    The new `created` function should look like this:

    ```javascript
    created() {
        let url = window.document.location.href; // Get the URL
        let u = new URL(url);
        this.loginForm.code = u.searchParams.get('code'); // Get the code and state
        this.loginForm.state = u.searchParams.get('state');
        if (this.loginForm.code != null && this.loginForm.state != null) { // If code and state are not null, execute handleLogin
            this.handleLogin();
        }  
    }
    ```

6. In fact, we only need to change the parameter we send to the back-end and delete the unnecessary functions. No other changes are necessary.

    ![handleLogin](/img/integration/java/RuoYi/handleLogin.png)
    ![Login](/img/integration/java/RuoYi/Login.png)
    ![login](/img/integration/java/RuoYi/login2.png)

7. Import the required dependency in the back-end.

    ```xml title="pom.xml"
    <dependency>
        <groupId>org.casbin</groupId>
        <artifactId>casdoor-spring-boot-starter</artifactId>
        <version>1.2.0</version>
    </dependency>
    ```

    You also need to configure Casdoor in the resource file.

8. Define the callback function as the redirect function. Make changes to some methods in `sysLoginService`. Delete the password check step because it is no longer needed.

    ```java
    @PostMapping("login")
    public R<?> callback(@RequestBody CodeBody code) {
        // Define a CodeBody entity with code and state
        String token = casdoorAuthService.getOAuthToken(code.getCode(), code.getState());
        CasdoorUser casdoorUser = casdoorAuthService.parseJwtToken(token);
        if (casdoorUser.getName() != null) {
            String casdoorUserName = casdoorUser.getName();
            if (sysLoginService.getUserByCasdoorName(casdoorUserName) == null) {
                // If the user is not in the RuoYi-Cloud database but exists in Casdoor, create the user in the database
                sysLoginService.casdoorRegister(casdoorUserName);
            }
        }
        LoginUser userInfo = sysLoginService.casdoorLogin(casdoorUser.getName());
        // Get the user's information from the database
        return R.ok(tokenService.createToken(userInfo));
    }
    ```

9. Add new methods to `SysLoginService`.

    ```java
    public LoginUser casdoorLogin(String username) {
        R<LoginUser> userResult = remoteUserService.getUserInfo(username, SecurityConstants.INNER);
        // Execute the user
        if (R.FAIL == userResult.getCode()) {
            throw new ServiceException(userResult.getMsg());
        }

        if (StringUtils.isNull(userResult) || StringUtils.isNull(userResult.getData())) {
            recordLogService.recordLogininfor(username, Constants.LOGIN_FAIL, "This user does not exist");
            throw new ServiceException("User " + username + " does not exist");
        }
        LoginUser userInfo = userResult.getData();
        SysUser user = userResult.getData().getSysUser();
        if (UserStatus.DELETED.getCode().equals(user.getDelFlag())) {
            recordLogService.recordLogininfor(username, Constants.LOGIN_FAIL, "Sorry, your account has been deleted");
            throw new ServiceException("Sorry, your account " + username + " has been deleted");
        }
        if (UserStatus.DISABLE.getCode().equals(user.getStatus())) {
            recordLogService.recordLogininfor(username, Constants.LOGIN_FAIL, "Your account is disabled. Please contact the administrator");
            throw new ServiceException("Sorry, your account " + username + " is disabled");
        }
        recordLogService.recordLogininfor(username, Constants.LOGIN_SUCCESS, "Login successful");
        return userInfo;
    }
    ```

    ```java
    public String getUserByCasdoorName(String casdoorUsername) {
        R<LoginUser> userResult = remoteUserService.getUserInfo(casdoorUsername, SecurityConstants.INNER);
        if (StringUtils.isNull(userResult) || StringUtils.isNull(userResult.getData())) {
            // If the user is not in the RuoYi-Cloud database but exists in Casdoor, create the user in the database
            return null;
        }
        String username = userResult.getData().getSysUser().getUserName();
        return username;
    }
    ```

    ```java
    public void casdoorRegister(String username) {
        if (StringUtils.isAnyBlank(username)) {
            throw new ServiceException("User must provide a username");
        }
        SysUser sysUser = new SysUser();
        sysUser.setUserName(username);
        sysUser.setNickName(username);
        R<?> registerResult = remoteUserService.registerUserInfo(sysUser, SecurityConstants.INNER);
        System.out.println(registerResult);
        if (R.FAIL == registerResult.getCode()) {
            throw new ServiceException(registerResult.getMsg());
        }
        recordLogService.recordLogininfor(username, Constants.REGISTER, "Registration successful");
    }
    ```
