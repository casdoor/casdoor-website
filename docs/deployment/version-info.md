---
title: Version Information
description: How Casdoor tracks and reports its version
keywords: [version, git, release, docker]
authors: [dacongda]
---

Casdoor provides version information through its `/api/get-version-info` endpoint, making it easy to verify which version is currently running. The version tracking system adapts to different deployment scenarios, ensuring you always know exactly what code you're running.

## How it Works

When you run Casdoor, the version information comes from one of two sources depending on your environment.

### Development and Git Environments

If you're running Casdoor from a cloned git repository, version information is extracted directly from git. The system reads the latest tag, commit hash, and commit offset automatically. This means developers and contributors always get accurate version details without any manual configuration.

For example, if you're three commits ahead of version `v1.500.0`, Casdoor will report the version as `v1.500.0` with a commit offset of `3` and show the current commit hash.

### Official Releases and Docker Images

For official binary releases and Docker images, git isn't available since these distributions don't include the `.git` folder. To solve this, the build process embeds version information directly into the code during compilation.

When creating a release, the CI pipeline runs a test that extracts version details from git and writes them to a Go source file (`util/variable.go`). This file contains three variables:

```go
var (
    Version      = "v1.500.0"
    CommitId     = "abc123..."
    CommitOffset = 0
)
```

These values are then compiled into the binary, making the version information permanently available even without git. Whether you download a binary from GitHub Releases or pull the Docker image from DockerHub, the version API returns the exact same information as if you were running from the original git repository.

## Accessing Version Information

To check your Casdoor version, simply call the API endpoint:

```bash
curl http://localhost:8000/api/get-version-info
```

The response includes the version tag, commit ID, and commit offset:

```json
{
  "version": "v1.500.0",
  "commitId": "abc123def456...",
  "commitOffset": 0
}
```

This works identically whether you're running from source, a binary release, or a Docker container. The monitoring page in Casdoor's web UI also displays this version information, giving administrators quick visibility into what's deployed.
