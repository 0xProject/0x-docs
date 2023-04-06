---
sidebar_label: Limit Order Status
sidebar_position: 4
description: Learn about viewing & distributing 0x Limit Orders
---

# Limit Order Status

### Viewing & Distributing 0x Limit Orders

0x Limit Orders can be submitted to the [0x Orderbook](/0x-orderbook-api/). The following request-endpoint combinations are commonly used to view and distribute 0x Limit Orders via the 0x API.

* [GET /orderbook/v1/](https://0x.org/docs/api#get-orderbookv1)
  * Retrieves the orderbook for a given asset pair
* [GET /orderbook/v1/orders](https://0x.org/docs/api#get-orderbookv1orders)
  * Retrieves a list of orders given query parameters
* [POST /orderbook/v1/order](https://0x.org/docs/api#post-orderbookv1order)
  * Submit a signed 0x Limit Order
* [POST /orderbook/v1/orders](https://0x.org/docs/api#post-orderbookv1orders)
  * Submit a list of signed orders

### Code Examples

* **Typescript** - [ 0x Starter Project](https://github.com/0xProject/0x-starter-project) comes with a number of limit order scenarios including the [Fill ERC20 limit order](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/fill\_erc20\_limit\_order.ts) scenario.

* **Python** - [Python 0x v4 RFQ Guide](https://gist.github.com/PirosB3/8141b51fbb307bca265866ef1cef564f) covers how to create, hash, sign, fill, get state, and cancel a 0x RFQ Order. Note that the code can be modified by making minor modifications, to also work for [0x Limit Orders](https://protocol.0x.org/en/latest/basics/orders.html#limit-orders).