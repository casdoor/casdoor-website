---
title: Quarkus
description: Sign in to Quarkus applications with Casdoor and authorize requests with Casdoor roles and permissions using the Quarkus Casdoor Auth extension.
keywords: [Quarkus, Quarkiverse, Java, OIDC, RBAC, permission, extension]
authors: [hsluoyz]
---

The [Quarkus Casdoor Auth](https://github.com/quarkiverse/quarkus-casdoor-auth) extension connects Quarkus applications to Casdoor. It is part of [Quarkiverse](https://github.com/quarkiverse), the home of community Quarkus extensions.

- Maven Central: [`io.quarkiverse.casdoor-auth:quarkus-casdoor-auth`](https://central.sonatype.com/artifact/io.quarkiverse.casdoor-auth/quarkus-casdoor-auth)
- GitHub repository: [quarkiverse/quarkus-casdoor-auth](https://github.com/quarkiverse/quarkus-casdoor-auth)
- Extension guide: [docs.quarkiverse.io](https://docs.quarkiverse.io/quarkus-casdoor-auth/dev/)

The extension builds on Quarkus' own `quarkus-oidc`, which handles sign-in and token verification, and adds what is specific to Casdoor:

- the user's Casdoor [roles](/docs/permission/overview) become Quarkus roles, so `@RolesAllowed` works;
- `@PermissionsAllowed("resource:action")` is checked against Casdoor [permissions](/docs/permission/overview) with the [Enforce API](/docs/permission/exposed-casbin-apis#enforce);
- an HTTP security policy named `casdoor` checks the request path and method against Casdoor permissions.

Version 0.1.0 is built with Quarkus 3.40 and requires Java 17 or later.

## Step 1: Create an application in Casdoor

1. In the Casdoor UI, open **Applications** and add an application in your organization.
2. Add your application's callback URL, e.g. `http://localhost:8080/`, to **Redirect URLs**.
3. Copy the **Client ID** and **Client secret**.

## Step 2: Add the extension

With Maven:

```xml
<dependency>
    <groupId>io.quarkiverse.casdoor-auth</groupId>
    <artifactId>quarkus-casdoor-auth</artifactId>
    <version>0.1.0</version>
</dependency>
```

With Gradle:

```groovy
implementation("io.quarkiverse.casdoor-auth:quarkus-casdoor-auth:0.1.0")
```

The extension brings in `quarkus-oidc`, so you don't need to add it.

## Step 3: Configure sign-in

Point `quarkus-oidc` at your Casdoor server in `application.properties`:

```properties
quarkus.oidc.auth-server-url=https://door.casdoor.com
quarkus.oidc.client-id=<Client ID>
quarkus.oidc.credentials.secret=<Client secret>
# web-app: redirect users to the Casdoor sign-in page
# service (the default): accept bearer tokens only, e.g. for a REST API called by a frontend
quarkus.oidc.application-type=web-app
```

Casdoor publishes its OIDC discovery document at `/.well-known/openid-configuration`, so nothing else is needed. For all `quarkus.oidc` options, see the Quarkus guides on the [authorization code flow](https://quarkus.io/guides/security-oidc-code-flow-authentication) and [bearer tokens](https://quarkus.io/guides/security-oidc-bearer-token-authentication).

The security identity gets two attributes, `casdoor.organization` and `casdoor.username`, read from the `owner` and `name` (or `preferred_username`) claims of the token.

## Step 4: Use Casdoor roles

The names of the user's Casdoor roles are added to the identity:

```java
@GET
@Path("/admin")
@RolesAllowed("admin")
public String admin() {
    return "admin";
}
```

With the default `JWT` [token format](/docs/token/overview#token-format-options), the roles are in the token. The `JWT-Standard` format has no roles in the token, so the extension reads them from the UserInfo response instead; enable it with:

```properties
quarkus.oidc.authentication.user-info-required=true
```

Casdoor groups are in the standard `groups` claim, which `quarkus-oidc` already maps to roles.

## Step 5: Check Casdoor permissions

`@PermissionsAllowed("data1:read")` sends the Casbin request `["<organization>/<username>", "data1", "read"]` to Casdoor and allows the call if one of your Casdoor permissions allows it:

```java
@GET
@Path("/data1")
@PermissionsAllowed("data1:read")
public String data1() {
    return "data1";
}
```

For example, a permission in organization `my-org` with role `my-org/admin`, resource `data1` and action `read`, using a model like:

```ini
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
```

allows `@PermissionsAllowed("data1:read")` for every member of the `admin` role.

By default, all permissions of the user's organization are checked. To check a single permission, model, resource or enforcer, set one of:

```properties
quarkus.casdoor.authorization.permission-id=my-org/my-permission
# quarkus.casdoor.authorization.model-id=my-org/my-model
# quarkus.casdoor.authorization.resource-id=my-resource
# quarkus.casdoor.authorization.enforcer-id=my-org/my-enforcer
```

The extension calls the Enforce API with the application's client ID and secret, so the permission, model or enforcer must belong to the application's organization.

### Path-based authorization

The `casdoor` HTTP security policy sends `["<organization>/<username>", "<path>", "<method>"]`, e.g. `["my-org/alice", "/api/orders", "GET"]`, so a Casdoor permission with resource `/api/orders` and action `GET` controls that endpoint. Apply it to paths:

```properties
quarkus.http.auth.permission.casdoor.paths=/api/*
quarkus.http.auth.permission.casdoor.policy=casdoor
```

or to endpoints with `@AuthorizationPolicy(name = "casdoor")`. Anonymous requests are denied.

### Caching

Each check calls Casdoor, so permission changes take effect immediately. To cache the results, set e.g. `quarkus.casdoor.authorization.cache-ttl=30S`.

## Configuration reference

| Property | Default | Description |
|----------|---------|-------------|
| `quarkus.casdoor.endpoint` | `quarkus.oidc.auth-server-url` | Casdoor server URL used for the Enforce API |
| `quarkus.casdoor.client-id` | `quarkus.oidc.client-id` | Client ID used to call the Casdoor API |
| `quarkus.casdoor.client-secret` | `quarkus.oidc.credentials.secret` | Client secret used to call the Casdoor API |
| `quarkus.casdoor.roles.enabled` | `true` | Add the user's Casdoor roles to the identity |
| `quarkus.casdoor.authorization.enabled` | `true` | Check `@PermissionsAllowed` with Casdoor |
| `quarkus.casdoor.authorization.permission-id` | | Permission to enforce, as `<organization>/<name>` |
| `quarkus.casdoor.authorization.model-id` | | Model whose permissions are enforced |
| `quarkus.casdoor.authorization.resource-id` | | Resource whose permissions are enforced |
| `quarkus.casdoor.authorization.enforcer-id` | | Enforcer to use |
| `quarkus.casdoor.authorization.cache-ttl` | `0S` | How long an enforce result is cached |
| `quarkus.casdoor.authorization.timeout` | `10S` | Timeout of a call to the Casdoor API |
