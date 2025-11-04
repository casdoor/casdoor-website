---
title: Transaction
description: Casdoor Transaction Overview
keywords: [Transaction, Balance]
authors: [Copilot]
---

The `Transaction` feature tracks financial activities for users and organizations in Casdoor, enabling balance management and transaction history.

Transactions are automatically created when users make purchases or recharge their balance. Each transaction updates the corresponding user or organization balance in real-time.

## Transaction Categories

Transactions in Casdoor fall into two categories:

**User Transactions** track individual user balances. When a user transaction is created, it updates both the user's balance and the organization's total user balance sum.

**Organization Transactions** track the organization's own operational balance, separate from user balances.

## Transaction Properties

Every Transaction has these properties:

- `Owner`
- `Name`
- `CreatedTime`
- `Category`: Either "User" or "Organization"
- `Type`: The transaction type (e.g., "Recharge", "Purchase")
- `User`: Required for User category transactions
- `Amount`: Transaction amount (positive for income, negative for expenses)
- `Currency`: The currency code (e.g., "USD", "CNY")
- `State`: Transaction state (e.g., "Pending", "Paid", "Failed")
- `Payment`: Related Payment record (if applicable)

## Balance Tracking

Casdoor maintains separate balance fields:

**User Balance** is stored on individual user records and tracks each user's available funds.

**Organization Balances** include two fields: `orgBalance` for the organization's own funds, and `userBalance` for the sum of all user balances within that organization.

Balances are automatically updated when transactions are created, modified, or deleted, ensuring consistency across the system.

## Viewing Transactions

Transaction history is displayed in two locations:

When editing a user account, all transactions for that user appear in a dedicated table below the user details.

When editing an organization, all organization-level transactions are shown in the organization edit page.

Both views provide a chronological record with transaction details including name, creation time, category, type, amount, and state.
