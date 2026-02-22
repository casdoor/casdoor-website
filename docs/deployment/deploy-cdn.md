---
title: Hosting static files in a CDN
description: Deploy Casdoor frontend static assets to a CDN using a storage provider.
keywords: [deployment, cdn, frontend, static]
authors: [leo220yuyaodog]
---

Frontend assets (e.g. `.js` and `.css`) live in `web/build/static/`. Upload them to a CDN via a Casdoor storage provider; a script in the repo automates this.

:::note
Build the frontend first. See [Server installation](/docs/basic/server-installation#frontend-1) if needed.
:::

## Preparation

Create a [storage provider](/docs/provider/storage/overview) in the Casdoor UI (e.g. [Aliyun OSS](/docs/provider/storage/aliyun-oss)).

:::caution
Set the **Domain** field to a URL ending with `/`.

![storage_domian](/img/deployment/deploy-cdn/storage_domian.png)
:::

## Usage

The script is at [deployment/deploy_test.go](https://github.com/casdoor/casdoor/blob/7b0b426a76fd77b89817e0eafcccaed8d15b8cf4/deployment/deploy_test.go). Set the provider in `GetProvider()`; the ID format is `<owner>/<name>`.

```go
func TestDeployStaticFiles(t *testing.T) {
    provider := object.GetProvider("admin/provider_storage_aliyun_oss")
    deployStaticFiles(provider)
}
```

Then run:

```bash
cd deployment
go test
```

On success you should see:

```bash
PASS
ok      github.com/casdoor/casdoor/deployment   2.951s
```

## How it works

The script:

1. Uploads files under `css/` and `js/` to the storage provider (your CDN).
2. Rewrites `.css` and `.js` URLs in `web/build/index.html` to point to the CDN.

Serve `index.html` from the Casdoor backend as usual; the browser will load the static assets from the CDN using the URLs in `index.html`.
