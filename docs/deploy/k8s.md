---
sidebar_position: 2
title: k8s
description: Deploy Casdoor in k8s
keywords: [k8s, kubernetes]
---

## Deploy Casdoor in k8s
We have given out a basic example of deploying Casdoor into k8s. In the root folder of casdoor, there exist a file named "k8s.yaml", which include a example minimum configuration to be used in deploying casdoor in k8s, a deployment and a service.


First, make sure that you have modified the conf/app.conf so that the casdoor can successfully connect to the database, and the database is running. Second, make sure k8s is able to pull the necessary images. 

Run
```shell
kubectl apply -f k8s.yaml
```

And soon you can see the result via command `kubectl get pods`


The content of k8s.yaml is as follow
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

This file is merely an example. For example, you can choose to use a namespace other than default, use a service type instead of nodeport to expose the casdoor, or use a use config map in k8s to mount the configuration file, which is a more recommended way in k8s. 

