---
sidebar_label: GET /orderbook/v1/fee_recipients
sidebar_position: 9
description: Learn how to use GET /orderbook/v1/fee_recipients
---

# GET /orderbook/v1/fee_recipients

:::note
Please note the Orderbook API is not actively supported at this time. We're temporarily not accepting new integrators to post new orders.
:::

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
