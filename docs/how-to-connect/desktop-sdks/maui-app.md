---
title: Sign users in to a .NET MAUI app
sidebar_label: .NET MAUI app
description: Add Casdoor sign-in to a .NET MAUI app on Android and Windows with the Casdoor.MauiOidcClient library.
keywords: [.NET, MAUI, SDK]
authors: [RVShershnev]
---

This guide explains how to add Casdoor sign-in to a .NET MAUI app with the `Casdoor.MauiOidcClient` library, which signs users in through OpenID Connect (OIDC).

---

#### Learning outcomes

- Register the Casdoor client in a MAUI app.
- Add sign-in and sign-out to the main page.
- Receive the callback on Android.

#### What you need

- [.NET 7 SDK](https://dotnet.microsoft.com/download/dotnet/7.0)
- The MAUI workloads for your target platforms. See [Build your first MAUI app](https://docs.microsoft.com/en-us/dotnet/maui/get-started/first-app).
- Optionally, Visual Studio 2022 version 17.3 or later on Windows, or version 17.4 or later on macOS
- An [application](/docs/application/overview) in Casdoor

#### Sample code

- [casdoor-dotnet-maui-example](https://github.com/RVShershnev/casdoor-dotnet-maui-example): A MAUI app and the `Casdoor.MauiOidcClient` library

---

## Preview

On Android:

![Recording of the sign-in flow on Android](/img/how-to-connect/desktop-sdks/maui-app/android.gif)

On Windows:

![Recording of the sign-in flow on Windows](/img/how-to-connect/desktop-sdks/maui-app/windows.gif)

## Add sign-in to a MAUI app

1. Create a [MAUI app](https://docs.microsoft.com/en-us/dotnet/maui/get-started/first-app).
1. Add a reference to `Casdoor.MauiOidcClient`.
1. Register `CasdoorClient` as a singleton service:

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

1. Add the sign-in and sign-out buttons to `MainPage.xaml`:

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
                   SemanticProperties.Description="Welcome to dot net Multi-platform App UI"
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

1. Handle the buttons in `MainPage.cs`:

   ```csharp
   namespace Casdoor.MauiOidcClient.Example
   {
       public partial class MainPage : ContentPage
       {
           int count = 0;
           private readonly CasdoorClient client;
           private string accessToken;
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
               accessToken = loginResult.AccessToken;
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
               var logoutResult = await client.LogoutAsync(accessToken);

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

1. For Android, declare the callback activity in `AndroidManifest.xml`:

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

1. Start the app. In Visual Studio, press `Ctrl + F5`.

## See also

- [Sign users in to a .NET desktop app](/docs/how-to-connect/desktop-sdks/dotnet-app)
- [Connect a standard OIDC client](/docs/how-to-connect/oidc-client)
