---
sidebar_label: Introduction
sidebar_position: 1
description: Tx Relay is in Closed Beta - highly subject to change
---

# Introduction

:::info
Tx Relay is in Closed Beta - highly subject to change. Before it is available in production, you can[ get acces to the Tx Relay Sandbox](/tx-relay-api/development-status). 
:::

### Overview

Welcome to Tx Relay with 0x! Tx Relay leverages the 0x Platform relay network to offer integrators and their end-users the ability to perform on-chain transactions without holding a chain’s native token.

### The Problem

One major source of friction in Web3 is the need for a user to hold and maintain balances for each chain’s native token in order to pay for transactions. Before today, users had to overcome this hurdle by preloading wallets, moving balances across apps, and sending tokens between addresses to initiate transactions. This is a significant barrier to more widespread adoption.

### The Solution

The Tx Relay API abstracts away the complexities related to approvals, allowances, and swaps. This allows developers to build more intuitive user interfaces for their applications, making it easier for them to onboard the next wave of users into Web3.

### The benefits of Tx Relay API

* **Improve onboarding and conversion:** Simplify user flows for your app and allow your users to start trading with any token that’s in their wallet. Users won’t be confronted with upfront requests for approvals and network fees, these are abstracted away into the backend.
* **Protection for users:** Protect users from MEV with proprietary Slippage Protection and Request for Quote orders from private market makers.
* **Deep liquidity for the best execution:** Unlock aggregated liquidity from 0x private market makers and 70+ exchanges including Uniswap for the most popular pairs on Ethereum and Polygon.
* **Build for crypto-native users:** Composable with Swap API if you want to offer execution optionality. Devs can design a UX where advanced users can opt in and opt out of gasless without sacrificing experience.

### Gasless Approval + Tx Relay Happy Path

Below is an image showing the ideal path when implementing both gasless approvals and Tx Relay. 
[![Click here to expand the image]](/img/tx-relay-api/gasless-approval-tx-relay.png)<img src="/img/tx-relay-api/gasless-approval-tx-relay.png" alt="" data-size="original"></img>

 ### Learn More

 * [Development Status](/tx-relay-api/development-status)
 * [Tx Relay FAQ](/tx-relay-api/tx-relay-faq)
 * [Gasless Approvals Token List](/tx-relay-api/gasless-approvals-token-list)
 * [API References](/tx-relay-api/api-references/overview)

