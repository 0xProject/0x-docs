---
sidebar_label: GET /tx-relay/v1/swap/quote
sidebar_position: 3
description: Learn how to use GET /tx-relay/v1/swap/quote
---

# GET /tx-relay/v1/swap/quote

Fillable quotes are obtained by submitting a GET request to `/tx-relay/v1/swap/quote`

#### **Example Request**

The request parameters are the same as `[/price](<https://www.notion.so/0x-Tx-Relay-Partner-Hub-2f0074ebe816409b958ab013da13c570>)` except with an extra field `checkApproval`:

```bash
curl '<https://api.0x.org/tx-relay/v1/swap/quote?buyToken=0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270&sellAmount=100000000&sellToken=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174&takerAddress=0x9016Cc2122b52fF5d9937c0c1422B78d7e81CeEa&priceImpactProtectionPercentage=0.95&feeType=volume&feeSellTokenPercentage=0.1&feeRecipient=0x70A9f34F9b34C64957b9c401A97BfeD35b95049e>' \\
--header '0x-api-key: <API_KEY>' --header '0x-chain-id: 137'
```

* `checkApproval`: \[optional] Whether to check for approval and potentially utilizes gasless approval feature. Allowed values `true` / `false`. Default to `false` if not provided. Setting it to `true` would require more processing and computation on our end so it would have worse performance.

#### Example Response

The response will initially be of type `metatransaction`. There are two new types `metatransaction_v2` and `otc` currently under development and will be available in the near future.

Thus, please don’t assume particular shapes of `trade.eip712.types`, `trade.eip712.domain`, `trade.eip712.primaryType` and `trade.eip712.message` as they will change based on types returned, namely `metatransaction` , `metatransaction_v2` and `otc`. More types might also be added in the future.

Similarly for `approval.eip712.types`, `approval.eip712.domain`, `approval.eip712.primaryType` and `approval.eip712.message` as there are different types of gasless approval standards.

**Liquidity Unavailable Response**

```json
{
    "liquidityAvailable": false,
}
```

**Example Meta-Transaction Response**

```json
{
  "liquidityAvailable": true,
  "price": "1800.054805",
  "estimatedPriceImpact": "5",
  "buyAmount": "1800054805473",
  "buyTokenAddress": "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
  "sellAmount": "100000000",
  "sellTokenAddress": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
	"allowanceTarget": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
  "sources": [{"name":"0x","proportion":"0"},{"name":"Uniswap","proportion":"0"},{"name":"Uniswap_V2","proportion":"1"}],
	"fees": {
		// same as the response in /price. Redacted here
	},
  "trade": {
    "type": "metatransaction",
    "hash": "0xde5a11983edd012047dd3107532f007a73ae488bfb354f35b8a40580e2a775a1",
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
			  "MetaTransactionData": [
			    {
			      "type": "address",
			      "name": "signer"
			    },
			    {
			      "type": "address",
			      "name": "sender"
			    },
			    {
			      "type": "uint256",
			      "name": "minGasPrice"
			    },
			    {
			      "type": "uint256",
			      "name": "maxGasPrice"
			    },
			    {
			      "type": "uint256",
			      "name": "expirationTimeSeconds"
			    },
			    {
			      "type": "uint256",
			      "name": "salt"
			    },
			    {
			      "type": "bytes",
			      "name": "callData"
			    },
			    {
			      "type": "uint256",
			      "name": "value"
			    },
			    {
			      "type": "address",
			      "name": "feeToken"
			    },
			    {
			      "type": "uint256",
			      "name": "feeAmount"
			    }
			  ]
      },
      "domain": {
        "name": "ZeroEx",
        "version": "1.0.0",
        "chainId": 1,
        "verifyingContract": "0xdef1c0ded9bec7f1a1670819833240f027b25eff"
      },
      "primaryType": "MetaTransactionData",
      "message": {
        "signer": "0x9016cc2122b52ff5d9937c0c1422b78d7e81ceea",
        "sender": "0x0000000000000000000000000000000000000000",
		    "minGasPrice": "1",
	      "maxGasPrice": "4294967296",
        "expirationTimeSeconds": "9990868679",
        "salt": "32606650794224190000000000000000000000000000000000000000000000000000000000000",
        "callData": "0x415565b00000000000000000000000007ceb23fd6bc0.....",
				"value": "0",
	      "feeToken": "0x0000000000000000000000000000000000000000",
        "feeAmount": "0"
      }
    }
	},
  "approval": {
    "isRequired": true,
    "isGaslessAvailable": true,
	  "type": "permit",
		"hash": "0x9d5435a70c77ffc36b1dd5d2f05ce5edcb1d0f52e2e134c3ad957b421deae194",
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
						"type": "uint256",
					},
          {
            "name": "verifyingContract",
            "type": "address"
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
	      "name": "USD Coin",
        "version": "2",
	      "chainId": 1,
        "verifyingContract": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
      },
      "message": {
        "owner": "0x9016cc2122b52ff5d9937c0c1422b78d7e81ceea",
        "spender": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
        "value": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        "nonce": 0,
        "deadline": "1660163988"
      }
    }
  }
}
```

