---
title: 贡献者指南
description: 贡献者指南
keywords:
  - 贡献者
  - 指南
authors:
  - leo220yuyaodog
---

# 为 Casdoor 做贡献

欢迎使用 Casdoor！ 此文档是介绍如何为 Casdoor 做出贡献的指南

如果您发现有错误或缺失之处，欢迎留下意见或建议

## 开始参与

有许多方式可以为Casdoor做贡献。 以下列出了一些贡献方式：

使用Casdoor并报告问题！ 使用 Casdoor 时，可以提出遇到的问题以促进Casdoor的开发，不管是漏洞还是提议都很欢迎。 Before filing an issue on GitHub, it would be better to discuss first on [Discord](https://discord.com/invite/qteNGWt8UY) or [GitHub Discussions](https://github.com/casdoor/casdoor/discussions)

:::info

创建issue时，请使用英文详细描述您的问题。

:::

帮助编写文档 ！ 从文档开始贡献是一个很好的选择。

帮助解决issue！ 我们准备了一个表格，其中包含适合初学者的简单任务，挑战程度不同 带有不同标签的标签，请查看此处的表格[Casdoor Easy Tasks](https://github.com/orgs/casdoor/projects/1)。

## 贡献

现在，如果您已经准备好创建 PR，在这里是贡献者的工作流：

1. Fork到您自己的仓库

2. 克隆您的fork到本地仓库

3. 创建一个新分支并在其上工作

4. 保持您的分支同步

5. 提交您的更改(请确保您的提交信息简洁)

6. 将你的提交推送到你的fork仓库中

7. 创建从您的分支到我们的**master**分支的合并请求。

## 合并请求

### 开始之前

Casdoor使用GitHub 作为其开发平台。 因此，合并请求是贡献的主要来源。

在您打开拉取请求之前，您需要知道一些基本准则：

- 当你第一次拉取请求时，你需要签名 **CLA**。

- 解释您为什么要发送此 PR 以及此 PR 将会在仓库中做些什么。

- **只允许一次提交**。 请确保每个合并请求只做一件事，否则请分开提交。

- 如果有新添加的文件，请将新文件顶部的 Casdoor 许可证包括在内。

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

您的合并请求应遵循常规承诺的样本。 基本要求是有PR 标题或至少一个 提交消息。 例如，三个常用的PR标题如下：

:::caution

PR 标题必须是小写的。

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

欲了解更多详情，请参阅 [常规承诺](https://www.conventionalcommits.org/en/v1.0.0/#summary)

### 将 PR 链接到问题 (如果存在)

您可以将拉取请求链接到议题，以显示修复正在进行中，并在拉取请求被合并时自动关闭该议题。

#### 使用关键词将拉取请求链接到议题

您可以通过在拉取请求说明或提交消息中使用支持的关键词将拉取请求链接到议题。 拉取请求**必须**在默认分支上。
- close
- fix
- resolve

同一仓库中的问题，例如：

```text
Fix: #902
```

欲了解更多详情，请参阅 [Link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)。

### 修改PRs

您的 PR 可能不可避免地需要修改。 当代码需要更改时，请 **重新使用同一PR**。 不要关闭 PR 并创建新的 PR

下面是一个示例。
- 修改本地代码。
- 修改此提交。
```shell
git commit --amend
```
- 推送代码到远程仓库
```shell
git push --force
```

然后，PR 已成功修改！ 您可以在casdoor仓库中查看。



## 相关代码

一些原则：

可读性 - 重要代码应有充分的文件记录。 代码风格应与现有的风格一致。

#### 命名规范

例如,`signupUrl`对于变量名字,`Signup URL`对于前端UI显示

#### 如何更新 i18n 数据？

请注意，我们使用 [Crowdin](https://crowdin.com/project/casdoor-site) 作为翻译平台和i18next作为翻译工具。 当您在`web/`目录中使用i18next添加一些单词时，您可以运行`i18n/generate_test.go` 自动生成`web/src/locales/**/data.json`。

Run `i18n/generate_test.go`:
```shell
cd i18n && go test
```

默认情况下，所有语言都以英文填写。 鼓励您在您的 PR 已被合并后用 [Crowdin](https://crowdin.com/project/casdoor-site)帮助翻译在`web/src/locales/zh/data.json`新添加的字符串

:::caution

如果您不熟悉其他语言，请不要翻译。 保持文件原样。

:::

## 许可证书

为Casdoor作出贡献，即代表您同意您的贡献将遵循 Apache 许可协议。
