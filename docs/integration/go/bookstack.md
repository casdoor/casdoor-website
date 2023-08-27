---
title: BookStack
description: Using Casdoor for authentication in BookStack
keywords: [BookStack]
authors: [leo220yuyaodog]
---

## Using Casdoor for authentication in BookStack

**[BookStack](https://www.bookstack.cn)** is an open-source book and document sharing site, as well as an open-source application developed using the Go language to help you better manage document reading.

BookStack-casdoor has been integrated with **Casdoor**, and you can now quickly get started with a simple configuration.

### Step 1: Create a Casdoor application

Go to your Casdoor and add a new application called **BookStack**. Here is an example of creating the BookStack application in Casdoor.

![bookstack_config.png](/img/integration/go/bookstack/config.png)

Please remember the `Name`, `Organization`, `client ID`, and `client Secret`. You will need them in the next step.

### Step 2: Configure Casdoor Login

Next, navigate to BookStack and find the file `oauth.conf.example`.

Rename `oauth.conf.example` to `oauth.conf` and **modify** the configuration. By default, the content is as follows:

```ini
[oauth]
casdoorOrganization = "<Organization>"
casdoorApplication = "bookstack"
casdoorEndpoint = http://localhost:8000
clientId = <client ID>
clientSecret = <client Secret>
redirectUrl = http://localhost:8181/login/callback
```

### Step 3: Fill in the `redirectUrl` in Casdoor

In the final step, go back to the page where you added the **BookStack application** and fill in the `Redirect URLs`. Make sure the `Redirect URL` is the same as the `redirectUrl` in the `oauth.conf` file.

![bookstack_callback](/img/integration/go/bookstack/callback.png)

**Now that you have completed the Casdoor configuration!**

You can now go back to your BookStack and experience using Casdoor for login authentication once you have successfully deployed BookStack.
