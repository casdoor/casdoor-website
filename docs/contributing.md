---
title: Contributor Guide
description: A guide on how to contribute to Casdoor
keywords: [Contributor, guide]
authors: [leo220yuyaodog]
---

Welcome to Casdoor! This document serves as a guide on how to contribute to Casdoor.

If you find any incorrect or missing information, please leave your comments or suggestions.

## Get Involved

There are many ways to contribute to Casdoor. Here are some ideas to get started:

- Use Casdoor and report issues. When using Casdoor, report any issues—whether they're bugs or proposals—on [GitHub Discussions](https://github.com/casdoor/casdoor/discussions) or on [Discord](https://discord.gg/5rPsrAzK7S) before filing an issue on GitHub.

:::info

Please use English to describe the details of your problem when reporting an issue.

:::

- Help with documentation. Starting your contribution with documentation is a good choice.

- Help solve issues. We have a table containing easy tasks suitable for beginners under [Casdoor Easy Tasks](https://github.com/orgs/casdoor/projects/1), with different levels of challenges labeled with different tags.

## Contributing

If you are ready to create a PR, here is the workflow for contributors:

1. Fork to your own repository.

2. Clone your fork to a local repository.

3. Create a new branch and work on it.

4. Keep your branch in sync.

5. Commit your changes. Make sure your commit message is concise.

6. Push your commits to your forked repository.

7. Create a pull request from your branch to our **master** branch.

## Pull Requests

### Before You Get Started

Casdoor uses GitHub as its development platform, and pull requests are the primary source of contributions.

Here are some things you need to know before opening a pull request:

- You need to sign the **CLA** when you first create a pull request.

- Explain why you are submitting the pull request and what it will do to the repo.

- Only one commit is allowed per pull request. If the PR does more than one thing, please split it into multiple PRs.

- If there are any newly added files, please include the Casdoor license at the top of the new file(s).

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

### Semantic PRs

Your pull requests should follow the Conventional Commits spec. The basic requirement is that only the PR title or at least one commit message. For example, three commonly used PR titles are given below:

:::caution

PR titles must be in lowercase.

:::

1. **fix**: a commit of the _type_ `fix` patches a bug in your codebase.

    ```text
    fix: prevent racing of requests
    ```

2. **feat**: a commit of the _type_ `feat` introduces a new feature to the codebase.

    ```text
    feat: allow provided config object to extend other configs
    ```

3. **docs**: a commit of the _type_ `docs` adds or improves documentation.

    ```text
    docs: correct spelling of CHANGELOG
    ```

For more details, please refer to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) page.

### Linking PRs with Issues

You can link a pull request to an issue to show a fix is in progress and to automatically close the issue when the pull request is merged.

#### Linking a Pull Request to an Issue Using a Keyword

You can link a pull request to an issue by using a supported keyword in the pull request's description or in a commit message. The pull request **must be** on the default branch.

- close
- fix
- resolve

An issue in the same repository, for instance:

```text
Fix: #902
```

For more details, please refer to [Linking a Pull Request to an Issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue).

### Modifying PRs

Your PR may need revision. Please modify the same PR when the code needs changes; don't close the PR and open a new one. Here is an example:

- Modify the code on your local.

- Modify your commit.  

```shell
git commit --amend
```

- Push to your remote repository.  

```shell
git push --force
```

Then, you will have successfully modified the PR!

## Code Related

Some Principles:

- Readability: important code should be well-documented. Code style should comply with the existing one.

### Naming Convention

For instance, `signupUrl` for variable names, `Signup URL` for UI.

### How to Update i18n Data?

Please note that we use [Crowdin](https://crowdin.com/project/casdoor-site) as a translating platform and i18next as a translating tool. When you add strings using i18next in the `web/` directory, you can run the `i18n/generate_test.go` to auto-generate `web/src/locales/**/data.json`.

Run `i18n/generate_test.go`:

```shell
cd i18n && go test
```

All languages are filled in English by default. After your PR has been merged, you are encouraged to help translate the newly added
strings in `web/src/locales/zh/data.json` by [Crowdin](https://crowdin.com/project/casdoor-site).

:::caution

If you are not familiar with a language, please do not translate it; keep the file as it is.

:::

## License

By contributing to Casdoor, you agree that your contributions will be licensed under the Apache License.
