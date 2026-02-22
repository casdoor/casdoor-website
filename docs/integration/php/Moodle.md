---
title: Moodle
description: Using OAuth to connect Moodle
keywords: [OAuth, Moodle, IDP]
authors: [jakiuncle]
---

[Casdoor](/docs/basic/server-installation) can be used to connect [Moodle](https://github.com/moodle/moodle) using OAuth.

The following are some configuration settings:

- `CASDOOR_HOSTNAME`: The domain name or IP where the Casdoor server is deployed.
- `Moodle_HOSTNAME`: The domain name or IP where Moodle is deployed.

## Step 1: Deploy Casdoor and Moodle

First, deploy [Casdoor](/docs/basic/server-installation) and [Moodle](https://github.com/moodle/moodle).

After successful deployment, ensure the following:

1. Casdoor can be logged in and used without issues.
2. You can set `CASDOOR_HOSTNAME` as `http://localhost:8000` when deploying Casdoor in `prod` mode. See [production mode](/docs/basic/server-installation#production-mode).

## Step 2: Configure Casdoor Application

1. Create a new Casdoor application or use an existing one.
2. Find the redirect URL: `<Moodle_HOSTNAME>/admin/oauth2callback.php`.
3. Add the redirect URL to the Casdoor application.

See [OAuth](/docs/how-to-connect/oauth).

## Step 3: Configure Moodle

1. Locate OAuth ![Find_OAuth](/img/integration/php/Moodle/OAuth2.png).
2. Configure this application ![configure](/img/integration/php/Moodle/Configure.png).
3. Configure this mapping ![Mapping](/img/integration/php/Moodle/Mapping.png).
4. Locate the OAuth2 plugin ![plugin](/img/integration/php/Moodle/Plugin.png).
5. Enable the OAuth2 plugin ![Enable](/img/integration/php/Moodle/Enable.png).
6. If you want to prevent the editing of Casdoor's email ![Fields](/img/integration/php/Moodle/Fields.png).

See [Moodle OAuth](https://docs.moodle.org/402/en/OAuth_2_authentication) and [Fields mapping](/docs/how-to-connect/oidc-client).

Log out of Moodle and test SSO.
![Login](/img/integration/php/Moodle/login.gif)
