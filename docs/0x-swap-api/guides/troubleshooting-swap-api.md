---
sidebar_label: Troubleshooting Swap API
sidebar_position: 6
description: Addressing common issues that come up with Swap API.
---

# Troubleshooting Swap API

## Swap Requirements

Here's a quick pre-flight checklist of things that need to be in order for a swap to properly execute.

## Working in Testnet

If you are building on a testnet (e.g. Sepolia, Mumbai), be aware that only a subset of DEX sources available on Ethereum mainnet are available on testnet. This may cause errors, such as `INSUFFICIENT_ASSET_LIQUIDITY` error.

At the time of writing this guide the following liquidity sources are supported on Sepolia: `MultiHop` and `Uniswap_V3`. Be aware that token you want to use for testing _must_ have liquidity on at least one of these sources; otherwise, you will receive an error.

To view the currently supported sources on any network refer to https://0x.org/docs/0x-swap-api/api-references/get-swap-v1-sources.

In addition, only certain pairs are deployed on testnests and available for testing. At the time of writing, the recommended testing pair is `WETH <> UNI` deployed by Uniswap on Sepolia.

See the [Working in Testnet](/0x-swap-api/guides/working-in-the-testnet) for more token pairs available on Sepolia and Mumbai.

## Sufficient Liquidity

You may receive the `INSUFFICIENT_ASSET_LIQUIDITY` error if there is not enough of the asset on the network to make the trade. This is common for very long-tail tokens or if you are building on a testnet (e.g. Sepolia, Mumbai). On testnets, only a subset of DEX sources available on Ethereum mainnet are available on testnet, so not all token pairs may be available.

## Balances and Allowances

The taker (whomever is executing the swap transaction) should hold at _least_ the `sellAmount` of `sellToken`. They also should approve the `allowanceTarget` (typically the Exchange Proxy) to spend at least the same amount for that token; otherwise, you may receive an `INSUFFICIENT_BALANCE` error.

## Gas Limits

The transaction needs to be submitted with enough gas. Due to the nondeterministic nature of the on-chain settlement process, the swap may require more than what an `eth_estimateGas` RPC call returns. Adding a 20-50% buffer to the estimated gas is recommended. Any unused gas will be refunded to the transaction submitter.

## Gas Price

Swap quotes are based off liquidity available at quote time and the transactions are designed to revert if a change in liquidity causes the price to drop below a chosen threshold. This is more likely to happen as the the delay increases between generating a quote and the transaction being mined. Submitting with a "fast" gas price will typically give your transaction priority with miners so the price has less chance of moving.

## Slippage Tolerance

The slippage tolerance is determined by the `slippagePercentage` query parameter, and is denominated such that `1 = 100%`, `0.01 = 1%` (the name is misleading). By default this value is `0.01 = 1%`. This is the maximum amount the price is allowed to drift during settlement, which can happen as other transactions interact with on-chain liquidity. The transaction will revert if this threshold is exceeded.

Depending on the network/chain you're using and tokens you're swapping, liquidity may be more shallow or volatile and the default 1% slippage tolerance may be too low. You can experiment with higher `slippagePercentage` values until the transaction succeeds, but understand that this also exposes your swap to potentially settling at what may no longer be considered a fair price.

## Fee-on-transfer Tokens

Some exotic tokens will take fees when any transfer of the token is performed. This often wreaks havoc on our settlement contracts as they are not aware of this mechanism and wind up attempting to sell less or receiving less than what the quote demands. In some circumstances you can _buy_ these tokens by setting a high enough `slippagePercentage` to accommodate the transfer fee, but your mileage may vary.

## More Resources

:::info
For the Troubleshooting list, see [FAQs & Troubleshooting](/developer-resources/faqs-and-troubleshooting)
:::
