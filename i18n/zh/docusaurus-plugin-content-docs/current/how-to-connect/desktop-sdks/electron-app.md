---
title: Electron 应用
description: 一个 Electron 桌面应用程序用于Casdoor的示例
keywords:
  - electron
  - sdk
authors:
  - Resulte
---

一个为 Casdoor的 [Electron 桌面应用程序示例](https://github.com/casdoor/casdoor-electron-example)。

## 如何运行示例

### 初始化

您需要初始化6个参数，它们都是字符串类型：

| 名称                   | 描述                                             | 路径                   |
| -------------------- | ---------------------------------------------- | -------------------- |
| serverUrl            | 您的Casdoor服务器URL                                | `src/App.js`         |
| clientid             | 您Casdoor应用程序的客户端 ID                            | `src/App.js`         |
| appName              | 您的Casdoor应用程序的名称                               | `src/App.js`         |
| redirectPath         | 您的 Casdoor 应用程序的重定向URL 路径将是 `/callback` 如果没有提供 | `src/App.js`         |
| clientSecret         | 您的Casdoor应用程序的客户端密钥                            | `src/App.js`         |
| casdoorServiceDomain | 您的Casdoor服务器URL                                | `public/electron.js` |

如果您没有设置这些参数， 此项目将使用 [Casdoor 在线演示](https://door.casdoor.com/) 作为默认的Casdoor 服务器，并使用 [Casnode](https://door.casdoor.com/applications/app-casnode) 作为默认的 Casdoor 应用程序。

### 可用命令

在项目目录中，您可以运行：

#### `npm run dev` 或者 `yarn dev`

构建electron应用并运行此应用。

#### `npm run make` 或者 `yarn make`

打包和分发您的应用程序。 它将创建 `out` 文件夹，您的软件包将被定位于：

```
// macOS下的out/示例  
├── out/make/zip/darwin/x64/casdoor-electron-example-darwin-x64-1.0.0.zip  
├── ...  
└── out/casdoor-electron-example-darwin-x64/casdoor-electron-example.app/Contents/MacOS/casdoor-electron-example
```

### 预览

在您运行此electron应用程序后，将在您的桌面上显示一个新的窗口。 ![electron login](/img/how-to-connect/desktop-sdks/electron-app/login.png) 如果您点击 `使用 Casdoor登陆` 按钮，您的默认浏览器将被自动打开并显示登录页面。 ![browser](/img/how-to-connect/desktop-sdks/electron-app/browser.png) 登录成功后，将会打开您的electron应用程序，您的用户名将会显示在您的应用程序中。 ![electron logout](/img/how-to-connect/desktop-sdks/electron-app/logout.png) 您可以通过下面的Gif图像预览整个过程。 ![electron gif](/img/how-to-connect/desktop-sdks/electron-app/preview.gif)

## 如何整合？

### 设置自定义协议

首先，您需要设置自定义协议名为 `casdoor`。

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

这将帮助浏览器打开您的electron应用程序并将登录信息发送到electron应用程序中。

### 通过浏览器打开登录网址

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

您可以更改前5个参数。

### 监听开启的应用程序事件

在您在浏览器成功登录后，浏览器将打开您的electron应用程序。 您需要监听打开的应用程序事件。

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

您可以从broswer获取代码，即`casdoor_code`或`params.code`。

### 解析代码并获取用户信息

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

最后，您可以解析代码，并按照[OAuth文档页面](/docs/how-to-connect/oauth)获取用户信息。
