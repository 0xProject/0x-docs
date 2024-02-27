---
sidebar_label: GET /tx-relay/v1/swap/quote
sidebar_position: 3
description: Learn how to use GET /tx-relay/v1/swap/quote
---

# GET /tx-relay/v1/swap/quote

Submit a GET request to `/tx-relay/v1/swap/quote` to obtain a fillable quote.

## Request

### Request Params

The request parameters are the same as [/price](https://0x.org/docs/tx-relay-api/api-references/get-tx-relay-v1-swap-price) except with an extra field `checkApproval`:

| **Query Params** | **Description**                                                                                                                                                                                                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `checkApproval`  | \[optional] A boolean that indicates whether or not to check for approval and potentially utilizes gasless approval feature. Allowed values `true` / `false`. Defaults to `false` if not provided. On a performance note, setting it to `true` requires more processing and computation than setting it to `false`. |

### Example Request

:::info
An API key should always be specified when requesting all possible sources of liquidity. API keys are specified via a header parameter called `0x-api-key`. Chain ids are specified via a header parameter called `0x-chain-id` which currently supports `1` (Ethereum), `137` (Polygon), `42161` (Arbitrum), `84531` (Base) and `10` (Optimism).
:::

:::info
`sellToken`, `buyToken`, `takerAddres` and one of \[`sellAmount` ,`buyAmount` ] must be present
:::

```bash
curl 'https://api.0x.org/tx-relay/v1/swap/quote?buyToken=0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270&sellAmount=100000000&sellToken=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174&takerAddress=<TAKER_ADDRESS>&priceImpactProtectionPercentage=0.95&feeType=volume&feeSellTokenPercentage=0.01&feeRecipient=<FEE_RECIPIENT_ADDRESS>' \
--header '0x-api-key: <API_KEY>' \
--header '0x-chain-id: 137'
```

- `checkApproval`: \[optional] Whether to check for approval and potentially utilizes gasless approval feature. Allowed values `true` / `false`. Defaults to `false` if not provided. On a performance note, setting it to `true` requires more processing and computation than setting it to `false`. 

## Response

### Response Params

| **Query Params**                                                                                                                                                                                                                                      | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `liquidityAvailable`                                                                                                                                                                                                                                  | Used to validate that liquidity is available from a given source. This would always be present.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| _**The rest of the fields would only be present if `liquidityAvailable` is `true`. Fields that have been explained previously in [/price](https://0x.org/docs/tx-relay-api/api-references/get-tx-relay-v1-swap-price) are not included again here.**_ |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `trade`                                                                                                                                                                                                                                               | This is the “trade” object which contains the necessary information to process a trade<br></br><br></br>&ensp;&ensp;• `type`: [`metatransaction_v2`](/tx-relay-api/guides/understanding-tx-relay-api#meta-transaction-v2) or [`otc`](/tx-relay-api/guides/understanding-tx-relay-api#otc)<br></br>&ensp;&ensp;• `hash`: The hash for the trade according to [EIP-712](https://eips.ethereum.org/EIPS/eip-712). Note that if you compute the hash from `eip712` field, it should match the value of this field.<br></br>&ensp;&ensp;• `eip712`: Necessary data for [EIP-712](https://eips.ethereum.org/EIPS/eip-712).<br></br>&ensp;&ensp;&ensp;&ensp;• Note: Please don’t assume particular shapes of `trade.eip712.types`, `trade.eip712.domain`, `trade.eip712.primaryType` and `trade.eip712.message` as they will change based on the `type` field and we would add more types in the future.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `approval`                                                                                                                                                                                                                                            | This is the “approval” object which contains the necessary information to process a gasless approval, if requested via `checkApproval` and is available. You will only be able to initiate a gasless approval for the sell token if the response has both `isRequired` and `isGaslessAvailable` set to `true`.<br></br><br></br>&ensp;&ensp;• `isRequired`: whether an approval is required for the trade <br></br>&ensp;&ensp;• `isGaslessAvailable`: whether gasless approval is available for the sell token<br></br>&ensp;&ensp;• `type`: `permit` or `executeMetaTransaction::approve`<br></br>&ensp;&ensp;• `hash`: The hash for the approval according to [EIP-712](https://eips.ethereum.org/EIPS/eip-712). Note that if you compute the hash from `eip712` field, it should match the value of this field.<br></br>&ensp;&ensp;• `eip712`: Necessary data for [EIP-712](https://eips.ethereum.org/EIPS/eip-712).<br></br>&ensp;&ensp;&ensp;&ensp;• Note: Please don’t assume particular shapes of `approval.eip712.types`, `approval.eip712.domain`, `approval.eip712.primaryType` and `approval.eip712.message` as they will change based on the `type` field.<br></br><br></br>See [here](/docs/tx-relay-api/api-references/post-tx-relay-v1-swap-submit.md) for more information about gasless approvals. |

### Example Responses

There are 2 possible `trade` types in a response: `metatransaction_v2` and `otc`.

Thus, please don’t assume particular shapes of `trade.eip712.types`, `trade.eip712.domain`, `trade.eip712.primaryType` and `trade.eip712.message` as they will change based on types returned, namely `metatransaction_v2` and `otc`. More types might also be added in the future.

Similarly, don't assume particular shapes for `approval.eip712.types`, `approval.eip712.domain`, `approval.eip712.primaryType` and `approval.eip712.message` as there are different types of gasless approval standards.

**Note that:**

- if returned type is `metatransaction_v2`, `feeToken` would be `sellToken`
- if returned type is `otc`, `feeToken` would be `buyToken` if it's a `sell` and `sellToken` if it's a `buy`

### Liquidity Unavailable Response

```json
{
  "liquidityAvailable": false
}
```

### Example Meta-Transaction V2 Response

```json
{
  "liquidityAvailable": true,
  "buyAmount": "111636717224035610000",
  "buyTokenAddress": "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
  "estimatedPriceImpact": "1.272",
  "price": "1.1163671722403561",
  "sellAmount": "100000000",
  "sellTokenAddress": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
  "grossBuyAmount": "113012329288976771730",
  "grossSellAmount": "100000000",
  "grossPrice": "1.130123292889767717",
  "grossEstimatedPriceImpact": "0.0554",
  "allowanceTarget": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
  "sources": [
    { "name": "Uniswap_V3", "proportion": "0.87" },
    { "name": "Balancer", "proportion": "0.13" }
  ],
  "fees": {
    // Same as the response in /price. Refacted here.
  },
  "trade": {
    "type": "metatransaction_v2",
    "hash": "0x1e6ae91b3642e3a195c81a2d07cce9c0b811a6ca5a5de6ebd30651b48dd3cef1",
    "eip712": {
      "types": {
        "EIP712Domain": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "version",
            "type": "string"
          },
          {
            "name": "chainId",
            "type": "uint256"
          },
          {
            "name": "verifyingContract",
            "type": "address"
          }
        ],

        "MetaTransactionDataV2": [
          {
            "name": "signer",
            "type": "address"
          },
          {
            "name": "sender",
            "type": "address"
          },
          {
            "name": "expirationTimeSeconds",
            "type": "uint256"
          },
          {
            "name": "salt",
            "type": "uint256"
          },
          {
            "name": "callData",
            "type": "bytes"
          },
          {
            "name": "feeToken",
            "type": "address"
          },
          {
            "name": "fees",
            "type": "MetaTransactionFeeData[]"
          }
        ],

        "MetaTransactionFeeData": [
          {
            "name": "recipient",
            "type": "address"
          },
          {
            "name": "amount",
            "type": "uint256"
          }
        ]
      },

      "primaryType": "MetaTransactionDataV2",
      "domain": {
        "name": "ZeroEx",
        "version": "1.0.0",
        "chainId": 137,
        "verifyingContract": "0xdef1c0ded9bec7f1a1670819833240f027b25eff"
      },

      "message": {
        "signer": "0x70a9f34f9b34c64957b9c401a97bfed35b95049e",
        "sender": "0x0000000000000000000000000000000000000000",
        "expirationTimeSeconds": "1685943660",
        "salt": "4251159851784773262096467229012398168674432764636501672764910900271042799065",
        "callData": "0x415565b00000000000000000000000002791b......",
        "feeToken": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
        "fees": [
          {
            "recipient": "0x70a9f34f9b34c64957b9c401a97bfed35b95049e",
            "amount": "1000000"
          },
          {
            "recipient": "0x38f5e5b4da37531a6e85161e337e0238bb27aa90",
            "amount": "218127"
          }
        ]
      }
    }
  },

  "approval": {
    "isRequired": true,
    "isGaslessAvailable": true,
    "type": "permit",
    "hash": "0x4ef24329a226d8f5e32934009ad313fbb9842ac329a134f6592d0135520651d8",
    "eip712": {
      "types": {
        "EIP712Domain": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "version",
            "type": "string"
          },
          {
            "name": "verifyingContract",
            "type": "address"
          },
          {
            "name": "salt",
            "type": "bytes32"
          }
        ],
        "Permit": [
          {
            "name": "owner",
            "type": "address"
          },
          {
            "name": "spender",
            "type": "address"
          },
          {
            "name": "value",
            "type": "uint256"
          },
          {
            "name": "nonce",
            "type": "uint256"
          },
          {
            "name": "deadline",
            "type": "uint256"
          }
        ]
      },
      "primaryType": "Permit",
      "domain": {
        "name": "USD Coin (PoS)",
        "version": "1",
        "verifyingContract": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
        "salt": "0x0000000000000000000000000000000000000000000000000000000000000089"
      },
      "message": {
        "owner": "0x70a9f34f9b34c64957b9c401a97bfed35b95049e",
        "spender": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
        "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        "nonce": 0,
        "deadline": "1685943341"
      }
    }
  }
}
```

### Example OTC Response

For otc response, all fields are the same as the meta-transaction v2 response except for `trade` field. More specifically, the following fields are different:

- `trade.eip712.types`: New type `OtcOrder` instead of `MetaTransactionDataV2`
- `trade.eip712.primaryType`: `OtcOrder` instead of `MetaTransactionDataV2`
- `trade.eip712.message`

```json
{
  ...
	// All fields other than `trade` are the same as meta-transaction v2 response
  "trade": {
      "type": "otc",
      "hash": "0x832cd3dbb57813f47598cee9a9a0cae149921bb6e84675893b8f3da14198a0b8",
      "eip712": {
          "types": {
              "EIP712Domain": [
                  {
                      "name": "name",
                      "type": "string"
                  },
                  {
                      "name": "version",
                      "type": "string"
                  },
                  {
                      "name": "chainId",
                      "type": "uint256"
                  },
                  {
                      "name": "verifyingContract",
                      "type": "address"
                  }
              ],
              // different type compared with meta-transaction v2 response
              "OtcOrder": [
                  {
                      "name": "makerToken",
                      "type": "address"
                  },
                  {
                      "name": "takerToken",
                      "type": "address"
                  },
                  {
                      "name": "makerAmount",
                      "type": "uint128"
                  },
                  {
                      "name": "takerAmount",
                      "type": "uint128"
                  },
                  {
                      "name": "maker",
                      "type": "address"
                  },
                  {
                      "name": "taker",
                      "type": "address"
                  },
                  {
                      "name": "txOrigin",
                      "type": "address"
                  },
                  {
                      "name": "expiryAndNonce",
                      "type": "uint256"
                  }
              ]
          },
          // different primary type compared with meta-transaction v2 response
          "primaryType": "OtcOrder",
          "domain": {
              "name": "ZeroEx",
              "version": "1.0.0",
              "chainId": 137,
              "verifyingContract": "0xdef1c0ded9bec7f1a1670819833240f027b25eff"
          },
          // different message with meta-transaction v2 response
          "message": {
              "makerToken": "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
              "takerToken": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
              "makerAmount": "112536552406568430000",
              "takerAmount": "100000000",
              "maker": "0x2008b6...",
              "taker": "0x70a9f3...",
              "txOrigin": "0xc65f45...",
              "expiryAndNonce": "10582837965..."
          }
      }
  },
  ...
}
```

## Status Code

- `200` if successful.
- `400`:
  - If `sellAmount` / `buyAmount` provided is too small to execute or cover the cost.
  - If the actual price impact exceeds `priceImpactProtectionPercentage` supplied in the query param when the API _**is able to calculate price impact**_. The endpoint would not return `400` when it's not able to calculate price impact even though `priceImpactProtectionPercentage` is supplied.
  - If the query params are not able to pass validation.
- `500` if there is an internal server error.
