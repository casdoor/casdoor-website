---
title: Qt Desktop App
description: An Qt desktop app example for Casdoor
keywords: [qt, sdk]
authors: [cs1137195420]
---

A [Qt desktop app example](https://github.com/casdoor/casdoor-cpp-qt-example) for Casdoor.

## How to run example

### Prerequisites

[Qt6 sdk](https://www.qt.io/download)

[OpenSSL toolkit](https://www.openssl.org/source/)

### Initialization

You need to initialize 7 parameters, which are all string type:

| Name         | Description                                                                                             | File                  |
| ------------ | ------------------------------------------------------------------------------------------------------- | --------------------- |
| endpoint       | Your Casdoor server host/domain                                                                         | `mainwindow.h` |
| client_id     | The Client ID of your Casdoor application                                                               | `mainwindow.h` |
| client_secret | The Client Secret of your Casdoor application                                                           | `mainwindow.h` |
| certificate      | The public key for the Casdoor application's cert                                                                    | `mainwindow.h` |
| org_name      | The name of your Casdoor organization                                                                    | `mainwindow.h` |
| app_name      | The name of your Casdoor application                                                                    | `mainwindow.h` |
| redirect_url  | The path of the callback URL for your Casdoor application, will be `http://localhost:8080/callback` if not provided | `mainwindow.h` |

If you don't set the parameter `endpoint`, this project will use the [http://localhost:8000](http://localhost:8000) as the defult Casdoor server.

### Running

#### Qt Creator

1. Open casdoor-cpp-qt-example.pro
2. Set the `INCLUDEPATH` of OpenSSL in casdoor-cpp-qt-example.pro
3. Press Ctrl + R to start

### Preview

After you run this Qt desktop application, a new window will be showed on your desktop.
![index](/img/how-to-connect/desktop-sdks/qt-app/index.png)

If you click `Sign In` botton, a login window will be showed on your desktop.
![login](/img/how-to-connect/desktop-sdks/qt-app/login.png)

After you login successfully, a user profile window will be showed on your desktop, it dispaly your user information.
![user profile](/img/how-to-connect/desktop-sdks/qt-app/userprofile.png)

You can preview the whole process by the gif image below.
![preview gif](/img/how-to-connect/desktop-sdks/qt-app/preview.gif)

## How to integrate

### Open the login window

```cpp
// Load and display the login page of Casdoor
m_webview->page()->load(*m_signin_url);
m_webview->show();
```

### Listen to the open application event

```cpp
// Initialize the TcpServer object and listen on port 8080
m_tcpserver = new QTcpServer(this);
if(!m_tcpserver->listen(QHostAddress::LocalHost, 8080)) {
    qDebug() << m_tcpserver->errorString();
    close();
}
connect(m_tcpserver, SIGNAL(newConnection()), this, SLOT(on_tcp_connected()));
```

### Use auth code to get the user info

```cpp
// Get token and parse it with the JWT library
std::string token = m_casdoor->GetOAuthToken(code.toStdString());
auto decoded = m_casdoor->ParseJwtToken(token);
```
