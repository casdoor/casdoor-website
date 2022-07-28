---
title: Electron App
description: An Electron app example for Casdoor
keywords: [electron, sdk]
---

An [Electron app example](https://github.com/casdoor/casdoor-electron-example) for Casdoor.

# How to run example

## Init the example

You need to init 6 parameters, which are all string type:

| Name                 | Description                                                                                      | Path                   |
| -------------------- | ------------------------------------------------------------------------------------------------ | ---------------------- |
| serverUrl            | your Casdoor server URL                                                                          | `src/App.js`         |
| clientId             | the Client ID of your Casdoor application                                                        | `src/App.js`         |
| appName              | the name of your Casdoor application                                                             | `src/App.js`         |
| redirectPath         | the path of the redirect URL for your Casdoor application, will be `/callback` if not provided | `src/App.js`         |
| clientSecret         | the Client Secret of your Casdoor application                                                   | `src/App.js`         |
| casdoorServiceDomain | your Casdoor server URL                                                                          | `public/electron.js` |

If you don't set these parameters, this project will use the [Casdoor online demo](https://door.casdoor.com/) as the defult Casdoor server and use the [Casnode](https://door.casdoor.com/applications/app-casnode) as the default Casdoor application.

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `yarn dev`

Builds the electron app and run this app.

### `npm run make` or `yarn make`

Package and distribute your application. It will create the `out` folder where your package will be located:

```
// Example for macOS out/  
├── out/make/zip/darwin/x64/casdoor-electron-example-darwin-x64-1.0.0.zip  
├── ...  
└── out/casdoor-electron-example-darwin-x64/casdoor-electron-example.app/Contents/MacOS/casdoor-electron-example
```

## Prview the example

After you run this electron application, a new window will be showed on your desktop.
![electron login](/img/howto-desktop-electron-login.png)
If you click `Login with Casdoor` botton, your default browser will be opened automatically and show the login page.
![browser](/img/howto-desktop-electron-browser.png)
After you login successfully, your electron application will be opened and your user name will be showed on your application.
![electron logout](/img/howto-desktop-electron-logout.png)
You can preview the whole process by the gif image below.
![electron gif](/img/howto-desktop-electron-app-preview.gif)

# How to integrate

## Set the custom protocol

Firstly, you need to set the custom protocol called `casdoor`.

```javascript
const protocol = "casdoor";

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient(protocol, process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient(protocol);
}
```

This will help the browser to open your electron application and send the login info to the electron application.

## Open the login url by the browser

```javascript
const serverUrl = "https://door.casdoor.com";
const appName = "app-casnode";
const redirectPath = "/callback";
const clientId = "014ae4bd048734ca2dea";
const clientSecret = "f26a4115725867b7bb7b668c81e1f8f7fae1544d";

const redirectUrl = "casdoor://localhost:3000" + redirectPath;

const signinUrl = `${serverUrl}/login/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=profile&state=${appName}&noRedirect=true`;

shell.openExternal(signinUrl); //Open the login url by the browser
```

You can change the first 5 parameters.

## Listen to the open application event

After you login successfully in the browser, the browser will open your electron application. You need to listen to the open application event.

```javascript
const gotTheLock = app.requestSingleInstanceLock();
const ProtocolRegExp = new RegExp(`^${protocol}://`);

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
      commandLine.forEach((str) => {
        if (ProtocolRegExp.test(str)) {
          const params = url.parse(str, true).query;
          if (params && params.code) {
            store.set("casdoor_code", params.code);
            mainWindow.webContents.send("receiveCode", params.code);
          }
        }
      });
    }
  });
  app.whenReady().then(createWindow);

  app.on("open-url", (event, openUrl) => {
    const isProtocol = ProtocolRegExp.test(openUrl);
    if (isProtocol) {
      const params = url.parse(openUrl, true).query;
      if (params && params.code) {
        store.set("casdoor_code", params.code);
        mainWindow.webContents.send("receiveCode", params.code);
      }
    }
  });
}
```

You can get the code from the broswer, which is `casdoor_code` or `params.code`.

## Parse the code and get the user info

```javascript
async function getUserInfo(clientId, clientSecret, code) {
  const { data } = await axios({
    method: "post",
    url: authCodeUrl,
    headers: {
      "content-type": "application/json",
    },
    data: JSON.stringify({
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
    }),
  });
  const resp = await axios({
    method: "get",
    url: `${getUserInfoUrl}?accessToken=${data.access_token}`,
  });
  return resp.data;
}

ipcMain.handle("getUserInfo", async (event, clientId, clientSecret) => {
  const code = store.get("casdoor_code");
  const userInfo = await getUserInfo(clientId, clientSecret, code);
  store.set("userInfo", userInfo);
  return userInfo;
});
```

Finally, you can parse the code and get the user info just followed the[ Casdoor docs](/docs/how-to-connect/oauth).
