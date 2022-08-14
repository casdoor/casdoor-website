---
title: Dotnet Desktop App
description: An Dotnet desktop app example for Casdoor
keywords: [dotnet, sdk]
---

An [Dotnet desktop app example](https://github.com/casdoor/casdoor-dotnet-desktop-example) for Casdoor.

# How to run example

## Prerequisites

[dotnet6 sdk](https://dotnet.microsoft.com/en-us/download)

[webview2 runtime](https://developer.microsoft.com/zh-cn/microsoft-edge/webview2/#download-section) (It's already preinstalled in your windows generally)

## Initialization

You need to init requires 5 parameters, which are all string type:

| Name         | Description                                                                                             | File                  |
| ------------ | ------------------------------------------------------------------------------------------------------- | --------------------- |
| Domain       | Your Casdoor server host/domain                                                                         | `CasdoorVariables.cs` |
| ClientId     | The Client ID of your Casdoor application                                                               | `CasdoorVariables.cs` |
| AppName      | The name of your Casdoor application                                                                    | `CasdoorVariables.cs` |
| CallbackUrl  | The path of the callback URL for your Casdoor application, will be `casdoor://callback` if not provided | `CasdoorVariables.cs` |
| ClientSecret | The Client Secret of your Casdoor application                                                           | `CasdoorVariables.cs` |

If you don't set these parameters, this project will use the [Casdoor online demo](https://door.casdoor.com) as the defult Casdoor server and use the [Casnode](https://door.casdoor.com/applications/app-casnode) as the default Casdoor application.

## Running

### Visual Studio

1. Open casdoor-dotnet-desktop-example.sln
2. Press Ctrl + F5 to start

### Command line

1. cd src/DesktopApp
2. dotnet run

## Preview

After you run this dotnet desktop application, a new window will be showed on your desktop.
![index](/img/howto-desktop-dotnet-app-index.png)

If you click `Casdoor Login` botton, a login window will be showed on your desktop.
![login](/img/howto-desktop-dotnet-app-login.png)

After you login successfully, a user profile window will be showed on your desktop, it dispaly your user name.
![user profile](/img/howto-desktop-dotnet-app-userprofile.png)

You can preview the whole process by the gif image below.
![preview gif](/img/howto-desktop-dotnet-app-preview.gif)

# How to integrate

## Open the login window

```csharp
var login = new Login();
// Trigger when login succeeded, you will receive auth code in event handler
login.CodeReceived += Login_CodeReceived;
login.ShowDialog();
```

## Use auth code to get the user info

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
