---
sidebar_label: How to access RFQ liquidity
sidebar_position: 2
description: This guide covers the 3 steps to access RFQ liquidity in your application.
---

# How to access RFQ Liquidity

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
https://api.0x.org/swap/v1/price                      // Request an indicative price
?sellToken=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 // Sell USDC
&sellAmount=30000000                                  // Sell amount 30 USDC (6 decimals)
&buyToken=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE  // Buy ETH
&takerAddress=$USER_TAKER_ADDRESS                     // Address that will make the trade
--header '0x-api-key: [API_KEY]'                      // Replace with your own API key
```

### Sample cURL Request

```bash
curl https://api.0x.org/swap/v1/price?sellToken=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&sellAmount=30000000&buyToken=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&takerAddress=0x0A975d7B53F8DA11e64196d53Fb35532fea37E85 --header '0x-api-key: [api-key]'
```

### Example Response

The response to an indicative quote will include a price and a buy/sell amount in base unit amount.

```json
{
  "chainId": 1,
  "price": "1.468894050625440353",
  "grossPrice": "1.47107860234993",
  "estimatedPriceImpact": "6.805",
  "value": "0",
  "gasPrice": "31500000000",
  "gas": "116000",
  "estimatedGas": "116000",
  "protocolFee": "0",
  "minimumProtocolFee": "0",
  "buyTokenAddress": "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
  "buyAmount": "44066821518763210619",
  "grossBuyAmount": "44132358070497900000",
  "sellTokenAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  "sellAmount": "30000000",
  "grossSellAmount": "30000000",
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
      "name": "Curve",
      "proportion": "0"
    },
    {
      "name": "Balancer",
      "proportion": "0"
    },
    {
      "name": "Balancer_V2",
      "proportion": "0"
    },
    {
      "name": "BancorV3",
      "proportion": "0"
    },
    {
      "name": "SushiSwap",
      "proportion": "0"
    },
    {
      "name": "DODO",
      "proportion": "0"
    },
    {
      "name": "DODO_V2",
      "proportion": "0"
    },
    {
      "name": "CryptoCom",
      "proportion": "0"
    },
    {
      "name": "Lido",
      "proportion": "0"
    },
    {
      "name": "MakerPsm",
      "proportion": "0"
    },
    {
      "name": "KyberDMM",
      "proportion": "0"
    },
    {
      "name": "Uniswap_V3",
      "proportion": "0"
    },
    {
      "name": "Curve_V2",
      "proportion": "0"
    },
    {
      "name": "ShibaSwap",
      "proportion": "0"
    },
    {
      "name": "Synapse",
      "proportion": "0"
    },
    {
      "name": "Synthetix",
      "proportion": "0"
    },
    {
      "name": "Aave_V2",
      "proportion": "0"
    },
    {
      "name": "Compound",
      "proportion": "0"
    },
    {
      "name": "KyberElastic",
      "proportion": "0"
    },
    {
      "name": "Maverick_V1",
      "proportion": "0"
    },
    {
      "name": "PancakeSwap_V3",
      "proportion": "0"
    }
  ],
  "allowanceTarget": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
  "sellTokenToEthRate": "1808.68027",
  "buyTokenToEthRate": "2854.99025193368642365",
  "expectedSlippage": "0",
  "auxiliaryChainData": {},
  "fees": {
    "zeroExFee": {
      "feeType": "volume",
      "feeToken": "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
      "feeAmount": "65536551734689381",
      "billingType": "on-chain"
    }
  }
}
```

## 2. Firm Quotes

When a taker is ready to actually perform a fill, they will request a firm quote from Swap API. At this point, the taker is making a soft commitment to fill the suggested orders, and understands they may be penalized by the Market Maker if they do not.

The firm quote resource is hosted at [`/swap/v1/quote`](/0x-swap-api/api-references/get-swap-v1-quote) and responds with a full 0x order, which can be submitted to an Ethereum node by the client. Therefore it is expected that the maker has reserved the maker assets required to settle the trade, leaving the order unlikely to revert.

In order to qualify for RFQ liquidity, the request to `/swap/v1/quote` must include the following parameter:

- non-null `takerAddress`

:::tip
**Best Practices:** Note that RFQ quotes from Market Makers are only valid for a short period of time, for example roughly 60s on mainnet. Therefore, we highly recommend adding a mechanism that refreshes the quotes, approximately every 30s to make sure RFQ orders don’t expire. See [Matcha.xyz](https://matcha.xyz/) for an example of this in action.
:::

```mdx-code-block
import QuoteExpiration from '/static/img/0x-swap-api/matcha-quote-expiration.png';

<center>
    <img src={QuoteExpiration} width="50%"/>
