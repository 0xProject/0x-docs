---
sidebar_label:  POST /orderbook/v1/order_config
sidebar_position: 7
description: Learn how to use  POST /orderbook/v1/order_config
---
# POST /orderbook/v1/order_config

Send a partial [signed order](../../0x-swap-api/api-references/#signed-order) to this endpoint to receive the rest of configuration-oriented fields. This response is currently static.

## Request

| Path Params         | Description                                                                                                                                                                                          |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `maker`             | The address of the party that creates the order. The maker is also one of the two parties that will be involved in the trade if the order gets filled.                                               |
| `taker`             | The address of the party that is allowed to fill the order. If set to a specific party, the order cannot be filled by anyone else. If left unspecified, anyone can fill the order.                   |
| `makerToken`        | The address of the ERC20 token that the order maker is trying to sell.                                                                                                                               |
| `takerToken`        | The address of the ERC20 token that the taker must trade in exchange for the maker's tokens.                                                                                                         |
| `makerAmount`       | Amount of the maker's tokens being offered by the maker.                                                                                                                                             |
| `takerAmount`       | Amount of the taker's tokens the maker will accept in exchange for their maker tokens. In order to calculate the price the maker is offering, one can divide the `makerAmount` by the `takerAmount`. |
| `expiry`            | Timestamp in seconds of when the order expires. Expired orders cannot be filled.                                                                                                                     |
| `verifyingContract` | The address of the smart contract that will settle the order.                                                                                                                                        |

## Response

| Field                 | Description                                                                                                                                                                                                                |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `feeRecipient`        | The entity that will receive any fees stipulated by the order. This is typically used to incentivize off-chain order relay. Note that 0x API charges no fees and therefore has no `feeRecipient`.                          |
| `sender`              | An advanced field that doesn't need to be set. It allows the maker to enforce that the order flow through some additional logic before it can be filled (e.g., a KYC whitelist) -- more on the ability to extend 0x later. |
| `takerTokenFeeAmount` | The amount of takerToken to be paid by the taker to the `feeRecipient` in the event of an order fill.                                                                                                                      |

## Examples

### Get an Order Configuration

#### Request

POST `/orderbook/v1/order_config`

```
{
    "maker": "0x56eb0ad2dc746540fab5c02478b31e2aa9ddc38c",
    "taker": "0x0000000000000000000000000000000000000000",
    "makerToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "takerToken": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "makerAmount": "100000000",
    "takerAmount": "10000000",
    "expiry": "1614959239",
    "verifyingContract": "0xdef1c0ded9bec7f1a1670819833240f027b25eff"
}
```

#### Response

```
{
    "feeRecipient": "0x0000000000000000000000000000000000000000",
    "sender": "0x0000000000000000000000000000000000000000",
    "takerTokenFeeAmount": "0"
}
```