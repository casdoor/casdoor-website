---
sidebar_position: 2
title: (Optional) Try with Docker
---

## Requirements

### OS

All OSes (Linux, Windows and macOS) are supported.

### Environment

You can use **docker(docker engine version > 17.05)** in Linux or **Docker Desktop** in Windows and macOS.

* [Docker](https://docs.docker.com/get-docker/)

For Linux users, you also need to make sure that docker-compose is installed, considering that it is seperate from Docker.

Users of all platforms must ensure that the **docker engine version > 17.05.** It is because that we used multi-stage build feature in docker-compose.yml, which was supported after 17.05. See <https://docs.docker.com/develop/develop-images/multistage-build/> for more information.

## Get the image

We have provided two DockerHub images:

Name | Description | Suggestion
----|------|----
[casdoor-all-in-one](https://hub.docker.com/r/casbin/casdoor-all-in-one) | Both Casdoor and a MySQL database are inside the image | Already includes a toy database and only for test purpose
[casdoor](https://hub.docker.com/r/casbin/casdoor) | Only Casdoor is inside the image | Can be connected to your own database and used in production


1. casbin/casdoor-all-in-one, in which casdoor binary, a mysql database and all necessary configurations are packed up. This image is for new user to have a trial on casdoor quickly. **With this image you can start a casdoor immediately with one single command (or two) without any complex configuration**. **Note: we DO NOT recommend you to use this image in productive environment**

### **Option-1**: Use the toy database

Run the container with port `8000` exposed to host. It will automatically pull the image if it doesn't exist in the local host.

```shell
docker run -p 8000:8000 casbin/casdoor-all-in-one
```

Visit: [**http://localhost:8000**](http://localhost:8000) in your browser. Log into Casdoor dashboard with the default global admin account: `built-in/admin`

```bash
admin
123
```

### **Option-2**: Try with docker-compose

Create a sepereate database by docker-compose 

```bash
docker-compose up
```

That's it! :small_airplane:

Visit: [**http://localhost:8000**](http://localhost:8000) in your browser. Log into Casdoor dashboard with the default global admin account: `built-in/admin`

```bash
admin
123
```

*Note: if you dive deeper into the docker-compose.yml, you may be puzzled by the environment variable we created in it called "RUNNING_IN_DOCKER". When database 'db' is created via docker-compose, it is available on localhost of your pc but not localhost of the casdoor container. To prevent you from the troubles caused by modifying app.conf which are pretty difficult for a new user, we provided this environment variable and pre-assigned it in  docker-compose.yml. When this environment variable is true, localhost will be replaced with host.docker.internal so that you casdoor can visit the db.*

### **Option-3** Try directly with standard image

Modify the following items in `conf/app.conf` like a normal Casdoor installation:

```bash
driverName = mysql
dataSourceName = root:123456@tcp(localhost:3306)/
dbName = casdoor
```
**This is merely a sample and you need to modify them according to your own database**


*Note: if it is not convenient to mount the configuration file to a container, using environment variables is also a possible solution see [Via Environment Variables](/docs/basic/server-installation#via-environment-variables) for details*

Then run 
```
docker run casbin/casdoor -p 8000:8000 -v <path to directory containing app.conf>:/conf
```

Anyway just **mount the app.conf to /conf/app.conf** and start it.

Visit: [**http://localhost:8000**](http://localhost:8000) in your browser. Log into Casdoor dashboard with the default global admin account: `built-in/admin`

```bash
admin
123
```

