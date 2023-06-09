---
title: Qt 桌面应用程序
description: 一个 Qt 桌面应用程序用于Casdoor的示例
keywords:
  - qt
  - sdk
authors:
  - cs1137195420
---

一个为 Casdoor的 [Qt桌面应用程序示例](https://github.com/casdoor/casdoor-cpp-qt-example)。

## 如何运行示例

### 前置要求

[Qt6 sdk](https://www.qt.io/download)

[OpenSSL 工具包](https://www.openssl.org/source/)

### 初始化

您需要初始化7个参数，它们都是字符串类型：

| 名称            | 描述                                                   | 文件             |
| ------------- | ---------------------------------------------------- | -------------- |
| endpoint      | 您的 Casdoor 服务器主机/域                                   | `mainwindow.h` |
| client_id     | 您的 Casdoor 应用程序的客户端 ID                               | `mainwindow.h` |
| client_secret | 您的Casdoor应用程序的客户端密钥                                  | `mainwindow.h` |
| certificate   | Casdoor 应用程序证书的公钥                                    | `mainwindow.h` |
| org_name      | 您的Casdoor应用程序的名称                                     | `mainwindow.h` |
| app_name      | 您的Casdoor应用程序的名称                                     | `mainwindow.h` |
| redirect_url  | 您的Casdoor 应用程序的回调URL路径将是 `casdoor://callback` 如果没有提供 | `mainwindow.h` |

如果您没有设置参数 `端点`，此项目将使用 [http://localhost:8000](http://localhost:8000) 作为默认Casdoor服务器。

### 运行

#### Qt Creator

1. 打开casdoor-cpp-qt-example.pro
2. 在casdoor-cpp-qt-example.pro中设置 OpenSSL 的 `INCLUDEPATH`
3. 按 Ctrl + R 开始

### 效果预览

在运行此Qt桌面应用程序后，您的桌面将显示一个新窗口。 ![索引](/img/how-to-connect/desktop-sdks/qt-app/index.png)

如果您点击 `Sign In`按钮，您的桌面将显示登录窗口。 ![登录](/img/how-to-connect/desktop-sdks/qt-app/login.png)

成功登录后，桌面上将显示一个用户配置文件窗口，它会显示您的信息。 ![用户个人资料](/img/how-to-connect/desktop-sdks/qt-app/userprofile.png)

您可以通过下面的 gif 图像预览整个过程。 ![预览 gif](/img/how-to-connect/desktop-sdks/qt-app/preview.gif)

## 如何整合？

### 打开登录窗口

```cpp
// Load and display the login page of Casdoor
m_webview->page()->load(*m_signin_url);
m_webview->show();
```

### 监听开启的应用程序事件

```cpp
// Initialize the TcpServer object and listen on port 8080
m_tcpserver = new QTcpServer(this);
if(!m_tcpserver->listen(QHostAddress::LocalHost, 8080)) {
    qDebug() << m_tcpserver->errorString();
    close();
}
connect(m_tcpserver, SIGNAL(newConnection()), this, SLOT(on_tcp_connected()));
```

### 使用认证码获取用户信息

```cpp
// Get token and parse it with the JWT library
std::string token = m_casdoor->GetOAuthToken(code.toStdString());
auto decoded = m_casdoor->ParseJwtToken(token);
```
