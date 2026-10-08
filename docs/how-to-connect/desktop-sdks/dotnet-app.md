---
title: Sign users in to a .NET desktop app
sidebar_label: .NET desktop app
description: Run the Casdoor .NET desktop example, which signs users in through WebView2, and add the same flow to your own app.
keywords: [dotNET, SDK]
authors: [zh6335901]
---

This guide explains how to run the Casdoor example for .NET desktop apps and how to add the same sign-in flow to your own app. The example shows the Casdoor sign-in page in a WebView2 window.

---

#### Learning outcomes

- Configure and run the example app.
- Open the Casdoor sign-in window from your app.
- Exchange the authorization code for a token and read the user.

#### What you need

- [.NET 6 SDK](https://dotnet.microsoft.com/en-us/download)
- [WebView2 Runtime](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section). Windows usually has it preinstalled.
- An [application](/docs/application/overview) in Casdoor. Without one, the example uses the [Casdoor demo site](https://door.casdoor.com) and its application [app-casnode](https://door.casdoor.com/applications/app-casnode).

#### Sample code

- [casdoor-dotnet-desktop-example](https://github.com/casdoor/casdoor-dotnet-desktop-example)

---

## Run the example

1. Clone [casdoor-dotnet-desktop-example](https://github.com/casdoor/casdoor-dotnet-desktop-example).
1. Set the following values. All of them are strings.

   | Name         | Description                                                                                             | File                  |
   | ------------ | ------------------------------------------------------------------------------------------------------- | --------------------- |
   | Domain       | The host/domain of your Casdoor server                                                                  | `CasdoorVariables.cs` |
   | ClientId     | The Client ID of your Casdoor application                                                               | `CasdoorVariables.cs` |
   | AppName      | The name of your Casdoor application                                                                    | `CasdoorVariables.cs` |
   | CallbackUrl  | The path of the callback URL for your Casdoor application. If not provided, it will be `casdoor://callback` | `CasdoorVariables.cs` |
   | ClientSecret | The Client Secret of your Casdoor application                                                           | `CasdoorVariables.cs` |

1. Start the app.

   - In Visual Studio: Open `casdoor-dotnet-desktop-example.sln` and press `Ctrl + F5`.
   - On the command line: Run `dotnet run` in `src/DesktopApp`.

1. In the app window, click **Casdoor Login**.

   ![Main window of the example app](/img/how-to-connect/desktop-sdks/dotnet-app/index.png)

   The Casdoor sign-in page opens in a window.

   ![Casdoor sign-in window](/img/how-to-connect/desktop-sdks/dotnet-app/login.png)

1. Sign in. The app shows the profile of the user.

   ![User profile in the example app](/img/how-to-connect/desktop-sdks/dotnet-app/userprofile.png)

![Recording of the complete sign-in flow](/img/how-to-connect/desktop-sdks/dotnet-app/preview.gif)

## Add sign-in to your app

### Open the sign-in window

Create the sign-in window and subscribe to the event that delivers the authorization code:

```csharp
var login = new Login();
// Triggered when login succeeds, you will receive an auth code in the event handler
login.CodeReceived += Login_CodeReceived;
login.ShowDialog();
```

### Exchange the code for the user

In the event handler, exchange the authorization code for a token and read the user from it:

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

## See also

- [Casdoor SDKs](/docs/how-to-connect/sdk)
- [OAuth 2.0](/docs/how-to-connect/oauth)
