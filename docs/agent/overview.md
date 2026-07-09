---
title: Agents
description: Register and manage AI agents in Casdoor.
keywords: [agent, AI, LLM, A2A]
authors: [hsluoyz]
---

**Agents** are AI agent endpoints registered in Casdoor. Each agent record stores the connection details Casdoor needs to route requests to or authenticate against an external AI agent service.

## Agent properties

| Field | Description |
|-------|-------------|
| **Name** | Unique identifier for the agent within the organization |
| **Display name** | Human-readable label shown in the UI |
| **Listening URL** | The agent's endpoint URL |
| **Token** | Bearer token used to authenticate requests to the agent |
| **Application** | The Casdoor application this agent is associated with |

## Managing agents

Navigate to **Agents** in the Casdoor sidebar to view, create, and manage agents.

Each agent is scoped to an organization. Only users with admin privileges for that organization can add or edit agents.
