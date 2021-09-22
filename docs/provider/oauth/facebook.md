---
sidebar_position: 5
title: Facebook
---

To set up Facebook OAuth provider, please go to [Facebok developer](https://developers.facebook.com/apps/) to create a new app.

Select what kind of app you are going to create.

![Facebook select](/img/providers/OAuth/facebookselect.png)

After fill name and contact email, you can enter facebook developer dashboard.

![Dashboard](/img/providers/OAuth/dashboard.png)

Then set up Facebook login:

![Facebook login](/img/providers/OAuth/facebooklogin.png)

Choose Web platform for this app:

![Facebook web](/img/providers/OAuth/facebookweb.png)

After fill the website url, you can go to **Facebook Login > Settings**, and fill valid OAuth Redirect URIs

![Redirecturis](/img/providers/OAuth/facebookredirecturl.png)


:::info Set authorized redirect URLs correctly

In Facebook OAuth config, the `Valid OAuth Redirect URIs` must be **your Casdoor's callback url**, and the `Redirect URL` in Casdoor should be **your application callback url**

More details please read [App config](/docs/application/config#further-understanding)

:::

Basic app configuaration is almost done!

Switch mode from **In development** to **Live** in the top bar of dashboard

![topbar](/img/providers/OAuth/facebooktopbar.png)

Then your `App ID` and `App secrets` can be used in Casdoor.

![facebookapp](/img/providers/OAuth/facebookapp.png)

Add a Facebook OAuth provider and fill the `Client ID` and `Client Secrets` with `App ID` and `App Secrets` in your Casdoor.

![Facebook Client](/img/providers/OAuth/facebookclient.png)

Now you can use Facebook as third party service to complete authentication!