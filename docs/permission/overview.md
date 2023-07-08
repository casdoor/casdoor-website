---
title: Overview
description: Using Casbin to manage users' access rights in organization
keywords: [permission, Casbin]
authors: [seriouszyx, MagicalSheep]
---

## Introduction

All users associated with a single Casdoor organization are shared between the organization's applications and therefore have access to the applications. Sometimes you may want to restrict users' access to certain applications, or certain resources in a certain application. In this case, you can use `Permission` implemented by [Casbin](https://casbin.org/). 

Before going further, you should have an understanding of how Casbin works and its related concepts, such as Model, Policy, and Adapter. In short, Model defines your permission policy structure, and how requests should match these permission policies and their effects. Policy is the description of your specific permission rules. After Casbin obtains Model and Policy information, it can enforce permission control on incoming requests. As an abstraction layer, Adapter shields the source of Policy for Casbin's executor, so that Policy can be stored everywhere, such as files or databases. 

Back to the topic of permission configuration in Casdoor. In the Casdoor Web UI, you can add a Model for your organization in the `Model` configuration item, and a Policy for your organization in the `Permission` configuration item. With [Casbin Online Editor](https://casbin.org/editor), you can get Model and Policy files suitable for your usage scenarios. You can easily import the Model file into Casdoor through the Casdoor Web UI for use by the built-in Casbin. But for Policy (that is, the `Permission` configuration item in the Casdoor Web UI), some additional instructions are required here. Let us continue to mention later. 

Just as your application needs to enforce permission control through the built-in Casbin of Casdoor, as a built-in application, Casdoor also uses its Model and Policy to control the calling permissions of the API interface through Casbin. However, Casdoor can call Casbin from internal code, but external applications cannot. Therefore, Casdoor exposes an API for calling the built-in Casbin to external applications. We will show you the definitions of these API interfaces and how to use them later.

End of the chapter, we will use a practical example to show you how Casdoor cooperates with external applications for permission control. 

Let's start!
