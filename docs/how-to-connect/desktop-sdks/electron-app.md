---
title: Electron App Example for Casdoor
description: This is an Electron app example that demonstrates Casdoor's integration capabilities.
keywords: [electron, SDK, Casdoor]
authors: [Resulte]
---

An [Electron app example](https://github.com/casdoor/casdoor-electron-example) that demonstrates Casdoor's integration capabilities.

## How to Run the Example

### Initialization

You need to initialize 6 parameters, all of which are string type:

| Name                 | Description                                                                                      | Path                   |
| -------------------- | ------------------------------------------------------------------------------------------------ | ---------------------- |
| serverUrl            | Your Casdoor server URL                                                                          | `src/App.js`         |
| clientId             | The Client ID of your Casdoor application                                                        | `src/App.js`         |
| appName              | The name of your Casdoor application                                                             | `src/App.js`         |
| redirectPath         | The path of the redirect URL for your Casdoor application, will be `/callback` if not provided | `src/App.js`         |
| clientSecret         | The Client Secret of your Casdoor application                                                   | `src/App.js`         |
| casdoorServiceDomain | Your Casdoor server URL                                                                          | `public/electron.js` |

If you don't set these parameters, this project will use the [Casdoor online demo](https://door.casdoor.com/) as the default Casdoor server and use the [Casnode](https://door.casdoor.com/applications/app-casnode) as the default Casdoor application.

### Available Commands

In the project directory, you can run:

#### `npm run dev` or `yarn dev`

Builds the electron app and runs this app.

#### `npm run make` or `yarn make`

Packages and distributes your application. It will create the `out` folder where your package will be located:

```bash
// Example for macOS out/  
├── out/make/zip/darwin/x64/casdoor-electron-example-darwin-x64-1.0.0.zip  
├── ...  
└── out/casdoor-electron-example-darwin-x64/casdoor-electron-example.app/Contents/MacOS/casdoor-electron-example
```

### Preview

Once you run this Electron application, a new window will appear on your desktop.
![Electron Login](/img/how-to-connect/desktop-sdks/electron-app/login.png)
If you click the `Login with Casdoor` button, your default browser will automatically open and display the login page.
![Browser View](/img/how-to-connect/desktop-sdks/electron-app/browser.png)
Following a successful login, your Electron application will open, and your user name will be displayed on your application.
![Electron Logout](/img/how-to-connect/desktop-sdks/electron-app/logout.png)
You can preview the entire process in the gif image below.
![Electron Preview Gif](/img/how-to-connect/desktop-sdks/electron-app/preview.gif)

## Integration Steps

### Set the custom protocol

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

This will allow the browser to open your electron application and send the login info to the electron application.

### Open the login URL in the browser

```javascript
const serverUrl = "https://door.casdoor.com";
const appName = "app-casnode";
const redirectPath = "/callback";
const clientId = "014ae4bd048734ca2dea";
const clientSecret = "f26a4115725867b7bb7b668c81e1f8f7fae1544d";

const redirectUrl = "casdoor://localhost:3000" + redirectPath;

const signinUrl = `${serverUrl}/login/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=profile&state=${appName}&noRedirect=true`;

shell.openExternal(signinUrl); //Open the login url in the browser
```

You can change the first five parameters.

### Listen to the open application event

Once you successfully log in through the browser, the browser will open your Electron application. Therefore, you must listen to the open application event.

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

You can get the code from the browser, which is `casdoor_code` or `params.code`.

### Parse the code and get the user info

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

Finally, you can parse the code and get the user info following the [OAuth docs page](/docs/how-to-connect/oauth).
