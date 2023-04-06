---
sidebar_label: Introduction to 0x
sidebar_position: 2
description: This is your launchpad to learn about 0x - Trusted exchange infrastructure for the internet
---

# Introduction to 0x

:::tip

Prefer to watch a video instead? Jump to[ 0x Concept Videos](0x-concept-videos.md).

:::


## The 0x Ecosystem

0x is a trusted exchange infrastructure for the internet that has enabled over $180B in tokenized value flow through all major blockchains. Developers can use 0x to add flexible, multi-chain exchange functionality into their applications and create new markets for all tokenized assets, including cryptocurrencies, DeFi tokens, and NFTs. 

0x's professional-grade APIs are built on the [0x Protocol](https://protocol.0x.org/en/latest/), a set of secure, audited smart contracts. Applications building on these tools are part of the 0x Ecosystem. 

The diagram below shows an overview of the 0x Ecosystem, which includes applications who supply liquidity (**[Makers](/introduction/introduction-to-0x#supply-aka-makers)**), applications who demand liquidity (**[Takers](introduction/introduction-to-0x#demand-aka-takers)**). 

<!-- TODO Update image -->

![0x is an open-source, decentralized exchange infrastructure that enables the exchange of tokenized assets on multiple blockchains.](/img/introduction/0x-ecosystem.png)


### Makers and Takers

Within the 0x ecosystem, there are two sides - Makers and Takers:

#### **Supply (aka Makers)**

This is the entity who creates 0x orders and _provides liquidity_ into the system for the Demand side (Takers) to consume. 0x aggregates liquidity from multiple sources including:

* On-chain liquidity - DEXs, AMMs (e.g. Uniswap, Curve, Bancor)
* Off-chain liquidity - Professional Market Makers, 0x's Open Orderbook network
* _Relevant Docs:_
<!-- TODO Add links -->
  * Market Makers - Professional Market Making With Limit Orders
  * 0x Orderbook API - Sharing Limit Orders
  * Limit Orders (Advanced Traders) - Filling and Managing Limit Orders

#### **Demand (aka Takers)**

This is the entity who wants the Maker's asset. The Takers agree to trade their asset for the Maker's asset; in other words, they _consume the 0x liquidity_. Examples include projects such as MetaMask, Coinbase, and dydx.

* _Relevant Docs:_
<!-- TODO Add links -->
  *  Swap API - The most efficient liquidity aggregator for ERC20 tokens through a single API.


## How does 0x work?

Let’s look into how a 0x order is executed.

![how does 0x work](/img/introduction/onchainoffchain.gif)


1. A Maker creates a 0x order which is a json object that adheres to a standard order message format (see list of all [0x order types here](0x-cheat-sheet.md#0x-order-types)). It indicates what kind of asset the Maker is committed to trade. Assets could include fungible tokens (ERC20), non-fungible tokens (ERC721), or bundles of assets (ERC1155).
2. The order is hashed, and the Maker signs the order to cryptographically commit to the order they authored.
3. The order is shared with counter-parties.
   * If the Maker of the 0x order already knows their desired counter-party, they can send the order directly (via email, chat, or over-the-counter platform)
   * If the Maker doesn’t know a counter-party willing to take the trade, they can submit the order to orderbook.
4. 0x API aggregates liquidity across all the [supply sources](introduction-to-0x.md#supply-aka-makers) to surface the best price for the order to the Taker. 0x helps traders create, find, and fill the 0x orders through the paradigm of _[off-chain relay and on-chain settlement](/developer-resources/glossary#off-chain-relay-on-chain-settlement)_. This means that 0x does not store orders on the blockchain; instead, orders are stored off-chain, and trade settlement only occurs on-chain. This unique feature makes 0x a flexible and gas-efficient DEX protocol for developers to build on.
5. The Taker fills the 0x order by submitting the order and the amount they will fill it for to the blockchain.
6. The 0x Protocol's settlement logic verifies the Maker’s digital signature and that all the conditions of the trade are satisfied. If so, the assets involved are [atomically swapped](/developer-resources/glossary#atomically-swapped) between Maker and Taker. If not, the trade is reverted.

## What can I build on 0x?

Below is a non-exhaustive list of projects that have been built on 0x. Note that 0x can also be integrated into any existing application where exchange is not the core purpose of the application. For more examples this [blog post](https://blog.0x.org/exploring-the-0x-defi-ecosystem/).

### Demand (Takers)

* **Exchanges**
  * A decentralized exchange for X asset on Y market
  * An Ebay-style marketplace for digital goods
  * An over-the-counter (OTC) trading desk
* **Wallets**
  * Digital wallets whose users want to exchange tokens
* **Options and derivatives platform**
  * A DeFi protocol that needs liquidity and exchange to function (e.g. a derivatives, lending, or options protocol)
* **Portfolio managers**
* **Prediction markets**
* **Non-fungible tokens (NFT) Exchange**
  * NFT marketplace
  * Games with in-game currencies or items
* **Investment strategies (e.g. DeFi index funds, DCA apps)**
* **Data**
  * 0x multi-chain analytics portal
  * Real-time trades panel w/ GraphQL wrappers

### Supply (Makers)

* **Orderbook models**
* **Automatic Market Makers (AMM) models**
* **Market Makers**
  * A market making or arbitrage trading bot
