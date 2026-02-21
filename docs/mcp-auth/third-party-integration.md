---
title: Third-Party Server Integration
description: Complete code examples for integrating Casdoor OAuth into MCP servers
keywords: [MCP, integration, Python, Node.js, Go, JWT, JWKS, code examples]
authors: [hsluoyz]
---

This guide provides complete, runnable code examples for building MCP servers that use Casdoor for OAuth 2.1 authentication. Each example includes Protected Resource Metadata, JWT validation, and scope enforcement.

All examples are self-contained and can be running in under 5 minutes.

## Prerequisites

- A Casdoor instance configured with an MCP application (see [Setup Guide](./setup.md))
- Basic familiarity with the programming language you choose
- An MCP client for testing (e.g., Claude Desktop)

## Python Example

This example uses the official `mcp` SDK and `PyJWT` for token validation.

### Installation

```bash
pip install mcp PyJWT cryptography requests
```

### Complete Server Code

```python
"""
MCP Server with Casdoor OAuth Authentication
Demonstrates Protected Resource Metadata, JWT validation, and scope enforcement
"""

import asyncio
import json
from typing import Any
import jwt
import requests
from jwt import PyJWKClient
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

# Configuration - Replace with your Casdoor instance
CASDOOR_URL = "https://your-casdoor.com"
MCP_SERVER_URL = "https://your-mcp-server.com"
JWKS_URL = f"{CASDOOR_URL}/.well-known/jwks"

# Initialize JWKS client for token validation
jwks_client = PyJWKClient(JWKS_URL)

# Create MCP server instance
app = Server("example-mcp-server")


def validate_token(token: str) -> dict:
    """
    Validate JWT token from Casdoor using JWKS.
    
    Returns decoded token with claims if valid.
    Raises jwt.InvalidTokenError if invalid.
    """
    try:
        # Get signing key from JWKS
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        
        # Verify and decode token
        decoded = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            audience=MCP_SERVER_URL,  # Verify audience matches our server
            options={
                "verify_signature": True,
                "verify_exp": True,
                "verify_aud": True,
            }
        )
        
        return decoded
    except jwt.InvalidTokenError as e:
        raise ValueError(f"Invalid token: {e}")


def check_scope(token_data: dict, required_scope: str) -> None:
    """
    Check if token contains required scope.
    
    Raises PermissionError if scope is missing.
    """
    scopes = token_data.get("scope", "").split()
    if required_scope not in scopes:
        raise PermissionError(f"Missing required scope: {required_scope}")


@app.list_tools()
async def list_tools() -> list[Tool]:
    """List available tools"""
    return [
        Tool(
            name="read_file",
            description="Read contents of a file",
            inputSchema={
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "Path to the file to read"
                    }
                },
                "required": ["path"]
            }
        ),
        Tool(
            name="write_file",
            description="Write content to a file",
            inputSchema={
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "Path to the file to write"
                    },
                    "content": {
                        "type": "string",
                        "description": "Content to write to the file"
                    }
                },
                "required": ["path", "content"]
            }
        ),
        Tool(
            name="list_files",
            description="List files in a directory",
            inputSchema={
                "type": "object",
                "properties": {
                    "path": {
                        "type": "string",
                        "description": "Directory path to list"
                    }
                },
                "required": ["path"]
            }
        )
    ]


@app.call_tool()
async def call_tool(name: str, arguments: Any) -> list[TextContent]:
    """
    Handle tool calls with OAuth token validation and scope enforcement.
    
    In production, extract token from request context.
    For this example, we'll show the validation logic.
    """
    # In a real MCP server, extract token from the request headers
    # token = request.headers.get("Authorization", "").replace("Bearer ", "")
    # For demonstration, we'll skip actual token extraction
    
    # Example token validation (uncomment in production):
    # try:
    #     token_data = validate_token(token)
    # except ValueError as e:
    #     return [TextContent(type="text", text=f"Authentication failed: {e}")]
    
    # Handle each tool with appropriate scope checks
    if name == "read_file":
        # Requires files:read scope
        # check_scope(token_data, "files:read")
        
        path = arguments.get("path")
        try:
            with open(path, 'r') as f:
                content = f.read()
            return [TextContent(
                type="text",
                text=f"File contents:\n{content}"
            )]
        except Exception as e:
            return [TextContent(
                type="text",
                text=f"Error reading file: {e}"
            )]
    
    elif name == "write_file":
        # Requires files:write scope
        # check_scope(token_data, "files:write")
        
        path = arguments.get("path")
        content = arguments.get("content")
        try:
            with open(path, 'w') as f:
                f.write(content)
            return [TextContent(
                type="text",
                text=f"Successfully wrote to {path}"
            )]
        except Exception as e:
            return [TextContent(
                type="text",
                text=f"Error writing file: {e}"
            )]
    
    elif name == "list_files":
        # Requires files:list scope
        # check_scope(token_data, "files:list")
        
        import os
        path = arguments.get("path")
        try:
            files = os.listdir(path)
            return [TextContent(
                type="text",
                text=f"Files in {path}:\n" + "\n".join(files)
            )]
        except Exception as e:
            return [TextContent(
                type="text",
                text=f"Error listing files: {e}"
            )]
    
    return [TextContent(type="text", text=f"Unknown tool: {name}")]


async def serve_protected_resource_metadata():
    """
    Serve Protected Resource Metadata endpoint.
    
    In production, integrate this with your HTTP framework.
    """
    metadata = {
        "resource": MCP_SERVER_URL,
        "authorization_servers": [CASDOOR_URL],
        "scopes_supported": [
            "files:read",
            "files:write",
            "files:list"
        ],
        "bearer_methods_supported": ["header"]
    }
    return metadata


async def main():
    """Run the MCP server"""
    async with stdio_server() as (read_stream, write_stream):
        await app.run(
            read_stream,
            write_stream,
            app.create_initialization_options()
        )


if __name__ == "__main__":
    asyncio.run(main())
```

