---
sidebar_label: GET /swap/v1/quote
sidebar_position: 2
description: Learn how to use GET /swap/v1/quote
---

# GET /swap/v1/quote

Get an easy-to-consume quote for buying or selling any ERC20 token. The return format is a valid unsigned Ethereum transaction and can be submitted directly to an Ethereum node (or the nodes of other chains if applicable) to complete the swap. For transactions where the `sellToken` is not ETH, you will have to [set your allowances](/0x-swap-api/advanced-topics/how-to-set-your-token-allowances).

### Request

Either a `sellAmount` or `buyAmount` is required.

| **Query Param**                   | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | **Example**                                                                                                                                                                                                                                                                                                                                                                                      |
|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sellToken`                       | The ERC20 token address or symbol of the token you want to send. Native token such as "ETH" can be provided as a valid  `sellToken`. If the symbol given is not supported, try using token address instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | sellToken=ETH, sellToken=0x6b175474e89094c44da98b954eedeac495271d0f                                                                                                                                                                                                                                                                                                                              |
| `buyToken`                        | The ERC20 token address or symbol of the token you want to receive. Native token such as "ETH" can be provided as a valid  `buyToken`.If the symbol given is not supported, try using token address instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | buyToken=ETH, buyToken=0x6b175474e89094c44da98b954eedeac495271d0f                                                                                                                                                                                                                                                                                                                                |
| `sellAmount`                      | (Optional) The amount of  `sellToken` (in `sellToken` base units) you want to send.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | sellAmount=100000000000                                                                                                                                                                                                                                                                                                                                                                          |
| `buyAmount`                       | (Optional) The amount of  `buyToken`(in `buyToken` base units) you want to receive.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | buyAmount=100000000000                                                                                                                                                                                                                                                                                                                                                                           |
| `slippagePercentage`              | (Optional, default is 0.01) The maximum acceptable slippage of the  `buyToken` amount if `sellAmount` is provided; The maximum acceptable slippage of the `sellAmount` amount if `buyAmount` is provided (e.g. 0.03 for 3% slippage allowed).  The lowest possible value that can be set for this parameter is 0; in other words, no amount of  slippage would be allowed. If no value for this optional parameter is provided in the API request, the default slippage percentage is 1%.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | slippagePercentage=0.03                                                                                                                                                                                                                                                                                                                                                                          |
| `gasPrice`                        | (Optional, defaults to ethgasstation "fast") The target gas price (in wei) for the swap transaction. If the price is too low to achieve the quote, an error will be returned.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | gasPrice=1000000                                                                                                                                                                                                                                                                                                                                                                                 |
| `takerAddress`                    | (Optional) The address which will fill the quote. When provided the gas will be estimated and returned and the entire transaction will be validated for success. If the validation fails a Revert Error will be returned in the response. The quote should be fillable if this address is provided. For example, make sure this address has enough token balance.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | takerAddress=0xa8aac589a67ecfade31efde49a062cc21d68a64e                                                                                                                                                                                                                                                                                                                                          |
| `excludedSources`                 | (Optional) Liquidity sources (`Uniswap`, `SushiSwap`, `0x`, `Curve`, etc) that will not be included in the provided quote. See [here](https://github.com/0xProject/protocol/blob/4f32f3174f25858644eae4c3de59c3a6717a757c/packages/asset-swapper/src/utils/market_operation_utils/types.ts#L38) for a full list of sources.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | excludedSources=Uniswap,SushiSwap,Curve                                                                                                                                                                                                                                                                                                                                                          |
| `includedSources`                 | (Optional) For now only supports  `RFQT`, which should be used when the integrator only wants RFQT liquidity without any other DEX orders. Requires a particular agreement with the 0x integrations team. This parameter cannot be combined with `excludedSources`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | includedSources=RFQT                                                                                                                                                                                                                                                                                                                                                                             |
| `skipValidation`                  | (Optional) Normally, whenever a `takerAddress` is provided, the API will validate the quote for the user.  <br/><br/> For more details, see ["How does takerAddress help with catching issues?"](/developer-resources/faqs-and-troubleshooting#-troubleshooting).  <br/><br/> When this parameter is set to true, that validation will be skipped.  <br/><br/>Also see [Quote Validation here](/market-makers/docs/introduction#quote-validation).   For `/quote` , the default of  `skipValidation=false`  but can be overridden to `true` .                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | skipValidation=false                                                                                                                                                                                                                                                                                                                                                                             |
| `intentOnFilling`                 | (Optional) Used to enable RFQ-T liquidity. For more details see the guide [here](/market-makers/docs/introduction#rfq-system) .                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | intentOnFilling=true                                                                                                                                                                                                                                                                                                                                                                             |
| `feeRecipient`                    | (Optional) The ETH address that should receive affiliate fees specified with `buyTokenPercentageFee` . Can be used combination with `buyTokenPercentageFee` to set a commission/trading fee when using the API. <br/><br/> Learn more about how to setup a trading fee/commission fee/transaction fee [here in the FAQs](/developer-resources/faqs-and-troubleshooting#-best-practices).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | feeRecipient=0xa8aac589a67ecfade31efde49a062cc21d68a64e                                                                                                                                                                                                                                                                                                                                          |
| `buyTokenPercentageFee`           | (Optional) The percentage (between 0 - 1.0) of the `buyAmount` that should be attributed to `feeRecipient` as affiliate fees. Note that this requires that the `feeRecipient` parameter is also specified in the request.  Learn more about how to setup a trading fee/commission fee/transaction fee [here in the FAQs](/developer-resources/faqs-and-troubleshooting#-best-practices).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | buyTokenPercentageFee=0.1                                                                                                                                                                                                                                                                                                                                                                        |
| `affiliateAddress`                | (Required) An ETH address for which to attribute the trade for tracking and analytics purposes. It can ben any valid ETH address, since it’s just for tagging purposes.  <br/><br/> Passing this parameter with your API queries also allows us to provide you data about total volume traded in your application, pairs, MAUs, etc. similar to this [dashboard](https://metabase.spaceship.0x.org/public/dashboard/e79bb86a-6777-4655-88fd-6453fdbefe0f?affiliate_address=&start_date=2022-01-01).  <br/><br/>Additionally, `affiliateAddress` will allow your project to get metrics on your user's trades via the [0x Explorer](https://explorer.0x.org/apps) analytics tools.  <br/><br/>Note `affiliateAddress` is only for tracking trades and has no impact on affiliate fees, for affiliate fees use `feeRecipient` .                                                                                                                                                                                                                                                                                                                   | affiliateAddress=0xa8aac589a67ecfade31efde49a062cc21d68a64e  Here’s an example request (you just need to replace with your chosen affiliateAddress):https://api.0x.org/swap/v1/quote?sellToken=DAI&sellAmount=100000000000000000000&buyToken=WETH&feeRecipient=0x46B5BC959e8A754c0256FFF73bF34A52Ad5CdfA9&buyTokenPercentageFee=0.01&affiliateAddress=0xaae6414A06BbA56D35A80c0Ae96456280EDFd1da |
| `enableSlippageProtection`        | (Optional) A boolean field, set to  `true`  or  `false`. If  `enableSlippageProtection`  is either not set or set to `true`, the quote will be adjusted for MEV-aware slippage. <br/><br/> If  `enableSlippageProtection`  is `false`, the quote returned will not be adjusted for MEV-aware slippage (this is recommended for meta-aggregators & integrators who will compare the quoted price with other sources).  <br/><br/> See affects on  `buyAmount`  ,  `price` , and  `expectedSlippage`  in the  Response fields.  <br/><br/>Read more about [Slippage Protection](/0x-swap-api/advanced-topics/slippage-protection) .                                                                                                                                                                                                                                                                                                                                                                                                                                                | enableSlippageProtection=true                                                                                                                                                                                                                                                                                                                                                                    |
| `priceImpactProtectionPercentage` | (Optional, defaults to 100%) The percentage (between 0 - 1.0) of allowed [price impact](0x-swap-api/advanced-topics/price-impact-protection#what-is-price-impact-). <br/><br/> When `priceImpactProtectionPercentage` is set, `estimatedPriceImpact`  is returned which estimates the change in the price of the specified asset that would be caused by the executed swap due to price impact.   <br/><br/>If the estimated price impact is above the percentage indicated, an error will be returned. For example, if  `PriceImpactProtectionPercentage=.15 ` (15%), any quote with a price impact higher than 15% will return an error.    <br/><br/>This is an  **opt-in**  feature, the default value of 1.0 will disable the feature. When it is set to 1.0 (100%) it means that every transaction is allowed to pass.  <br/><br/>**Note: ** When we fail to calculate Price Impact we will return  `null`  and Price Impact Protection will be disabled  See affects on `estimatedPriceImpact` in the  Response fields. **Read more** about price impact protection and how to set it up [here](/0x-swap-api/advanced-topics/price-impact-protection). | priceImpactProtectionPercentage=0.15                                                                                                                                                                                                                                                                                                                                                             |

### Response

| Field                | Description                                                                                                                                                                                                                                                                                                                      |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `price`              | If `buyAmount` was specified in the request it provides the price of `buyToken` in `sellToken` and vice versa. This price does not include the `slippage` provided in the request above, and therefore represents the best possible price. <br/><br/>If `buyTokenPercentageFee` and `feeRecipientwere` set, the fee amount will be part of this returned price. If `enableSlippageProtection` in the request was not false, the `buyAmount` & `price` responses returned will factor slippage in its routing.                                                                                      |
| `guaranteedPrice`    | The price which must be met or else the entire transaction will revert. This price is influenced by the `slippagePercentage` parameter. On-chain sources may encounter price movements from quote to settlement.                                                                                                                 |
| `estimatedPriceImpact`                 | When `priceImpactProtectionPercentage` is set, this value returns the estimated change in the price of the specified asset that would be caused by the executed swap due to [price impact(/0x-swap-api/advanced-topics/price-impact-protection)]. <br/><br/> **Note:** If we fail to estimate price change we will return `null`.  <br/><br/>**Read more** about price impact protection and how to set it up [here](/0x-swap-api/advanced-topics/price-impact-protection) .                                                                                                                                                                                                                                                                          |
| `to`                 | The address of the contract to send call `data` to.                                                                                                                                                                                                                                                                              |
| `data`               | The call data required to be sent to the `to` contract address.                                                                                                                                                                                                                                                                  |
| `value`              | The amount of ether (in wei) that should be sent with the transaction. (Assuming protocolFee is paid in ether).                                                                                                                                                                                                                  |
| `gasPrice`           | The gas price (in wei) that should be used to send the transaction. The transaction needs to be sent with this `gasPrice` or lower for the transaction to be successful.                                                                                                                                                         |
| `gas`                | The estimated gas limit that should be used to send the transaction to guarantee settlement. While a computed estimate is returned in all responses, an accurate estimate will only be returned if a `takerAddress` is included in the request.                                                                                  |
| `estimatedGas`       | The estimate for the amount of gas that will actually be used in the transaction. Always less than `gas`.                                                                                                                                                                                                                        |
| `protocolFee`        | The maximum amount of ether that will be paid towards the protocol fee (in wei), and what is used to compute the `value` field of the transaction.                                                                                                                                                                               |
| `minimumProtocolFee` | The minimum amount of ether that will be paid towards the protocol fee (in wei) during the transaction.                                                                                                                                                                                                                          |
| `buyAmount`          | The amount of `buyToken` (in `buyToken` units) that would be bought in this swap. Certain on-chain sources do not allow specifying `buyAmount`, when using `buyAmount` these sources are excluded.                                                                                                                               |
| `sellAmount`         | The amount of `sellToken` (in `sellToken` units) that would be sold in this swap. Specifying `sellAmount` is the recommended way to interact with 0xAPI as it covers all on-chain sources.                                                                                                                                       |
| `sources`            | The percentage distribution of `buyAmount` or `sellAmount` split between each liquidity source. Ex: `[{ name: '0x', proportion: "0.8" }, { name: 'Kyber', proportion: "0.2"}, ...]`                                                                                                                                              |
| `buyTokenAddress`    | The ERC20 token address of the token you want to receive in quote.                                                                                                                                                                                                                                                               |
| `sellTokenAddress`   | The ERC20 token address of the token you want to sell with quote.                                                                                                                                                                                                                                                                |
| `allowanceTarget`    | The target contract address for which the user needs to have an allowance in order to be able to complete the swap. For swaps with "ETH" as `sellToken`, wrapping "ETH" to "WETH" or unwrapping "WETH" to "ETH" no allowance is needed, a null address of `0x0000000000000000000000000000000000000000` is then returned instead. |
| `orders`             | The details of fill orders |
| `sellTokenToEthRate` | The rate between ETH and `sellToken`                                                                                                                                                                                                                                                                                             |
| `buyTokenToEthRate` | The rate between ETH and `buyToken`                                                                                                                                                                                                                                                                                            |
| `expectedSlippage` | This is the expected slippage used in routing calculations for the quote returned. It is the value of slippage that we estimate that the selected route will have: <br/><br/> - It can be used by integrators to calculate the Final Expected Amount for the asset: i.e. calculated as (`buyAmount` * `expectedSlippage` ) <br/><br/> -  It will only be returned when `enableSlippageProtection` is not set to `false`                                                                                                                                                                                                                                                                                           |


## Examples

### Simple DAI Buy with WETH

Specify a `buyToken`, `sellToken` and either a `sellAmount` to get a simple quote of 1 WETH for DAI.

#### Request

Get

```markup
https://api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=WETH&sellAmount=100000000000000000
```

#### Response

```json
{
    "chainId": 1,
    "price": "2504.4918553394464675",
    "guaranteedPrice": "2479.4469367860520028",
    "estimatedPriceImpact":"0.0001",
    "to": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    "data": "0xd9627aa40000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000002386f26fc100000000000000000000000000000000000000000000000000015817a685f9a1645c00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000006b175474e89094c44da98b954eedeac495271d0f869584cd000000000000000000000000100000000000000000000000000000000000001100000000000000000000000000000000000000000000001c2e352fd761f763ab",
    "value": "0",
    "gas": "111000",
    "estimatedGas": "111000",
    "gasPrice": "93000000000",
    "protocolFee": "0",
    "minimumProtocolFee": "0",
    "buyTokenAddress": "0x6b175474e89094c44da98b954eedeac495271d0f",
    "sellTokenAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "buyAmount": "25044918553394464675",
    "sellAmount": "10000000000000000",
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
            "name": "Balancer",
            "proportion": "0"
        },
        {
            "name": "Balancer_V2",
            "proportion": "0"
        },
        {
            "name": "Bancor",
            "proportion": "0"
        },
        {
            "name": "mStable",
            "proportion": "0"
        },
        {
            "name": "Mooniswap",
            "proportion": "0"
        },
        {
            "name": "Swerve",
            "proportion": "0"
        },
        {
            "name": "SnowSwap",
            "proportion": "0"
        },
        {
            "name": "SushiSwap",
            "proportion": "1"
        },
        {
            "name": "Shell",
            "proportion": "0"
        },
        {
            "name": "MultiHop",
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
            "name": "CREAM",
            "proportion": "0"
        },
        {
            "name": "LiquidityProvider",
            "proportion": "0"
        },
        {
            "name": "CryptoCom",
            "proportion": "0"
        },
        {
            "name": "Linkswap",
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
            "name": "Smoothy",
            "proportion": "0"
        },
        {
            "name": "Component",
            "proportion": "0"
        },
        {
            "name": "Saddle",
            "proportion": "0"
        },
        {
            "name": "xSigma",
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
        }
    ],
    "orders": [
        {
            "makerToken": "0x6b175474e89094c44da98b954eedeac495271d0f",
            "takerToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "makerAmount": "25044918553394464675",
            "takerAmount": "10000000000000000",
            "fillData": {
            "tokenAddressPath": [
                "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                "0x6b175474e89094c44da98b954eedeac495271d0f"
            ],
            "router": "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f"
        },
        "source": "SushiSwap",
        "sourcePathId": "0xe58bde9f0ca002c1e99df8df403eabe6431a3b0476ee5dfb92fe0a35af2f5ead",
        "type": 0
        }
    ],
    "allowanceTarget": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    "sellTokenToEthRate": "1",
    "buyTokenToEthRate": "2504.46738154874763977"
}
```

### Excluding liquidity sources

Supply a comma delimited list of liquidty source names to exclude them from the aggregator logic. See [here](https://docs.0x.org/0x-api-swap/api-references/get-swap-v1-sources) for a full list of sources.

#### Request

Get

```http
https://api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=ETH&sellAmount=1000000000000000000&excludedSources=0x,Kyber
```

#### Response

```json
{
    "chainId": 1,
    "price": "2484.996784870669179426",
    "guaranteedPrice": "2460.146817021962487631",
    "estimatedPriceImpact":"0.0001",
    "to": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    "data": "0xd9627aa400000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000855d653faa3dfe074f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000006b175474e89094c44da98b954eedeac495271d0f869584cd00000000000000000000000010000000000000000000000000000000000000110000000000000000000000000000000000000000000000ee7813bf1e61f766c0",
    "value": "1000000000000000000",
    "gas": "136000",
    "estimatedGas": "136000",
    "gasPrice": "96000000000",
    "protocolFee": "0",
    "minimumProtocolFee": "0",
    "buyTokenAddress": "0x6b175474e89094c44da98b954eedeac495271d0f",
    "sellTokenAddress": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    "buyAmount": "2484996784870669179426",
    "sellAmount": "1000000000000000000",
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
            "name": "Balancer",
            "proportion": "0"
        },
        {
            "name": "Balancer_V2",
            "proportion": "0"
        },
        {
            "name": "Bancor",
            "proportion": "0"
        },
        {
            "name": "mStable",
            "proportion": "0"
        },
        {
            "name": "Mooniswap",
            "proportion": "0"
        },
        {
            "name": "Swerve",
            "proportion": "0"
        },
        {
            "name": "SnowSwap",
            "proportion": "0"
        },
        {
            "name": "SushiSwap",
            "proportion": "0"
        },
        {
            "name": "Shell",
            "proportion": "0"
        },
        {
            "name": "MultiHop",
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
            "name": "CREAM",
            "proportion": "0"
        },
        {
            "name": "LiquidityProvider",
            "proportion": "0"
        },
        {
            "name": "CryptoCom",
            "proportion": "0"
        },
        {
            "name": "Linkswap",
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
            "name": "Smoothy",
            "proportion": "0"
        },
        {
            "name": "Component",
            "proportion": "0"
        },
        {
            "name": "Saddle",
            "proportion": "0"
        },
        {
            "name": "xSigma",
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
        }
    ],
    "orders": [
        {
            "makerToken": "0x6b175474e89094c44da98b954eedeac495271d0f",
            "takerToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "makerAmount": "2484996784870669179426",
            "takerAmount": "1000000000000000000",
            "fillData": {
                "tokenAddressPath": [
                    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                    "0x6b175474e89094c44da98b954eedeac495271d0f"
                ],
                "router": "0xf164fc0ec4e93095b804a4795bbe1e041497b92a"
            },
            "source": "Uniswap_V2",
            "sourcePathId": "0x3d17978a401419de71950469cdeec831aeaafc5abbab547a5e79cc2d4c38cce3",
            "type": 0
        }
    ],
    "allowanceTarget": "0x0000000000000000000000000000000000000000",
    "sellTokenToEthRate": "1",
    "buyTokenToEthRate": "2482.11547954119199012"
}
```

### Supplying a Taker Address

Supply a `takerAddress` to use an [`eth_call`](https://github.com/ethereum/wiki/wiki/JSON-RPC#eth\_call) to perform additional validation, and an accurate gas estimate.

#### Request

Get

```
https://api.0x.org/swap/v1/quote?buyToken=DAI&sellToken=ETH&sellAmount=1000000000000000000&takerAddress=0xab5801a7d398351b8be11c439e05c5b3259aec9b
```

#### Response

```json
{
    "chainId": 1,
    "price": "2496.390120385736312458",
    "guaranteedPrice": "2471.426219181878949333",
    "estimatedPriceImpact":"0.0001",
    "to": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    "data": "0x3598d8ab0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000085f9edbc2b2a9635d50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002bc02aaa39b223fe8d0a0e5c4f27ead9083c756cc20001f46b175474e89094c44da98b954eedeac495271d0f000000000000000000000000000000000000000000869584cd00000000000000000000000010000000000000000000000000000000000000110000000000000000000000000000000000000000000000f4d36b6ed161f769fa",
    "value": "1000000000000000000",
    "gas": "151000",
    "estimatedGas": "151000",
    "from": "0xab5801a7d398351b8be11c439e05c5b3259aec9b",
    "gasPrice": "88000000000",
    "protocolFee": "0",
    "minimumProtocolFee": "0",
    "buyTokenAddress": "0x6b175474e89094c44da98b954eedeac495271d0f",
    "sellTokenAddress": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    "buyAmount": "2496390120385736312458",
    "sellAmount": "1000000000000000000",
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
            "name": "Balancer",
            "proportion": "0"
        },
        {
            "name": "Balancer_V2",
            "proportion": "0"
        },
        {
            "name": "Bancor",
            "proportion": "0"
        },
        {
            "name": "mStable",
            "proportion": "0"
        },
        {
            "name": "Mooniswap",
            "proportion": "0"
        },
        {
            "name": "Swerve",
            "proportion": "0"
        },
        {
            "name": "SnowSwap",
            "proportion": "0"
        },
        {
            "name": "SushiSwap",
            "proportion": "0"
        },
        {
            "name": "Shell",
            "proportion": "0"
        },
        {
            "name": "MultiHop",
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
            "name": "CREAM",
            "proportion": "0"
        },
        {
            "name": "LiquidityProvider",
            "proportion": "0"
        },
        {
            "name": "CryptoCom",
            "proportion": "0"
        },
        {
            "name": "Linkswap",
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
            "name": "Smoothy",
            "proportion": "0"
        },
        {
            "name": "Component",
            "proportion": "0"
        },
        {
            "name": "Saddle",
            "proportion": "0"
        },
        {
            "name": "xSigma",
            "proportion": "0"
        },
        {
            "name": "Uniswap_V3",
            "proportion": "1"
        },
        {
            "name": "Curve_V2",
            "proportion": "0"
        },
        {
            "name": "ShibaSwap",
            "proportion": "0"
        }
    ],
    "orders": [
        {
            "makerToken": "0x6b175474e89094c44da98b954eedeac495271d0f",
            "takerToken": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "makerAmount": "2496390120385736312458",
            "takerAmount": "1000000000000000000",
            "fillData": {
                "router": "0xe592427a0aece92de3edee1f18e0157c05861564",
                "tokenAddressPath": [
                    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                    "0x6b175474e89094c44da98b954eedeac495271d0f"
                ],
                "uniswapPath": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc20001f46b175474e89094c44da98b954eedeac495271d0f"
            },
            "source": "Uniswap_V3",
            "sourcePathId": "0xcb26f3151d130b8a513c634db8a75b30f1ed3ee24a41a578b90efe1de55ac28c",
            "type": 0
        }
    ],
    "allowanceTarget": "0x0000000000000000000000000000000000000000",
    "sellTokenToEthRate": "1",
    "buyTokenToEthRate": "2485.49297930185739314"
}
```

If the [`eth_call`](https://github.com/ethereum/wiki/wiki/JSON-RPC#eth\_call) fails (because `takerAddress` cannot complete the transaction), the response will include reasons for the failure.

```json
{
    "code": 105,
    "reason": "IncompleteFillError",
    "values": {
        "error": 0,
        "expectedAssetFillAmount": "10000000",
        "actualAssetFillAmount": "0"
    }
}
```

### Wrapping and unwrapping between ETH and WETH

Easily wrap and unwrap between ETH and WETH by requesting a swap quote by setting `sellToken` and 'buyToken' as either 'WETH' or 'ETH'. The swap quote returned will provide the calldata to directly interact with the `WETH9` contract and not with 0x exchange contracts.

#### Wrap ETH

#### Request

Get

```
https://api.0x.org/swap/v1/quote?buyToken=ETH&sellToken=WETH&buyAmount=10000000
```

#### Response

```json
{
    "chainId": 1,
    "price": "1",
    "guaranteedPrice": "1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "data": "0x2e1a7d4d0000000000000000000000000000000000000000000000000000000000989680869584cd0000000000000000000000001000000000000000000000000000000000000011000000000000000000000000000000000000000000000087b981bc4361f76bbe",
    "value": "0",
    "gas": "46000",
    "estimatedGas": "46000",
    "gasPrice": "104000000000",
    "protocolFee": "0",
    "minimumProtocolFee": "0",
    "buyTokenAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "sellTokenAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "buyAmount": "10000000",
    "sellAmount": "10000000",
    "sources": [],
    "orders": [],
    "sellTokenToEthRate": "1",
    "buyTokenToEthRate": "1",
    "allowanceTarget": "0x0000000000000000000000000000000000000000"
}
```

#### Unwrap ETH

#### Request

Get

```
https://api.0x.org/swap/v1/quote?buyToken=WETH&sellToken=ETH&buyAmount=10000000
```

#### Response

```json
{
    "chainId": 1,
    "price": "1",
    "guaranteedPrice": "1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "data": "0xd0e30db0869584cd0000000000000000000000001000000000000000000000000000000000000011000000000000000000000000000000000000000000000024811cd5d661f76c49",
    "value": "10000000",
    "gas": "46000",
    "estimatedGas": "46000",
    "gasPrice": "105000000000",
    "protocolFee": "0",
    "minimumProtocolFee": "0",
    "buyTokenAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "sellTokenAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "buyAmount": "10000000",
    "sellAmount": "10000000",
    "sources": [],
    "orders": [],
    "sellTokenToEthRate": "1",
    "buyTokenToEthRate": "1",
    "allowanceTarget": "0x0000000000000000000000000000000000000000"
}
```

### **Ensure RFQ-T liquidity**

RFQ-T liquidity can only be accessed if the request supplies a taker address, a permissioned API key via header `0x-api-key`, and the query parameter `intentOnFilling=true`. For more details see the guide [here](../../market-makers/docs/introduction.md).

#### Request

Get

```
https://api.0x.org/swap/v1/quote?sellToken=WETH&buyToken=DAI&sellAmount=1000000000000000000&takerAddress=0xffffffffffffffffffffffffffffffffffffffff&intentOnFilling=true
```

#### Response

```json
{
    "price": "376.7868259",
    "guaranteedPrice": "375.506208585632606933",
    "to": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    "data": "0xa6c3bf3300000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000007200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000002600000000000000000000000006425bb021dabd5d6b443a1ab47b003a1b7a27d4b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000051b3ded76a61cee0000000000000000000000000000000000000000000000000003782dace9d900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f2d826000000000000000000000000000000000000000000000000000000173c9bc22f400000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000005e0000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000024f47261b00000000000000000000000006b175474e89094c44da98b954eedeac495271d0f00000000000000000000000000000000000000000000000000000000000000000000000000000000c47b7094f378e54347e281aab170e8cca69d880a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000145b320b31045e6ad60000000000000000000000000000000000000000000000000de0b6b3a764000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f2d9dcb7be1c251ac3d8521ea92398740531b31bd13d1e48c182ebb46dfc2360b9f433400000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000003c00000000000000000000000000000000000000000000000000000000000000420000000000000000000000000000000000000000000000000000000000000042000000000000000000000000000000000000000000000000000000000000001c4dc1600f30000000000000000000000006b175474e89094c44da98b954eedeac495271d0f000000000000000000000000c47b7094f378e54347e281aab170e8cca69d880a00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000140000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000036691c4f426eb8f42f150ebde43069a31cb080ad0000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000145b320b31045e6ad600000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000020000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000024f47261b0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000421ca9636d5a84fb4e458816391b3d8860bf4b459f97b8962f8ec1c35d7240cce6d51ad2d55a2dec2562194ec7457d10d73b8f55fcdc144ee21e4211c067251973680200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010400000000000000000000000000000000000000000000000000000000000000869584cd00000000000000000000000010000000000000000000000000000000000000110000000000000000000000000000000000000000000000cef59c5ef35f2d81ac",
    "value": "12320000000000000",
    "gas": "540000",
    "estimatedGas": "450000",
    "from": "0xffffffffffffffffffffffffffffffffffffffff",
    "gasPrice": "88000000000",
    "protocolFee": "12320000000000000",
    "minimumProtocolFee": "6160000000000000",
    "buyTokenAddress": "0x6b175474e89094c44da98b954eedeac495271d0f",
    "sellTokenAddress": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "buyAmount": "376786825900000000000",
    "sellAmount": "1000000000000000000",
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
            "name": "Balancer",
            "proportion": "0"
        }
    ],
    "allowanceTarget": "0xdef1c0ded9bec7f1a1670819833240f027b25eff"
}
```
