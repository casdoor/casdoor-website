---
title: Contributing to Casdoor
description: Join our community and help make Casdoor better!
keywords: [Contributing, Contributor, Guide, Open Source]
authors: [leo220yuyaodog]
---

We're thrilled that you're interested in contributing to Casdoor! Whether you're fixing a typo, adding a feature, or helping others in discussions, every contribution makes a difference.

This guide will help you get started. Don't worry if you're new to open source - we were all beginners once, and we're here to help you every step of the way!

## Ways to Contribute

You don't need to be a coding expert to contribute! Here are some ways you can help:

### 🐛 Report Bugs and Suggest Features

Found something that doesn't work? Have an idea for a cool feature? We want to hear about it!

**Before filing an issue:**

1. 💬 Discuss it first on [GitHub Discussions](https://github.com/casdoor/casdoor/discussions) or our [Discord](https://discord.gg/5rPsrAzK7S)
2. 🔍 Check if someone else already reported it
3. ✍️ Write your report in English (so everyone can understand)

This helps us understand your needs and may save you time if there's already a solution!

### 📝 Improve Documentation

Documentation is crucial, and it's a fantastic way to start contributing! You can:

- Fix typos or clarify confusing explanations
- Add examples to make concepts clearer
- Write tutorials for common use cases
- Translate docs to other languages

**Why start here?** It helps you learn the project while making immediate impact. Plus, great docs help thousands of users!

### 💻 Fix Issues

Ready to code? Check out our [Easy Tasks Board](https://github.com/orgs/casdoor/projects/1) where we've curated beginner-friendly issues with labels like:

- `good first issue` - Perfect for newcomers
- `help wanted` - We'd love assistance on these
- `documentation` - Doc improvements needed
- `bug` - Something's broken and needs fixing

Pick one that interests you and let us know you're working on it!

### 🌟 Help Others

Answer questions in Discussions or Discord. Share your Casdoor setup. Write a blog post about your experience. Community building is contribution too!

## Making Your First Contribution

Ready to submit code or documentation? Here's the step-by-step process:

### Step 1: Fork the Repository

Click the "Fork" button on the [Casdoor repository](https://github.com/casdoor/casdoor) to create your own copy.

### Step 2: Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/casdoor.git
cd casdoor
```

Replace `YOUR-USERNAME` with your GitHub username.

### Step 3: Create a Feature Branch

Never work directly on `master`! Create a branch for your changes:

```bash
git checkout -b my-awesome-feature
```

Use a descriptive name that explains what you're working on.

### Step 4: Make Your Changes

Now the fun part - write your code or docs! Remember to:

- Keep changes focused (one feature or fix per PR)
- Write clear, readable code
- Test your changes locally
- Follow existing code style

### Step 5: Keep Your Branch Updated

While you work, the main repository might get new commits. Stay in sync:

```bash
git remote add upstream https://github.com/casdoor/casdoor.git
git fetch upstream
git rebase upstream/master
```

### Step 6: Commit Your Changes

Write a clear, concise commit message:

```bash
git add .
git commit -m "feat: add email verification for signup"
```

We'll cover commit message format in the next section!

### Step 7: Push to Your Fork

```bash
git push origin my-awesome-feature
```

### Step 8: Create a Pull Request

Go to your fork on GitHub and click "New Pull Request". Fill in:

- **Title**: Clear, descriptive (follow our format below)
- **Description**: Explain what and why
- **Linked Issues**: Reference related issues with `fixes #123`

Then hit "Create Pull Request" and wait for review! 🎉

## Pull Request Guidelines

To keep things organized and make reviews faster, please follow these guidelines:

### Sign the CLA

On your first PR, you'll be asked to sign our Contributor License Agreement (CLA). It's quick and only needed once!

### Write Good PR Descriptions

Help reviewers understand your changes:

```markdown
## What does this PR do?
Adds email verification to the signup process

## Why is this needed?
Prevents fake accounts and improves security

## How was it tested?
- Manually tested signup flow
- Added unit tests for email verification
```

### One PR, One Purpose

Keep PRs focused! If you're adding multiple features, split them into separate PRs. This makes review easier and faster.

### Add License Headers to New Files

Any new file you create needs our license header:

```go
// Copyright 2024 The Casdoor Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
```

Just copy and paste this at the top, updating the year as needed.

## Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/) to keep our git history clean and generate changelogs automatically.

:::caution

PR titles and commit messages **must be in lowercase**.

:::

| Type | When to Use | Example |
|------|------------|---------|
| `feat:` | Adding a new feature | `feat: add oauth provider for twitter` |
| `fix:` | Fixing a bug | `fix: prevent race condition in token refresh` |
| `docs:` | Documentation changes | `docs: update installation guide` |
| `style:` | Code formatting (no logic change) | `style: fix indentation in auth.go` |
| `refactor:` | Code refactoring | `refactor: simplify user validation logic` |
| `test:` | Adding or updating tests | `test: add tests for email verification` |
| `chore:` | Maintenance tasks | `chore: update dependencies` |

### Examples

**Good:**

```text
fix: resolve database connection timeout
docs: add examples for custom providers
feat: implement rate limiting for api endpoints
```

**Bad:**

```text
Fix: Database issue (uppercase)
update docs (missing type)
Added new feature for users (not concise)
```

## Updating a Pull Request

Got review feedback? No problem! Here's how to update your PR:

### Make Changes Locally

Edit your files based on the feedback.

### Amend Your Commit

Instead of creating a new commit, update the existing one:

```bash
git add .
git commit --amend
```

This keeps your PR to a single, clean commit.

### Force Push

Since you've rewritten history, use force push:

```bash
git push --force origin my-awesome-feature
```

Your PR will automatically update! The reviewer will see your changes.

## Linking PRs to Issues

Connecting your PR to an issue helps track progress and automatically closes issues when merged.

### How to Link

Use keywords in your PR description or commit message:

- `fixes #123` - Closes issue #123 when merged
- `resolves #456` - Closes issue #456 when merged  
- `closes #789` - Closes issue #789 when merged

**Example PR description:**

```markdown
## Summary
Add email verification for new users

This PR fixes #234 and resolves #256

## Changes
- Implemented email sending service
- Added verification code generation
- Updated signup flow
```

When this PR merges, issues #234 and #256 will automatically close!

Learn more: [Linking PRs to Issues (GitHub Docs)](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)

## Code Guidelines

Follow these principles to keep our codebase clean and maintainable:

### Write Readable Code

- **Document complex logic**: Add comments explaining *why*, not just *what*
- **Follow existing style**: Match the formatting and patterns already in use
- **Use meaningful names**: `getUserByEmail()` is better than `get()`

### Naming Conventions

Be consistent with naming across the codebase:

- **Variables**: `camelCase` - e.g., `signupUrl`, `emailProvider`
- **UI Text**: `Title Case` - e.g., "Signup URL", "Email Provider"
- **Functions**: `camelCase` - e.g., `validateUser()`, `sendEmail()`
- **Constants**: `UPPER_SNAKE_CASE` - e.g., `MAX_RETRY_COUNT`

### Working with Internationalization (i18n)

Casdoor supports multiple languages using [Crowdin](https://crowdin.com/project/casdoor-site) and i18next.

**When adding new UI strings:**

1. Add them to your code using i18next

2. Generate translation files:

   ```bash
   cd i18n
   go test
   ```

   This auto-generates `web/src/locales/**/data.json` files with English defaults.

3. After your PR merges, help translate at [Crowdin](https://crowdin.com/project/casdoor-site)

:::caution Translation Etiquette

**Only translate languages you know well!** Machine translations can be misleading or incorrect. If unsure, leave it in English - native speakers will translate it properly.

:::

## Getting Help

Stuck? Have questions? We're here to help!

### Before Asking

1. 📖 Check the [documentation](https://casdoor.org/docs)
2. 🔍 Search [existing issues](https://github.com/casdoor/casdoor/issues)  
3. 💬 Browse [GitHub Discussions](https://github.com/casdoor/casdoor/discussions)

### Ask the Community

- **💬 Discord**: [Join our server](https://discord.gg/5rPsrAzK7S) for real-time chat
- **💭 GitHub Discussions**: [Ask questions](https://github.com/casdoor/casdoor/discussions) that help others too
- **🐛 GitHub Issues**: For verified bugs only (discuss first!)

### Response Time

We're a global community, so responses might take a bit. Usually:

- Discord: A few hours
- GitHub Discussions: 1-2 days
- Pull Request reviews: 2-5 days

Please be patient - we're all volunteers! ❤️

## Code of Conduct

Be respectful, inclusive, and helpful. We're building software together, and kindness makes everything better.

- **Be welcoming**: Everyone was a beginner once
- **Be patient**: Not everyone has the same experience level
- **Be constructive**: Criticism should be about code, not people
- **Be collaborative**: We're on the same team!

## License

By contributing to Casdoor, you agree that your contributions will be licensed under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).

This ensures Casdoor remains open source and free for everyone.

## Thank You! 🙏

Every contribution, no matter how small, makes Casdoor better for thousands of users worldwide. We appreciate your time and effort!

### Recognition

Contributors are recognized in:

- Our [Contributors page](https://github.com/casdoor/casdoor/graphs/contributors)
- Release notes for significant features
- The project's history forever!

### What's Next?

Ready to start? Here's your roadmap:

1. **👀 Browse [Good First Issues](https://github.com/orgs/casdoor/projects/1)**
2. **💬 Say hi on [Discord](https://discord.gg/5rPsrAzK7S)**
3. **🍴 Fork the repo and start coding!**
4. **📝 Submit your first PR**

Welcome to the team! 🚀
