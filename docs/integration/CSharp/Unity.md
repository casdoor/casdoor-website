---
title: Unity
description: Use the Casdoor-dotnet-sdk for Unity development.
keywords: [Unity]
authors: [Wrapping-2000]
---

## Step 1: Deploy Casdoor

Deploy Casdoor in **production mode**. See [Server installation](/docs/basic/server-installation). Ensure the server is reachable and you can sign in (e.g. `admin` / `123`). For a quick start, use the [Casdoor demo](https://door.casdoor.com/).

## Step 2: Import Casdoor.Client

Import [Casdoor.Client](https://github.com/casdoor/casdoor-dotnet-sdk/tree/master/src/Casdoor.Client) for `.NET` in the [Casdoor-dotnet-sdk](https://github.com/casdoor/casdoor-dotnet-sdk).

One optional method is as follows:

- `git@github.com:casdoor/casdoor-dotnet-sdk.git`
- Run ConsoleApp in the Sample folder.
- Get the `/casdoor-dotnet-sdk/src/Casdoor.Client/bin/Debug/net462` folder.

Import the `net462` folder (or another target framework folder) into your Unity project as shown below.

![import-sdk](/img/integration/CSharp/Unity/import-sdk.png)

## Step 3: Usage

Learn how to use the `Casdoor.Client` SDK for Unity 3D mobile development by looking at [casdoor-unity-example](https://github.com/casdoor/casdoor-unity-example).

After running the casdoor-unity-example, the following interfaces appear:

- Login with username and password:

|                                                          **iOS**                                                          |                                                            **Android**                                                            |
|:-------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------:|
| <img src="https://github.com/casdoor/casdoor-unity-example/blob/master/iOS-gif.gif?raw=true" alt="iOS-gif" width="250" /> | <img src="https://github.com/casdoor/casdoor-unity-example/blob/master/Android-gif.gif?raw=true" alt="Android-gif" width="250" /> |

- Login with the Casdoor web page:

|                                                              **iOS**                                                              |                                                                **Android**                                                                |
|:---------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------:|
| <img src="https://github.com/casdoor/casdoor-unity-example/blob/master/iOS-gif-web.gif?raw=true" alt="iOS-gif-web" width="250" /> | <img src="https://github.com/casdoor/casdoor-unity-example/blob/master/Android-gif-web.gif?raw=true" alt="Android-gif-web" width="250" /> |
