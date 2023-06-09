---
title: 概述
description: 使用 Casbin 管理用户在组织中的访问权限
keywords:
  - 权限
  - Casbin
authors:
  - seriouszyx
  - MagicalSheep
---

## Introduction

Casdoor 中每个组织的应用程序都共享该组织中的所有用户，因此这些用户都可以访问这些应用程序。 有时您可能想限制用户访问某些应用程序或某个应用程序中的某些资源。 在这种情况下，你可以使用由 [Casbin](https://casbin.org/) 实现的 `Permission` 功能。

在继续深入前，你应该对 Casbin 的工作原理及其相关概念有所了解，例如 Model、Policy、Adapter。 简而言之，Model 定义了你的权限策略结构，且请求应当如何匹配这些权限策略以及其所产生的作用。 Policy 则是你具体权限规则描述。 Casbin 在获得了 Model 和 Policy 信息后便可对到来的请求强制执行权限控制。 Adapter 作为抽象层为 Casbin 的执行器屏蔽了 Policy 的来源，使得 Policy 可以存放于各处，例如文件或数据库。

回到 Casdoor 的权限配置话题。 在 Casdoor Web UI 中，你可以在 `Model` 配置项中为你的组织添加 Model，并在 `Permission` 配置项中为你的组织添加 Policy。 借助 [Casbin Online Editor](https://casbin.org/casbin-editor/)，你可以得到适用于你的使用场景的 Model 和 Policy 文件。 你可以很容易地将 Model 文件通过Casdoor Web UI 导入至 Casdoor 中供内置 Casbin 使用。 但对于 Policy 而言（即 Casdoor Web UI 中的 `Permission` 配置项），则需要在此进行一些额外的说明。 让我们在后文继续提及。

正如你的应用需要通过 Casdoor 内置的 Casbin 来强制实施权限控制一样，作为一个内置应用，Casdoor 内部也通过 Casbin 使用自己的 Model 和 Policy 来控制 API 接口的调用权限。 然而，Casdoor 可以通过内部代码来调用 Casbin，而外部应用却无法做到。 因此，Casdoor 为向外部应用暴露了调用内置 Casbin 的 API 接口。 我们将在后文向你展示这些 API 接口的定义及其使用方式。

在本章的末尾，我们将使用一个实际例子来向您展示外部应用程序如何与 Casdoor 协作进行权限控制。

让我们开始吧！
