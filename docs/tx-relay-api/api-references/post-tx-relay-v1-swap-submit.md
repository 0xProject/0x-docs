---
sidebar_label: POST /tx-relay/v1/swap/submit
sidebar_position: 3
description: Learn how to use POST /tx-relay/v1/swap/submit
---

# POST /tx-relay/v1/swap/submit

If your user accepts the quote and wants to trade, you do a `POST` to `/tx-relay/v1/swap/submit`.

### Gasless Approvals

If a token supports gasless approvals, a meta-transaction / otc may be submitted along with an approval object. You will be able to tell if the sell token is supported by gasless approvals by checking the response of `/quote` and looking for

```tsx
const { approval } = response;
approval.isRequired // whether an approval is required for the trade
approval.isGaslessAvailable // whether gasless approval is available for the sell token
```

To take advantage of gasless approvals, you must also have your user sign the `approval.eip712`

object returned at the time of the `/quote`. You can pass the `approval.eip712` object to `eth_signTypedData_v4` (see [MetaMask docs](https://docs.metamask.io/guide/signing-data.html#sign-typed-data-v4)) or function of your choice as the “params” .

Keep in mind that the `domain` field of this object must follow a strict ordering as specified in EIP-712:

* `name` , `version`, `chainId`, `verifyingContract`, `salt`
  * Contracts may not utilize all of these fields (i.e. one or more may be missing), but if they are present, they must be in this order
* Any other field must follow in alphabetical order

The `approval.eip712` object will present the correct ordering, but make sure that this ordering is preserved when obtaining the signature.

If you choose to compute the approval hash from `approval.eip712`, it should match `approval.hash` field.

### Trade

Similar to gasless approval, to submit a trade, you must have your user sign `trade.eip712` object returned at the time of the `/quote`. All the instructions & caveats are the same as previous section.

#### **Example Request**

```bash
curl -X POST '<https://api.0x.org/tx-relay/v1/swap/submit>' --header '0x-api-key: <API_KEY>' --header '0x-chain-id: 137' --data '{
 "trade": {
   "type": "metatransaction", // this is trade.type from the /quote endpoint
   "eip712": { /* this is trade.eip712 from the /quote endpoint */ },
   "signature": {
     "v": 27,
     "r": "0xeaac9ddbbf9b251a384eb4a545a2800a6d7aca4ceb5e5a3154ddd0d2923533d2",
     "s": "0x601deadfd33bd8b0ad35468613eabcac0a250a7a32035e261a13e2dcbc462e49",
     "signatureType": 2
    }
  },
 "approval":{
     "type": "permit", // this is approval.type from the /quote endpoint
     "eip712": {/* this is approval.eip712 from the /quote endpoint */},
     "signature": {
       "v": 28,
       "r": "0x55c26901285d5cb4d9d1ebb2828122fd6c334b343901944d34a810b3d2d79773",
       "s": "0x20854d829e3118c3f780228ca83fac6154060328a90d2a21267c9f7d1ae9e53b",
       "signatureType": 2
    }
  }
}'
```

#### **Example Response**

```json
{
  "type": "metatransaction",
  "tradeHash": "0xde5a11983edd012047dd3107532f007a73ae488bfb354f35b8a40580e2a775a1",
}
```

More information on signing 0x orders is available [here](https://docs.0x.org/market-makers/guides/signing-0x-orders).


### Status Code

* `201` if successful
* `400`:
  * If the trade is too close to expiration time.
  * If the signature in the payload is invalid.
  * If the balance / allowance of the taker is less than the trade amount.
  * (`otc` only) If the trade has been outstanding for too long.
  * (`otc` only) If the balance / allowance of the market maker selected to settle the trade is less than the trade amount (very unlikely).
* `429` if there is already a trade associated with a taker address and a taker token that's not been settled by our relayers yet. For example, if `address A` already has a `USDC -> WETH` trade submitted and it has not settled yet, then a subsequent `/submit` call with `address A` and `USDC -> *` trade will fail with `429`. The taker is, however, allowed to submit other trades with a different taker token.
* `500` if there is an internal server error.


### Note

* If you're using `go-ethereum`, for `domain`, make sure you order the fields in the exact same order as specified in https://eips.ethereum.org/EIPS/eip-712 since `go-ethereum` does not enforce ordering. Also, make sure you skipped fields that are absent.
```
- string name: the user readable name of signing domain, i.e. the name of the DApp or the protocol.
- string version: the current major version of the signing domain. Signatures from different - versions are not compatible.
- uint256 chainId: the EIP-155 chain id. The user-agent should refuse signing if it does not match the currently active chain.
- address verifyingContract: the address of the contract that will verify the signature. The user-agent may do contract specific phishing prevention.
- bytes32 salt: an disambiguating salt for the protocol. This can be used as a domain separator of last resort.

The EIP712Domain fields should be the order as above, skipping any absent fields
```
* If you're using `ethers v6` (`v5` and `v4` are fine), there is an [issue](https://github.com/ethers-io/ethers.js/discussions/3873) for signing EIP-712 object. Make sure you updated `ethers` version to `>= 6.3.0`.