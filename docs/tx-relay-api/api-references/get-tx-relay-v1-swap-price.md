---
sidebar_label: GET /tx-relay/v1/swap/price
sidebar_position: 2
description: Learn how to use GET /tx-relay/v1/swap/price
---

# GET /tx-relay/v1/swap/price

Indicative pricing can be obtained by submitting a GET request to `/tx-relay/v1/swap/price`. This endpoint should be used when the end-user does not necessarily want to trade, as it can handle more traffic than the other endpoints.

#### Example Request

⚠️ An API key should always be specified when requesting all possible sources of liquidity. API keys are specified via a header parameter called `0x-api-key`. Chain ids are specified via a header parameter called `0x-chain-id` which currently supports `1` (Ethereum) and `137` (Polygon).

⚠️ `sellToken`, `buyToken`, `takerAddres` and one of \[`sellAmount` ,`buyAmount` ] must be present

```bash
curl '<https://api.0x.org/tx-relay/v1/swap/price?buyToken=0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270&sellAmount=100000000&sellToken=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174&takerAddress=0x9016Cc2122b52fF5d9937c0c1422B78d7e81CeEa&priceImpactProtectionPercentage=0.95&feeType=volume&feeSellTokenPercentage=0.1&feeRecipient=0x70A9f34F9b34C64957b9c401A97BfeD35b95049e>' \\
--header '0x-api-key: <API_KEY>' --header '0x-chain-id: 137'
```

* `buyToken`: The contract address of the token being bought.
* `sellToken`: The contract address of token being sold.
* `buyAmount`: The amount of `buyToken` to buy. Can only be present if `sellAmount` is not present.
* `sellAmount`: The amount of `sellToken` to sell. Can only be present if `buyAmount` is not present.
* `takerAddress`: The address of the taker.
* `acceptedTypes`: \[optional] Comma delimited string of the types of order the caller is willing to receive
  * Currently, _**only**_ `metatransaction` is supported and allowed. In the near future, `otc` and `metatransaction_v2` will be added.
  * This is useful if the caller only wants to receive types the caller specifies. _**If not provided, it means the caller accepts any types**_.
* `slippagePercentage`: \[optional] The maximum amount of slippage acceptable to the user; any slippage beyond that specified will cause the transaction to revert on chain. **Default is 1% and minimal value allowed is 0.1%.** The value of the field is on scale of 1. For example, setting `slippagePercentage` to set to `0.01` means `1%` slippage allowed.
* `priceImpactProtectionPercentage`: \[optional] The maximum amount of price impact acceptable to the user; any price impact beyond that specified will cause the endpoint to return error. The value of the field is on scale of 1. For example, setting `priceImpactProtectionPercentage` to set to `0.01` means `1%` price impact allowed
  * This is an _**opt-in**_ feature, the default value of _**1.0**_ will disable the feature. When it is set to 1.0 (100%) it means that _**every transaction is allowed to pass**_.
  * Price impact calculation includes all fees taken.
  * Read more about price impact at [0x documentation](https://docs.0x.org/0x-swap-api/advanced-topics/price-impact-protection).
* `feeType`: \[optional] The type of integrator fee to charge. The current allowed value is `volume`.
* `feeRecipient`: \[optional] The address the integrator fee would be transferred to. This is the address you’d like to receive the fee. This must be present if `feeType` is provided
* `feeSellTokenPercentage` : \[optional] If `feeType` is `volume`, then `feeSellTokenPercentage` must be provided. `feeSellTokenPercentage` is the percentage (on scale of 1) of `sellToken` integrator charges as fee. For example, setting it to `0.01` means `1%` of the `sellToken` would be charged as fee for the integrator.

#### Example Response

**Liquidity Unavailable Response**

```json
{
    "liquidityAvailable": false,
}
```

**Response if liquidity is available**

```json
{
    "liquidityAvailable": true,
    "price": "391.1643362",
	  "estimatedPriceImpact": "5",
    "buyTokenAddress": "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    "buyAmount": "391164336200000000000",
    "sellTokenAddress": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    "sellAmount": "100000000",
    "allowanceTarget": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    "sources": [{"name":"0x","proportion":"0"},{"name":"Uniswap","proportion":"0"},{"name":"Uniswap_V2","proportion":"1"}],
		"fees": {
			"integratorFee": {
				"feeType": "volume",
			  "feeToken": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
				"feeAmount": "10000"
      },
			"zeroExFee": {
				"feeType": "volume",
				"feeToken": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
				"feeAmount": "100"
			},
			"gasFee": {
				"feeType": "gas",
				"feeToken": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
				"feeAmount": "1"
			}
		}
}
```

* `liquidityAvailable`: Validates that liquidity is available. This would always been present.
* The rest of the fields would only be present if `liquidityAvailable` is `true`
* `price`: If `buyAmount` was specified in the request, this parameter provide the price of `buyToken`, denominated in `sellToken`, or vice-versa.
* `estimatedPriceImpact`: The estimated change in the price of the specified asset that would be caused by the executed swap due to [price impact](https://docs.0x.org/0x-swap-api/advanced-topics/price-impact-protection). Note that if the API is not able to estimate price change, the field will be `null`.
* `buyTokenAddress`: The ERC20 token address of the token you want to receive in quote.
* `buyAmount`: The amount of `buyToken` to buy.
* `sellTokenAddress`: The ERC20 token address of the token you want to sell with quote.
* `sellAmount`: The amount of `sellToken` to sell.
* `allowanceTarget`: The target contract address for which the user needs to have an allowance in order to be able to complete the swap.
* `sources`: The underlying sources for the liquidity. The format will be:
  * `[{ name: string; proportion: string }]`
  * An example: `[{"name":"0x","proportion":"0"},{"name":"Uniswap","proportion":"0"},{"name":"Uniswap_V2","proportion":"1"},...]`
* `fees`: \[optional] Fees that would be charged. It can optionally contain `integratorFee`, `zeroExFee` and `gasFee`:
  * `integratorFee`: Integrator fee (in amount of `sellToken`) would be provided if `feeType` and the corresponding query params are provided in the request:
    * `feeType`: The type of the `integrator` fee. This is always the same as the `feeType` in the request. It can only be `volume` currently.
    * `feeToken`: The ERC20 token address to charge fee. This is always be the same as `sellToken` in the request.
    * `feeAmount`: The amount of `feeToken` to be charged as integrator fee. Note this amount includes the possible 0x fee if 0x charges integrator fee described below.
  * `zeroExFee`: fee that 0x charges (in amount of `sellToken`):
    * `feeType`: `volume` | `integrator_share`
    * `feeToken`: The ERC20 token address to charge fee. This is always be the same as `sellToken` in the request.
    * `feeAmount`: The amount of `feeToken` to be charged as `0x` fee.
  * `gasFee`: gas fee (in amount of `sellToken`) to compensate for the transaction submission performed by our workers:
    * `feeType`: The value is always `gas`.
    * `feeToken`: The ERC20 token address to charge gas fee. This is always be the same as `sellToken` in the request.
    * `feeAmount`: The amount of `feeToken` to be charged as gas fee.