---
title: Tencent Cloud (SAML)
description: Use Casdoor as SAML IdP for Tencent Cloud CAM.
keywords: [SAML, IdP, Tencent Cloud]
authors: [Songjf-ttk]
---

This guide configures Casdoor as a SAML identity provider for **Tencent Cloud** (CAM).

## Get SAML metadata from Casdoor

1. In Casdoor, add an X.509 certificate (RSA).
2. Copy the **SAML metadata** from the application (or metadata URL).

![Add cert](/img/how-to-connect/saml/saml_tencent-cloud_cert.png)
![Copy Saml metadata](/img/how-to-connect/saml/saml_tencent-cloud_metadata.png)

## Add SAML IdP and role in Tencent Cloud

1. Log in to Tencent Cloud and open **Access Management** (CAM).
2. Create a new **Identity provider** and upload the Casdoor SAML metadata.
3. Create a new **Role** and select that identity provider.

![Login Access Management](/img/how-to-connect/saml/saml_tencent-cloud_access_management.png)
![Saml idp create](/img/how-to-connect/saml/saml_tencent-cloud_idp_create.png)
![Saml role create](/img/how-to-connect/saml/saml_tencent-cloud_create_role.png)

## Configure the application in Casdoor

1. On the application edit page, select the certificate and add the Tencent Cloud domain to **Redirect URLs**.
2. Set the **ACS URL** and configure **SAML attributes** as follows:

![Select cert and add redirect URLs](/img/how-to-connect/saml/saml_tencent-cloud_app.png)
![Add acs url and configure saml attribute](/img/how-to-connect/saml/saml_tencent-cloud_acs.png)

| Name | Name Format | Value |
|------|-------------|-------|
| `https://cloud.tencent.com/SAML/Attributes/Role` | Unspecified | `qcs::cam::uin/{'{'}AccountID{'}'}:roleName/{'{'}RoleName1{'}'};qcs::cam::uin/{'{'}AccountID{'}'}:roleName/{'{'}RoleName2{'}'},qcs::cam::uin/{'{'}AccountID{'}'}:saml-provider/{'{'}ProviderName{'}'}` |
| `https://cloud.tencent.com/SAML/Attributes/RoleSessionName` | Unspecified | `casdoor` |

:::info
Replace placeholders using:
- **{'{'}AccountID{'}'}**: Tencent Cloud account ID — [Account Information](https://console.cloud.tencent.com/developer)
- **{'{'}RoleName{'}'}**: Role name — [Roles](https://console.cloud.tencent.com/cam/role)
- **{'{'}ProviderName{'}'}**: SAML identity provider name — [Identity Providers](https://console.cloud.tencent.com/cam/idp)

See [Tencent Cloud SAML IdP documentation](https://cloud.tencent.com/document/product/598/38058).
:::

## Log in via SAML

Flow: User → Tencent Cloud (unauthenticated) → redirect to Casdoor → sign in → Tencent Cloud (authenticated). The initial redirect URL can be built from SAML metadata and IdP SSO URL. Example (Go) that fetches metadata, builds the auth URL, and prints it:

```go
func main() {
    res, err := http.Get("your casdoor application saml metadata url")
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
        ServiceProviderIssuer:       "https://cloud.tencent.com",
        AssertionConsumerServiceURL: "https://cloud.tencent.com/login/saml",
        SignAuthnRequests:           true,
        AudienceURI:                 "https://cloud.tencent.com",
        IDPCertificateStore:         &certStore,
        SPKeyStore:                  randomKeyStore,
    }

    println("Visit this URL To Authenticate:")
    authURL, err := sp.BuildAuthURL("")
    if err != nil {
        panic(err)
    }

    println(authURL)
}
```

After running the code, open the printed URL to test login.

![Final result](/img/how-to-connect/saml/saml_tencent-cloud_login_test.gif)
