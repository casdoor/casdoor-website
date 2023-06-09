---
title: 概述
description: 在 Casdoor 中使用webauthn
keywords:
  - webauthn
---

## 概述

我们很高兴地通知您，Casdoor现在支持通过 Webauthn 登录，这意味着： 您也许能够用您的生物识别来登录，例如指纹或脸识别，甚至是通过U磁盘登录，但前提是您的设备支持这些很酷的授权方法和 WebAuthn。

### 什么是 WebAuthn？

Web身份验证API(也称为WebAuthn) 是由W3C和FIDO编写的规范，谷歌、Mozilla、微软、Yubico等也参与其中。 API允许服务器使用公用钥匙加密而不是密码来注册和认证用户。 **它允许服务器与强大的身份验证器集成，现已编入设备，例如Windows Hello 或 Apple's Touch ID**。

简而言之，Webauthn要求用户生成公钥——私钥对，并将公钥移交给网站。 当用户想登录到网站时， Web 生成随机的数字，请用户用私钥加密，并将结果发送回来。 收到结果后，网站将尝试使用公钥解密， 并且如果解密后的数字与之前生成的随机数字相同。 该用户将会被视为合法用户，允许登录。 我们调用 Webauthn credential的公用钥匙与必要的信息(例如用户名或滥用信息的用户授权者) 这正是网站存储的内容。

公钥-私钥配对完全是独特独特的三个信息: (用户名、用户授权和网站URL)。 这意味着，如果(用户名、用户授权者和网站的URL) 是相同的，那么密钥对应该是相同的，反之亦然。

关于WebAuthn 技术的更多详细信息，您可以访问 <https://webauthn.guide/>。

### 如何在Casdoor中使用 Webauthn ？

在登录页面中，您必须已经看到使用 WebAuthn 登录的选择。 但考虑到您尚未获得Webauthn凭据(也就是webauth密码，这样说您可能更好地理解) 在这个教程中，我们将向您展示如何创建和管理凭据，如何再创作和管理以及如何使用凭据登录。

#### 第 0 步: 修改配置并打开webauthn身份验证

您可以在conf/app.conf 中查看

```ini
origin = "http://localhost:8000"
```

请确保此配置是您网站的 URL。

**只有https 支持webauthn，除非您正在使用本地主机**

然后作为管理员登录，然后转到您的应用程序的编辑页面。 打开开关"启用WebAuthn signin"。 默认情况下，此功能未启用。

#### 第 1 步：转到“我的帐户”页面

第 1 步：转到账户页面。 在这个页面，您可以看到"添加 WebAuthn Credential" 按钮和一个显示您以前注册过的所有Webauthn凭据的列表。

![Webauthn1](/img/webauthn/webauthn.png)

按下按钮，然后按照您设备的指示注册新凭据进入casdoor。

您可以通过列表中的“删除”按钮删除任何凭据。

#### 第 2 步：通过webauthn登录

在这个步骤开始之前，请确保您已经登出了casdoor。

转到页面登录，选择webauthn登录方式， 输入您的用户名并按登录按钮，然后按照您设备的说明操作。

(例如，如果您使用指纹和窗口Hello，您就会看到类似的东西)

![Webauthn2](/img/webauthn/login_webauthn.png)

然后您将看到您已经登录。
