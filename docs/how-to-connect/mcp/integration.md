---
title: Integration Example
description: Complete example of integrating with Casdoor's MCP server
keywords: [MCP, integration, Python, example]
authors: [hsluoyz]
---

Here's a complete example showing how to connect to Casdoor's MCP server with scoped authorization:

```python
import requests
import json

# Server configuration
server_url = "https://your-casdoor.com/api/mcp"
token_url = "https://your-casdoor.com/api/login/oauth/access_token"
client_id = "your-client-id"
client_secret = "your-client-secret"

# Get a scoped token for application management
token_response = requests.post(token_url, data={
    "grant_type": "client_credentials",
    "client_id": client_id,
    "client_secret": client_secret,
    "scope": "read:application write:application"
})
access_token = token_response.json()["access_token"]

# Create a session with the token
session = requests.Session()
session.headers.update({
    "Authorization": f"Bearer {access_token}",
    "Content-Type": "application/json"
})

# Initialize the connection
init_request = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
        "protocolVersion": "2024-11-05",
        "capabilities": {},
        "clientInfo": {"name": "python-client", "version": "1.0.0"}
    }
}
response = session.post(server_url, json=init_request)
print("Initialize:", response.json())

# Send initialized notification
notify_request = {
    "jsonrpc": "2.0",
    "method": "notifications/initialized"
}
session.post(server_url, json=notify_request)

# List available tools (filtered by scopes)
list_tools_request = {
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/list"
}
response = session.post(server_url, json=list_tools_request)
print("Available tools:", response.json())

# Create a new application (requires write:application scope)
create_app_request = {
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/call",
    "params": {
        "name": "add_application",
        "arguments": {
            "application": {
                "owner": "my-org",
                "name": "automated-app",
                "displayName": "Automated Application",
                "organization": "my-org"
            }
        }
    }
}
response = session.post(server_url, json=create_app_request)
result = response.json()

if "error" in result:
    error = result["error"]
    if error.get("code") == -32001 and error.get("message") == "insufficient_scope":
        # Handle insufficient scope error
        error_data = error.get("data", {})
        print(f"Need scope: {error_data.get('required_scope', 'unknown')}")
        print(f"Have scopes: {error_data.get('granted_scopes', [])}")
    else:
        print(f"Error: {error.get('message', 'Unknown error')}")
else:
    print("Created application:", result)
```

This example demonstrates obtaining a scoped token, using it to authenticate with the MCP server, and handling potential scope-related errors. The token includes both read and write scopes, allowing full application management.
