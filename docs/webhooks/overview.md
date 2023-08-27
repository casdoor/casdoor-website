---
title: Overview
description: Adding Webhooks in Casdoor
keywords: [webhook]
authors: [Tryndamere]
---

## Overview

Event systems enable you to create integrations that subscribe to specific events in Casdoor. When one of these events is triggered, a JSON payload will be sent to the configured URL via a POST request. The application will parse the JSON payload and execute the specified function. Events include signup, login, logout, and user updates, all of which are stored in the action field of the record. Event systems can be used to update an external issue from users.
