---
sidebar_label: Limit Order Structure
sidebar_position: 2
description: Learn about 0x Limit Order Structure, why, and how to use it
---

# Limit Order Structure

Limit orders are the standard 0x Order, which encodes a possible trade between a maker and taker at a fixed price. These orders are typically distributed `/orderbook`, and can be filled through the functions on the Exchange Proxy.

The `LimitOrder` struct has the following fields:

| Field                 | Type    | Description                                                                                                                                                                    |
| --------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `makerToken`          | address | The ERC20 token the maker is selling and the maker is selling to the taker. \[required]                                                                                        |
| `takerToken`          | address | The ERC20 token the taker is selling and the taker is selling to the maker. \[required]                                                                                        |
| `makerAmount`         | uint128 | The amount of makerToken being sold by the maker. \[required]                                                                                                                  |
| `takerAmount`         | uint128 | The amount of takerToken being sold by the taker. \[required]                                                                                                                  |
| `takerTokenFeeAmount` | uint128 | Amount of takerToken paid by the taker to the feeRecipient. \[optional; default 0]                                                                                             |
| `maker`               | address | The address of the maker, and signer, of this order. \[required]                                                                                                               |
| `taker`               | address | Allowed taker address. Set to zero to allow any taker. \[optional; default 0]                                                                                                  |
| `sender`              | address | Allowed address to call fillLimitOrder() (msg.sender). This is the same as taker, expect when using meta-transactions. Set to zero to allow any caller. \[optional; default 0] |
| `feeRecipient`        | address | Recipient of maker token or taker token fees (if non-zero). \[optional; default 0]                                                                                             |
| `pool`                | bytes32 | The staking pool to attribute the 0x protocol fee from this order. Set to zero to attribute to the default pool, not owned by anyone. \[optional; default 0]                   |
| `expiry`              | uint64  | The Unix timestamp in seconds when this order expires. \[required]                                                                                                             |
| `salt`                | uint256 | Arbitrary number to enforce uniqueness of the order hash. \[required]                                                                                                          |