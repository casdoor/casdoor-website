---
title: Deploying to Kubernetes
description: Learn how to deploy Casdoor in a Kubernetes cluster
keywords: [k8s, Kubernetes, Casdoor, deployment]
authors: [ComradeProgrammer]
---

## Deploy Casdoor in Kubernetes (k8s)

We provide a basic example of deploying Casdoor in a Kubernetes cluster. In the root folder of Casdoor, you will find a file named "k8s.yaml". This file contains an example configuration for deploying Casdoor in Kubernetes, including a deployment and a service.

Before starting the deployment, ensure that you have modified the `conf/app.conf` file so that Casdoor can connect to the database successfully and that the database itself is running. Also, make sure that Kubernetes is able to pull the necessary images.

To deploy Casdoor, run the following command:

```shell
kubectl apply -f k8s.yaml
```

You can check the deployment status by running the command `kubectl get pods`.

Here is the content of `k8s.yaml`:

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

Please note that this file is only an example. You can make various modifications as per your requirements, such as using a different namespace, service type, or a ConfigMap to mount the configuration file. Using a ConfigMap is a recommended approach in Kubernetes for mounting configuration files in a production environment.
