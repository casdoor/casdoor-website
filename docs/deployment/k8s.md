---
title: Deploy Casdoor on Kubernetes
sidebar_label: Deploy on Kubernetes
description: Deploy Casdoor on a Kubernetes cluster with the example manifest, expose it with Ingress, and protect other applications with oauth2-proxy.
keywords: [k8s, Kubernetes, Casdoor, deployment]
authors: [ComradeProgrammer]
---

This guide explains how to deploy Casdoor on a Kubernetes cluster with the example manifest from the Casdoor repository and how to expose it with Ingress.

---

#### Learning outcomes

- Deploy Casdoor with the example manifest `k8s.yaml`.
- Expose Casdoor outside the cluster with an Ingress.
- Protect an application at the ingress layer with oauth2-proxy and Casdoor.

#### What you need

- A Kubernetes cluster and `kubectl`
- A [supported database](/docs/basic/server-installation#supported-databases) that the cluster can reach
- An ingress controller, such as ingress-nginx, to expose Casdoor
- A clone of the [Casdoor repository](https://github.com/casdoor/casdoor)

---

:::tip Don't want to run it yourself?
[Casdoor Cloud](https://www.casdoor.com/pricing?utm_source=casdoor.ai&utm_medium=docs&utm_content=deploy-k8s) gives you a dedicated Casdoor instance that we host and keep upgraded for you, from $29/month with no per-user fees. New accounts get $20 in free credit to try it.
:::

## About the example manifest

The root of the Casdoor repository contains `k8s.yaml`, an example manifest with a Service and a Deployment. It is a starting point. For a deployment that you can configure and upgrade through values, use the [Helm chart](/docs/basic/try-with-helm) instead.

```yaml
# Example: deploying Casdoor on Kubernetes
# Adjust this file for your environment
apiVersion: v1
kind: Service
metadata:
  # EDIT: set namespace if not using default
  #namespace: casdoor
  name: casdoor-svc
  labels:
    app: casdoor
spec:
  # EDIT: set namespace if not using default
  type: NodePort
  ports:
    - port: 8000
  selector:
    app: casdoor
---
apiVersion: apps/v1
kind: Deployment
metadata:
  # EDIT: set namespace if not using default
  #namespace: casdoor
  name: casdoor-deployment
  labels:
    app: casdoor
spec:
  # EDIT: use 1 replica if not using Redis
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

## Deploy Casdoor

1. Set the database connection in `conf/app.conf`. See [Configure the database](/docs/basic/server-installation#configure-database).
1. Make sure that the database runs and that the cluster can pull the `casbin/casdoor` image.
1. Adjust `k8s.yaml` for your environment: the namespace, the Service type, and the path of the `conf` volume on the host.
1. Apply the manifest:

   ```shell
   kubectl apply -f k8s.yaml
   ```

1. Check that the pod runs:

   ```shell
   kubectl get pods
   ```

:::tip
In production, put `app.conf` in a ConfigMap instead of a `hostPath` volume.
:::

## Expose Casdoor with Ingress {#exposing-casdoor-with-ingress}

Create an Ingress that routes your domain to the Casdoor Service. Replace `auth.yourdomain.com` with your domain.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: casdoor-ingress
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  ingressClassName: nginx
  rules:
  - host: auth.yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: casdoor-svc
            port:
              number: 8000
  tls:
  - hosts:
    - auth.yourdomain.com
    secretName: casdoor-tls-secret
```

Your applications can now sign users in with Casdoor through an [SDK](/docs/how-to-connect/sdk) or through OAuth 2.0 and OpenID Connect (OIDC). This is the recommended setup, because your application code controls the sign-in flow.

## Protect an application at the ingress layer

To require sign-in for an application without changing its code, put [oauth2-proxy](https://oauth2-proxy.github.io/oauth2-proxy/) in front of it. oauth2-proxy handles the complete OAuth 2.0 flow:

- It redirects the user to Casdoor to sign in.
- It handles the callback with the authorization code.
- It keeps the user's session in a cookie.
- It validates and refreshes tokens.

:::note
Don't use the `nginx.ingress.kubernetes.io/auth-url` annotation of ingress-nginx with Casdoor directly. The annotation expects an endpoint that validates a token. It can't run an OAuth 2.0 flow with redirects and sessions.
:::

The following manifest deploys oauth2-proxy and routes `app.yourdomain.com` through it:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: oauth2-proxy
spec:
  replicas: 1
  selector:
    matchLabels:
      app: oauth2-proxy
  template:
    metadata:
      labels:
        app: oauth2-proxy
    spec:
      containers:
      - name: oauth2-proxy
        image: quay.io/oauth2-proxy/oauth2-proxy:v7.5.1
        args:
        - --provider=oidc
        - --oidc-issuer-url=https://auth.yourdomain.com
        - --client-id=YOUR_CLIENT_ID
        - --client-secret=YOUR_CLIENT_SECRET
        - --redirect-url=https://app.yourdomain.com/oauth2/callback
        - --cookie-secret=RANDOM_SECRET_32_CHARS
        - --email-domain=*
        - --upstream=http://your-app-service:8080
        - --http-address=0.0.0.0:4180
        ports:
        - containerPort: 4180
---
apiVersion: v1
kind: Service
metadata:
  name: oauth2-proxy-svc
spec:
  ports:
  - port: 4180
    targetPort: 4180
  selector:
    app: oauth2-proxy
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
spec:
  ingressClassName: nginx
  rules:
  - host: app.yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: oauth2-proxy-svc
            port:
              number: 4180
  tls:
  - hosts:
    - app.yourdomain.com
    secretName: app-tls-secret
```

| Placeholder | Value |
|---|---|
| `auth.yourdomain.com` | Domain of Casdoor |
| `YOUR_CLIENT_ID`, `YOUR_CLIENT_SECRET` | Client ID and client secret of the Casdoor application |
| `app.yourdomain.com` | Domain of the protected application. Add `https://app.yourdomain.com/oauth2/callback` to the **Redirect URLs** of the Casdoor application |
| `RANDOM_SECRET_32_CHARS` | Random secret that encrypts the session cookie |
| `your-app-service:8080` | Service and port of the protected application |

For more options, see the [OAuth2 Proxy integration guide](/docs/integration/go/oauth2-proxy).

## Secure the deployment

- **Use HTTPS**: OAuth 2.0 requires secure connections. Issue TLS certificates for your Ingress resources, for example with cert-manager.
- **Keep secrets in Secrets**: Store client secrets and cookie secrets in Kubernetes Secrets, not in ConfigMaps or in manifests.
- **Restrict access with RBAC**: Limit who can read the authentication configuration and the Secrets.
- **Share sessions between replicas**: If you run several replicas of oauth2-proxy, configure Redis as its session store, so that sessions survive pod restarts and work on every replica.

## See also

- [Run Casdoor on Kubernetes with Helm](/docs/basic/try-with-helm)
- [OAuth2 Proxy](/docs/integration/go/oauth2-proxy)
- [Kubernetes integration](/docs/integration/go/kubernetes)
