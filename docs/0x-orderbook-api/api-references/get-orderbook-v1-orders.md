---
sidebar_label: GET /orderbook/v1/orders
sidebar_position: 3
description: Learn how to use GET /orderbook/v1/orders
---

# GET /orderbook/v1/orders

Retrieves a list of orders given query parameters.

:::info
This endpoint is paginated. By default, a request returns page 1 with 20 orders. It is possible to change which page and how many records are returned per page via the query parameters. See[#pagination](./#pagination "mention")for more details.
:::

## Request

Any[ Signed Order ](./#signed-order)field can be use as a query parameter. Additional query parameters are listed below.

| Query Params | Description                                             |
| ------------ | ------------------------------------------------------- |
| `trader`     | (Optional) The address of either the maker or the taker |

## Response

### Response

| Field      | Description                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
| `order`    | Raw[ signed order](./#signed-order).                                                                          |
| `metaData` | Object where optional meta-data will be included, such as the `orderHash` and `remainingFillableTakerAmount`. |

## Examples

### **Get All Orders Selling WETH**

#### **Request**

GET

```
https://api.0x.org/orderbook/v1/orders?makerToken=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
```

**Response**

```
{
  "total": 111
  "page": 1,
  "perPage": 20,
  "records": [
    {
      "metaData": {
        "createdAt": "2021-03-05T14:19:58.745Z",
        "orderHash": "0x9cecbbb001b2ddcb23cee4de97b46ef014621050ce04099ace24d25ad7022d99",
        "remainingFillableTakerAmount": "2000000000000000000000"
      },
      "order": {
        "chainId": 1,
        "expiry": "1614954899",
        "feeRecipient": "0x0000000000000000000000000000000000000000",
        "maker": "0x56eb0ad2dc746540fab5c02478b31e2aa9ddc38c",
        "makerAmount": "100000000000000",
        "makerToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "pool": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "salt": "76705913446798151184926653565841843850509871332931031350949084138605565413651",
        "sender": "0x0000000000000000000000000000000000000000",
        "signature": {
          "r": "0x2ca75df712c9a0a56ccf315af5608dd1dda859fce001403de34ee21df9ae5eef",
          "s": "0x01c3f1eb9dcce82ac989c3a7491cafe69c13f7c2d51adae3426e93d4f3447df4",
          "signatureType": 3,
          "v": 27
        },
        "taker": "0x0000000000000000000000000000000000000000",
        "takerAmount": "2000000000000000000000",
        "takerToken": "0xe41d2489571d322189246dafa5ebde1f4699f498",
        "takerTokenFeeAmount": "0",
        "verifyingContract": "0xdef1c0ded9bec7f1a1670819833240f027b25eff"
      }
    }
  ],
}
```

\


