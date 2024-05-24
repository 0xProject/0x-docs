---
sidebar_label: Introduction
sidebar_position: 1
description: 0x API hosts an Orderbook of 0x Limit Orders for teams to take liquidity from.
---

# Introduction

:::note
Please note the Orderbook API is not actively supported at this time. We're temporarily not accepting new integrators to post new orders.
:::

Enable limit orders in your app or take liquidity directly from the 0x Orderbook.

0x API has an Orderbook on the following chains:

- Ethereum
- BSC
- Polygon

In previous versions of 0x API prior to [0x Protocol v4](https://docs.0xprotocol.org/en/latest/), this functionality was exposed by the "SRA" endpoint. Previous docs: [https://github.com/0xProject/standard-relayer-api](https://github.com/0xProject/standard-relayer-api). Note that 0x Protocol is an open-sourced project that is separate and not maintained by 0x.

:::info
All teams with a valid [API key](https://dashboard.0x.org/) are able to **GET /orderbook**, if you are interested to **POST /orderbook** please contact 0x via the [Intercom Messenger](/introduction/getting-started#6-have-a-question) in the bottom-right of your [0x Dashboard](https://dashboard.0x.org/), we will review your request promptly.
:::

## Get Started

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
- [Websocket API](api-references/websocket-api.md)
- [Rate Limits](rate-limiting.md)
- [Connection Limit](connection-limit.md)
