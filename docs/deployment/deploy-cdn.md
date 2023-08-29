---
title: Hosting Static Files in a CDN
description: Hosting frontend static files in a CDN
keywords: [deployment, cdn, frontend]
authors: [leo220yuyaodog]
---

Frontend static resources, such as .js and .css files, are located in `web/build/static/`. If you wish to deploy these files in a public cloud's CDN service, Casdoor provides a script that simplifies the deployment process. Please follow the steps below.

:::note

We assume that you have already built the frontend code of Casdoor. If you have not, please refer to the [documentation](/docs/basic/server-installation#frontend-1).

:::

## Preparation

First, you need to create a valid [Storage Provider](/docs/provider/storage/overview) in the Casdoor UI. You can refer to the [example](/docs/provider/storage/aliyun-oss).

:::caution

When filling in the `Domain` field, be sure to end it with a '/'.
![storage_domian](/img/deployment/deploy-cdn/storage_domian.png)

:::

## Usage

The script can be found at [deployment/deploy_test.go](https://github.com/casdoor/casdoor/blob/7b0b426a76fd77b89817e0eafcccaed8d15b8cf4/deployment/deploy_test.go).

In [deploy_test.go](https://github.com/casdoor/casdoor/blob/7b0b426a76fd77b89817e0eafcccaed8d15b8cf4/deployment/deploy_test.go), you need to modify the `id` parameter in `GetProvider()`. The format of the provider `id` is `<owner>/<name>`.

```go
func TestDeployStaticFiles(t *testing.T) {
    provider := object.GetProvider("admin/provider_storage_aliyun_oss")
    deployStaticFiles(provider)
}
```

After making the necessary modification, use the following commands to run the script:

```bash
cd deployment
go test
```

If the execution is successful, you will see:

```bash
PASS
ok      github.com/casdoor/casdoor/deployment   2.951s
```

## How it works

The script will:

- Upload all the files in the `css/` and `js/` folders to the CDN service specified by the storage provider.
- Replace all the URLs of the `.css` and `.js` files in `web/build/index.html` with the URLs hosted in the CDN.

You still need to keep the `index.html` file. After the static files are uploaded to the CDN, `index.html` will still be requested by users through Casdoor's Go backend, and the static files in the CDN will be requested through the URLs provided in `index.html`.
