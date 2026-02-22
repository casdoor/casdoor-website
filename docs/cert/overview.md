---
title: Overview
description: Use certificates in Casdoor for JWT signing, SAML, and payment provider security.
keywords: [cert, certificate, JWT, RSA, ECDSA, SAML, payment]
authors: [hsluoyz]
---

Certificates in Casdoor hold cryptographic keys used to sign and verify tokens (e.g. JWT) and to secure integrations (SAML, payment providers).

## Certificate properties

Each certificate has:

- **Owner**: The organization that owns the certificate
- **Name**: The unique name of the certificate
- **CreatedTime**: When the certificate was created
- **DisplayName**: A human-readable name for the certificate
- **Scope**: The scope of the certificate (e.g., `JWT`, `SAML`, `Payment`)
- **Type**: The type of certificate (e.g., `x509`, `Payment`)
- **CryptoAlgorithm**: The cryptographic algorithm used (e.g., `RS256` for RSA, `ES256` for ECDSA)
- **BitSize**: The key size in bits (e.g., 2048, 4096)
- **ExpireInYears**: The expiration period of the certificate in years
- **Certificate**: The public certificate content
- **PrivateKey**: The private key content (stored securely)

## Certificate scopes

Certificates are used differently depending on their scope:

### JWT certificates

JWT certificates sign and verify JSON Web Tokens. When a user signs in, the access token is signed with the JWT certificate’s private key.

Casdoor supports both RSA and ECDSA signing algorithms for JWT tokens. While RSA (RS256, RS384, RS512) has been the traditional choice, ECDSA algorithms (ES256, ES384, ES512) offer smaller signature sizes and faster signature verification with equivalent security levels. This helps reduce token size on mobile or improve performance in high-throughput scenarios.

For JWT certificates, choose RSA or ECDSA based on security and compatibility. When configuring the Casdoor SDK, use the public key from the certificate edit page (copy or download).

![Certs Management](/img/how-to-connect/sdk/howto_cert_list.png)

![Certs Edit](/img/how-to-connect/sdk/howto_cert_edit.png)

After creating a JWT certificate, select it in your application settings:

![Certs Select](/img/how-to-connect/sdk/howto_cert_select.png)

### SAML certificates

SAML certificates sign and encrypt SAML assertions in SSO integrations.

**Use cases:**

- SAML-based SSO integrations
- Signing SAML responses
- Encrypting SAML assertions for security

For SAML, create certificates for both the Identity Provider (IdP) and Service Provider (SP) to secure communication.

For more information about SAML configuration, see the [SAML documentation](/docs/how-to-connect/saml/overview).

### Payment certificates

Payment certificates secure communication with payment providers (e.g. Alipay, WeChat Pay).

**Use cases:**

- Securing API communications with payment gateways
- Signing payment requests
- Verifying payment callbacks

For example, for Alipay create certificates for:

- **App Cert**: Contains the application's public certificate and private key
- **Root Cert**: Contains the payment provider's certificates

![Alipay App Cert](/img/providers/payment/alipay_app_cert.png)

See [Alipay](/docs/provider/payment/Alipay) and [WeChat Pay](/docs/provider/payment/WeChatPay) for details.

## Creating a certificate

To add a certificate:

1. Navigate to the **Certs** page in the Casdoor admin console
2. Click the **Add** button to create a new certificate
3. Fill in the required fields:
   - **Name**: A unique identifier for the certificate
   - **Display Name**: A human-readable name
   - **Scope**: Select the appropriate scope (JWT, SAML, Payment)
   - **Type**: Select the certificate type
   - **Crypto Algorithm**: Choose the cryptographic algorithm (e.g., RS256 for RSA, ES256 for ECDSA). For JWT certificates, both RSA and ECDSA algorithms are supported
   - **Bit Size**: Set the key size (typically 2048 or 4096 bits)
   - **Expire In Years**: Set the expiration period
4. Either:
   - Generate a new certificate automatically by saving the form
   - Upload an existing certificate and private key

## Using certificates

### In applications

After creating a JWT certificate, associate it with your application:

1. Go to the **Applications** page
2. Edit your application
3. In the **Cert** field, select the certificate you created
4. Save the application

The certificate will now be used to sign all tokens issued by that application.

### In SDK configuration

When configuring the Casdoor SDK in your backend, provide the public key from the JWT certificate:

```go
var CasdoorEndpoint = "https://door.casdoor.com"
var ClientId = "541738959670d221d59d"
var ClientSecret = "66863369a64a5863827cf949bab70ed560ba24bf"
var CasdoorOrganization = "casbin"
var CasdoorApplication = "app-casnode"

//go:embed token_jwt_key.pem
var JwtPublicKey string

func init() {
    auth.InitConfig(CasdoorEndpoint, ClientId, ClientSecret, JwtPublicKey, CasdoorOrganization, CasdoorApplication)
}
```

Download the public key from the certificate edit page in Casdoor.

For more information about SDK configuration, see the [SDK documentation](/docs/how-to-connect/sdk).

### In payment providers

When setting up payment providers, configure the appropriate certificates:

1. Create the required certificates (e.g., App Cert and Root Cert for Alipay)
2. Go to the **Providers** page
3. Edit or create your payment provider
4. In the **Cert** field, select the certificate you created
5. Save the provider

## Best practices

- **Key size:** Use at least 2048-bit keys for RSA; 4096-bit for higher security.
- **Expiration:** Set a reasonable lifetime (e.g. 1–5 years in production).
- **Security:** Never expose private keys in client code or public repos.
- **Rotation:** Rotate certificates before they expire.
- **Backup:** Store secure backups of certificates and private keys.
- **Separation:** Use separate certificates for JWT, SAML, and payment to limit blast radius if a key is compromised.

## Certificate management

Manage certificates via:

- **Web UI**: The Casdoor admin console provides a user-friendly interface for certificate management
- **API**: Use the [Casdoor REST API](https://door.casdoor.com/swagger/) to programmatically manage certificates
- **Data Initialization**: Certificates can be included in initialization files for automated deployments

For more information about data initialization, see the [Data Initialization documentation](/docs/deployment/data-initialization).
