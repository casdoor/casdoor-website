---
title: Zabbix
description: Using Casdoor for authentication in Zabbix
keywords: [Zabbix, Zabbix-saml]
authors: [Attack825]
---

Zabbix as a Service Provider (SP), while CASdoor acts as an Identity Provider (IdP). They communicate and collaborate through the SAML2 protocol to achieve single sign - on (SSO) functionality for users in Zabbix.

## Step 1: Deploy Casdoor and Zabbix

Firstly, deploy [Casdoor](/docs/basic/server-installation) and
[Zabbix](https://www.zabbix.com/documentation/current/en/manual).
After a successful deployment, make sure:

1. Casdoor can be logged in and used successfully.
2. You can successfully log in and use Zabbix.

## Step 2: Adding Certificates

To ensure the security of communication, certificates need to be configured between Zabbix and CASdoor. **Private keys and certificates** should be stored in the `/etc/zabbix/conf/certs/` directory, unless a custom path is provided in `zabbix.conf.php`.

By default, the `zabbix - web - nginx - mysql` Docker container looks for the following locations:

- `/etc/zabbix/conf/certs/sp.key` - SP private key file
- `/etc/zabbix/conf/certs/sp.crt` - SP certificate file
- `/etc/zabbix/conf/certs/idp.crt` - IDP certificate file

**Creating Certificates in CASdoor**: Log in to the CASdoor management interface and follow the system prompts to create two certificates. These two certificates will be used for communication encryption between Zabbix and CASdoor.

![1750407047596](/img/integration/php/Zabbix/1750407047596.png)

**Copying Certificates and Private Keys**: Copy the created certificate and private key files to the Zabbix configuration directory `/etc/zabbix/conf/certs`. If you are using Docker for deployment, you can map local certificate files to the container using volume mounting.

## Step 3:Configuring Zabbix

For SAML configuration in Zabbix, three required fields need to be set: `Single Sign - On`, `Issuer`, and `Public Certificate`.

Log in to the Zabbix management interface, click `User` -> `authentication` -> `SAML settings`.

![1750406319841](/img/integration/php/Zabbix/1750406319841.png)

Configure Zabbix according to the SAML metadata in the CASdoor configuration:

- idP entity ID (Issuer): Corresponds to `entityID="http://localhost:8000"`. This value identifies the entity ID of CASdoor, and Zabbix will communicate with CASdoor based on this ID.
- SSO service URL: Corresponds to `Location="http://localhost:8000/api/saml/redirect/admin/zabbix"`. This is the URL of the single sign - on service provided by CASdoor. When a user initiates a single sign - on request in Zabbix, they will be redirected to this URL for authentication.
- username attribute: The SAML attribute used as the username when logging in to Zabbix. Here, `Name` is used, indicating that Zabbix will use the `Name` attribute in the SAML assertion as the user's login name.
- SP entity ID: A unique SP ID that can be set arbitrarily. This ID is used to identify the Zabbix service provider and needs to be consistent with the configuration in CASdoor.

## Step 4: Configuring CASdoor

Some necessary configurations need to be made in CASdoor to ensure the normal operation of the integration with Zabbix.

**Editing Name and Logo**: Log in to the CASdoor management interface, find the relevant settings, and edit the application's name and logo for better presentation to users.

![1750406667233](/img/integration/php/Zabbix/1750406667233.png)

**Selecting a Certificate**: In CASdoor, select `zabbix_idp` as the certificate for signing and encrypting SAML messages to ensure communication security.

![1750406998796](/img/integration/php/Zabbix/1750406998796.png)

**Redirect URL**: Enter a unique name. In your SP (Zabbix), this may be called `Audience` or `Entity ID`. Ensure that the `Redirect URL` you enter here is consistent with that in your SP; otherwise, single sign - on may fail.

![1750406879193](/img/integration/php/Zabbix/1750406879193.png)

**Reply URL**: Enter the URL of the ACS (Assertion Consumer Service) for validating SAML responses. This URL is the address where Zabbix receives SAML assertions sent by CASdoor.

![1750406863896](/img/integration/php/Zabbix/1750406863896.png)

## Step 5: Creating a Zabbix User

Create a test user in Zabbix to verify the single sign - on functionality.

1. Log in to the Zabbix management interface and find the user management module.
2. Create a user with the username "test" (you can customize the username; this is just an example).

![1750404108955](/img/integration/php/Zabbix/1750404108955.png)

## Step 6: Creating a CASdoor User

Add a user in CASdoor with the same username as the one set in Zabbix.

1. Log in to the CASdoor management interface and find the user management module.
2. Add a new user with the same username as the one created in Zabbix.
3. Select Zabbix and enter the user's email address.

![1750475338005](/img/integration/php/Zabbix/1750475338005.png)

## Step 7: Zabbix Login Process

After completing the above configurations and user creation, you can test the single sign - on functionality.

Open a browser and visit `localhost/index.php`.

![1750404150026](/img/integration/php/Zabbix/1750404150026.png)

Click `Sign in with Single Sign - On(SAML)`.

You will be redirected to the CASdoor page. On the CASdoor page, enter the corresponding username and password to log in.

![1750406741644](/img/integration/php/Zabbix/1750406741644.png)

If the login is successful, you will be redirected back to `https://localhost:8080/zabbix.index.php`, indicating that the single sign - on functionality is working properly.

![1750406785499](/img/integration/php/Zabbix/1750406785499.png)

Through the above steps, you can successfully complete the integration of Zabbix and CASdoor and achieve single sign - on functionality for users. If you encounter any problems during the configuration process, please refer to relevant documentation or community forums for help.
