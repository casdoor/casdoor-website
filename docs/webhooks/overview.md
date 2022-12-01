---
title: Overview
description: Add webhooks in Casdoor
keywords: [webhook]
authors: [Trydamere]
---

## Overview

Event systems allow you to build integrations, which subscribe to certain events on Casdoor. When one of those event is triggered, we'll send a POST json payload to the configured URL. The application parsed the json payload and carry out the hooked function. Events consist of signup, login, logout, update users, which are stored in the action field of the record. Event systems can be used to update an external issue from users.
