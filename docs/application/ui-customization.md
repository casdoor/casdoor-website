---
title: Customize the look of the sign-in page
sidebar_label: UI customization
description: Change the background, the style, and the position of the sign-in form of an application, add a side panel, and move the design to another Casdoor instance.
keywords: [UI, login, application, customization]
authors: [leo220yuyaodog]
---

This guide explains how to change the look of the sign-in page of an application: the background image, the style of the sign-in form, its position, and an optional side panel.

---

#### Learning outcomes

- Set a background image.
- Style the sign-in form with CSS.
- Position the form and add a side panel.
- Move the design to the same application on another Casdoor instance.

#### What you need

- An [application](/docs/application/overview)

---

All settings on this page are on the **UI Customization** tab of the application edit page. The preview on the tab updates as you change them. This is the result of the steps below:

![Sign-in page with background, side panel, and styled form](/img/application/ui-customization/step4_result2.png)

## Set a background image {#1-background-image}

The default background is white.

![Sign-in page with the default background](/img/application/ui-customization/step1_start.png)

1. Set **Background URL** to the URL of an image. The preview updates when the URL is valid.

   ![Recording of setting the Background URL](/img/application/ui-customization/step1_backgroune_url.gif)

1. To use another image on phones, set **Background URL Mobile**.

## Style the sign-in form {#2-login-panel-style}

1. Enter CSS rules in **Custom CSS**, for example:

   ```css
   .login-panel{
       padding: 40px 30px 0 30px;
       border-radius: 10px;
       background-color: #ffffff;
       box-shadow: 0 0 30px 20px rgba(0, 0, 0, 0.20);
   }
   ```

   ![Recording of editing Custom CSS](/img/application/ui-customization/step2_form_css.gif)

1. To use other rules on phones, set **Custom CSS Mobile**.

:::caution
Enter plain CSS rules only. Casdoor puts the content of **Custom CSS** and **Custom CSS Mobile** into a `<style>` element itself, so a `<style>` wrapper of your own breaks the rules.
:::

If **Custom CSS** is empty, the editor can show a default. To start from it, copy it into the field and save.

![Sign-in page with the styled form](/img/application/ui-customization/step2_end.png)

The main containers of the form are `.login-panel` and `.login-form`. Target them for further changes.

## Position the form {#3-panel-position}

In **Form position**, select **Left**, **Center**, or **Right**.

![Form position setting](/img/application/ui-customization/step3_position.png)

![Sign-in page with the form on the left](/img/application/ui-customization/step3_end.png)

## Add a side panel {#4-side-panel}

1. In **Form position**, select **Enable side panel**. The form moves to the center, with a panel beside it.

   ![Enable side panel option](/img/application/ui-customization/step4_enable_side_panel.png)

1. Enter the content of the panel in **Side panel HTML**. Start from the default template or write your own. Unlike **Custom CSS**, this field takes HTML, so a `<style>` element inside it is fine:

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

1. Adjust the form in **Custom CSS**. Again, enter rules without a `<style>` wrapper:

   ```css
   .login-panel{
     border-radius: 10px;
     background-color: #ffffff;
     box-shadow: 0 0 30px 20px rgba(0, 0, 0, 0.20);
   }
   .login-form {
     padding: 30px;
   }
   ```

   ![Recording of adjusting Custom CSS for the side panel](/img/application/ui-customization/step4_modify_CSS.gif)

## Move the design to another instance {#export-and-import-the-ui-customization}

To move the design of an application to the same application on another Casdoor instance, for example from staging to production, use **Export JSON** and **Import JSON** at the bottom of the application edit page. The buttons appear when you edit an existing application.

1. On the source instance, click **Export JSON**. Casdoor copies a JSON document to the clipboard.
1. On the target instance, open the same application and click **Import JSON**.
1. Paste the JSON and click **OK**. Casdoor fills in the fields.
1. Click **Save**.

The JSON contains the `name` and the `organization` of the application and the following fields: **Logo**, **Favicon**, **Background URL** and its mobile variant, **Custom CSS** and its mobile variant, the position and offset of the form, **Side panel HTML**, the theme, and the header, footer, sign-up, and sign-in HTML. It contains no secrets, providers, or other settings.

:::note
The `name` and the `organization` in the JSON must match the target application. Otherwise, Casdoor rejects the import. The import moves a design between instances, not between different applications.
:::

## See also

- [Customize the theme](/docs/organization/customize-theme)
- [Customize the sign-in page](/docs/application/signin-items-table)
- [Customize the sign-up form](/docs/application/signup-items-table)
