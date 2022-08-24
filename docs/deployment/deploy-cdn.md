---
title: Hosting Static Files in CDN
description: Hosting frontend static files in the CDN
keywords: [deployment, cdn, frontend]
---

Frontend static resource (.js, .css files) are in `web/build/static/`. If you want to deploy it
in **CDN**, Casdoor providers script to deploy frontend static files easily. You can follow the steps below.

:::note
By default, you have already built frontend code. If not, see [document](/docs/basic/server-installation#frontend-1).
:::

## Preparation

First, you need to create a [storage provider](/docs/provider/storage). you can refer to the [example](/docs/provider/storage#example).

:::caution
When you fill in the field `Domain`, please end with '/'
![storage_domian](/img/basic/storage_domian.png)
:::

## How it works

The script is at [deployment/deploy_test.go](https://github.com/casdoor/casdoor/blob/7b0b426a76fd77b89817e0eafcccaed8d15b8cf4/deployment/deploy_test.go).

- It will upload the `css/` and `js/` to CDN. 
- Replace the link of `.css` and `.js` files in the `index.html`.

You still need to keep the `index.html`. After the static files is uploaded to the CDN, `index.html` will still be 
obtained by requesting Casdoor backend, and then request static files in the CDN through the absolute path in `index.html`
## Use

In [deploy_test.go](https://github.com/casdoor/casdoor/blob/7b0b426a76fd77b89817e0eafcccaed8d15b8cf4/deployment/deploy_test.go), you need to modify the parameter `id` in `GetProvider()`. The format of 
provider `id` is `<owner/name>`

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
