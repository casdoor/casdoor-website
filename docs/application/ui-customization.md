---
title: Login UI Customization
description: Customize the login page UI for your application
keywords: [UI, login, application]
author: leo220yuyaodog
---

You have created the application. Here will show you how to customize the login page UI of the application. In this guide we will create the following application login page:

![step4_result2.png](/img/application/ui-customization/step4_result2.png)

Let's start!

## Part1: Add a background image

First, let's add a background image. The default background is white. It looks very simple.

![step1_start.png](/img/application/ui-customization/step1_start.png)

- `Background URL` The background image url.

Choose the background image you like and fill the `Background URL`. The preview area will display the image, if you fill the valid url.

![step1_backgroune_url.gif](/img/application/ui-customization/step1_backgroune_url.gif)

## Part2: Customize the login panel

Here's where you were at the end of the 1st part:

![step1_end.png](/img/application/ui-customization/step1_end.png)

Now you need to add some css to make the panel look nice. You can copy the code below and paste it in the field `Form CSS`.

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

![step2_form_css.gif](/img/application/ui-customization/step2_form_css.gif)

:::tip

When you edit the `form CSS`, if the value is empty, the editor will show the default value. But it is not fill in the field. You need to copy the content and paste.

:::

After filling the `form CSS`, don't forget to save the config at the bottom. Ok, let's see the effect.

![step2_end.png](/img/application/ui-customization/step2_end.png)

## Part3: Select the Panel position

Now the login page is much prettier than it did at the beginning. We also provide three buttons for you to decide the position of the panel.

![step3_position.png](/img/application/ui-customization/step3_position.png)

For example, select the **Right** button:

![step3_end.png](/img/application/ui-customization/step3_end.png)

## Part4: Enable the side panel

You will see now how you can enable a side panel and customize the style.

First, select the button. In **enable side panel** mode, the panel will be in center.

![enable_side_panel.png](/img/application/ui-customization/step4_enable_side_panel.png)

Then edit the `Side panel HTML`, it decides what content will show in the side panel. Same as the `Form CSS`, we provide a default template.
Just copy and paste.

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

Let's see the effect. The side panel with a logo and image is shown, but the result was not satisfactory.

![step4_result1.png](/img/application/ui-customization/step4_result1.png)

You need to modify and add some css in `form CSS`.

![step4_modify_CSS.gif](/img/application/ui-customization/step4_modify_CSS.gif)

The final code is as follows.

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

`.login-panel`, `.login-form` are the class names of div. They correspond to different areas of the page. For more details, you can check them through developer tools.
After making sure the class names, you can customize the login page more flexibly by writing CSS here.

:::

Finally, we get a beautiful login page.

![step4_result2.png](/img/application/ui-customization/step4_result2.png)

## Review

OK, so let's sum it up: we have added a background image, customized the login panel style and enabled the side panel.

More introduction about application in Casdoor:

- [Signup Items Table](/docs/application/signup-items-tabel)
- [Application Config](/docs/application/config)

Thanks for reading!
