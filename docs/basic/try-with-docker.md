---
sidebar_position: 2
title: (Optional) Try with Docker
---

## Requirements

### OS

All OSes (Linux, Windows and macOS) are supported.

### Environment

You can use **docker** in Linux and **Docker Desktop** in Windows and macOS.

* [Docker](https://docs.docker.com/get-docker/)

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

### **Option-2**: Bring your own database

Configure your database by modifying the following items in `conf/app.conf` like a normal Casdoor installation:

```bash
driverName = mysql
dataSourceName = root:123456@tcp(localhost:3306)/
dbName = casdoor
```

Then run:

```bash
docker-compose up
```

That's it! :small_airplane:

Visit: [**http://localhost:8000**](http://localhost:8000) in your browser. Log into Casdoor dashboard with the default global admin account: `built-in/admin`

```bash
admin
123
```
