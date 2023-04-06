---
sidebar_label: Overview
sidebar_position: 1
description: Learn how to use the 0x Swap API, the most efficient liquidity for web3 tokens through a single API. 
---

# API References

## Overview

There are currently four endpoints involved in a tx relay transaction:

* [`/tx-relay/v1/swap/price`](/tx-relay-api/api-references/get-tx-relay-v1-swap-price)
* [`/tx-relay/v1/swap/quote`](/tx-relay-api/api-references/get-tx-relay-v1-swap-quote)
* [`/tx-relay/v1/swap/submit`](/tx-relay-api/api-references/get-tx-relay-v1-swap-submit)
* [`/tx-relay/v1/swap/status/:trade-hash`](/tx-relay-api/api-references/get-tx-relay-v1-swap-status-trade-hash.)


Tx Relay API is supported on Mainnet and Polygon

| **Network**         | **Endpoint**                  |
|---------------------|-------------------------------|
| Ethereum (Mainnet)  | https://api.0x.org/           |
| Polygon             | https://polygon.api.0x.org/   |



## Signed Orders are Settled by 0x Protocol Smart Contracts

Once signed orders hit the blockchain, they are settled by 0x Protocol smart contracts. For meta-transaction orders, they are settled by the contract `MetaTransactionsFeature` and filled by the `execteMetaTransaction` function, available [here](https://github.com/0xProject/protocol/blob/main/contracts/zero-ex/contracts/src/features/MetaTransactionsFeature.sol).

## Technical Appendix

#### Presenting EIP-712 Signatures for `signTypedData`

If you are integrating with Metamask or another user facing wallet that shows the users the details of what they are signing, then you will most likely want to use the EIP-712 signing strategy. In order to do so, you will need the following:

* `domain`
* `types`
* `primaryType`
* `message`

The message will be `MetaTransactionData` (in the future `MetaTransactionDataV2`) that is returned at the time of `/quote`. However, you will also need the other fields.

The Domain will change per chain, but the `name` and `version` fields are consistent. Example:

```jsx
const domain = {
    "chainId": 1,
    "verifyingContract": "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
    "name": "ZeroEx",
    "version": "1.0.0"
};
```

For `types` and `primaryTypes`, it will depend on the message format.

*   For `MetaTransactionData` (click the caret to expand)

    ```jsx
    const primaryType = "MetaTransactionData";
    const types = {
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
    };
    ```
*   For `MetaTransactionDataV2` (currently in development; click the caret to expand)

    ```jsx
    const primaryType = "MetaTransactionDataV2";
    const types = {
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
      };
    ```
*   For `OtcOrder` (currently in development; click the caret to expand)

    ```jsx
    const primaryType = "OtcOrder";
    const types = {
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
    };
    ```

#### Computing a trade hash

You could / should verify that the hash we provide in our request matches the meta-transaction provided.

For the `trade.hash` field:

* verify that the `meta-transaction` hashes to the `trade.hash`
* `getMetaTransactionHash`[https://github.com/0xProject/protocol/blob/development/contracts/zero-ex/contracts/src/features/MetaTransactionsFeature.sol#L204](https://github.com/0xProject/protocol/blob/development/contracts/zero-ex/contracts/src/features/MetaTransactionsFeature.sol#L204)

If you need to call these functions on the 0x smart contracts to validate your code, you may need:

* The ABI:[https://github.com/0xProject/protocol/blob/d738eede0e15d4120b18bb3f88b8aba986a3f774/packages/contract-artifacts/artifacts/IZeroEx.json](https://github.com/0xProject/protocol/blob/d738eede0e15d4120b18bb3f88b8aba986a3f774/packages/contract-artifacts/artifacts/IZeroEx.json)
* The Contract address (depends on the chain):[https://docs.0x.org/introduction/0x-cheat-sheet#exchange-proxy-addresses](https://docs.0x.org/introduction/0x-cheat-sheet#exchange-proxy-addresses)