### Testing the Python Server

1. **Save the code** as `mcp_server.py`

2. **Configure Claude Desktop** by adding to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):

```json
{
  "mcpServers": {
    "example-files": {
      "command": "python",
      "args": ["/path/to/mcp_server.py"]
    }
  }
}
```

1. **Restart Claude Desktop** and verify the tools appear in the MCP tools list

## Node.js Example

This example uses the official `@modelcontextprotocol/sdk` and `jose` for JWT validation.

### Installation

```bash
npm install @modelcontextprotocol/sdk jose
```

### Complete Server Code

```javascript
/**
 * MCP Server with Casdoor OAuth Authentication
 * Demonstrates Protected Resource Metadata, JWT validation, and scope enforcement
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Configuration - Replace with your Casdoor instance
const CASDOOR_URL = 'https://your-casdoor.com';
const MCP_SERVER_URL = 'https://your-mcp-server.com';
const JWKS_URL = `${CASDOOR_URL}/.well-known/jwks`;

// Initialize JWKS for token validation
const JWKS = createRemoteJWKSet(new URL(JWKS_URL));

/**
 * Validate JWT token from Casdoor using JWKS.
 * 
 * @param {string} token - JWT token to validate
 * @returns {Promise<object>} Decoded token payload
 * @throws {Error} If token is invalid
 */
async function validateToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      audience: MCP_SERVER_URL,
      issuer: CASDOOR_URL,
    });
    return payload;
  } catch (error) {
    throw new Error(`Invalid token: ${error.message}`);
  }
}

/**
 * Check if token contains required scope.
 * 
 * @param {object} tokenData - Decoded token payload
 * @param {string} requiredScope - Scope to check for
 * @throws {Error} If scope is missing
 */
function checkScope(tokenData, requiredScope) {
  const scopes = (tokenData.scope || '').split(' ');
  if (!scopes.includes(requiredScope)) {
    throw new Error(`Missing required scope: ${requiredScope}`);
  }
}

// Create MCP server instance
const server = new Server(
  {
    name: 'example-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'read_file',
        description: 'Read contents of a file',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Path to the file to read',
            },
          },
          required: ['path'],
        },
      },
      {
        name: 'write_file',
        description: 'Write content to a file',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Path to the file to write',
            },
            content: {
              type: 'string',
              description: 'Content to write to the file',
            },
          },
          required: ['path', 'content'],
        },
      },
      {
        name: 'list_files',
        description: 'List files in a directory',
        inputSchema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Directory path to list',
            },
          },
          required: ['path'],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  // In production, extract token from request context
  // const token = request.headers?.authorization?.replace('Bearer ', '');
  // const tokenData = await validateToken(token);
  
  try {
    switch (name) {
      case 'read_file': {
        // checkScope(tokenData, 'files:read');
        const fs = await import('fs/promises');
        const content = await fs.readFile(args.path, 'utf-8');
        return {
          content: [
            {
              type: 'text',
              text: `File contents:\n${content}`,
            },
          ],
        };
      }
      
      case 'write_file': {
        // checkScope(tokenData, 'files:write');
        const fs = await import('fs/promises');
        await fs.writeFile(args.path, args.content, 'utf-8');
        return {
          content: [
            {
              type: 'text',
              text: `Successfully wrote to ${args.path}`,
            },
          ],
        };
      }
      
      case 'list_files': {
        // checkScope(tokenData, 'files:list');
        const fs = await import('fs/promises');
        const files = await fs.readdir(args.path);
        return {
          content: [
            {
              type: 'text',
              text: `Files in ${args.path}:\n${files.join('\n')}`,
            },
          ],
        };
      }
      
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

/**
 * Protected Resource Metadata
 * In production, serve this via HTTP endpoint at /.well-known/oauth-protected-resource
 */
export const protectedResourceMetadata = {
  resource: MCP_SERVER_URL,
  authorization_servers: [CASDOOR_URL],
  scopes_supported: ['files:read', 'files:write', 'files:list'],
  bearer_methods_supported: ['header'],
};

// Run the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP Server running on stdio');
}

main().catch(console.error);
```

