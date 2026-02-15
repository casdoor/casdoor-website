---
title: Error Handling
description: Understanding MCP server error responses
keywords: [MCP, errors, JSON-RPC, troubleshooting]
authors: [hsluoyz]
---

## Error Codes

The MCP server returns standard JSON-RPC 2.0 error codes:

- **-32700**: Parse error - Invalid JSON
- **-32600**: Invalid Request - Missing required fields
- **-32601**: Method not found - Unknown method name
- **-32602**: Invalid params - Malformed parameters
- **-32001**: Unauthorized or Insufficient scope

The `-32001` error code covers both authentication failures and authorization issues. When you lack the required scope for a tool, the error includes details about what scope you need:

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

## Common Error Examples

Invalid JSON triggers a parse error:

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

Unknown methods return method not found:

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

## Additional Features

The MCP server implements the full JSON-RPC 2.0 specification including notifications (requests without an `id` field) and batch requests. The `ping` method provides a simple health check:

```json
{
  "jsonrpc": "2.0",
  "id": 9,
  "method": "ping"
}
```

When running in demo mode, the server restricts write operations to protect the demonstration instance while allowing all read operations and authentication flows.
