---
title: OpenID Connect Certification
description: How to become a certified or uncertified OpenID Connect implementation
keywords: [OpenID Connect, OIDC, certification, certified, uncertified, conformance]
authors: [copilot]
---

Casdoor is a fully compliant OpenID Connect (OIDC) implementation. This guide explains how to apply for OpenID Connect certification or register as an uncertified implementation with the OpenID Foundation.

## Overview

The OpenID Foundation provides two options for implementations:

1. **Certified OpenID Connect Implementation**: Demonstrates conformance through official testing
2. **Uncertified OpenID Connect Implementation**: Self-declaration of OIDC support without formal certification

## Why Pursue Certification?

Obtaining OpenID Connect certification or registering as an uncertified implementation provides several benefits:

- **Trust and Credibility**: Demonstrates commitment to standards compliance
- **Interoperability**: Ensures compatibility with other OIDC-compliant systems
- **Visibility**: Listed on the OpenID Foundation's directory of implementations
- **Quality Assurance**: Validates correct implementation of the OIDC specification

## Casdoor's OIDC Support

Casdoor fully implements the OpenID Connect protocol, including:

- **OIDC Discovery**: Available at `/.well-known/openid-configuration`
- **Authorization Code Flow**: Standard OAuth 2.0 authorization code flow
- **ID Token**: JWT-based identity tokens with RS256 signing
- **UserInfo Endpoint**: Provides user claims and profile information
- **JWKS Endpoint**: JSON Web Key Set for token verification
- **Standard Scopes**: Support for `openid`, `profile`, `email`, `address`, `phone`, and `offline_access`
- **Standard Claims**: Full support for OIDC standard claims

For more information about Casdoor's OIDC implementation, see the [Standard OIDC Client](/docs/how-to-connect/oidc-client) documentation.

## Option 1: Certified OpenID Connect Implementation

### Requirements

To become a certified OpenID Connect implementation, you must:

1. Pass the OpenID Connect conformance tests
2. Submit certification results to the OpenID Foundation
3. Pay certification fees (if applicable)
4. Maintain compliance with future updates

### Steps to Apply for Certification

#### Step 1: Review Certification Requirements

Visit the OpenID Foundation's certification page to understand the requirements:

- **Certification Page**: <https://openid.net/developers/certified/>
- **Conformance Suite**: <https://openid.net/certification/testing/>

Review the specific profiles and features your implementation supports:

- **Basic OP (OpenID Provider)**: Core OIDC functionality
- **Implicit OP**: Implicit flow support
- **Hybrid OP**: Hybrid flow support
- **Config OP**: Configuration and discovery support
- **Dynamic OP**: Dynamic client registration support

#### Step 2: Run Conformance Tests

The OpenID Foundation provides a conformance test suite to verify your implementation:

1. **Access the Test Suite**:
   - Visit <https://www.certification.openid.net/>
   - Create an account or log in

2. **Configure Test Instance**:
   - Set up your Casdoor instance for testing
   - Ensure it's publicly accessible (required for conformance testing)
   - Configure test application credentials

3. **Run Tests**:
   - Select the appropriate test plan (e.g., "OpenID Connect Core: Basic Certification Profile")
   - Configure the test with your Casdoor endpoints:
     - Issuer: `https://your-casdoor-instance.com`
     - Discovery URL: `https://your-casdoor-instance.com/.well-known/openid-configuration`
   - Execute the test suite

4. **Review Results**:
   - Address any failing tests
   - Iterate until all tests pass
   - Download the test results

#### Step 3: Submit Certification Application

Once you pass all conformance tests:

1. **Prepare Documentation**:
   - Test results and logs
   - Implementation details
   - Contact information
   - Organization details

2. **Submit Application**:
   - Follow the submission process at <https://openid.net/certification/submission/>
   - Include all required documentation
   - Pay certification fees (if applicable)

3. **Review Process**:
   - The OpenID Foundation will review your submission
   - You may be asked for additional information
   - Timeline varies based on submission queue

#### Step 4: Certification Approval

Upon approval:

