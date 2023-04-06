---
sidebar_label: Introduction
sidebar_position: 1
description: Learn about 0x Limit Order Structure, why, and how to use it
---

# Introduction

The [0x Protocol](broken-reference) is a system of smart contracts that live on respective blockchains. It facilitates trust-less, low friction exchange of assets. While the protocol is open source and accessible by anyone, 0x Labs built the [0x API](../../introduction/introduction-to-0x.md#0x-api) as an additional off-chain layer to facilitate smooth interaction between applications and the 0x protocol smart contracts.

Used together, the 0x protocol and 0x API offer traders the opportunity to retain custody of their assets until their trades are settled. Conversely, one of the main disadvantages of trading on a centralized exchange (“CEX”) is that the CEX has full custody over your funds: you deposit your assets into a respective blockchain address controlled by the CEX, and must trust the CEX to secure your assets from hackers, rogue employees and other attackers. When trading with 0x, your assets never leave your own blockchain address until a trade is settled.

The 0x protocol currently serves two different kinds of orders: [0x Limit Orders](https://protocol.0x.org/en/latest/basics/orders.html#limit-orders) and [0x RFQ Orders](https://protocol.0x.org/en/latest/basics/orders.html#rfq-orders). This article focuses primarily on 0x Limit Orders, but both orders are essentially data packets that contain the [order's details](https://docs.0x.org/advanced-traders/guides/create-a-limit-order) and at least one [valid signature](https://protocol.0x.org/en/latest/basics/orders.html?highlight=signature#how-to-sign) (e.g. a valid elliptic curve signature generated from the trader’s blockchain address). When two entities agree on the terms of a trade, the 0x order is submitted to the respective blockchain and settled via the 0x protocol smart contracts.

In order for the 0x smart contracts to move funds on the behalf of traders, the traders must first give the contracts explicit permission. This is done by setting an ["allowance"](https://tokenallowance.io/) for a certain number of assets the 0x protocol can transfer from the traders’ addresses, and then cryptographically agreeing to the terms of the trade by applying a valid signature to the order. These rules are all enforced by the 0x protocol’s open-source smart contracts, which are deployed to the respective blockchain. Read more about setting allowances here: [How to Set Your Token Allowances](/0x-swap-api/advanced-topics/how-to-set-your-token-allowances).

## Applications Supporting 0x Limit Orders

0x Limit Orders are created off-chain and are completely free to create. Here are a few applications from the 0x ecosystem where you can trade with 0x Limit Orders:

* [Matcha](https://matcha.xyz/)
* [Opyn](https://v2.opyn.co/#/)
* [Metric.exchange](https://metric.exchange/)
* [Thales](https://thalesmarket.io/)

## 0x API

You can also trade with 0x Limit orders using the 0x API. 0x Limit Orders are supported on multiple blockchains, including:

* Ethereum
* Binance Smart Chain
* Polygon

We are deploying 0x Limit Orders to more chains, so please check [0x Cheat Sheet](/introduction/0x-cheat-sheet) for the most up-to-date list of availability.

## Code Examples

[0x Starter Project](https://github.com/0xProject/0x-starter-project) includes with a number of scenarios using the 0x v4 protocol that can be run from the command-line:

* [Fill ERC20 limit order](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/fill\_erc20\_limit\_order.ts)
* [Cancel pair limit orders](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/cancel\_pair\_limit\_orders.ts)