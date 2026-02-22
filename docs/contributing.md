---
title: Contributor guide
description: "How to contribute to Casdoor: code, documentation, and community."
keywords: [contributor, guide, pull request, CLA]
authors: [leo220yuyaodog]
---

Welcome to Casdoor. This guide explains how to contribute.

For incorrect or missing information in the docs, open an issue or suggest an edit.

## Get involved

Ways to contribute:

- **Use Casdoor and report issues.** For bugs or feature ideas, start with [GitHub Discussions](https://github.com/casdoor/casdoor/discussions) or [Discord](https://discord.gg/5rPsrAzK7S) before opening a GitHub issue.

:::info
When reporting an issue, describe the problem in **English**.
:::

- **Improve documentation.** Doc fixes and clarifications are a great first contribution.

- **Tackle issues.** [Casdoor Easy Tasks](https://github.com/orgs/casdoor/projects/1) lists beginner-friendly issues with different difficulty levels.

## Submitting changes

When you’re ready to contribute code or docs:

1. Fork the repository to your account.
2. Clone your fork locally.
3. Create a new branch and make your changes.
4. Keep your branch up to date with the upstream **master** branch.
5. Commit with clear, concise messages.
6. Push your branch to your fork.
7. Open a pull request from your branch to the **master** branch.

## Pull requests

### Before you start

- You must sign the **CLA** (Contributor License Agreement) when you open your first pull request.
- Describe the purpose of the PR and what it changes.
- **One logical change per PR.** If the PR does several unrelated things, split it into multiple PRs.
- **One commit per PR.** Squash your changes into a single commit.
- For **new files**, add the Casdoor license header at the top.

```text
// Copyright 2022 The Casdoor Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
```

### Conventional commits

PR titles (and commit messages) should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) spec.

:::caution
PR titles must be in **lowercase**.
:::

Examples:

- **fix** — Bug fix: `fix: prevent racing of requests`
- **feat** — New feature: `feat: allow provided config object to extend other configs`
- **docs** — Documentation: `docs: correct spelling of CHANGELOG`

See [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) for the full spec.

### Linking PRs to issues

Link a PR to an issue so the issue closes automatically when the PR is merged. In the PR description or a commit message on the default branch, use one of these keywords followed by the issue number: `close`, `fix`, or `resolve`.

Example: `Fix: #902`

See [GitHub: Linking a pull request to an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue).

### Updating your PR

If reviewers request changes, update the same PR instead of closing it and opening a new one:

1. Make the changes locally.
2. Amend the commit: `git commit --amend`
3. Push: `git push --force`

## Code guidelines

- **Readability:** Important logic should be documented. Follow the existing code style in the project.

### Naming

- **Code:** camelCase (e.g. `signupUrl`).
- **UI strings:** Title Case with spaces (e.g. “Signup URL”).

### Updating i18n data

We use [Crowdin](https://crowdin.com/project/casdoor-site) and i18next for translations. When you add new UI strings with i18next under `web/`, run:

```shell
cd i18n && go test
```

This regenerates `web/src/locales/**/data.json`. New keys are filled with English by default. After the PR is merged, translations can be added on [Crowdin](https://crowdin.com/project/casdoor-site).

:::caution
Do not translate into a language you are not confident in; leave the default (English) as is.
:::

## License

By contributing, you agree that your contributions are licensed under the Apache License.
