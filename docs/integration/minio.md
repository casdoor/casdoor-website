---
sidebar_position: 1
title: MinIO
---

[MinIO](https://github.com/minio/minio) supports external identity management using an OpenID Connect (OIDC) -compatible provider. This document covers configuring Casdoor as identity provider to support with MinIO.

## Step1. Deploy Casdoor & MinIO

Firstly, the Casdoor should be deployed. 

You can refer to the Casdoor official documentation for the [Server Installation](/docs/basic/server-installation).

After a successful deployment, you need to ensure:

- The Casdoor server is successfully running on **http://localhost:8000**.
- Open your favorite browser and visit **http://localhost:7001**, you will see the login page of Casdoor.
- Input `admin` and `123` to test login functionality is working fine.

Then you can quickly implement a casdoor based login page in your own app with the following steps.

You can refer to [here](https://github.com/minio/minio#minio-quickstart-guide) to deploy your MinIO server and [here](https://docs.min.io/minio/baremetal/reference/minio-mc.html#install-mc) for MinIO client called `mc`.

## Step2. Configure Casdoor Application

1. Create or use an existing Casdoor application.
2. Add Your redirect url
![Casdoor Application Setting](/img/appsetting_spring_security.png)
3. Add provider you want and supplement other settings.

Not surprisingly, you can get two values ​​on the application settings page: `Client ID` and `Client secret` like the picture above, we will use them in next step.

Open your favorite browser and visit: **http://`CASDOOR_HOSTNAME`/.well-known/openid-configuration**, you will see the OIDC configure of Casdoor.

4. This step is necessary for MinIO. As MinIO needs to use a claim attribute in JWT for its policy, you should configure it in casdoor as well. Currently, casdoor uses `tag` as a workaround for configuring MinIO's policy. 

![MinIO Policy Setting](/img/minio_policy.png)

You can find all supported policies [here](https://docs.min.io/minio/baremetal/security/minio-identity-management/policy-based-access-control.html#minio-policy).

## Step3. Configure MinIO

You can start a MinIO server by following commands:

```shell
export MINIO_ROOT_USER=minio
export MINIO_ROOT_PASSWORD=minio123
minio server /mnt/export
```

You can use parameter `--console-address` to configure the address and port.

Then you can add a service alias by MinIO client `mc`.

```
mc alias set myminio <You console address> minio minio123
```

Now, you can configure OpenID connect of MinIO. For Casdoor, the command is like following:

```
mc admin config set myminio identity_openid config_url="http://CASDOOR_HOSTNAME/.well-known/openid-configuration" client_id=<client id> client_secret=<client secret> claim_name="tag"
```

You can refer to [offical document](https://docs.min.io/minio/baremetal/reference/minio-server/minio-server.html#openid-identity-management) for more detailed parameters.

Once successfully set restart the MinIO instance.

```
mc admin service restart myminio
```

## Step4. Try the demo!

Now, you can open your MinIO console on the browser and click on `Login with SSO`. 

You will be redirected to the casdoor user login page, upon successful login you will be redirected to MinIO page and logged in automatically, you should see now the buckets and objects they have access to.

:::caution

If you deploy frontend and backend of casdoor in different ports, the login page you are redirected to will be backend port and it will display `404 not found`. You can modify the port to the frontend one. Then you can access to casdoor login page successfully.

:::


