---
title: Overview
description: Using Casdoor as SAML IdP
keywords: [SAML, IdP]
---

Casdoor now can be used as SAML IdP. Up to now the Casdoor has supported the main feature of SAML 2.0 .

### Configuration in SP

Generally, SP needs the `Single Sign-On`, `Issuer` and `Public Certificate` three required fields. Most of the SP can get these fields by uploading the XML Metadata file or the XML Metadata URL to autocomplete.

The metadata of SAML endpoint in Casdoor is `<Endpoint of casdoor>/api/saml/metadata?application=admin/<application name>`.
Suppose the endpoint of Casdoor is `https://door.casdoor.com`, which contains an application called `app-built-in`. The XML Metadata endpoint will be:

```text
https://door.casdoor.com/api/saml/metadata?application=admin/app-built-in
```

And you can also find the metadata in the application edit page. Click the button to copy the URL and paste it in browser to download the XML Metadata.

![metadata](/img/how-to-connect/saml/saml_metadata.png)

### Configuration in Casdoor IdP

Casdoor supports both GET and POST `SAMLResponse`. Casdoor need to know what types of request the SP supports, when Casdoor sends the `SAMLResponse` to SP. You need to configure the application in casdoor based on the `SAMLResponse` type supported by your SP.

:::info
If you fill the `Reply URL`, Casdoor will send the `SAMLResponse` by **POST** Request. If the Reply URL is empty, Casdoor will use **GET** request.
You might wonder how casdoor knows the `Reply URL` of the SP, if the `Reply URL` is empty. Actually, Casdoor can get the
URL called `AssertionConsumerServiceURL` by parsing the `SAMLRequest`. And send the request with `SAMLResponse` to `AssertionConsumerServiceURL`.

The `Reply URL` will overwrites the `AssertionConsumerServiceURL` in `SAMLRequest`.
:::

- **Reply URL** Type in the URL of the ACS verifying the SAML response.
  
  ![Reply URL](/img/how-to-connect/saml/saml_replyURL.png)

- **Redirect URL** Type in a unique name. This may be called `Audience` or `Entity ID` in your SP. Make sure you fill the 
  same `Redirect URL` here as in your SP.
  
  ![Entity ID](/img/how-to-connect/saml/saml_entityId.png)

### User profile

After logged in successfully, the user profile in the `SAMLResponse` Casdoor returned has three fields. The attributes in 
the xml and the attributes of the user in casdoor are mapped as follows:

| XML Attribute Name |  User field   |
|:------------------:|:-------------:|
|       Email        |     email     |
|    DisplayName     |  displayName  |
|        Name        |     name      |

See <https://en.wikipedia.org/wiki/SAML_2.0> for more information about SAML and its different versions.

### An example

The [gosaml2](https://github.com/russellhaering/gosaml2) is a SAML 2.0 implementation for Service Providers based on etree and goxmldsig, a pure Go implementation of XML digital signatures. And we use this library to test the SAML 2.0 in Casdoor as below.

Suppose you can access Casdoor through `http://localhost:7001/`, and your Casdoor contains an application called `app-built-in` which belongs to an organization called `built-in`. The URLs, `http://localhost:6900/acs/example` and `http://localhost:6900/saml/acs/example`, should be added to the Redirect URLs in `app-built-in`.

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

Run the above codes and the console will display the following message.

```
Visit this URL To Authenticate:
http://localhost:7001/login/saml/authorize/admin/app-built-in?SAMLRequest=lFVbk6K8Fv0rFvNo2QR...
Supply:
  SP ACS URL      : http://localhost:6900/v1/_saml_callback
```

Click the URL to authenticate, the login page of Casdoor will display.

![login](/img/how-to-connect/saml/saml_login.png)

You will get the response messages as below after authenticating.

![response](/img/how-to-connect/saml/saml_response.png)
