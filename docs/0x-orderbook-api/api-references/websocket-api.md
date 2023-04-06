---
sidebar_label: Websocket API
sidebar_position: 10
description: Learn how to use the Websocket API
---
# Websocket API

The Standard Relayer API also exposes a websocket server at the root endpoint.

| Network          | Endpoint                      |
| ---------------- | ----------------------------- |
| Ethereum Mainnet | wss://api.0x.org/orderbook/v1 |

The server will allow you to subscribe to 0x order updates, and will push updates whenever the "fillability" of an order changes. In practice, this will happen whenever a new order is added, an order is cancelled, or an order is filled. At the moment, the update message will not specify the exact reason for the update.

All messages (both request, and response) adhere to the format below:

|             |                                                                                                                                                       |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`      | The type of message being sent. Only "subscribe" is supported for now                                                                                 |
| `channel`   | The topic of the messaging. Only "orders" is supported for now.                                                                                       |
| `requestId` | A string uuid that will be sent back by the server in response messages so the client can appropriately respond when multiple subscriptions are made. |
| `payload`   | (Optional) A JSON object documented below, that contains the body of the message.                                                                     |

## Request

| Field        | Description                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `makerToken` | (Optional) Filter orders by the address of the ERC20 token the maker is selling. Example `0xe41d2489571d322189246dafa5ebde1f4699f498` |
| `takerToken` | (Optional) Filter orders by the address of the ERC20 token the taker is selling. Example `0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2` |

## Response

A list consisting of signed orders with metaData.

| Field      | Description                                                                                                   |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
| `order`    | Raw [signed orders](/0x-swap-api/api-references/overview#signed-order).                                          |
| `metaData` | Object where optional meta-data will be included, such as the `orderHash` and `remainingFillableTakerAmount`. |

## Examples

### Subscribe to All Order Updates

#### Request

```
{
    "type": "subscribe",
    "channel": "orders",
    "requestId": "123e4567-e89b-12d3-a456-426655440000"
}
```

#### Update

```
{
    "type": "update",
    "channel": "orders",
    "payload": [
        {
            "order": {
                "chainId": 1,
                "verifyingContract": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
                "makerToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                "takerToken": "0xe41d2489571d322189246dafa5ebde1f4699f498",
                "makerAmount": "1",
                "takerAmount": "1000000000000000",
                "takerTokenFeeAmount": "0",
                "maker": "0x56eb0ad2dc746540fab5c02478b31e2aa9ddc38c",
                "taker": "0x0000000000000000000000000000000000000000",
                "sender": "0x0000000000000000000000000000000000000000",
                "feeRecipient": "0x0000000000000000000000000000000000000000",
                "pool": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "expiry": "1614962196",
                "salt": "12213086377898595950156985364849399280012820680806192474044093697918905947103",
                "signature": {
                    "signatureType": 3,
                    "v": 28,
                    "r": "0x828110c66e0b5435ad2b2a4479f2ca5ea6afaf2846a7d5218aeb4e7f2519ce7b",
                    "s": "0x06360f6d55d86006c090855f5467925707788bdfb4bfb7aae7304f0504c93ba0"
                }
            },
            "metaData": {
                "orderHash": "0xa3aeb3b1aed8438c0398ba070bf4f365378ef74e4fc966f09df87854484b0012",
                "remainingFillableTakerAmount": "1000000000000000",
                "state": "ADDED"
            }
        }
    ],
    "requestId": "123e4567-e89b-12d3-a456-426655440000"
}
```