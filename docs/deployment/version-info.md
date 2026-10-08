---
title: Version information
description: How Casdoor determines its version in source builds, release binaries, and Docker images, and how to read it.
keywords: [version, git, release, docker]
authors: [dacongda]
---

Casdoor reports its version through the `/api/get-version-info` endpoint. The endpoint works the same way for a source checkout, a release binary, and a Docker image.

## Check the version

Call the endpoint:

```bash
curl http://localhost:8000/api/get-version-info
```

The response contains the version, the commit, and the number of commits since the version tag:

```json
{
  "version": "v1.500.0",
  "commitId": "abc123def456...",
  "commitOffset": 0
}
```

The monitoring page of the admin console shows the same version.

## Where the version comes from

Casdoor takes the version from one of two sources.

### Git, for source builds

When Casdoor runs from a clone that has a `.git` directory, it reads the latest tag, the current commit hash, and the number of commits since the tag. For example, three commits after the tag `v1.500.0`, Casdoor reports the version `v1.500.0`, the offset `3`, and the hash of the current commit.

### Embedded values, for releases and Docker images

Release binaries and Docker images don't contain a `.git` directory. The release pipeline writes the version into `util/variable.go` before it compiles Casdoor:

```go
var (
    Version      = "v1.500.0"
    CommitId     = "abc123..."
    CommitOffset = 0
)
```

## See also

- [Install the Casdoor server](/docs/basic/server-installation)
- [Web UI monitoring](/docs/monitoring/Web-UI)
