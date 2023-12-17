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

### Step 1: Add Casdoor Helm Repository

Add the Casdoor Helm repository to your Helm client:

```shell
helm repo add casdoor https://hub.docker.com/repository/docker/casbin/casdoor-helm-charts
helm repo update
```

### Step 2: Install the Casdoor Chart

Install the Casdoor chart with the release name `my-casdoor`:

```shell
helm install my-casdoor casdoor/casdoor-helm-charts
```

### Step 3: Accessing Casdoor

Once installed, Casdoor can be accessed at the provided service URL by your Kubernetes cluster.

### Customization and Configuration

Customize your Casdoor installation by modifying the Helm chart values. For detailed options, refer to the `values.yaml` file in the chart.

### Managing the Deployment

To upgrade your Casdoor deployment:

```shell
helm upgrade my-casdoor casdoor/casdoor-helm-charts
```

To uninstall Casdoor:

```shell
helm delete my-casdoor
```

For further management and customization, refer to the Helm and Kubernetes documentation.

## Conclusion

Using Helm to deploy Casdoor on Kubernetes simplifies the management and scalability of your authentication services within your Kubernetes environment.
