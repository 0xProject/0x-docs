---
sidebar_label: Accessing RFQ liquidity on Swap API
sidebar_position: 5
description: This guide discusses what RFQ liquidity is, how it works, and how your project can apply to access it
---

# Accessing RFQ liquidity on Swap API

:::info
This guide is for integrators/projects who would like to access 0x RFQ liquidity, via the Swap API.

If you represent a trading firm or professional market maker that would like to supply liquidity via the 0x RFQ system, please get in touch here: [0x RFQ Interest Form](https://docs.google.com/forms/d/e/1FAIpQLSen019JsWFZHluSgqSaPE_WFVc4YBtNS4EKB8ondJJ40Eh8jw/viewform?usp=sf_link)
:::

This page includes:

- [About the RFQ System](/0x-swap-api/guides/accessing-rfq-liquidity-on-0x-api#about-the-rfq-system)
- [How to Integrate the RFQ System](/0x-swap-api/guides/accessing-rfq-liquidity-on-0x-api#how-to-integrate-the-rfq-system)
- [Indicative Pricing](/0x-swap-api/guides/accessing-rfq-liquidity-on-0x-api#indicative-pricing)
- [Firm Quotes](/0x-swap-api/guides/accessing-rfq-liquidity-on-0x-api#firm-quotes)
- [Advanced Options](/0x-swap-api/guides/accessing-rfq-liquidity-on-0x-api#advanced-options)
- [Testing Your Integrations](/0x-swap-api/guides/accessing-rfq-liquidity-on-0x-api#testing-your-rfq-integration-recommended)
- [Code Examples](/0x-swap-api/guides/accessing-rfq-liquidity-on-0x-api#code-examples)

## About the RFQ System

_RFQ liquidity is currently available on Mainnet & Polygon._

### An Exclusive Source of Liquidity

In its role as a DEX aggregator, the Swap API integrates both on- and off-chain liquidity. On-chain liquidity is sourced by sampling smart contract liquidity pools, such as Uniswap and Curve. Off-chain liquidity is sourced from professional market makers via the 0x Request-for-Quote (“RFQ”) System.

If integrators request a standard quote from the Swap API, part or all of their quote may be sourced via the **RFQ** system. In this system, the Swap API aggregates quotes from professional market makers, alongside quotes from AMMs. If the market-maker quotes are more competitive than AMM quotes, they may be included in the final price shown to the end-user. The end-user’s liquidity is ultimately provided by a combination of AMMs and professional market makers. _Everything happens under-the-hood!_

![rfq diagram](/img/0x-swap-api/rfq-diagram.png)

## Parties in the System

### Trusted Takers

RFQ orders contain a [`takerAddress` query parameter](/developer-resources/faqs-and-troubleshooting.md#how-does-takeraddress-help-with-catching-issues). When an order containing this parameter gets hashed and signed by two counterparties (the [taker](/developer-resources/glossary#taker) and the [maker](/developer-resources/glossary#maker)), the signed order is exclusive to these two counterparties.

### Dedicated Makers

In addition to the Swap API configuration identifying trusted takers, it also contains a list of specific market makers that participate in the RFQ system. Each maker is identified by an HTTP endpoint URL, and each endpoint has an associated list of asset pairs for which that endpoint will provide quotes. For the instance at `api.0x.org`, the 0x team is maintaining a list of trusted market makers.

## How to Integrate the RFQ System

### High-Level View

Requesting liquidity from Swap API happens in 3 steps:

1. **Step 1:** Integrator client performs price exploration via indicative quote `/swap/v1/price`
2. **Step 2:** When the Integrator client is ready to actually perform a fill, it will request a firm quote from Swap API `/swap/v1/quote`
3. **Step 3:** The Integrator client can take the Ethereum transaction returned from the firm quote and submit it to the blockchain
   1. Unless the customer is paying in ETH, they will need to set allowances to the `allowanceTarget` key that is present in the `/swap/v1/quote` response.

:::info
⏰ We assume the time difference between steps 1 and 2 to be minimal. We also recommend setting a max amount of time between steps 2 and 3; otherwise, if the client sits on the RFQ firm quote for too long, the probability of the transaction reverting increases. 30 seconds is usually a reasonable time before re-asking for a firm quote.
:::

## Indicative Pricing

Indicative pricing is used for takers who are querying the prices they could receive. The Swap API will respond to an indicative price with the expected rate of trade between the asset pair specified.

The indicative pricing resource is hosted at [`/swap/v1/price`](../api-references/get-swap-v1-price.md) and responds with pricing information, but that response does not contain a full 0x order, so it does not constitute a legitimate transaction that can be submitted to the Ethereum network. This resource can be used by price feeds and other applications that do not intend to submit an actual transaction.

### Example Parameters of API Request

:::info
An API key should always be specified when requesting all possible sources of liquidity. API keys are specified via a header parameter called `0x-api-key`
<br></br>

A `takerAddress` needs to always be present
:::

```
https://api.0x.org/swap/v1/price             // Request an indicative quote
?sellToken=DAI                               // Sell DAI
&sellAmount=4000000000000000000000           // Sell amount: 4000
&buyToken=WETH                               // Buy WETH
&gasPrice=50000000000                        // Optionally, specify the gas price
&takerAddress=$USER_TAKER_ADDRESS            // Address that will make the trade
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
curl --location --request GET 'https://api.0x.org/swap/v1/price?sellToken=USDC&sellAmount=30000000&buyToken=ETH&takerAddress=0x0A975d7B53F8DA11e64196d53Fb35532fea37E85' \
--header '0x-api-key: [api-key]'
```

## Firm Quotes

When a taker is ready to actually perform a fill, they will request a firm quote from Swap API. At this point, the taker is making a soft commitment to fill the suggested orders, and understands they may be penalized by the Market Maker if they do not.

The firm quote resource is hosted at [`/swap/v1/quote`](../api-references/get-swap-v1-quote.md) and responds with a full 0x order, which can be submitted to an Ethereum node by the client. Therefore it is expected that the maker has reserved the maker assets required to settle the trade, leaving the order unlikely to revert.

In order to qualify for RFQ liquidity, the request to `/swap/v1/quote` must include the query parameter `intentOnFilling=true` (in addition to the aforementioned `0x-api-key` and non-null `takerAddress`).

### Example Parameters of API Request

:::info
An API key should always be specified when requesting RFQT liquidity. This RFQT liquidity should be passed in as a header parameter called `0x-api-key`
<br></br>

A `takerAddress` needs to always be present.
<br></br>

`intentOnFilling` needs to always be set to true.
:::

```
https://api.0x.org/swap/v1/quote             // Request a firm quote
?sellToken=DAI                               // Sell DAI
&sellAmount=4000000000000000000000           // Sell amount: 4000 (18 decimal)
&buyToken=ETH                                // Buy ETH
&takerAddress=0x3bA5De64E24Eea0E974393BeF8a047B58f961c08.   // Address that will make the trade
&intentOnFilling=true                // Confirms to our MM that you intend to fill this order
&skipValidation=true                // We suggest to set this parameter, if you do not want Swap API to simulate the trade
&feeRecipient=0x46B5BC959e8A754c0256FFF73bF34A52Ad5CdfA9.   // Specifies the fee recipient
&buyTokenPercentageFee=0.01        // pays a 1% fee denominated in WETH to `feeRecipient`
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
The following example cURL request does not add a fee recipient parameter; however, this cURL request can be easily modified for your own monetization needs.
:::

```bash
curl --location --request GET 'https://api.0x.org/swap/v1/quote?sellToken=USDC&sellAmount=30000000&buyToken=ETH&takerAddress=0x0A975d7B53F8DA11e64196d53Fb35532fea37E85&intentOnFilling=true&skipValidation=true' \
--header '0x-api-key: [api-key]'
```

## Advanced Options

### Quote Validation

Whenever a Swap API client specifies a `takerAddress` in their [`/quote`](../api-references/get-swap-v1-quote.md) request, the API will validate the quote before returning it to the client, avoiding a number of possible causes for transaction reverts. (For more details, see "[How does `takerAddress` help with catching issues?](/developer-resources/faqs-and-troubleshooting#-troubleshooting)")

However, given that a `takerAddress` is required in order to obtain RFQ liquidity, and given that this requirement subverts the optionality of the quote validation feature, the implementation of RFQ introduced a new query parameter to the `/quote` resource: `skipValidation`. When this parameter is set to `true`, quote validation will be skipped. While validating even RFQ quotes is a best-practice recommended default, skipping validation can be useful in certain circumstances, such as when experimenting with a new maker integration deployment.

### Note for Smart Contract Integrations

One particular circumstance in which it may be necessary to skip quote validation is that in which the `takerAddress` refers to a smart contract. In this case, the validation of the quote by the 0x API could fail due to a lack of asset balances in the contract's account. In order to avoid such a validation failure, simply avoid validation, by specifying `skipValidation=true` in the query string of your `/quote` request.

### Excluding Liquidity Sources

When requesting a quote from the Swap API, clients can choose to have the API exclude specific liquidity sources. (For more details, see [the API specification](../api-references/get-swap-v1-quote.md#excluding-liquidity-sources).)

At this time, RFQ liquidity is considered by the Swap API to be included within the `0x`/`Native` liquidity group. (In the API's interface, it's referred to as `0x`, but in the underlying routing logic it's referred to as `Native`.)

Therefore, if a Swap API client intends to access RFQ liquidity, it's important that they not exclude the `0x` liquidity source.

## Testing Your RFQ Integration (Recommended)

The best way to ensure that your RFQ integration is working end-to-end (at least, between you and Swap API) is to add the `includedSources=RFQT` flag. A `/swap` request with this parameter will:

- raise an error if `takerAddress` is not present
- return pricing for only RFQT liquidity
- raise an error if API key is invalid

```
# Example request using the includedSources=RFQT flag

https://api.0x.org/swap/v1/quote             // Request a firm quote
?sellToken=DAI                               // Sell DAI
&sellAmount=4000000000000000000000           // Sell amount: 4000 (18 decimal)
&buyToken=ETH                                // Buy ETH
&takerAddress=0x3bA5De64E24Eea0E974393BeF8a047B58f961c08.   // Address that will make the trade
&intentOnFilling=true                // Confirms to our MM that you intend to fill this order
&skipValidation=true                // We suggest to set this parameter, if you do not want Swap API to simulate the trade
&feeRecipient=0x46B5BC959e8A754c0256FFF73bF34A52Ad5CdfA9.   // Specifies the fee recipient
&buyTokenPercentageFee=0.01        // pays a 1% fee denominated in WETH to `feeRecipient`
&includedSources=RFQT              //
```

## Code Examples

Checkout our [Guides](/market-makers/guides/generating-0x-order-hashes) for RFQT and RFQM Market Makers on how to create, hash, sign, fill, get state, and cancel 0x V4 RFQ orders

- [Generating 0x Order Hashes](../../market-makers/guides/generating-0x-order-hashes.md)
- [Signing 0x Orders](../../market-makers/guides/signing-0x-orders.md "mention")
- [Python Code Examples of RFQ Order](../../market-makers/guides/0x-v4-rfq-orders-code-examples-with-python.md "mention")
- [Fill ERC20 RFQ order](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/fill_erc20_rfq_order.ts)
- [Fill ERC20 RFQ order with maker order signer](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/fill_erc20_rfq_order_with_maker_order_signer.ts)
- [Subscribe to RFQ order fill events](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/fill_erc20_limit_order.ts)
- [Execute Metatransaction](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/execute_metatransaction_fill_rfq_order.ts) to fill RFQ order&#x20;
- [Fill ERC20 OTC order](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/fill_erc20_otc_order.ts)
- [(Advanced) Fill an aggregated quote via TransformERC20](https://github.com/0xProject/0x-starter-project/blob/master/src/scenarios/transform_erc20.ts)
