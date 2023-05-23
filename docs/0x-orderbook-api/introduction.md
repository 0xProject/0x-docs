---
sidebar_label: Introduction
sidebar_position: 1
description: 0x API hosts an Orderbook of 0x Limit Orders that anyone can provide liquidity to or take liquidity from.
---

# Introduction

Enable limit orders in your app or take liquidity directly from the 0x Orderbook.

0x API has an Orderbook on the following chains:

- Ethereum
- BSCs
- Polygon

In previous versions of 0x API prior to [0x Protocol v4](https://docs.0xprotocol.org/en/latest/), this functionality was exposed by the "SRA" endpoint. Previous docs: [https://github.com/0xProject/standard-relayer-api](https://github.com/0xProject/standard-relayer-api). Note that 0x Protocol is an open-sourced project that is separate and not maintained by 0x.

## Get Started

:::info
To create an account, and get your live API keys to access the Orderbook API, visit the **[0x Dashboard](https://dashboard.0x.org/)**.
:::

This section contains the following docs and guides

**API References**

- [Overview](/0x-orderbook-api/api-references/overview)
- [GET /orderbook/v1/order](api-references/get-orderbook-v1.md)
- [GET /orderbook/v1/orders](api-references/get-orderbook-v1-orders.md)
- [GET /orderbook/v1/order/orderhash](api-references/get-orderbook-v1-order-orderhash.md)
- [GET /orderbook/v1-fee_recipients](api-references/get-orderbook-v1-fee_recipients.md)
- [POST /orderbook/v1/order](api-references/post-orderbook-v1-order.md)
- [POST /orderbook/v1/orders](api-references/post-orderbook-v1-orders.md)
- [POST /orderbook/v1/order_config](api-references/post-orderbook-v1-order_config.md)
- [websocket-api](api-references/websocket-api.md)
- [Rate Limits](rate-limiting.md)
- [Connection Limit](connection-limit.md)

## Code Examples

[0x Starter Project](https://github.com/0xProject/0x-starter-project) includes with a number of scenarios using the 0x v4 protocol that can be run from the command-line:

- [Create a Limit Order](../limit-orders-advanced-traders/guides/create-a-limit-order.md)
- [Cancel a Limit Order](../limit-orders-advanced-traders/guides/cancel-a-limit-order.md)
- [Fill a Limit Order](../limit-orders-advanced-traders/guides/fill-a-limit-order.md)
- [Limit Order Status](../limit-orders-advanced-traders/guides/limit-order-status.md)
- [Fill ERC20 Limi Order](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/fill_erc20_limit_order.ts)
- [Cancel a Pair of Limit Orders](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/cancel_pair_limit_orders.ts)
