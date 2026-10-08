---
title: Sign users in to a Qt desktop app
sidebar_label: Qt desktop app
description: Run the Casdoor Qt example, which signs users in through Qt WebEngine and casdoor-cpp-sdk, and add the same flow to your own C++ app.
keywords: [qt, sdk, C++]
authors: [cs1137195420]
---

This guide explains how to run the Casdoor example for Qt and how to add the same sign-in flow to your own C++ app with [casdoor-cpp-sdk](https://github.com/casdoor/casdoor-cpp-sdk). The example shows the Casdoor sign-in page in an embedded browser.

---

#### Learning outcomes

- Configure and run the example app.
- Create a Casdoor client in C++.
- Open the sign-in page, catch the callback, and verify the token.

#### What you need

- [Qt 6](https://www.qt.io/download) with the Qt WebEngine module. On Windows, use the MSVC build of Qt.
- CMake 3.16 or later and a C++17 compiler
- [OpenSSL](https://www.openssl.org/source/) 1.1.1 or 3.x
- An [application](/docs/application/overview) in Casdoor

CMake downloads casdoor-cpp-sdk when it configures the project. You don't install the SDK yourself.

#### Sample code

- [casdoor-cpp-qt-example](https://github.com/casdoor/casdoor-cpp-qt-example)

---

## Run the example

1. In the Casdoor admin console, add `http://localhost:8080/callback` to the **Redirect URLs** of the application. Nothing has to listen on that port, because the example catches the redirect inside its embedded browser.
1. Clone [casdoor-cpp-qt-example](https://github.com/casdoor/casdoor-cpp-qt-example) and set the following values:

   | Name              | Description                                               | File       |
   | ----------------- | --------------------------------------------------------- | ---------- |
   | kCasdoorEndpoint  | Your Casdoor server URL, like `http://localhost:8000`     | `config.h` |
   | kClientId         | The Client ID of your Casdoor application                 | `config.h` |
   | kClientSecret     | The Client Secret of your Casdoor application             | `config.h` |
   | kCertificate      | The public certificate of the cert your application uses | `config.h` |
   | kOrganizationName | The name of your Casdoor organization                     | `config.h` |
   | kApplicationName  | The name of your Casdoor application                      | `config.h` |
   | kRedirectUri      | The redirect URL, `http://localhost:8080/callback`        | `config.h` |

1. Build and start the app.

   - In Qt Creator: Open `CMakeLists.txt` and press `Ctrl + R`.
   - On the command line:

     ```bash
     cmake -S . -B build -DCMAKE_PREFIX_PATH=/path/to/Qt/6.x/<compiler>
     cmake --build build
     ./build/casdoor-cpp-qt-example
     ```

     On Windows, if CMake can't find OpenSSL, add `-DOPENSSL_ROOT_DIR="C:/Program Files/OpenSSL-Win64"`.

1. In the app window, click **Sign In**.

   ![Main window of the example app](/img/how-to-connect/desktop-sdks/qt-app/index.png)

   The Casdoor sign-in page opens in a window.

   ![Casdoor sign-in window](/img/how-to-connect/desktop-sdks/qt-app/login.png)

1. Sign in. The app shows the profile of the user.

   ![User profile in the example app](/img/how-to-connect/desktop-sdks/qt-app/userprofile.png)

![Recording of the complete sign-in flow](/img/how-to-connect/desktop-sdks/qt-app/preview.gif)

## Add sign-in to your app

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

### Open the sign-in window

Generate a random `state`, build the sign-in URL, and load it in the embedded browser:

```cpp
// A random state ties the callback to this sign-in attempt
m_state = QUuid::createUuid().toString(QUuid::WithoutBraces);
std::string signinUrl = m_casdoor.GetSigninUrl(kRedirectUri, m_state.toStdString());

m_webview->load(QUrl(QString::fromStdString(signinUrl)));
m_webview->show();
```

### Catch the callback

After the user signs in, Casdoor redirects to the redirect URL with `code` and `state`. A subclass of `QWebEnginePage` stops the embedded browser from loading that URL and hands the URL to the app:

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

### Get the user from the code

Check `state`, exchange the code for a token, and verify the token with the certificate:

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

`ParseJwtToken` throws `casdoor::Error` if the signature, the expiry, or the audience of the token is invalid.

## Next steps

casdoor-cpp-sdk also refreshes tokens and manages users. See the [casdoor-cpp-sdk repository](https://github.com/casdoor/casdoor-cpp-sdk).

## See also

- [Casdoor SDKs](/docs/how-to-connect/sdk)
- [OAuth 2.0](/docs/how-to-connect/oauth)
