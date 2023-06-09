---
title: 数据初始化
description: 如何从文件初始化Casdoor 数据
keywords:
  - 数据初始化
  - 部署
  - 局域网
authors:
  - leo220yuyaodog
---

如果您将Casdoor和其他服务作为一个应用整体进行部署， 您可能想要为用户提供开箱即用的功能(用户不需要任何配置就可以直接使用应用程序)。

在这种情况下，您可以使用数据初始化功能，通过一个配置文件将您服务注册到Casdoor。 此文件可以由服务所有者预定义或动态生。

## 使用方式

如果在 Casdoor 的根目录下有一个名为`init_data.json`的配置文件，它将被用于初始化Casdoor中的数据。 您要做的只是将此文件放到运行Casdoor的根目录下。

如果您使用 Casdoor 的官方`docker<code>镜像，以下脚本可以帮助您将 <code>init_data.json` 挂载到容器里。

### Docker
如果您使用 `docker`部署Casdoor ，您可以使用 `卷` 将 `init_data.json` 挂载到容器中。

```bash
docker run ... -v /path/to/init_data.json:/init_data.json
```

### Kubernetes
如果您使用 Kubernetes 部署了 Casdoor ，您可以使用 `configmap` 来存放 `init_data.json`。

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: casdoor-init-data
data:
  init_data.json:
```

您可以通过挂载 `configmap` 将数据挂载到Casdoor的`pods`中。 您可以按照如下例子修改 `deployment` 的定义文件：

```yaml
apiVersion: apps/v1
kind: Deployment
...
spec:
  template:
    ...
    spec:
      containers:
      ...
        volumeMounts:
        - mountPath: /init_data.json
          name: casdoor-init-data-volume
          subPath: init_data.json
      volumes:
      - configMap:
          name: casdoor-init-data
        name: casdoor-init-data-volume
```



## 文件内容

Casto版本库的根目录中已经有一个名为 `init_data.json.template` 的模板文件。 您可以参考此文件来自定义您的数据初始化文件。

以下是每个对象对应的Go结构体和文档链接：

| 对象    | Go 结构体                                                                                                               | 文档                                                    |
| ----- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| 组织机构  | [stuct](https://github.com/casdoor/casdoor/blob/2fec3f72ae9a38891a951e55e088b4967cdf4836/object/organization.go#L32) | [doc](https://casdoor.org/docs/organization/overview) |
| 应用    | [stuct](https://github.com/casdoor/casdoor/blob/2fec3f72ae/object/application.go#L34)                                | [doc](https://casdoor.org/docs/application/overview)  |
| 用户    | [stuct](https://github.com/casdoor/casdoor/blob/2fec3f72ae9a38891a951e55e088b4967cdf4836/object/user.go#L27)         | [doc](https://casdoor.org/docs/user/overview)         |
| 提供商   | [stuct](https://github.com/casdoor/casdoor/blob/2fec3f72ae9a38891a951e55e088b4967cdf4836/object/provider.go#L25)     | [doc](https://casdoor.org/docs/provider/overview)     |
| 证书    | [stuct](https://github.com/casdoor/casdoor/blob/2fec3f72ae9a38891a951e55e088b4967cdf4836/object/cert.go#L24)         |                                                       |
| ldaps | [stuct](https://github.com/casdoor/casdoor/blob/2fec3f72ae9a38891a951e55e088b4967cdf4836/object/ldap.go#L28)         | [doc](https://casdoor.org/docs/ldap/overview)         |

如果您对填写此模板仍然感到困惑， 您可以调用 restful api或使用浏览器的调试模式来查看这些对象的 `GetXXX` 的响应。 这些响应和 `init_data.json` 的内容是相同的。