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

![Create Certificate](/img/integration/php/Zabbix/create_certificate.png)

**Copying Certificates and Private Keys**: Copy the created certificate and private key files to the Zabbix configuration directory `/etc/zabbix/conf/certs`. If you are using Docker for deployment, you can map local certificate files to the container using volume mounting.

## Step 3:Configuring Zabbix

For SAML configuration in Zabbix, three required fields need to be set: `Single Sign - On`, `Issuer`, and `Public Certificate`.

Log in to the Zabbix management interface, click `User` -> `authentication` -> `SAML settings`.

![Zabbix configuration](/img/integration/php/Zabbix/zabbix_configuration.png)

Configure Zabbix according to the SAML metadata in the CASdoor configuration:

- idP entity ID (Issuer): Corresponds to `entityID="http://localhost:8000"`. This value identifies the entity ID of CASdoor, and Zabbix will communicate with CASdoor based on this ID.
- SSO service URL: Corresponds to `Location="http://localhost:8000/api/saml/redirect/admin/zabbix"`. This is the URL of the single sign - on service provided by CASdoor. When a user initiates a single sign - on request in Zabbix, they will be redirected to this URL for authentication.
- username attribute: The SAML attribute used as the username when logging in to Zabbix. Here, `Name` is used, indicating that Zabbix will use the `Name` attribute in the SAML assertion as the user's login name.
- SP entity ID: A unique SP ID that can be set arbitrarily. This ID is used to identify the Zabbix service provider and needs to be consistent with the configuration in CASdoor.

## Step 4: Configuring CASdoor

Some necessary configurations need to be made in CASdoor to ensure the normal operation of the integration with Zabbix.

**Editing Name and Logo**: Log in to the CASdoor management interface, find the relevant settings, and edit the application's name and logo for better presentation to users.

![Application Information](/img/integration/php/Zabbix/application_information.png)

**Selecting a Certificate**: In CASdoor, select `zabbix_idp` as the certificate for signing and encrypting SAML messages to ensure communication security.

![Selecting a Certificate](/img/integration/php/Zabbix/select_certificate.png)

**Redirect URL**: Enter a unique name. In your SP (Zabbix), this may be called `Audience` or `Entity ID`. Ensure that the `Redirect URL` you enter here is consistent with that in your SP; otherwise, single sign - on may fail.

![Redirect URL](/img/integration/php/Zabbix/redirect_url.png)

**Reply URL**: Enter the URL of the ACS (Assertion Consumer Service) for validating SAML responses. This URL is the address where Zabbix receives SAML assertions sent by CASdoor.

![Reply URL](/img/integration/php/Zabbix/reply_url.png)

## Step 5: Creating a Zabbix User

Create a test user in Zabbix to verify the single sign - on functionality.

1. Log in to the Zabbix management interface and find the user management module.
2. Create a user with the username "test" (you can customize the username; this is just an example).

![Creating a Zabbix User](/img/integration/php/Zabbix/create_zabbix_user.png)

## Step 6: Creating a CASdoor User

Add a user in CASdoor with the same username as the one set in Zabbix.

1. Log in to the CASdoor management interface and find the user management module.
2. Add a new user with the same username as the one created in Zabbix.
3. Select Zabbix and enter the user's email address.

![Creating a CASdoor User](/img/integration/php/Zabbix/create_casdoor_user.png)

## Step 7: Zabbix Login Process

After completing the above configurations and user creation, you can test the single sign - on functionality.

Open a browser and visit `localhost/index.php`.

![Login Process1](/img/integration/php/Zabbix/login_process1.png)

Click `Sign in with Single Sign - On(SAML)`.

You will be redirected to the CASdoor page. On the CASdoor page, enter the corresponding username and password to log in.

![Login Process2](/img/integration/php/Zabbix/login_process2.png)

If the login is successful, you will be redirected back to `https://localhost:8080/zabbix.index.php`, indicating that the single sign - on functionality is working properly.

![Login Process3](/img/integration/php/Zabbix/login_process3.png)

Through the above steps, you can successfully complete the integration of Zabbix and CASdoor and achieve single sign - on functionality for users. If you encounter any problems during the configuration process, please refer to relevant documentation or community forums for help.
