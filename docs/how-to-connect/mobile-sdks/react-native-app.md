---
title: React Native app
description: Integrate Casdoor in a React Native app with the official SDK.
keywords: [React Native, sdk]
authors: [cwp0]
---

The [casdoor-react-native-example](https://github.com/casdoor/casdoor-react-native-example) and [casdoor-react-native-sdk](https://github.com/casdoor/casdoor-react-native-sdk) show how to use Casdoor in React Native.

## Run the example

### Quick start

```bash
git clone git@github.com:casdoor/casdoor-react-native-example.git
cd casdoor-react-native-example
yarn install
cd ios/ && pod install && cd ..
```

**iOS:** `react-native start` then `react-native run-ios`  
**Android:** `react-native start` then `react-native run-android`

Start an emulator or connect a device before running.

### Preview

|                                                 **iOS**                                                  |                                                   **Android**                                                    |
|:--------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------:|
| <img src="/img/how-to-connect/mobile-sdks/react-native-app/iOS-login.png" alt="iOS-login" width="250" /> | <img src="/img/how-to-connect/mobile-sdks/react-native-app/Android-login.png" alt="Android-login" width="250" /> |

Click **Login with Casdoor** to open the Casdoor login screen.

|                                                         **iOS**                                                          |                                                           **Android**                                                            |
|:------------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------:|
| <img src="/img/how-to-connect/mobile-sdks/react-native-app/iOS-casdoor-login.png" alt="iOS-casdoor-login" width="250" /> | <img src="/img/how-to-connect/mobile-sdks/react-native-app/Android-casdoor-login.png" alt="Android-casdoor-login" width="250" /> |

After sign-in, the user profile is shown.

|                                                       **iOS**                                                       |                                                           **Android**                                                            |
|:-------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------:|
| <img src="/img/how-to-connect/mobile-sdks/react-native-app/iOS-userInfo.png" alt="iOS-userInfo" width="250" /> | <img src="/img/how-to-connect/mobile-sdks/react-native-app/Android-userInfo.png" alt="Android-userInfo" width="250" /> |


|                                                             **iOS**                                                              |                                 **Android**                                                                                              |
|:--------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------:|
| <img src="https://github.com/casdoor/casdoor-react-native-example/blob/master/iOS-gif.gif?raw=true" alt="iOS-gif" width="250" /> | <img src="https://github.com/casdoor/casdoor-react-native-example/blob/master/Android-gif.gif?raw=true" alt="Android-gif" width="250" /> |

## Integration

The example uses [casdoor-react-native-sdk](https://github.com/casdoor/casdoor-react-native-sdk). To use it in your own project:

### 1. Install the SDK

```shell script
# NPM
npm i casdoor-react-native-sdk

# Yarn
yarn add casdoor-react-native-sdk
```

### 2. Initialize

Set these 7 string parameters (all required except `redirectPath` and `signinPath`):

| Name (in order)  | Must | Description                                                                                    |
|------------------|------|------------------------------------------------------------------------------------------------|
| serverUrl        | Yes  | your Casdoor server URL                                                                        |
| clientId         | Yes  | the Client ID of your Casdoor application                                                      |
| appName          | Yes  | the name of your Casdoor application                                                           |
| organizationName | Yes  | the name of the Casdoor organization connected with your Casdoor application                   |
| redirectPath     | No   | the path of the redirect URL for your Casdoor application, will be `/callback` if not provided |
| signinPath       | No   | the path of the signin URL for your Casdoor application                                        |

```javascript
import SDK from 'casdoor-react-native-sdk'

const sdkConfig = {
  serverUrl: 'https://door.casdoor.com',
  clientId: 'b800a86702dd4d29ec4d',
  appName: 'app-example',
  organizationName: 'casbin',
  redirectPath: 'http://localhost:5000/callback',
  signinPath: '/api/signin',
};
const sdk = new SDK(sdkConfig)
```

### 3. Use the SDK

Typical flow:

```javascript

// get the signin url
getSigninUrl()

// get Access Token
getAccessToken(redirectUrl); // http://localhost:5000/callback?code=b75bc5c5ac65ffa516e5&state=gjmfdgqf498

// decode jwt token to get user info
JwtDecode(jwtToken) 
```

See [casdoor-react-native-sdk](https://github.com/casdoor/casdoor-react-native-sdk) for the full API.
