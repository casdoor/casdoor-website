---
title: 将静态文件托管到CDN
description: 在CDN中托管前端静态文件
keywords:
  - 部署
  - cdn
  - 前端
authors:
  - leo220yuyaodog
---

前端静态资源 (.js, .css 文件) 在 `web/build/static/` 目录下。 如果您想要将它部署在 公共云服务**CDN**中 Casdoor 提供了一个脚本，让您可以轻松地部署前端静态文件 请按照以下步骤操作：

:::note

我们假定您已经构建过了Cassdoor的前端代码。 如果还没有，请参照： [文档](/docs/basic/server-installation#frontend-1)。

:::

## 准备工作

首先，您需要在 Casdoor UI 中创建一个有效的 [存储提供商](/docs/provider/storage/overview) 。您可以参考 [示例](/docs/provider/storage/aliyun-oss)。

:::caution

当您填写 `域`字段时，请以 '/' 结束 ![storage_domian](/img/deployment/deploy-cdn/storage_domian.png)

:::

## 使用说明

脚本放在文件[deployment/deploy_test.go](https://github.com/casdoor/casdoor/blob/7b0b426a76fd77b89817e0eafcccaed8d15b8cf4/deployment/deploy_test.go)中。

你需要修改 [deploy_test.go](https://github.com/casdoor/casdoor/blob/7b0b426a76fd77b89817e0eafcccaed8d15b8cf4/deployment/deploy_test.go)中传入`GetProvider()`方法的参数 `id`的值。 提供商 `id` 的格式是 `<owner>/<name>`

```go
func TestDeployStaticFiles(t *testing.T) {
    provider := object.GetProvider("admin/provider_storage_aliyun_oss")
    deployStaticFiles(provider)
}
```

然后使用以下命令来运行脚本：
```bash
cd deployment
go test
```

如果执行成功，您将看到：
```bash
PASS
ok      github.com/casdoor/casdoor/deployment   2.951s
```

## 工作原理

脚本的功能：

- 它将会上传文件夹： `css/` and `js/` 中所有文件到指定的存储提供商的 CDN 服务上。
- 替换`web/build/index.html` 中所有 `.css` 和 `.js` 的URL为托管CDN的URL。

您仍然需要保留 `index.html`。 静态文件上传到CDN后，用户通过 Casdoor Go 后端请求 `index. html` 这些托管在CDN中的静态文件将通过`index. html`的URL被请求加载。
