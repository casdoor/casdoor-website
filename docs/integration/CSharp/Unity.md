---
title: Unity
description: Use the Casdoor-dotnet-sdk for Unity development.
keywords: [Unity]
authors: [Wrapping-2000]
---

## Step 1: Deploy Casdoor

Firstly, Casdoor should be deployed.

You can refer to the Casdoor official documentation for the [Server Installation](/docs/basic/server-installation). Please deploy your Casdoor instance in **production mode**.

After a successful deployment, ensure that:

- Open your favorite browser and visit **<http://localhost:8000>**, you will see the login page of Casdoor.
- Input `admin` and `123` to test the login functionality.

Alternatively, you can use the [official Casdoor demo station](https://door.casdoor.com/) for a quick start.

## Step 2: Import Casdoor.Client

Import [Casdoor.Client](https://github.com/casdoor/casdoor-dotnet-sdk/tree/master/src/Casdoor.Client) for `.NET` in the [Casdoor-dotnet-sdk](https://github.com/casdoor/casdoor-dotnet-sdk).

One optional method is as follows:

- `git@github.com:casdoor/casdoor-dotnet-sdk.git`
- Run ConsoleApp in the Sample folder.
- Get the `/casdoor-dotnet-sdk/src/Casdoor.Client/bin/Debug/net462` folder.

Now, you can import the `net462` folder into your Unity project through the method shown in the figure below. Of course, you can also choose folders of other versions.

![import-sdk](/img/integration/C%23/Unity/import-sdk.png)

## Step 3: Usage

Learn how to use the `Casdoor.Client` SDK for Unity 3D mobile development by looking at [casdoor-unity-example](https://github.com/casdoor/casdoor-unity-example).

After running the casdoor-unity-example, you will see the following interfaces:

- Login with username and password:

|                                                          **iOS**                                                          |                                                            **Android**                                                            |
|:-------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------:|
| <img src="https://github.com/casdoor/casdoor-unity-example/blob/master/iOS-gif.gif?raw=true" alt="iOS-gif" width="250" /> | <img src="https://github.com/casdoor/casdoor-unity-example/blob/master/Android-gif.gif?raw=true" alt="Android-gif" width="250" /> |

- Login with the Casdoor web page:

|                                                              **iOS**                                                              |                                                                **Android**                                                                |
|:---------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------:|
| <img src="https://github.com/casdoor/casdoor-unity-example/blob/master/iOS-gif-web.gif?raw=true" alt="iOS-gif-web" width="250" /> | <img src="https://github.com/casdoor/casdoor-unity-example/blob/master/Android-gif-web.gif?raw=true" alt="Android-gif-web" width="250" /> |
