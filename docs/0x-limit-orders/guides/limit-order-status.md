---
sidebar_label: Limit Order Status
sidebar_position: 4
description: Learn about viewing & distributing 0x Limit Orders
---

# Limit Order Status

### Viewing & Distributing 0x Limit Orders

0x Limit Orders can be submitted to the [0x Orderbook](/0x-orderbook-api/introduction). The following request-endpoint combinations are commonly used to view and distribute 0x Limit Orders via the 0x API.

- [GET /orderbook/v1/](/0x-orderbook-api/api-references/get-orderbook-v1)
  - Retrieves the orderbook for a given asset pair
- [GET /orderbook/v1/orders](/0x-orderbook-api/api-references/get-orderbook-v1-orders)
  - Retrieves a list of orders given query parameters
- [POST /orderbook/v1/order](/0x-orderbook-api/api-references/post-orderbook-v1-order)
  - Submit a signed 0x Limit Order
- [POST /orderbook/v1/orders](/0x-orderbook-api/api-references/post-orderbook-v1-orders)
  - Submit a list of signed orders

### Code Examples

- **Typescript** - [ 0x Starter Project](https://github.com/0xProject/0x-starter-project) comes with a number of limit order scenarios including the [Fill ERC20 limit order](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/fill_erc20_limit_order.ts) scenario.

- **Python** - [Python 0x v4 RFQ Guide](https://gist.github.com/PirosB3/8141b51fbb307bca265866ef1cef564f) covers how to create, hash, sign, fill, get state, and cancel a 0x RFQ Order. Note that the code can be modified by making minor modifications, to also work for [0x Limit Orders](https://protocol.0x.org/en/latest/basics/orders.html#limit-orders).
