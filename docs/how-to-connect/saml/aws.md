---
title: Connect AWS Client VPN with SAML
sidebar_label: AWS Client VPN (SAML)
description: Use Casdoor as the SAML identity provider of AWS Client VPN, so that users sign in to the VPN with their Casdoor account.
keywords: [SAML, IdP, AWS, VPN]
authors: [UsherFall]
---

This guide explains how to use Casdoor as the SAML identity provider (IdP) of AWS Client VPN.

---

#### Learning outcomes

- Configure a Casdoor application for AWS Client VPN.
- Add Casdoor as a SAML identity provider in AWS IAM.
- Create a Client VPN endpoint that authenticates users through Casdoor.
- Connect to the VPN.

#### What you need

- An AWS account with the rights to configure IAM and VPC
- An Amazon VPC with an EC2 instance. See [Get started with Amazon VPC](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-getting-started.html) and [Get started with Amazon EC2](https://docs.aws.amazon.com/ec2/latest/userGuide/EC2_GetStarted.html). To test the connection, allow ICMP from the CIDR of the VPC in the security group of the instance.
- A private certificate in [AWS Certificate Manager (ACM)](https://aws.amazon.com/certificate-manager/). See the [AWS Client VPN administrator guide](https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html).
- A Windows or Mac computer with the [AWS Client VPN](https://aws.amazon.com/vpn/client-vpn-download/) application
- An [application](/docs/application/overview) in Casdoor

---

## Configure the Casdoor application

1. In the Casdoor admin console, open the edit page of the application.
1. Add `urn:amazon:webservices:clientvpn` to **Redirect URLs**.

   ![Redirect URLs with the AWS Client VPN identifier](/img/how-to-connect/saml/saml_aws_redirect_url.png)

1. Set **SAML reply URL** to `http://127.0.0.1:35001`.

   ![SAML reply URL for AWS Client VPN](/img/how-to-connect/saml/saml_aws_reply_url.png)

1. Save the **SAML metadata** as an XML file. You upload it to AWS in the next section.

   ![SAML metadata of the application](/img/how-to-connect/saml/saml_aws_metadata.png)

## Add Casdoor as an identity provider in AWS

1. In the IAM console, go to **Identity providers** and click **Create provider**.

   ![Create provider in the IAM console](/img/how-to-connect/saml/saml_aws_create.png)

1. Select **SAML**, enter a name for the provider, and upload the metadata file from Casdoor.

   ![Metadata upload in the IAM console](/img/how-to-connect/saml/saml_aws_choose_metadata.png)

1. Click **Next step**, and then **Create**.

## Create a Client VPN endpoint

1. In the VPC console, go to **Client VPN Endpoints** and click **Create Client VPN Endpoint**.

   ![Client VPN Endpoints in the VPC console](/img/how-to-connect/saml/saml_aws_vpn_endpoint.png)

1. In **Client IPv4 CIDR**, enter the address range for remote users.
1. In **Server certificate**, select your certificate from ACM.
1. Under **Authentication**, select **User-based authentication**, and then **Federated authentication**.
1. Select the SAML identity provider that you created.
1. Click **Create Client VPN Endpoint**.

   ![Client VPN endpoint settings](/img/how-to-connect/saml/saml_aws_create_vpn.png)

## Associate the endpoint with a VPC

1. Open the endpoint, go to **Target network associations**, and click **Associate target network**.
1. Select the VPC and the subnet.

   ![Target network association](/img/how-to-connect/saml/saml_aws_target_network.png)

## Add an authorization rule

This step is optional. It limits access to a network to one group of users.

1. Open the endpoint, go to **Authorization rules**, and click **Add authorize rule**.
1. In **Destination network**, enter the network of your EC2 instance, for example `172.31.16.0/20`.
1. Under **Grant access to**, select **Allow access to users in a specific access group** and enter the name of the group, for example `casdoor`.
1. Add the rule.

   ![Authorization rule](/img/how-to-connect/saml/saml_aws_rule.png)

## Verify the result {#connect-to-client-vpn}

1. In the VPC console, select the endpoint, wait until its state is `Available`, and click **Download Client Configuration**.

   ![Download Client Configuration](/img/how-to-connect/saml/saml_aws_download.png)

1. In the AWS Client VPN application, go to **File** > **Manage Profiles**, click **Add Profile**, and select the downloaded file.
1. Select the profile and click **Connect**. The Casdoor sign-in page opens in your browser. After you sign in, the VPN connects.

<video src="/video/saml_aws.mp4" controls="controls" width="100%"></video>

## See also

- [Use Casdoor as a SAML identity provider](/docs/how-to-connect/saml/overview)
