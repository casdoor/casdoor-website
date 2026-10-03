---
title: Qt desktop app
description: Integrate Casdoor in a Qt (C++) desktop app with WebEngine.
keywords: [qt, sdk, C++]
authors: [cs1137195420]
---

The [casdoor-cpp-qt-example](https://github.com/casdoor/casdoor-cpp-qt-example) shows Casdoor sign-in in a Qt desktop app, using [casdoor-cpp-sdk](https://github.com/casdoor/casdoor-cpp-sdk).

## Run the example

### Prerequisites

- [Qt 6](https://www.qt.io/download) with the Qt WebEngine module (on Windows, use the MSVC build of Qt)
- CMake 3.16+ and a C++17 compiler
- [OpenSSL](https://www.openssl.org/source/) 1.1.1 or 3.x

CMake downloads casdoor-cpp-sdk when it configures the project, so the SDK doesn't need to be installed.

### Initialization

In Casdoor, add `http://localhost:8080/callback` to the application's **Redirect URLs**. Nothing needs to listen on that port: the example catches the redirect inside its embedded browser.

Set these 7 parameters:

| Name              | Description                                               | File       |
| ----------------- | --------------------------------------------------------- | ---------- |
| kCasdoorEndpoint  | Your Casdoor server URL, like `http://localhost:8000`     | `config.h` |
| kClientId         | The Client ID of your Casdoor application                 | `config.h` |
| kClientSecret     | The Client Secret of your Casdoor application             | `config.h` |
| kCertificate      | The public certificate of the cert your application uses | `config.h` |
| kOrganizationName | The name of your Casdoor organization                     | `config.h` |
| kApplicationName  | The name of your Casdoor application                      | `config.h` |
| kRedirectUri      | The redirect URL, `http://localhost:8080/callback`        | `config.h` |

### Running

**Qt Creator**

1. Open `CMakeLists.txt`
2. Press `Ctrl + R` to start

**Command line**

```bash
cmake -S . -B build -DCMAKE_PREFIX_PATH=/path/to/Qt/6.x/<compiler>
cmake --build build
./build/casdoor-cpp-qt-example
```

On Windows, if CMake can't find OpenSSL, add `-DOPENSSL_ROOT_DIR="C:/Program Files/OpenSSL-Win64"`.

### Preview

![index](/img/how-to-connect/desktop-sdks/qt-app/index.png)

Click **Sign In** to open the login window. After sign-in, the user profile is shown.

![login](/img/how-to-connect/desktop-sdks/qt-app/login.png)
![user profile](/img/how-to-connect/desktop-sdks/qt-app/userprofile.png)
![preview gif](/img/how-to-connect/desktop-sdks/qt-app/preview.gif)

## Integration

### Create the client

```cpp
#include <casdoor/casdoor.h>

casdoor::Config config;
config.endpoint = kCasdoorEndpoint;
config.client_id = kClientId;
config.client_secret = kClientSecret;
config.certificate = kCertificate;
config.organization_name = kOrganizationName;
config.application_name = kApplicationName;

casdoor::Client casdoor(config);
```

### Open the login window

```cpp
// A random state ties the callback to this sign-in attempt
m_state = QUuid::createUuid().toString(QUuid::WithoutBraces);
std::string signinUrl = m_casdoor.GetSigninUrl(kRedirectUri, m_state.toStdString());

m_webview->load(QUrl(QString::fromStdString(signinUrl)));
m_webview->show();
```

### Catch the callback

After sign-in, Casdoor redirects to the redirect URL with `code` and `state`. A `QWebEnginePage` subclass stops the embedded browser from loading that URL and hands it to the app:

```cpp
bool CallbackPage::acceptNavigationRequest(const QUrl& url, NavigationType type, bool isMainFrame)
{
    if (isMainFrame && url.adjusted(QUrl::RemoveQuery | QUrl::RemoveFragment) == m_redirectUri) {
        emit callbackReceived(url);
        return false;
    }
    return QWebEnginePage::acceptNavigationRequest(url, type, isMainFrame);
}
```

### Get the user info with the code

Check `state`, exchange the code for a token, then verify the token with the certificate:

```cpp
QUrlQuery query(url);
QString code = query.queryItemValue("code", QUrl::FullyDecoded);
QString state = query.queryItemValue("state", QUrl::FullyDecoded);
if (code.isEmpty() || state != m_state) {
    return;
}

try {
    casdoor::Token token = m_casdoor.GetOAuthToken(code.toStdString());
    casdoor::Claims claims = m_casdoor.ParseJwtToken(token.access_token);
    // claims.name, claims.display_name, claims.email, claims.owner, claims.payload ...
} catch (const casdoor::Error& e) {
    QMessageBox::warning(this, "Sign in failed", e.what());
}
```

`ParseJwtToken` throws `casdoor::Error` if the signature, expiry or audience of the token is invalid. See [casdoor-cpp-sdk](https://github.com/casdoor/casdoor-cpp-sdk) for the other APIs, such as refreshing tokens and managing users.
