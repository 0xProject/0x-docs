---
sidebar_label: GET /orderbook/v1/order/orderHash
sidebar_position: 6
description: Learn how to use GET /orderbook/v1/order/orderHash
---
# GET /orderbook/v1/order/:orderHash:

Retrieves a specific order by orderHash.

## Request

| Path Params | Description                                                                             |
| ----------- | --------------------------------------------------------------------------------------- |
| `orderHash` | The hash of the desired[ signed order](../../0x-swap-api/api-references/#signed-order). |

## Response

| Field      | Description                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
| `order`    | Raw[ signed order](../../0x-swap-api/api-references/#signed-order).                                           |
| `metaData` | Object where optional meta-data will be included, such as the `orderHash` and `remainingFillableTakerAmount`. |
|            |                                                                                                               |

## Examples

### Get an Order

#### Request

GET `/orderbook/v1/orders`

```
https://api.0x.org/orderbook/v1/order/0xa1e06a9...eaa29e1a6
```

**Response**

```
{
    "order": {
        "signature": {
            "signatureType": 3,
            "r": "0x260e3ade4c5e995074e51c5e6031a7f9ac4c466923cf636a52da5618733ca733",
            "s": "0x0ad43fef82c1deaa740905d76fd6201960b034dbaebda9ae55a28276fffda5b4",
            "v": 27
        },
        "sender": "0x0000000000000000000000000000000000000000",
        "maker": "0x56eb0ad2dc746540fab5c02478b31e2aa9ddc38c",
        "taker": "0x0000000000000000000000000000000000000000",
        "takerTokenFeeAmount": "0",
        "makerAmount": "100000000000000",
        "takerAmount": "2000000000000000000000",
        "makerToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "takerToken": "0xe41d2489571d322189246dafa5ebde1f4699f498",
        "salt": "6783702559744797318323886303764333477871845949851321622397911580758640049826",
        "verifyingContract": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
        "feeRecipient": "0x0000000000000000000000000000000000000000",
        "expiry": "1614957869",
        "chainId": 1,
        "pool": "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    "metaData": {
        "orderHash": "0xd56098f729763f53b338c723be01ffdb8a1ff9dd8d323c9021ff1d8e29635fca",
        "remainingFillableTakerAmount": "2000000000000000000000",
        "createdAt": "2021-03-05T15:09:28.611Z"
    }
}
```
