---
title: Try with Helm
description: Deploy Casdoor on Kubernetes using Helm for manageable, scalable deployments.
keywords: [Casdoor, Helm, Kubernetes, K8s]
authors: [nomeguy]
---

This page describes how to deploy Casdoor on Kubernetes using Helm.

## Prerequisites

- A running Kubernetes cluster
- Helm v3

## Installation

### Step 1: Install the Casdoor chart

Install the Casdoor [Helm chart](https://hub.docker.com/r/casbin/casdoor-helm-charts/tags):

```shell
helm install casdoor oci://registry-1.docker.io/casbin/casdoor-helm-charts --version v1.702.0
```

### Step 2: Access Casdoor

After installation, use the service URL provided by your cluster to access Casdoor.

### Customization

Override [values.yaml](https://github.com/casdoor/casdoor-helm/blob/master/charts/casdoor/values.yaml) to customize the deployment. Key parameters:

| Parameter                                    | Description                                                                                 | Default Value                                                                                      |
|----------------------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| `replicaCount`                               | Number of replicas of the Casdoor application to run.                                       | `1`                                                                                                |
| `image.repository`                           | Repository for the Casdoor Docker image.                                                    | `casbin`                                                                                           |
| `image.name`                                 | Name of the Casdoor Docker image.                                                           | `casdoor`                                                                                          |
| `image.pullPolicy`                           | Pull policy for the Casdoor Docker image.                                                   | `IfNotPresent`                                                                                     |
| `image.tag`                                  | Tag for the Casdoor Docker image.                                                           | `""`                                                                                               |
| `config`                                     | Configuration settings for the Casdoor application.                                         | See [config](https://github.com/casdoor/casdoor-helm/blob/master/charts/casdoor/values.yaml) field |
| `database.driver`                            | Database driver to use (supports mysql, postgres, cockroachdb, sqlite3).                    | `sqlite3`                                                                                          |
| `database.user`                              | Database username.                                                                          | `""`                                                                                               |
| `database.password`                          | Database password.                                                                          | `""`                                                                                               |
| `database.host`                              | Database host.                                                                              | `""`                                                                                               |
| `database.port`                              | Database port.                                                                              | `""`                                                                                               |
| `database.databaseName`                      | Name of the database used by Casdoor.                                                       | `casdoor`                                                                                          |
| `database.sslMode`                           | SSL mode for the database connection.                                                       | `disable`                                                                                          |
| `service.type`                               | Type of Kubernetes service to create for Casdoor (ClusterIP, NodePort, LoadBalancer, etc.). | `ClusterIP`                                                                                        |
| `service.port`                               | Port number for the Casdoor service.                                                        | `8000`                                                                                             |
| `ingress.enabled`                            | Whether to enable Ingress for Casdoor.                                                      | `false`                                                                                            |
| `ingress.annotations`                        | Annotations for the Ingress resource.                                                       | `\{\}`                                                                                             |
| `ingress.hosts`                              | Hostnames for the Ingress resource.                                                         | `[]`                                                                                               |
| `resources`                                  | Resource requests and limits for the Casdoor container.                                     | `\{\}`                                                                                             |
| `autoscaling.enabled`                        | Whether to enable Horizontal Pod Autoscaler for Casdoor.                                    | `false`                                                                                            |
| `autoscaling.minReplicas`                    | Minimum number of replicas for Horizontal Pod Autoscaler.                                   | `1`                                                                                                |
| `autoscaling.maxReplicas`                    | Maximum number of replicas for Horizontal Pod Autoscaler.                                   | `100`                                                                                              |
| `autoscaling.targetCPUUtilizationPercentage` | Target CPU utilization percentage for Horizontal Pod Autoscaler.                            | `80`                                                                                               |
| `nodeSelector`                               | Node labels for pod assignment.                                                             | `\{\}`                                                                                             |
| `tolerations`                                | Toleration labels for pod assignment.                                                       | `[]`                                                                                               |
| `affinity`                                   | Affinity settings for pod assignment.                                                       | `\{\}`                                                                                             |
| `extraContainersEnabled`                     | Whether to enable additional sidecar containers.                                            | `false`                                                                                            |
| `extraContainers`                            | Additional sidecar containers.                                                              | `""`                                                                                               |
| `extraVolumeMounts`                          | Additional volume mounts for the Casdoor container.                                         | `[]`                                                                                               |
| `extraVolumes`                               | Additional volumes for the Casdoor container.                                               | `[]`                                                                                               |
| `envFromSecret`                              | Provide Environment variable from secret.                                                   | `[\{name:"",secretName:"",key:""\}]`                                                               |
| `envFromConfigmap`                           | Provide Environment variable from configmap.                                                | `[\{name:"",configmapName:"",key:""\}]`                                                            |
| `envFrom`                                    | Provide Environment variable from entire secret or configmap.                               | `[\{name:"",type:"configmap \| secret"\}]`                                                        |

### Managing the deployment

Upgrade:

```shell
helm upgrade casdoor oci://registry-1.docker.io/casbin/casdoor-helm-charts --version <version>
```

Uninstall:

```shell
helm uninstall casdoor
```

For more options, see the [Helm](https://helm.sh/docs/) and [Kubernetes](https://kubernetes.io/docs/) documentation.
