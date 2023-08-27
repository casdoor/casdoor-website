---
title: Qt Desktop App
description: A Qt desktop app example for Casdoor
keywords: [qt, sdk]
authors: [cs1137195420]
---

A [Qt desktop app example](https://github.com/casdoor/casdoor-cpp-qt-example) for Casdoor.

## How to Run the Example

### Prerequisites

- [Qt6 SDK](https://www.qt.io/download)
- [OpenSSL toolkit](https://www.openssl.org/source/)

### Initialization

You need to initialize 7 string parameters:

| Name           | Description                                                                                             | File                  |
| -------------- | ------------------------------------------------------------------------------------------------------- | --------------------- |
| endpoint       | Your Casdoor server host/domain                                                                         | `mainwindow.h` |
| client_id      | The Client ID of your Casdoor application                                                               | `mainwindow.h` |
| client_secret  | The Client Secret of your Casdoor application                                                           | `mainwindow.h` |
| certificate    | The public key for the Casdoor application's cert                                                       | `mainwindow.h` |
| org_name       | The name of your Casdoor organization                                                                    | `mainwindow.h` |
| app_name       | The name of your Casdoor application                                                                    | `mainwindow.h` |
| redirect_url   | The path of the callback URL for your Casdoor application, will be `http://localhost:8080/callback` if not provided | `mainwindow.h` |

If you don't set the `endpoint` parameter, this project will use [http://localhost:8000](http://localhost:8000) as the default Casdoor server.

### Running the Application

#### Using Qt Creator

1. Open `casdoor-cpp-qt-example.pro`
2. Set the `INCLUDEPATH` of OpenSSL in `casdoor-cpp-qt-example.pro`
3. Press `Ctrl + R` to start

### Preview

After running this Qt desktop application, a new window will be shown on your desktop.

![index](/img/how-to-connect/desktop-sdks/qt-app/index.png)

If you click the `Sign In` button, a login window will be shown on your desktop.

![login](/img/how-to-connect/desktop-sdks/qt-app/login.png)

After a successful login, a user profile window will be shown on your desktop, displaying your user information.

![user profile](/img/how-to-connect/desktop-sdks/qt-app/userprofile.png)

You can preview the entire process in the following GIF image.

![preview gif](/img/how-to-connect/desktop-sdks/qt-app/preview.gif)

## How to Integrate

### Opening the Login Window

```cpp
// Load and display the login page of Casdoor
m_webview->page()->load(*m_signin_url);
m_webview->show();
```

### Listening to the Open Application Event

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
