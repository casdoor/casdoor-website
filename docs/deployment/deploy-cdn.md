---
title: Hosting Static Files in CDN
description: Hosting frontend static files in the CDN
keywords: [deployment, cdn, frontend]
author: leo220yuyaodog
---

Frontend static resource (.js, .css files) are in `web/build/static/`. If you want to deploy it
in a **CDN** service of a public cloud, Casdoor provides a script for you to deploy frontend static files easily. Please follow the steps below.

:::note

We assume you have already built the frontend code of Casdoor. If not yet, please follow: [document](/docs/basic/server-installation#frontend-1).

:::

## Preparation

First, you need to create a valid [Storage Provider](/docs/provider/storage/overview) in Casdoor UI. you can refer to the [example](/docs/provider/storage/aliyun-oss).

:::caution

When you fill in the field `Domain`, please end with '/'
![storage_domian](/img/deployment/deploy-cdn/storage_domian.png)

:::

## Usage

The script is at [deployment/deploy_test.go](https://github.com/casdoor/casdoor/blob/7b0b426a76fd77b89817e0eafcccaed8d15b8cf4/deployment/deploy_test.go).

In [deploy_test.go](https://github.com/casdoor/casdoor/blob/7b0b426a76fd77b89817e0eafcccaed8d15b8cf4/deployment/deploy_test.go), you need to modify the parameter `id` in `GetProvider()`. The format of 
provider `id` is `<owner>/<name>`

```go
func TestDeployStaticFiles(t *testing.T) {
	provider := object.GetProvider("admin/provider_storage_aliyun_oss")
	deployStaticFiles(provider)
}
```

Then use the following commands to run the script:
```bash
cd deployment
go test
```

If the execution succeeds, you will see:
```bash
PASS
ok      github.com/casdoor/casdoor/deployment   2.951s
```

## How it works

The script will:

- It will upload all the files in folders: `css/` and `js/` to the CDN service pointed by the storage provider. 
- Replace all the URLs of `.css` and `.js` files in the `web/build/index.html` with the URLs hosted in the CDN.

You still need to keep the `index.html`. After the static files are uploaded to CDN, `index.html` will still be requested by users through Casdoor Go backend, and those static files in the CDN are then requested through the URLs in `index.html`.