</center>
```

### Example Parameters of API Request

:::info

A `takerAddress` is required for RFQ liquidity. This is the address that will be filling the order.

RFQ liquidity is currently available on Mainnet, Polygon, and Arbitrum via Swap API. Find the API endpoint for different chains [here](/0x-swap-api/api-references/overview).

:::

```
https://api.0x.org/swap/v1/quote                      // Request a firm quote
?sellToken=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE // Sell ETH
&sellAmount=100000000000000000                        // Sell amount 0.1 ETH (18 decimals)
&buyToken=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48  // Buy USDC
&takerAddress=$USER_TAKER_ADDRESS                     // Address that will make the trade
--header '0x-api-key: [API_KEY]'                      // Replace with your own API key
```

### Sample cURL Request

:::tip
The following example cURL request does not add a fee recipient parameter; however, this cURL request can be easily modified for your own monetization needs. Learn more about monetizing your app [here](/developer-resources/faqs-and-troubleshooting#monetizing-your-swap-integration).
:::

```bash
curl https://api.0x.org/swap/v1/quote?sellToken=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&sellAmount=100000000000000000&buyToken=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&takerAddress=0x0A975d7B53F8DA11e64196d53Fb35532fea37E85 --header '0x-api-key: [api-key]'
```

### Example Response

```json
{
  "chainId": 1,
  "price": "1806.95928",
  "guaranteedPrice": "1788.86281",
  "estimatedPriceImpact": "0.0001",
  "to": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
  "data": "0x415565b0000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000000000000000000000000000016345785d8a0000000000000000000000000000000000000000000000000000000000000aa9968900000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000004e000000000000000000000000000000000000000000000000000000000000005e0000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000040000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000016345785d8a000000000000000000000000000000000000000000000000000000000000000000210000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000036000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000320000000000000000000000000000000000000000000000000000000000000032000000000000000000000000000000000000000000000000000000000000002e0000000000000000000000000000000000000000000000000016345785d8a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000012556e6973776170563300000000000000000000000000000000000000000000000000000000000000016345785d8a0000000000000000000000000000000000000000000000000000000000000aadb045000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000e592427a0aece92de3edee1f18e0157c0586156400000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002bc02aaa39b223fe8d0a0e5c4f27ead9083c756cc20001f4a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001b000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000000000000000000000000000000000000000419bc000000000000000000000000ad01c20d5886137e056775af56915de824c8fce5000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000000000000000869584cd000000000000000000000000100000000000000000000000000000000000001100000000000000000000000000000000e48d01911fbcbf1903772de9b84f6632",
  "value": "100000000000000000",
  "gas": "160254",
  "estimatedGas": "160254",
  "gasPrice": "26500000000",
  "protocolFee": "0",
  "minimumProtocolFee": "0",
  "buyTokenAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  "sellTokenAddress": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  "buyAmount": "180695928",
  "sellAmount": "100000000000000000",
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
      "name": "Curve",
      "proportion": "0"
    },
    {
      "name": "Balancer",
      "proportion": "0"
    },
    {
      "name": "Balancer_V2",
      "proportion": "0"
    },
    {
      "name": "BancorV3",
      "proportion": "0"
    },
    {
      "name": "SushiSwap",
      "proportion": "0"
    },
    {
      "name": "DODO",
      "proportion": "0"
    },
    {
      "name": "DODO_V2",
      "proportion": "0"
    },
    {
      "name": "CryptoCom",
      "proportion": "0"
    },
    {
      "name": "Lido",
      "proportion": "0"
    },
    {
      "name": "MakerPsm",
      "proportion": "0"
    },
    {
      "name": "KyberDMM",
      "proportion": "0"
    },
    {
      "name": "Uniswap_V3",
      "proportion": "0"
    },
    {
      "name": "Curve_V2",
      "proportion": "0"
    },
    {
      "name": "ShibaSwap",
      "proportion": "0"
    },
    {
      "name": "Synapse",
      "proportion": "0"
    },
    {
      "name": "Synthetix",
      "proportion": "0"
    },
    {
      "name": "Aave_V2",
      "proportion": "0"
    },
    {
      "name": "Compound",
      "proportion": "0"
    },
    {
      "name": "KyberElastic",
      "proportion": "0"
    },
    {
      "name": "Maverick_V1",
      "proportion": "0"
    },
    {
      "name": "PancakeSwap_V3",
      "proportion": "0"
    }
  ],
  "orders": [
    {
      "type": 0,
      "source": "Uniswap_V3",
      "makerToken": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "takerToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "makerAmount": "180964660",
      "takerAmount": "100000000000000000",
      "fillData": {
        "router": "0xe592427a0aece92de3edee1f18e0157c05861564",
        "path": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc20001f4a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "gasUsed": 9627,
        "routerVersion": 1
      },
      "fill": {
        "input": "100000000000000000",
        "output": "180964660",
        "adjustedOutput": "175245854",
        "gas": 119252
      }
    }
  ],
  "allowanceTarget": "0x0000000000000000000000000000000000000000",
  "decodedUniqueId": "0xe48d01911fbcbf1903772de9b84f6632",
  "sellTokenToEthRate": "1",
  "buyTokenToEthRate": "1809.64679",
  "fees": {
    "zeroExFee": {
      "feeType": "volume",
      "feeToken": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "feeAmount": "268732",
      "billingType": "on-chain"
    }
  },
  "grossPrice": "1809.6466",
  "grossBuyAmount": "180964660",
  "grossSellAmount": "100000000000000000",
  "auxiliaryChainData": {},
  "expectedSlippage": "-0.0000731856321892383565"
}
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
&skipValidation=true                // We suggest to set this parameter if you do not want Swap API to simulate the trade during testing
&feeRecipient=0x46B5BC959e8A754c0256FFF73bF34A52Ad5CdfA9.   // Specifies the fee recipient
&buyTokenPercentageFee=0.01        // Pays a 1% fee denominated in WETH to `feeRecipient`
&includedSources=0x              // Ensures only RFQ liquidity is sourced
--header '0x-api-key: [API_KEY]'             // Replace with your own API key
```

## Code Examples

- [Next.js 0x Demo App (TypeScript)](https://github.com/0xProject/0x-nextjs-demo-app) - A Next.js app that shows best practices for implementing indicative pricing and firm quotes
- [Video](https://www.youtube.com/watch?v=P1ECx9zKQiU) walking through setting up indicative pricing and firm quotes
