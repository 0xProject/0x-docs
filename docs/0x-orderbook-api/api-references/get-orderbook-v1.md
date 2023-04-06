---
sidebar_label: GET /orderbook/v1/
sidebar_position: 2
description: Learn how to use GET /orderbook/v1/
---

# GET /orderbook/v1/

Retrieves the orderbook for a given asset pair.

:::info
This endpoint is paginated. By default, a request returns page 1 with 20 orders. It is possible to change which page and how many records are returned per page via the query parameters. See[#pagination](./#pagination "mention")for more details.&#x20;
:::

## Request

| Query Params | Description                                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| `baseToken`  | The address of makerToken or takerToken designated as the base currency in the currency pair calculation of price.  |
| `quoteToken` | The address of makerToken or takerToken designated as the quote currency in the currency pair calculation of price. |

## Response

Bids will be sorted in descending order by price, and asks will be sorted in ascending order by price. Within the price sorted orders, the orders are further sorted by taker fee price which is defined as the takerTokenFeeAmount divided by takerAmount. After taker fee price, orders are sorted by expiration in ascending order.

| Field  |                                                                                                                |
| ------ | -------------------------------------------------------------------------------------------------------------- |
| `bids` | [Paginated](./#pagination) collection of SRA signed orders (below) where `takerToken` is equal to `baseToken`. |
| `asks` | [Paginated](./#pagination) collection of SRA signed orders (below) where `makerToken` is equal to `baseToken`. |

### Record

| Field      | Description                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
| `order`    | Raw[ signed order](./#signed-order).                                                                          |
| `metaData` | Object where optional meta-data will be included, such as the `orderHash` and `remainingFillableTakerAmount`. |

## Examples

### Get the WETH/USDC Orderbook

#### Request

GET

```markup
https://api.0x.org/orderbook/v1?quoteToken=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&baseToken=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
```

#### Response

```
"bids": {
        "total": 2,
        "page": 1,
        "perPage": 20,
        "records": [
            {
                "order": {
                    "signature": {
                        "signatureType": 3,
                        "r": "0xdbec3b59729d24549ba120d473ae6838bb38ea73a02837a776e2f395e8708094",
                        "s": "0x33fbecf9484a4c29bea206db655da78c9c9cd502707c71a15dff71841f55c310",
                        "v": 27
                    },
                    "sender": "0x0000000000000000000000000000000000000000",
                    "maker": "0x56eb0ad2dc746540fab5c02478b31e2aa9ddc38c",
                    "taker": "0x0000000000000000000000000000000000000000",
                    "takerTokenFeeAmount": "0",
                    "makerAmount": "100000000",
                    "takerAmount": "10000000",
                    "makerToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                    "takerToken": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                    "salt": "40584472803756371677282334946406041345967204972423156532532776379801646390127",
                    "verifyingContract": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
                    "feeRecipient": "0x0000000000000000000000000000000000000000",
                    "expiry": "1614959239",
                    "chainId": 1,
                    "pool": "0x0000000000000000000000000000000000000000000000000000000000000000"
                },
                "metaData": {
                    "orderHash": "0xe4b47eb16a24c7e2de185e64ad9234b13052f1f60a0a7c108f3ec0feec3cf8ac",
                    "remainingFillableTakerAmount": "10000000",
                    "createdAt": "2021-03-05T15:32:18.473Z"
                }
            },
            {
                "order": {
                    "signature": {
                        "signatureType": 3,
                        "r": "0xd471903a58c8af8e04606fdffef66d8dc820e8ad0bfc8da38df9e75774ce2145",
                        "s": "0x7c98326b5cae57af19406f651b53e1d18cc687c956d4b5d49e63cc5ecde0b235",
                        "v": 27
                    },
                    "sender": "0x0000000000000000000000000000000000000000",
                    "maker": "0x56eb0ad2dc746540fab5c02478b31e2aa9ddc38c",
                    "taker": "0x0000000000000000000000000000000000000000",
                    "takerTokenFeeAmount": "0",
                    "makerAmount": "100000000",
                    "takerAmount": "10000000",
                    "makerToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                    "takerToken": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                    "salt": "46180318074336470317559353922611974059818459041810314650988282984048441965273",
                    "verifyingContract": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
                    "feeRecipient": "0x0000000000000000000000000000000000000000",
                    "expiry": "1614959239",
                    "chainId": 1,
                    "pool": "0x0000000000000000000000000000000000000000000000000000000000000000"
                },
                "metaData": {
                    "orderHash": "0x0ffda2f9d9f41144bb063100403f926efa2ee5bacd9af00716175f00b030ff36",
                    "remainingFillableTakerAmount": "10000000",
                    "createdAt": "2021-03-05T15:32:18.473Z"
                }
            }
        ]
    },
    "asks": {
        "total": 2,
        "page": 1,
        "perPage": 20,
        "records": [
            {
                "order": {
                    "signature": {
                        "signatureType": 3,
                        "r": "0xa06ed25f1c371982e9e38d60a10ba4b1fb2be2c8ffb6e9b55a7eb645c710b880",
                        "s": "0x4c0148a67b4c2a66fbf1f1282f009e33090fb48d0205c50150bce383c7d9af25",
                        "v": 28
                    },
                    "sender": "0x0000000000000000000000000000000000000000",
                    "maker": "0x56eb0ad2dc746540fab5c02478b31e2aa9ddc38c",
                    "taker": "0x0000000000000000000000000000000000000000",
                    "takerTokenFeeAmount": "0",
                    "makerAmount": "10000000",
                    "takerAmount": "2000000000000000000000",
                    "makerToken": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                    "takerToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                    "salt": "10889288054586634459012787782547047203721282134655762786471616446193822631245",
                    "verifyingContract": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
                    "feeRecipient": "0x0000000000000000000000000000000000000000",
                    "expiry": "1614959117",
                    "chainId": 1,
                    "pool": "0x0000000000000000000000000000000000000000000000000000000000000000"
                },
                "metaData": {
                    "orderHash": "0x349cd45199ca3aa0a0041ab7490d0cebd63347f8a3ebdbcdf7419090e7aaef91",
                    "remainingFillableTakerAmount": "2000000000000000000000",
                    "createdAt": "2021-03-05T15:30:17.127Z"
                }
            },
            {
                "order": {
                    "signature": {
                        "signatureType": 3,
                        "r": "0x5edf42008a5b379d44857634ffb6c0ef64a8884763bbbe8eecaca14f1b9670e9",
                        "s": "0x6ed1c68cd18e2ede793f6cb7fdd5391c559cf59c2cc0876a7479e4ff7459a79a",
                        "v": 28
                    },
                    "sender": "0x0000000000000000000000000000000000000000",
                    "maker": "0x56eb0ad2dc746540fab5c02478b31e2aa9ddc38c",
                    "taker": "0x0000000000000000000000000000000000000000",
                    "takerTokenFeeAmount": "0",
                    "makerAmount": "10000000",
                    "takerAmount": "2000000000000000000000",
                    "makerToken": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
                    "takerToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                    "salt": "56970174968746324800967727809155263811357634174793941230224490280738761530883",
                    "verifyingContract": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
                    "feeRecipient": "0x0000000000000000000000000000000000000000",
                    "expiry": "1614959117",
                    "chainId": 1,
                    "pool": "0x0000000000000000000000000000000000000000000000000000000000000000"
                },
                "metaData": {
                    "orderHash": "0xf8b4d85e98d7dc41bb6b9b200aafe7a2b479f59d6ca5288fa990124a23f2056a",
                    "remainingFillableTakerAmount": "2000000000000000000000",
                    "createdAt": "2021-03-05T15:30:17.127Z"
                }
            }
        ]
    }
```
