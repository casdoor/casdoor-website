---
title: Connect Tencent Cloud with SAML
sidebar_label: Tencent Cloud (SAML)
description: Use Casdoor as the SAML identity provider of Tencent Cloud Access Management (CAM), so that users sign in to Tencent Cloud in a role.
keywords: [SAML, IdP, Tencent Cloud]
authors: [Songjf-ttk]
---

This guide explains how to use Casdoor as the SAML identity provider (IdP) of Tencent Cloud. Users sign in to Casdoor and enter Tencent Cloud in a role of Cloud Access Management (CAM).

---

#### Learning outcomes

- Get the SAML metadata of a Casdoor application.
- Add Casdoor as an identity provider and create a role in Tencent Cloud.
- Send the role to Tencent Cloud in SAML attributes.
- Build the sign-in URL and test the sign-in.

#### What you need

- A Tencent Cloud account with access to CAM
- An [application](/docs/application/overview) in Casdoor

---

## Get the SAML metadata from Casdoor

1. In the Casdoor admin console, add an X.509 certificate with the RSA algorithm. See [Certificates](/docs/cert/overview).

   ![Certificate edit page in Casdoor](/img/how-to-connect/saml/saml_tencent-cloud_cert.png)

1. Open the edit page of the application and copy the **SAML metadata**.

   ![SAML metadata of the application](/img/how-to-connect/saml/saml_tencent-cloud_metadata.png)

## Add the IdP and a role in Tencent Cloud

1. Sign in to Tencent Cloud and open **Access Management**.

   ![Access Management in the Tencent Cloud console](/img/how-to-connect/saml/saml_tencent-cloud_access_management.png)

1. Create an identity provider and upload the SAML metadata from Casdoor.

   ![New identity provider in Tencent Cloud](/img/how-to-connect/saml/saml_tencent-cloud_idp_create.png)

1. Create a role and select that identity provider for it.

   ![New role in Tencent Cloud](/img/how-to-connect/saml/saml_tencent-cloud_create_role.png)

## Configure the Casdoor application {#configure-the-application-in-casdoor}

1. On the edit page of the application, select the certificate in **Cert** and add the Tencent Cloud domain to **Redirect URLs**.

   ![Certificate and Redirect URLs of the application](/img/how-to-connect/saml/saml_tencent-cloud_app.png)

1. Set **SAML reply URL** to the ACS URL of Tencent Cloud, and add the following rows to **SAML attributes**:

   | Name | Name Format | Value |
   |------|-------------|-------|
   | `https://cloud.tencent.com/SAML/Attributes/Role` | Unspecified | `qcs::cam::uin/<AccountID>:roleName/<RoleName1>;qcs::cam::uin/<AccountID>:roleName/<RoleName2>,qcs::cam::uin/<AccountID>:saml-provider/<ProviderName>` |
   | `https://cloud.tencent.com/SAML/Attributes/RoleSessionName` | Unspecified | `casdoor` |

   ![SAML reply URL and SAML attributes of the application](/img/how-to-connect/saml/saml_tencent-cloud_acs.png)

1. Replace the placeholders in the first value:

   | Placeholder | Value | Where to find it |
   |---|---|---|
   | `<AccountID>` | ID of your Tencent Cloud account | [Account Information](https://console.cloud.tencent.com/developer) |
   | `<RoleName1>`, `<RoleName2>` | Name of the role | [Roles](https://console.cloud.tencent.com/cam/role) |
   | `<ProviderName>` | Name of the SAML identity provider | [Identity Providers](https://console.cloud.tencent.com/cam/idp) |

1. Save the application.

For the format of the attributes, see the [Tencent Cloud documentation on SAML identity providers](https://cloud.tencent.com/document/product/598/38058).

## Verify the result {#log-in-via-saml}

A user who opens Tencent Cloud without a session is redirected to Casdoor, signs in there, and returns to Tencent Cloud in the role. You build the first redirect URL from the SAML metadata. The following Go program fetches the metadata, builds the URL, and prints it:

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

Run the program and open the printed URL. After you sign in to Casdoor, the Tencent Cloud console opens.

![Recording of the sign-in to Tencent Cloud through Casdoor](/img/how-to-connect/saml/saml_tencent-cloud_login_test.gif)

## See also

- [Use Casdoor as a SAML identity provider](/docs/how-to-connect/saml/overview)
