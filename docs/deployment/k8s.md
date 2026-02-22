---
title: Deploying to Kubernetes
description: Deploy Casdoor in a Kubernetes cluster using the example manifests.
keywords: [k8s, Kubernetes, Casdoor, deployment]
authors: [ComradeProgrammer]
---

## Deploy Casdoor on Kubernetes

The Casdoor repo includes an example manifest `k8s.yaml` in the project root, with a Deployment and a Service. For production or custom setups, consider using the [Helm chart](/docs/basic/try-with-helm) instead.

Before deploying:

1. Update `conf/app.conf` so Casdoor can connect to your database.
2. Ensure the database is running and the cluster can pull the Casdoor image.

Deploy with:

```shell
kubectl apply -f k8s.yaml
```

Check deployment status with `kubectl get pods`.

Here is the content of `k8s.yaml`:

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

This file is only an example. Adjust as needed (namespace, service type, ConfigMap for config). Using a ConfigMap for the config file is recommended in production.

## Exposing Casdoor with Ingress

Once Casdoor is deployed, you typically want to expose it externally. There are several approaches to handle authentication for your applications:

### Direct Ingress Access

For simple setups where you want to expose Casdoor itself, create an Ingress resource:

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

Your applications can then integrate with Casdoor using the SDK or OAuth 2.0/OIDC protocols directly. This is the recommended approach for most use cases as it gives you full control over the authentication flow in your application code.

### Authentication with ingress-nginx auth annotations

While ingress-nginx provides external authentication capabilities through annotations, this approach has significant limitations when used with OAuth2/OIDC providers like Casdoor. The `nginx.ingress.kubernetes.io/auth-url` annotation is designed for simple token validation endpoints, not for complete OAuth2 flows that require redirects and session management.

For protecting applications at the ingress level, you should use oauth2-proxy or similar authentication proxies. These tools handle the complete OAuth2/OIDC flow including:

- Initiating the login redirect to Casdoor
- Handling the OAuth2 callback with authorization codes
- Managing user sessions with cookies
- Token refresh and validation

Here's how to deploy oauth2-proxy alongside your application:

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

This approach ensures proper OAuth2/OIDC flow handling while keeping your application protected at the ingress layer.

### Security Considerations

When deploying authentication in Kubernetes:

- **Always use HTTPS/TLS** - OAuth2 requires secure connections. Configure TLS certificates for your ingress resources using cert-manager or similar tools.
- **Secure sensitive values** - Store client secrets, cookie secrets, and other sensitive data in Kubernetes Secrets, not in plain ConfigMaps or deployment manifests.
- **Use proper RBAC** - Limit access to authentication configurations and secrets using Kubernetes RBAC policies.
- **Session management** - For production deployments with multiple replicas, configure oauth2-proxy to use Redis for session storage to ensure sessions work across pod restarts and multiple instances.
