---
title: Qt desktop app
description: Integrate Casdoor in a Qt (C++) desktop app with WebEngine.
keywords: [qt, sdk, C++]
authors: [cs1137195420]
---

The [casdoor-cpp-qt-example](https://github.com/casdoor/casdoor-cpp-qt-example) shows Casdoor sign-in in a Qt desktop app.

## Run the example

### Prerequisites

- [Qt 6](https://www.qt.io/download)
- [OpenSSL](https://www.openssl.org/source/)

### Initialization

Set these 7 string parameters:

| Name           | Description                                                                                             | File                  |
| -------------- | ------------------------------------------------------------------------------------------------------- | --------------------- |
| endpoint       | Your Casdoor server host/domain                                                                         | `mainwindow.h` |
| client_id      | The Client ID of your Casdoor application                                                               | `mainwindow.h` |
| client_secret  | The Client Secret of your Casdoor application                                                           | `mainwindow.h` |
| certificate    | The public key for the Casdoor application's cert                                                       | `mainwindow.h` |
| org_name       | The name of your Casdoor organization                                                                    | `mainwindow.h` |
| app_name       | The name of your Casdoor application                                                                    | `mainwindow.h` |
| redirect_url   | The path of the callback URL for your Casdoor application, will be `http://localhost:8080/callback` if not provided | `mainwindow.h` |

Default endpoint: `http://localhost:8000` if not set.

### Running

**Qt Creator**

1. Open `casdoor-cpp-qt-example.pro`
2. Set the `INCLUDEPATH` of OpenSSL in `casdoor-cpp-qt-example.pro`
3. Press `Ctrl + R` to start

### Preview

![index](/img/how-to-connect/desktop-sdks/qt-app/index.png)

Click **Sign In** to open the login window. After sign-in, the user profile is shown.

![login](/img/how-to-connect/desktop-sdks/qt-app/login.png)
![user profile](/img/how-to-connect/desktop-sdks/qt-app/userprofile.png)
![preview gif](/img/how-to-connect/desktop-sdks/qt-app/preview.gif)

## Integration

### Open the login window

```cpp
// Load and display the login page of Casdoor
m_webview->page()->load(*m_signin_url);
m_webview->show();
```

### Listen for the callback (TCP)

```cpp
// Initialize the TcpServer object and listen on port 8080
m_tcpserver = new QTcpServer(this);
if (!m_tcpserver->listen(QHostAddress::LocalHost, 8080)) {
    qDebug() << m_tcpserver->errorString();
    close();
}
connect(m_tcpserver, SIGNAL(newConnection()), this, SLOT(on_tcp_connected()));
```

### Using Auth Code to Get the User Info

```cpp
// Get the token and parse it with the JWT library
std::string token = m_casdoor->GetOAuthToken(code.toStdString());
auto decoded = m_casdoor->ParseJwtToken(token);
```
