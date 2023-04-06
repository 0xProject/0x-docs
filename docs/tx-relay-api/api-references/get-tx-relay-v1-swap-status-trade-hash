---
sidebar_label: GET /tx-relay/v1/swap/status/:trade-hash
sidebar_position: 4
description: Learn how to use GET /tx-relay/v1/swap/status/:trade-hash
---

# GET /tx-relay/v1/swap/status/:trade-hash

To check the status of a trade, you submit a GET request to `/tx-relay/v1/swap/status/:trade-hash`.

#### Example **Request**

```bash
curl '<https://api.0x.org/tx-relay/v1/swap/status/0xd114c77249bb3a137634afeba1ea1c8d6080c687c1a00cc4137fd9cb905a5fb6>' \\
--header '0x-api-key: <API_KEY>' --header '0x-chain-id: 137'
```

**Shape of Response:**

```json
{
    "transactions": { hash: string; timestamp: number /* unix ms */ }[]; // trade transactions
    "approvalTransactions": { hash: string; timestamp: number /* unix ms */ }[]; // approval transactions; the field will not be present if it's not a gasless approval trade
    // For pending, expect no transactions.
    // For successful transactions (i.e. "succeeded"/"confirmed), expect just the mined transaction.
    // For failed transactions, there may be 0 (failed before submission) to multiple transactions (transaction reverted).
    // For submitted transactions, there may be multiple transactions, but only one will ultimately get mined
} & ({ status: 'pending' | 'submitted' | 'succeeded' | 'confirmed' } |
     { status: 'failed'; reason: JobFailureReason });
     // When status field is 'failed', there will be a reason field to describe the error reason
```

**Current set of failure reasons:**

```tsx
enum JobFailureReason {
    // Transaction simulation failed so no transaction is submitted onchain.
    // Our system simulate the transaction before submitting onchain.
    TransactionSimulationFailed = 'transaction_simulation_failed';
    // The order expired
    OrderExpired = 'order_expired';
    // Last look declined by the market maker
    LastLookDeclined = 'last_look_declined';
    // Transaction(s) submitted onchain but reverted
    TransactionReverted = 'transaction_reverted';
    // Error getting market signature / signature is not valid; this is NOT last look decline
    MarketMakerSignatureError = 'market_maker_sigature_error';
    // Fallback error reason
    InternalError = 'internal_error';
}
```

#### **Example Response**

```jsx
// confirmed
{
    "status": 'confirmed',
    "transactions": [{
        "hash": "0x...",
        "timestamp": 1624290253193
    }],
    "approvalTransactions": [{
       "hash": "0x...",
       "timestamp": 1624290253183
    }]
}

// failed due to transaction reverted
{
    "status": "failed",
    "transactions": [{
        "hash": "0x...",
        "timestamp": 1624290253193
    }],
    "reason": "transaction_reverted"
}
```

**Note**

`JobFailureReason.InternalError` is used as the fallback error if the error reason is not one of the errors listed in `JobFailureReason`.

In the future, 0x might add more entries in `JobFailureReason`to provide more information about the failure. Thus, if you were to switch the `reason` field, it’s recommended to use:

```tsx
switch (reason) {
    case 'transaction_simulation_failed':
        ...
    case 'order_expired':
        ...
    default:
        // case for internal_error
}
```

instead of:

```tsx
switch (reason) {
    case 'transaction_simulation_failed':
        ...
    case 'order_expired':
        ...
    case 'internal_error':
        ...
    default:
        throw
}
```

to avoid unintended errors.