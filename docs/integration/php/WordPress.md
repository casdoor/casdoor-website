---
title: WordPress
description: Integrating CAS (Central Authentication Service) into WordPress using Casdoor (identity provider) and the wp-cassify plugin.
keywords: [WordPress, wp-cassify, CAS Authentication]
authors: [Attack825]
---

This guide walks you through configuring **CAS-based single sign-on (SSO)** for WordPress, using:

- [wp-cassify](https://wordpress.org/plugins/wp-cassify/): A WordPress plugin that enables CAS authentication, allowing users to log into WordPress via a CAS server (e.g., Casdoor).

## Step 1: Deploy Casdoor and WordPress

First, deploy Casdoor (as the CAS server) and WordPress.

### 1.1 Deploy Casdoor

Refer to the official Casdoor installation guide: [Casdoor Server Installation](https://casdoor.org/docs/basic/server-installation).  

After deployment:

1. Access the Casdoor web UI via its public/private URL (e.g., `http://<casdoor-server-ip>:8000`).
2. Log in with the default admin credentials (or your custom credentials set during deployment).
3. Confirm you can navigate the dashboard (e.g., access "Applications", "Users")—this ensures Casdoor is ready to act as a CAS IdP.

### 1.2 Deploy WordPress

Deploy WordPress using your preferred method:

- **Docker**: Use the official WordPress Docker image for quick setup (see [WordPress Docker Docs](https://hub.docker.com/_/wordpress)).
- **Traditional Hosting**: Install WordPress on a LAMP/LEMP stack (follow [WordPress Official Installation](https://wordpress.org/support/article/how-to-install-wordpress/)).

1. Access the WordPress site via its URL (e.g., `http://<wordpress-server-ip>`).
2. Complete the initial WordPress setup (create an admin account, site title).
3. Log in to the WordPress Admin Dashboard (`http://<wordpress-server-ip>/wp-admin`) to confirm functionality.

## Step 2: Create a Casdoor Application

Casdoor requires an "Application" to act as a bridge between the CAS server and WordPress. Follow these steps to create one:

1. Log in to the Casdoor Admin Dashboard.
2. Navigate to **Applications** > **Add Application**
3. Click **Save** to create the application.

![Add Application](/img/integration/php/WordPress/add_application.png)

## Step 3: Configure the wp-cassify Plugin

The wp-cassify plugin connects WordPress to your Casdoor CAS server. Follow these steps to install and configure it:

### 3.1 Install wp-cassify

1. Log in to the WordPress Admin Dashboard (`http://<wordpress-server-ip>/wp-admin`).
2. Navigate to **Plugins** > **Add New**.
3. In the search bar, type "wp-cassify" and select the plugin by "wp-cassify".
4. Click **Install Now**, then **Activate** to enable the plugin.

### 3.2 Configure wp-cassify Settings

1. In the WordPress Admin Dashboard, navigate to **Settings** > **WP-Cassify** (the plugin’s configuration page).

2. Configure User General Settings.

   | wp-cassify Setting       | Value to Enter                                                                 |
   |--------------------------|---------------------------------------------------------------------------------|
   | `CAS Server Base URL`         | Your Casdoor CAS endpoint (e.g., `http://<casdoor-server-ip>:7001/cas/<organization name>/<application name>`).     |
   | `Create user if not exist` | Enable |

   ![General Settings](/img/integration/php/WordPress/general_settings.png)

3. Configure User Attribute Synchronization.

   | WordPress User Field | Casdoor Attribute Name | Example Value          |
   |----------------------|------------------------|------------------------|
   | `user_email`              | `email`                | <user@example.org>       |
   | `user_nickname`       | `displayName`          | John Doe               |
   | `display_name`       | `displayName`          | John Doe               |

   ![Attribute Synchronization](/img/integration/php/WordPress/attribute_synchronization.png)

## Step 4: Test CAS Authentication

Verify the integration works by logging into WordPress via Casdoor:

1. Log out of the WordPress Admin Dashboard (if logged in).
2. Access the WordPress login page (`http://<wordpress-server-ip>/wp-admin/index.php`).
3. You’ll be redirected to the Casdoor login page. Enter valid Casdoor user credentials.
4. After successful authentication, Casdoor will redirect you back to WordPress—you should now be logged in (as the synced user).
![WordPress cas](/img/integration/php/WordPress/wordpress_cas_sso.png)
