---
sidebar_label: Create a Limit Order
sidebar_position: 1
description: Learn about how to create a limit order
---
# Create a Limit Order

When created with the 0x API, these limit orders are represented JSON objects ( [limit order format](https://protocol.0x.org/en/latest/basics/orders.html#limit-orders)). In order to create a valid 0x Limit Order with the 0x API, you can use the [@0x/protocol-utils ](https://github.com/0xProject/protocol/tree/development/packages/protocol-utils)TypeScript/Javascript library. The TypeScript library will help you:

1. Generate an order in the proper format
2. Generating a proper hash for the order contents
3. Sign the order hash using your keys (which makes the order valid)

Below is a basic code demo of how to create, sign and submit 0x Limit Orders on a testnet. [View in Code Sandbox](https://codesandbox.io/s/recursing-bell-ydbxb).

<div>
  <iframe src="https://codesandbox.io/embed/0x-v4-limit-order-example-ydbxb?fontsize=14&hidenavigation=1&theme=dark"
     title="0x-v4-limit-order-example"
     width="100%"
     height="500px"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
</div>

### Code Examples

* **Typescript** - [ 0x Starter Project](https://github.com/0xProject/0x-starter-project) comes with a number of limit order scenarios including the [Create and sign a ERC20 limit order](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/cancel\_pair\_limit\_orders.ts) scenario.

* **Python** - [Python RFQ Guide](https://gist.github.com/PirosB3/8141b51fbb307bca265866ef1cef564f) covers how to create, hash, sign, fill, get state, and cancel a 0x RFQ Order. Note that the code can be modified by making minor modifications, to also work for [0x Limit Orders](https://protocol.0x.org/en/latest/basics/orders.html#limit-orders).