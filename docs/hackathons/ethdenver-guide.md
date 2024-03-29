---
sidebar_label: ETHDenver BUIDLathon Guide
sidebar_position: 1
description: A guide for integrating 0x into your hackathon projects
---

# ETHDenver BUIDLathon Guide

Welcome to the [ETHDenver BUIDLathon 2024](https://www.ethdenver.com/)! This document serves as a guide for integrating 0x into your hackathon projects. Our team is here to assist you.

Questions? Feel free to reach us at the following:

- Booth #317 at Futureverse Shillage
- Join our [Discord `#❄┊ethdenver-2024` channel](https://discord.com/channels/435912040142602260/1209687550340632577)

**TL;DR:**
0x has one “Feature Integration” bounty. We are offering 6 prizes to the best projects that use any one of 0x APIs - Swap, Tx Relay, Price. Read here for [judging criteria](/hackathons/ethdenver-guide#judging-criteria). Read here for [build resources & demo apps](/hackathons/ethdenver-guide#resources).

---

## What is 0x?

[0x](https://0x.org/) offers professional-grade APIs that aggregate and enable swaps at the best price on 5 million tokens across 130+ DEXes and 9 chains.

- [Swap API](https://0x.org/products/swap) allows devs to easily add ERC-20 swap functionality into their dapps.
- [Tx Realy API](https://0x.org/products/tx-relay) empowers a gasless swap experience with gasless approvals and gasless swaps.
- [Price API](https://0x.org/docs/category/price-api) gives you access to realtime DEX prices.

These are the same APIs that power many of the most popular dapps including - Coinbase Wallet, Matcha, Zapper, Metamask, and more.

## 0x Bounty Prizes

0x is offering 6 prizes to the best projects that uses any one of 0x APIs ([Swap](https://0x.org/docs/category/swap-api), [Tx Relay](https://0x.org/docs/category/tx-relay-api), [Price](https://0x.org/docs/category/price-api)) -

- 🥇 1st Place: $3,000
- 🥈 2nd Place: $2,500
- 🥉 3rd Place: $1,500
- 🖼 Seamless UX: $1,000
- 💡 Most Innovative: $1,000
- 🌐 Most Scalable: $1,000

**After the Hackathon,** prize winners and participants of the 0x bounty may be selected for future collaborations or partnerships. We love featuring our integrators and showcasing their work!

## Judging Criteria

All submissions must fulfill the following requirements to be considered valid:

<details>

<summary>🔢 Fits 1 of the 4 categories</summary>

Project must fit into at least 1 of the following 4 categories, see below for more details about each category.

1. Token On/Off Ramp
2. Gaming/NFT
3. Trading Infra
4. Open category

</details>

<details>

<summary>💻 Tech Implementation</summary>

- The code well-written, technically sound, and clean
- Projects that are code-complete will have higher consideration than projects that are just in ideation

</details>

<details>

<summary>✨ Creativity</summary>

The solution should not only be functional but also innovative. We are looking for unique approaches that stand out in terms of design, usability, or technical implementation.

</details>

<details>

<summary>🌈 Design</summary>

If the project is user-facing, project should demonstrate a clear understanding of user needs and present an interface that is intuitive and accessible.

</details>

<details>

<summary>🌐 Market Adoption</summary>

1. The project has potential to gain real-world traction
2. The project fills a market gap and has the potential to be adopted by a sizable and diverse audience

</details>

<details>

<summary>✏️ Presentation Quality</summary>

1. Project scope is clearly defined and conveys how the solution simplifies or enhances the DeFi experience
2. Project clearly describes the app architecture, codebase, and how the 0x APIs are integrated and utilized.

</details>

## Categories

As outlined in the [judging criteria](/hackathons/ethdenver-guide#judging-criteria) above, we are seeking projects that align with one of the following categories.
These categories are designed to focus your innovation on key areas of the DeFi ecosystem where 0x APIs can have a significant impact:

<details>

<summary>Token On/Off Ramp</summary>

Token on/off ramps facilitate seamless transitions between different ERC-20 tokens for users, directly within the app. This includes both visible swaps and automated processes like index fund rebalancing. By incorporating these ramps, users can conveniently use any tokens in their wallet, eliminating the need to use external platforms for acquiring specific tokens, such as ETH. Integration of 0x Swap and Tx Relay APIs enables in-app token swaps, potentially automated, enhancing the user experience for managing token positions.

Examples include but are not limited to Decentralized Indices, Lending, Perps, Derivatives, Yield Farming, Prediction Markets, Liquid Staking, Tokenized RWA, and Insurance Platforms. The sky's the limit!

</details>

<details>

<summary>Gaming and NFT Infrastructure</summary>

If your project is centered around web3 gaming or NFT infrastructure/marketplace, leverage 0x to enable users to conveniently swap into required tokens directly within your NFT marketplace or in-game environment. Your solution should enhance the user experience in acquiring, trading, or utilizing NFTs.

Examples include, embedding a ERC-20 swap widget directly within your NFT marketplace for users to easily get the required payment token. Or allow your gamers easily buy in-game ERC-20 tokens via an embedded swap widget.

</details>

<details>

<summary>Trading Automation Tools & Infrastructure</summary>

Develop tools or infrastructure that automate aspects of trading using 0x APIs. Focus on innovations that enhance trading efficiency, accuracy, and accessibility for users in the DeFi space.

Examples include but are limited to Risk Management tools, Trading bots, Solvers, Decentralized Mutual Funds, DeFi Index Rebalancing, Cross-chain interoperability (Swap API + [CCTP](https://developers.circle.com/stablecoins/docs/cctp-getting-started?_gl=1*4ur513*_ga*MTkxMjczNDAzMi4xNzAyNTk1OTI4*_ga_GJDVPCQNRV*MTcwNTYwOTc5Mi4yMC4wLjE3MDU2MDk3OTQuNTguMC4w))

</details>

<details>

<summary>Open Category</summary>

If your team has an innovative idea that does not fit into the above categories, we encourage you to discuss it with the 0x team. Visit us at our booth (#317 in Futureverse Shillage) or reach out on the 0x Discord to explore how your unique concept can contribute to the 0x ecosystem.

</details>

## Resources

##### Code Examples

- [0x Examples Repo](https://github.com/0xProject/0x-examples)
- [(Next.js) Tx Relay API demo app](https://github.com/0xProject/0x-examples/tree/main/tx-relay-next-app)
- [(Next.js) Swap API demo app](https://github.com/0xProject/0x-nextjs-demo-app)
- [(HTML, CSS, JavaScript) Swap API demo app](https://github.com/0xProject/swap-demo-tutorial)

##### Fundamentals

- Swap API
  - [Get started with Swap API](https://0x.org/docs/0x-swap-api/guides/swap-tokens-with-0x-swap-api)
  - [How to build a token swap dapp with Next.js, 0x, ConnectKit](https://www.youtube.com/watch?v=P1ECx9zKQiU&t)
- Price API
  - [Get started with Price API](https://0x.org/docs/0x-price-api/guides/get-started-price-api)
- Tx Relay API
  - [Get started with Tx Relay API](https://0x.org/docs/tx-relay-api/guides/get-started-with-tx-relay-api)
  - [How to build a dApp with Tx Relay API](https://0x.org/docs/tx-relay-api/guides/build-a-dapp-with-tx-relay-api)

##### Beyond the Basics

- [Use 0x API liquidity in your smart contracts](https://0x.org/docs/0x-swap-api/guides/use-0x-api-liquidity-in-your-smart-contracts)
- [Working in the testnet](https://0x.org/docs/0x-swap-api/guides/working-in-the-testnet)
- [How to integrate RFQ liquidity](https://0x.org/docs/0x-swap-api/guides/accessing-rfq-liquidity/how-to-integrate-rfq-liquidity)
- [How to monetize your swap app](https://0x.org/docs/0x-swap-api/guides/monetize-your-app-using-swap)

#### Videos

- [0x videos](https://0x.org/docs/introduction/guides#videos)
- [0x YouTube](https://www.youtube.com/c/0xproject)

## FAQs

Below are some commonly asked questions at hackathons. For a full list of [0x FAQs](https://0x.org/docs/developer-resources/faqs-and-troubleshooting), see here.

<details>

<summary>Where can I get testnet funds? </summary>

- Alchemy [Sepolia Faucets](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Even more faucets](https://github.com/anettrolikova/Crypto/blob/master/README.md#faucets)
- Also see our [Working in the Testnet](https://0x.org/docs/0x-swap-api/guides/working-in-the-testnet) Guide for best practices on how to test with testnet tokens.

</details>

<details>

<summary>Help, my 0x transaction reverted! How can I troubleshoot? </summary>

If your 0x quote is reverting, besides the standard revert issues related to ETH transactions, we recommend check the following are set correctly:

- Are allowances properly set for the user to trade the `sellToken`?
- Does the user have enough `sellToken` balance to execute the swap?
- Do users have enough to pay the gas?
- The slippage tolerance may be too low if the liquidity is very shallow for the token the user is trying to swap. Read [here](https://docs.0x.org/0x-api-swap/guides/troubleshooting-0x-api-swaps#slippage-tolerance) for how to handle this.
- Fee-on-transfer tokens may wreak havoc on our contracts. Read [here](https://docs.0x.org/0x-api-swap/guides/troubleshooting-0x-api-swaps#fee-on-transfer-tokens) for how to handle this

For more details on addressing common issues, read [0x FAQ & Troubleshooting](https://0x.org/docs/developer-resources/faqs-and-troubleshooting)

</details>

<details>

<summary>In my app flow, the transaction will need to be signed by a smart contract rather than an EOA. Do you have recommendations for how to implement this?  </summary>

Consider looking into [ERC-1271](https://eips.ethereum.org/EIPS/eip-1271), a standard way to verify a signature when the account is a smart contract

</details>

## Job Opportunities

Find open 0x positions at: https://0x.org/careers
