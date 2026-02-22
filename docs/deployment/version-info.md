---
title: Version information
description: How Casdoor reports its version for binaries, Docker, and git builds.
keywords: [version, git, release, docker]
authors: [dacongda]
---

Casdoor exposes its version via the `/api/get-version-info` API so the running version can be checked in any environment.

## How it works

Version data comes from one of two places:

### From git (development or source builds)

When Casdoor runs from a clone that has a `.git` directory, it reads the current tag, commit hash, and commit offset from git. For example, three commits after `v1.500.0` yields version `v1.500.0`, offset `3`, and the current commit hash.

### From embedded values (releases and Docker)

Official binaries and Docker images do not ship with `.git`. The release pipeline writes version data into `util/variable.go` at build time:

```go
var (
    Version      = "v1.500.0"
    CommitId     = "abc123..."
    CommitOffset = 0
)
```

Those values are compiled into the binary, so the version API works the same for GitHub binaries and Docker images as for a git checkout.

## Checking the version

Call the API:

```bash
curl http://localhost:8000/api/get-version-info
```

Response format:

```json
{
  "version": "v1.500.0",
  "commitId": "abc123def456...",
  "commitOffset": 0
}
```

The same endpoint is used for source, binary, and Docker. The web UI monitoring page also shows this version.
