---
sidebar_label: GET /orderbook/v1/fee_recipients
sidebar_position: 9
description: Learn how to use GET /orderbook/v1/fee_recipients
---

# GET /orderbook/v1/fee_recipients

Retrieves a list of valid feeRecipient addresses.

## Request

No request params.

## Response

### Record

A valid Ethereum address(s).

## Examples

### Get Fee Recipients

#### **Request**

GET `/orderbook/v1/fee_recipients`

#### **Request**

```
{
    "total": 1,
    "page": 1,
    "perPage": 20,
    "records": ["0x0000000000000000000000000000000000000000"]
}
```
