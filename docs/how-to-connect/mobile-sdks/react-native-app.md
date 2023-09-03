---
title: React Native App
description: A React Native mobile app example for Casdoor
keywords: [React Native, sdk]
authors: [cwp0]
---

There is a [Casdoor React Native mobile app example](https://github.com/casdoor/casdoor-react-native-sdk) to get you up to speed on how to use Casdoor in React Native.

## How to Run the Example

### Quick Start

- download the code

```bash
 git clone git@github.com:casdoor/casdoor-react-native-example.git
```

- install dependencies
```bash 
 cd casdoor-react-native-example
 yarn install
 cd ios/
 pod install
```
- run on ios
```bash
cd casdoor-react-native-example
react-native start
react-native run-ios
```
- run on android
```bash
cd casdoor-react-native-example
react-native start
react-native run-android
```
> Make sure to turn on the emulator or real device before running.

### After running, you will see the following  interfaces:

|                                                             **iOS**                                                              |                                                            **Android**                                                            |
|:--------------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------:|
| <img src="https://github.com/casdoor/casdoor-react-native-example/blob/master/iOS-gif.gif?raw=true" alt="iOS-gif" width="250" /> | <img src="https://github.com/casdoor/casdoor-react-native-example/blob/master/Android-gif.gif?raw=true" alt="Android-gif" width="250" /> |


## How to Integrate

The above example uses [casdoor-react-native-sdk](https://github.com/casdoor/casdoor-react-native-sdk), you can also integrate this sdk in your own project.

The integration and use of the sdk is very simple, the following steps will show you how to integrate and use:

### Step 1: Import SDK

~~~shell script
# NPM
npm i casdoor-react-native-sdk

# Yarn
yarn add casdoor-react-native-sdk
~~~

### Step 2: Initialize SDK

Initialization requires 7 parameters, which are all string type:

| Name (in order)  | Must | Description                                                                                    |
|------------------|------|------------------------------------------------------------------------------------------------|
| serverUrl        | Yes  | your Casdoor server URL                                                                        |
| clientId         | Yes  | the Client ID of your Casdoor application                                                      |
| clientSecret     | Yes  | the Client Secret of your Casdoor application                                                  |
| appName          | Yes  | the name of your Casdoor application                                                           |
| organizationName | Yes  | the name of the Casdoor organization connected with your Casdoor application                   |
| redirectPath     | No   | the path of the redirect URL for your Casdoor application, will be `/callback` if not provided |
| signinPath       | No   | the path of the signin URL for your Casdoor application                                        |

```javascript
import SDK from 'casdoor-react-native-sdk'

const sdkConfig = {
  serverUrl: 'https://door.casdoor.com',
  clientId: 'b800a86702dd4d29ec4d',
  clientSecret: '1219843a8db4695155699be3a67f10796f2ec1d5',
  appName: 'app-example',
  organizationName: 'casbin',
  redirectPath: 'http://localhost:5000/callback',
  signinPath: '/api/signin',
};
const sdk = new SDK(sdkConfig)
```

### Step 3: Use SDK

Use the corresponding API interface of the sdk at the appropriate place.

The simplest casdoor authorization and authentication process can be realized by using the following three APIs:

```javascript

// get the signin url
getSigninUrl()

// get Access Token
getAccessToken(redirectUrl); // http://localhost:5000/callback?code=b75bc5c5ac65ffa516e5&state=gjmfdgqf498

// decode jwt token to get user info
JwtDecode(jwtToken) 
```

If you want to use other interfaces, please check [casdoor-react-native-sdk](https://github.com/casdoor/casdoor-react-native-sdk) for more help.
