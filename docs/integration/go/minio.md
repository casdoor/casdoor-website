---
title: MinIO
description: Configuring Casdoor as an identity provider to support MinIO
keywords: [MinIO]
authors: [Abingcbc]
---

[MinIO](https://github.com/minio/minio) supports external identity management using an OpenID Connect (OIDC)-compatible provider. This document covers the configuration of Casdoor as an identity provider to support MinIO.

## Step 1: Deploy Casdoor & MinIO

First, deploy Casdoor.

See [Server installation](/docs/basic/server-installation).

After a successful deployment, make sure that:

- The Casdoor server is running on **`http://localhost:8000`**.
- Open your favorite browser and visit **`http://localhost:7001`** to see the login page of Casdoor.
- Test the login functionality by entering `admin` and `123`.

Implement a Casdoor-based login in your app with the following steps.

Deploy MinIO: [MinIO quickstart](https://github.com/minio/minio#minio-quickstart-guide). Install the `mc` client: [MinIO mc](https://docs.min.io/minio/baremetal/reference/minio-mc.html#install-mc).

## Step 2: Configure Casdoor Application

1. Create a new Casdoor application or use an existing one.
2. Add your redirect URL.
![Casdoor Application Setting](/img/integration/appsetting_spring_security.png)
3. Add the provider you want and provide any necessary settings.

    Note **Client ID** and **Client secret** for the next step. OIDC discovery: `http://<CASDOOR_HOSTNAME>/.well-known/openid-configuration`.

4. This step is necessary for MinIO. As MinIO needs to use a claim attribute in JWT for its policy, you should configure it in Casdoor as well. Currently, Casdoor uses `tag` as a workaround for configuring MinIO's policy.

    ![MinIO Policy Setting](/img/integration/go/minio/minio_policy.png)

    See [MinIO policy-based access control](https://docs.min.io/minio/baremetal/security/minio-identity-management/policy-based-access-control.html#minio-policy) for supported policies.

## Step 3: Configure MinIO

Start a MinIO server, for example:

```shell
export MINIO_ROOT_USER=minio
export MINIO_ROOT_PASSWORD=minio123
minio server /mnt/export
```

Use `--console-address` to set the console address and port.

Next, add a service alias using the MinIO client `mc`.

```bash
mc alias set myminio <Your console address> minio minio123
```

Now, configure the OpenID Connect of MinIO. For Casdoor, the command will be:

```bash
mc admin config set myminio identity_openid config_url="http://CASDOOR_HOSTNAME/.well-known/openid-configuration" client_id=<client id> client_secret=<client secret> claim_name="tag"
```

See the [MinIO OpenID identity management docs](https://docs.min.io/minio/baremetal/reference/minio-server/minio-server.html#openid-identity-management) for more parameters.

Once successfully set, restart the MinIO instance.

```bash
mc admin service restart myminio
```

## Step 4: Try the demo!

Now, open your MinIO console in the browser and click on `Login with SSO`.

You are redirected to the Casdoor login page; after sign-in, back to MinIO and logged in. You then see the buckets and objects available to you.

:::caution

If the Casdoor frontend and backend use different ports, the redirect may hit the backend and show `404`. Point the redirect URL to the frontend port so the login page loads correctly.

:::
