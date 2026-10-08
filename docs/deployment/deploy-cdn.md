---
title: Host the frontend files on a CDN
sidebar_label: Host static files on a CDN
description: Upload the built Casdoor frontend to a CDN through a storage provider, so that browsers load JavaScript and CSS from the CDN.
keywords: [deployment, cdn, frontend, static]
authors: [leo220yuyaodog]
---

This guide explains how to upload the JavaScript and CSS files of the Casdoor frontend to a content delivery network (CDN) with a script from the Casdoor repository.

---

#### Learning outcomes

- Create a storage provider that points to your CDN.
- Upload the built frontend files with the deployment script.
- Understand what the script changes.

#### What you need

- Casdoor built from source, with the frontend built into `web/build`. See [Run in production mode](/docs/basic/server-installation#production-mode).
- An object storage service with a CDN, such as [Alibaba Cloud OSS](/docs/provider/storage/aliyun-oss)

---

## About the script

The script [`deployment/deploy_test.go`](https://github.com/casdoor/casdoor/blob/master/deployment/deploy_test.go) does two things:

1. It uploads the files under `web/build/assets/` to the storage provider. Before Casdoor v4, the directory was `web/build/static/`.
1. It rewrites the URLs of the `.css` and `.js` files in `web/build/index.html`, so that they point to the CDN.

The Casdoor backend still serves `index.html`. The browser then loads the assets from the CDN.

:::tip
If you install the frontend from the `casdoor-web` npm package, you don't need this script. Set `frontendCdnUrl` in [`app.conf`](/docs/basic/configuration) instead.
:::

## Create a storage provider

1. In the Casdoor admin console, create a [storage provider](/docs/provider/storage/overview) for your object storage.
1. Set the **Domain** field to the URL of the CDN, ending with `/`.

   ![Domain field of the storage provider with a URL that ends with a slash](/img/deployment/deploy-cdn/storage_domian.png)

## Upload the files

1. In `deployment/deploy_test.go`, set the ID of your provider in the call to `GetProvider()`. The format is `<owner>/<name>`.

   ```go
   func TestDeployStaticFiles(t *testing.T) {
       provider := object.GetProvider("admin/provider_storage_aliyun_oss")
       deployStaticFiles(provider)
   }
   ```

1. Run the script:

   ```bash
   cd deployment
   go test
   ```

   When the upload succeeds, the output is:

   ```bash
   PASS
   ok      github.com/casdoor/casdoor/deployment   2.951s
   ```

## See also

- [Storage providers](/docs/provider/storage/overview)
- [Host static files on an intranet](/docs/deployment/deploy-intranet)
