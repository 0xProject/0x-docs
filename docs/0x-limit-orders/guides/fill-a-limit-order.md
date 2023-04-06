---
sidebar_label: Fill a Limit Order
sidebar_position: 3
description: Fill a Limit Order
---
# Fill a Limit Order

[0x Limit Orders](https://protocol.0x.org/en/latest/basics/orders.html#limit-orders) may be filled by calling the following methods on the [Exchange Proxy](https://protocol.0x.org/en/latest/architecture/overview.html). 

Our [protocol utilization](https://github.com/0xProject/protocol/tree/development/packages/protocol-utils) package is available for developers to generate, parse, sign and validate 0x orders. 

These are the basic functions for filling a 0x Limit Order:

* [fillLimitOrder](https://protocol.0x.org/en/latest/basics/functions.html#filllimitorder)
  * Fills a 0x Limit Order up to the amount requested
* [fillOrKillLimitOrder](https://protocol.0x.org/en/latest/basics/functions.html#filllimitorder)
  * Fills exactly the amount requested or reverts

### Code Examples

* **Typescript** - [ 0x Starter Project](https://github.com/0xProject/0x-starter-project) comes with a number of limit order scenarios including the [Fill ERC20 limit order](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/fill\_erc20\_limit\_order.ts) scenario.

* **Python** - [Python RFQ Guide](https://gist.github.com/PirosB3/8141b51fbb307bca265866ef1cef564f) covers how to create, hash, sign, fill, get state, and cancel a 0x RFQ Order. Note that the code can be modified by making minor modifications, to also work for [0x Limit Orders](https://protocol.0x.org/en/latest/basics/orders.html#limit-orders).