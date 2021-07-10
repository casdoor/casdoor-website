---
sidebar_position: 1
title: Set up Casdoor
---

## Installation

It is very simple to install Casdoor, you can use `go get`

```shell
go get github.com/casbin/casdoor
```

or use `git clone`

```shell
git clone https://github.com/casbin/casdoor
```

## Config

All configures are placed in `conf/`, including `app.conf` and `oss.conf`. The former stores application-related infomation, while the latter only stores OSS-related configuration. You can modify two files to set all configures.

But for the first time of use, you don’t need to figure out everything, which will be introduced later. Now you just need a few simple configures to run casdoor on your personal computer.

Nevertheless, the database info should be configured first. Casdoor uses [XORM](https://xorm.io/) framework to connect to DB, so all DBs supported by XORM can also be used.

- Setup database (MySQL):

  Casdoor will store its users, nodes and topics informations in a MySQL database named: `casdoor`, will create it if not existed. The DB connection string can be specified at: https://github.com/casbin/casdoor/blob/master/conf/app.conf

  ```ini
  driverName = mysql
  dataSourceName = root:123@tcp(localhost:3306)/
  dbName = casdoor
  ```

- Setup database (Postgres):

  Since we must choose a database when opening Postgres with xorm, you should prepare a database manually before running Casdoor. 

  Let's assume that you have already prepared a database called `casdoor`, then you should specify `app.conf` like this:

  ```ini
  driverName = postgres
  dataSourceName = "user=postgres password=xxx sslmode=disable dbname="
  dbName = casdoor
  ```

  **Please notice:** You can add Postgres parameters in `dataSourceName`, but please make sure that `dataSourceName` ends with `dbname=`. Or database adapter may crash when you launch Casdoor.

- Other database...

## Run

After completing the above simple configuration steps, you can run Casdoor. Casdoor has a front-end back-end separation architecture. The frontend uses javascript and React, backend uses [beego](https://beego.me/) and xorm.

### backend

```shell
go run main.go
```

Or build first, and run:

```shell
go build && ./main
```

### frontend

Casdoor's package management tool uses npm and yarn, so you can choose any. Open a new terminal and run:

```sh
cd web

## npm
npm install
npm run start

## yarn
yarn install
yarn run start
```

Well done, next visit http://127.0.0.1:7001 in your favorite browser, if you can see login page of Casdoor, it means everything is ok!

## Some details

- Github corner

  We added a Github icon in the upper right corner, linking to your Github repository address.
  You could set `ShowGithubCorner` to hidden it.

  Configuration:

    ```javascript
  export const ShowGithubCorner = true

  export const GithubRepo = "https://github.com/casbin/casdoor" //your github repository
    ```

- OSS conf

  We use an OSS to store and provide user avatars. You must modify the file `conf/oss.conf` to tell the backend your OSS info. For OSS providers, we support Aliyun(`[aliyun]`), awss3(`[s3]`) now.

  ```
  [provider]
  accessId = id
  accessKey = key
  bucket = bucket
  endpoint = endpoint
  ```

  Please fill out this conf correctly, or the avatar server won't work!

- App conf

  `conf/app.conf` stores the important configuration of casdoor, which is very helpful for you to use Casdoor better.

  ```
  appname = casdoor
  httpport = 8000
  runmode = dev
  SessionOn = true
  copyrequestbody = true
  driverName = mysql
  dataSourceName = root:123@tcp(localhost:3306)/
  dbName = casdoor
  authState = "casdoor"
  useProxy = false
  verificationCodeTimeout = 10
  ```

  - `appname` is the application name, which currently has no practical use
  - `httpport` is the port that your back-end application is listening on
  - `rundev` is `dev` or `prod`
  - `SessionOn` decides whether to enable session,used by default
  - `driverName`, `dataSourceName` and `dbName` are introduced before, so wont't repeat.
  - `useProxy` set the proxy port, because we have google-related services, which will be restricted by the network in some areas
  - `verificationCodeTimeout` set the expiration time of the verification code. After the expiration, the user needs to obtain it again
  
- If casdoor needs to be publicly accessible(possess public IP), also need to modify `web/src/auth/Auth.js`:

  ```javascript
  export let authConfig = {
    serverUrl: "http://example.com", // your Casdoor URL, like the official one: https://door.casbin.com, or http:1.1.1.1:8000
    ...
  }
  ```

  

