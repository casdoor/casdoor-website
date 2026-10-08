---
title: MCP authentication
description: How MCP clients discover the OAuth 2.0 requirements of the Casdoor MCP server, and the ways to authenticate a request.
keywords: [MCP, authentication, OAuth, access token]
authors: [hsluoyz]
---

Requests to the Casdoor MCP server at `/api/mcp` are authenticated in the same ways as requests to the [Casdoor API](/docs/basic/public-api). This page describes how a client discovers what the server requires, and how each authentication method affects the tools that the client can call.

## OAuth discovery

Casdoor publishes OAuth 2.0 Protected Resource Metadata ([RFC 9728](https://datatracker.ietf.org/doc/html/rfc9728)), so that an MCP client can find out which authorization server protects the MCP endpoint:

```bash
curl https://your-casdoor.com/.well-known/oauth-protected-resource
```

The response names the authorization server:

```json
{
  "resource": "https://your-casdoor.com",
  "authorization_servers": ["https://your-casdoor.com"],
  "bearer_methods_supported": ["header"],
  "scopes_supported": ["openid", "profile", "email"]
}
```

To get the metadata of a single application, put the application name in the path:

```bash
curl https://your-casdoor.com/.well-known/my-app/oauth-protected-resource
```

Use the application-specific endpoint when applications have different authorization requirements.

## Authentication methods

| Method | Tools that the client can call | Use it for |
|---|---|---|
| Access token | The tools that the scopes of the token allow. See [MCP authorization and scopes](/docs/how-to-connect/mcp/authorization) | Automation and MCP clients. This is the recommended method |
| Client ID and client secret | The tools that the application may use | Service accounts |
| Session cookie | All tools, without scope checks | Interactive use in the browser |

With an access token:

```bash
curl -X POST https://your-casdoor.com/api/mcp \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

With the client ID and client secret of an application:

```bash
curl -X POST https://your-casdoor.com/api/mcp \
  -u "CLIENT_ID:CLIENT_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

## Unauthenticated requests {#handling-unauthenticated-requests}

Casdoor answers a request without credentials with a JSON-RPC error:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32001,
    "message": "Unauthorized",
    "data": "Unauthorized operation"
  }
}
```

The response also carries the header `WWW-Authenticate: Bearer realm="/.well-known/oauth-protected-resource"`. An MCP client that follows the OAuth 2.0 specification reads the metadata from that location and starts the authorization flow on its own.

## See also

- [MCP authorization and scopes](/docs/how-to-connect/mcp/authorization)
- [Call the Casdoor API](/docs/basic/public-api)
- [OAuth 2.0](/docs/how-to-connect/oauth)
