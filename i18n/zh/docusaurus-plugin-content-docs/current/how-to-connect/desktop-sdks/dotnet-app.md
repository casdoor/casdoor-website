---
title: Dotnet桌面应用程序
description: 一个 Dotnet 桌面应用程序用于Casdoor的示例
keywords:
  - dotnet
  - sdk
authors:
  - zh6335901
---

一个为 Casdoor的 [Dotnet 桌面应用程序示例](https://github.com/casdoor/casdoor-dotnet-desktop-example)。

# 如何运行示例

## 前置要求

[dotnet6 sdk](https://dotnet.microsoft.com/en-us/download)

[webview2 runtime](https://developer.microsoft.com/zh-cn/microsoft-edge/webview2/#download-section) (已经在您的窗口中预装了)

## 初始化

初始化需要 5 个参数，它们都是字符串类型：

| 名称           | 描述                                                   | 文件                    |
| ------------ | ---------------------------------------------------- | --------------------- |
| Domain       | 您的 Casdoor 服务器主机/域                                   | `CasdoorVariables.cs` |
| Clientid     | 您的 Casdoor 应用程序的客户端 ID                               | `CasdoorVariables.cs` |
| AppName      | 您的Casdoor应用程序的名称                                     | `CasdoorVariables.cs` |
| CallbackURL  | 您的Casdoor 应用程序的回调URL路径将是 `casdoor://callback` 如果没有提供 | `CasdoorVariables.cs` |
| ClientSecret | 您的Casdoor应用程序的客户端密钥                                  | `CasdoorVariables.cs` |

如果您没有设置这些参数， 此项目将使用 [Casdoor 在线演示](https://door.casdoor.com) 作为默认的Casdoor 服务器，并使用 [Casnode](https://door.casdoor.com/applications/app-casnode) 作为默认的 Casdoor 应用程序。

## 运行

### Visual Studio

1. 打开casdoor-dotnet-desktop-example.sln
2. 按 Ctrl + F5 开始

### 命令行

1. cd src/DesktopApp
2. dotnet run

## 效果预览

在运行此dotnet桌面应用程序后，您的桌面将显示一个新窗口。 ![index 索引](/img/how-to-connect/desktop-sdks/dotnet-app/index.png)

如果您点击 `Casdoor Login`按钮，您的桌面将显示登录窗口。 ![登录](/img/how-to-connect/desktop-sdks/dotnet-app/login.png)

成功登录后，桌面上将显示一个用户配置文件窗口。 它显示您的用户名。 ![用户个人资料](/img/how-to-connect/desktop-sdks/dotnet-app/userprofile.png)

您可以通过下面的 gif 图像预览整个过程。 ![预览 gif](/img/how-to-connect/desktop-sdks/dotnet-app/preview.gif)

# 如何整合？

## 打开登录窗口

```csharp
var login = new Login();
// 登录成功时触发，您将在事件处理程序中收到身份验证代码
login.CodeReceived += Login_CodeReceived;
login.ShowDialog();
```

## 使用认证码获取用户信息

```csharp
public async Task<string?> RequestToken(string clientId, string clientSecret, string code)
{
    var body = new
    {
        grant_type = "authorization_code",
        client_id = clientId,
        client_secret = clientSecret,
        code
    };

    var req = new RestRequest(_requestTokenUrl).AddJsonBody(body);
    var token = await _client.PostAsync<TokenDto>(req);

    return token?.AccessToken;
}

public async Task<UserDto?> GetUserInfo(string token)
{
    var req = new RestRequest(_getUserInfoUrl).AddQueryParameter("accessToken", token);

    return await _client.GetAsync<UserDto>(req);
}

...

var token = await _casdoorApi.RequestToken(
    CasdoorVariables.ClientId,
    CasdoorVariables.ClientSecret,
    authCode
);

var user = await _casdoorApi.GetUserInfo(token);
```