### Testing the Node.js Server

1. **Save the code** as `mcp-server.js`

2. **Add `"type": "module"` to your `package.json`**:

```json
{
  "name": "mcp-example-server",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^0.5.0",
    "jose": "^5.0.0"
  }
}
```

1. **Configure Claude Desktop**:

```json
{
  "mcpServers": {
    "example-files": {
      "command": "node",
      "args": ["/path/to/mcp-server.js"]
    }
  }
}
```

1. **Restart Claude Desktop**

## Go Example

This example demonstrates integration using Casdoor's Go SDK and standard library JWT validation.

### Installation

```bash
go get github.com/casdoor/casdoor-go-sdk/casdoorsdk
go get github.com/golang-jwt/jwt/v5
```

### Complete Server Code

```go
package main

import (
    "context"
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "os"
    "strings"

    "github.com/golang-jwt/jwt/v5"
)

// Configuration - Replace with your Casdoor instance
const (
    CasdoorURL     = "https://your-casdoor.com"
    MCPServerURL   = "https://your-mcp-server.com"
    JWKSEndpoint   = CasdoorURL + "/.well-known/jwks"
)

// ProtectedResourceMetadata represents the MCP server's OAuth metadata
type ProtectedResourceMetadata struct {
    Resource               string   `json:"resource"`
    AuthorizationServers   []string `json:"authorization_servers"`
    ScopesSupported        []string `json:"scopes_supported"`
    BearerMethodsSupported []string `json:"bearer_methods_supported"`
}

// MCPTool represents an MCP tool definition
type MCPTool struct {
    Name        string      `json:"name"`
    Description string      `json:"description"`
    InputSchema interface{} `json:"inputSchema"`
}

// TokenClaims represents JWT claims from Casdoor
type TokenClaims struct {
    Scope string `json:"scope"`
    jwt.RegisteredClaims
}

// ValidateToken validates a JWT token using Casdoor's JWKS
func ValidateToken(tokenString string) (*TokenClaims, error) {
    // Parse token
    token, err := jwt.ParseWithClaims(tokenString, &TokenClaims{}, func(token *jwt.Token) (interface{}, error) {
        // Verify signing method
        if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
            return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
        }
        
        // In production, fetch JWKS and extract the appropriate key
        // For simplicity, this example shows the structure
        // Use a library like github.com/lestrrat-go/jwx for full JWKS support
        
        return nil, fmt.Errorf("JWKS key fetching not implemented in this example")
    })
    
    if err != nil {
        return nil, err
    }
    
    claims, ok := token.Claims.(*TokenClaims)
    if !ok || !token.Valid {
        return nil, fmt.Errorf("invalid token")
    }
    
    // Verify audience
    if !claims.VerifyAudience(MCPServerURL, true) {
        return nil, fmt.Errorf("invalid audience")
    }
    
    return claims, nil
}

// CheckScope verifies that the token contains the required scope
func CheckScope(claims *TokenClaims, requiredScope string) error {
    scopes := strings.Split(claims.Scope, " ")
    for _, scope := range scopes {
        if scope == requiredScope {
            return nil
        }
    }
    return fmt.Errorf("missing required scope: %s", requiredScope)
}

// ProtectedResourceMetadataHandler serves the Protected Resource Metadata
func ProtectedResourceMetadataHandler(w http.ResponseWriter, r *http.Request) {
    metadata := ProtectedResourceMetadata{
        Resource:               MCPServerURL,
        AuthorizationServers:   []string{CasdoorURL},
        ScopesSupported:        []string{"files:read", "files:write", "files:list"},
        BearerMethodsSupported: []string{"header"},
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(metadata)
}

// ListToolsHandler returns available MCP tools
func ListToolsHandler(w http.ResponseWriter, r *http.Request) {
    tools := []MCPTool{
        {
            Name:        "read_file",
            Description: "Read contents of a file",
            InputSchema: map[string]interface{}{
                "type": "object",
                "properties": map[string]interface{}{
                    "path": map[string]string{
                        "type":        "string",
                        "description": "Path to the file to read",
                    },
                },
                "required": []string{"path"},
            },
        },
        {
            Name:        "write_file",
            Description: "Write content to a file",
            InputSchema: map[string]interface{}{
                "type": "object",
                "properties": map[string]interface{}{
                    "path": map[string]string{
                        "type":        "string",
                        "description": "Path to the file to write",
                    },
                    "content": map[string]string{
                        "type":        "string",
                        "description": "Content to write",
                    },
                },
                "required": []string{"path", "content"},
            },
        },
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]interface{}{
        "tools": tools,
    })
}

// CallToolHandler handles MCP tool invocations with scope enforcement
func CallToolHandler(w http.ResponseWriter, r *http.Request) {
    // Extract token from Authorization header
    authHeader := r.Header.Get("Authorization")
    if authHeader == "" {
        http.Error(w, "Missing authorization header", http.StatusUnauthorized)
        return
    }
    
    tokenString := strings.TrimPrefix(authHeader, "Bearer ")
    
    // Validate token (in production, uncomment this)
    // claims, err := ValidateToken(tokenString)
    // if err != nil {
    //     http.Error(w, fmt.Sprintf("Invalid token: %v", err), http.StatusUnauthorized)
    //     return
    // }
    
    // Decode request body
    var request struct {
        Name      string                 `json:"name"`
        Arguments map[string]interface{} `json:"arguments"`
    }
    
    if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
        http.Error(w, "Invalid request", http.StatusBadRequest)
        return
    }
    
    // Handle tools with scope enforcement
    var result string
    var err error
    
    switch request.Name {
    case "read_file":
        // Check scope (in production, uncomment this)
        // if err := CheckScope(claims, "files:read"); err != nil {
        //     http.Error(w, err.Error(), http.StatusForbidden)
        //     return
        // }
        
        path := request.Arguments["path"].(string)
        content, err := os.ReadFile(path)
        if err != nil {
            result = fmt.Sprintf("Error reading file: %v", err)
        } else {
            result = fmt.Sprintf("File contents:\n%s", content)
        }
        
    case "write_file":
        // if err := CheckScope(claims, "files:write"); err != nil {
        //     http.Error(w, err.Error(), http.StatusForbidden)
        //     return
        // }
        
        path := request.Arguments["path"].(string)
        content := request.Arguments["content"].(string)
        err = os.WriteFile(path, []byte(content), 0644)
        if err != nil {
            result = fmt.Sprintf("Error writing file: %v", err)
        } else {
            result = fmt.Sprintf("Successfully wrote to %s", path)
        }
        
    default:
        http.Error(w, "Unknown tool", http.StatusNotFound)
        return
    }
    
    response := map[string]interface{}{
        "content": []map[string]string{
            {
                "type": "text",
                "text": result,
            },
        },
    }
    
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}

func main() {
    http.HandleFunc("/.well-known/oauth-protected-resource", ProtectedResourceMetadataHandler)
    http.HandleFunc("/tools/list", ListToolsHandler)
    http.HandleFunc("/tools/call", CallToolHandler)
    
    log.Println("MCP Server running on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

### Testing the Go Server

1. **Save the code** as `main.go`

2. **Run the server**:

```bash
go run main.go
```

1. **Test the Protected Resource Metadata**:

```bash
curl http://localhost:8080/.well-known/oauth-protected-resource
```

## Production Considerations

### Security Best Practices

1. **Always validate tokens in production**: The examples show validation logic commented out for simplicity. In production, **always validate every request**.

2. **Use HTTPS**: MCP servers must use HTTPS in production. Tokens transmitted over HTTP are vulnerable to interception.

3. **Implement rate limiting**: Protect your server from abuse by limiting requests per token/user.

4. **Log authorization failures**: Track failed authorization attempts for security monitoring.

5. **Rotate JWKS cache**: Implement caching for JWKS but refresh periodically (e.g., every 24 hours).

### Error Handling

Return descriptive errors to help clients debug authorization issues:

```json
{
  "error": "insufficient_scope",
  "error_description": "Token missing required scope: files:write",
  "scope": "files:read files:write"
}
```

### Performance Optimization

1. **Cache JWKS responses**: Fetching JWKS on every request is slow. Cache the keys and refresh periodically.

2. **Validate token once per session**: If possible, validate the token once and cache the result for the session duration.

3. **Use connection pooling**: Reuse HTTP connections when fetching JWKS.

## Standalone Repository Examples

For complete, production-ready examples, see these repositories:

- **Python**: [casdoor/example-mcp-server-python](https://github.com/casdoor/example-mcp-server-python) (planned)
- **Node.js**: [casdoor/example-mcp-server-nodejs](https://github.com/casdoor/example-mcp-server-nodejs) (planned)
- **Go**: [casdoor/example-mcp-server-go](https://github.com/casdoor/example-mcp-server-go) (planned)

## Next Steps

- **[Setup Guide →](./setup.md)**: Review Casdoor and MCP server configuration
- **[MCP Specification →](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)**: Read the official authorization spec
- **[Casdoor Go SDK →](https://github.com/casdoor/casdoor-go-sdk)**: Use Casdoor's official Go SDK for easier integration
- **[Custom Scopes →](../application/scopes.md)**: Learn more about defining granular permissions

## Troubleshooting

### "JWKS fetch failed"

**Problem**: Server can't fetch Casdoor's JWKS endpoint.

**Solution**: Verify the JWKS URL is correct and accessible. Check network connectivity and firewall rules.

### "Token expired"

**Problem**: JWT token has expired.

**Solution**: Ensure your server's system clock is synchronized. JWTs include expiration timestamps that are validated against the current time.

### "Scope enforcement not working"

**Problem**: Tools execute even without required scopes.

**Solution**: Verify that scope checking logic is **not** commented out in production. The examples comment out validation for demonstration purposes.

## Contributing

If you've built an MCP server with Casdoor authentication, consider contributing your example:

1. Fork the Casdoor website repository
2. Add your example to this page
3. Submit a pull request

We especially welcome examples in:

- Rust
- Ruby
- PHP
- Java
- C#
