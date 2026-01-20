---
title: Transaction
description: Casdoor Transaction Overview
keywords: [Transaction, Balance]
authors: [Copilot]
---

The `Transaction` feature tracks financial activities for users and organizations in Casdoor, enabling balance management and transaction history.

Transactions are automatically created when users make purchases or recharge their balance. Each transaction updates the corresponding user or organization balance in real-time.

## Transaction Categories

Transactions in Casdoor are classified into two distinct categories that determine how they affect user balances:

**Purchase** transactions represent spending money to buy products or services. These transactions have negative amounts and decrease the user's balance. When you pay for a product using your Casdoor balance or an external payment provider, a Purchase transaction records the deduction.

**Recharge** transactions represent adding funds to a user's balance. When purchasing recharge products or topping up an account, a Recharge transaction with a positive amount is created to increase the available balance.

The system automatically determines the transaction category based on the product type and payment flow. For recharge products, the system creates both a Purchase transaction (for the payment) and a Recharge transaction (for the balance increase).

## Transaction Properties

Every Transaction has these properties:

- `Owner`
- `Name`
- `CreatedTime`
- `Category`: Transaction category - either "Purchase" (spending) or "Recharge" (adding funds)
- `Type`: The transaction type (e.g., provider category)
- `Subtype`: Provider-specific transaction subtype
- `Provider`: Payment provider used for the transaction
- `User`: Required for User category transactions
- `Amount`: Transaction amount (positive for income, negative for expenses)
- `Currency`: The currency code (e.g., "USD", "CNY")
- `State`: Transaction state stored as a string. Common values include "Created", "Paid", "Canceled", "Timeout", and "Error"
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
