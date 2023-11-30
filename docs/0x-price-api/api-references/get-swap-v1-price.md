---
sidebar_label: GET /swap/v1/price
sidebar_position: 2
description: Learn how to use GET /swap/v1/price to get real-time DEX prices for tokens pairs
---

# GET /swap/v1/price

`/swap/v1/price` can be used to acquire real-time DEX prices for token pairs

### Request

| **Query Param**   | **Description**                                                                                                                                                                                                                                                                                                                                                 | **Example**                                          |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `sellToken`       | The ERC20 token address of the token you want to receive. It is recommended to always use the token address instead of token symbols (e.g. ETH ) which may not be recognized by the API.                                                                                                                                                                        | sellToken=0x6b175474e89094c44da98b954eedeac495271d0f |
| `buyToken`        | The ERC20 token address of the token you want to receive. It is recommended to always use the token address instead of token symbols (e.g. ETH ) which may not be recognized by the API.                                                                                                                                                                        | buyToken=0x6b175474e89094c44da98b954eedeac495271d0f  |
| `sellAmount`      | (Optional) The amount of `sellToken` (in `sellToken` base units) you want to send. Either `sellAmount` or `buyAmount` must be present in a request. Specifying `sellAmount` is the recommended way to interact with 0x API as it covers all on-chain sources.                                                                                                   | sellAmount=100000000000                              |
| `buyAmount`       | (Optional) The amount of `buyToken`(in `buyToken` base units) you want to receive. Either `sellAmount` or `buyAmount` must be present in a request. Note that some on-chain sources do not allow specifying `buyAmount`, when using `buyAmount` these sources are excluded.                                                                                     | buyAmount=100000000000                               |
| `gasPrice`        | (Optional, defaults to ethgasstation "fast") The target gas price (in wei) for the swap transaction. If the price is too low to achieve the quote, an error will be returned.                                                                                                                                                                                   | gasPrice=1000000                                     |
| `excludedSources` | (Optional) When used, only the specified [liquidity sources](/0x-price-api/api-references/get-swap-v1-sources) (`Uniswap`, `SushiSwap`, `0x`, `Curve`, etc) will be included in the provided quote. <br/><br/> This parameter cannot be combined with `includedSources`.                                                                                        | excludedSources=Uniswap,SushiSwap,Curve              |
| `includedSources` | (Optional) Typically used to filter for RFQ liquidity without any other DEX orders which this is useful for [testing your RFQ integration](/0x-swap-api/guides/accessing-rfq-liquidity/how-to-integrate-rfq-liquidity#testing-your-rfq-integration-recommended). To do so, set it to `0x`. <br/><br/> This parameter cannot be combined with `excludedSources`. | includedSources=0x                                   |

### Response

Identical to the response schema for `/swap/v1/quote`, with the execption that the `orders` property, `guaranteedPrice`, `to` and `data` fields will always be undefined

| Field                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `price`                | If `buyAmount` was specified in the request it provides the price of `buyToken` in `sellToken` and vice versa. This price does not include the `slippage` provided in the request above, and therefore represents the best possible price.                                                                                                                                                                                                                                                                         |
| `grossPrice`           | Similar to `price` but with fees removed in the price calculation. This is the price as if no fee is charged.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `estimatedPriceImpact` | Returns the estimated change in the price of the specified asset that would be caused by the executed swap due to [price impact](/0x-swap-api/advanced-topics/price-impact-protection). <br/><br/> **Note:** If we fail to estimate price change we will return `null`. <br/><br/>**Read more** about price impact protection and how to set it up [here](/0x-swap-api/advanced-topics/price-impact-protection) .                                                                                                  |
| `value`                | The amount of ether (in wei) that should be sent with the transaction. (Assuming protocolFee is paid in ether).                                                                                                                                                                                                                                                                                                                                                                                                    |
| `gasPrice`             | The gas price (in wei) that should be used to send the transaction. The transaction needs to be sent with this `gasPrice` or lower for the transaction to be successful.                                                                                                                                                                                                                                                                                                                                           |
| `gas`                  | The estimated gas limit that should be used to send the transaction to guarantee settlement.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `estimatedGas`         | The estimate for the amount of gas that will actually be used in the transaction. Always less than `gas`.                                                                                                                                                                                                                                                                                                                                                                                                          |
| `protocolFee`          | The maximum amount of ether that will be paid towards the protocol fee (in wei), and what is used to compute the `value` field of the transaction.                                                                                                                                                                                                                                                                                                                                                                 |
| `minimumProtocolFee`   | The minimum amount of ether that will be paid towards the protocol fee (in wei) during the transaction.                                                                                                                                                                                                                                                                                                                                                                                                            |
| `buyAmount`            | The amount of `buyToken` (in `buyToken` units) that would be bought in this swap. Certain on-chain sources do not allow specifying `buyAmount`, when using `buyAmount` these sources are excluded.                                                                                                                                                                                                                                                                                                                 |
| `grossBuyAmount`       | Similar to `buyAmount` but with fees removed. This is the `buyAmount` as if no fee is charged.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `sellAmount`           | The amount of `sellToken` (in `sellToken` units) that would be sold in this swap. Specifying `sellAmount` is the recommended way to interact with 0x API as it covers all on-chain sources.                                                                                                                                                                                                                                                                                                                        |
| `grossSellAmount`      | Similar to `sellAmount` but with fees removed. This is the `sellAmount` as if no fee is charged. **Note:** Currently, this will be the same as `sellAmount` as fees can only be configured to occur on the `buyToken`.                                                                                                                                                                                                                                                                                             |
| `sources`              | The percentage distribution of `buyAmount` or `sellAmount` split between each liquidity source. Ex: `[{ name: '0x', proportion: "0.8" }, { name: 'Kyber', proportion: "0.2"}, ...]`                                                                                                                                                                                                                                                                                                                                |
| `buyTokenAddress`      | The ERC20 token address of the token you want to receive in quote.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `sellTokenAddress`     | The ERC20 token address of the token you want to sell with quote.                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `allowanceTarget`      | The target contract address for which the user needs to have an allowance in order to be able to complete the swap. For swaps with "ETH" as `sellToken`, wrapping "ETH" to "WETH" or unwrapping "WETH" to "ETH" no allowance is needed, a null address of `0x0000000000000000000000000000000000000000` is then returned instead.                                                                                                                                                                                   |
| `sellTokenToEthRate`   | The rate between ETH and `sellToken`                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `buyTokenToEthRate`    | The rate between ETH and `buyToken`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `expectedSlippage`     | This is the expected slippage used in routing calculations for the price returned. It is the value of slippage that we estimate that the selected route will have.                                                                                                                                                                                                                                                                                                                                                 |
| `fees`                 | Fees that would be charged. It can contain `zeroExFee`. See details about this fee type below.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `zeroExFee`            | Related to `fees` param above. <br></br><br></br>Fee that 0x charges:<br></br>&ensp;&ensp;- `feeType`: `volume` which means 0x would charge a certain percentage of the trade. <br></br>&ensp;&ensp;- `feeToken`: The ERC20 token address to charge fee. <br></br>&ensp;&ensp;- `feeAmount`: The amount of `feeToken` to be charged as the 0x fee. <br></br>&ensp;&ensp;- `billingType`: The method that 0x fee is transferred. It can currently only be `on-chain` which means the fee would be charged on-chain. |

### Example

#### Get the real-time for selling WETH to buy DAI

Specify a `sellToken`, `buyToken` and `sellAmount` to get a simple quote of 1 WETH for DAI.

**Request**

GET

```http
curl https://api.0x.org/swap/v1/price?sellToken=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&buyToken=0x6b175474e89094c44da98b954eedeac495271d0f&sellAmount=1000000000000000000   --header '0x-api-key: <API_KEY>'
```

#### Response

```json
{
  "price": "391.1643362",
  "value": "11340000000000000",
  "gasPrice": "81000000000",
  "gas": "605952",
  "estimatedGas": "504960",
  "protocolFee": "11340000000000000",
  "minimumProtocolFee": "5670000000000000",
  "buyTokenAddress": "0x6b175474e89094c44da98b954eedeac495271d0f",
  "buyAmount": "391164336200000000000",
  "sellTokenAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  "sellAmount": "1000000000000000000",
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
  "estimatedGasTokenRefund": "252480",
  "allowanceTarget": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
  "fees": {
    "zeroExFee": null
  },
  "grossPrice": "391.1643362",
  "grossBuyAmount": "391164336200000000000",
  "grossSellAmount": "1000000000000000000"
}
```
