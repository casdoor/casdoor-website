---
title: Moodle
description: Using Oauth to connect Moodle
keywords:
  - Oauth
  - Moodle
  - IDP
authors:
  - jakiuncle
---

[Casdoor](/docs/basic/server-installation) can use Oauth to connect [Moodle](https://github.com/moodle/moodle).

The following are some of the names in the configuration:

`CASDOOR_HOSTNAME`: Domain name or IP where Casdoor server is deployed.

`Moodle_HOSTNAME`: Domain name or IP where Moodle is deployed.

## Step1. Deploy Casdoor and Moodle

Firstly, the [Casdoor](/docs/basic/server-installation) and [Moodle](https://github.com/moodle/moodle) should be deployed.

After a successful deployment, you need to ensure:

1. Casdoor can be logged in and used normally.
2. You can set CASDOOR_HOSTNAME = `http://localhost:8000`. When deploy Casdoor in `prod` mode. See [production mode](https://casdoor.org/docs/basic/server-installation#production-mode).

## Step2. Configure Casdoor application

1. Create or use an existing Casdoor application.
2. Find a redirect url: `Moddle_HOSTNAME`/admin/oauth2callback.php
3. Add your redirect url to casdoor application

More infomation for [OAuth](https://casdoor.org/docs/how-to-connect/oauth)

## Step3. Configure Moodle

1. You should find OAuth ![Find_OAuth](/img/integration/php/Moodle/OAuth2.png)
2. You should config this app ![configure](/img/integration/php/Moodle/Configure.png)
3. You should config this Mappling ![Mapping](/img/integration/php/Moodle/Mapping.png)
4. Find OAuth2 plugin ![plugin](/img/integration/php/Moodle/Plugin.png)
5. Enable OAuth2 plugin ![Enable](/img/integration/php/Moodle/Enable.png)
6. if you want Casdoor's email can't be edited ![Fields](/img/integration/php/Moodle/Fields.png)


More infomation for [Moodle](https://docs.moodle.org/402/en/OAuth_2_authentication) and [Fields mapping](https://casdoor.org/docs/how-to-connect/oidc-client)

Log out of Moodle, and test SSO. ![Login](/img/integration/php/Moodle/login.gif)
