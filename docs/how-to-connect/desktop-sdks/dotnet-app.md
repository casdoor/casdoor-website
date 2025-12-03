---
title: dotNET Desktop App
description: A dotNET desktop app example for Casdoor
keywords: [dotNET, SDK]
authors: [zh6335901]
---

A [Dotnet desktop app example](https://github.com/casdoor/casdoor-dotnet-desktop-example) for Casdoor.

## How to Run the Example

### Prerequisites

- [dotNET 6 SDK](https://dotnet.microsoft.com/en-us/download)
- [WebView2 Runtime](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section) (It is usually preinstalled on Windows)

### Initialization

The initialization requires 5 parameters, all of which are of type string:

| Name         | Description                                                                                             | File                  |
| ------------ | ------------------------------------------------------------------------------------------------------- | --------------------- |
| Domain       | The host/domain of your Casdoor server                                                                  | `CasdoorVariables.cs` |
| ClientId     | The Client ID of your Casdoor application                                                               | `CasdoorVariables.cs` |
| AppName      | The name of your Casdoor application                                                                    | `CasdoorVariables.cs` |
| CallbackUrl  | The path of the callback URL for your Casdoor application. If not provided, it will be `casdoor://callback` | `CasdoorVariables.cs` |
| ClientSecret | The Client Secret of your Casdoor application                                                           | `CasdoorVariables.cs` |

If you do not set these parameters, the project will default to using the [Casdoor online demo](https://door.casdoor.com) as the Casdoor server and the [Casnode](https://door.casdoor.com/applications/app-casnode) as the Casdoor application.

### Running

#### Visual Studio

1. Open `casdoor-dotnet-desktop-example.sln`
2. Press `Ctrl + F5` to start

#### Command Line

1. `cd src/DesktopApp`
2. `dotnet run`

### Preview

After running the dotNET desktop application, a new window will appear on your desktop.
![index](/img/how-to-connect/desktop-sdks/dotnet-app/index.png)

If you click the `Casdoor Login` button, a login window will appear on your desktop.
![login](/img/how-to-connect/desktop-sdks/dotnet-app/login.png)

After successfully logging in, a user profile window will appear on your desktop, displaying your username.
![user profile](/img/how-to-connect/desktop-sdks/dotnet-app/userprofile.png)

You can preview the entire process in the GIF image below.
![preview gif](/img/how-to-connect/desktop-sdks/dotnet-app/preview.gif)

## How to Integrate

### Opening the Login Window

```csharp
var login = new Login();
// Triggered when login succeeds, you will receive an auth code in the event handler
login.CodeReceived += Login_CodeReceived;
login.ShowDialog();
```

### Using the Auth Code to Get User Info

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
    authCode,
);

var user = await _casdoorApi.GetUserInfo(token);
```
