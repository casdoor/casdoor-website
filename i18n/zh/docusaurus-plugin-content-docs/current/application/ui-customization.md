---
title: 自定义登录界面
description: 自定义您的应用程序登录页面
keywords:
  - 用户界面
  - 登录
  - 应用程序
authors:
  - leo220yuyaodog
---

您已创建应用程序。 下面将向您展示如何自定义应用程序的登录界面。 在本指南中，我们将创建以下应用程序登录页面：

![步骤 4_result2.png](/img/application/ui-customization/step4_result2.png)

让我们开始吧！

## 1、添加背景图像

首先，我们要添加背景图像。 默认背景是白色的 ，看起来很简约。

![步骤 1_start.png](/img/application/ui-customization/step1_start.png)

- `背景URL` 背景图像URL。

选择您喜欢的背景图像并填写 `背景 URL`。 如果您填写了有效的URL，预览区域将会显示您所选择的图像。

![步骤1_backgroune_url.gif](/img/application/ui-customization/step1_backgroune_url.gif)

## 2、自定义登录面板

现在我们在第一步操作结束的页面：

![步骤 1_end.png](/img/application/ui-customization/step1_end.png)

现在您需要添加一些css使面板看起来更美观。 您可以复制下面的代码并粘贴到字段 `Form CSS` 中。

```html
<style>
.login-panel{
    padding: 40px 30px 0 30px;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 0 30px 20px rgba(0, 0, 0, 0.20);
}
</style>
```

![步骤 2_form_css.gif](/img/application/ui-customization/step2_form_css.gif)

::::tip

当您编辑 `form CSS`时，如果值为空，编辑器将显示默认值。 但并不是填在字段中。 您需要复制内容并粘贴。

:::

填写 `表单 CSS`后，不要忘记在底部保存配置。 好，让我们看看效果。

![步骤 2_end.png](/img/application/ui-customization/step2_end.png)

## 3、选择面板位置

现在登录页面就比刚开始的页面更为美观。 我们还为您提供了三个按钮，可以决定面板的位置。

![步骤 3_position.png](/img/application/ui-customization/step3_position.png)

例如，选择 **Right** 按钮：

![步骤 3_end.png](/img/application/ui-customization/step3_end.png)

## 4、启用侧面板

您现在将看到如何启用侧面板并自定义样式。

首先选择按钮。 在 **启用侧面板** 模式时，面板在中间位置。

![启用side_panel.pan.png](/img/application/ui-customization/step4_enable_side_panel.png)

然后编辑 `侧面板HTML`，它决定了侧面板中显示的内容。 与 `Form CSS`相同，我们提供了一个默认模板。 复制粘贴即可。

```html
<style>
  .left-model{
    text-align: center;
    padding: 30px;
    background-color: #8ca0ed;
    position: absolute;
    transform: none;
    width: 100%;
    height: 100%;
  }
  .side-logo{
    display: flex;
    align-items: center;
  }
  .side-logo span {
    font-family: Montserrat, sans-serif;
    font-weight: 900;
    font-size: 2.4rem;
    line-height: 1.3;
    margin-left: 16px;
    color: #404040;
  }
  .img{
    max-width: none;
    margin: 41px 0 13px;
  }
</style>
<div class="left-model">
  <span class="side-logo"> <img src="https://cdn.casbin.org/img/casdoor-logo_1185x256.png" alt="Casdoor" style="width: 120px"> 
    <span>SSO</span> 
  </span>
  <div class="img">
    <img src="https://cdn.casbin.org/img/casbin.svg" alt="Casdoor"/>
  </div>
</div>
```

好，让我们看看效果。 带有徽标和图像的侧面板已显示出来，但整体效果看起来差强人意。

![步骤 4_result1.png](/img/application/ui-customization/step4_result1.png)

您需要修改 `Form CSS` 中的一些css。

![步骤4_modify_CSS.gif](/img/application/ui-customization/step4_modify_CSS.gif)

最后代码如下。

```html
<style>
  .login-panel{
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 0 30px 20px rgba(0, 0, 0, 0.20);
}
  .login-form {
    padding: 30px;
  }
</style>
```

:::info

`.login-panel`, `.login-form` 是div的类名。 它们对应于页面的不同区域。 欲了解更多详情，您可以通过开发者工具搜索。 在确认类名称后，您可以在这里填写 CSS 以更灵活的方式自定义登录页面。

:::

最后，我们便设置好了一个美观的登录页面。

![步骤 4_result2.png](/img/application/ui-customization/step4_result2.png)

## 总结

我们来总结一下：我们已添加背景图像，自定义了登录面板的风格，并且启用了侧边板。

更多关于Casdoor应用程序的介绍：

- [Customize theme](/docs/organization/customize-theme) Customize the theme, including primary color, border radius.
- [注册项目表](/docs/application/signup-items-tabel)
- [应用程序配置](/docs/application/config)

感谢您的阅读！
