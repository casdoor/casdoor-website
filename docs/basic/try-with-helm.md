---
title: (Optional) Try with K8s Helm
description: Learn how to deploy Casdoor on Kubernetes using Helm
keywords: [Casdoor, Helm, Kubernetes, K8s]
authors: [nomeguy]
---

## Introduction

Now we show how to deploy Casdoor on Kubernetes using Helm for easy and scalable management.

## Prerequisites

- A running Kubernetes cluster
- Helm v3 installed

## Installation Steps

### Step 1: Install the Casdoor Chart

Install the Casdoor chart:

```shell
helm install casdoor oci://registry-1.docker.io/casbin/casdoor-helm-charts --version 0.4.3
```

### Step 2: Accessing Casdoor

Once installed, Casdoor can be accessed at the provided service URL by your Kubernetes cluster.

### Customization and Configuration

Customize your Casdoor installation by modifying the Helm chart values. For detailed options, refer to the [values.yaml](https://github.com/casdoor/casdoor-helm/blob/master/charts/casdoor/values.yaml) file in the chart.

### Managing the Deployment

To upgrade your Casdoor deployment:

```shell
helm upgrade casdoor casdoor/casdoor-helm-charts
```

To uninstall Casdoor:

```shell
helm delete casdoor
```

For further management and customization, refer to the Helm and Kubernetes documentation.

## Conclusion

Using Helm to deploy Casdoor on Kubernetes simplifies the management and scalability of your authentication services within your Kubernetes environment.
