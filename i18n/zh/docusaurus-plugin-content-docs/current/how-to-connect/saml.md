---
title: SAML
description: 使用 Casdoor 作为 SAML IdP
keywords:
  - SAML
  - IdP
authors:
  - seriouszyx
---

## 使用 Casdoor 作为 SAML IdP

Cassdoor 现在可以用作SAML的IdP。 目前Casdoor支持SAML2.0 的主要功能。

### 简介

Casdoor 的 SAML 端点的元数据是 `<Endpoint of casdoor>/api/saml/metdata ?application=<organization name>/<application name>`。 您也可以在应用程序编辑页面中找到元数据。

![元数据](/img/how-to-connect/saml/saml_metadata.png)

假设Cassdoor 的端点是 `https://door.casdoor.com `, 其中包含一个名为 `app-built-in` 属于一个名为 `built-in` 的应用程序。

更多关于 SAML 及其不同版本的信息，请访问 <https://en.wikipedia.org/wiki/SAML_2.0>

### 一个示例

[gosaml2](https://github.com/russellhaering/gosaml2) 是针对服务提供商的 SAML 2.0实现，基于etree和goxmldsig，这个XML数字签名是基于 Go 实现。 我们使用这个库在 Casdoor 中测试 SAML 2.0，如下所示。

假设Cassdoor 的端点是 `https://door.casdoor.com `, 其中包含一个名为 `app-built-in` 属于一个名为 `built-in` 的应用程序。 `http://localhost:6900/acs/example` 和`http://localhost:6900/saml/acs/example`，应添加到` app-built-in `的重定向URL中。

```go
import (
    "crypto/x509"
    "fmt"
    "net/http"

    "io/ioutil"

    "encoding/base64"
    "encoding/xml"

    saml2 "github.com/russellhaering/gosaml2"
    "github.com/russellhaering/gosaml2/types"
    dsig "github.com/russellhaering/goxmldsig"
)

func main() {
    res, err := http.Get("http://localhost:7001/api/saml/metadata?application=admin/app-built-in")
    if err != nil {
        panic(err)
    }

    rawMetadata, err := ioutil.ReadAll(res.Body)
    if err != nil {
        panic(err)
    }

    metadata := &types.EntityDescriptor{}
    err = xml.Unmarshal(rawMetadata, metadata)
    if err != nil {
        panic(err)
    }

    certStore := dsig.MemoryX509CertificateStore{
        Roots: []*x509.Certificate{},
    }

    for _, kd := range metadata.IDPSSODescriptor.KeyDescriptors {
        for idx, xcert := range kd.KeyInfo.X509Data.X509Certificates {
            if xcert.Data == "" {
                panic(fmt.Errorf("metadata certificate(%d) must not be empty", idx))
            }
            certData, err := base64.StdEncoding.DecodeString(xcert.Data)
            if err != nil {
                panic(err)
            }

            idpCert, err := x509.ParseCertificate(certData)
            if err != nil {
                panic(err)
            }

            certStore.Roots = append(certStore.Roots, idpCert)
        }
    }

    randomKeyStore := dsig.RandomKeyStoreForTest()

    sp := &saml2.SAMLServiceProvider{
        IdentityProviderSSOURL:      metadata.IDPSSODescriptor.SingleSignOnServices[0].Location,
        IdentityProviderIssuer:      metadata.EntityID,
        ServiceProviderIssuer:       "http://localhost:6900/acs/example",
        AssertionConsumerServiceURL: "http://localhost:6900/v1/_saml_callback",
        SignAuthnRequests:           true,
        AudienceURI:                 "http://localhost:6900/saml/acs/example",
        IDPCertificateStore:         &certStore,
        SPKeyStore:                  randomKeyStore,
    }

    http.HandleFunc("/v1/_saml_callback", func(rw http.ResponseWriter, req *http.Request) {
        err := req.ParseForm()
        if err != nil {
            rw.WriteHeader(http.StatusBadRequest)
            return
        }
        samlReponse := req.URL.Query().Get("SAMLResponse")
        assertionInfo, err := sp.RetrieveAssertionInfo(samlReponse)
        if err != nil {
            fmt.Println(err)
            rw.WriteHeader(http.StatusForbidden)
            return
        }
        fmt.Println(assertionInfo)
        if assertionInfo.WarningInfo.InvalidTime {
            fmt.Println("here12:", assertionInfo.WarningInfo.InvalidTime)
            rw.WriteHeader(http.StatusForbidden)
            return
        }

        if assertionInfo.WarningInfo.NotInAudience {
            fmt.Println(assertionInfo)
            fmt.Println("here13:", assertionInfo.WarningInfo.NotInAudience)
            rw.WriteHeader(http.StatusForbidden)
            return
        }

        fmt.Fprintf(rw, "NameID: %s\n", assertionInfo.NameID)

        fmt.Fprintf(rw, "Assertions:\n")

        for key, val := range assertionInfo.Values {
            fmt.Fprintf(rw, "  %s: %+v\n", key, val)
        }
        fmt.Println(assertionInfo.Values.Get("FirstName"))
        fmt.Fprintf(rw, "\n")

        fmt.Fprintf(rw, "Warnings:\n")
        fmt.Fprintf(rw, "%+v\n", assertionInfo.WarningInfo)
    })

    println("Visit this URL To Authenticate:")
    authURL, err := sp.BuildAuthURL("")
    if err != nil {
        panic(err)
    }

    println(authURL)

    println("Supply:")
    fmt.Printf("  SP ACS URL      : %s\n", sp.AssertionConsumerServiceURL)

    err = http.ListenAndServe(":6900", nil)
    if err != nil {
        panic(err)
    }
}
```

运行上述代码，控制台将显示以下消息。

```
Visit this URL To Authenticate:
http://localhost:7001/login/saml/authorize/admin/app-built-in?SAMLRequest=lFVbk6K8Fv0rFvNo2QR...
Supply:
  SP ACS URL      : http://localhost:6900/v1/_saml_callback
```

点击 URL 进行身份验证，将显示 Casdoor 的登录页面。

![登录](/img/how-to-connect/saml/saml_login.png)

验证后，您将获得如下响应消息。

![响应](/img/how-to-connect/saml/saml_response.png)

### Casdoor 作为一个 SAML IdP in Keycloak

本指南将向您展示如何配置 Casdoor 和 Keycloak 在Keycloak中将Casdoor 添加为SAML IdP。

#### 在 Keycloak 中添加 SAML IdP

打开Keycloak 管理页面, 点击 **身份提供商** 并从提供商列表中选择 **SAML v2.0**。

![saml_keycloak_idp_create](/img/how-to-connect/saml/saml_keycloak_idp_create.png)

:::info

您可以访问 Keycloak SAML 身份提供商 [文档](https://www.keycloak.org/docs/latest/server_admin/#saml-v2-0-identity-providers) 获取更多详细信息。

:::

输入 **别名** 和 **从 URL 导入** 在 Keycloak IdP 编辑页面中。 **Import from URL** 的内容可以在Casdoor应用程序编辑页面找到。 点击 **导入** 和 SAML 配置将自动填充。

![saml_keycloak_idp_edit](/img/how-to-connect/saml/saml_keycloak_idp_edit.png)

您应该记住 **服务供应商实体 ID** ，然后保存配置。

#### 配置 Casdoor 的 SAML 应用程序

在应用程序编辑页面中添加一个重定向URL，其内容是 **服务供应商实体 ID**。 您应该为Keycloak启用SAML压缩。

![saml_keycloak_compress](/img/how-to-connect/saml/saml_keycloak_compress.png)

#### 使用 Casdoor SAML 登录

打开Keycloak登录页面，并且您可以找到额外的按钮，允许您使用 Casdoor SAML 提供商登录到Keycloak。

![saml_keycloak_logn](/img/how-to-connect/saml/saml_keycloak_login.png)

点击按钮，您将被重定向到 Casdoor SAML 提供商进行身份验证。 验证成功后，您将被重定向到Keycloak。 然后您需要将用户分配到应用程序。

![saml_keycloak_success](/img/how-to-connect/saml/saml_keycloak_success.png)

我们还提供一个演示录像，以展示整个进程，我们希望这将对你们有所帮助。

<video src="/video/saml_keycloak.mp4" controls="controls" width="100%"></video>
