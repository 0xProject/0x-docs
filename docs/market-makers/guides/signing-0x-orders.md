---
sidebar_label: Signing 0x Orders
sidebar_position: 2
description:  In this guide, we discuss how to use @0x/protocol-utils or ethers.js to sign 0x Orders
---

# Signing 0x Orders

At the heart of 0x Orders are signatures that authorize the 0x smart contracts to perform swaps on behalf of signers.

Whether you are posting Limit Orders to the [Orderbook API](/0x-orderbook-api/introduction) and [Providing RFQ Liquidity to the 0x API ](/market-makers/docs/providing-rfq-liquidity-to-swap-api)- you will need to sign a 0x order.

### What am I signing?

When you sign a 0x Order, you are signing the Order Hash. See [Generating 0x Order Hash](/market-makers/guides/generating-0x-order-hashes) on how to derive your order's hash.

Because the hash is generated over all the fields of the order (as well as the chain ID and verifying contract), signing the hash is as good as signing all the fields of the order itself.

### Signature Types

The 0x smart contracts supports 2 types of signatures:

* `EthSign` - this is the standard way of signing messages: adding [an EIP-191 prefix](https://eips.ethereum.org/EIPS/eip-191) to the bytes you are about to sign and using `eth_sign` (or equivalent) to generate the signature. In the 0x ecosystem, these signatures have `signatureType` of `3`
* `EIP712` - this signing method is optimized for wallets to show human readable data before signing. It uses `eth_signTypedData` (or equivalent) to generate a signature.  In the 0x ecosystem, these signatures have `signatureType` of `2`

### Signing 0x Orders with @0x/protocol-utils

The recommended way of signing 0x Orders is using the npm package [`@0x/protocol-utils`](https://www.npmjs.com/package/@0x/protocol-utils)

```
yarn add @0x/protocol-utils
```

Using this library to sign orders:

```javascript
const protocolUtils = require('@0x/protocol-utils');
const order = new protocolUtils.LimitOrder({ // or protocolUtils.RfqOrder
    makerToken: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
    takerToken: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
    ... // Other fields
})
// Generate an EthSign signature with a provider.
const signature = await order.getSignatureWithProviderAsync(
    web3.currentProvider,
);
// Generate an EthSign signature with a private key.
const signature = await order.getSignatureWithKey(
    '0x123456...', // Maker's 32-byte private key, in hex.
);
// Generate an EIP712 signature with a provider (e.g., metamask).
const signature = await order.getSignatureWithProviderAsync(
    web3.currentProvider,
    utils.SignatureType.EIP712,
);
// Generate an EIP712 signature with a private key.
const signature = await order.getSignatureWithKey(
    '0x123456...', // Maker's 32-byte private key, in hex.
    utils.SignatureType.EIP712,
);
```

### Signing 0x Orders with Ethers.js

Ethers.js is a popular open source library that makes it easy to interact with EVM based chains. We can also use Ethers.js to sign orders.

Assuming you have the order hash, you may do the following:

```javascript
const { ethers } = require("ethers");

// 0x orderHash
const orderHash = "0x41dbae71b2e4b42fbb2c66cd9d3f2921560c6d79d4452a4f9dd1e3940b88d2ef";

// Get signer
const provider = new ethers.providers.JsonRpcProvider(/* constructor params */);
const signer = provider.getSigner(/* address */);

// Get signature
const rawSignature = await signer.signMessage(ethers.utils.arrayify(orderHash));
const { v, r, s } = ethers.utils.splitSignature(rawSignature);
const signature = { 
    v,
    r, 
    s,
    signatureType: 3
};
```