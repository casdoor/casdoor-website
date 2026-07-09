---
title: Kubernetes
description: Using Casdoor for Authentication in Kubernetes
keywords: [Kubernetes]
authors: [yehong-z]
---

According to the [Kubernetes documentation](https://kubernetes.io/docs/reference/access-authn-authz/authentication/),
the API Server of Kubernetes can be authenticated using OpenID Connect (OIDC).
This article will guide you on how to configure authentication in Kubernetes using Casdoor.

## Environment Requirements

Prerequisites:

- A Kubernetes cluster.
- A Casdoor application like this [demo website](https://demo.casdoor.com/).
- kubectl command tool (optional).

:::note

Kubernetes `oidc-issuer-url` only accepts URLs which use the `https://` prefix.
So your Casdoor application should be deployed on an HTTPS website.

:::

## Step 1: Creating a Casdoor App and User Account for Authentication

In Casdoor add an application (e.g. **Kubernetes**). Note **Name**, **Organization**, **Client ID**, and **Client secret**. Enable the grant types the cluster will use.

![Create an application in Casdoor](/img/integration/go/kubernetes/Kubernetes_1.png)
![Grant types](/img/integration/go/kubernetes/Kubernetes_3.png)

Add a user; set **Organization** and **Signup application** to the application you created.

![Add a user in Casdoor](/img/integration/go/kubernetes/Kubernetes_2.png)

## Step 2: Configure Kubernetes API Server with OIDC Authentication

To enable the OIDC plugin, set the following flags on the API server:

- `--oidc-issuer-url`: URL of the provider that allows the API server to discover public signing keys.
- `--oidc-client-id`: A client id that all tokens must be issued for.

This article uses minikube for demonstration.
Configure the OIDC plugin for the minikube API server
using the following command at startup:

```shell
minikube start --extra-config=apiserver.oidc-issuer-url=https://demo.casdoor.com --extra-config=apiserver.oidc-client-id=294b09fbc17f95daf2fe
```

## Step 3: Test OIDC Authentication

### Obtain Authentication Information

Due to the lack of a frontend in kubectl,
authentication can be performed by sending a POST request to the Casdoor server.
Here is the code in Python which sends a POST request to the Casdoor server
and retrieves the `id_token` and `refresh_token`:

```python
import requests
import json

url = "https://demo.casdoor.com/api/login/oauth/access_token"
payload = json.dumps({
   "grant_type": "password",
   "client_id": "Kubernetes",
   "client_secret": "72c65c3912aec24a9f3ec41b65a7577114ed2bae",
   "username": "user_3u94sf",
   "password": "123456"
})
response = requests.request("POST", url, data=payload)

print(response.text)
```

After executing this code, you should receive a response similar to the following:

```json
{
  "access_token": "xxx",
  "id_token": "yyy",
  "refresh_token": "zzz",
  "token_type": "Bearer",
  "expires_in": 72000,
  "scope": ""
}
```

Use the obtained `id_token` to authenticate with the Kubernetes API server.

### HTTP Request-Based Authentication

Add the token to the request header.

```shell
curl https://www.xxx.com -k -H "Authorization: Bearer $(id_token)"
```

- `https://www.xxx.com` is the Kubernetes API server deployment address.

### Kubectl Client-Based Authentication

#### Configuration File Method

Write the following configuration to the `~/.kube/config` file.
You should replace each configuration item in the configuration file above with the values you obtained earlier.

```yaml
users:
- name: minikube
  user:
    auth-provider:
      config:
        client-id: Kubernetes
        client-secret: 72c65c3912aec24a9f3ec41b65a7577114ed2bae
        id-token: $(id_token)
        idp-issuer-url: https://demo.casdoor.com
        refresh-token: $(refresh_token)
      name: oidc

```

Access the API server with kubectl.
Try running a test command.

```shell
kubectl cluster-info
```

#### Command Line Argument Method

Alternatively, pass the `id_token` in kubectl command-line parameters.

```shell
kubectl --token=$(id_token) cluster-info
```
