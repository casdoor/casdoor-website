---
title: Mobile SDKs .NET MAUI App 
description: An .NET MAUI App example for Casdoor
keywords: [dotnet, sdk]
authors: [RVShershnev]
---

[The repository contains .NET MAUI app and .NET MAUI library](https://github.com/RVShershnev/casdoor-dotnet-maui-example) for demonstration [Casdoor](https://casdoor.org/) authentication by Open ID Connect.

## Demonstration

### **Android**

![Android](/img/how-to-connect/desktop-sdks/maui-app/android.gif)

### **Windows**

![Windows](/img/how-to-connect/desktop-sdks/maui-app/windows.gif)

## Requirements

- [.NET 7 SDK](https://dotnet.microsoft.com/download/dotnet/7.0) installed on your machine
- The required assets needed for your target(s) platform(s) as described [here](https://docs.microsoft.com/en-us/dotnet/maui/get-started/first-app)
- Visual Studio 2022 for Windows 17.3  or Visual Studio 2022 for Mac 17.4 (optional)

## Getting started

### Step 1: Create MAUI Application

Create your [MAUI Application](https://docs.microsoft.com/en-us/dotnet/maui/get-started/first-app).

### Step 2: Add reference

Add a reference to the `Casdoor.MauiOidcClient` in your project.  

### Step 3: Add Casdoor client

Add `CasdoorClient` as singleton in the services.

```csharp
builder.Services.AddSingleton(new CasdoorClient(new()
{
    Domain = "<your domain>",
    ClientId = "<your client>",
    Scope = "openid profile email",

#if WINDOWS
    RedirectUri = "http://localhost/callback"
#else
    RedirectUri = "casdoor://callback"
#endif
}));
```

### Step 4: Design UI

Add code to `MainPage` file.

**MainPage.xaml**
```xml
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="Casdoor.MauiOidcClient.Example.MainPage">

    <ScrollView>
        <VerticalStackLayout>

            <StackLayout
                x:Name="LoginView">
                <Button 
                    x:Name="LoginBtn"
                    Text="Log In"
                    SemanticProperties.Hint="Click to log in"
                    Clicked="OnLoginClicked"
                    HorizontalOptions="Center" />

                <WebView x:Name="WebViewInstance" />
            </StackLayout>

            <StackLayout
                x:Name="HomeView"
                IsVisible="false">             

                <Label
                Text="Welcome to .NET Multi-platform App UI"
                SemanticProperties.HeadingLevel="Level2"
                SemanticProperties.Description="Welcome to dot net Multi platform App U I"
                FontSize="18"
                HorizontalOptions="Center" />

                <Button
                x:Name="CounterBtn"
                Text="Click me"
                SemanticProperties.Hint="Counts the number of times you click"
                Clicked="OnCounterClicked"
                HorizontalOptions="Center" />

                <Label 
                x:Name="NameLabel"
                Text=""
                SemanticProperties.HeadingLevel="Level2"
                SemanticProperties.Description="User's name"
                FontSize="18"
                HorizontalOptions="Center" />

                <Label 
                x:Name="EmailLabel"
                Text=""
                SemanticProperties.HeadingLevel="Level2"
                SemanticProperties.Description="User's email"
                FontSize="18"
                HorizontalOptions="Center" />           

                <Button 
                x:Name="LogoutBtn"
                Text="Log Out"
                SemanticProperties.Hint="Click to log out"
                Clicked="OnLogoutClicked"
                HorizontalOptions="Center" />

            </StackLayout>
        </VerticalStackLayout>
    </ScrollView>

</ContentPage>
```

**MainPage.cs**
```csharp
namespace Casdoor.MauiOidcClient.Example
{
    public partial class MainPage : ContentPage
    {
        int count = 0;
        private readonly CasdoorClient client;
        private string acsessToken;
        public MainPage(CasdoorClient client)
        {
            InitializeComponent();
            this.client = client;

#if WINDOWS
    client.Browser = new WebViewBrowserAuthenticator(WebViewInstance);
#endif
        }

        private void OnCounterClicked(object sender, EventArgs e)
        {
            count++;

            if (count == 1)
                CounterBtn.Text = $"Clicked {count} time";
            else
                CounterBtn.Text = $"Clicked {count} times";

            SemanticScreenReader.Announce(CounterBtn.Text);
        }

        private async void OnLoginClicked(object sender, EventArgs e)
        {
            var loginResult = await client.LoginAsync();
            acsessToken = loginResult.AccessToken;
            if (!loginResult.IsError)
            {
                NameLabel.Text = loginResult.User.Identity.Name;
                EmailLabel.Text = loginResult.User.Claims.FirstOrDefault(c => c.Type == "email")?.Value;            

                LoginView.IsVisible = false;
                HomeView.IsVisible = true;
            }
            else
            {
                await DisplayAlert("Error", loginResult.ErrorDescription, "OK");
            }
        }

        private async void OnLogoutClicked(object sender, EventArgs e)
        {
            var logoutResult = await client.LogoutAsync(acsessToken);


            if (!logoutResult.IsError)
            {
                HomeView.IsVisible = false;
                LoginView.IsVisible = true;
                this.Focus();
            }
            else
            {
                await DisplayAlert("Error", logoutResult.ErrorDescription, "OK");
            }
        }
    }
}
```


### Step 5: Support Android platform

Modify `AndroidManifest.xml` file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
	<application android:allowBackup="true" android:icon="@mipmap/appicon" android:roundIcon="@mipmap/appicon_round" android:supportsRtl="true"></application>
	<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
	<uses-permission android:name="android.permission.INTERNET" />
	<queries>
        <intent>
            <action android:name="android.support.customtabs.action.CustomTabsService" />
        </intent>
    </queries>
</manifest>
```

### Step 6: Launch application

**Visual Studio:** Press Ctrl + F5 to start