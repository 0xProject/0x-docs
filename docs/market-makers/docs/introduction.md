---
sidebar_label: Introduction
sidebar_position: 1
description: This section is for (i) Professional Market-makers interested in supplying liquidity via the 0x RFQ system, and (ii) Integrators who would like to access RFQ liquidity, via /swap
---

# Introduction

This document is for Professional Market-Makers who want to understand an overview of the 0x RFQ system and how to provide liquidity to it.

:::info
If you represent a trading firm that would like to add liquidity to the 0x ecosystem via the RFQ system, please get in touch here: [0x RFQ Interest Form](https://docs.google.com/forms/d/e/1FAIpQLSen019JsWFZHluSgqSaPE_WFVc4YBtNS4EKB8ondJJ40Eh8jw/viewform?usp=sf_link)
:::

:::info
If you are a Swap API integrator who would like to _access_ RFQ liquidity, check out [How to Integrate the RFQ System
](/0x-swap-api/guides/accessing-rfq-liquidity-on-0x-api#how-to-integrate-the-rfq-system).
:::

## About the RFQ System

_RFQ liquidity is currently available on Mainnet & Polygon._

### An Exclusive Source of Liquidity

In its role as a DEX aggregator, the Swap API integrates both on- and off-chain liquidity. On-chain liquidity is sourced by sampling smart contract liquidity pools, such as Uniswap and Curve. Off-chain liquidity is sourced from professional market makers via the 0x Request-for-Quote (“RFQ”) System.

If integrators request a standard quote from the Swap API, part or all of their quote may be sourced via the **RFQ** system. In this system, the Swap API aggregates quotes from professional market makers, alongside quotes from AMMs. If the market-maker quotes are more competitive than AMM quotes, they may be included in the final price shown to the end-user. The end-user’s liquidity is ultimately provided by a combination of AMMs and professional market makers. _Everything happens under-the-hood!_

![RFQ Diagram](/img/market-makers/rfq-diagram.png)

## Parties in the System

### Trusted Takers

RFQ orders contain a [`takerAddress` query parameter](../../developer-resources/faqs-and-troubleshooting.md#how-does-takeraddress-help-with-catching-issues). When an order containing this parameter gets hashed and signed by two counterparties, it is exclusive to those two counterparties.

### Dedicated Makers

In addition to the Swap API configuration identifying trusted takers, it also contains a list of specific market makers that participate in the RFQ system. Each maker is identified by an HTTP endpoint URL, and each endpoint has an associated list of asset pairs for which that endpoint will provide quotes. For the instance at `api.0x.org`, the 0x team is maintaining a list of trusted market makers.

:::info
If you represent a trading firm that would like to add liquidity to the 0x ecosystem via the RFQ system, please get in touch here: [0x RFQ Interest Form](https://docs.google.com/forms/d/e/1FAIpQLSen019JsWFZHluSgqSaPE_WFVc4YBtNS4EKB8ondJJ40Eh8jw/viewform?usp=sf_link)
:::

## Indicative Pricing, Firm Quotes, and How to Integrate

Read more about how integrators (takers) request for [indicative pricing](/0x-swap-api/guides/accessing-rfq-liquidity-on-0x-api#indicative-pricing) and [firm quotes](/0x-swap-api/guides/accessing-rfq-liquidity-on-0x-api#firm-quotes) in [How to Integrate the RFQ System](/0x-swap-api/guides/accessing-rfq-liquidity-on-0x-api#how-to-integrate-the-rfq-system).
