---
title: MinIO
description: Configuring Casdoor as an identity provider to support MinIO
keywords: [MinIO]
authors: [Abingcbc]
---

[MinIO](https://github.com/minio/minio) supports external identity management using an OpenID Connect (OIDC)-compatible provider. This document covers the configuration of Casdoor as an identity provider to support MinIO.

## Step 1: Deploy Casdoor & MinIO

First, deploy Casdoor.

You can refer to the Casdoor official documentation for [Server Installation](/docs/basic/server-installation).

After a successful deployment, make sure that:

- The Casdoor server is running on **<http://localhost:8000>**.
- Open your favorite browser and visit **<http://localhost:7001>** to see the login page of Casdoor.
- Test the login functionality by entering `admin` and `123`.

Next, you can quickly implement a Casdoor-based login page in your own app by following these steps.

You can refer to [here](https://github.com/minio/minio#minio-quickstart-guide) to deploy your MinIO server and [here](https://docs.min.io/minio/baremetal/reference/minio-mc.html#install-mc) for the MinIO client called `mc`.

## Step 2: Configure Casdoor Application

1. Create a new Casdoor application or use an existing one.
2. Add your redirect URL.
![Casdoor Application Setting](/img/integration/appsetting_spring_security.png)
3. Add the provider you want and provide any necessary settings.

    On the application settings page, you will find two values: `Client ID` and `Client secret` (as shown in the picture above). We will use these values in the next step.

    Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration** to see the OIDC configuration of Casdoor.

4. This step is necessary for MinIO. As MinIO needs to use a claim attribute in JWT for its policy, you should configure it in Casdoor as well. Currently, Casdoor uses `tag` as a workaround for configuring MinIO's policy.

    ![MinIO Policy Setting](/img/integration/go/minio/minio_policy.png)

    You can find all the supported policies [here](https://docs.min.io/minio/baremetal/security/minio-identity-management/policy-based-access-control.html#minio-policy).

## Step 3: Configure MinIO

You can start a MinIO server using the following commands:

```shell
export MINIO_ROOT_USER=minio
export MINIO_ROOT_PASSWORD=minio123
minio server /mnt/export
```

You can use the `--console-address` parameter to configure the address and port.

Next, add a service alias using the MinIO client `mc`.

```bash
mc alias set myminio <Your console address> minio minio123
```

Now, configure the OpenID Connect of MinIO. For Casdoor, the command will be:

```bash
mc admin config set myminio identity_openid config_url="http://CASDOOR_HOSTNAME/.well-known/openid-configuration" client_id=<client id> client_secret=<client secret> claim_name="tag"
```

You can refer to the [official document](https://docs.min.io/minio/baremetal/reference/minio-server/minio-server.html#openid-identity-management) for more detailed parameters.

Once successfully set, restart the MinIO instance.

```bash
mc admin service restart myminio
```

## Step 4: Try the demo!

Now, open your MinIO console in the browser and click on `Login with SSO`.

You will be redirected to the Casdoor user login page. Upon successful login, you will be redirected to the MinIO page and logged in automatically. You should now see the buckets and objects that you have access to.

:::caution

If you deploy the frontend and backend of Casdoor on different ports, the login page you are redirected to will be on the backend port and it will display `404 not found`. You can modify the port to the frontend one. Then you can access the Casdoor login page successfully.

:::
