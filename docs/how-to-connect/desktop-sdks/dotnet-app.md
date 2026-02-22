---
title: .NET desktop app
description: Integrate Casdoor in a .NET desktop app with WebView2.
keywords: [dotNET, SDK]
authors: [zh6335901]
---

The [casdoor-dotnet-desktop-example](https://github.com/casdoor/casdoor-dotnet-desktop-example) shows Casdoor sign-in in a .NET desktop app using WebView2.

## Run the example

### Prerequisites

- [.NET 6 SDK](https://dotnet.microsoft.com/en-us/download)
- [WebView2 Runtime](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section) (usually preinstalled on Windows)

### Initialization

Set these 5 string parameters:

| Name         | Description                                                                                             | File                  |
| ------------ | ------------------------------------------------------------------------------------------------------- | --------------------- |
| Domain       | The host/domain of your Casdoor server                                                                  | `CasdoorVariables.cs` |
| ClientId     | The Client ID of your Casdoor application                                                               | `CasdoorVariables.cs` |
| AppName      | The name of your Casdoor application                                                                    | `CasdoorVariables.cs` |
| CallbackUrl  | The path of the callback URL for your Casdoor application. If not provided, it will be `casdoor://callback` | `CasdoorVariables.cs` |
| ClientSecret | The Client Secret of your Casdoor application                                                           | `CasdoorVariables.cs` |

Defaults: [Casdoor demo](https://door.casdoor.com) and [app-casnode](https://door.casdoor.com/applications/app-casnode) if not set.

### Running

**Visual Studio**

1. Open `casdoor-dotnet-desktop-example.sln`
2. Press `Ctrl + F5` to start

**Command line**

1. `cd src/DesktopApp`
2. `dotnet run`

### Preview

![index](/img/how-to-connect/desktop-sdks/dotnet-app/index.png)

Click **Casdoor Login** to open the login window. After sign-in, the user profile is shown.

![login](/img/how-to-connect/desktop-sdks/dotnet-app/login.png)
![user profile](/img/how-to-connect/desktop-sdks/dotnet-app/userprofile.png)
![preview gif](/img/how-to-connect/desktop-sdks/dotnet-app/preview.gif)

## Integration

### Open the login window

```csharp
var login = new Login();
// Triggered when login succeeds, you will receive an auth code in the event handler
login.CodeReceived += Login_CodeReceived;
login.ShowDialog();
```

### Exchange the auth code for user info

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
