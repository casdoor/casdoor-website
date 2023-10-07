---
title: WeCom
description: Using WeCom Syncer to synchronize databases
keywords: [syncer, database]
authors: [UsherFall]
---

## WeCom Syncer

By using WeCom syncer, you can sync WeCom user and department data to Casdoor's user table and group table.

The following fields are required:

- `Organization`: The organization that the user will be imported to
- `Name`: The syncer's name
- `Type`: Select "WeCom"
- `User`: Your WeCom Company ID
- `Password`: Your WeCom App secret
- `ClientSecret`: Your WeCom Sync of Contacts secret

Follow the steps below to configure.

### Step 1: Get WeCom Syncer configuration items

- In your WeCom management platform, navigate to **My Company**, get `Company ID` in **Company Information**.

![wecom_corpid](/img/syncer/WeCom/syncer_wecom_corpid.png)

- In your Self-build App, get `App secret`.

![wecom_app](/img/syncer/WeCom/syncer_wecom_app.png)

- In Sync of Contacts Management Tool, get `Sync of Contacts secret`.

![wecom_contact](/img/syncer/WeCom/syncer_wecom_contact.png)

### Step2: Config Casdoor WeCom Syncer

Go to Syncers tab, select `WeCom` type and fill in the required information as shown below. Then, save the changes.

![wecom_provider](/img/syncer/WeCom/syncer_wecom_provider.png)
