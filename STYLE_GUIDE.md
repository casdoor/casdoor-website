# Casdoor documentation style guide

Every page under `docs/` follows this guide. It is modeled on the Okta developer documentation.

## Page types

Every page is exactly one of these types. Don't mix them: move background material to a concept page and link to it.

| Type | Purpose | Title pattern |
|---|---|---|
| Concept | Explain what something is and how it works | Noun phrase: `Core concepts`, `Tokens` |
| Guide | Walk the reader through one task from start to finish | Verb phrase: `Install the Casdoor server`, `Add a GitHub provider` |
| Reference | List fields, options, endpoints, or error codes | Noun phrase: `Configuration reference` |

### Guide template

```md
---
title: Add a GitHub provider
description: One sentence that states the outcome.
keywords: [...]
authors: [...]
---

One or two sentences that state what the reader does on this page and why.

---

#### Learning outcomes

- Outcome that starts with a verb.

#### What you need

- Prerequisite, with a link to the page that covers it.

---

## About <the feature>        (optional, at most three short paragraphs)

## <Task heading that starts with a verb>

1. Step.
1. Step.

## Verify the result          (whenever the result can be checked)

## Troubleshooting            (optional)

## Next steps                 (optional, what to do after this task)

## See also
```

### Concept template

Opening paragraph that defines the concept in plain words, then `##` sections, then `## See also`.

### Reference template

One-sentence opening, then tables. Order rows the way the UI or the configuration file orders them, otherwise alphabetically. Finish with `## See also`.

## Voice

- Address the reader as "you". Use the imperative for instructions: "Click **Save**".
- Use the present tense and the active voice: "Casdoor returns a token", not "a token will be returned".
- Keep one idea per sentence. Remove "please", "simply", "just", "easily", and "note that".
- State what is true. Don't promise or sell: no "powerful", "seamless", "robust".
- Introduce an abbreviation with its full name on first use on each page: "OpenID Connect (OIDC)".

## Headings

- Sentence case: "Configure the database", not "Configure the Database".
- Task headings start with a verb in the imperative. Don't use gerunds ("Configuring").
- No code formatting, no trailing punctuation, and no numbering in headings.
- Use `##` and `###` for sections. `####` is reserved for the **Learning outcomes** and **What you need** blocks and for groups of steps.

## Steps

- Number every sequence of actions. Use `1.` for every item.
- One action per step. Put the result of the action in the same step, after the action.
- Start with where the action happens: "In the Casdoor admin console, go to **Identity** > **Providers**."
- Indent code blocks, images, and notes that belong to a step by three spaces.

## Formatting

- **Bold**: UI labels only, exactly as they appear in the UI. Separate a path through menus with `>`.
- `Code`: file names, paths, commands, configuration keys, parameter names, values that the reader types, and HTTP methods and endpoints.
- Placeholders: `<your-client-id>` in angle brackets, lowercase with hyphens. Explain each placeholder below the code block.
- Don't use italics or underlines.
- Lists of options: "**Label**: Description." with a capitalized description.
- Tables: use them for fields and options. The first column is the name, the last column is the description.
- Write "HTTP 401", not "a 401 error".

## Admonitions

| Admonition | Use it for |
|---|---|
| `:::note` | Information that applies to some readers only |
| `:::tip` | A shortcut or a recommended way |
| `:::info` | Background that helps the reader understand a step |
| `:::caution` | Something that breaks the setup if ignored |
| `:::danger` | Something that loses data or weakens security |

At most one admonition per section. Don't stack them.

## Code and examples

- Every code block has a language.
- Examples run as written once the placeholders are replaced. Copy requests and responses from a real Casdoor instance; don't write JSON by hand.
- Use these example values everywhere: `https://door.casdoor.com` for the Casdoor URL in public examples, `http://localhost:8000` for a local server, `built-in` for the organization, and `app-built-in` for the application.

## Terminology

| Use | Don't use |
|---|---|
| sign in, sign up, sign out (verbs) | log in, login (as a verb), register, log out |
| sign-in page, sign-up page (adjectives) | login page |
| Casdoor admin console | dashboard, backend, admin panel |
| application | app (except in UI labels and product names) |
| OAuth 2.0 | OAuth, OAuth2 |
| OpenID Connect (OIDC) | OpenID |
| client ID, client secret | clientId, Client Id (except in code and UI labels) |
| organization | org, tenant |
| identity provider (IdP), service provider (SP) | third-party login |

UI labels, code, endpoint names, and third-party product names keep their own spelling.

## Links and images

- Link text describes the destination: "see [Configure the database](...)", not "click [here](...)".
- Link to other docs pages with absolute paths that start with `/docs/`.
- Every image has alt text that says what the image shows.
- Don't use an image for anything the reader has to copy.
