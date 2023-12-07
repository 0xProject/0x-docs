---
sidebar_label: Overview
sidebar_position: 1
description: Learn how to use the Swap API, the most efficient liquidity for web3 tokens through a single API.
---

# API References

## Overview

There are currently four endpoints involved in a tx relay transaction:

- [`/tx-relay/v1/swap/price`](/tx-relay-api/api-references/get-tx-relay-v1-swap-price)
- [`/tx-relay/v1/swap/quote`](/tx-relay-api/api-references/get-tx-relay-v1-swap-quote)
- [`/tx-relay/v1/swap/submit`](/tx-relay-api/api-references/get-tx-relay-v1-swap-submit)
- [`/tx-relay/v1/swap/status/:trade-hash`](/tx-relay-api/api-references/get-tx-relay-v1-swap-status-trade-hash.md)

Tx Relay API is supported on Mainnet and Polygon, available via https://api.0x.org/ and providing the corresponding chain id in `0x-chain-id` header.

## Signed Orders are Settled by 0x Protocol Smart Contracts

Once signed orders hit the blockchain,

- If the orders are swap only, they are settled by [0x Protocol smart contracts](https://0x.org/docs/introduction/0x-cheat-sheet) directly,
- For meta-transaction v2 orders, they are settled by the contract `MetaTransactionsFeatureV2` and filled by the `executeMetaTransactionV2` function, available [here](https://github.com/0xProject/protocol/blob/main/contracts/zero-ex/contracts/src/features/MetaTransactionsFeatureV2.sol).
- For otc order, they are settled by the contract `OtcOrdersFeature` and filled by the `fillTakerSignedOtcOrderForEth` or `fillTakerSignedOtcOrder` functions, available [here](https://github.com/0xProject/protocol/blob/main/contracts/zero-ex/contracts/src/features/OtcOrdersFeature.sol).

If the orders are approval and swap, they are settled by `permitAndCall` contract which handles the approval and swap atomically. The swap would be forwarded to 0x Protocol smart contracts and handled by the same functions.

Addresses of 0x Protocol smart contracts are available [here](https://0x.org/docs/introduction/0x-cheat-sheet).

Addresses of `permitAndCall` contracts

| **Network**        | **Address**                                |
| ------------------ | ------------------------------------------ |
| Ethereum (Mainnet) | 0x1291c02d288de3de7dc25353459489073d11e1ae |
| Polygon            | 0x2ddd30fe5c12fc4cd497526f14bf3d1fcd3d5db4 |

## Technical Appendix

### Presenting EIP-712 Signatures for `signTypedData`

If you are user facing wallet that shows the users the details of what they are signing, then you will most likely want to use the EIP-712 signing strategy. Some commonly used tools for this include:

- integrating with MetaMask (via [`signTypedData_v4`](https://docs.metamask.io/guide/signing-data.html#sign-typed-data-v4))
- using wagmi's [`useSignTypedData`](https://wagmi.sh/react/hooks/useSignTypedData) hook for signing typed data (see an example implementation in the Tx Relay Demo App [here](https://github.com/0xProject/0x-examples/blob/main/tx-relay-next-app/app/components/quote.tsx#L243-L320) and read the guide [here](/tx-relay-api/guides/build-a-dapp-with-tx-relay-api#sign-objects--split-signatures))

In order to do so, you will need the following:

- `domain`
- `types`
- `primaryType`
- `message`

The `message` will be `MetaTransactionDataV2` that is returned at the time of `/quote`. However, you will also need the other fields.

The `domain` will change per chain, but the `name` and `version` fields are consistent. Example:

```jsx
const domain = {
  chainId: 1,
  verifyingContract: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
  name: "ZeroEx",
  version: "1.0.0",
};
```

For `types` and `primaryTypes`, it will depend on the message format.

- For `MetaTransactionDataV2`

  ```jsx
  const primaryType = "MetaTransactionDataV2";
  const types = {
    EIP712Domain: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "version",
        type: "string",
      },
      {
        name: "chainId",
        type: "uint256",
      },
      {
        name: "verifyingContract",
        type: "address",
      },
    ],
    MetaTransactionDataV2: [
      {
        type: "address",
        name: "signer",
      },
      {
        type: "address",
        name: "sender",
      },
      {
        type: "uint256",
        name: "expirationTimeSeconds",
      },
      {
        type: "uint256",
        name: "salt",
      },
      {
        type: "bytes",
        name: "callData",
      },
      {
        type: "address",
        name: "feeToken",
      },
      {
        type: "MetaTransactionFeeData[]",
        name: "fees",
      },
    ],
    MetaTransactionFeeData: [
      {
        type: "address",
        name: "recipient",
      },
      {
        type: "uint256",
        name: "amount",
      },
    ],
  };
  ```

- For `OtcOrder`

  ```jsx
  const primaryType = "OtcOrder";
  const types = {
    EIP712Domain: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "version",
        type: "string",
      },
      {
        name: "chainId",
        type: "uint256",
      },
      {
        name: "verifyingContract",
        type: "address",
      },
    ],
    OtcOrder: [
      {
        type: "address",
        name: "makerToken",
      },
      {
        type: "address",
        name: "takerToken",
      },
      {
        type: "uint128",
        name: "makerAmount",
      },
      {
        type: "uint128",
        name: "takerAmount",
      },
      {
        type: "address",
        name: "maker",
      },
      {
        type: "address",
        name: "taker",
      },
      {
        type: "address",
        name: "txOrigin",
      },
      {
        type: "uint256",
        name: "expiryAndNonce",
      },
    ],
  };
  ```

  More information on signing 0x orders is available [here](https://docs.0xprotocol.org/en/latest/basics/orders.html#how-to-sign).

### Computing a trade hash

You could / should verify that the hash we provide in our request matches the meta-transaction provided.

For the `trade.hash` field:

- If it's a meta-transaction v2, verify that the `meta-transaction v2` hashes to the `trade.hash`: `getMetaTransactionV2Hash`[link](https://github.com/0xProject/protocol/blob/development/contracts/zero-ex/contracts/src/features/MetaTransactionsFeatureV2.sol#L192)
- It it's an otc, verify that `otc` hashes to the `trade.hash`: `getOtcOrderHash` [link](https://github.com/0xProject/protocol/blob/main/contracts/zero-ex/contracts/src/features/OtcOrdersFeature.sol#L454)

If you need to call these functions on the 0x smart contracts to validate your code, you may need:

- The ABI: [https://github.com/0xProject/protocol/blob/development/packages/contract-artifacts/artifacts/IZeroEx.json](https://github.com/0xProject/protocol/blob/development/packages/contract-artifacts/artifacts/IZeroEx.json)
- The Contract address (depends on the chain): [https://docs.0x.org/introduction/0x-cheat-sheet#exchange-proxy-addresses](https://docs.0x.org/introduction/0x-cheat-sheet#exchange-proxy-addresses)
