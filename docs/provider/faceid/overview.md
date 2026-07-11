---
title: Face ID overview
description: Use Face ID as a sign-in method.
keywords: [faceid]
authors: [dacongda]
---

Casdoor supports Face ID as a sign-in method. Only enable it when you can ensure the hardware and requests are trusted and not tampered with.

## Add a Face ID provider

1. Open the Casdoor admin UI → **Providers** → **Add**.
2. Set **Category** to **Face ID**.
3. Choose the **Type**:
   - **Alibaba Cloud Facebody** — cloud face recognition (requires the provider's credentials/endpoint).
   - **Local UniFace** — on-device face recognition using the [UniFace](https://github.com/yakhyo/uniface) model, with no external service.
4. Fill in the required fields (e.g. **Client ID**, **Client Secret**, **Endpoint** for cloud types) and save.