**Example Meta-Transaction V2 Response**

For meta-transaction v2 response, all fields are the same as [the meta-transaction response](https://www.notion.so/0x-Tx-Relay-Partner-Hub-2f0074ebe816409b958ab013da13c570) except for `trade` field. More specifically, the following fields are different:

* `trade.eip712.types`: New types`MetaTransactionDataV2` and `MetaTransactionFeeData` instead of `MetaTransactionData`
* `trade.eip712.primaryType`: `MetaTransactionDataV2` instead of `MetaTransactionData`
* `trade.eip712.message`

```json
{
  ...
	// All fields other than `trade` are the same as meta-transaction response
  "trade": {
    "type": "metatransaction_v2",
    "hash": "0xde5a11983edd012047dd3107532f007a73ae488bfb354f35b8a40580e2a775a1",
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
				// different type compared with meta-transaction response
        "MetaTransactionDataV2": [
	        {
            "type": "address",
            "name": "signer"
          },
          { 
            "type": "address",
            "name": "sender"
          },
          { 
            "type": "uint256",
            "name": "expirationTimeSeconds"
          },
          { 
            "type": "uint256",
            "name": "salt"
          },
          { 
            "type": "bytes",
            "name": "callData"
          },
          { 
            "type": "address",
            "name": "feeToken"
          },
          {
            "type": "MetaTransactionFeeData[]",
            "name": "fees"
          }
	      ],
				// different type compared with meta-transaction response
	      "MetaTransactionFeeData": [
	        {
            "type": "address",
            "name": "recipient"
	        },
	        {
            "type": "uint256",
            "name": "amount"
	        }
        ]
      },
      "domain": {
        "name": "ZeroEx",
        "version": "1.0.0",
        "chainId": 1,
        "verifyingContract": "0xdef1c0ded9bec7f1a1670819833240f027b25eff"
      },
			// different primary type compared with meta-transaction response
      "primaryType": "MetaTransactionDataV2",
			// different message with meta-transaction response
      "message": {
        "signer": "0x9016cc2122b52ff5d9937c0c1422b78d7e81ceea",
        "sender": "0x0000000000000000000000000000000000000000",
        "expirationTimeSeconds": "9990868679",
        "salt": "32606650794224190000000000000000000000000000000000000000000000000000000000000",
        "callData": "0x415565b00000000000000000000000007ceb23fd6bc0.....",
	      "feeToken": "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
        "fees": [
            {
                "recipient": "0x70a9f34f9b34c64957b9c401a97bfed35b95049e",
                "amount": "10"
            },
            {
                "recipient": "0x5fd625230def5303c82f0d1d491041e042f2ad22",
                "amount": "15"
            }
        ]
      }
    }
	},
  ...
}
```

**Example OTC Response**

Similarly, for otc response, all fields are the same as [the meta-transaction response](https://www.notion.so/0x-Tx-Relay-Partner-Hub-2f0074ebe816409b958ab013da13c570) except for `trade` field. More specifically, the following fields are different:

* `trade.eip712.types`: New type `OtcOrder` instead of `MetaTransactionData`
* `trade.eip712.primaryType`: `MetaTransactionDataV2` instead of `MetaTransactionData`
* `trade.eip712.message`

```json
{
  ...
	// All fields other than `trade` are the same as meta-transaction response
  "trade": {
    "type": "otc",
    "hash": "0x12345...",
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
				// different type compared with meta-transaction response
        "OtcOrder": [
	        {
            "type": "address",
            "name": "makerToken"
          },
          { 
            "type": "address",
            "name": "takerToken"
          },
          { 
            "type": "uint128",
            "name": "makerAmount"
          },
          { 
            "type": "uint128",
            "name": "takerAmount"
          },
          { 
            "type": "address",
            "name": "maker"
          },
          { 
            "type": "address",
            "name": "taker"
          },
                    { 
            "type": "address",
            "name": "txOrigin"
          },
          { 
            "type": "uint256",
            "name": "expiryAndNonce"
          }
	      ]
      },
      "domain": {
        "name": "ZeroEx",
        "version": "1.0.0",
        "chainId": 1,
        "verifyingContract": "0xdef1c0ded9bec7f1a1670819833240f027b25eff"
      },
			// different primary type compared with meta-transaction response
      "primaryType": "OtcOrder",
			// different message with meta-transaction response
      "message": {
        "makerToken": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
        "takerToken": "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
        "makerAmount": "110969436",
        "takerAmount": "100000000000000000000",
        "maker": "0x876c...",
	      "taker": "0x4ea7...",
				"txOrigin": "0xc65...",
        "expiryAndNonce": "1054164..."
      }
    }
	},
  ...
}
```

* `liquidityAvailable`: Used to validate that liquidity is available from a given source. This would always be present.
* The rest of the fields would only be present if `liquidityAvailable` is `true`. Fields that have been explained previously in `[/price](<https://www.notion.so/0x-Tx-Relay-Partner-Hub-2f0074ebe816409b958ab013da13c570>)` are not included again here.
* `trade`: This is the “trade” object which contains the necessary information to process a trade
  * `type`: `metatransaction` | `metatransaction_v2` | `otc`
  * `hash`: The hash for the trade according to EIP-712 ([https://eips.ethereum.org/EIPS/eip-712](https://eips.ethereum.org/EIPS/eip-712)). Note that if you compute the hash from `eip712` field, it should match the value of this field.
  * `eip712`: Necessary data for EIP-712 ([https://eips.ethereum.org/EIPS/eip-712](https://eips.ethereum.org/EIPS/eip-712)).
    * Note: Please don’t assume particular shapes of `trade.eip712.types`, `trade.eip712.domain`, `trade.eip712.primaryType` and `trade.eip712.message` as they will change based on the `type` field and we would add more types in the future.
* `approval`: This is the “approval” object which contains the necessary information to process a gasless approval, if requested via `checkApproval` and is available.
  * `type`: `permit` | `executeMetaTransaction::approve`
  * `hash`: The hash for the approval according to EIP-712 ([https://eips.ethereum.org/EIPS/eip-712](https://eips.ethereum.org/EIPS/eip-712)). Note that if you compute the hash from `eip712` field, it should match the value of this field.
  * `eip712`: Necessary data for EIP-712 ([https://eips.ethereum.org/EIPS/eip-712](https://eips.ethereum.org/EIPS/eip-712)).
    * Note: Please don’t assume particular shapes of `approval.eip712.types`, `approval.eip712.domain`, `approval.eip712.primaryType` and `approval.eip712.message` as they will change based on the `type` field.
