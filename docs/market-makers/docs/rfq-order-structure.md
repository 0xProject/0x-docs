---
sidebar_label: RFQ Order Structure
sidebar_position: 2
description: RFQ Order Structure
---
# RFQ Order Structure

RFQ orders are a stripped down version of standard [limit orders](/0x-limit-orders/docs/limit-order-structure), supporting fewer fields and a leaner settlement process. These orders are fielded just-in-time, directly from market makers, during the construction of a swap quote on 0x API, and can be filled through the `fillRfqOrder()` function on the Exchange Proxy.


Some notable differences from regular limit orders are:

* There is no `sender` field.
* There is no taker fee.
* Must restrict `transaction.origin` via the _order.txOrigin_ field.
* There is currently no protocol fee paid when filling an RFQ order.



The `RFQOrder` struct has the following fields:

| Field         | Type      | Description                                                                                                                                                                  |
| ------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `makerToken`  | `address` | The ERC20 token the maker is selling and the maker is selling to the taker. [required]                                                                                                                                                                         |
| `takerToken`  | `address` | The ERC20 token the taker is selling and the taker is selling to the maker. \[required]                                                                                                                                                                        |
| `makerAmount` | `uint128` | The amount of makerToken being sold by the maker. \[required]                                                                                                                                                                                                  |
| `takerAmount` | `uint128` | The amount of takerToken being sold by the taker. \[required]                                                                                                                                                                                                  |
| `maker`       | `address` | The address of the maker, and signer, of this order. \[required]                                                                                                                                                                                               |
| `taker`       | `address` | Allowed taker address. Set to zero to allow any taker. \[optional; default 0]                                                                                                                                                                                  |
| `txOrigin`    | `address` | The allowed address of the EOA that submitted the Ethereum transaction. **This must be set**. Multiple addresses are supported via [registerAllowedRfqOrigins](https://protocol.0x.org/en/latest/basics/functions.html#registerallowedrfqorigins). \[required] |
| `pool`        | `bytes32` | The staking pool to attribute the 0x protocol fee from this order. Set to zero to attribute to the default pool, not owned by anyone. \[optional; default 0]                                                                                                   |
| `expiry`      | `uint64`  | The Unix timestamp in seconds when this order expires. \[required]                                                                                                                                                                                             |
| `salt`        | `uint256` | Arbitrary number to enforce uniqueness of the order hash. \[required]                                                                                                                                                                                          |
