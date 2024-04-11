---
sidebar_label: GET /swap/v1/price
sidebar_position: 2
description: Learn how to use GET /swap/v1/price to get real-time DEX prices for tokens pairs
---

# GET /swap/v1/price

`/swap/v1/price` can be used to acquire real-time prices of **any market pair**, which you specify via the `sellToken` and `buyToken` parameters.

**If you’re trying to fetch the equivalent USD price of a token**:

- We recommend using a stablecoin as `sellToken` with an arbitrarily low amount. For example, set `sellToken = 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` for USDC on Ethereum and `sellAmount = 10000000` for 10 USDC.
- The price returned is in `buyToken` terms, (`sellToken`/`buyToken` = `USDC`/`WETH` = `0.000486899453497844`).
- To obtain the price in USD terms, simply take the inverse (`buyToken`/`sellToken` = `WETH`/`USDC` = `1/0.000486899453497844` = `2053`).
- See the [example query](/0x-price-api/api-references/get-swap-v1-price#example).
- **Beware:** This is subject to the risk that the stablecoin may depeg. Also, do not explicity set `buyAmount` in the request; it will not return back the desired result.

:::info
Price API is in beta. Its recommended use is for checking prices, not be be used for trading purposes. For example, if you plan to use this in a trading workflow that is triggered by price changes of USDC, be aware this is subject to the risk that the stablecoin may depeg.
:::

## Request

| **Query Param**   | **Description**                                                                                                                                                                                                                                                                                                                                                                                                            | **Example**                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `sellToken`       | (Required) The ERC20 token address of the token you want to receive. If you’re trying to fetch the equivalent USD price of a token, specify a stablecoin using this parameter. We recommend using USDC.                                                                                                                                                                                                                    | sellToken=0x6b175474e89094c44da98b954eedeac495271d0f |
| `buyToken`        | (Required) The ERC20 token address of the token you want to receive. If you’re trying to fetch the equivalent USD price of a token, specify that token using this parameter.                                                                                                                                                                                                                                               | buyToken=0x6b175474e89094c44da98b954eedeac495271d0f  |
| `sellAmount`      | (Required) The amount of `sellToken` (in `sellToken` base units). To get the real-time price of the `buyToken`, set the `sellAmount` to a low amount of the stablecoin that you set as the `sellToken` (e.g. $10 USDC) <br/><br/> Example: For $10 of USDC, set `sellAmount=10000000` Otherwise, if you'd like to know the real-time price according to a specific liquidity depth, please specify that token amount here. | sellAmount=10000000                                  |
| `gasPrice`        | (Optional, defaults to ethgasstation "fast") The target gas price (in wei) for the swap transaction. If the price is too low to achieve the quote, an error will be returned.                                                                                                                                                                                                                                              | gasPrice=1000000                                     |
| `excludedSources` | (Optional) When used, only the specified [liquidity sources](/0x-price-api/api-references/get-swap-v1-sources) (`Uniswap`, `SushiSwap`, `0x`, `Curve`, etc) will be included in the provided quote.                                                                                                                                                                                                                        | excludedSources=Uniswap,SushiSwap,Curve              |

## Response

Identical to the response schema for `/swap/v1/quote`, with the execption that the `orders` property, `guaranteedPrice`, `to` and `data` fields will always be undefined

| Field                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `price`                | If `buyAmount` was specified in the request it provides the price of `buyToken` in `sellToken` and vice versa. This price does not include the `slippage` provided in the request above, and therefore represents the best possible price.                                                                                                                                                                                                                                                                         |
| `grossPrice`           | Same as`price` but with fees removed in the price calculation. This is the price as if no fee is charged.                                                                                                                                                                                                                                                                                                                                                                                                          |
| `estimatedPriceImpact` | Returns the estimated change in the price of the specified asset that would be caused by the executed swap due to [price impact](/0x-swap-api/advanced-topics/price-impact-protection). <br/><br/> **Note:** If we fail to estimate price change we will return `null`. <br/><br/>**Read more** about price impact protection and how to set it up [here](/0x-swap-api/advanced-topics/price-impact-protection) .                                                                                                  |
| `value`                | The amount of ether (in wei) that should be sent with the transaction. (Assuming protocolFee is paid in ether).                                                                                                                                                                                                                                                                                                                                                                                                    |
| `gasPrice`             | The gas price (in wei) that should be used to send the transaction. The transaction needs to be sent with this `gasPrice` or lower for the transaction to be successful.                                                                                                                                                                                                                                                                                                                                           |
| `gas`                  | The estimated gas limit that should be used to send the transaction to guarantee settlement.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `estimatedGas`         | The estimate for the amount of gas that will actually be used in the transaction. Always less than `gas`.                                                                                                                                                                                                                                                                                                                                                                                                          |
| `protocolFee`          | The maximum amount of ether that will be paid towards the protocol fee (in wei), and what is used to compute the `value` field of the transaction. Note, as of [ZEIP-91](https://governance.0xprotocol.org/vote/zeip-91), protocol fees have been removed for all order types.                                                                                                                                                                                                                                                                                                                                                               |
| `minimumProtocolFee`   | The minimum amount of ether that will be paid towards the protocol fee (in wei) during the transaction. Note, as of [ZEIP-91](https://governance.0xprotocol.org/vote/zeip-91), protocol fees have been removed for all order types.                                                                                                                                                                                                                                                                                                                                                                                                            |
| `buyAmount`            | The amount of `buyToken` (in `buyToken` units) that would be bought in this swap. Certain on-chain sources do not allow specifying `buyAmount`, when using `buyAmount` these sources are excluded.                                                                                                                                                                                                                                                                                                                 |
| `grossBuyAmount`       | Similar to `buyAmount` but with fees removed. This is the `buyAmount` as if no fee is charged.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `sellAmount`           | The amount of `sellToken` (in `sellToken` units) that would be sold in this swap. Specifying `sellAmount` is the recommended way to interact with 0x API as it covers all on-chain sources.                                                                                                                                                                                                                                                                                                                        |
| `grossSellAmount`      | Similar to `sellAmount` but with fees removed. This is the `sellAmount` as if no fee is charged. **Note:** Currently, this will be the same as `sellAmount` as fees can only be configured to occur on the `buyToken`.                                                                                                                                                                                                                                                                                             |
| `sources`              | The percentage distribution of `buyAmount` or `sellAmount` split between each liquidity source. Ex: `[{ name: '0x', proportion: "0.8" }, { name: 'Kyber', proportion: "0.2"}, ...]`                                                                                                                                                                                                                                                                                                                                |
| `buyTokenAddress`      | The ERC20 token address of the token you want to receive in quote.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `sellTokenAddress`     | The ERC20 token address of the token you want to sell with quote.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `allowanceTarget`      | The target contract address for which the user needs to have an allowance in order to be able to complete the swap. Typically this is the [0x Exchange Proxy contract address](https://0x.org/docs/introduction/0x-cheat-sheet#exchange-proxy-addresses) for the specified chain. For swaps with "ETH" as `sellToken`, wrapping "ETH" to "WETH" or unwrapping "WETH" to "ETH" no allowance is needed, a null address of `0x0000000000000000000000000000000000000000` is then returned instead.                                                                                                                                                                                  |
| `sellTokenToEthRate`   | The rate between ETH and `sellToken`                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `buyTokenToEthRate`    | The rate between ETH and `buyToken`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `expectedSlippage`     | This is the expected slippage used in routing calculations for the price returned. It is the value of slippage that we estimate that the selected route will have.                                                                                                                                                                                                                                                                                                                                                 |
| `fees`                 | Fees that would be charged. It can contain `zeroExFee`. See details about this fee type below.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `zeroExFee`            | Related to `fees` param above. <br></br><br></br>Fee that 0x charges:<br></br>&ensp;&ensp;- `feeType`: `volume` which means 0x would charge a certain percentage of the trade. <br></br>&ensp;&ensp;- `feeToken`: The ERC20 token address to charge fee. <br></br>&ensp;&ensp;- `feeAmount`: The amount of `feeToken` to be charged as the 0x fee. <br></br>&ensp;&ensp;- `billingType`: The method that 0x fee is transferred. It can currently only be `on-chain` which means the fee would be charged on-chain. |

## Example

## Get a token price in USD terms via stablecoins

Use the [`/swap/v1/price`](/0x-price-api/api-references/get-swap-v1-price) endpoint to get the real-time price of the token pair.

In this example, we want the price of WETH in terms of USDC. To do this, we will use the stable coin USDC as the `sellToken`. We use the following params:

- `sellToken=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` - [USDC token address](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48)
- `buyToken=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2` - [WETH token address](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- `sellAmount=10000000` - 10 USDC (USDC has a base unit of 6)

:::important
The price returned is in `buyToken` terms, (`sellToken`/`buyToken` = `USDC`/`WETH` = `0.000486899453497844`).

To obtain the price in USD terms, simply take the inverse (`WETH`/`USDC` = `1/0.000486899453497844` = `2053`).

Do not explicity set `buyAmount` in the request; it will not return back the desired result.
:::

**Request**

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
