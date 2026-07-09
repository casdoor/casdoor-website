---
title: Try with Helm
description: Deploy Casdoor on Kubernetes using Helm for manageable, scalable deployments.
keywords: [Casdoor, Helm, Kubernetes, K8s, Gateway API, Ingress, Istio]
authors: [nomeguy]
---

This page describes how to deploy Casdoor on Kubernetes using Helm.

## Prerequisites

- A running Kubernetes cluster (1.19+)
- Helm v3.8+

## Installation

### Step 1: Install the Casdoor chart

Install the Casdoor [Helm chart](https://hub.docker.com/r/casbin/casdoor-helm-charts/tags):

```shell
helm install casdoor oci://registry-1.docker.io/casbin/casdoor-helm-charts --version <version>
```

To install with a custom values file:

```shell
helm install casdoor oci://registry-1.docker.io/casbin/casdoor-helm-charts \
  --version <version> \
  -f my-values.yaml
```

### Step 2: Access Casdoor

After installation, use the service URL provided by your cluster to access Casdoor.

## Customization

Override [values.yaml](https://github.com/casdoor/casdoor-helm/blob/master/charts/casdoor/values.yaml) to customize the deployment. Key parameters:

| Parameter | Description | Default Value |
|---|---|---|
| `replicaCount` | Number of replicas of the Casdoor application to run. | `1` |
| `image.repository` | Repository for the Casdoor Docker image. | `casbin` |
| `image.name` | Name of the Casdoor Docker image. | `casdoor` |
| `image.pullPolicy` | Pull policy for the Casdoor Docker image. | `IfNotPresent` |
| `image.tag` | Tag for the Casdoor Docker image. | `""` |
| `config` | Configuration settings for the Casdoor application. | See [values.yaml](https://github.com/casdoor/casdoor-helm/blob/master/charts/casdoor/values.yaml) |
| `database.driver` | Database driver to use (`mysql`, `postgres`, `cockroachdb`, `sqlite`). | `sqlite` |
| `database.user` | Database username. | `""` |
| `database.password` | Database password. | `""` |
| `database.host` | Database host. | `""` |
| `database.port` | Database port. | `""` |
| `database.databaseName` | Name of the database used by Casdoor. | `casdoor` |
| `database.sslMode` | SSL mode for the database connection. | `disable` |
| `service.type` | Type of Kubernetes service (`ClusterIP`, `NodePort`, `LoadBalancer`). | `ClusterIP` |
| `service.port` | Port number for the Casdoor service. | `8000` |
| `ingress.enabled` | Whether to enable Ingress for Casdoor. | `false` |
| `ingress.annotations` | Annotations for the Ingress resource. | `{}` |
| `ingress.hosts` | Hostnames for the Ingress resource. | `[]` |
| `resources` | Resource requests and limits for the Casdoor container. | `{}` |
| `autoscaling.enabled` | Whether to enable Horizontal Pod Autoscaler for Casdoor. | `false` |
| `autoscaling.minReplicas` | Minimum number of replicas for HPA. | `1` |
| `autoscaling.maxReplicas` | Maximum number of replicas for HPA. | `100` |
| `autoscaling.targetCPUUtilizationPercentage` | Target CPU utilization percentage for HPA. | `80` |
| `nodeSelector` | Node labels for pod assignment. | `{}` |
| `tolerations` | Toleration labels for pod assignment. | `[]` |
| `affinity` | Affinity settings for pod assignment. | `{}` |
| `extraContainersEnabled` | Whether to enable additional sidecar containers. | `false` |
| `extraContainers` | Additional sidecar containers. | `""` |
| `extraVolumeMounts` | Additional volume mounts for the Casdoor container. | `[]` |
| `extraVolumes` | Additional volumes for the Casdoor container. | `[]` |
| `envFromSecret` | Environment variables from individual Secret keys. | `[]` |
| `envFromConfigmap` | Environment variables from individual ConfigMap keys. | `[]` |
| `envFrom` | Environment variables from entire Secrets or ConfigMaps. | `[]` |

## Exposing Casdoor

### Option 1: Ingress (classic)

Enable and configure Ingress:

```yaml
ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: casdoor.example.com
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: casdoor-tls
      hosts:
        - casdoor.example.com
```

### Option 2: Gateway API (modern)

The Kubernetes [Gateway API](https://gateway-api.sigs.k8s.io/) is the next-generation successor to Ingress, officially GA since Kubernetes 1.31. It is supported by Istio, Envoy Gateway, Cilium, Kong, NGINX Gateway Fabric, and others.

:::tip Prerequisites
Install the Gateway API CRDs before enabling this option:

```shell
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.2.0/standard-install.yaml
```

You also need a compatible Gateway controller running in your cluster.
:::

#### Attach to an existing Gateway

If you already have a Gateway resource in your cluster, point the HTTPRoute at it:

```yaml
gatewayApi:
  enabled: true
  parentRefs:
    - name: my-gateway
      namespace: gateway-system
      sectionName: https
  hostnames:
    - casdoor.example.com
```

#### Create a new Gateway (e.g. with Istio)

Let the chart create a Gateway and HTTPRoute together:

```yaml
gatewayApi:
  enabled: true
  createGateway: true
  hostnames:
    - casdoor.example.com
  gateway:
    gatewayClassName: istio
    listeners:
      - name: http
        protocol: HTTP
        port: 80
        allowedRoutes:
          namespaces:
            from: Same
```

#### Create a Gateway with HTTP→HTTPS redirect

Enable TLS termination and automatic HTTP-to-HTTPS redirect:

```yaml
gatewayApi:
  enabled: true
  createGateway: true
  hostnames:
    - casdoor.example.com
  gateway:
    gatewayClassName: istio
    listeners:
      - name: http
        protocol: HTTP
        port: 80
        allowedRoutes:
          namespaces:
            from: Same
      - name: https
        protocol: HTTPS
        port: 443
        tls:
          certificateRefs:
            - name: casdoor-tls
              kind: Secret
        allowedRoutes:
          namespaces:
            from: Same
  httpsRedirect:
    enabled: true
```

#### Gateway API parameters

| Parameter | Description | Default |
|---|---|---|
| `gatewayApi.enabled` | Enable HTTPRoute creation | `false` |
| `gatewayApi.createGateway` | Also create a `Gateway` resource | `false` |
| `gatewayApi.annotations` | Annotations for the HTTPRoute | `{}` |
| `gatewayApi.labels` | Extra labels for the HTTPRoute | `{}` |
| `gatewayApi.parentRefs` | Parent Gateway references | `[]` |
| `gatewayApi.hostnames` | Hostnames to match (Host header) | `[]` |
| `gatewayApi.rules` | Routing rules (matches, filters, backendRefs) | PathPrefix `/` |
| `gatewayApi.gateway.name` | Gateway name (defaults to chart fullname) | `""` |
| `gatewayApi.gateway.gatewayClassName` | GatewayClass name (required when `createGateway=true`) | `""` |
| `gatewayApi.gateway.listeners` | Gateway listeners | HTTP:80 |
| `gatewayApi.httpsRedirect.enabled` | Enable HTTP→HTTPS redirect HTTPRoute | `false` |
| `gatewayApi.httpsRedirect.statusCode` | Redirect response code | `301` |
| `gatewayApi.httpsRedirect.hostnames` | Hostnames for redirect route | `[]` |
| `gatewayApi.httpsRedirect.parentRefs` | Override parentRefs for redirect route | `[]` |

## Managing the deployment

Upgrade:

```shell
helm upgrade casdoor oci://registry-1.docker.io/casbin/casdoor-helm-charts --version <version>
```

Uninstall:

```shell
helm uninstall casdoor
```

For more options, see the [Helm](https://helm.sh/docs/) and [Kubernetes](https://kubernetes.io/docs/) documentation.
