---
title: Store files on a Synology NAS
sidebar_label: Synology NAS
description: Store uploaded files on a Synology NAS through the File Station API of DSM.
keywords: [Synology, NAS, storage, provider]
authors: [xiao-kong-long]
---

This guide explains how to store the uploaded files of Casdoor on a Synology NAS. Casdoor signs in to DSM with a DSM account and uploads the files through the File Station API to the `/home` shared folder, that is, the home folder of that account.

---

#### Learning outcomes

- Add a Synology NAS as a storage provider in Casdoor.

#### What you need

- A Synology NAS that Casdoor can reach over HTTP or HTTPS, with the user home service turned on
- A DSM account for Casdoor without 2-step verification. See the [File Station API guide](https://global.download.synology.com/download/Document/Software/DeveloperGuide/Package/FileStation/All/enu/Synology_File_Station_API_Guide.pdf).
- Administrator access to the Casdoor admin console

---

## Add the provider in Casdoor

1. In the Casdoor admin console, go to **Identity** > **Providers** and add a provider.
1. Set **Category** to `Storage` and **Type** to `Synology`.
1. Fill in the fields. At least **Client ID**, **Client secret**, and **Endpoint** are required.

   | Casdoor field | Synology / meaning | Required |
   |---------------|--------------------|----------|
   | Client ID     | Name of the DSM account | Yes |
   | Client secret | Password of the DSM account | Yes |
   | Endpoint      | URL of DSM, such as `https://nas.example.com:5001` | Yes |
   | Path prefix   | Folder under `/home` for the files | No |

   Casdoor doesn't use **Bucket** for Synology.

   ![Synology provider in Casdoor](/img/providers/storage/synologyConfig.png)

1. Save the provider.

## See also

- [Storage providers](/docs/provider/storage/overview)
