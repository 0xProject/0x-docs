---
sidebar_label: Accessing RFQ Liquidity on Swap API
sidebar_position: 1
description: This guide discusses what RFQ liquidity is, how it works, and how your project can apply to access it from the Swap API.
---

# About the RFQ System

:::info
This guide is for integrators/projects who would like to **access** 0x RFQ liquidity, via the Swap API. If you represent a trading firm or professional market maker that would like to **supply** RFQ liquidity, please get in touch here: [0x RFQ Interest Form](https://docs.google.com/forms/d/e/1FAIpQLSen019JsWFZHluSgqSaPE_WFVc4YBtNS4EKB8ondJJ40Eh8jw/viewform?usp=sf_link)
:::

## About the RFQ System

_RFQ liquidity is currently available on Mainnet & Polygon._

### An Exclusive Source of Liquidity

In its role as a liqudity aggregator, 0x's APIs integrates both on- and off-chain liquidity. On-chain liquidity is sourced by sampling smart contract liquidity pools, such as Uniswap and Curve. Off-chain liquidity is sourced from professional market makers via the 0x Request-for-Quote (“RFQ”) System.

The RFQ system allows traders to _request_ real time quotes from market makers. This source of liquidity is exclusive to 0x, has 0 slippage, and better trade execution.

If integrators request a standard quote from the Swap API, part or all of their quote may be sourced via the **RFQ** system. In this system, the Swap API aggregates quotes from professional market makers, alongside quotes from AMMs. If the market maker quotes are more competitive than AMM quotes, they may be included in the aggreagated final price shown to the end-user. The end-user’s liquidity is ultimately provided by a combination of AMMs and professional market makers. _Everything happens under-the-hood!_

![RFQ Diagram](/img/0x-swap-api/rfq-diagram.png)

### Parties in the System

**Trusted Takers**

Takers fill 0x orders by agreeing to trade their asset for the Maker's asset; in other words, consume the 0x liquidity. When making a Swap API request, the RFQ orders must contain the [`takerAddress`](/0x-swap-api/api-references/get-swap-v1-quote) request parameter. When an order containing this parameter gets hashed and signed by two counterparties, it is exclusive to those two counterparties. This means that the order can only be filled by the taker address specified in the order. This is a security feature that prevents front-running and other types of attacks.

**Dedicated Makers**

In addition to the Swap API configuration identifying trusted takers, it also contains a list of specific market makers that participate in the RFQ system. Each maker is identified by an HTTP endpoint URL, and each endpoint has an associated list of asset pairs for which that endpoint will provide quotes. For the instance at `api.0x.org`, the 0x team is maintaining a list of trusted market makers.

## Integrating RFQ Liquidity

Read about how to easily [integrate RFQ liquidity](/0x-swap-api/guides/accessing-rfq-liquidity/integrating-rfq-liquidity) into your project.
