---
title: Quick Start with Docker
description: Get Casdoor running in minutes with Docker
keywords: [Casdoor, Docker, Quick Start, Getting Started]
authors: [hsluoyz]
---

Docker is the fastest way to get Casdoor up and running. Whether you're exploring Casdoor for the first time or setting up a development environment, you'll be logging in within minutes!

## Before You Begin

### System Requirements

**To Run Pre-built Images** (quickest option):

- 💾 At least **100MB** of RAM
- 🖥️ Any OS: Linux, Windows, or macOS
- 🐳 Docker Engine 17.05+ or Docker Desktop

**To Build Images Yourself** (optional):

- 💾 At least **2GB** of RAM (needed for React frontend compilation)
- 🖥️ Any OS: Linux, Windows, or macOS  
- 🐳 Docker Engine 17.05+ or Docker Desktop

:::tip Why 17.05+?

We use Docker's multi-stage build feature introduced in version 17.05. Learn more about [multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/).

:::

### Install Docker

Don't have Docker yet? No problem!

- **Download**: [Get Docker](https://docs.docker.com/get-docker/)
- **Linux users**: Make sure `docker-compose` is installed separately (it's not bundled with Docker Engine)
- **Version check**: Run `docker --version` and ensure it's 17.05 or newer

## Choose Your Docker Image

We provide two official images on DockerHub. Pick the one that fits your needs:

| Image | What's Inside | Best For | Production Ready? |
|-------|--------------|----------|------------------|
| [**casdoor-all-in-one**](https://hub.docker.com/r/casbin/casdoor-all-in-one) | Casdoor + MySQL database | Quick testing & demos | ❌ No (toy database) |
| [**casdoor**](https://hub.docker.com/r/casbin/casdoor) | Just Casdoor | Production use with your own DB | ✅ Yes |

## 🚀 Option 1: Fastest Start (All-in-One)

Perfect for trying out Casdoor without any configuration hassle.

### Start Casdoor

Just run this command:

```bash
docker run -p 8000:8000 casbin/casdoor-all-in-one
```

Docker will automatically download the image if you don't have it yet. Once it starts, you'll see logs indicating that Casdoor is ready.

### Access Casdoor

Open your browser and visit: **[http://localhost:8000](http://localhost:8000)**

### Login

Use the default admin credentials:

```text
Username: admin
Password: 123
```

:::caution Change Default Password

For security, change this password immediately after logging in! Go to your user profile and update it.

:::

**That's it!** You're now running Casdoor. Explore the dashboard, create test users, and see how it works.

## 🔧 Option 2: Standard Image with Custom Configuration

Use this when you want more control over configuration or need to connect to your own database.

### Using Environment Variables (Easiest)

No config file? No problem! Pass settings via environment variables:

```bash
docker run \
  -e driverName=mysql \
  -e dataSourceName='user:password@tcp(your-db-host:3306)/' \
  -p 8000:8000 \
  casbin/casdoor:latest
```

Replace `user`, `password`, and `your-db-host` with your actual database credentials.

### Using a Configuration File (More Options)

For advanced configuration, mount an `app.conf` file into the container.

**Step 1: Create your configuration**

Download the sample config file from [Casdoor's GitHub](https://github.com/casdoor/casdoor/blob/master/conf/app.conf) and save it locally as `conf/app.conf`.

For configuration details, see [Server Installation - Via INI File](/docs/basic/server-installation#via-ini-file).

**Step 2: Run with volume mount**

```bash
docker run -p 8000:8000 -v /path/to/your/conf:/conf casbin/casdoor:latest
```

Replace `/path/to/your/conf` with the actual path to your `conf` directory.

:::note Permission Tip

The Casdoor container runs as user ID 1000. If you're using SQLite or any file-based storage, make sure the mounted directory is readable/writable by UID 1000 to avoid `permission denied` errors.

**Fix permissions if needed:**

```bash
sudo chown -R 1000:1000 /path/to/your/conf
```

:::

**Step 3: Access Casdoor**

Visit **[http://localhost:8000](http://localhost:8000)** and login with:

```text
Username: admin  
Password: 123
```

## 🐳 Option 3: Docker Compose (Recommended for Development)

Docker Compose makes it easy to run Casdoor with a dedicated database in a multi-container setup.

### Setup Steps

**Step 1: Get the docker-compose file**

Create a `docker-compose.yml` file. You can find examples in the [Casdoor repository](https://github.com/casdoor/casdoor).

**Step 2: Create configuration**

In the same directory as your `docker-compose.yml`, create a `conf/` folder and add `app.conf`:

```bash
mkdir conf
cd conf
# Download app.conf from GitHub or create your own
wget https://raw.githubusercontent.com/casdoor/casdoor/master/conf/app.conf
cd ..
```

For configuration details, see [Server Installation - Via INI File](/docs/basic/server-installation#via-ini-file).

**Step 3: Start everything**

```bash
docker-compose up
```

Docker Compose will:

1. 🗄️ Create and start a MySQL database container
2. 🚀 Start the Casdoor container
3. 🔗 Connect them together

Watch the logs as everything spins up. Once you see "Casdoor is running...", you're ready!

**Step 4: Access Casdoor**

Visit **[http://localhost:8000](http://localhost:8000)** and login:

```text
Username: admin
Password: 123
```

:::tip Understanding the Magic

If you peek inside the `docker-compose.yml`, you'll notice an environment variable called `RUNNING_IN_DOCKER`. Here's why it exists:

When Docker Compose creates the database container, it's accessible at `localhost` from your PC, but **not** from inside the Casdoor container. To solve this, we use this environment variable to automatically replace `localhost` with `host.docker.internal`, allowing Casdoor to reach the database.

This saves you from manually editing `app.conf` - one less thing to worry about!

:::

## 🎉 You're All Set!

Casdoor is now running. Here's what to explore next:

### First Steps

1. **🔐 Change the Admin Password**  
   Click on your profile in the top-right corner and update your password.

2. **👥 Create Your First Organization**  
   Navigate to "Organizations" and create one for your project.

3. **📱 Add an Application**  
   Go to "Applications" and register your app that will use Casdoor for authentication.

4. **🔌 Configure Providers** (Optional)  
   Add OAuth providers like GitHub or Google to enable social login.

### Common Tasks

- **Stop Casdoor**: Press `Ctrl+C` in the terminal (or `docker-compose down` for compose setups)
- **View Logs**: `docker logs <container-id>` or `docker-compose logs`
- **Restart**: `docker-compose restart` or restart the container

### Troubleshooting

**Port 8000 already in use?**

```bash
# Use a different port
docker run -p 8080:8000 casbin/casdoor-all-in-one
# Then visit http://localhost:8080
```

**Can't connect to database?**

- Check that your database is running
- Verify connection credentials in `app.conf`
- Ensure firewall allows database connections

**Permission denied errors?**

- Make sure mounted volumes are accessible to UID 1000
- Run: `sudo chown -R 1000:1000 /path/to/conf`

## Next Steps

Now that Casdoor is running, dive deeper:

- **[Core Concepts](/docs/basic/core-concepts)** - Understand organizations, users, and applications
- **[Connect Your App](/docs/how-to-connect/oauth)** - Integrate Casdoor with your application
- **[Production Deployment](/docs/deployment/overview)** - Deploy Casdoor for real-world use
- **[Configuration Guide](/docs/basic/configuration)** - Fine-tune settings for your needs

Questions? Join our [Discord community](https://discord.gg/5rPsrAzK7S) - we're here to help! 🚀
