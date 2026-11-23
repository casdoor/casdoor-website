---
title: Install the Casdoor device agent
sidebar_label: Device agent
description: Install the Casdoor device agent on Windows, macOS or Linux, enroll the computer with an organization, start the agent at sign-in, and check the posture that it reports.
keywords: [device agent, device trust, enroll device, device posture, BitLocker, FileVault, casdoor-device-agent]
authors: [hsluoyz]
---

The Casdoor device agent is a small open source program for Windows, macOS and Linux that [device trust](/docs/device-trust/overview) relies on. It enrolls the computer with an organization, reports the security posture of the computer to Casdoor, and signs the sign-ins of the Casdoor sign-in page in the browser.

---

#### Learning outcomes

- Install the agent and enroll the computer.
- Start the agent at sign-in.
- Check the posture and the status of the computer.

#### What you need

- An organization with device trust turned on, see [Device trust](/docs/device-trust/overview).
- An account in that organization.

---

## Install the agent

1. Download the binary for your system from the [releases of casdoor-device-agent](https://github.com/casdoor/casdoor-device-agent/releases): `windows-amd64.exe`, `windows-arm64.exe`, `darwin-amd64`, `darwin-arm64`, `linux-amd64` or `linux-arm64`.
1. Rename it to `casdoor-device-agent` (`casdoor-device-agent.exe` on Windows) and put it in a folder of your `PATH`. On macOS and Linux, make it executable with `chmod +x casdoor-device-agent`.

To build it yourself, install Go and run `go build -o casdoor-device-agent .` in a clone of [casdoor/casdoor-device-agent](https://github.com/casdoor/casdoor-device-agent).

## Enroll the computer

1. Run `enroll` with the address of Casdoor, as you open it in the browser, and the name of the organization:

   ```bash
   casdoor-device-agent enroll --server https://door.casdoor.com --organization built-in
   ```

   The agent prints a code and opens the enrollment page of Casdoor. Add `--name "My laptop"` to name the computer, the host name by default, and `--no-browser` to only print the address.

1. In the browser, sign in as yourself and click **This is my device, enroll it**. The code expires after 15 minutes.

   The agent prints the result:

   ```text
   Enrolled as alice, the device is trusted.
   ```

   When the organization doesn't trust computers on enrollment, the computer waits for an admin to trust it.

## Start the agent at sign-in

```bash
casdoor-device-agent install
```

The agent then starts when you sign in to your computer: from the `Run` key of the current user on Windows, a launch agent on macOS, and an autostart entry on Linux. `casdoor-device-agent uninstall` removes it. To start the agent once without that, run `casdoor-device-agent run`.

The first time a Casdoor sign-in page reaches the agent, the browser may ask whether the site may access devices on your local network. Allow it, otherwise the page can't see the agent.

## Check the status

```bash
casdoor-device-agent status
```

```text
This computer: ren7000k, Windows 11 Pro 26H2 26300
  disk encrypted: false, firewall: true, screen lock: false

http://localhost:8000 (built-in): user alice, trusted, missing: screen lock off
```

The agent checks the posture this way:

| Check | Windows | macOS | Linux |
|---|---|---|---|
| Disk encryption | BitLocker protects the system drive | FileVault is on | A `crypt` device in `lsblk` |
| Firewall | Every profile of Windows Firewall is on | The application firewall is on | ufw, firewalld or nftables is active |
| Screen lock | An inactivity lock policy, or a screen saver that asks for the password | `sysadminctl -screenLock` isn't off | GNOME `lock-enabled` is true |

## Unenroll the computer

```bash
casdoor-device-agent unenroll --server https://door.casdoor.com --organization built-in
```

The agent deletes the key of the computer. Ask an admin to delete the computer on the **Devices** page of Casdoor, or delete it yourself under **Home** > **My devices**.

## Where the agent keeps its data

The agent keeps the enrolled accounts and their private keys in `casdoor-device-agent/state.json` in the configuration folder of the user: `%AppData%` on Windows, `~/Library/Application Support` on macOS and `~/.config` on Linux. Only the user can read the file. The private key never leaves the computer.

The agent listens on `127.0.0.1:47630` only, and answers only the pages of the Casdoor servers it enrolled with. When the sign-in page is served from another address than `--server`, add that address to `extraOrigins` of the account in `state.json`.

## See also

- [Device trust](/docs/device-trust/overview)
- [casdoor/casdoor-device-agent on GitHub](https://github.com/casdoor/casdoor-device-agent)
