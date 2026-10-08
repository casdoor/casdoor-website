---
title: MCP error handling
description: The JSON-RPC error codes of the Casdoor MCP server, with example responses.
keywords: [MCP, errors, JSON-RPC, troubleshooting]
authors: [hsluoyz]
---

The Casdoor MCP server reports protocol errors as JSON-RPC 2.0 errors. This page lists the codes and shows example responses.

## Error codes

| Code | Name | Cause |
|---|---|---|
| `-32700` | Parse error | The request isn't valid JSON |
| `-32600` | Invalid Request | A required field is missing |
| `-32601` | Method not found | The method name is unknown |
| `-32602` | Invalid params | The parameters are malformed |
| `-32001` | Unauthorized or insufficient scope | The request has no valid credentials, or the token lacks the scope of the tool |

## Example responses {#common-error-examples}

Missing scope. The error names the scope that the tool requires and the scopes of the token:

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "error": {
    "code": -32001,
    "message": "insufficient_scope",
    "data": {
      "tool": "add_application",
      "granted_scopes": ["read:application"],
      "required_scope": "write:application"
    }
  }
}
```

Invalid JSON:

```json
{
  "jsonrpc": "2.0",
  "id": null,
  "error": {
    "code": -32700,
    "message": "Parse error",
    "data": "unexpected character at position 12"
  }
}
```

Unknown method:

```json
{
  "jsonrpc": "2.0",
  "id": 8,
  "error": {
    "code": -32601,
    "message": "Method not found",
    "data": "Method 'unknown_method' not found"
  }
}
```

Errors that happen while a tool runs aren't JSON-RPC errors. The tool returns a result with the `isError` flag. See [Result format](/docs/how-to-connect/mcp/tools#response-format).

## Other protocol features {#additional-features}

- **Notifications**: The server accepts requests without an `id` field and doesn't answer them.
- **Batch requests**: The server accepts an array of requests.
- **Health check**: The `ping` method returns an empty result:

  ```json
  {
    "jsonrpc": "2.0",
    "id": 9,
    "method": "ping"
  }
  ```

- **Demo mode**: When Casdoor runs in demo mode, the server rejects write operations and allows read operations and authentication.

## See also

- [MCP troubleshooting](/docs/how-to-connect/mcp/troubleshooting)
- [MCP authorization and scopes](/docs/how-to-connect/mcp/authorization)
