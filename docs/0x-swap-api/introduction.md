---
sidebar_label: Introduction
sidebar_position: 1
description: An introduction to how the 0x Swap API works and the resources included this section
---

# Introduction

:::info

This API is intended for public use. If you are an integrator who needs access higher rate limits, please fill out the [0x API Taker Integration Request Form.](https://www.0x.org/#contact)

:::

## What is Swap API?

Swap API is a professional-grade DEX aggregation and smart order routing REST API that runs on HTTP. Using the API, developers can easily and reliably tap into aggregated multi-chain DEX liquidity. Swap API finds the best executed price across 70+ liquidity sources, both public (AMMs) and private (professional market makers), across a growing number of blockchains.

:::tip

📍 **New to Swap API?** Watch this video on [🛠 Building Token Swaps with 0x API](https://www.youtube.com/watch?v=APXjSGLaoRw\&list=PLXzKMXK2aHh5oYMSL2stEUhgzgdbb58uV\&index=16). It provides overview of how the Swap API works, how to use it, and project ideas.

:::

## Why use Swap API?

0x Swap API watches out for your users and is easy for developers. &#x20;

* By default, it has **built-in user-protection features**, including:
  * [Slippage Protection](https://docs.0x.org/0x-api-swap/advanced-topics/slippage-protection) which **protects** users **against MEV-attacks**
  * [Price Impact Protection](advanced-topics/price-impact-protection.md) which **protects** users **from getting rekt** by illiquid markets
* 0x collects limited [trade surplus](../developer-resources/faqs-and-troubleshooting.md) (read more [here](../developer-resources/faqs-and-troubleshooting.md#if-the-difference-between-the-quoted-price-and-the-executed-price-is-positive-what-happens-to-the-fu)).&#x20;
* It is **easy-to-use!** For example, you can easily find the best price to buy DAI with WETH with this request

:::tip

**Try it out** 

Click to see a live price response for selling WETH -> DAI
<br></br>

👉 [https://api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=WETH&sellAmount=1000000000000000000](https://api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=WETH&sellAmount=100000000000000000)
<br></br>
The response that is returned back is a valid unsigned Ethereum transaction that can be submitted directly to a node to complete the swap.


:::


## How does it work?


![Swap API is a professional-grade DEX aggregation and smart order routing API. Using the API, developers can easily and reliably tap into aggregated multi-chain DEX liquidity. Swap API finds the best executed price across 70+ liquidity sources, both public (AMMs) and private (professional market makers), across a growing number of blockchains.](/img/introduction/swap-api-diagram.png)

Under the hood, the API performs a series of tasks:

* **Queries prices** from multiple DEXs and market makers and **aggregates the liquidity** from the queried sources to provide the best price possible. Think of how Google flights aggregates  flight prices for a certain time and date to help you find the best price, `/swap` similarly helps you find the best price across DeFi liquidity sources.
* Swap API’s **smart order routing** algorithm splits up your transaction across different sources to maximize the overall return on your swap. Read more about smart order routing [here](https://medium.com/@merklejerk/0x-apis-smart-order-routing-7af0195515e5).
* Swap API's **[Slippage Protection](https://blog.0x.org/slippage-protection-for-0x-api/)** enables developers to surface more reliable quotes and consistently deliver the best executed price to users.
* Swap API's **[Price Impact Protection](https://blog.0x.org/0x-swap-api-price-impact-protection/)** calculates price impact estimates, and allows developers to easily notify users if insufficient liquidity may negatively affect the price.
* 0x API's responses are returned in a format that can be **easily executed using the Web3 library of your choice**. 


## Get Started

This section contains the following docs and guides

#### API References

* [API References Overview](/0x-swap-api/api-references/overview)
* [GET /swap/v1/quote](/0x-swap-api/api-references/get-swap-v1-quote)
* [GET /swap/v1/price](/0x-swap-api/api-references/get-swap-v1-price)
* [GET /swap/v1/source](/0x-swap-api/api-references/get-swap-v1-source)

#### Advanced Topics

* [Rate Limiting](/0x-swap-api/advanced-topics/rate-limiting)
* [How to Set Your Token Allowances](/0x-swap-api/advanced-topics/how-to-set-your-token-allowances)
* [Slippage Protection](/0x-swap-api/advanced-topics/slippage-protection)
* [Price Impact Protection](/0x-swap-api/advanced-topics/price-impact-protection)

#### Guides

* [Swap Tokens with 0x Swap API](/0x-swap-api/guides/swap-tokens-with-0x-swap-api)
* [How to Build a Token Swap dApp with 0x API](https://docs.alchemy.com/alchemy/road-to-web3/weekly-learning-challenges/9.-how-to-build-a-token-swap-dapp-with-0x-api)
* [Use 0x API Liquidity in Your Smart Contracts](/0x-swap-api/guides/use-0x-api-liquidity-in-your-smart-contracts)
* [Fill a 0x API quote](https://github.com/0xProject/0x-starter-project)
* [Working in the Testnet](/0x-limit-orders/guides/working-in-the-testnet)


**API FAQs**

* [FAQs & Troubleshooting](/developer-resources/faqs-and-troubleshooting)
