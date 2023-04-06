---
sidebar_label: Glossary
sidebar_position: 1
description: A list of commonly encountered terms when developing with 0x
---
# 📘 Glossary

### Atomically Swapped

Atomically swapped means the entire trade - the Maker’s asset going to the Taker and the Taker's asset going to the Maker - happens within one smart contract interaction.

### Automatic Market Maker (AMM)

An Automatic Market Maker (AMM) is the protocol that  provides liquidity to the exchange it operates in through automated trading.\
\
These protocols use smart contracts to define the price of digital assets and provide liquidity. Here, the protocol pools liquidity into smart contracts. In essence, users are not technically trading against counterparties – instead, they are trading against the liquidity locked inside smart contracts. These smart contracts are often called liquidity pools.\
\
Examples of AMMs include Uniswap, Sushiswap, Curve, Balancer, Bancor, and many others. \


### **Buys and Sells**

When we say “buys” vs “sells” in the context of **** API `/swap` endpoint, this is what we mean:

* _Imagine a user is trading **token A for token B**._
  * **Sell**: a sell is when the user is specifying the units of token A that they **would like to send**
  * **Buy**: a buy is when the user is specifying the units of token B that they **would like to receive**
* In both cases, the user is selling A for B. The terminology of "sells" vs "buys" in our `/swap` endpoint simply means "are you specifying an **input amount** or an **output amount**"?
* Generally in the UI, a "sell" is triggered when the user sets the field for token A and a "buy" is triggered when the user sets the field for token B. But in both cases, they're going from A → B.
* While these are commonly used terms, "buys" are a less commonly used feature.

### **Call Data**

When you send a transaction to an Ethereum smart contract for execution against a function, you must also send “data” or “call data”. The [first four bytes](https://www.4byte.directory/) of this call data, also known as the **function selector** (see below), determine the function, that the rest of the data is run against. The rest of the data is pretty much just the parameters passed to the function.

### CFMM

Constant Function Market Makers - another term for Automatic Market Makers (AMMs)

### **EOA**

Externally Owned Account - this is an “end user” address, which is in contrast to a “smart contract” address.

### **Function Selector**

This is the first 4 bytes of the **call data** (see above) that determine which function in a smart contract the transaction will run against. The function selector is the first 4 bytes of the `keccak256` hash of the function signature. Because hashing is only done on the function signature, all contracts that implement the same method (i.e. ERC-20s) have consistent function selectors (i.e. `0xa9059cbb` is always the Transfer function across contracts).

### **Impermanent Loss (IL)**

When the two assets in a pool start to diverge drastically in price (one becomes relatively expensive compared to the other), liquidity pools incur an opportunity cost where they would be better off simply holding each asset, as opposed to providing liquidity to the pool. This is also known as **Divergence Loss**.

### Maker

This is the Supply side of the the ecosystem. Makers create 0x orders, in other words, _provide the 0x liquidity_. 0x aggregates liquidity across a number of sources including -  public DEX liquidity (e.g. Uniswap, Curve, Bancor), Professional MMs, 0x's Open Orderbook, AMM  Liquidity Pools. This liquidity is put into the system to be consumed by Takers (see "Takers" for a graphic).&#x20;

### Off-chain relay, on-chain settlement

Unlike other decentralized exchanges that function entirely on-chain, 0x does not store orders on the blockchain; instead, orders are stored off-chain and only trade settlement occurs on-chain.

### **0x API**

The 0x API is a collection of services and endpoints that sit on top of the 0x Protocol. It allows users to access aggregated liquidity from dozens of on-chain and off-chain decentralized exchange networks and across multiple blockchains. It comes with many parameters to customize your requests for your application and your users.

### **0x DAO**

0x DAO ([Decentralized Autonomous Organization](https://ethereum.org/en/dao/)) is the collective governing voice of the 0x protocol and the ZRX token

### **0x Labs**

0x Labs is the company that created 0x Protocol and API.

### 0x Protocol

The [0x protocol](https://protocol.0x.org/en/latest/) is an open standard that facilitates the trustless, low friction, peer-to-peer exchange of Ethereum-based assets. The benefit of a standardized protocol is that defines a set of rules that allow entities on the same network to understand how to transmit data amongst each other. The 0x protocol is composed of smart contracts and  developer-tools that allow open access to a pool of shared liquidity.



### Request For Quotes (RFQ)

RFQ stands for Request for Quote. It is a design pattern that allows traders to get real time quotes from Market Makers. We  make API calls to Market Makers when they request a price from the 0x API.&#x20;

#### RFQT&#x20;

RFQT stands for "RFQ - Taker", which means it is the taker's responsibility to submit the transaction on chain. This is important because who submits the transaction on chain will change the flow of who needs to sign the order

#### RFQM

Previously stood for "RFQ - Maker", but now RFQM stands for "RFQ - Metatransaction". In the case of Metatransactions, 0x will submit the transaction to chain, paying the gas cost.

### Slippage

The price difference between when a transaction is submitted and when the transaction is confirmed on the blockchain.

This occurs because AMMs price their assets along bonding curves that are a function of the size of the relative amounts of each asset, and this price can change if the relative trade size is large. 


### Smart Order Routing

The 0x API helps users get the best price on their swap via Smart Order Routing splits a fill up up across the different sources to maximize the overall return on your swap. Checkout [this article ](https://blog.0xproject.com/0x-apis-smart-order-routing-7af0195515e5)for details on how it works.

### Taker

This is the Demand side of the the ecosystem. Takers fill 0x orders by agreeing to trade their asset for the Maker's asset; in other words, _consume the 0x liquidity_. Examples of Takers include Metamask, Coinbase, Zapper, dydx, Matcha, etc. 
