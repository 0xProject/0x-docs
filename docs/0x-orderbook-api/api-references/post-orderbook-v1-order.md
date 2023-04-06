---
sidebar_label: POST /orderbook/v1/order
sidebar_position: 4
description: Learn how to use POST /orderbook/v1/order
---

# POST /orderbook/v1/order

Submit a signed order.

## Request

A [signed order](../../0x-swap-api/api-references/#signed-order).

## Response

No response fields when successful. An [error ](../../0x-swap-api/api-references/#errors)when unsuccessful.

## Examples

### Post an Order

#### Request

POST `/orderbook/v1/order`

```
{
    "makerToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "takerToken": "0xe41d2489571d322189246dafa5ebde1f4699f498",
    "makerAmount": "100000000000000",
    "takerAmount": "2000000000000000000000",
    "maker": "0x56EB0aD2dC746540Fab5C02478B31e2AA9DdC38C",
    "taker": "0x0000000000000000000000000000000000000000",
    "pool": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "expiry": "1614956256",
    "salt": "2752094376750492926844965905320507011598275560670346196138937898764349624882",
    "chainId": 1,
    "verifyingContract": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    "takerTokenFeeAmount": "0",
    "sender": "0x0000000000000000000000000000000000000000",
    "feeRecipient": "0x0000000000000000000000000000000000000000",
    "signature": {
        "v": 27,
        "r": "0x983a8a8dad663124a52609fe9aa82737f7f02d12ed951785f36b50906041794d",
        "s": "0x5f18ae837be4732bcb3dd019104cf775f92b8740b275be510462a7aa62cdf252",
        "signatureType": 3
    }
}
```

**Response**

`Empty response body`