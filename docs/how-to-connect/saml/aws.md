---
title: AWS Client VPN (SAML)
description: Use Casdoor as SAML IdP for AWS Client VPN.
keywords: [SAML, IdP, AWS, VPN]
authors: [UsherFall]
---

This guide configures Casdoor as a SAML identity provider for **AWS Client VPN**.

## Prerequisites

- AWS account with permission to configure the service
- Amazon VPC with an EC2 instance ([VPC setup](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-getting-started.html), [EC2](https://docs.aws.amazon.com/ec2/latest/userGuide/EC2_GetStarted.html)); in the instance security group, allow ICMP from the VPC CIDR for testing
- A private certificate in [AWS Certificate Manager (ACM)](https://aws.amazon.com/certificate-manager/) ([import guide](https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html))
- Windows or Mac with [AWS Client VPN](https://aws.amazon.com/vpn/client-vpn-download/) installed

## Configure the SAML application in Casdoor

- Set **Redirect URL** to `urn:amazon:webservices:clientvpn`.

![saml_aws_redirect_url.png](/img/how-to-connect/saml/saml_aws_redirect_url.png)

- Set **SAML reply URL** to `http://127.0.0.1:35001`.

![saml_aws_reply_url.png](/img/how-to-connect/saml/saml_aws_reply_url.png)

- Save the **SAML metadata** as an XML file for the next step.

![saml_aws_metadata.png](/img/how-to-connect/saml/saml_aws_metadata.png)

## Configure AWS

### Add Casdoor as an identity provider

1. In the **IAM** console, open **Identity providers** → **Create provider**.
2. Choose **SAML**, give the provider a name, and upload the metadata file from Casdoor.
3. Click **Next step** → **Create**.

![saml_aws_create.png](/img/how-to-connect/saml/saml_aws_create.png)
![saml_aws_choose_metadata.png](/img/how-to-connect/saml/saml_aws_choose_metadata.png)

### Create a Client VPN endpoint

1. In **VPC** → **Client VPN Endpoints** → **Create Client VPN Endpoint**.
2. Set **Client IPv4 CIDR** for remote users.
3. Select your **Server certificate** (from ACM).
4. Under **Authentication**, choose **User-based authentication** → **Federated authentication**.
5. Select the SAML identity provider you created.
6. Click **Create Client VPN Endpoint**.

![saml_aws_vpn_endpoint.png](/img/how-to-connect/saml/saml_aws_vpn_endpoint.png)
![saml_aws_create_vpn.png](/img/how-to-connect/saml/saml_aws_create_vpn.png)

### Associate the VPN with a VPC

1. In the endpoint, open **Target network associations** → **Associate target network**.
2. Select the VPC and subnet.

![saml_aws_target_network.png](/img/how-to-connect/saml/saml_aws_target_network.png)

### Authorization rules (optional)

1. Open **Authorization rules** → **Add authorize rule**.
2. Set **Destination network** (e.g. `172.31.16.0/20` for your EC2).
3. Under **Grant access to**, choose **Allow access to users in a specific access group** and enter the group name (e.g. `casdoor`).
4. Add the rule.

![saml_aws_rule.png](/img/how-to-connect/saml/saml_aws_rule.png)

## Connect to Client VPN

1. Select the endpoint (state: Available) → **Download Client Configuration**.
2. In the AWS Client VPN app: **File** → **Manage Profiles** → **Add Profile** → select the downloaded file.
3. Select the profile and click **Connect**.

![saml_aws_download.png](/img/how-to-connect/saml/saml_aws_download.png)

<video src="/video/saml_aws.mp4" controls="controls" width="100%"></video>
