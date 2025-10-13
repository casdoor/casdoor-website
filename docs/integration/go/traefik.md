---
title: Traefik
description: Using Casdoor for authentication with Traefik reverse proxy
keywords: [Traefik, middleware, authentication]
authors: [casdoor]
---

## Using Casdoor for authentication with Traefik

[Traefik](https://traefik.io/) is a modern HTTP reverse proxy and load balancer that makes deploying microservices easy. This document shows how to use Casdoor as an authentication provider with Traefik using the [traefik-casdoor-auth](https://github.com/casdoor/traefik-casdoor-auth) middleware.

The Traefik Casdoor Auth middleware allows you to protect your services behind Traefik with Casdoor authentication, providing a seamless Single Sign-On (SSO) experience.

## Prerequisites

Before you begin, ensure you have:

- Traefik v2.x or v3.x installed and running
- A Casdoor instance deployed and accessible
- Docker and Docker Compose (if using the containerized approach)

## Step 1: Deploy Casdoor

First, deploy Casdoor if you haven't already.

You can refer to the Casdoor official documentation for [Server Installation](/docs/basic/server-installation).

After a successful deployment, make sure that:

- The Casdoor server is running and accessible
- You can log in to the Casdoor admin interface
- Test the login functionality by entering `admin` and `123`

## Step 2: Configure Casdoor Application

1. Create a new Casdoor application or use an existing one.
2. Add your redirect URL. The redirect URL should be in the format:

   ```text
   http://<your-domain>/callback
   ```

   For example: `http://localhost:8080/callback`

3. Note down the following values from your application settings:
   - **Client ID**
   - **Client Secret**
   - **Organization Name**
   - **Application Name**

![Casdoor Application Setting](/img/integration/appsetting_spring_security.png)

1. Configure your application to use the appropriate authentication providers as needed.

## Step 3: Deploy traefik-casdoor-auth Middleware

There are two ways to deploy the Traefik Casdoor Auth middleware:

### Option 1: Using Docker Compose (Recommended)

Create a `docker-compose.yml` file:

```yaml
version: '3'

services:
  traefik:
    image: traefik:v2.10
    container_name: traefik
    restart: unless-stopped
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    networks:
      - traefik-network

  casdoor-auth:
    image: casbin/traefik-casdoor-auth:latest
    container_name: casdoor-auth
    restart: unless-stopped
    environment:
      - CASDOOR_ENDPOINT=http://localhost:8000
      - CLIENT_ID=<your-client-id>
      - CLIENT_SECRET=<your-client-secret>
      - CASDOOR_ORGANIZATION=<your-organization>
      - CASDOOR_APPLICATION=<your-application>
      - CALLBACK_URL=http://localhost/callback
    labels:
      - "traefik.enable=true"
      - "traefik.http.middlewares.casdoor-auth.forwardauth.address=http://casdoor-auth:8080/verify"
      - "traefik.http.middlewares.casdoor-auth.forwardauth.authResponseHeaders=X-Forwarded-User"
    networks:
      - traefik-network

  # Example protected service
  whoami:
    image: traefik/whoami
    container_name: whoami
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.whoami.rule=Host(`localhost`)"
      - "traefik.http.routers.whoami.entrypoints=web"
      - "traefik.http.routers.whoami.middlewares=casdoor-auth@docker"
    networks:
      - traefik-network

networks:
  traefik-network:
    driver: bridge
```

Replace the placeholder values:

- `<your-client-id>`: Your Casdoor application client ID
- `<your-client-secret>`: Your Casdoor application client secret
- `<your-organization>`: Your Casdoor organization name
- `<your-application>`: Your Casdoor application name

Start the services:

```bash
docker-compose up -d
```

### Option 2: Using Binary Deployment

1. Download the latest release from the [traefik-casdoor-auth releases page](https://github.com/casdoor/traefik-casdoor-auth/releases).

2. Create a configuration file `config.yaml`:

```yaml
casdoor:
  endpoint: "http://localhost:8000"
  clientId: "<your-client-id>"
  clientSecret: "<your-client-secret>"
  organizationName: "<your-organization>"
  applicationName: "<your-application>"

server:
  port: 8080
  callbackUrl: "http://localhost/callback"
```

1. Run the middleware:

```bash
./traefik-casdoor-auth --config config.yaml
```

1. Configure Traefik to use the middleware. Add to your Traefik dynamic configuration:

```yaml
http:
  middlewares:
    casdoor-auth:
      forwardAuth:
        address: "http://localhost:8080/verify"
        authResponseHeaders:
          - "X-Forwarded-User"

  routers:
    my-protected-service:
      rule: "Host(`example.com`)"
      middlewares:
        - casdoor-auth
      service: my-service
```

## Step 4: Test the Integration

1. Access your protected service through Traefik (e.g., `http://localhost` if using the Docker Compose example).

2. You should be redirected to the Casdoor login page.

3. Log in with your Casdoor credentials.

4. After successful authentication, you will be redirected back to your protected service.

5. The middleware will set the `X-Forwarded-User` header with the authenticated user's information, which your backend service can use.

## Configuration Options

The traefik-casdoor-auth middleware supports the following environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `CASDOOR_ENDPOINT` | URL of your Casdoor instance | Yes |
| `CLIENT_ID` | Casdoor application client ID | Yes |
| `CLIENT_SECRET` | Casdoor application client secret | Yes |
| `CASDOOR_ORGANIZATION` | Casdoor organization name | Yes |
| `CASDOOR_APPLICATION` | Casdoor application name | Yes |
| `CALLBACK_URL` | OAuth callback URL | Yes |
| `JWT_SECRET` | Secret for JWT token signing (auto-generated if not set) | No |
| `SESSION_TIMEOUT` | Session timeout in seconds (default: 3600) | No |
| `LOG_LEVEL` | Logging level: debug, info, warn, error (default: info) | No |

## Advanced Configuration

### Using HTTPS

For production deployments, it's recommended to use HTTPS. Update your Traefik configuration to include TLS:

```yaml
services:
  traefik:
    command:
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.myresolver.acme.tlschallenge=true"
      - "--certificatesresolvers.myresolver.acme.email=your-email@example.com"
      - "--certificatesresolvers.myresolver.acme.storage=/letsencrypt/acme.json"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./letsencrypt:/letsencrypt
```

And update your service router configuration:

```yaml
labels:
  - "traefik.http.routers.whoami.entrypoints=websecure"
  - "traefik.http.routers.whoami.tls.certresolver=myresolver"
```

### Customizing Session Behavior

You can customize session timeout and other behaviors:

```yaml
environment:
  - SESSION_TIMEOUT=7200  # 2 hours
  - LOG_LEVEL=debug
```

## Troubleshooting

### Redirect Loop

If you experience a redirect loop:

1. Verify that the `CALLBACK_URL` matches the redirect URL configured in your Casdoor application.
2. Check that cookies are enabled in your browser.
3. Ensure the middleware can reach the Casdoor endpoint.

### Authentication Fails

If authentication fails:

1. Check that the `CLIENT_ID` and `CLIENT_SECRET` are correct.
2. Verify that the Casdoor organization and application names are correct.
3. Check the middleware logs for detailed error messages: `docker logs casdoor-auth`

### 502 Bad Gateway

If you see a 502 error:

1. Ensure the casdoor-auth service is running: `docker ps`
2. Check that all services are on the same Docker network.
3. Verify the ForwardAuth address is correct in the Traefik configuration.

## Resources

- [Traefik Casdoor Auth GitHub Repository](https://github.com/casdoor/traefik-casdoor-auth)
- [Traefik ForwardAuth Middleware Documentation](https://doc.traefik.io/traefik/middlewares/http/forwardauth/)
- [Casdoor Documentation](/docs/overview)
