---
sidebar_label: POST /orderbook/v1/orders
sidebar_position: 5
description: Learn how to use POST /orderbook/v1/orders
---

# POST /orderbook/v1/orders

Submit a list of signed orders.

## Request

A list of [signed orders](../../0x-swap-api/api-references/#signed-order).

## Response

No response fields when successful. An [error ](../../0x-swap-api/api-references/#errors)when unsuccessful.

## Examples

### Post some Orders

#### Request

POST `/orderbook/v1/orders`

```
[
    {
        "makerToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "takerToken": "0xe41d2489571d322189246dafa5ebde1f4699f498",
        "makerAmount": "100000000000000",
        "takerAmount": "2000000000000000000000",
        "maker": "0x56EB0aD2dC746540Fab5C02478B31e2AA9DdC38C",
        "taker": "0x0000000000000000000000000000000000000000",
        "pool": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "expiry": "1614957869",
        "salt": "6783702559744797318323886303764333477871845949851321622397911580758640049826",
        "chainId": 1,
        "verifyingContract": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
        "takerTokenFeeAmount": "0",
        "sender": "0x0000000000000000000000000000000000000000",
        "feeRecipient": "0x0000000000000000000000000000000000000000",
        "signature": {
            "v": 27,
            "r": "0x260e3ade4c5e995074e51c5e6031a7f9ac4c466923cf636a52da5618733ca733",
            "s": "0x0ad43fef82c1deaa740905d76fd6201960b034dbaebda9ae55a28276fffda5b4",
            "signatureType": 3
        }
    },
    {
        "makerToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "takerToken": "0xe41d2489571d322189246dafa5ebde1f4699f498",
        "makerAmount": "100000000000000",
        "takerAmount": "2000000000000000000000",
        "maker": "0x56EB0aD2dC746540Fab5C02478B31e2AA9DdC38C",
        "taker": "0x0000000000000000000000000000000000000000",
        "pool": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "expiry": "1614957869",
        "salt": "75302780246208148116958057129632839621788678452217539992230761105996524515708",
        "chainId": 1,
        "verifyingContract": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
        "takerTokenFeeAmount": "0",
        "sender": "0x0000000000000000000000000000000000000000",
        "feeRecipient": "0x0000000000000000000000000000000000000000",
        "signature": {
            "v": 28,
            "r": "0xb8d4cefbad61a6d05d78d400473509ad384aa6b8e9533052bb6918bb9cb9ae26",
            "s": "0x797e4630d9f827cdca76ef6523b2e6617d79bb82ee50b5206490237056708402",
            "signatureType": 3
        }
    }
]
```

**Response**

`Empty response body`