- Your implementation will be listed on the [OpenID Certified implementations page](https://openid.net/developers/certified/)
- You can use the "OpenID Certified" mark
- You'll receive certification documentation

### Certification Maintenance

Certified implementations must:

- Maintain conformance with the specification
- Re-certify when major updates are made to the implementation
- Renew certification periodically (check current requirements)

## Option 2: Uncertified OpenID Connect Implementation

If you prefer not to pursue formal certification, you can register as an uncertified implementation.

### Benefits of Uncertified Registration

- **No Conformance Testing Required**: Self-declaration of OIDC support
- **No Certification Fees**: Free to register
- **Visibility**: Listed on the OpenID Foundation's directory
- **Flexibility**: Can register while working toward certification

### Steps to Register as Uncertified

#### Step 1: Verify OIDC Compliance

Before registering, ensure Casdoor properly implements:

- OIDC Discovery (`.well-known/openid-configuration`)
- Standard OIDC endpoints (authorization, token, userinfo)
- JWT token generation and validation
- Required OIDC scopes and claims

You can verify this by:

- Testing with standard OIDC client libraries
- Reviewing the [Standard OIDC Client documentation](/docs/how-to-connect/oidc-client)
- Testing with your own applications

#### Step 2: Register Your Implementation

1. **Visit the Uncertified Implementations Page**:
   - Go to <https://openid.net/developers/uncertified/>

2. **Complete the Registration Form**:
   - Implementation name: "Casdoor"
   - Organization name: "Casdoor"
   - Description of your implementation
   - OIDC Discovery URL: Your Casdoor instance's discovery endpoint
   - Contact information

3. **Submit Registration**:
   - Submit the form
   - Wait for confirmation from the OpenID Foundation

#### Step 3: Maintain Registration

Keep your registration information up to date:

- Update contact information if it changes
- Update discovery URL if your instance moves
- Consider upgrading to certified status in the future

## Testing Your OIDC Implementation

Whether pursuing certification or registering as uncertified, it's important to thoroughly test your OIDC implementation.

### Manual Testing

Test your Casdoor instance using standard OIDC flows:

1. **Discovery Endpoint**:

   ```bash
   curl https://your-casdoor-instance.com/.well-known/openid-configuration
   ```

2. **Authorization Flow**:
   - Test the complete authorization code flow
   - Verify redirect URIs and callbacks
   - Check ID token generation

3. **UserInfo Endpoint**:

   ```bash
   curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
     https://your-casdoor-instance.com/api/userinfo
   ```

4. **JWKS Endpoint**:

   ```bash
   curl https://your-casdoor-instance.com/.well-known/jwks
   ```

### Testing with OIDC Client Libraries

Use standard OIDC client libraries to test integration:

- **Go**: [go-oidc](https://github.com/coreos/go-oidc)
- **Java**: [pac4j-oidc](https://www.pac4j.org/docs/clients/openid-connect.html)
- **Python**: [python-openid-connect](https://github.com/zamzterz/Flask-pyoidc)
- **JavaScript**: [oidc-client-js](https://github.com/IdentityModel/oidc-client-js)

For a full list of OIDC client libraries, see:

- <https://oauth.net/code/>
- <https://openid.net/certified-open-id-developer-tools/>

### Self-Certification Testing (Recommended)

Even if not pursuing official certification, you can run the conformance tests to verify your implementation:

1. Access <https://www.certification.openid.net/>
2. Create a free account
3. Run the conformance tests against your Casdoor instance
4. Use the results to identify and fix any issues

## Resources

### OpenID Foundation Resources

- **OpenID Connect Specification**: <https://openid.net/specs/openid-connect-core-1_0.html>
- **Certified Implementations**: <https://openid.net/developers/certified/>
- **Uncertified Implementations**: <https://openid.net/developers/uncertified/>
- **Conformance Suite**: <https://www.certification.openid.net/>
- **Certification FAQ**: <https://openid.net/certification/faq/>

### Casdoor Resources

- [Standard OIDC Client](/docs/how-to-connect/oidc-client)
- [OAuth Documentation](/docs/how-to-connect/oauth)
- [Certificates](/docs/cert/overview)
- [Tokens](/docs/token/overview)

## Next Steps

1. **Decide Your Path**: Choose between certified or uncertified registration
2. **Test Your Implementation**: Verify OIDC compliance using the methods above
3. **Prepare Documentation**: Gather necessary information about your Casdoor instance
4. **Submit Application**: Follow the appropriate process for your chosen path
5. **Maintain Compliance**: Keep your implementation up to date with OIDC standards

## Getting Help

If you need assistance with OpenID Connect certification or have questions about Casdoor's OIDC implementation:

- **GitHub Discussions**: <https://github.com/casdoor/casdoor/discussions>
- **Discord Community**: <https://discord.gg/5rPsrAzK7S>
- **GitHub Issues**: <https://github.com/casdoor/casdoor/issues>
- **OpenID Foundation Support**: <https://openid.net/foundation/contact/>

## Conclusion

Whether you choose to pursue formal OpenID Connect certification or register as an uncertified implementation, both paths help validate Casdoor's commitment to standards compliance and interoperability. The certification process ensures that Casdoor meets the highest standards of OIDC implementation, while uncertified registration provides visibility and recognition without the formal testing requirements.
