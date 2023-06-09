---
title: k8s
description: 在 k8s 中部署 Casdoor
keywords:
  - k8s
  - kubernetes
authors:
  - ComradeProgrammer
---

## 在 k8s 中部署 Casdoor
我们已经给出了一个将 Casdoor 部署到 k8s 中的基本示例。 在 casdoor 的根目录下，有一个名为"k8s.yaml"的文件，里面包含了在 k8s 中部署 casdoor 时使用的示例最低配置、一个部署和一个服务。


首先，确保你已经修改了conf/app.conf，使 casdoor 能够成功连接数据库，并且数据库正在运行。 其次，确保 k8s 能够拉取必要的镜像。

运行
```shell
kubectl apply -f k8s.yaml
```

很快你就可以通过命令 `kubectl get pods` 看到结果


k8s.yaml 的内容如下
```yaml
# this is only an EXAMPLE of deploying casddor in kubernetes
# please modify this file according to your requirements
apiVersion: v1
kind: Service
metadata:
  #EDIT IT: if you don't want to run casdoor in default namespace, please modify this field
  #namespace: casdoor
  name: casdoor-svc
  labels:
    app: casdoor
spec:
  #EDIT IT: if you don't want to run casdoor in default namespace, please modify this filed
  type: NodePort
  ports:
    - port: 8000
  selector:
    app: casdoor
---
apiVersion: apps/v1
kind: Deployment
metadata:
  #EDIT IT: if you don't want to run casdoor in default namespace, please modify this field
  #namespace: casdoor
  name: casdoor-deployment
  labels:
    app: casdoor
spec:
  #EDIT IT: if you don't use redis, casdoor should not have multiple replicas
  replicas: 1
  selector:
    matchLabels:
      app: casdoor
  template:
    metadata:
      labels:
        app: casdoor
    spec:
      containers:
        - name: casdoor-container
          image: casbin/casdoor:latest
          imagePullPolicy: Always
          ports:
            - containerPort: 8000
          volumeMounts:
            # the mounted directory path in THE CONTAINER
            - mountPath: /conf
              name: conf
          env:       
            - name: RUNNING_IN_DOCKER
              value: "true"
      #if you want to deploy this in real prod env, consider the config map
      volumes:
        - name: conf
          hostPath:
            #EDIT IT: the mounted directory path in THE HOST
            path: /conf

```

该文件只是一个示例。 比如您可以选择使用 default 以外的命名空间，使用服务类型而不是 nodeport 来暴露 casdoor，或者在 k8s 中使用 use config map 来挂载配置文件，这是 k8s 中比较推荐的方式。 

