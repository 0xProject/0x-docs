---
sidebar_label: Get started with Price API
sidebar_position: 1
description: Learn how to use the Price API to get real-time prices of any market pair
---

# Get started with Price API

_Learn how to send your first [Price API](/0x-price-api/) request._

## About Price API

Price API provides access to real-time market prices for any token pair across 4 million tokens covering [11 different chains](/0x-price-api/#supported-networks). It allows you to get accurate pricing data with high throughput to power high-frequency data requests.

:::info
Price API is in beta. Its recommended use is for checking prices, not be be used for trading purposes. For example, if you plan to use this in a trading workflow that is triggered by price changes of USDC, be aware this is subject to the risk that the stablecoin may depeg.
:::

## Get Price of WETH in terms of USDC

Use the [`/swap/v1/price`](/0x-price-api/api-references/get-swap-v1-price) endpoint to get the real-time price of the token pair.

In this example, we want the price of WETH in terms of USDC. To do this, we will use the stable coin USDC as the `sellToken`. We use the following params:

- `sellToken=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` - [USDC token address](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48)
- `buyToken=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2` - [WETH token address](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- `sellAmount=10000000` - 10 USDC (USDC has a base unit of 6)

#### Request

GET

```http
curl https://api.0x.org/swap/v1/price?sellToken=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&buyToken=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&sellAmount=10000000   --header '0x-api-key: <API_KEY>'
```

#### Response

```json
{
  "chainId": 1,
  "price": "0.000486899453497844",
  "grossPrice": "0.000487623574505985",
  "estimatedPriceImpact": "0.4359",
  "value": "0",
  "gasPrice": "49000000000",
  "gas": "151000",
  "estimatedGas": "151000",
  "protocolFee": "0",
  "minimumProtocolFee": "0",
  "buyTokenAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  "buyAmount": "4868994534978446",
  "grossBuyAmount": "4876235745059859",
  "sellTokenAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  "sellAmount": "10000000",
  "grossSellAmount": "10000000",
  "sources": [
    {
      "name": "0x",
      "proportion": "0"
    },
    {
      "name": "Uniswap",
      "proportion": "0"
    },
    {
      "name": "Uniswap_V2",
      "proportion": "1"
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
  "sellTokenToEthRate": "2041.82322",
  "buyTokenToEthRate": "1",
  "expectedSlippage": "-0.00003836285924298198283753149243586624",
  "auxiliaryChainData": {},
  "fees": {
    "zeroExFee": {
      "feeType": "volume",
      "feeToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "feeAmount": "7241210081413",
      "billingType": "on-chain"
    }
  }
}
```
