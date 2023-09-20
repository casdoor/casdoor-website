---
title: Portainer
description: Using Casdoor for authentication in Portainer
keywords: [Portainer]
authors: [UsherFall]
---

## Using Casdoor for authentication in Portainer

[Portainer](https://www.portainer.io/) supports authentication via OAuth. Therefore, it is easy for users to use Casdoor to log in to Portainer. Only several steps and simple configurations are needed to achieve that.

Here is a tutorial on how to use Casdoor for authentication in Grafana. Before you proceed, please ensure that you have Portainer installed and running.

The following are the configuration names:

`CASDOOR_HOST`: The domain name or IP address where the Casdoor server is deployed.

`PORTAINER_HOST`: The domain name or IP address where Portainer is deployed.

## Step 1: Create an app for Portainer in Casdoor

Here is an example of creating an app in Casdoor:

![portainer_1](/img/integration/go/portainer/portainer_1.png)

1. Copy the client secret and client ID for the next step.

2. Add a Redirect URL. It's your Portainer host.

## Step 2: Configure Portainer

Expand the **Settings** from the left navigation bar, click on the **Authentication** option from this list.

1. Enable **Use SSO** and **Automatic user provisioning**.

![portainer_2](/img/integration/go/portainer/portainer_2.png)

2. Fill in the necessary information as follows:

![portainer_3](/img/integration/go/portainer/portainer_3.png)

- `Authorization URL`: **https://<CASDOOR_HOST>/login/oauth/authorize**

- `Access token URL`: **https://<CASDOOR_HOST>/api/login/oauth/access_token**

- `Resource URL`: **https://<CASDOOR_HOST>/api/userinfo**

- `Redirect URL`: **https://<PORTAINER_HOST>**

Log out of Portainer and test.

![Login](/img/integration/go/portainer/login.gif)
