---
title: Contributor guide
description: Contributor guide
keywords: [Contributor, guide]
---

# Contributing to Casdoor

Welcome to Casdoor! This document is a guideline about how to contribute to Casdoor.

If you find something incorrect or missing, please leave comments / suggestions.

## Get involved

There are many ways to contribute to Casdoor. Here are some ideas to get started:

Use Casdoor and report issues! When using Casdoor, report issues to promote development of Casdoor, no matter bugs or proposal. Before filing an issue on GitHub, it would be better to discuss first on [Gitter](https://gitter.im/casbin/casdoor),
[Casbin Forum](https://forum.casbin.com/) or QQ group: [645200447](https://qm.qq.com/cgi-bin/qm/qr?k=SCBnKNj_1ljeXFT2dk8cwoGQwc5lFy8l&jump_from=webapi)

:::info

When reporting an issue, please use English to describe the details of your problem.

:::

Help with docs! Contributing start from docs is a good choice to start your contribution.

Help solve issues! We prepare a table containing easy tasks suitable for beginners, with different levels of challenges labeled with different tags, check the table here [Casdoor Easy Tasks](https://github.com/orgs/casdoor/projects/1).

## Contributing

Now, if you are ready to create PR, here is the workflow for contributors:

1. Fork to your own

2. Clone fork to a local repository

3. Create a new branch and work on it

4. Keep your branch in sync

5. Commit your changes (make sure your commit message is concise)

6. Push your commits to your forked repository

7. Create a pull request from your branch to our **master** branch.

## Pull Requests

### Before you get started

Casdoor uses GitHub as its developing platform. So the pull requests are the main source of contributions.

There are something you need to know before you open a pull request:

- When you first pull request, you need to sign the **CLA**.

- Explain why you send this PR and what this PR would do to the repo.

- **One commit is allowed**. Make sure the PR does only one thing, otherwise please split it.

- If there are newly added files, please include Casdoor license to the top of new file(s).

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

The PR title must be in lower case.

:::

1. **fix**: a commit of the _type_ `fix` patches a bug in your codebase.
```text
fix: prevent racing of requests
```

2. **feat**: a commit of the _type_ `feat` introduces a new feature to the codebase.
```text
feat: allow provided config object to extend other configs
```

3. **docs**: a commit of the _type_ `docs` add or improve a document.
```text
docs: correct spelling of CHANGELOG
```

For more details, please refer to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary).

### Link PR with issue (if existed)

You can link a pull request to an issue to show that a fix is in progress and to automatically close the issue when the
pull request is merged.

#### Linking a pull request to an issue using a keyword

You can link a pull request to an issue by using a supported keyword in the pull request's description or in a commit message. The pull request **must be** on the default branch.
- close
- fix
- resolve

Issue in the same repository, for example:

```text
Fix: #902
```

For more details, please see [Link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue).

### Modify PRs

Inevitably, your PR may need to be revised. Please **re-use** the same PR when the code needs changes. Don't close the PR and open a new one.

Here is a possible example:
- Modify the code in your local.
- Modify this commit.  
```shell
git commit --amend
```
- Push to your remote repository.  
```shell
git push --force
```

Then the PR has been modified successfully! You can check it in Casdoor repository.



## Code Related

Some principles:

Readability - Important code should be well-documented. Code style should be complied with the existing one.

#### Naming convention

e.g.,`signupUrl`for var names,`Signup URL`for UI

#### How to update i18n data?

Please note that we use [Crowdin](https://crowdin.com/project/casdoor-site) as translating platform and i18next as
translating tool. When you add some words using i18next in the `web/` directory, you can run the `i18n/generate_test.go`to auto-generate the `web/src/locales/**/data.json`.

Run `i18n/generate_test.go`:
```shell
cd i18n && go test
```

All languages are filled in English by default. You are encouraged to help translate the newly added
strings in the `web/src/locales/zh/data.json` by [Crowdin](https://crowdin.com/project/casdoor-site) after your PR has been merged.

:::caution

If you are not familiar with other language, please don't translate it. Keep the file as it is.

:::

## License

By contributing to Casdoor, you agree that your contributions will be licensed under its Apache License.