---
title: Transaction
description: Track payments and balance changes for users and organizations.
keywords: [transaction, balance, purchase, recharge]
authors: [hsluoyz]
---

**Transactions** record financial activity for users and organizations: purchases, recharges, and balance updates. They are created automatically when users pay or top up; balances update in real time.

## Categories

| Category | Effect | When |
|----------|--------|------|
| **Purchase** | Negative amount; balance decreases | Buying products or services (with balance or external payment). |
| **Recharge** | Positive amount; balance increases | Buying recharge products or topping up. |

For recharge products, the system creates both a Purchase (payment) and a Recharge (balance increase) transaction.

## Transaction properties

| Property | Description |
|----------|-------------|
| **Owner** | Owning organization. |
| **Name** | Transaction id. |
| **CreatedTime** | Creation time. |
| **Category** | `Purchase` or `Recharge`. |
| **Type** | e.g. provider category. |
| **Subtype** | Provider-specific subtype. |
| **Provider** | Payment provider used. |
| **User** | User (for user-level transactions). |
| **Amount** | Positive = income, negative = expense. |
| **Currency** | e.g. USD, CNY. |
| **State** | e.g. `Created`, `Paid`, `Canceled`, `Timeout`, `Error`. |
| **Payment** | Related Payment (if any). |

## Balances

- **User balance** — Stored on the user; tracks that user’s funds.
- **Organization** — `orgBalance` (org’s own funds) and `userBalance` (sum of user balances in the org).

Balances are updated when transactions are created, updated, or deleted.

## Where to view transactions

- **User** — In the user edit page, in the transactions table below user details.
- **Organization** — In the organization edit page, for org-level transactions.

Both views show a chronological list with name, time, category, type, amount, and state.
