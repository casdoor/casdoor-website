---
title: BookStack
description: Using Casdoor for authentication in BookStack
keywords: [BookStack]
---

## Using Casdoor for authentication in BookStack
**[BookStack](https://www.bookstack.cn)**  is an open source book and document sharing site,
as well as an open source application developed using the Go language to help you better achieve document reading management.

Bookstack-casdoor has been integrated with **Casdoor**, and you can now start quickly with a simple configuration.

### Step1. Create an Casdoor application
Go to your Casdoor and add your new application **BookStack**. Here is an **example** of creating the BookStack application in Casdoor.

![bookstack_config.png](/img/integration/bookstack_config.png)
Please remember the `Name`, `Organization`, `client ID`, and `client Secret`. You will use them in next step.
 
### Step2. Configure Casdoor Login 
Now, please move to the BookStack.  Find the file: `oauth.conf.example`.

Rename `oauth.conf.example` to `oauth.conf` and **modify** the configuration. The content of which by default is:
```ini
[oauth]

casdoorOrganization =  <"Organization">
casdoorApplication = "bookstack"              
casdoorEndpoint = http://localhost:8000 
clientId =   <client ID>
clientSecret =  <client Secret>
redirectUrl = http://localhost:8181/login/callback 

```

### Step3. Fill in the `redirectUrl` in Casdoor
The last step, go back to the page where you added the **BookStack application**, and fill in the `Redirect URLs`.
Make sure the `Redirect URL` is the same as the `redirectUrl` in the file `oauth.conf`.
![bookstack_callback](/img/integration/bookstack_callback.png)

**Now that you've done all the configuration for Casdoor!**

 go back to your BookStack and experience using casdoor for login authentication once the BookStack has been successfully deployed.

