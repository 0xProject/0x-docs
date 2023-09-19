---
sidebar_label: How to Integrate RFQ Liquidity
sidebar_position: 2
description: This guide covers the 3 steps to integrate RFQ liquidity into your application.
---

# How to Integrate RFQ Liquidity

In [About the RFQ System](/0x-swap-api/guides/accessing-rfq-liquidity/about-the-rfq-system), we covered what is RFQ liquidity and how it is aggregated by 0x. This guide will cover the 3 steps to integrate RFQ liquidity into your application.

### Overview

Easily integrate RFQ liquidity in 3 steps:

1. [Query for an **indicative price**](/0x-swap-api/guides/accessing-rfq-liquidity/how-to-integrate-rfq-liquidity#1-indicative-pricing) via `/swap/v1/price`
2. [Fetch a **firm quote**](/0x-swap-api/guides/accessing-rfq-liquidity/how-to-integrate-rfq-liquidity#2-firm-quotes) from Swap API via `/swap/v1/quote`
3. [**Submit the transaction**](/0x-swap-api/guides/accessing-rfq-liquidity/how-to-integrate-rfq-liquidity#3-submitting-the-transaction) to blockchain

:::info
⏰ The time difference between each step is non-trivial because we are requesting bespoke quotes from market makers. If a client sits on the RFQ firm quote too long, the probability of the transaction reverting increases. Typically, it's expected that time difference between steps 1 and 2 are minimal. We also recommend setting a max amount of time between steps 2 and 3, 30 seconds is usually a reasonable time before re-asking for a firm quote.
:::

:::tip
Prefer to see a code demo and watch a video?
Checkout the [Next.js 0x Demo App](https://github.com/0xProject/0x-nextjs-demo-app) and [video](https://www.youtube.com/watch?v=P1ECx9zKQiU) for best practices implementing indicative pricing and firm quotes.
:::

## 1. Indicative Pricing

Indicative pricing is used for takers who are querying the prices they could receive. The Swap API will respond to an indicative price with the expected rate of trade between the asset pair specified.

The indicative pricing resource is hosted at [`/swap/v1/price`](/0x-swap-api/api-references/get-swap-v1-price) and responds with pricing information, but that response does not contain a full 0x order, so it does not constitute a legitimate transaction that can be submitted to the Ethereum network (you must use [/quote](/0x-swap-api/guides/accessing-rfq-liquidity/how-to-integrate-rfq-liquidity#2-firm-quotes) for this).

In order to receive indicative pricing that includes RFQ liquidity, the request to `/swap/v1/price` must include a non-null `takerAddress` parameter.

### Example Parameters of API Request

:::info
A `takerAddress` is required for RFQ liquidity. This is the address that will be filling the order.

RFQ liquidity is currently available on Mainnet, Polygon, and Arbitrum via Swap API. Find the API endpoint for different chains [here](/0x-swap-api/api-references/overview).

:::

```
https://api.0x.org/swap/v1/price             // Request an indicative quote
?sellToken=DAI                               // Sell DAI
&sellAmount=4000000000000000000000           // Sell amount: 4000
&buyToken=WETH                               // Buy WETH
&takerAddress=$USER_TAKER_ADDRESS            // Address that will make the trade
--header '0x-api-key: [API_KEY]'             // Replace with your own API key
```

### Example Response

The response to an indicative quote will include a price and a buy/sell amount in base unit amount.

```json
{
  "price": "0.002639",
  "value": "9150000000000000",
  "gasPrice": "61000000000",
  "gas": "540000",
  "estimatedGas": "450000",
  "protocolFee": "9150000000000000",
  "minimumProtocolFee": "4270000000000000",
  "buyTokenAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  "buyAmount": "79167470868867655",
  "sellTokenAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  "sellAmount": "30000000",
  "sources": [
    {
      "name": "0x",
      "proportion": "1"
    },
    {
      "name": "Uniswap",
      "proportion": "0"
    },
    {
      "name": "Uniswap_V2",
      "proportion": "0"
    },
    {
      "name": "Eth2Dai",
      "proportion": "0"
    },
    {
      "name": "Kyber",
      "proportion": "0"
    },
    {
      "name": "Curve",
      "proportion": "0"
    },
    {
      "name": "LiquidityProvider",
      "proportion": "0"
    },
    {
      "name": "MultiBridge",
      "proportion": "0"
    },
    {
      "name": "Balancer",
      "proportion": "0"
    }
  ],
  "estimatedGasTokenRefund": "0",
  "allowanceTarget": "0xdef1c0ded9bec7f1a1670819833240f027b25eff"
}
```

### Sample cURL Request

```bash
curl https://api.0x.org/swap/v1/price?sellToken=USDC&sellAmount=30000000&buyToken=ETH&takerAddress=0x0A975d7B53F8DA11e64196d53Fb35532fea37E85 --header '0x-api-key: [api-key]'
```

## 2. Firm Quotes

When a taker is ready to actually perform a fill, they will request a firm quote from Swap API. At this point, the taker is making a soft commitment to fill the suggested orders, and understands they may be penalized by the Market Maker if they do not.

The firm quote resource is hosted at [`/swap/v1/quote`](/0x-swap-api/api-references/get-swap-v1-quote) and responds with a full 0x order, which can be submitted to an Ethereum node by the client. Therefore it is expected that the maker has reserved the maker assets required to settle the trade, leaving the order unlikely to revert.

In order to qualify for RFQ liquidity, the request to `/swap/v1/quote` must include the following parameter:

- non-null `takerAddress`

### Example Parameters of API Request

:::info

A `takerAddress` is required for RFQ liquidity. This is the address that will be filling the order.

RFQ liquidity is currently available on Mainnet, Polygon, and Arbitrum via Swap API. Find the API endpoint for different chains [here](/0x-swap-api/api-references/overview).

:::

```
https://api.0x.org/swap/v1/quote             // Request a firm quote
?sellToken=DAI                               // Sell DAI
&sellAmount=4000000000000000000000           // Sell amount: 4000 (18 decimal)
&buyToken=ETH                                // Buy ETH
&takerAddress=$USER_TAKER_ADDRESS            // Address that will make the trade
--header '0x-api-key: [API_KEY]'             // Replace with your own API key
```

### Example Response

```json
{
  "price": "0.002639",
  "guaranteedPrice": "0.002494",
  "to": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
  "data": "0x415565b0000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000000001c9c3800000000000000000000000000000000000000000000000000109c4d22ae1d17b00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000088000000000000000000000000000000000000000000000000000000000000009200000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000007c000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000066000000000000000000000000000000000000000000000000000000000000007800000000000000000000000000000000000000000000000000000000001c9c380000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000260000000000000000000000000bb004090d26845b672f17c6da4b7d162df3bfc5e00000000000000000000000022f9dcf4647084d6c31b2765f6910cd85c178c1800000000000000000000000010000000000000000000000000000000000000110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011944226822bc300000000000000000000000000000000000000000000000000000000001c9c38000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f2cf6f800000000000000000000000000000000000000000000000000000173c7a0255400000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000004c0000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000024f47261b0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000000000000000000000000000000000000036691c4f426eb8f42f150ebde43069a31cb080ad0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000109c4d22ae1d17c0000000000000000000000000000000000000000000000000000000001c9c38000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f2d11edcc0f46633a041deb777729139d9da803b03c6d5bced06be72837b82d8f61fc0f00000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000002a00000000000000000000000000000000000000000000000000000000000000420000000000000000000000000000000000000000000000000000000000000042000000000000000000000000000000000000000000000000000000000000000a4dc1600f3000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000036691c4f426eb8f42f150ebde43069a31cb080ad00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000020000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000024f47261b0000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000421c55cc3f8959570e47b36888d81728459ba9a179c288f6172b6fb9f8b957053a15224aaf00f3cf660caa222e27c088c0a3af92e162f9444de2ad53cc2f53396b9c02000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000104000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000040000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000003000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000000000000000869584cd00000000000000000000000010000000000000000000000000000000000000110000000000000000000000000000000000000000000000c2c389a8895f2cf5cf",
  "value": "9300000000000000",
  "gas": "540000",
  "estimatedGas": "450000",
  "from": "0x0A975d7B53F8DA11e64196d53Fb35532fea37E85",
  "gasPrice": "62000000000",
  "protocolFee": "9300000000000000",
  "minimumProtocolFee": "4340000000000000",
  "buyTokenAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  "sellTokenAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  "buyAmount": "79169383022378032",
  "sellAmount": "30000000",
  "estimatedGasTokenRefund": "0",
  "sources": [
    {
      "name": "0x",
      "proportion": "1"
    },
    {
      "name": "Uniswap",
      "proportion": "0"
    },
    {
      "name": "Uniswap_V2",
      "proportion": "0"
    },
    {
      "name": "Eth2Dai",
      "proportion": "0"
    },
    {
      "name": "Kyber",
      "proportion": "0"
    },
    {
      "name": "Curve",
      "proportion": "0"
    },
    {
      "name": "LiquidityProvider",
      "proportion": "0"
    },
    {
      "name": "MultiBridge",
      "proportion": "0"
    },
    {
      "name": "Balancer",
      "proportion": "0"
    }
  ],
  "orders": [
    {
      "chainId": 1,
      "exchangeAddress": "0x61935cbdd02287b511119ddb11aeb42f1593b7ef",
      "makerAddress": "0xbb004090D26845b672F17C6DA4b7D162df3bfC5e",
      "takerAddress": "0x22f9dcf4647084d6c31b2765f6910cd85c178c18",
      "feeRecipientAddress": "0x1000000000000000000000000000000000000011",
      "senderAddress": "0x0000000000000000000000000000000000000000",
      "makerAssetAmount": "79169383022378032",
      "takerAssetAmount": "30000000",
      "makerFee": "0",
      "takerFee": "0",
      "expirationTimeSeconds": "1596782328",
      "salt": "1596782028116",
      "makerAssetData": "0xf47261b0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "takerAssetData": "0xf47261b0000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "makerFeeAssetData": "0x",
      "takerFeeAssetData": "0x",
      "signature": "0x1c55cc3f8959570e47b36888d81728459ba9a179c288f6172b6fb9f8b957053a15224aaf00f3cf660caa222e27c088c0a3af92e162f9444de2ad53cc2f53396b9c02"
    },
    {
      "chainId": 1,
      "exchangeAddress": "0x61935cbdd02287b511119ddb11aeb42f1593b7ef",
      "makerAddress": "0x36691c4f426eb8f42f150ebde43069a31cb080ad",
      "takerAddress": "0x0000000000000000000000000000000000000000",
      "feeRecipientAddress": "0x1000000000000000000000000000000000000011",
      "senderAddress": "0x0000000000000000000000000000000000000000",
      "makerAssetAmount": "74807275769942396",
      "takerAssetAmount": "30000000",
      "makerFee": "0",
      "takerFee": "0",
      "expirationTimeSeconds": "1596789229",
      "salt": "92298809614346820881065452421346930521460845819311572298865378133256446278671",
      "makerAssetData": "0xdc1600f3000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000036691c4f426eb8f42f150ebde43069a31cb080ad00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000020000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "takerAssetData": "0xf47261b0000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "makerFeeAssetData": "0x",
      "takerFeeAssetData": "0x",
      "signature": "0x04"
    }
  ],
  "allowanceTarget": "0xdef1c0ded9bec7f1a1670819833240f027b25eff"
}
```

### Sample cURL Request

:::tip
The following example cURL request does not add a fee recipient parameter; however, this cURL request can be easily modified for your own monetization needs. Learn more about monetizing your app [here](/developer-resources/faqs-and-troubleshooting#monetizing-your-swap-integration).
:::

```bash
curl https://api.0x.org/swap/v1/quote?sellToken=USDC&sellAmount=30000000&buyToken=ETH&takerAddress=0x0A975d7B53F8DA11e64196d53Fb35532fea37E85&skipValidation=true --header '0x-api-key: [api-key]'
```

## 3. Submitting the Transaction

The firm quote returned by Swap API is an unsigned Ethereum transaction. In order to submit the transaction to the network, you just need to sign the transaction with your preferred web3 library (wagmi, web3.js, ethers.js) and submit it to the blockchain. Read more about how to sign and submit a transaction [here](/0x-swap-api/guides/swap-tokens-with-0x-swap-api#3-send-the-transaction-to-the-network).

Also, make sure a [token allowance](/0x-swap-api/advanced-topics/how-to-set-your-token-allowances) has been given for the `allowanceTarget` parameter returned by the `/swap/v1/quote` response.

## Advanced Options

### Quote Validation

Whenever a Swap API client specifies a `takerAddress` in their [`/quote`](/0x-swap-api/api-references/get-swap-v1-quote) request, the API will validate the quote before returning it to the client, avoiding a number of possible causes for transaction reverts. For more details, see "[How does `takerAddress` help with catching issues?](/developer-resources/faqs-and-troubleshooting#-troubleshooting)"

However, given that a `takerAddress` is required in order to obtain RFQ liquidity, and given that this requirement subverts the optionality of the quote validation feature, the implementation of RFQ introduced a new query parameter to the `/quote` endpoint: `skipValidation`. When this parameter is set to `true`, quote validation will be skipped. While validating even RFQ quotes is a best-practice recommended default, skipping validation can be useful in certain circumstances, such as when experimenting with a new maker integration deployment or [when the `takerAddress` refers to a smart contract](/0x-swap-api/guides/accessing-rfq-liquidity/how-to-integrate-rfq-liquidity#note-for-smart-contract-integrations).

### Note for Smart Contract Integrations

One particular circumstance in which it may be necessary to skip quote validation is that in which the `takerAddress` refers to a smart contract. In this case, the validation of the quote by the Swap API could fail due to a lack of asset balances in the contract's account. In order to avoid such a validation failure, simply avoid validation, by specifying `skipValidation=true` in the query string of your `/quote` request.

### Excluding Liquidity Sources

When requesting a quote from the Swap API, clients can choose to have the API [exclude specific liquidity sources](/0x-swap-api/api-references/get-swap-v1-quote#excluding-liquidity-sources).

At this time, RFQ liquidity is considered by the Swap API to be included within the `0x`/`Native` liquidity group. In the API's interface, it's referred to as `0x`, but in the underlying routing logic at the [protocol-level](https://github.com/0xProject/protocol/blob/4f32f3174f25858644eae4c3de59c3a6717a757c/packages/asset-swapper/src/utils/market_operation_utils/types.ts#L38) it's referred to as `Native`. Referencing as either works in the system.

```
# Example request using the excludedSources=0x flag

https://api.0x.org/swap/v1/quote             // Request a firm quote
?sellToken=DAI                               // Sell DAI
&sellAmount=4000000000000000000000           // Sell amount: 4000 (18 decimal)
&buyToken=ETH                                // Buy ETH
&takerAddress=0x3bA5De64E24Eea0E974393BeF8a047B58f961c08.   // Address that will make the trade
&skipValidation=true                // We suggest to set this parameter, if you do not want Swap API to simulate the trade
&feeRecipient=0x46B5BC959e8A754c0256FFF73bF34A52Ad5CdfA9.   // Specifies the fee recipient
&buyTokenPercentageFee=0.01        // Pays a 1% fee denominated in WETH to `feeRecipient`
&excludedSources=0x              // Excludes RFQ liquidity. excludedSources=Native also works
--header '0x-api-key: [API_KEY]'             // Replace with your own API key
```

Therefore, if a Swap API client intends to access RFQ liquidity, it's important that they not exclude the `0x` or the `Native` liquidity sources.

## Testing Your RFQ Integration (Recommended)

The best way to ensure that your RFQ integration is working end-to-end (at least, between you and Swap API) is to add the `includedSources=0x` flag. A `/swap` request with this parameter will:

- raise an error if `takerAddress` is not present
- return pricing for only RFQ liquidity
- raise an error if API key is invalid

```
https://api.0x.org/swap/v1/quote             // Request a firm quote
?sellToken=DAI                               // Sell DAI
&sellAmount=4000000000000000000000           // Sell amount: 4000 (18 decimal)
&buyToken=ETH                                // Buy ETH
&takerAddress=0x3bA5De64E24Eea0E974393BeF8a047B58f961c08.   // Address that will make the trade
&skipValidation=true                // We suggest to set this parameter, if you do not want Swap API to simulate the trade
&feeRecipient=0x46B5BC959e8A754c0256FFF73bF34A52Ad5CdfA9.   // Specifies the fee recipient
&buyTokenPercentageFee=0.01        // Pays a 1% fee denominated in WETH to `feeRecipient`
&includedSources=0x              // Ensures only RFQ liquidity is sourced
--header '0x-api-key: [API_KEY]'             // Replace with your own API key
```

## Code Examples

- [Next.js 0x Demo App (TypeScript)](https://github.com/0xProject/0x-nextjs-demo-app) - A Next.js app that shows best practices for implementing indicative pricing and firm quotes
- [Video](https://www.youtube.com/watch?v=P1ECx9zKQiU) walking through setting up indicative pricing and firm quotes
