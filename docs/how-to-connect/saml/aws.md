---
title: AWS Client VPN
description: Using Casdoor as a SAML IdP
keywords: [SAML, IdP]
authors: [UsherFall]
---

## Casdoor as a SAML IdP in AWS Client VPN

This guide will show you how to configure Casdoor and AWS Client VPN to add Casdoor as a SAML IdP in AWS Client VPN.

## Prerequisites

To complete this setup, you will need:

- An AWS Account with administrative rights to access configuration settings of the service provider.

- An Amazon VPC with an EC2 instance
  - [Setting up the VPC](https://docs.aws.amazon.com/zh_cn/vpc/latest/userguide/vpc-getting-started.html)
  - [Launching an EC2 instance](https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/EC2_GetStarted.html)
    - In the instance Security Group, allow ICMP traffic from the VPC CIDR range - this is needed for testing.

- A private certificate imported into [AWS Certificate Manager (ACM)](https://aws.amazon.com/cn/certificate-manager/)
  - [Generating and importing a certificate to ACM](https://docs.aws.amazon.com/zh_cn/vpn/latest/clientvpn-admin/what-is.html)

- A Windows or Mac system running the latest AWS Client VPN software.
  - [Download the software](https://aws.amazon.com/cn/vpn/client-vpn-download/)

## Configure SAML Application

- In the Casdoor Application, set the `Redirect URL` to `urn:amazon:webservices:clientvpn`.

![saml_aws_redirect_url.png](/img/how-to-connect/saml/saml_aws_redirect_url.png)

- Set the `SAML reply URL` to `http://127.0.0.1:35001`.

![saml_aws_reply_url.png](/img/how-to-connect/saml/saml_aws_reply_url.png)

- Save the content in the `SAML metadata` as an XML file.

![saml_aws_metadata.png](/img/how-to-connect/saml/saml_aws_metadata.png)

## Configure AWS

### Configure Casdoor as an AWS Identity Provider

1. Open the IAM console and select **Identity providers** from the navigation bar.

2. Click **Create a Provider**.

3. Specify SAML for the Provider Type, add a unique name for this provider, and upload the metadata document - the same file you saved from the Casdoor Application in the previous section.

4. Click **Next Step**. On the next screen, click **Create**.

![saml_aws_create.png](/img/how-to-connect/saml/saml_aws_create.png)

![saml_aws_choose_metadata.png](/img/how-to-connect/saml/saml_aws_choose_metadata.png)

### Create an AWS Client VPN Endpoint

1. Open the Amazon VPC console in an AWS Region of your choice.

2. On the left-hand side navigation, select **Client VPN Endpoints** under **Virtual Private Network (VPN)**.

3. Click **Create Client VPN Endpoint**.

4. Enter the IP range for your remote users in the **Client IPv4 CIDR** field to allocate an IP range.

5. For **Server Certificate ARN**, select the certificate you created.

6. For Authentication Options, select **Use user-based authentication**, then **Federated authentication**.

7. For **SAML provider ARN**, select the identity provider you created.

8. Click **Create Client VPN Endpoint**.

![saml_aws_vpn_endpoint.png](/img/how-to-connect/saml/saml_aws_vpn_endpoint.png)

![saml_aws_create_vpn.png](/img/how-to-connect/saml/saml_aws_create_vpn.png)

### Associate a Client VPN with a Target VPC

1. Select **Target network associations** in the Client VPN options, then click **Associate target network**.

2. From the drop-down menu, select the target VPC and subnet you want to associate your endpoint with.

![saml_aws_target_network.png](/img/how-to-connect/saml/saml_aws_target_network.png)

### Configure SAML Group-Specific Authorization

1. Choose the **Authorization rules** tab in your Client VPN options and click **Add Authorize rule**.

2. For Destination network to enable, specify the IP address of your EC2 instance created in the prerequisites. For example, `172.31.16.0/20`.

3. Under Grant access to, select **Allow access to users in a specific access group**. For example, `casdoor`.

4. Provide an optional description and click **Add authorization rule**.

![saml_aws_rule.png](/img/how-to-connect/saml/saml_aws_rule.png)

## Connect to Client VPN

1. Select the Client VPN endpoint you just created. It should now be in the Available state.

2. Click **Download Client Configuration** to download the configuration profile to your desktop.

3. Open the AWS Client VPN desktop app on your machine.

4. In the top menu, select File and Manage Profiles.

5. Click Add Profile and point to the recently downloaded file.

6. You should now see the profile in the list on the AWS Client VPN software. Select it and click Connect.

![saml_aws_download.png](/img/how-to-connect/saml/saml_aws_download.png)

<video src="/video/saml_aws.mp4" controls="controls" width="100%"></video>
